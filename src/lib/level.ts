import { LEVELS, RULES, SHEETS, STORIES, TOPICS, VERBS } from "../content";
import { getState } from "./store";
import type { Level, Rule } from "./types";

export { LEVELS };
export const lvlOf = (x: { lvl?: Level } | Rule): Level => (Array.isArray(x) ? x[5] : x.lvl) || LEVELS[0].id;
/** is this level part of the user's selection (empty selection = all) */
export const inLevel = (l: Level) => {
  const sel = getState().settings.levels;
  return !sel.length || sel.includes(l);
};
/** items of the selected level(s); falls back to everything so a level without e.g. verbs yet never leaves a game empty */
const keep = <T extends { lvl?: Level } | Rule>(xs: T[]) => {
  const r = xs.filter(x => inLevel(lvlOf(x)));
  return r.length ? r : xs;
};
export const activeTopics = () => keep(TOPICS);
export const activeVerbs = () => keep(VERBS);
export const activeRules = () => keep(RULES);
export const activeStories = () => keep(STORIES);
export const activeSheets = () => keep(SHEETS);
export const levelHasContent = (l: Level) => [...TOPICS, ...VERBS, ...STORIES, ...SHEETS, ...RULES].some(x => lvlOf(x) === l);
