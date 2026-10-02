import { cards, customCards, LAST_UPDATE, lastClassCards, MY_TOPIC } from "../lib/cards";
import { activeTopics } from "../lib/level";
import { useAppState, xpToday, streak } from "../lib/store";
import { dueCards, mastery, newCards, newLeft, sGet } from "../lib/srs";
import { beforeClassSession, cardsSession, dailySession, flipQ } from "../lib/questions";
import { Hint, Ring, useNav } from "../components/ui";
import { shuffle } from "../lib/util";

const TIPS: [string, string][] = [
  ["Di cada palabra en voz alta.", "Izgovaranje naglas pamti se bolje od tihog čitanja."],
  ["Poco y cada día.", "10 minuta dnevno bolje je od 2 sata jednom tjedno."],
  ["Primero intenta recordar, después mira.", "Prisjećanje (i greška) jača pamćenje više od ponovnog čitanja."],
  ["Los errores son datos.", "Kartice koje ne znaš vraćaju se brže. To je algoritam, ne kazna."],
  ["Piensa en fórmulas.", "Glagol = osnova + nastavak. Uči 6 nastavaka, ne 600 oblika."],
  ["Mezcla los temas.", "Miješanje tema (glagoli, brojevi, riječi) je teže, ali dulje traje."],
  ["Inventa frases absurdas.", "«Mi abuelo es un pulpo» pamti se bolje od dosadne rečenice."],
];

export function Home() {
  const st = useAppState();
  const { start } = useNav();
  const goal = st.settings.goal, xp = xpToday(st);
  const due = dueCards().length, nl = Math.min(newLeft(), newCards().length);
  const tip = TIPS[new Date().getDate() % TIPS.length];
  const has = Object.keys(st.cards).length > 0;
  const last = lastClassCards();
  const lastNew = last.filter(c => !sGet(c.id)).length;
  return (
    <section className="view">
      <div className="card hero">
        <Ring value={xp} goal={goal} />
        <div className="stack">
          <h1>{xp >= goal ? "¡Objetivo cumplido!" : "¡Hola! ¿Repasamos?"}</h1>
          <p className="hr">{has ? `Para hoy: ${due} tarjetas para repasar y ${nl} nuevas.` : "Empieza con el repaso del día: unos 10 minutos de tarjetas, verbos y juegos."}</p>
          <div className="stats"><span className="pill">Racha <b>{streak(st)}</b> días</span><span className="pill">Palabras <b>{cards().length}</b></span></div>
        </div>
      </div>
      <button className="btn primary big" onClick={() => start(dailySession())}>Repaso del día · 10 min</button>
      <div className="card row" style={{ justifyContent: "space-between" }}>
        <div className="stack" style={{ gap: 4, minWidth: 0, flex: 1 }}>
          <h3><span className="mark yellow">Antes de clase · 5 min</span></h3>
          <p>{LAST_UPDATE ? `Lo nuevo desde la última clase (${last.length} palabras${lastNew ? ", " + lastNew + " sin estudiar" : ""}) y tus palabras difíciles.` : "Tus palabras difíciles y un poco de gramática."} <Hint>Kratko ponavljanje prije sljedećeg sata: zadnje gradivo + riječi u kojima najčešće griješiš.</Hint></p>
        </div>
        <button className="btn" onClick={() => start(beforeClassSession())}>Empezar</button>
      </div>
      {LAST_UPDATE && last.length > 0 && (
        <div className="card row" style={{ justifyContent: "space-between" }}>
          <div className="stack" style={{ gap: 4, minWidth: 0, flex: 1 }}>
            <h3><span className="mark green">Desde la última clase</span></h3>
            <p>{last.length} palabras nuevas{LAST_UPDATE.note ? " · " + LAST_UPDATE.note : ""}</p>
          </div>
          <button className="btn" onClick={() => start({ title: "Desde la última clase", questions: shuffle(last).map(c => flipQ(c, !!sGet(c.id))), back: "hoy" })}>Practicar</button>
        </div>
      )}
      <div className="tip"><b>{tip[0]}</b> <Hint>{tip[1]}</Hint></div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h2><span className="mark green">Mis temas</span></h2>
        <Hint>Klik = vježbaj temu</Hint>
      </div>
      <div className="lesson-list">
        {[...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])].map(T => {
          const m = mastery(T.k);
          return (
            <button key={T.k} className="lesson" onClick={() => start(cardsSession([T.k], T.t, "hoy"))}>
              <span className="num"><span className={"dot " + T.mark} /></span>
              <span style={{ minWidth: 0 }}>
                <span className="ttl">{T.t}</span><br />
                <span className="meta"><span className="hronly">{T.hr} · </span>{m.n} palabras{m.nw ? ` · ${m.nw} nuevas` : ""}{m.due ? ` · ${m.due} para hoy` : ""}</span>
                <span className="bar"><i style={{ width: m.pct + "%" }} /></span>
              </span>
              <span className="mastery">{m.pct}%</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
