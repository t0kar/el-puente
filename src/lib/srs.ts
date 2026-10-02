import { cards } from "./cards";
import { getState, update } from "./store";
import type { Card } from "./types";
import { DAY, todayKey } from "./util";

export const sGet = (id: string) => getState().cards[id];
export const isDue = (id: string, now = Date.now()) => { const s = sGet(id); return !!s && s.d <= now; };
export function newLeft() {
  const st = getState();
  const used = st.newDay.d === todayKey() ? st.newDay.n : 0;
  return Math.max(0, st.settings.newPerDay - used);
}
/** rating: 1 again · 2 hard · 3 good · 4 easy */
export function schedule(id: string, rating: 1 | 2 | 3 | 4) {
  const now = Date.now();
  update(st => {
    const prev = st.cards[id];
    const isNew = !prev;
    const s = prev ? { ...prev } : { i: 0, e: 2.5, r: 0, l: 0, d: 0, t: 0 };
    if (isNew) { if (st.newDay.d !== todayKey()) st.newDay = { d: todayKey(), n: 0 }; st.newDay.n++; }
    const fuzz = 1 + (Math.random() * 0.1 - 0.05);
    if (rating === 1) { if (!isNew) s.l++; s.e = Math.max(1.3, s.e - 0.2); s.i = 0; s.d = now + 60000; }
    else {
      if (s.i < 1) s.i = rating === 4 ? 4 : 1;
      else if (rating === 2) { s.i *= 1.2; s.e = Math.max(1.3, s.e - 0.15); }
      else if (rating === 3) s.i *= s.e;
      else { s.i *= s.e * 1.3; s.e += 0.15; }
      s.i = Math.min(365, Math.round(s.i * fuzz * 10) / 10);
      const start = new Date(); start.setHours(4, 0, 0, 0);
      s.d = start.getTime() + Math.max(1, Math.round(s.i)) * DAY;
    }
    s.r++; s.t = now;
    st.cards[id] = s;
  });
}
export const cardsFor = (topics?: string[] | null) => (topics && topics.length ? cards().filter(c => topics.includes(c.T)) : cards());
export function dueCards(topics?: string[] | null) { const now = Date.now(); return cardsFor(topics).filter(c => isDue(c.id, now)).sort((a, b) => sGet(a.id).d - sGet(b.id).d); }
/** unseen cards; material from the newest class comes first */
export function newCards(topics?: string[] | null) { return cardsFor(topics).filter(c => !sGet(c.id)).sort((x, y) => (y.u || "").localeCompare(x.u || "")); }
export function hardCards(): Card[] {
  return cards().filter(c => { const s = sGet(c.id); return s && (s.l >= 1 || s.e < 2.2); })
    .sort((x, y) => sGet(y.id).l - sGet(x.id).l || sGet(x.id).e - sGet(y.id).e);
}
export function mastery(k: string) {
  const cs = cards().filter(c => c.T === k);
  let sum = 0, nw = 0, due = 0; const now = Date.now();
  for (const c of cs) { const s = sGet(c.id); if (!s) { nw++; continue; } sum += Math.min(1, s.i / 21); if (s.d <= now) due++; }
  return { pct: cs.length ? Math.round((100 * sum) / cs.length) : 0, nw, due, n: cs.length };
}
export function previewIntervals(id: string) {
  const s = sGet(id) || { i: 0, e: 2.5 };
  const f = (d: number) => (d < 30 ? Math.max(1, Math.round(d)) + " d" : Math.round(d / 30) + " m");
  if (s.i < 1) return ["1 min", "1 d", "1 d", "4 d"];
  return ["1 min", f(s.i * 1.2), f(s.i * s.e), f(s.i * s.e * 1.3)];
}
export function totals() {
  let seen = 0, learned = 0, mastered = 0;
  const all = cards();
  for (const c of all) { const s = sGet(c.id); if (!s) continue; seen++; if (s.i >= 1) learned++; if (s.i >= 21) mastered++; }
  return { seen, learned, mastered, total: all.length };
}
