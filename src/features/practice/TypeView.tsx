import { useEffect, useRef, useState } from "react";
import type { TypeQ } from "../../lib/types";
import { checkAnswer, wordDiff, type CheckRes } from "../../lib/check";
import { AccentBar } from "../../components/AccentBar";
import { After } from "./Feedback";
import { Prompt } from "./Prompt";
import { praise, type Fb, type QProps } from "./types";

/** typed answer (verbs, listening, dictation); tolerant checking lives in lib/check.ts */
export const TypeView = ({ q, onResult, onNext }: QProps<TypeQ>) => {
  const [val, setVal] = useState("");
  const [res, setRes] = useState<CheckRes | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 60);
    return () => window.clearTimeout(t);
  }, []);
  const check = () => {
    if (!val.trim() || res) return;
    let r: CheckRes = q.numeric ? (val.replace(/\D/g, "") === q.answers[0] ? "ok" : "bad") : checkAnswer(val, q.answers, q.dict ? 2 : 1);
    if (q.strict && r === "typo") r = "bad";
    setRes(r);
    onResult(r !== "bad", r === "ok" ? 3 : 2);
  };
  const ans = q.answers[0];
  const fb: Fb | null =
    res &&
    (
      {
        ok: { kind: "ok", title: praise() },
        accent: { kind: "warn", title: "Bien, pero ojo con el acento: " + ans },
        article: { kind: "warn", title: "Bien. Con artículo: " + ans },
        typo: { kind: "warn", title: "Casi perfecto: " + ans },
        bad: { kind: "bad", title: "No. La respuesta: " + ans },
      } as Record<CheckRes, Fb>
    )[res];
  if (fb && q.dict && res !== "ok") {
    fb.diff = wordDiff(val, ans);
    fb.title = res === "bad" ? "Compara:" : fb.title;
  }
  if (fb && !q.dict) fb.why = q.explain;
  return (
    <>
      <Prompt q={q} />
      <input
        ref={ref}
        className="answer-input"
        value={val}
        disabled={!!res}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
            check();
          }
        }}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        inputMode={q.numeric ? "numeric" : "text"}
        aria-label="Tu respuesta"
        placeholder="Escribe aquí…"
      />
      {!res && !q.numeric && <AccentBar inputRef={ref} />}
      {!res && (
        <button className="btn primary big" onClick={check}>
          Comprobar
        </button>
      )}
      {fb && <After q={q} fb={fb} onNext={onNext} />}
    </>
  );
};
