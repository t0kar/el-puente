import { useEffect, useRef } from "react";
import type { Question } from "../../lib/types";
import { autoSpeak } from "../../lib/speech";
import { ConjGrid } from "../../components/ConjGrid";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import type { Fb } from "./types";

export const Feedback = ({ fb }: { fb: Fb }) => {
  return (
    <div className={"fb " + fb.kind} role="status">
      <b>{fb.title}</b>
      {fb.diff && (
        <span className="why diff">
          {fb.diff.map((d, i) => (
            <span key={i} className={d.ok ? "w-ok" : "w-bad"}>
              {d.w}{" "}
            </span>
          ))}
        </span>
      )}
      {fb.why && <span className="why">{/class="formula"/.test(fb.why) ? <span dangerouslySetInnerHTML={{ __html: fb.why }} /> : <Hint html={fb.why} />}</span>}
    </div>
  );
};

/** "Siguiente": focused, and Enter also continues */
const NextBtn = ({ onNext }: { onNext: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const k = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onNext();
      }
    };
    const t = window.setTimeout(() => document.addEventListener("keydown", k), 60);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", k);
    };
  }, [onNext]);
  return (
    <button ref={ref} className="btn primary big" onClick={onNext}>
      Siguiente <Ic.next />
    </button>
  );
};

/** everything below an answered question: feedback, verb table, next button */
export const After = ({ q, fb, onNext }: { q: Question; fb: Fb; onNext: () => void }) => {
  useEffect(() => {
    if (q.speak) autoSpeak(q.speak);
  }, [q]);
  return (
    <>
      <Feedback fb={fb} />
      {q.grid && <ConjGrid verb={q.grid.verb} highlight={q.grid.person} />}
      <NextBtn onNext={onNext} />
    </>
  );
};
