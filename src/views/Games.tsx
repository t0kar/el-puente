import { useEffect, useMemo, useRef, useState } from "react";
import { cards } from "../lib/cards";
import { addXP, update, useAppState } from "../lib/store";
import { gameSessions, vocabMC } from "../lib/questions";
import { autoSpeak } from "../lib/speech";
import { pick, shuffle } from "../lib/util";
import type { Card, Mark } from "../lib/types";
import { Hint, useNav } from "../components/ui";

export function Games() {
  const st = useAppState();
  const { start, go } = useNav();
  const games: [Mark, string, string, string, () => void, string][] = [
    ["green", "↔", "Parejas", "Une 6 palabras con su traducción. Contra el reloj.", () => go("pairs"), st.best.pairs_time ? "Récord: " + st.best.pairs_time + " s" : ""],
    ["green", "60", "Contrarreloj", "60 segundos. ¿Cuántas palabras sabes?", () => go("rush"), st.best.rush ? "Récord: " + st.best.rush : ""],
    ["blue", "♪", "Dictado", "Escucha una frase y escríbela.", () => start(gameSessions.dictation()), ""],
    ["blue", "123", "Números", "Construye, escucha y calcula en español.", () => start(gameSessions.numbers()), ""],
    ["blue", "⌚", "¿Qué hora es?", "Relojes y horas. y / menos / cuarto / media.", () => start(gameSessions.clock()), ""],
    ["yellow", "!", "Reglas rápidas", "ser/estar, hay/está, gusta/gustan, por/a las…", () => start(gameSessions.rules()), ""],
    ["pink", "f(x)", "Fórmula exprés", "10 verbos mezclados, elegir respuesta.", () => start(gameSessions.verbs()), ""],
  ];
  return (
    <section className="view">
      <h1><span className="mark blue">Juegos</span></h1>
      <div className="grid2">
        {games.map(([c, ic, t, d, fn, best]) => (
          <button key={t} className="game" onClick={fn}>
            <span className={"gi " + c}>{ic}</span>
            <span><h3>{t}</h3><span className="hr">{d}</span>{best && <><br /><span className="pill" style={{ marginTop: 6 }}>{best}</span></>}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function pairSet(): Card[] {
  const out: Card[] = [], seen = new Set<string>();
  for (const c of shuffle(cards().filter(c => c.es.length < 28 && c.hr.length < 30))) { if (seen.has(c.hr)) continue; seen.add(c.hr); out.push(c); if (out.length === 6) break; }
  return out;
}
export function Pairs() {
  const { go } = useNav();
  const [round, setRound] = useState(0);
  const set = useMemo(pairSet, [round]);
  const left = useMemo(() => shuffle(set), [set]), right = useMemo(() => shuffle(set), [set]);
  const [selL, setSelL] = useState<string | null>(null), [selR, setSelR] = useState<string | null>(null);
  const [gone, setGone] = useState<string[]>([]), [bad, setBad] = useState<[string, string] | null>(null);
  const [errors, setErrors] = useState(0), [t0, setT0] = useState(Date.now()), [now, setNow] = useState(Date.now());
  const [result, setResult] = useState<{ secs: number; rec: boolean } | null>(null);
  const best = useAppState().best.pairs_time;
  useEffect(() => { if (result) return; const iv = window.setInterval(() => setNow(Date.now()), 500); return () => window.clearInterval(iv); }, [result]);
  useEffect(() => {
    if (!selL || !selR) return;
    if (selL === selR) {
      const g = [...gone, selL]; setGone(g); addXP(1);
      if (g.length === 6) { const secs = Math.round((Date.now() - t0) / 1000) + errors * 2; const rec = !best || secs < best; if (rec) update(s => { s.best.pairs_time = secs; }); setResult({ secs, rec }); }
    } else { setErrors(e => e + 1); setBad([selL, selR]); window.setTimeout(() => setBad(null), 450); }
    setSelL(null); setSelR(null);
  }, [selL, selR]); // eslint-disable-line
  const again = () => { setRound(r => r + 1); setGone([]); setErrors(0); setT0(Date.now()); setResult(null); };
  if (result) return (
    <section className="view"><div className="qcard done pop">
      <div className="hand">{result.rec ? "¡Nuevo récord!" : "¡Hecho!"}</div><div className="score">{result.secs} s</div>
      <p className="hr">{errors} errores (+2 s cada uno)</p>
      <div className="row" style={{ justifyContent: "center" }}><button className="btn primary" onClick={again}>Otra vez</button><button className="btn" onClick={() => go("juegos")}>Volver</button></div>
    </div></section>
  );
  const cls = (id: string, side: "L" | "R") => (gone.includes(id) ? "gone" : bad && bad[side === "L" ? 0 : 1] === id ? "bad" : (side === "L" ? selL : selR) === id ? "sel" : "");
  return (
    <section className="view">
      <div className="row" style={{ justifyContent: "space-between" }}><h2>Parejas</h2><span className="timer">{Math.round((now - t0) / 1000)} s</span><button className="btn ghost" onClick={() => go("juegos")}>Salir</button></div>
      <p>Izquierda: español. Derecha: croata.</p>
      <div className="pairs">
        {left.map((c, i) => [
          <button key={"L" + c.id} className={cls(c.id, "L")} onClick={() => { autoSpeak(c.es); setSelL(c.id); }}>{c.es}</button>,
          <button key={"R" + right[i].id} className={cls(right[i].id, "R")} onClick={() => setSelR(right[i].id)}>{right[i].hr}</button>,
        ])}
      </div>
    </section>
  );
}

export function Rush() {
  const { go } = useNav();
  const [run, setRun] = useState(0);
  const [left, setLeft] = useState(60), [score, setScore] = useState(0), [missed, setMissed] = useState<Card[]>([]);
  const [q, setQ] = useState(() => vocabMC(pick(cards())));
  const [chosen, setChosen] = useState<number | null>(null);
  const [over, setOver] = useState<{ rec: boolean } | null>(null);
  const best = useAppState().best.rush || 0;
  const scoreRef = useRef(0); scoreRef.current = score;
  useEffect(() => {
    if (over) return;
    const iv = window.setInterval(() => setLeft(l => l - 1), 1000);
    return () => window.clearInterval(iv);
  }, [over, run]);
  useEffect(() => { if (left <= 0 && !over) { const rec = scoreRef.current > best; if (rec) update(s => { s.best.rush = scoreRef.current; }); setOver({ rec }); } }, [left]); // eslint-disable-line
  const answer = (i: number) => {
    if (chosen !== null || over) return;
    setChosen(i);
    const ok = i === q.correct;
    if (ok) { setScore(s => s + 1); addXP(1); } else { setMissed(m => [...m, cards().find(c => c.es === q.prompt)!]); setLeft(l => Math.max(0, l - 3)); }
    window.setTimeout(() => { setChosen(null); setQ(vocabMC(pick(cards()))); }, ok ? 250 : 900);
  };
  const again = () => { setRun(r => r + 1); setLeft(60); setScore(0); setMissed([]); setOver(null); setChosen(null); setQ(vocabMC(pick(cards()))); };
  if (over) return (
    <section className="view"><div className="qcard done pop">
      <div className="hand">{over.rec ? "¡Nuevo récord!" : "¡Tiempo!"}</div><div className="score">{score}</div>
      {missed.length > 0 && <div className="mistakes">{missed.slice(0, 8).map((c, i) => <div key={i}>{c.es} = {c.hr}</div>)}</div>}
      <div className="row" style={{ justifyContent: "center" }}><button className="btn primary" onClick={again}>Otra vez</button><button className="btn" onClick={() => go("juegos")}>Volver</button></div>
    </div></section>
  );
  return (
    <section className="view">
      <div className="row" style={{ justifyContent: "space-between" }}><h2>Contrarreloj</h2><span className="pill">Puntos <b>{score}</b></span><span className="timer">{left}</span></div>
      <p>Error = −3 segundos. <Hint>Svaka greška oduzima 3 sekunde.</Hint></p>
      <div className="qcard pop" key={q.prompt + score + missed.length}>
        <div className="qmain">{q.prompt}</div>
        <div className="opts">{q.options.map((o, i) => <button key={i} className={"opt" + (chosen !== null && i === q.correct ? " ok" : chosen === i ? " bad" : "")} onClick={() => answer(i)}>{o}</button>)}</div>
      </div>
    </section>
  );
}
