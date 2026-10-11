import { useAppState, streak } from "../../lib/store";
import { mastery, totals, sGet } from "../../lib/srs";
import { cards, customCards, MY_TOPIC } from "../../lib/cards";
import { activeTopics } from "../../lib/level";
import { cardsSession } from "../../lib/questions";
import { DAY, todayKey } from "../../lib/util";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { useNav } from "../../app/navigation";
import { XPChart } from "./XPChart";
import "./progress.css";

export const Progress = () => {
  const st = useAppState();
  const { start } = useNav();
  const t = totals();
  const week = Array.from({ length: 7 }, (_, i) => st.days[todayKey(Date.now() - i * DAY)] || 0).reduce((a, b) => a + b, 0);
  const activeDays = Array.from({ length: 7 }, (_, i) => st.days[todayKey(Date.now() - i * DAY)] || 0).filter(Boolean).length;
  const tomorrow = Date.now() + DAY;
  const dueTomorrow = cards().filter(c => {
    const s = sGet(c.id);
    return s && s.d <= tomorrow;
  }).length;
  const topics = [...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])].map(T => ({ T, m: mastery(T.k) })).sort((a, b) => a.m.pct - b.m.pct);
  return (
    <section className="view">
      <h1>
        <span className="mark blue">Progreso</span>
      </h1>
      <div className="card stack">
        <h3>Últimas dos semanas</h3>
        <XPChart days={st.days} goal={st.settings.goal} />
        <p className="hint">Zeleno = dnevni cilj ispunjen ({st.settings.goal} XP). Isprekidana crta je cilj.</p>
      </div>
      <div className="kpis">
        <div className="kpi">
          <b>{streak(st)}</b>
          <span>días seguidos</span>
        </div>
        <div className="kpi">
          <b>{week}</b>
          <span>XP esta semana · {activeDays}/7 días</span>
        </div>
        <div className="kpi">
          <b>{t.learned}</b>
          <span>palabras aprendidas de {t.total}</span>
        </div>
        <div className="kpi">
          <b>{t.mastered}</b>
          <span>dominadas (21+ días)</span>
        </div>
        <div className="kpi">
          <b>{dueTomorrow}</b>
          <span>para repasar mañana</span>
        </div>
      </div>
      <div className="card">
        <h3>Temas: de más débil a más fuerte</h3>
        <p className="hint" style={{ marginTop: 4 }}>
          Postotak raste kako se riječi u temi pamte dulje (21 dan = 100%). <Hint>Počni od vrha liste.</Hint>
        </p>
        {topics.map(({ T, m }) => (
          <div key={T.k} className="weak">
            <div style={{ minWidth: 0 }}>
              <b>{T.t}</b> <span className="mastery">{m.pct}%</span>
              <span className="bar">
                <i style={{ width: m.pct + "%" }} />
              </span>
              <span className="hint">
                {m.nw ? m.nw + " sin estudiar · " : ""}
                {m.due ? m.due + " para hoy" : "al día"}
              </span>
            </div>
            <button className="btn ghost" onClick={() => start(cardsSession([T.k], T.t, "progreso"))}>
              <Ic.play /> Practicar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
