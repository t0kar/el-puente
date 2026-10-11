import { describe, expect, it } from "vitest";
import { LEVELS, RULES, SHEETS, STORIES, TOPICS, UPDATES, VERBS } from ".";
import { RENAMED } from "./renamed";
import { parseCardLine } from "../lib/cards";

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
        const { es, hr, bad } = parseCardLine(line);
        expect(es && hr, `${t.k}: "${line}"`).toBeTruthy();
        expect(bad, `${t.k}: unknown field in "${line}" (expected YYYY-MM-DD, A2/B1/B2 or "ej: … → …")`).toEqual([]);
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
      ...TOPICS.flatMap(t => t.v.split("\n").map(l => parseCardLine(l).u)),
      ...VERBS.map(v => v.u),
      ...STORIES.map(s => s.u),
      ...SHEETS.map(s => s.u),
      ...RULES.map(r => r.u),
    ].filter(Boolean);
    for (const tag of tags) expect(updateIds.has(tag as string), `unknown update id "${tag}"`).toBe(true);
  });

  it("every item belongs to a registered level", () => {
    for (const x of [...TOPICS, ...VERBS, ...STORIES, ...SHEETS, ...RULES]) expect(levelIds).toContain(x.lvl);
  });

  it("sheets have a Chuleta section, a Croatian context line and a unique title", () => {
    const cats = ["verbos", "imperativo", "usos", "nombres", "preposiciones", "numeros", "sonidos"];
    for (const s of SHEETS) {
      expect(cats, s.t).toContain(s.cat);
      expect(s.hr.trim().length, `${s.t}: hr`).toBeGreaterThan(10);
    }
    const titles = SHEETS.map(s => s.t);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("rules have one gap, 2+ distinct options and an answer that exists", () => {
    for (const r of RULES) {
      expect(r.q.split("___").length, r.q).toBe(2);
      expect(r.o.length, r.q).toBeGreaterThanOrEqual(2);
      expect(new Set(r.o).size, r.q).toBe(r.o.length);
      expect(r.o[r.a], r.q).toBeDefined();
    }
  });

  it("renamed card ids point to a card that exists, and old ids are gone", () => {
    const ids = new Set(TOPICS.flatMap(t => t.v.trim().split("\n").map(l => parseCardLine(l).es)));
    for (const [from, to] of Object.entries(RENAMED)) {
      expect(ids.has(to), `RENAMED target "${to}" is not a card`).toBe(true);
      expect(ids.has(from), `"${from}" was renamed but still exists`).toBe(false);
    }
  });
});
