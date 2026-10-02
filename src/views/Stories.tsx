import { useMemo, useState } from "react";
import { STORIES } from "../content/stories";
import { activeStories } from "../lib/level";
import { addXP, update, useAppState } from "../lib/store";
import { speak, stopSpeech } from "../lib/speech";
import { shuffle } from "../lib/util";
import type { Story } from "../lib/types";
import { Hint, IconSpeak, useNav } from "../components/ui";

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

function Gap({ p, onSolve }: { p: Exclude<Part, string>; onSolve: (first: boolean) => void }) {
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  return <>
    <span className={"gap" + (solved ? " solved" : "")}>
      {p.opts.map(o => (
        <button key={o} className={solved && o === p.correct ? "ok" : wrong.includes(o) ? "bad" : ""} disabled={wrong.includes(o)}
          onClick={() => { if (solved) return; if (o === p.correct) { setSolved(true); onSolve(wrong.length === 0); } else setWrong(w => [...w, o]); }}>{o}</button>
      ))}
    </span>
    {solved && p.why && <span className="gnote">✓ <Hint>{p.why}</Hint></span>}
  </>;
}

export function StoryView({ id }: { id: string }) {
  const { go } = useNav();
  const s = STORIES.find(x => x.id === id)!;
  const parts = useMemo(() => parse(s.text), [s]);
  const total = parts.filter(p => typeof p !== "string").length;
  const [solved, setSolved] = useState(0), [first, setFirst] = useState(0), [tr, setTr] = useState(false);
  const plain = parts.map(p => (typeof p === "string" ? p : p.correct)).join("");
  const onSolve = (f: boolean) => {
    const ns = solved + 1, nf = first + (f ? 1 : 0);
    setSolved(ns); setFirst(nf); if (f) addXP(3);
    if (ns === total) update(st => { st.stories[s.id] = Math.max(st.stories[s.id] || 0, nf); });
  };
  return (
    <section className="view" id="story-view">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button className="btn ghost" onClick={() => { stopSpeech(); go("historias"); }}>← Historias</button>
        <span className="hr">{s.g}</span>
      </div>
      <h1>{s.t}</h1>
      <div className="card stack">
        <div className="story">{parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : <Gap key={i} p={p} onSolve={onSolve} />))}</div>
        <div className="row">
          <button className="btn ghost" onClick={() => setTr(t => !t)} aria-pressed={tr}>Traducción</button>
          <button className="btn ghost" onClick={() => speak(plain)}><IconSpeak /> Escuchar</button>
        </div>
        {tr && <p className="hr">{s.hr}</p>}
        {solved === total && <>
          <div className="fb ok"><b>¡Fin! {first}/{total} a la primera.</b><span className="why">Escucha la historia y lee en voz alta con Paco. <Hint>Pusti priču i čitaj naglas zajedno s Pacom.</Hint></span></div>
          <div className="row"><button className="btn primary" onClick={() => speak(plain)}>Escuchar la historia</button><button className="btn" onClick={() => go("historias")}>Más historias</button></div>
        </>}
      </div>
    </section>
  );
}
