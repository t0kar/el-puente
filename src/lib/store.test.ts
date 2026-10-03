import { describe, expect, it } from "vitest";
import { defaultState, mergeStates, replaceState, getState } from "./store";
import type { AppState } from "./types";

const st = (over: Partial<AppState>): AppState => ({ ...defaultState(), ...over });
const card = (t: number, i = 1) => ({ i, e: 2.5, r: 1, l: 0, d: 0, t });

describe("mergeStates (sync between devices)", () => {
  it("keeps the most recently reviewed version of each card", () => {
    const a = st({ cards: { hola: card(100, 1), casa: card(300, 4) } });
    const b = st({ cards: { hola: card(200, 2) } });
    const m = mergeStates(a, b);
    expect(m.cards.hola.i).toBe(2);
    expect(m.cards.casa.i).toBe(4);
  });

  it("takes the max XP per day, best score max and best time min", () => {
    const a = st({ days: { "2026-10-01": 30 }, best: { rush: 12, pairs_time: 40 } });
    const b = st({ days: { "2026-10-01": 50, "2026-10-02": 10 }, best: { rush: 9, pairs_time: 33 } });
    const m = mergeStates(a, b);
    expect(m.days).toEqual({ "2026-10-01": 50, "2026-10-02": 10 });
    expect(m.best).toEqual({ rush: 12, pairs_time: 33 });
  });

  it("after a reset on one device keeps only what the other did later", () => {
    const resetDevice = st({ resetAt: 1000, updatedAt: 1000 });
    const other = st({ cards: { old: card(500), fresh: card(1500) }, days: { "2026-10-01": 40 } });
    const m = mergeStates(resetDevice, other);
    expect(Object.keys(m.cards)).toEqual(["fresh"]);
    expect(m.days).toEqual({});
    expect(m.resetAt).toBe(1000);
  });

  it("merges custom words by timestamp, so a deletion (tombstone) wins over an older copy", () => {
    const a = st({ custom: { w1: { es: "la bufanda", hr: "šal", t: 100 } } });
    const b = st({ custom: { w1: { es: "la bufanda", hr: "šal", t: 200, del: true }, w2: { es: "el gorro", hr: "kapa", t: 150 } } });
    const m = mergeStates(a, b);
    expect(m.custom.w1.del).toBe(true);
    expect(m.custom.w2.es).toBe("el gorro");
  });

  it("takes settings from the device that changed last and the newest seen update", () => {
    const a = st({ updatedAt: 1, seenUpdate: "2026-10-07", settings: { ...defaultState().settings, goal: 30 } });
    const b = st({ updatedAt: 2, seenUpdate: "2026-10-02", settings: { ...defaultState().settings, goal: 100 } });
    const m = mergeStates(a, b);
    expect(m.settings.goal).toBe(100);
    expect(m.seenUpdate).toBe("2026-10-07");
  });
});

describe("normalize (loading saved data)", () => {
  it("migrates the old single-choice level setting", () => {
    const legacy = (levels: string) => ({ ...defaultState(), settings: { ...defaultState().settings, levels } }) as unknown as AppState;
    replaceState(legacy("a11"));
    expect(getState().settings.levels).toEqual(["A1.1"]);
    replaceState(legacy("mix"));
    expect(getState().settings.levels).toEqual([]);
  });

  it("fills settings added in newer versions", () => {
    const old = { ...defaultState(), settings: { dir: "es" } } as unknown as AppState;
    replaceState(old);
    expect(getState().settings.dir).toBe("es");
    expect(getState().settings.notifyContent).toBe(true);
    expect(getState().settings.remind).toEqual({ on: false, time: "19:00" });
  });
});
