import { useEffect, useMemo, useState } from "react";
import { cards } from "../../lib/cards";
import { addXP, update, useAppState } from "../../lib/store";
import { autoSpeak } from "../../lib/speech";
import { shuffle } from "../../lib/util";
import type { Card } from "../../lib/types";
import { Ic } from "../../components/icons";
import { useNav } from "../../app/navigation";
import { ExitBtn } from "./ExitBtn";
import "./games.css";

/** «Parejas»: match 6 Spanish words to their Croatian meaning against the clock */
const pairSet = (): Card[] => {
  const out: Card[] = [],
    seen = new Set<string>();
  for (const c of shuffle(cards().filter(c => c.es.length < 28 && c.hr.length < 30))) {
    if (seen.has(c.hr)) continue;
    seen.add(c.hr);
    out.push(c);
    if (out.length === 6) break;
  }
  return out;
};
export const Pairs = () => {
  const { go } = useNav();
  const [round, setRound] = useState(0);
  const set = useMemo(pairSet, [round]);
  const left = useMemo(() => shuffle(set), [set]),
    right = useMemo(() => shuffle(set), [set]);
  const [selL, setSelL] = useState<string | null>(null),
    [selR, setSelR] = useState<string | null>(null);
  const [gone, setGone] = useState<string[]>([]),
    [bad, setBad] = useState<[string, string] | null>(null);
  const [errors, setErrors] = useState(0),
    [t0, setT0] = useState(Date.now()),
    [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<{ secs: number; rec: boolean } | null>(null);
  const best = useAppState().best.pairs_time;
  useEffect(() => {
    if (result) return;
    const iv = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(iv);
  }, [result]);
  useEffect(() => {
    if (!selL || !selR) return;
    if (selL === selR) {
      const g = [...gone, selL];
      setGone(g);
      addXP(1);
      if (g.length === 6) {
        const secs = Math.round((Date.now() - t0) / 1000) + errors * 2;
        const rec = !best || secs < best;
        if (rec)
          update(s => {
            s.best.pairs_time = secs;
          });
        setResult({ secs, rec });
      }
    } else {
      setErrors(e => e + 1);
      setBad([selL, selR]);
      window.setTimeout(() => setBad(null), 450);
    }
    setSelL(null);
    setSelR(null);
  }, [selL, selR]); // eslint-disable-line
  const again = () => {
    setRound(r => r + 1);
    setGone([]);
    setErrors(0);
    setT0(Date.now());
    setResult(null);
  };
  if (result)
    return (
      <section className="view">
        <div className="qcard done pop">
          <div className="hand">{result.rec ? "¡Nuevo récord!" : "¡Hecho!"}</div>
          <div className="score">{result.secs} s</div>
          <p className="hr">{errors} errores (+2 s cada uno)</p>
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
  const cls = (id: string, side: "L" | "R") =>
    gone.includes(id) ? "gone" : bad && bad[side === "L" ? 0 : 1] === id ? "bad" : (side === "L" ? selL : selR) === id ? "sel" : "";
  return (
    <section className="view">
      <div className="gamehead">
        <ExitBtn onClick={() => go("juegos")} />
        <h2>Parejas</h2>
        <span className="timer">{Math.round((now - t0) / 1000)} s</span>
      </div>
      <p>Izquierda: español. Derecha: croata.</p>
      <div className="pairs">
        {left.map((c, i) => [
          <button
            key={"L" + c.id}
            className={cls(c.id, "L")}
            onClick={() => {
              autoSpeak(c.es);
              setSelL(c.id);
            }}
          >
            {c.es}
          </button>,
          <button key={"R" + right[i].id} className={cls(right[i].id, "R")} onClick={() => setSelR(right[i].id)}>
            {right[i].hr}
          </button>,
        ])}
      </div>
    </section>
  );
};
