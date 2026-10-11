import { describe, expect, it } from "vitest";
import { issueFor } from "./report-issues.mjs";

describe("error report → GitHub issue", () => {
  it("puts the question in the title and the context in a table", () => {
    const r = {
      at: Date.UTC(2026, 9, 11),
      text: "Sí i tampoco su oba točna",
      ua: "iPhone",
      ctx: {
        kind: "question",
        tag: "Regla rápida",
        prompt: "— A mí no me gusta estudiar. — A mí ___.",
        options: ["sí", "también", "tampoco"],
        answer: "sí",
        lvl: "A1.1",
        key: "rule:x|y",
      },
    };
    const i = issueFor("abc", r);
    expect(i.title).toBe("[Reporte] Regla rápida: — A mí no me gusta estudiar. — A mí ___. → sí");
    expect(i.body).toContain("> Sí i tampoco su oba točna");
    expect(i.body).toContain("| Opciones | sí · también · tampoco |");
    expect(i.body).toContain("rule:x\\|y");
    expect(i.labels).toEqual(["reporte"]);
  });

  it("handles a general report without context and clips long titles", () => {
    const i = issueFor("id1", { text: "x".repeat(300), ctx: { kind: "general" } });
    expect(i.title.length).toBeLessThanOrEqual(110);
    expect(i.title.startsWith("[Reporte] xxx")).toBe(true);
    expect(i.body).toContain("| Tipo | general |");
    expect(i.body).not.toContain("| Pregunta |");
  });
});
