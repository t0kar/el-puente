import { useState } from "react";
import { activeSheets } from "../../lib/level";
import { useSettings } from "../../lib/store";
import { stripAcc } from "../../lib/check";
import { LAST_UPDATE } from "../../lib/updates";
import { Hint } from "../../components/Hint";
import { LevelPill } from "../../components/LevelPill";
import { SheetHtml } from "../../components/SheetHtml";
import { Boot } from "../../components/Boot";
import type { Sheet, SheetCat } from "../../lib/types";
import "./sheets.css";

const CATS: { k: SheetCat; t: string; hr: string }[] = [
  { k: "verbos", t: "Verbos", hr: "kako se glagoli mijenjaju po osobama (yo, tú, él…)" },
  { k: "imperativo", t: "Imperativo", hr: "naredbe, upute i molbe: ¡Ven! ¡Siéntese!" },
  { k: "usos", t: "Ser, estar, gustar", hr: "koji glagol kada" },
  { k: "nombres", t: "Nombres y artículos", hr: "rod, množina, el / un, mi / este" },
  { k: "preposiciones", t: "Preposiciones", hr: "male riječi: a, en… (kamo? čime?)" },
  { k: "numeros", t: "Números y hora", hr: "brojevi i koliko je sati" },
  { k: "sonidos", t: "Sonidos y preguntas", hr: "izgovor i upitne riječi" },
];

type Filter = "todo" | "nuevo" | SheetCat;
const KEY = "el-puente-sheet-cat";
const loadFilter = (): Filter => {
  try {
    return (localStorage.getItem(KEY) as Filter | null) || "todo";
  } catch {
    return "todo";
  }
};
const saveFilter = (f: Filter) => {
  try {
    localStorage.setItem(KEY, f);
  } catch {
    // private mode: the choice just isn't remembered
  }
};

const norm = (s: string) => stripAcc(s.toLowerCase()).trim();
/** searchable text of a sheet: title, Croatian line and the visible text of its HTML */
const plain = (s: Sheet) => norm(`${s.t} ${s.hr} ${s.html.replace(/<[^>]+>/g, " ")}`);

const SheetCard = ({ s, isNew, showLvl, open }: { s: Sheet; isNew: boolean; showLvl: boolean; open: boolean }) => (
  <details className="card sheet" open={open}>
    <summary>
      <span className="sheet-title">
        <h3>
          <span className={"mark " + s.mark}>{s.t}</span>
        </h3>
        {isNew && <span className="badge">Nuevo</span>}
        {showLvl && <LevelPill lvl={s.lvl} />}
      </span>
      <span className="hr" lang="hr">
        {s.hr}
      </span>
    </summary>
    <div className="sheet-inner">
      <SheetHtml html={s.html} />
      {s.widget === "boot" && <Boot />}
    </div>
  </details>
);

export const Sheets = () => {
  useSettings(); // re-render when the level changes
  const [q, setQ] = useState("");
  const [picked, setPicked] = useState<Filter>(loadFilter);
  const all = activeSheets();
  const isNew = (s: Sheet) => !!LAST_UPDATE && s.u === LAST_UPDATE.id;
  const cats = CATS.filter(c => all.some(s => s.cat === c.k));
  const hasNew = all.some(isNew);
  // a remembered filter can go stale (no new sheets any more, level changed)
  const filter: Filter = picked === "nuevo" ? (hasNew ? "nuevo" : "todo") : picked === "todo" || cats.some(c => c.k === picked) ? picked : "todo";
  const showLvl = new Set(all.map(s => s.lvl)).size > 1;
  const term = norm(q);
  const pick = (f: Filter) => {
    setPicked(f);
    saveFilter(f);
    setQ("");
  };

  const shown = term
    ? all.filter(s => plain(s).includes(term))
    : filter === "nuevo"
      ? all.filter(isNew)
      : filter === "todo"
        ? all
        : all.filter(s => s.cat === filter);
  // searching or "Nuevo" opens what it finds; a key per mode resets the open state when the mode changes
  const autoOpen = !!term || filter === "nuevo" || shown.length === 1;
  const mode = `${term}|${filter}`;
  const card = (s: Sheet) => <SheetCard key={s.t + mode} s={s} isNew={isNew(s)} showLvl={showLvl} open={autoOpen} />;

  return (
    <section className="view">
      <h1>
        <span className="mark yellow">Chuleta</span>
      </h1>
      <p>
        La gramática como fórmulas. <Hint>Odaberi temu ili pretraži. Dodirni naslov da se otvori objašnjenje, a podcrtani primjer da ga čuješ.</Hint>
      </p>
      <div className="sheet-tools">
        <input
          type="search"
          className="answer-input"
          placeholder="Buscar: gustar, hora, ven…"
          aria-label="Buscar en la chuleta"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <div className="sheet-cats" role="group" aria-label="Temas">
          <button className="chip" aria-pressed={!term && filter === "todo"} onClick={() => pick("todo")}>
            Todo
          </button>
          {hasNew && (
            <button className="chip" aria-pressed={!term && filter === "nuevo"} onClick={() => pick("nuevo")}>
              Nuevo
            </button>
          )}
          {cats.map(c => (
            <button key={c.k} className="chip" aria-pressed={!term && filter === c.k} onClick={() => pick(c.k)}>
              {c.t}
            </button>
          ))}
        </div>
      </div>

      {shown.length === 0 ? (
        <div className="card stack">
          <p>Nada encontrado.</p>
          <Hint>Probaj drugu riječ, npr. «gustar», «hora» ili «imperativo».</Hint>
          <button className="btn" onClick={() => setQ("")}>
            Borrar búsqueda
          </button>
        </div>
      ) : term ? (
        <div className="stack">
          <p className="hint" role="status">
            {shown.length} {shown.length === 1 ? "resultado" : "resultados"}
          </p>
          {shown.map(card)}
        </div>
      ) : filter === "todo" ? (
        cats.map(c => (
          <div key={c.k} className="sheet-group">
            <h2>
              {c.t}{" "}
              <span className="hr" lang="hr">
                · {c.hr}
              </span>
            </h2>
            {all.filter(s => s.cat === c.k).map(card)}
          </div>
        ))
      ) : (
        <div className="stack">
          <p className="hint" lang="hr">
            {filter === "nuevo" ? `Iz zadnjeg sata (${LAST_UPDATE!.id.split("-").reverse().join(".")})` : CATS.find(c => c.k === filter)!.hr}
          </p>
          {shown.map(card)}
        </div>
      )}
    </section>
  );
};
