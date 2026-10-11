import { LEVELS, RULES, SHEETS, STORIES, TOPICS, VERBS } from "../content";
import { getState } from "./store";
import type { Cefr, Level } from "./types";

export { LEVELS };
export const lvlOf = (x: { lvl?: Level }): Level => x.lvl || LEVELS[0].id;
/** is this level part of the user's selection (empty selection = all) */
export const inLevel = (l: Level) => {
  const sel = getState().settings.levels;
  return !sel.length || sel.includes(l);
};
/**
 * items of the selected level(s), without harder ones (`x`) when the user hides them; falls back to every level so a level
 * without e.g. verbs yet never leaves a game empty
 */
const keep = <T extends { lvl?: Level; x?: Cefr }>(xs: T[]) => {
  const adv = getState().settings.advanced;
  const ok = adv ? xs : xs.filter(x => !x.x);
  const r = ok.filter(x => inLevel(lvlOf(x)));
  return r.length ? r : ok;
};
/** level label for the pill: CEFR when harder than the course level, else the course level */
export const itemLevel = (x: { lvl?: Level; x?: Cefr }) => x.x || lvlOf(x);
export const activeTopics = () => keep(TOPICS);
export const activeVerbs = () => keep(VERBS);
export const activeRules = () => keep(RULES);
export const activeStories = () => keep(STORIES);
export const activeSheets = () => keep(SHEETS);
export const levelHasContent = (l: Level) => [...TOPICS, ...VERBS, ...STORIES, ...SHEETS, ...RULES].some(x => lvlOf(x) === l);
