import { TOPICS } from "../content";
import { getState, update } from "./store";
import { inLevel, lvlOf } from "./level";
import { stripAcc } from "./check";
import type { Card, Cefr, CustomWord, Topic } from "./types";

const CEFR = new Set<string>(["A2", "B1", "B2"] satisfies Cefr[]);
/**
 * One card line: `español | hrvatski` + optional fields in any order: update id `YYYY-MM-DD`, level `A2`/`B1`/`B2`,
 * example `ej: Frase en español. → Hrvatska rečenica.`. Unrecognised fields are returned in `bad` (content.test.ts fails on them).
 */
export const parseCardLine = (line: string) => {
  const [es = "", hr = "", ...rest] = line.split(" | ").map(s => s.trim());
  const out: Omit<Card, "id" | "T"> & { bad: string[] } = { es, hr, u: "", bad: [] };
  for (const f of rest) {
    const ex = /^ej:\s*(.+?)\s*→\s*(.+)$/.exec(f);
    if (/^\d{4}-\d{2}-\d{2}$/.test(f)) out.u = f;
    else if (CEFR.has(f)) out.x = f as Cefr;
    else if (ex && !ex[2].includes("→")) out.ex = [ex[1], ex[2]];
    else out.bad.push(f);
  }
  return out;
};

const BASE_CARDS: Card[] = [];
const seen = new Set<string>();
for (const T of TOPICS) {
  for (const line of T.v.trim().split("\n")) {
    const { bad: _bad, ...c } = parseCardLine(line);
    if (!c.es || !c.hr) continue;
    const key = c.es.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    BASE_CARDS.push({ id: c.es, T: T.k, ...c });
  }
}
/** the user's own words live in this pseudo-topic */
export const MY_TOPIC: Topic = { k: "mias", t: "Mis palabras", hr: "moje riječi", mark: "green", v: "" };
export const TOPIC_BY_K: Record<string, Topic> = Object.fromEntries([...TOPICS, MY_TOPIC].map(t => [t.k, t]));

let customSrc: Record<string, CustomWord> | null = null,
  customList: Card[] = [];
export const customCards = (): Card[] => {
  const src = getState().custom;
  if (src !== customSrc) {
    customSrc = src;
    customList = Object.entries(src)
      .filter(([, w]) => !w.del)
      .sort((a, b) => b[1].t - a[1].t)
      .map(([id, w]) => ({ id, T: MY_TOPIC.k, es: w.es, hr: w.hr, u: "" }));
  }
  return customList;
};
/** every card of the selected level(s) (without harder ones when they're switched off), plus the user's own words */
export const cards = (): Card[] => {
  const adv = getState().settings.advanced;
  return [...BASE_CARDS.filter(c => (adv || !c.x) && inLevel(lvlOf(TOPIC_BY_K[c.T]))), ...customCards()];
};
/** level label for the pill: the card's CEFR when it's harder than its course level, else the course level */
export const cardLevel = (c: Card) => c.x || TOPIC_BY_K[c.T].lvl || "";

// ---- custom words ----
const norm = (s: string) => stripAcc(s.trim().toLowerCase());
const clash = (es: string, except?: string) => {
  const n = norm(es);
  return [...BASE_CARDS, ...customCards()].find(c => c.id !== except && norm(c.es) === n);
};
/** returns an error message, or "" on success */
export const saveCustomWord = (es: string, hr: string, id?: string): string => {
  es = es.trim();
  hr = hr.trim();
  if (!es || !hr) return "Escribe la palabra en español y en croata.";
  const dup = clash(es, id);
  if (dup) return `«${dup.es}» ya existe (${TOPIC_BY_K[dup.T].t}).`;
  const key = id || "mi-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  update(s => {
    s.custom[key] = { es, hr, t: Date.now() };
  });
  return "";
};
export const deleteCustomWord = (id: string) => {
  update(s => {
    const w = s.custom[id];
    if (w) s.custom[id] = { ...w, del: true, t: Date.now() };
  });
};
export const restoreCustomWord = (id: string) => {
  update(s => {
    const w = s.custom[id];
    if (w) s.custom[id] = { es: w.es, hr: w.hr, t: Date.now() };
  });
};
