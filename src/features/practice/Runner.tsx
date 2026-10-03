import { useRef, useState } from "react";
import type { FlipQ, Question, SessionSpec } from "../../lib/types";
import { addXP } from "../../lib/store";
import { schedule, sGet } from "../../lib/srs";
import { Ic } from "../../components/icons";
import { FlipView } from "./FlipView";
import { MCView } from "./MCView";
import { TilesView } from "./TilesView";
import { TypeView } from "./TypeView";
import "./practice.css";

/** plays a practice session: a queue of questions, wrong answers come back once, summary at the end */
export const Runner = ({ spec, onExit, onRestart }: { spec: SessionSpec; onExit: () => void; onRestart: (s: SessionSpec) => void }) => {
  const queue = useRef<Question[]>([...spec.questions]);
  const total = spec.questions.length;
  const stats = useRef({ done: 0, correct: 0, xp: 0, mistakes: [] as Question[], retried: new Set<Question>() });
  const [cur, setCur] = useState<Question | null>(() => queue.current.shift() ?? null);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(!cur);

  const next = () => {
    const q = queue.current.shift();
    if (!q) setFinished(true);
    else {
      setCur(q);
      setStep(s => s + 1);
    }
    window.scrollTo({ top: 0 });
  };
  const result = (q: Question, ok: boolean, gain: number) => {
    const s = stats.current;
    if (!q._counted) {
      q._counted = true;
      s.done++;
      if (ok) s.correct++;
      else s.mistakes.push(q);
    }
    if (ok) {
      s.xp += gain;
      addXP(gain);
    }
    if (!ok && !s.retried.has(q) && q.kind !== "flip") {
      s.retried.add(q);
      queue.current.splice(Math.min(queue.current.length, 3), 0, { ...q, _counted: true, _retry: true });
    }
  };
  const rate = (q: FlipQ, r: 1 | 2 | 3 | 4) => {
    if (!q.cram || r === 1 || !sGet(q.card.id)) schedule(q.card.id, r);
    const s = stats.current;
    if (r === 1) {
      if (!q._counted) {
        q._counted = true;
        s.done++;
        s.mistakes.push(q);
      }
      queue.current.splice(Math.min(queue.current.length, 4), 0, { ...q, _retry: true });
    } else {
      if (!q._counted) {
        q._counted = true;
        s.done++;
        s.correct++;
      }
      const g = r >= 3 ? 2 : 1;
      s.xp += g;
      addXP(g);
    }
    next();
  };
  const s = stats.current;
  const pct = Math.min(100, (100 * s.done) / total);

  if (finished) {
    const p = s.done ? Math.round((100 * s.correct) / s.done) : 0;
    const msg =
      s.done === 0
        ? "Sesión cerrada."
        : p === 100
          ? "¡Impecable! Ni un error."
          : p >= 80
            ? "¡Muy bien! Casi perfecto."
            : p >= 50
              ? "Bien. Los errores vuelven pronto para repasar."
              : "Hoy cuesta. Repetir es aprender.";
    return (
      <div className="runner">
        <div className="qcard done pop">
          <div className="hand">{spec.title}</div>
          <div className="score">
            {s.correct}/{s.done}
          </div>
          <p>{msg}</p>
          <span className="pill">
            +<b>{s.xp}</b> XP
          </span>
          {s.mistakes.length > 0 && (
            <>
              <h3>Para repasar</h3>
              <div className="mistakes">
                {s.mistakes.slice(0, 12).map((q, i) => (
                  <div key={i}>
                    {q.kind === "flip"
                      ? `${q.card.es} = ${q.card.hr}`
                      : `${q.prompt || "Reloj"} → ${q.kind === "mc" ? q.options[q.correct] : q.kind === "tiles" ? q.target.join(" ") : q.answers[0]}`}
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="row" style={{ justifyContent: "center" }}>
            {spec.again && (
              <button className="btn primary" onClick={() => onRestart(spec.again!())}>
                <Ic.again /> Otra ronda
              </button>
            )}
            <button className="btn" onClick={onExit}>
              <Ic.back /> Volver
            </button>
          </div>
        </div>
      </div>
    );
  }
  const q = cur!;
  return (
    <div className="runner">
      <div className="rhead">
        <button className="icon-btn" aria-label="Salir" title="Salir" onClick={() => setFinished(true)}>
          <Ic.close />
        </button>
        <div className="bar">
          <i style={{ width: pct + "%" }} />
        </div>
        <span className="mastery">
          {Math.min(s.done, total)}/{total}
        </span>
      </div>
      <div className="qcard pop" key={step}>
        <div className="row">
          <span className="qtag">
            {q._retry ? "Otra vez · " : ""}
            {q.tag}
          </span>
        </div>
        {q.kind === "flip" ? (
          <FlipView q={q} onRate={r => rate(q, r)} />
        ) : q.kind === "mc" ? (
          <MCView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />
        ) : q.kind === "type" ? (
          <TypeView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />
        ) : (
          <TilesView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />
        )}
      </div>
    </div>
  );
};
