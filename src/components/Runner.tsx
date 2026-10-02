import { useEffect, useRef, useState } from "react";
import type { FlipQ, MCQ, Question, SessionSpec, TilesQ, TypeQ } from "../lib/types";
import { addXP, useSettings } from "../lib/store";
import { schedule, sGet, previewIntervals } from "../lib/srs";
import { autoSpeak, speak } from "../lib/speech";
import { checkAnswer, wordDiff, type CheckRes } from "../lib/check";
import { pick, shuffle } from "../lib/util";
import { AccentBar, Clock, ConjGrid, Hint, IconSpeak, SpeakBtn, useNav } from "./ui";

type Fb = { kind: "ok" | "bad" | "warn"; title: string; why?: string; diff?: { w: string; ok: boolean }[] };

function Feedback({ fb }: { fb: Fb }) {
  return (
    <div className={"fb " + fb.kind} role="status">
      <b>{fb.title}</b>
      {fb.diff && <span className="why diff">{fb.diff.map((d, i) => <span key={i} className={d.ok ? "w-ok" : "w-bad"}>{d.w} </span>)}</span>}
      {fb.why && <span className="why">{/class="formula"/.test(fb.why) ? <span dangerouslySetInnerHTML={{ __html: fb.why }} /> : <Hint html={fb.why} />}</span>}
    </div>
  );
}
function NextBtn({ onNext }: { onNext: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const k = (e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); onNext(); } };
    const t = window.setTimeout(() => document.addEventListener("keydown", k), 60);
    return () => { window.clearTimeout(t); document.removeEventListener("keydown", k); };
  }, [onNext]);
  return <button ref={ref} className="btn primary big" onClick={onNext}>Siguiente</button>;
}
const praise = () => pick(["¡Correcto!", "¡Muy bien!", "¡Eso es!", "¡Perfecto!", "¡Genial!"]);

function After({ q, fb, onNext }: { q: Question; fb: Fb; onNext: () => void }) {
  useEffect(() => { if (q.speak) autoSpeak(q.speak); }, [q]);
  return <>
    <Feedback fb={fb} />
    {q.grid && <ConjGrid verb={q.grid.verb} highlight={q.grid.person} />}
    <NextBtn onNext={onNext} />
  </>;
}

type QProps<T> = { q: T; onResult: (ok: boolean, gain: number) => void; onNext: () => void };

function Prompt({ q }: { q: MCQ | TypeQ | TilesQ }) {
  const listen = q.kind === "type" ? q.listen : undefined;
  useEffect(() => { if (listen) { const t = window.setTimeout(() => autoSpeak(listen), 250); return () => window.clearTimeout(t); } }, [listen]);
  return <>
    <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap", gap: 12 }}>
      {q.kind === "mc" && q.clock ? <div style={{ flex: 1 }}><Clock h={q.clock.h} m={q.clock.m} /></div>
        : q.prompt ? <div className="qmain" style={{ flex: 1, minWidth: 0 }}>{q.prompt}</div> : null}
      {listen ? <div className="row"><button className="btn" onClick={() => speak(listen)}><IconSpeak /> Escuchar</button><button className="btn ghost" onClick={() => speak(listen, true)}>Lento</button></div>
        : q.kind === "mc" && q.speakPrompt ? <SpeakBtn text={q.speakPrompt} /> : null}
    </div>
    {"sub" in q && q.sub && <div><Hint>{q.sub}</Hint></div>}
  </>;
}

function MCView({ q, onResult, onNext }: QProps<MCQ>) {
  const [order] = useState(() => (q.shuffle ? shuffle(q.options.map((_, i) => i)) : q.options.map((_, i) => i)));
  const [chosen, setChosen] = useState<number | null>(null);
  const choose = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    onResult(i === q.correct, 2);
  };
  useEffect(() => {
    if (chosen !== null) return;
    const k = (e: KeyboardEvent) => { const n = +e.key; if (n >= 1 && n <= order.length) choose(order[n - 1]); };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  });
  const ok = chosen === q.correct;
  return <>
    <Prompt q={q} />
    <div className="opts">
      {order.map((i, k) => (
        <button key={i} className={"opt" + (chosen !== null && i === q.correct ? " ok" : chosen === i ? " bad" : "")} disabled={chosen !== null} onClick={() => choose(i)}>
          <span className="hr">{k + 1}  </span>{q.options[i]}
        </button>
      ))}
    </div>
    {chosen !== null && <After q={q} onNext={onNext} fb={{ kind: ok ? "ok" : "bad", title: ok ? praise() : "Casi... la respuesta es: " + q.options[q.correct], why: q.explain }} />}
  </>;
}

