import { useState } from "react";
import type { TilesQ } from "../../lib/types";
import { Hint } from "../../components/Hint";
import { After } from "./Feedback";
import { Prompt } from "./Prompt";
import type { QProps } from "./types";

/** build a number from word tiles */
export const TilesView = ({ q, onResult, onNext }: QProps<TilesQ>) => {
  const [chosen, setChosen] = useState<number[]>([]);
  const [done, setDone] = useState<boolean | null>(null);
  const check = () => {
    if (!chosen.length || done !== null) return;
    const ok = chosen.map(i => q.pool[i]).join(" ") === q.target.join(" ");
    setDone(ok);
    onResult(ok, 3);
  };
  return (
    <>
      <Prompt q={q} />
      <p>
        Construye el número con palabras. <Hint>Složi broj riječima. Klik na pločicu da je makneš.</Hint>
      </p>
      <div className="slot" aria-label="Tu respuesta">
        {chosen.map((i, k) => (
          <button key={k} className="tile" disabled={done !== null} onClick={() => setChosen(c => c.filter((_, j) => j !== k))}>
            {q.pool[i]}
          </button>
        ))}
      </div>
      <div className="tiles">
        {q.pool.map((w, i) => (
          <button key={i} className={"tile" + (chosen.includes(i) ? " used" : "")} disabled={done !== null} onClick={() => setChosen(c => [...c, i])}>
            {w}
          </button>
        ))}
      </div>
      {done === null && (
        <button className="btn primary big" onClick={check}>
          Comprobar
        </button>
      )}
      {done !== null && (
        <After q={q} onNext={onNext} fb={{ kind: done ? "ok" : "bad", title: done ? "¡Perfecto!" : "Así: " + q.target.join(" "), why: q.explain }} />
      )}
    </>
  );
};
