import { useEffect, useMemo, useRef, useState } from "react";
import { STORIES } from "../content/stories";
import { activeStories } from "../lib/level";
import { addXP, update, useAppState } from "../lib/store";
import { stopSpeech } from "../lib/speech";
import { RATES, useReader, type Reader } from "../lib/reader";
import { shuffle } from "../lib/util";
import type { Story } from "../lib/types";
import { Hint, Ic, IconSpeak, IconTranslate, Seg, useNav } from "../components/ui";

type Part = string | { opts: string[]; correct: string; why: string };
function parse(text: string): Part[] {
  const parts: Part[] = []; const re = /\{([^}]+)\}/g; let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    const [o, why] = m[1].split("::"); const raw = o.split("|");
    parts.push({ opts: shuffle(raw.map(x => x.replace(/\*$/, ""))), correct: raw.find(x => x.endsWith("*"))!.slice(0, -1), why: why || "" });
    last = re.lastIndex;
  }
  parts.push(text.slice(last)); return parts;
}
const gapsOf = (s: Story) => (s.text.match(/\{/g) || []).length;

export function Stories() {
  const st = useAppState();
  const { go } = useNav();
  return (
    <section className="view">
      <h1><span className="mark yellow">Historias de Paco</span></h1>
      <p>Paco es un pulpo cocinero de Zaragoza. Tiene ocho brazos y muchos problemas. <Hint>Popuni praznine. Svaka priča ponavlja jednu gramatičku temu.</Hint></p>
      <div className="stack">
        {activeStories().map(s => { const sc = st.stories[s.id]; return (
          <button key={s.id} className="game" onClick={() => go(`story:${s.id}`)}>
            <span className="gi yellow">{sc != null ? `${sc}/${gapsOf(s)}` : gapsOf(s)}</span>
            <span><h3>{s.t}</h3><span className="hr">{s.g}{sc != null ? " · hecho" : ""}</span></span>
          </button>); })}
      </div>
    </section>
  );
}

function Gap({ p, onSolve, cls }: { p: Exclude<Part, string>; onSolve: (first: boolean) => void; cls?: string }) {
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  return <>
    <span className={"gap" + (solved ? " solved" : "") + (cls ? " " + cls : "")}>
      {p.opts.map(o => (
        <button key={o} className={solved && o === p.correct ? "ok" : wrong.includes(o) ? "bad" : ""} disabled={wrong.includes(o)}
          onClick={() => { if (solved) return; if (o === p.correct) { setSolved(true); onSolve(wrong.length === 0); } else setWrong(w => [...w, o]); }}>{o}</button>
      ))}
    </span>
    {solved && p.why && <span className="gnote">✓ <Hint>{p.why}</Hint></span>}
  </>;
}

/** story parts with their [start, end) range in the spoken text; text parts split into words */
type Piece = { kind: "sp"; t: string; s: number; e: number } | { kind: "w"; t: string; s: number; e: number } | { kind: "gap"; p: Exclude<Part, string>; s: number; e: number; key: number };
function layout(parts: Part[]) {
  const pieces: Piece[] = []; let pos = 0;
  parts.forEach((p, k) => {
    if (typeof p !== "string") { pieces.push({ kind: "gap", p, s: pos, e: pos + p.correct.length, key: k }); pos += p.correct.length; return; }
    for (const t of p.split(/(\s+)/)) { if (!t) continue; if (/^\s+$/.test(t)) pieces.push({ kind: "sp", t, s: pos, e: pos + t.length }); else pieces.push({ kind: "w", t, s: pos, e: pos + t.length }); pos += t.length; }
  });
  return pieces;
}

function ReaderBar({ rd }: { rd: Reader }) {
  const playing = rd.status === "playing";
  if (rd.status === "idle") return null;
  const n = rd.sentences.length;
  return (
    <div className="readerbar" role="toolbar" aria-label="Lectura">
      <div className="rb-row">
        <button className="icon-btn" aria-label="Frase anterior" title="Frase anterior" onClick={rd.prev} disabled={rd.idx === 0}><Ic.prevS /></button>
        <button className="icon-btn rb-main" aria-label={playing ? "Pausa" : "Continuar"} title={playing ? "Pausa" : "Continuar"} onClick={rd.toggle}>{playing ? <Ic.pause /> : <Ic.play />}</button>
        <button className="icon-btn" aria-label="Frase siguiente" title="Frase siguiente" onClick={rd.next} disabled={rd.idx >= n - 1}><Ic.nextS /></button>
        <button className="icon-btn" aria-label="Parar" title="Parar" onClick={rd.stop}><Ic.stop /></button>
        <span className="rb-pos" aria-label={`Frase ${rd.idx + 1} de ${n}`}><span className="rb-lbl">Frase </span><b>{rd.idx + 1}</b> / {n}</span>
      </div>
      <div className="rb-row">
        <Seg label="Velocidad" options={RATES.map(([v, t]) => [v, t] as [number, string])} value={rd.rate} onChange={rd.setRate} />
        <span className="rb-bar" aria-hidden="true"><i style={{ width: (100 * (rd.idx + (playing ? 0.5 : 0))) / n + "%" }} /></span>
      </div>
    </div>
  );
}

export function StoryView({ id }: { id: string }) {
  const { go } = useNav();
  const s = STORIES.find(x => x.id === id)!;
  const parts = useMemo(() => parse(s.text), [s]);
  const pieces = useMemo(() => layout(parts), [parts]);
  const total = parts.filter(p => typeof p !== "string").length;
  const [solved, setSolved] = useState(0), [first, setFirst] = useState(0), [tr, setTr] = useState(false);
  const plain = useMemo(() => parts.map(p => (typeof p === "string" ? p : p.correct)).join(""), [parts]);
  const rd = useReader(plain);
  const storyRef = useRef<HTMLDivElement>(null);
  const onSolve = (f: boolean) => {
    const ns = solved + 1, nf = first + (f ? 1 : 0);
    setSolved(ns); setFirst(nf); if (f) addXP(3);
    if (ns === total) update(st => { st.stories[s.id] = Math.max(st.stories[s.id] || 0, nf); });
  };
  const sen = rd.status !== "idle" ? rd.sentence : undefined;
  const cls = (a: number, b: number) => {
    if (!sen || b <= sen.start || a >= sen.end) return "";
    return rd.word && a < rd.word[1] && b > rd.word[0] ? "rd-sent rd-word" : "rd-sent";
  };
  // keep the sentence being read on screen
  useEffect(() => {
    if (!sen) return;
    const el = storyRef.current?.querySelector<HTMLElement>(".rd-sent");
    if (!el) return;
    const r = el.getBoundingClientRect(), bar = document.querySelector(".readerbar")?.getBoundingClientRect();
    if (r.top < 70 || r.bottom > (bar ? bar.top : innerHeight) - 8) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [rd.idx, rd.status]); // eslint-disable-line react-hooks/exhaustive-deps
  // Space = play/pause, ←/→ = sentence (not while a button or field has focus)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, input, textarea, select")) return;
      if (e.key === " ") { e.preventDefault(); rd.toggle(); }
      else if (rd.status !== "idle" && e.key === "ArrowLeft") rd.prev();
      else if (rd.status !== "idle" && e.key === "ArrowRight") rd.next();
    };
    document.addEventListener("keydown", k); return () => document.removeEventListener("keydown", k);
  });
  return (
    <section className={"view" + (rd.status !== "idle" ? " reading" : "")} id="story-view">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button className="btn ghost" onClick={() => { rd.stop(); stopSpeech(); go("historias"); }}><Ic.back /> Historias</button>
        <span className="hr">{s.g}</span>
      </div>
      <h1>{s.t}</h1>
      <div className="card stack">
        <div className="story" ref={storyRef} onClick={e => {
          if (rd.status === "idle") return;
          const w = (e.target as HTMLElement).closest<HTMLElement>("[data-s]");
          if (w) rd.seek(Number(w.dataset.s));
        }}>
          {pieces.map((p, i) => p.kind === "sp" ? (sen && p.s >= sen.start && p.e <= sen.end ? <span key={i} className="rd-sent">{p.t}</span> : p.t)
            : p.kind === "w" ? <span key={i} data-s={p.s} className={cls(p.s, p.e) || undefined}>{p.t}</span>
            : <Gap key={"g" + p.key} p={p.p} onSolve={onSolve} cls={cls(p.s, p.e)} />)}
        </div>
        <div className="row">
          <button className="btn ghost" onClick={() => setTr(t => !t)} aria-pressed={tr}><IconTranslate /> Traducción</button>
          {rd.status === "idle" && <button className="btn" onClick={rd.play}><Ic.play /> Escuchar</button>}
        </div>
        {tr && <p className="hr">{s.hr}</p>}
        {solved === total && <>
          <div className="fb ok"><b>¡Fin! {first}/{total} a la primera.</b><span className="why">Escucha la historia y lee en voz alta con Paco. <Hint>Pusti priču i čitaj naglas zajedno s Pacom.</Hint></span></div>
          <div className="row">{rd.status === "idle" && <button className="btn primary" onClick={rd.play}><IconSpeak /> Escuchar la historia</button>}<button className="btn" onClick={() => go("historias")}>Más historias</button></div>
        </>}
        <ReaderBar rd={rd} />
      </div>
    </section>
  );
}
