import { useAppState, streak } from "../lib/store";
import { mastery, totals, sGet } from "../lib/srs";
import { cards, customCards, MY_TOPIC } from "../lib/cards";
import { activeTopics } from "../lib/level";
import { cardsSession } from "../lib/questions";
import { DAY, todayKey } from "../lib/util";
import { Hint, Ic, useNav } from "../components/ui";

function XPChart({ days, goal }: { days: Record<string, number>; goal: number }) {
  const N = 14, W = 340, H = 140, pad = { l: 26, r: 6, t: 10, b: 22 };
  const data = Array.from({ length: N }, (_, i) => { const t = Date.now() - (N - 1 - i) * DAY; return { k: todayKey(t), d: new Date(t), v: days[todayKey(t)] || 0 }; });
  const max = Math.max(goal, ...data.map(d => d.v)) * 1.1;
  const bw = (W - pad.l - pad.r) / N;
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);
  const ticks = [0, Math.round(goal / 2), goal];
  const DOW = ["D", "L", "M", "X", "J", "V", "S"];
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="XP de los últimos 14 días">
      {ticks.map(t => <g key={t}><line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeDasharray={t === goal ? "4 3" : undefined} /><text x={pad.l - 4} y={y(t) + 3} textAnchor="end">{t}</text></g>)}
      {data.map((d, i) => {
        const x = pad.l + i * bw + bw * 0.15, w = bw * 0.7, top = y(d.v);
        return <g key={d.k}>
          <rect x={x} y={top} width={w} height={Math.max(0, H - pad.b - top)} rx="3" fill={d.v >= goal ? "var(--ok)" : "var(--ink)"} opacity={d.v ? 1 : 0.15}><title>{d.k}: {d.v} XP</title></rect>
          <text x={x + w / 2} y={H - 8} textAnchor="middle" style={i === N - 1 ? { fill: "var(--ink)", fontWeight: 700 } : undefined}>{DOW[d.d.getDay()]}</text>
        </g>;
      })}
    </svg>
  );
}

export function Progress() {
  const st = useAppState();
  const { start } = useNav();
  const t = totals();
  const week = Array.from({ length: 7 }, (_, i) => st.days[todayKey(Date.now() - i * DAY)] || 0).reduce((a, b) => a + b, 0);
  const activeDays = Array.from({ length: 7 }, (_, i) => st.days[todayKey(Date.now() - i * DAY)] || 0).filter(Boolean).length;
  const tomorrow = Date.now() + DAY;
  const dueTomorrow = cards().filter(c => { const s = sGet(c.id); return s && s.d <= tomorrow; }).length;
  const topics = [...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])].map(T => ({ T, m: mastery(T.k) })).sort((a, b) => a.m.pct - b.m.pct);
  return (
    <section className="view">
      <h1><span className="mark blue">Progreso</span></h1>
      <div className="card stack">
        <h3>Últimas dos semanas</h3>
        <XPChart days={st.days} goal={st.settings.goal} />
        <p className="hint">Zeleno = dnevni cilj ispunjen ({st.settings.goal} XP). Isprekidana crta je cilj.</p>
      </div>
      <div className="kpis">
        <div className="kpi"><b>{streak(st)}</b><span>días seguidos</span></div>
        <div className="kpi"><b>{week}</b><span>XP esta semana · {activeDays}/7 días</span></div>
        <div className="kpi"><b>{t.learned}</b><span>palabras aprendidas de {t.total}</span></div>
        <div className="kpi"><b>{t.mastered}</b><span>dominadas (21+ días)</span></div>
        <div className="kpi"><b>{dueTomorrow}</b><span>para repasar mañana</span></div>
      </div>
      <div className="card">
        <h3>Temas: de más débil a más fuerte</h3>
        <p className="hint" style={{ marginTop: 4 }}>Postotak raste kako se riječi u temi pamte dulje (21 dan = 100%). <Hint>Počni od vrha liste.</Hint></p>
        {topics.map(({ T, m }) => (
          <div key={T.k} className="weak">
            <div style={{ minWidth: 0 }}>
              <b>{T.t}</b> <span className="mastery">{m.pct}%</span>
              <span className="bar"><i style={{ width: m.pct + "%" }} /></span>
              <span className="hint">{m.nw ? m.nw + " sin estudiar · " : ""}{m.due ? m.due + " para hoy" : "al día"}</span>
            </div>
            <button className="btn ghost" onClick={() => start(cardsSession([T.k], T.t, "progreso"))}><Ic.play /> Practicar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
