import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { schedule, sGet, newLeft } from "./srs";
import { defaultState, replaceState } from "./store";
import { DAY } from "./util";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-10-03T10:00:00"));
  replaceState(defaultState());
});
afterEach(() => vi.useRealTimers());

const daysUntilDue = (id: string) => Math.round((sGet(id).d - new Date("2026-10-03T04:00:00").getTime()) / DAY);

describe("schedule (spaced repetition)", () => {
  it("«Otra vez» brings a card back in a minute", () => {
    schedule("hola", 1);
    expect(sGet("hola").d - Date.now()).toBe(60000);
  });

  it("first «Bien» = tomorrow, first «Fácil» = in 4 days", () => {
    schedule("a", 3);
    schedule("b", 4);
    expect(daysUntilDue("a")).toBe(1);
    expect(daysUntilDue("b")).toBe(4);
  });

  it("intervals grow with each correct answer and forgetting counts a lapse", () => {
    schedule("c", 3);
    const first = sGet("c").i;
    schedule("c", 3);
    expect(sGet("c").i).toBeGreaterThan(first * 2);
    schedule("c", 1);
    expect(sGet("c")).toMatchObject({ i: 0, l: 1 });
  });

  it("new cards count against the daily limit", () => {
    const before = newLeft();
    schedule("x", 3);
    schedule("x", 3); // not new any more
    expect(newLeft()).toBe(before - 1);
  });
});
