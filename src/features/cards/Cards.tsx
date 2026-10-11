import { useState } from "react";
import { cards, customCards, MY_TOPIC } from "../../lib/cards";
import { activeTopics } from "../../lib/level";
import { setSetting, useAppState } from "../../lib/store";
import { dueCards, hardCards, newCards, newLeft } from "../../lib/srs";
import { cardsSession, flipQ } from "../../lib/questions";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { Seg } from "../../components/Seg";
import { useNav } from "../../app/navigation";
import { MyWords } from "./MyWords";
import { WordList } from "./WordList";

export const Cards = () => {
  const st = useAppState();
  const { start } = useNav();
  const [sel, setSel] = useState<string[]>([]);
  const ls = sel.length ? sel : null;
  const hc = hardCards();
  const all = cards();
  const topics = [...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])];
  return (
    <section className="view">
      <h1>
        <span className="mark green">Tarjetas</span>
      </h1>
      <p>
        Repetición espaciada: lo que olvidas vuelve antes; lo que sabes, más tarde. <Hint>Ocjenjuj iskreno, algoritam radi za tebe.</Hint>
      </p>
      <div className="card stack">
        <h3>Temas</h3>
        <p>
          Sin selección = todos los temas. <Hint>Bez odabira = sve teme.</Hint>
        </p>
        <div className="row">
          {topics.map(T => (
            <button
              key={T.k}
              className="chip"
              aria-pressed={sel.includes(T.k)}
              onClick={() => setSel(s => (s.includes(T.k) ? s.filter(x => x !== T.k) : [...s, T.k]))}
            >
              {T.t}
            </button>
          ))}
        </div>
        <p className="hr">
          {dueCards(ls).length} para repasar · {Math.min(newCards(ls).length, ls ? 15 : newLeft())} nuevas en esta sesión
        </p>
        <div className="toggle">
          <span>Dirección</span>
          <Seg
            options={[
              ["es", "ES → HR"],
              ["hr", "HR → ES"],
              ["mix", "Mezcla"],
            ]}
            value={st.settings.dir}
            onChange={v => setSetting("dir", v)}
          />
        </div>
        <div className="toggle">
          <span>Escribir la respuesta</span>
          <Seg
            options={[
              [true, "Sí"],
              [false, "No"],
            ]}
            value={st.settings.type}
            onChange={v => setSetting("type", v)}
          />
        </div>
        <button className="btn primary big" onClick={() => start(cardsSession(ls))}>
          <Ic.play /> Empezar
        </button>
      </div>
      <MyWords />
      <div className="card row" style={{ justifyContent: "space-between" }}>
        <div>
          <h3>
            <span className="mark pink">Mis errores</span>
          </h3>
          <p>
            {hc.length ? hc.length + " palabras difíciles " : "Todavía no hay errores. "}
            <Hint>Riječi koje si najčešće griješio, bez obzira na raspored.</Hint>
          </p>
        </div>
        <button
          className="btn"
          disabled={!hc.length}
          onClick={() => start({ title: "Mis errores", questions: hc.slice(0, 15).map(c => flipQ(c, true)), back: "tarjetas" })}
        >
          <Ic.again /> Repasar
        </button>
      </div>
      <details className="set">
        <summary>Ver todas las palabras ({all.length})</summary>
        <WordList all={all} />
      </details>
    </section>
  );
};
