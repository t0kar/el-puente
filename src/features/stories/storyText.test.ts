import { describe, expect, it } from "vitest";
import { gapsOf, layout, parse } from "./storyText";

const TEXT = "Me {llamo*|llama::yo → me llamo} Paco. Soy {cocinero*|cocina}.";

describe("story text", () => {
  it("parses gaps with their correct option and explanation", () => {
    const parts = parse(TEXT);
    const gaps = parts.filter(p => typeof p !== "string");
    expect(gaps).toHaveLength(2);
    expect(gaps[0]).toMatchObject({ correct: "llamo", why: "yo → me llamo" });
    expect(gaps[0].opts.sort()).toEqual(["llama", "llamo"]);
    expect(gapsOf({ id: "x", g: "", t: "", hr: "", text: TEXT })).toBe(2);
  });

  it("lays out words and gaps with offsets into the spoken text", () => {
    const parts = parse(TEXT);
    const spoken = parts.map(p => (typeof p === "string" ? p : p.correct)).join("");
    expect(spoken).toBe("Me llamo Paco. Soy cocinero.");
    for (const piece of layout(parts)) {
      const text = piece.kind === "gap" ? piece.p.correct : piece.t;
      expect(spoken.slice(piece.s, piece.e)).toBe(text);
    }
  });
});
