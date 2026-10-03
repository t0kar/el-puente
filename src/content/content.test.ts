import { describe, expect, it } from "vitest";
import { LEVELS, RULES, SHEETS, STORIES, TOPICS, UPDATES, VERBS } from ".";

// Guards for content edits (see src/content/AGENTS.md). A failure here usually means a typo in a content file.
describe("course content", () => {
  const levelIds = LEVELS.map(l => l.id) as string[];
  const updateIds = new Set(UPDATES.map(u => u.id));

  it("topic keys and story ids are unique across levels", () => {
    const keys = TOPICS.map(t => t.k);
    expect(new Set(keys).size).toBe(keys.length);
    const ids = STORIES.map(s => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every card line has Spanish and Croatian and the Spanish text appears once", () => {
    const seen = new Map<string, string>();
    for (const t of TOPICS)
      for (const line of t.v.trim().split("\n").filter(Boolean)) {
        const [es, hr] = line.split(" | ").map(s => s?.trim());
        expect(es && hr, `${t.k}: "${line}"`).toBeTruthy();
        const key = es.toLowerCase();
        expect(seen.get(key), `"${es}" is in both ${seen.get(key)} and ${t.k}`).toBeUndefined();
        seen.set(key, t.k);
      }
  });

  it("updates are dated YYYY-MM-DD, oldest first, and every tag points to one", () => {
    const ids = UPDATES.map(u => u.id);
    for (const id of ids) expect(id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect([...ids].sort()).toEqual(ids);
    const tags = [
      ...TOPICS.flatMap(t => t.v.split("\n").map(l => l.split(" | ")[2]?.trim())),
      ...VERBS.map(v => v.u),
      ...STORIES.map(s => s.u),
      ...SHEETS.map(s => s.u),
      ...RULES.map(r => r[4]).filter(x => typeof x === "string"),
    ].filter(Boolean);
    for (const tag of tags) expect(updateIds.has(tag as string), `unknown update id "${tag}"`).toBe(true);
  });

  it("every item belongs to a registered level", () => {
    for (const x of [...TOPICS, ...VERBS, ...STORIES, ...SHEETS]) expect(levelIds).toContain(x.lvl);
    for (const r of RULES) expect(levelIds).toContain(r[5]);
  });

  it("rule answers point at an existing option", () => {
    for (const r of RULES) expect(r[1][r[2]], r[0]).toBeDefined();
  });
});
