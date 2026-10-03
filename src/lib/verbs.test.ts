import { describe, expect, it } from "vitest";
import { conj, imperative } from "./verbs";
import type { Verb } from "./types";

const forms = (v: Verb) => [0, 1, 2, 3, 4, 5].map(p => conj(v, p).form);

describe("conj", () => {
  it("conjugates regular -ar / -er / -ir verbs", () => {
    expect(forms({ inf: "hablar", hr: "" })).toEqual(["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"]);
    expect(forms({ inf: "comer", hr: "" })[3]).toBe("comemos");
    expect(forms({ inf: "vivir", hr: "" })[4]).toBe("vivís");
  });
  it("changes the stem only inside the boot (yo, tú, él, ellos)", () => {
    expect(forms({ inf: "dormir", hr: "", type: "o-ue" })).toEqual(["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"]);
    expect(forms({ inf: "pedir", hr: "", type: "e-i" })[2]).toBe("pide");
    expect(forms({ inf: "jugar", hr: "", type: "u-ue" })[0]).toBe("juego");
  });
  it("changes the last matching vowel of the stem", () => {
    expect(conj({ inf: "preferir", hr: "", type: "e-ie" }, 0).form).toBe("prefiero");
  });
  it("puts the pronoun before reflexive verbs", () => {
    expect(forms({ inf: "despertarse", hr: "", type: "e-ie", refl: true })).toEqual([
      "me despierto",
      "te despiertas",
      "se despierta",
      "nos despertamos",
      "os despertáis",
      "se despiertan",
    ]);
  });
  it("uses the listed forms for irregular verbs", () => {
    const tener: Verb = { inf: "tener", hr: "", irr: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"] };
    expect(forms(tener)).toEqual(tener.irr);
    expect(conj(tener, 3).changed).toBe(false);
    expect(conj(tener, 0).changed).toBe(true);
  });
});

describe("imperative", () => {
  it("tú = the él form, usted = swap the vowel", () => {
    expect(imperative({ inf: "cortar", hr: "" }, "tu").form).toBe("corta");
    expect(imperative({ inf: "cortar", hr: "" }, "usted").form).toBe("corte");
    expect(imperative({ inf: "abrir", hr: "" }, "usted").form).toBe("abra");
  });
});
