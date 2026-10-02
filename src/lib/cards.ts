import { TOPICS } from "../content/topics";
import { UPDATES } from "../content/updates";
import { getState, update } from "./store";
import { inLevel, lvlOf } from "./level";
import { stripAcc } from "./check";
import type { Card, CustomWord, Topic } from "./types";

const BASE_CARDS: Card[] = [];
const seen = new Set<string>();
for (const T of TOPICS) {
  for (const line of T.v.trim().split("\n")) {
    const [es, hr, u] = line.split(" | ").map(s => s && s.trim());
    if (!es || !hr) continue;
    const key = es.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    BASE_CARDS.push({ id: es, T: T.k, es, hr, u: u || "" });
  }
}
/** the user's own words live in this pseudo-topic */
export const MY_TOPIC: Topic = { k: "mias", t: "Mis palabras", hr: "moje riječi", mark: "green", v: "" };
export const TOPIC_BY_K: Record<string, Topic> = Object.fromEntries([...TOPICS, MY_TOPIC].map(t => [t.k, t]));

let customSrc: Record<string, CustomWord> | null = null, customList: Card[] = [];
export function customCards(): Card[] {
  const src = getState().custom;
  if (src !== customSrc) {
    customSrc = src;
    customList = Object.entries(src).filter(([, w]) => !w.del).sort((a, b) => b[1].t - a[1].t).map(([id, w]) => ({ id, T: MY_TOPIC.k, es: w.es, hr: w.hr, u: "" }));
  }
  return customList;
}
/** every card of the selected level(s), plus the user's own words */
export function cards(): Card[] {
  return [...BASE_CARDS.filter(c => inLevel(lvlOf(TOPIC_BY_K[c.T]))), ...customCards()];
}
export const cardById = (id: string) => BASE_CARDS.find(c => c.id === id) || customCards().find(c => c.id === id);

/** id of the newest content update ("since the last class"), or "" if none yet */
export const LAST_UPDATE = UPDATES.length ? UPDATES[UPDATES.length - 1] : null;
export const lastClassCards = () => (LAST_UPDATE ? cards().filter(c => c.u === LAST_UPDATE.id) : []);

// ---- custom words ----
const norm = (s: string) => stripAcc(s.trim().toLowerCase());
function clash(es: string, except?: string) {
  const n = norm(es);
  return [...BASE_CARDS, ...customCards()].find(c => c.id !== except && norm(c.es) === n);
}
/** returns an error message, or "" on success */
export function saveCustomWord(es: string, hr: string, id?: string): string {
  es = es.trim(); hr = hr.trim();
  if (!es || !hr) return "Escribe la palabra en español y en croata.";
  const dup = clash(es, id);
  if (dup) return `«${dup.es}» ya existe (${TOPIC_BY_K[dup.T].t}).`;
  const key = id || "mi-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  update(s => { s.custom[key] = { es, hr, t: Date.now() }; });
  return "";
}
export function deleteCustomWord(id: string) {
  update(s => { const w = s.custom[id]; if (w) s.custom[id] = { ...w, del: true, t: Date.now() }; });
}
export function restoreCustomWord(id: string) {
  update(s => { const w = s.custom[id]; if (w) s.custom[id] = { es: w.es, hr: w.hr, t: Date.now() }; });
}
