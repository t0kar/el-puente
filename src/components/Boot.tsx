import { useState } from "react";
import { activeVerbs } from "../lib/level";
import { conj, PERSONS_SHORT, REFL, verbBase } from "../lib/verbs";
import { speak } from "../lib/speech";
import type { StemType, Verb } from "../lib/types";

const TYPES: StemType[] = ["o-ue", "e-ie", "e-i", "u-ue"];
/** irregular verb whose note names this change (decir: "plus e→i", tener: "ostalo e→ie") */
const named = (v: Verb, t: StemType) => !v.type && !!v.irr && new RegExp(t.replace("-", "→") + "(?![a-z])").test(v.note || "");
/** stem-changing verbs by type, plus the irregular ones that share the change */
function groups(): [StemType, Verb[]][] {
  const vs = activeVerbs();
  return TYPES.map(t => [t, vs.filter(v => v.type === t || named(v, t))] as [StemType, Verb[]]).filter(([, l]) => l.length);
}
/** form with the changed part marked: emp<b>ie</b>zo, d<b>ig</b>o */
function marked(v: Verb, p: number, form: string, naive: string) {
  const t = v.type || TYPES.find(x => named(v, x));
  let start = -1, end = -1;
  if (t) { // where the vowel change lands: last `from` in the stem → `to`
    const [from, to] = t.split("-");
    const i = verbBase(v).slice(0, -2).lastIndexOf(from);
    if (i >= 0) { start = (v.refl ? REFL[p].length + 1 : 0) + i; end = start + to.length; }
  }
  if (!v.type) { // irregular: whatever differs from the regular form, joined with the vowel change if they touch
    let a = 0; while (a < form.length && form[a] === naive[a]) a++;
    let b = 0; while (b < form.length - a && form[form.length - 1 - b] === naive[naive.length - 1 - b]) b++;
    const dEnd = form.length - b;
    if (start < 0 || dEnd <= start || a >= end) { start = a; end = dEnd; } else { start = Math.min(start, a); end = Math.max(end, dEnd); }
  }
  if (start < 0 || end <= start) return form;
  return <>{form.slice(0, start)}<b className="chg">{form.slice(start, end)}</b>{form.slice(end)}</>;
}
// grid order: singular left, plural right
const ROWS = [[0, 3], [1, 4], [2, 5]];

/** the «bota»: tap a verb to see its six forms, the four inside the boot change the stem */
export function Boot() {
  const gs = groups();
  const [inf, setInf] = useState(gs[0]?.[1][0]?.inf || "");
  const v = gs.flatMap(([, l]) => l).find(x => x.inf === inf) || gs[0]?.[1][0];
  if (!v) return null;
  return (
    <div className="stack">
      <div className="bootbox">
        <div className="boot-title"><b>{v.inf}</b> <span className="hr">{v.hr}</span>{v.type && <code>{v.type.replace("-", " → ")}</code>}</div>
        <div className="boot" aria-label={"Bota: " + v.inf} aria-live="polite">
          {ROWS.flat().map(p => {
            const c = conj(v, p), inside = [0, 1, 2, 5].includes(p);
            return (
              <button type="button" key={v.inf + p} className={(inside ? "in" : "out") + " pop"} onClick={() => speak(c.form)} title="Escuchar">
                <small>{PERSONS_SHORT[p]}</small>{c.changed ? marked(v, p, c.form, c.naive) : c.form}
              </button>
            );
          })}
        </div>
      </div>
      <p className="hint">Obojana polja čine «čizmu»: samo tu se osnova mijenja. Nosotros i vosotros su izvan čizme pa ostaju bez promjene. <b>Dodirni glagol</b> da ga vidiš u čizmi, a oblik da ga čuješ.</p>
      <ul className="rules">
        {gs.map(([t, list]) => (
          <li key={t}><code>{t.replace("-", " → ")}</code>
            <span className="words">{list.map(x => (
              <button type="button" key={x.inf} className="word" aria-pressed={x.inf === v.inf} onClick={() => { setInf(x.inf); speak(x.inf); }}>{x.inf}</button>
            ))}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
