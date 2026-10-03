import { beforeEach, describe, expect, it } from "vitest";
import { cards, customCards, deleteCustomWord, saveCustomWord } from "./cards";
import { defaultState, replaceState } from "./store";

beforeEach(() => replaceState(defaultState()));

describe("custom words", () => {
  it("adds a word to «Mis palabras»", () => {
    expect(saveCustomWord(" la bufanda ", "šal")).toBe("");
    expect(customCards()).toMatchObject([{ es: "la bufanda", hr: "šal", T: "mias" }]);
    expect(cards().some(c => c.es === "la bufanda")).toBe(true);
  });

  it("rejects empty fields and words that already exist (ignoring accents and case)", () => {
    expect(saveCustomWord("", "x")).not.toBe("");
    expect(saveCustomWord("LA COCINA", "x")).toMatch(/ya existe/);
    saveCustomWord("el pulpo azul", "plava hobotnica");
    expect(saveCustomWord("el púlpo azul", "plava hobotnica")).toMatch(/ya existe/);
  });

  it("deleting hides the word but keeps a tombstone for sync", () => {
    saveCustomWord("el pulpo azul", "plava hobotnica");
    const id = customCards()[0].id;
    deleteCustomWord(id);
    expect(customCards()).toHaveLength(0);
  });
});
