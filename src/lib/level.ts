import { TOPICS } from "../content/topics";
import { VERBS } from "../content/verbs";
import { RULES } from "../content/rules";
import { STORIES } from "../content/stories";
import { SHEETS } from "../content/sheets";
import { getState } from "./store";
import type { Level, Rule } from "./types";

/** content without a level is A1.1 */
export const lvlOf = (x: { lvl?: Level } | Rule): Level => (Array.isArray(x) ? x[5] : x.lvl) || "A1.1";
export function inLevel(l: Level) {
  const sel = getState().settings.levels;
  return sel === "mix" || (sel === "a11" ? l === "A1.1" : l === "A1.2");
}
/** items of the selected level(s); falls back to everything so a level without e.g. verbs yet never leaves a game empty */
const keep = <T extends { lvl?: Level } | Rule>(xs: T[]) => { const r = xs.filter(x => inLevel(lvlOf(x))); return r.length ? r : xs; };
export const activeTopics = () => keep(TOPICS);
export const activeVerbs = () => keep(VERBS);
export const activeRules = () => keep(RULES);
export const activeStories = () => keep(STORIES);
export const activeSheets = () => keep(SHEETS);
export const levelHasContent = (l: Level) => [...TOPICS, ...VERBS, ...STORIES, ...SHEETS, ...RULES].some(x => lvlOf(x) === l);
