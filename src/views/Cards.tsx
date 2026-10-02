import { useMemo, useState } from "react";
import { TOPICS } from "../content/topics";
import { CARDS, TOPIC_BY_K } from "../lib/cards";
import { setSetting, useAppState } from "../lib/store";
import { dueCards, hardCards, newCards, newLeft } from "../lib/srs";
import { cardsSession, flipQ } from "../lib/questions";
import { stripAcc } from "../lib/check";
import { speak } from "../lib/speech";
import { Hint, Seg, useNav } from "../components/ui";

function WordList() {
  const [q, setQ] = useState("");
  const rows = useMemo(() => { const t = stripAcc(q.toLowerCase()); return CARDS.filter(c => !t || stripAcc((c.es + " " + c.hr).toLowerCase()).includes(t)).slice(0, 200); }, [q]);
  return (
    <div className="stack" style={{ marginTop: 10 }}>
      <input id="word-search" className="answer-input" placeholder="Buscar…" aria-label="Buscar palabra" value={q} onChange={e => setQ(e.target.value)} />
      <div className="tbl"><table><tbody>
        {rows.map(c => <tr key={c.id}><td><span className={"dot " + TOPIC_BY_K[c.T].mark} title={TOPIC_BY_K[c.T].t} /></td><td><a href="#" onClick={e => { e.preventDefault(); speak(c.es); }}>{c.es}</a></td><td className="hr">{c.hr}</td></tr>)}
      </tbody></table></div>
    </div>
  );
}

export function Cards() {
  const st = useAppState();
  const { start } = useNav();
  const [sel, setSel] = useState<string[]>([]);
  const ls = sel.length ? sel : null;
  const hc = hardCards();
  return (
    <section className="view">
      <h1><span className="mark green">Tarjetas</span></h1>
      <p>Repetición espaciada: lo que olvidas vuelve antes; lo que sabes, más tarde. <Hint>Ocjenjuj iskreno, algoritam radi za tebe.</Hint></p>
      <div className="card stack">
        <h3>Temas</h3>
        <p>Sin selección = todos los temas. <Hint>Bez odabira = sve teme.</Hint></p>
        <div className="row">
          {TOPICS.map(T => <button key={T.k} className="chip" aria-pressed={sel.includes(T.k)} onClick={() => setSel(s => s.includes(T.k) ? s.filter(x => x !== T.k) : [...s, T.k])}>{T.t}</button>)}
        </div>
        <p className="hr">{dueCards(ls).length} para repasar · {Math.min(newCards(ls).length, ls ? 15 : newLeft())} nuevas en esta sesión</p>
        <div className="toggle"><span>Dirección</span><Seg options={[["es", "ES → HR"], ["hr", "HR → ES"], ["mix", "Mezcla"]]} value={st.settings.dir} onChange={v => setSetting("dir", v)} /></div>
        <div className="toggle"><span>Escribir la respuesta</span><Seg options={[[true, "Sí"], [false, "No"]]} value={st.settings.type} onChange={v => setSetting("type", v)} /></div>
        <button className="btn primary big" onClick={() => start(cardsSession(ls))}>Empezar</button>
      </div>
      <div className="card row" style={{ justifyContent: "space-between" }}>
        <div><h3><span className="mark pink">Mis errores</span></h3><p>{hc.length ? hc.length + " palabras difíciles " : "Todavía no hay errores. "}<Hint>Riječi koje si najčešće griješio, bez obzira na raspored.</Hint></p></div>
        <button className="btn" disabled={!hc.length} onClick={() => start({ title: "Mis errores", questions: hc.slice(0, 15).map(c => flipQ(c, true)), back: "tarjetas" })}>Repasar</button>
      </div>
      <details className="set"><summary>Ver todas las palabras ({CARDS.length})</summary><WordList /></details>
    </section>
  );
}
