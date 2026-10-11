import { describe, expect, it } from "vitest";
import { contentMessage, shouldNotify } from "./notify-content.mjs";

const latest = { id: "2026-10-07", note: "la ropa, ir a + infinitivo" };
const now = new Date("2026-10-08T10:00:00Z");
const user = { settings: { notifyContent: true } };

describe("new content notification", () => {
  it("notifies a device that hasn't heard about the newest class", () => {
    expect(shouldNotify(user, {}, latest, now)).toBe(true);
    expect(shouldNotify(user, { lastContent: "2026-10-02" }, latest, now)).toBe(true);
  });
  it("notifies each device only once per class", () => {
    expect(shouldNotify(user, { lastContent: "2026-10-07" }, latest, now)).toBe(false);
  });
  it("respects the switch (missing setting = on)", () => {
    expect(shouldNotify({ settings: { notifyContent: false } }, {}, latest, now)).toBe(false);
    expect(shouldNotify({ settings: {} }, {}, latest, now)).toBe(true);
  });
  it("doesn't announce old classes", () => {
    expect(shouldNotify(user, {}, latest, new Date("2026-11-01T10:00:00Z"))).toBe(false);
    expect(shouldNotify(user, {}, null, now)).toBe(false);
  });
  it("uses the class note in the message", () => {
    expect(contentMessage(latest).body).toContain("la ropa");
  });
});
