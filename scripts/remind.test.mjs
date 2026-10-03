import { describe, expect, it } from "vitest";
import { localParts } from "./lib/push.mjs";
import { message, shouldSend, streakBefore } from "./remind.mjs";

const user = { settings: { remind: { on: true, time: "19:00" } }, days: { "2026-10-01": 20, "2026-10-02": 15 } };
const zg = { tz: "Europe/Zagreb" };
const t = new Date("2026-10-03T17:10:00Z"); // 19:10 in Zagreb (CEST)

describe("daily reminder", () => {
  it("computes local date and time in the device's time zone", () => {
    expect(localParts(t, "Europe/Zagreb")).toEqual({ date: "2026-10-03", minutes: 19 * 60 + 10 });
  });
  it("sends once, inside the 2 h window after the chosen time", () => {
    expect(shouldSend(user, zg, t)).toBe("2026-10-03");
    expect(shouldSend(user, zg, new Date("2026-10-03T16:50:00Z"))).toBeNull();
    expect(shouldSend(user, zg, new Date("2026-10-03T19:05:00Z"))).toBeNull();
    expect(shouldSend(user, { ...zg, lastSent: "2026-10-03" }, t)).toBeNull();
  });
  it("skips users who practised today or switched it off", () => {
    expect(shouldSend({ ...user, days: { ...user.days, "2026-10-03": 4 } }, zg, t)).toBeNull();
    expect(shouldSend({ ...user, settings: { remind: { on: false, time: "19:00" } } }, zg, t)).toBeNull();
  });
  it("respects other time zones and late evening times", () => {
    expect(shouldSend(user, { tz: "America/New_York" }, t)).toBeNull();
    expect(shouldSend(user, { tz: "America/New_York" }, new Date("2026-10-03T23:30:00Z"))).toBe("2026-10-03");
    const late = { settings: { remind: { on: true, time: "23:30" } }, days: {} };
    expect(shouldSend(late, zg, new Date("2026-10-03T21:45:00Z"))).toBe("2026-10-03");
  });
  it("mentions the streak when there is one", () => {
    expect(streakBefore(user.days, "2026-10-03")).toBe(2);
    expect(message(user, "2026-10-03").body).toContain("2 días");
    expect(message({ days: {} }, "2026-10-03").body).not.toContain("racha");
  });
});
