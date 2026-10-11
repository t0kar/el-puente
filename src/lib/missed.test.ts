import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearMissed, markMissed, missedFirst, missedKeys } from "./missed";

const mem = new Map<string, string>();
vi.stubGlobal("localStorage", {
  getItem: (k: string) => mem.get(k) ?? null,
  setItem: (k: string, v: string) => mem.set(k, v),
  removeItem: (k: string) => mem.delete(k),
});
beforeEach(() => mem.clear());

describe("missed (rules and verbs failed twice)", () => {
  it("keeps the most recent miss first and has no duplicates", () => {
    markMissed("rule:a");
    markMissed("rule:b");
    markMissed("rule:a");
    expect(missedKeys()).toEqual(["rule:a", "rule:b"]);
  });

  it("forgets an item once it's answered right", () => {
    markMissed("verb:ser");
    clearMissed("verb:ser");
    expect(missedKeys()).toEqual([]);
  });

  it("puts missed items at the front and keeps the rest in order", () => {
    markMissed("c");
    markMissed("e");
    expect(missedFirst(["a", "b", "c", "d", "e"], x => x)).toEqual(["e", "c", "a", "b", "d"]);
  });

  it("is capped", () => {
    for (let i = 0; i < 60; i++) markMissed("k" + i);
    expect(missedKeys()).toHaveLength(40);
    expect(missedKeys()[0]).toBe("k59");
  });
});
