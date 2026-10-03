// All course content, merged across levels. Each item gets `lvl` from the folder it lives in.
import type { Rule, Sheet, Story, Topic, Update, Verb } from "../lib/types";
import { LEVELS, type LevelId } from "./levels";
import updates from "./updates.json";
import a11 from "./a1.1";
import a12 from "./a1.2";

interface LevelContent { topics: Topic[]; verbs: Verb[]; rules: Rule[]; stories: Story[]; sheets: Sheet[] }
const BY_LEVEL: Record<LevelId, LevelContent> = { "A1.1": a11, "A1.2": a12 };

const all = <T,>(pick: (c: LevelContent, lvl: LevelId) => T[]) => LEVELS.flatMap(l => pick(BY_LEVEL[l.id], l.id));

export const TOPICS: Topic[] = all((c, lvl) => c.topics.map(t => ({ ...t, lvl })));
export const VERBS: Verb[] = all((c, lvl) => c.verbs.map(v => ({ ...v, lvl })));
export const RULES: Rule[] = all((c, lvl) => c.rules.map(r => [r[0], r[1], r[2], r[3], r[4], lvl] as Rule));
export const STORIES: Story[] = all((c, lvl) => c.stories.map(s => ({ ...s, lvl })));
export const SHEETS: Sheet[] = all((c, lvl) => c.sheets.map(s => ({ ...s, lvl })));
/** class log, oldest first (see updates.json) */
export const UPDATES: Update[] = updates;
export { LEVELS };
