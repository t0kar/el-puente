import type { Verb } from "./types";
import { esc } from "./util";

export const PERSONS = ["yo", "tú", "él / ella / usted", "nosotros", "vosotros", "ellos / ustedes"];
export const PERSONS_SHORT = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];
export const REFL = ["me", "te", "se", "nos", "os", "se"];
export const ENDINGS: Record<string, string[]> = { ar: ["o", "as", "a", "amos", "áis", "an"], er: ["o", "es", "e", "emos", "éis", "en"], ir: ["o", "es", "e", "imos", "ís", "en"] };

function applyChange(stem: string, type: string) {
  const [from, to] = type.split("-");
  const i = stem.lastIndexOf(from);
  return i < 0 ? stem : stem.slice(0, i) + to + stem.slice(i + 1);
}
export const verbBase = (v: Verb) => (v.refl ? v.inf.slice(0, -2) : v.inf);
export function conj(v: Verb, p: number) {
  const base = verbBase(v);
  const g = base.slice(-2), stem0 = base.slice(0, -2), end = ENDINGS[g][p];
  const inBoot = [0, 1, 2, 5].includes(p);
  let stem = stem0, changed = false;
  if (v.type && inBoot) { stem = applyChange(stem0, v.type); changed = true; }
  let form = stem + end, irregular = false;
  if (v.irr) { irregular = v.irr[p] !== stem0 + end; form = v.irr[p]; changed = irregular; }
  const full = v.refl ? REFL[p] + " " + form : form;
  let formula: string;
  if (v.irr) formula = irregular ? `<b>${esc(form)}</b> · nepravilno${v.note ? " (" + esc(v.note) + ")" : ""}` : `${esc(stem0)} + <u>${esc(end)}</u>`;
  else if (changed) formula = `${esc(stem0)} → <b>${esc(stem)}</b> (${v.type!.replace("-", "→")}) + <u>${esc(end)}</u>`;
  else formula = `${esc(stem0)} + <u>${esc(end)}</u>${v.type ? " · izvan čizme, bez promjene" : ""}`;
  if (v.refl) formula = `<u>${REFL[p]}</u> + ` + formula;
  /** the wrong "no stem change" form, a useful distractor */
  const naive = (v.refl ? REFL[p] + " " : "") + stem0 + end;
  return { form: full, changed, formula, inBoot, naive };
}
export function imperative(v: Verb, who: "tu" | "usted") {
  const g = v.inf.slice(-2), stem = v.inf.slice(0, -2);
  if (who === "tu") return { form: stem + (g === "ar" ? "a" : "e"), formula: `tú = oblik za él: ${esc(stem)} + <u>${g === "ar" ? "a" : "e"}</u>` };
  return { form: stem + (g === "ar" ? "e" : "a"), formula: `usted: ${esc(stem)} + <u>${g === "ar" ? "e" : "a"}</u> (zamjena samoglasnika)` };
}
export const verbGroup = (v: Verb) => (v.irr ? "irr" : v.type ? v.type : v.refl ? "refl" : "reg");
