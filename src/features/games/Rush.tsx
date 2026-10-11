import { useEffect, useRef, useState } from "react";
import { cards } from "../../lib/cards";
import { addXP, update, useAppState } from "../../lib/store";
import { vocabMC } from "../../lib/questions";
import { pick } from "../../lib/util";
import type { Card } from "../../lib/types";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { useNav } from "../../app/navigation";
import { ExitBtn } from "./ExitBtn";
import "./games.css";

/** «Contrarreloj»: 60 s of multiple choice, a mistake costs 3 s */
export const Rush = () => {
  const { go } = useNav();
  const [run, setRun] = useState(0);
  const [left, setLeft] = useState(60),
    [score, setScore] = useState(0),
    [missed, setMissed] = useState<Card[]>([]);
  const [q, setQ] = useState(() => vocabMC(pick(cards())));
  const [chosen, setChosen] = useState<number | null>(null);
  const [over, setOver] = useState<{ rec: boolean } | null>(null);
  const best = useAppState().best.rush || 0;
  const scoreRef = useRef(0);
  scoreRef.current = score;
  useEffect(() => {
    if (over) return;
    const iv = window.setInterval(() => setLeft(l => l - 1), 1000);
    return () => window.clearInterval(iv);
  }, [over, run]);
  useEffect(() => {
    if (left <= 0 && !over) {
      const rec = scoreRef.current > best;
      if (rec)
        update(s => {
          s.best.rush = scoreRef.current;
        });
      setOver({ rec });
    }
  }, [left]); // eslint-disable-line
  const answer = (i: number) => {
    if (chosen !== null || over) return;
    setChosen(i);
    const ok = i === q.correct;
    if (ok) {
      setScore(s => s + 1);
      addXP(1);
    } else {
      setMissed(m => [...m, cards().find(c => c.es === q.prompt)!]);
      setLeft(l => Math.max(0, l - 3));
    }
    window.setTimeout(
      () => {
        setChosen(null);
        setQ(vocabMC(pick(cards())));
      },
      ok ? 250 : 900,
    );
  };
  const again = () => {
    setRun(r => r + 1);
    setLeft(60);
    setScore(0);
    setMissed([]);
    setOver(null);
    setChosen(null);
    setQ(vocabMC(pick(cards())));
  };
  if (over)
    return (
      <section className="view">
        <div className="qcard done pop">
          <div className="hand">{over.rec ? "¡Nuevo récord!" : "¡Tiempo!"}</div>
          <div className="score">{score}</div>
          {missed.length > 0 && (
            <div className="mistakes">
              {missed.slice(0, 8).map((c, i) => (
                <div key={i}>
                  {c.es} = {c.hr}
                </div>
              ))}
            </div>
          )}
          <div className="row" style={{ justifyContent: "center" }}>
            <button className="btn primary" onClick={again}>
              <Ic.again /> Otra vez
            </button>
            <button className="btn" onClick={() => go("juegos")}>
              <Ic.back /> Volver
            </button>
          </div>
        </div>
      </section>
    );
  return (
    <section className="view">
      <div className="gamehead">
        <ExitBtn onClick={() => go("juegos")} />
        <h2>Contrarreloj</h2>
        <span className="pill">
          Puntos <b>{score}</b>
        </span>
        <span className="timer">{left}</span>
      </div>
      <p>
        Error = −3 segundos. <Hint>Svaka greška oduzima 3 sekunde.</Hint>
      </p>
      <div className="qcard pop" key={q.prompt + score + missed.length}>
        <div className="qmain">{q.prompt}</div>
        <div className="opts">
          {q.options.map((o, i) => (
            <button key={i} className={"opt" + (chosen !== null && i === q.correct ? " ok" : chosen === i ? " bad" : "")} onClick={() => answer(i)}>
              {o}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
