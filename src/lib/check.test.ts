import { describe, expect, it } from "vitest";
import { checkAnswer, wordDiff } from "./check";

describe("checkAnswer", () => {
  it("accepts exact answers, ignoring case, punctuation and notes in parentheses", () => {
    expect(checkAnswer("Buenos días", ["¡Buenos días!"])).toBe("ok");
    expect(checkAnswer("la planta", ["la planta (del edificio)"])).toBe("ok");
  });
  it("accepts any alternative written with = or /", () => {
    expect(checkAnswer("el jugo", ["el zumo = el jugo"])).toBe("ok");
    expect(checkAnswer("cansada", ["cansado / cansada"])).toBe("ok");
  });
  it("flags a missing accent separately from a wrong answer", () => {
    expect(checkAnswer("adios", ["adiós"])).toBe("accent");
  });
  it("flags a missing or different article", () => {
    expect(checkAnswer("mesa", ["la mesa"])).toBe("article");
  });
  it("tolerates a one-letter typo in longer words, but not in short ones", () => {
    expect(checkAnswer("cocinra", ["cocinera"])).toBe("typo");
    expect(checkAnswer("sol", ["sal"])).toBe("bad");
  });
  it("rejects empty and wrong answers", () => {
    expect(checkAnswer("  ", ["casa"])).toBe("bad");
    expect(checkAnswer("perro", ["gato"])).toBe("bad");
  });
});

describe("wordDiff", () => {
  it("marks each word of the target as right or wrong", () => {
    expect(wordDiff("Me llamo Pako", "Me llamo Paco.")).toEqual([
      { w: "me", ok: true },
      { w: "llamo", ok: true },
      { w: "paco", ok: false },
    ]);
  });
});
