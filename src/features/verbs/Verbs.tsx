import { useState } from "react";
import { activeVerbs } from "../../lib/level";
import { SHEETS } from "../../content";
import { setSetting, useSettings } from "../../lib/store";
import { verbGroup, verbBase } from "../../lib/verbs";
import { verbSession } from "../../lib/questions";
import { esc } from "../../lib/util";
import type { Verb } from "../../lib/types";
import { ConjGrid } from "../../components/ConjGrid";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { Seg } from "../../components/Seg";
import { SheetHtml } from "../../components/SheetHtml";
import { useNav } from "../../app/navigation";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../../components/Toast";
import { Boot } from "../../components/Boot";

const GROUPS: [string, string][] = [
  ["reg", "Regulares"],
  ["o-ue", "o→ue"],
  ["e-ie", "e→ie"],
  ["e-i", "e→i"],
  ["u-ue", "u→ue"],
  ["irr", "Irregulares"],
  ["refl", "Reflexivos"],
  ["imp", "Imperativo"],
];

export const Verbs = () => {
  const settings = useSettings();
  const { start } = useNav();
  const toast = useToast();
  const [sel, setSel] = useState<string[]>(["reg", "o-ue", "e-ie", "irr"]);
  const [vi, setVi] = useState(0);
  const VERBS = activeVerbs();
  const pool = () => {
    let vs: Verb[] = VERBS.filter(v => sel.includes(verbGroup(v)) || (sel.includes("refl") && v.refl));
    if (sel.includes("imp")) vs = vs.concat(VERBS.filter(v => !v.irr && !v.type && !v.refl).map(v => ({ ...v, _imp: true })));
    return vs;
  };
  const v = VERBS[vi] || VERBS[0],
    base = verbBase(v);
  const expl = v.irr
    ? v.note || "Nepravilan: nauči napamet."
    : v.type
      ? `Promjena ${v.type.replace("-", "→")} u «čizmi» (yo, tú, él, ellos).`
      : v.refl
        ? "Refleksivni: zamjenica + pravilan glagol."
        : "Pravilan: osnova + nastavak.";
  const boot = SHEETS.find(s => s.t.includes("bota"));
  return (
    <section className="view">
      <h1>
        <span className="mark pink">Verbos = fórmulas</span>
      </h1>
      <p
        className="formula"
        dangerouslySetInnerHTML={{ __html: "forma = <b>osnova</b> + <u>nastavak</u><br>dorm<u>ir</u>, yo → dorm → duerm (o→ue) + <u>o</u> = duermo" }}
      />
      <div className="card stack">
        <h3>Entrenamiento</h3>
        <div className="row">
          {GROUPS.map(([k, t]) => (
            <button key={k} className="chip" aria-pressed={sel.includes(k)} onClick={() => setSel(s => (s.includes(k) ? s.filter(x => x !== k) : [...s, k]))}>
              {t}
            </button>
          ))}
        </div>
        <div className="toggle">
          <span>Modo</span>
          <Seg
            options={[
              ["type", "Escribir"],
              ["mc", "Elegir"],
            ]}
            value={settings.verbMode}
            onChange={m => setSetting("verbMode", m)}
          />
        </div>
        <button
          className="btn primary big"
          onClick={() => {
            const p = pool();
            if (!p.length) return toast.show("Elige al menos un grupo.");
            start(verbSession(p));
          }}
        >
          <Ic.play /> 12 preguntas
        </button>
      </div>
      <div className="card stack">
        <h3>Tabla de un verbo</h3>
        <select id="verb-pick" className="answer-input" style={{ fontSize: "1rem", minHeight: 44 }} value={vi} onChange={e => setVi(+e.target.value)}>
          {VERBS.map((x, i) => (
            <option key={x.inf} value={i}>
              {x.inf} · {x.hr}
            </option>
          ))}
        </select>
        <p
          className="formula"
          dangerouslySetInnerHTML={{ __html: `${esc(v.inf)} = <b>${esc(base.slice(0, -2))}</b> + <u>${esc(base.slice(-2))}</u>${v.refl ? " + se" : ""}` }}
        />
        <p>
          <Hint>{expl + " Klik na oblik = izgovor."}</Hint>
        </p>
        <ConjGrid verb={v} />
      </div>
      {boot && (
        <div className="card sheet">
          <h3>La bota</h3>
          <SheetHtml html={boot.html} />
          <Boot />
        </div>
      )}
      <Toast msg={toast.msg} />
    </section>
  );
};
