import { describe, expect, it } from "vitest";
import { splitSentences } from "./reader";

const texts = (t: string) => splitSentences(t).map(s => s.text);

describe("splitSentences", () => {
  it("splits after . ! ? and keeps offsets pointing into the text", () => {
    const t = "¡Hola! Me llamo Paco. ¿Y tú?";
    const s = splitSentences(t);
    expect(s.map(x => x.text)).toEqual(["¡Hola!", "Me llamo Paco.", "¿Y tú?"]);
    for (const x of s) expect(t.slice(x.start, x.end)).toBe(x.text);
  });
  it("starts a new sentence at a dialogue dash", () => {
    expect(texts("Habla con un señor: — Buenos días. — Hola.")).toEqual(["Habla con un señor:", "— Buenos días.", "— Hola."]);
  });
  it("keeps closing quotes with their sentence", () => {
    expect(texts("Paco dice: «¡Encantado!» y le da la mano.")).toEqual(["Paco dice: «¡Encantado!»", "y le da la mano."]);
  });
  it("merges tiny fragments into the next sentence", () => {
    expect(texts("— ¿Qué? Nada.")).toEqual(["— ¿Qué?", "Nada."]);
  });
});
