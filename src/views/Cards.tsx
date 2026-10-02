import { useMemo, useRef, useState } from "react";
import { cards, customCards, deleteCustomWord, MY_TOPIC, restoreCustomWord, saveCustomWord, TOPIC_BY_K } from "../lib/cards";
import { activeTopics } from "../lib/level";
import { setSetting, useAppState } from "../lib/store";
import { dueCards, hardCards, newCards, newLeft } from "../lib/srs";
import { cardsSession, flipQ } from "../lib/questions";
import { stripAcc } from "../lib/check";
import { speak } from "../lib/speech";
import { AccentBar, Hint, Seg, SpeakBtn, useNav } from "../components/ui";
import type { Card } from "../lib/types";

function WordList({ all }: { all: Card[] }) {
  const [q, setQ] = useState("");
  const rows = useMemo(() => { const t = stripAcc(q.toLowerCase()); return all.filter(c => !t || stripAcc((c.es + " " + c.hr).toLowerCase()).includes(t)).slice(0, 200); }, [q, all]);
  return (
    <div className="stack" style={{ marginTop: 10 }}>
      <input id="word-search" className="answer-input" placeholder="Buscar…" aria-label="Buscar palabra" value={q} onChange={e => setQ(e.target.value)} />
      <div className="tbl"><table><tbody>
        {rows.map(c => <tr key={c.id}><td><span className={"dot " + TOPIC_BY_K[c.T].mark} title={TOPIC_BY_K[c.T].t} /></td><td><a href="#" onClick={e => { e.preventDefault(); speak(c.es); }}>{c.es}</a></td><td className="hr">{c.hr}</td></tr>)}
      </tbody></table></div>
    </div>
  );
}

function WordForm({ initial, onDone, submit }: { initial?: Card; onDone?: () => void; submit: string }) {
  const [es, setEs] = useState(initial?.es || ""), [hr, setHr] = useState(initial?.hr || ""), [err, setErr] = useState("");
  const esRef = useRef<HTMLInputElement>(null);
  const save = () => {
    const e = saveCustomWord(es, hr, initial?.id);
    setErr(e); if (e) return;
    if (!initial) { setEs(""); setHr(""); esRef.current?.focus(); }
    onDone?.();
  };
  const enter = (e: React.KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); save(); } };
  return (
    <div className="wordform">
      <input ref={esRef} className="answer-input" value={es} onChange={e => setEs(e.target.value)} onKeyDown={enter} placeholder="Español · la palabra" aria-label="Español" autoComplete="off" autoCapitalize="off" spellCheck={false} />
      <input className="answer-input" value={hr} onChange={e => setHr(e.target.value)} onKeyDown={enter} placeholder="Hrvatski · riječ" aria-label="Hrvatski" autoComplete="off" />
      <AccentBar inputRef={esRef} />
      <div className="row">
        <button className="btn primary" onClick={save}>{submit}</button>
        {onDone && <button className="btn ghost" onClick={onDone}>Cancelar</button>}
      </div>
      {err && <p className="fb bad" role="alert">{err}</p>}
    </div>
  );
}

function MyWords() {
  const { start } = useNav();
  const mine = customCards();
  const [editing, setEditing] = useState<string | null>(null);
  const [removed, setRemoved] = useState<Card | null>(null);
  return (
    <div className="card stack" id="mis-palabras">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3><span className="mark green">Mis palabras</span></h3>
        <button className="btn" disabled={!mine.length} onClick={() => start(cardsSession([MY_TOPIC.k], MY_TOPIC.t))}>Practicar</button>
      </div>
      <p>Añade palabras de clase, de series o de canciones. <Hint>Tvoje riječi postaju tema «Mis palabras» i ponavljaju se kao ostale kartice. Spremaju se u oblak s napretkom.</Hint></p>
      <WordForm submit="Añadir" />
      {removed && <div className="undo" role="status"><span>Borrada: <b>{removed.es}</b></span><button className="btn ghost" onClick={() => { restoreCustomWord(removed.id); setRemoved(null); }}>Deshacer</button></div>}
      {mine.length > 0 && <ul className="mywords">
        {mine.map(c => editing === c.id
          ? <li key={c.id} className="editing"><WordForm initial={c} submit="Guardar" onDone={() => setEditing(null)} /></li>
          : <li key={c.id}>
              <span className="w"><b>{c.es}</b><span className="hr">{c.hr}</span></span>
              <SpeakBtn text={c.es} />
              <button className="icon-btn" aria-label={"Editar " + c.es} title="Editar" onClick={() => setEditing(c.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
              </button>
              <button className="icon-btn" aria-label={"Borrar " + c.es} title="Borrar" onClick={() => { deleteCustomWord(c.id); setRemoved(c); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
              </button>
            </li>)}
      </ul>}
    </div>
  );
}

export function Cards() {
  const st = useAppState();
  const { start } = useNav();
  const [sel, setSel] = useState<string[]>([]);
  const ls = sel.length ? sel : null;
  const hc = hardCards();
  const all = cards();
  const topics = [...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])];
  return (
    <section className="view">
      <h1><span className="mark green">Tarjetas</span></h1>
      <p>Repetición espaciada: lo que olvidas vuelve antes; lo que sabes, más tarde. <Hint>Ocjenjuj iskreno, algoritam radi za tebe.</Hint></p>
      <div className="card stack">
        <h3>Temas</h3>
        <p>Sin selección = todos los temas. <Hint>Bez odabira = sve teme.</Hint></p>
        <div className="row">
          {topics.map(T => <button key={T.k} className="chip" aria-pressed={sel.includes(T.k)} onClick={() => setSel(s => s.includes(T.k) ? s.filter(x => x !== T.k) : [...s, T.k])}>{T.t}</button>)}
        </div>
        <p className="hr">{dueCards(ls).length} para repasar · {Math.min(newCards(ls).length, ls ? 15 : newLeft())} nuevas en esta sesión</p>
        <div className="toggle"><span>Dirección</span><Seg options={[["es", "ES → HR"], ["hr", "HR → ES"], ["mix", "Mezcla"]]} value={st.settings.dir} onChange={v => setSetting("dir", v)} /></div>
        <div className="toggle"><span>Escribir la respuesta</span><Seg options={[[true, "Sí"], [false, "No"]]} value={st.settings.type} onChange={v => setSetting("type", v)} /></div>
        <button className="btn primary big" onClick={() => start(cardsSession(ls))}>Empezar</button>
      </div>
      <MyWords />
      <div className="card row" style={{ justifyContent: "space-between" }}>
        <div><h3><span className="mark pink">Mis errores</span></h3><p>{hc.length ? hc.length + " palabras difíciles " : "Todavía no hay errores. "}<Hint>Riječi koje si najčešće griješio, bez obzira na raspored.</Hint></p></div>
        <button className="btn" disabled={!hc.length} onClick={() => start({ title: "Mis errores", questions: hc.slice(0, 15).map(c => flipQ(c, true)), back: "tarjetas" })}>Repasar</button>
      </div>
      <details className="set"><summary>Ver todas las palabras ({all.length})</summary><WordList all={all} /></details>
    </section>
  );
}