function TypeView({ q, onResult, onNext }: QProps<TypeQ>) {
  const [val, setVal] = useState("");
  const [res, setRes] = useState<CheckRes | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { const t = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 60); return () => window.clearTimeout(t); }, []);
  const check = () => {
    if (!val.trim() || res) return;
    let r: CheckRes = q.numeric ? (val.replace(/\D/g, "") === q.answers[0] ? "ok" : "bad") : checkAnswer(val, q.answers, q.dict ? 2 : 1);
    if (q.strict && r === "typo") r = "bad";
    setRes(r);
    onResult(r !== "bad", r === "ok" ? 3 : 2);
  };
  const ans = q.answers[0];
  const fb: Fb | null = res && ({
    ok: { kind: "ok", title: praise() }, accent: { kind: "warn", title: "Bien, pero ojo con el acento: " + ans },
    article: { kind: "warn", title: "Bien. Con artículo: " + ans }, typo: { kind: "warn", title: "Casi perfecto: " + ans }, bad: { kind: "bad", title: "No. La respuesta: " + ans },
  } as Record<CheckRes, Fb>)[res];
  if (fb && q.dict && res !== "ok") { fb.diff = wordDiff(val, ans); fb.title = res === "bad" ? "Compara:" : fb.title; }
  if (fb && !q.dict) fb.why = q.explain;
  return <>
    <Prompt q={q} />
    <input ref={ref} className="answer-input" value={val} disabled={!!res} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); check(); } }}
      autoComplete="off" autoCapitalize="off" spellCheck={false} inputMode={q.numeric ? "numeric" : "text"} aria-label="Tu respuesta" placeholder="Escribe aquí…" />
    {!res && !q.numeric && <AccentBar inputRef={ref} />}
    {!res && <button className="btn primary big" onClick={check}>Comprobar</button>}
    {fb && <After q={q} fb={fb} onNext={onNext} />}
  </>;
}

function TilesView({ q, onResult, onNext }: QProps<TilesQ>) {
  const [chosen, setChosen] = useState<number[]>([]);
  const [done, setDone] = useState<boolean | null>(null);
  const check = () => {
    if (!chosen.length || done !== null) return;
    const ok = chosen.map(i => q.pool[i]).join(" ") === q.target.join(" ");
    setDone(ok); onResult(ok, 3);
  };
  return <>
    <Prompt q={q} />
    <p>Construye el número con palabras. <Hint>Složi broj riječima. Klik na pločicu da je makneš.</Hint></p>
    <div className="slot" aria-label="Tu respuesta">
      {chosen.map((i, k) => <button key={k} className="tile" disabled={done !== null} onClick={() => setChosen(c => c.filter((_, j) => j !== k))}>{q.pool[i]}</button>)}
    </div>
    <div className="tiles">
      {q.pool.map((w, i) => <button key={i} className={"tile" + (chosen.includes(i) ? " used" : "")} disabled={done !== null} onClick={() => setChosen(c => [...c, i])}>{w}</button>)}
    </div>
    {done === null && <button className="btn primary big" onClick={check}>Comprobar</button>}
    {done !== null && <After q={q} onNext={onNext} fb={{ kind: done ? "ok" : "bad", title: done ? "¡Perfecto!" : "Así: " + q.target.join(" "), why: q.explain }} />}
  </>;
}

function FlipView({ q, onRate }: { q: FlipQ; onRate: (r: 1 | 2 | 3 | 4) => void }) {
  const settings = useSettings();
  const c = q.card;
  const front = q.dir === "es" ? c.es : c.hr, back = q.dir === "es" ? c.hr : c.es;
  const typing = settings.type && q.dir === "hr";
  const [shown, setShown] = useState(false);
  const [val, setVal] = useState("");
  const [verdict, setVerdict] = useState<CheckRes | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const isNew = !sGet(c.id);
  useEffect(() => { if (q.dir === "es") { const t = window.setTimeout(() => autoSpeak(c.es), 200); return () => window.clearTimeout(t); } if (typing) ref.current?.focus({ preventScroll: true }); }, [q, c.es, typing]);
  const reveal = () => { if (shown) return; if (typing) setVerdict(checkAnswer(val, [c.es])); setShown(true); if (q.dir === "hr") autoSpeak(c.es); };
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!shown && (e.key === "Enter" || (e.key === " " && !typing))) { e.preventDefault(); reveal(); }
      else if (shown) { const n = +e.key; if (n >= 1 && n <= 4) onRate(n as 1 | 2 | 3 | 4); }
    };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  });
  const ints = previewIntervals(c.id);
  const sug = verdict ? (verdict === "bad" ? 1 : verdict === "ok" ? 3 : 2) : 3;
  return <>
    {isNew && <span className="mark green hr" style={{ justifySelf: "start" }}>nueva</span>}
    <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap", gap: 12 }}>
      <div className="qmain" style={{ flex: 1, minWidth: 0 }}>{front}</div>
      {q.dir === "es" && <SpeakBtn text={c.es} />}
    </div>
    <div className="hr">{q.dir === "es" ? "¿Qué significa en croata?" : "¿Cómo se dice en español?"}</div>
    {typing && <>
      <input ref={ref} className="answer-input" value={val} disabled={shown} onChange={e => setVal(e.target.value)} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="Escribe en español…" aria-label="Respuesta" />
      {!shown && <AccentBar inputRef={ref} />}
    </>}
    {!shown && <button className="btn primary big" onClick={reveal}>{typing ? "Comprobar" : "Mostrar respuesta"}</button>}
    {shown && <>
      <div className="reveal">
        {verdict && <Feedback fb={{ kind: verdict === "ok" ? "ok" : verdict === "bad" ? "bad" : "warn", title: ({ ok: "¡Correcto!", accent: "Ojo con el acento", article: "Bien, falta el artículo", typo: "Casi (pequeño error)", bad: "Esta vez no" } as Record<CheckRes, string>)[verdict] }} />}
        <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}><div className="ans">{back}</div>{q.dir === "hr" && <SpeakBtn text={c.es} />}</div>
      </div>
      <p className="hint">¿Qué tal lo sabías? <Hint>Ocijeni iskreno: "Otra vez" vraća karticu za minutu, "Fácil" je odgađa.</Hint></p>
      <div className="rate">
        {([[1, "Otra vez", "r1"], [2, "Difícil", "r2"], [3, "Bien", "r3"], [4, "Fácil", "r4"]] as const).map(([r, t, cl]) => (
          <button key={r} className={cl} autoFocus={r === sug} onClick={() => onRate(r)}>{t}<small>{ints[r - 1]}</small></button>
        ))}
      </div>
    </>}
  </>;
}

