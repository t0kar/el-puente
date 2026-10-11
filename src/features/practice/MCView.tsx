import { useEffect, useState } from "react";
import type { MCQ } from "../../lib/types";
import { shuffle } from "../../lib/util";
import { After } from "./Feedback";
import { Prompt } from "./Prompt";
import { praise, type QProps } from "./types";

/** multiple choice; keys 1–4 pick an option */
export const MCView = ({ q, onResult, onNext }: QProps<MCQ>) => {
  const [order] = useState(() => (q.shuffle ? shuffle(q.options.map((_, i) => i)) : q.options.map((_, i) => i)));
  const [chosen, setChosen] = useState<number | null>(null);
  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    onResult(i === q.correct, 2);
  };
  useEffect(() => {
    if (chosen !== null) return;
    const k = (e: KeyboardEvent) => {
      const n = +e.key;
      if (n >= 1 && n <= order.length) choose(order[n - 1]);
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  });
  const ok = chosen === q.correct;
  return (
    <>
      <Prompt q={q} />
      <div className="opts">
        {order.map((i, k) => (
          <button
            key={i}
            className={"opt" + (chosen !== null && i === q.correct ? " ok" : chosen === i ? " bad" : "")}
            disabled={chosen !== null}
            onClick={() => choose(i)}
          >
            <span className="hr">{k + 1} </span>
            {q.options[i]}
          </button>
        ))}
      </div>
      {chosen !== null && (
        <After
          q={q}
          onNext={onNext}
          fb={{ kind: ok ? "ok" : "bad", title: ok ? praise() : "Casi... la respuesta es: " + q.options[q.correct], why: q.explain }}
        />
      )}
    </>
  );
};
