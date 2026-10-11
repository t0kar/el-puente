import { describe, expect, it } from "vitest";
import { num, timeES } from "./numbers";

describe("num", () => {
  it.each([
    [16, "dieciséis"],
    [21, "veintiuno"],
    [31, "treinta y uno"],
    [100, "cien"],
    [101, "ciento uno"],
    [500, "quinientos"],
    [1000, "mil"],
    [2352, "dos mil trescientos cincuenta y dos"],
  ])("%i → %s", (n, words) => expect(num(n)).toBe(words));
});

describe("timeES", () => {
  it("uses «la una» for 1 o'clock and «las» otherwise", () => {
    expect(timeES(1, 0, false)).toBe("Es la una en punto");
    expect(timeES(14, 30, false)).toBe("Son las dos y media");
  });
  it("counts down to the next hour after half past", () => {
    expect(timeES(2, 40, false)).toBe("Son las tres menos veinte");
    expect(timeES(12, 45, false)).toBe("Es la una menos cuarto");
  });
  it("adds the part of the day", () => {
    expect(timeES(20, 10, true)).toBe("Son las ocho y diez de la tarde");
  });
});