export function Runner({ spec, onExit, onRestart }: { spec: SessionSpec; onExit: () => void; onRestart: (s: SessionSpec) => void }) {
  const queue = useRef<Question[]>([...spec.questions]);
  const total = spec.questions.length;
  const stats = useRef({ done: 0, correct: 0, xp: 0, mistakes: [] as Question[], retried: new Set<Question>() });
  const [cur, setCur] = useState<Question | null>(() => queue.current.shift() ?? null);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(!cur);
  useNav();

  const next = () => { const q = queue.current.shift(); if (!q) setFinished(true); else { setCur(q); setStep(s => s + 1); } window.scrollTo({ top: 0 }); };
  const result = (q: Question, ok: boolean, gain: number) => {
    const s = stats.current;
    if (!q._counted) { q._counted = true; s.done++; if (ok) s.correct++; else s.mistakes.push(q); }
    if (ok) { s.xp += gain; addXP(gain); }
    if (!ok && !s.retried.has(q) && q.kind !== "flip") { s.retried.add(q); queue.current.splice(Math.min(queue.current.length, 3), 0, { ...q, _counted: true, _retry: true }); }
  };
  const rate = (q: FlipQ, r: 1 | 2 | 3 | 4) => {
    if (!q.cram || r === 1 || !sGet(q.card.id)) schedule(q.card.id, r);
    const s = stats.current;
    if (r === 1) { if (!q._counted) { q._counted = true; s.done++; s.mistakes.push(q); } queue.current.splice(Math.min(queue.current.length, 4), 0, { ...q, _retry: true }); }
    else { if (!q._counted) { q._counted = true; s.done++; s.correct++; } const g = r >= 3 ? 2 : 1; s.xp += g; addXP(g); }
    next();
  };
  const s = stats.current;
  const pct = Math.min(100, (100 * s.done) / total);

  if (finished) {
    const p = s.done ? Math.round((100 * s.correct) / s.done) : 0;
    const msg = s.done === 0 ? "Sesión cerrada." : p === 100 ? "¡Impecable! Ni un error." : p >= 80 ? "¡Muy bien! Casi perfecto." : p >= 50 ? "Bien. Los errores vuelven pronto para repasar." : "Hoy cuesta. Repetir es aprender.";
    return (
      <div className="runner">
        <div className="qcard done pop">
          <div className="hand">{spec.title}</div>
          <div className="score">{s.correct}/{s.done}</div>
          <p>{msg}</p>
          <span className="pill">+<b>{s.xp}</b> XP</span>
          {s.mistakes.length > 0 && <><h3>Para repasar</h3>
            <div className="mistakes">{s.mistakes.slice(0, 12).map((q, i) => <div key={i}>{q.kind === "flip" ? `${q.card.es} = ${q.card.hr}` : `${q.prompt || "Reloj"} → ${q.kind === "mc" ? q.options[q.correct] : q.kind === "tiles" ? q.target.join(" ") : q.answers[0]}`}</div>)}</div></>}
          <div className="row" style={{ justifyContent: "center" }}>
            {spec.again && <button className="btn primary" onClick={() => onRestart(spec.again!())}>Otra ronda</button>}
            <button className="btn" onClick={onExit}>Volver</button>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
        <div className="bar"><i style={{ width: pct + "%" }} /></div>
        <span className="mastery">{Math.min(s.done, total)}/{total}</span>
      </div>
      <div className="qcard pop" key={step}>
        <div className="row"><span className="qtag">{q._retry ? "Otra vez · " : ""}{q.tag}</span></div>
        {q.kind === "flip" ? <FlipView q={q} onRate={r => rate(q, r)} />
          : q.kind === "mc" ? <MCView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />
          : q.kind === "type" ? <TypeView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />
          : <TilesView q={q} onResult={(ok, g) => result(q, ok, g)} onNext={next} />}
      </div>
    </div>
  );
}
