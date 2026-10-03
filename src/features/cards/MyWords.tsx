import { useRef, useState } from "react";
import { customCards, deleteCustomWord, MY_TOPIC, restoreCustomWord, saveCustomWord } from "../../lib/cards";
import { cardsSession } from "../../lib/questions";
import { AccentBar } from "../../components/AccentBar";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { SpeakBtn } from "../../components/SpeakBtn";
import { useNav } from "../../app/navigation";
import type { Card } from "../../lib/types";
import "./cards.css";

/** the user's own words: add, edit, delete (with undo), practise */
const WordForm = ({ initial, onDone, submit }: { initial?: Card; onDone?: () => void; submit: string }) => {
  const [es, setEs] = useState(initial?.es || ""),
    [hr, setHr] = useState(initial?.hr || ""),
    [err, setErr] = useState("");
  const esRef = useRef<HTMLInputElement>(null);
  const save = () => {
    const e = saveCustomWord(es, hr, initial?.id);
    setErr(e);
    if (e) return;
    if (!initial) {
      setEs("");
      setHr("");
      esRef.current?.focus();
    }
    onDone?.();
  };
  const enter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    }
  };
  return (
    <div className="wordform">
      <input
        ref={esRef}
        className="answer-input"
        value={es}
        onChange={e => setEs(e.target.value)}
        onKeyDown={enter}
        placeholder="Español · la palabra"
        aria-label="Español"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <input
        className="answer-input"
        value={hr}
        onChange={e => setHr(e.target.value)}
        onKeyDown={enter}
        placeholder="Hrvatski · riječ"
        aria-label="Hrvatski"
        autoComplete="off"
      />
      <AccentBar inputRef={esRef} />
      <div className="row">
        <button className="btn primary" onClick={save}>
          {initial ? <Ic.check /> : <Ic.plus />} {submit}
        </button>
        {onDone && (
          <button className="btn ghost" onClick={onDone}>
            Cancelar
          </button>
        )}
      </div>
      {err && (
        <p className="fb bad" role="alert">
          {err}
        </p>
      )}
    </div>
  );
};

export const MyWords = () => {
  const { start } = useNav();
  const mine = customCards();
  const [editing, setEditing] = useState<string | null>(null);
  const [removed, setRemoved] = useState<Card | null>(null);
  return (
    <div className="card stack" id="mis-palabras">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3>
          <span className="mark green">Mis palabras</span>
        </h3>
        <button className="btn" disabled={!mine.length} onClick={() => start(cardsSession([MY_TOPIC.k], MY_TOPIC.t))}>
          <Ic.play /> Practicar
        </button>
      </div>
      <p>
        Añade palabras de clase, de series o de canciones.{" "}
        <Hint>Tvoje riječi postaju tema «Mis palabras» i ponavljaju se kao ostale kartice. Spremaju se u oblak s napretkom.</Hint>
      </p>
      <WordForm submit="Añadir" />
      {removed && (
        <div className="undo" role="status">
          <span>
            Borrada: <b>{removed.es}</b>
          </span>
          <button
            className="btn ghost"
            onClick={() => {
              restoreCustomWord(removed.id);
              setRemoved(null);
            }}
          >
            <Ic.again /> Deshacer
          </button>
        </div>
      )}
      {!mine.length && !removed && (
        <p className="hint empty">
          Todavía no tienes palabras propias. <span lang="hr">Dodaj prvu gore.</span>
        </p>
      )}
      {mine.length > 0 && (
        <ul className="mywords">
          {mine.map(c =>
            editing === c.id ? (
              <li key={c.id} className="editing">
                <WordForm initial={c} submit="Guardar" onDone={() => setEditing(null)} />
              </li>
            ) : (
              <li key={c.id}>
                <span className="w">
                  <b>{c.es}</b>
                  <span className="hr">{c.hr}</span>
                </span>
                <SpeakBtn text={c.es} />
                <button className="icon-btn" aria-label={"Editar " + c.es} title="Editar" onClick={() => setEditing(c.id)}>
                  <Ic.edit />
                </button>
                <button
                  className="icon-btn"
                  aria-label={"Borrar " + c.es}
                  title="Borrar"
                  onClick={() => {
                    deleteCustomWord(c.id);
                    setRemoved(c);
                  }}
                >
                  <Ic.trash />
                </button>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};
