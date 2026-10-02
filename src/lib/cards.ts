import { TOPICS } from "../content/topics";
import { UPDATES } from "../content/updates";
import type { Card, Topic } from "./types";

export const CARDS: Card[] = [];
export const CARD_BY_ID: Record<string, Card> = {};
const seen = new Set<string>();
for (const T of TOPICS) {
  for (const line of T.v.trim().split("\n")) {
    const [es, hr, u] = line.split(" | ").map(s => s && s.trim());
    if (!es || !hr) continue;
    const key = es.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const c: Card = { id: es, T: T.k, es, hr, u: u || "" };
    CARDS.push(c);
    CARD_BY_ID[c.id] = c;
  }
}
export const TOPIC_BY_K: Record<string, Topic> = Object.fromEntries(TOPICS.map(t => [t.k, t]));
/** id of the newest content update ("since the last class"), or "" if none yet */
export const LAST_UPDATE = UPDATES.length ? UPDATES[UPDATES.length - 1] : null;
export const lastClassCards = () => (LAST_UPDATE ? CARDS.filter(c => c.u === LAST_UPDATE.id) : []);
