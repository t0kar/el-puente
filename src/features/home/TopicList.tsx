import { useNav } from "../../app/navigation";
import { customCards, MY_TOPIC } from "../../lib/cards";
import { activeTopics } from "../../lib/level";
import { cardsSession } from "../../lib/questions";
import { mastery } from "../../lib/srs";

/** "Mis temas": every topic of the selected levels (+ the user's own words) with its mastery */
export const TopicList = () => {
  const { start } = useNav();
  const topics = [...activeTopics(), ...(customCards().length ? [MY_TOPIC] : [])];
  return (
    <div className="lesson-list">
      {topics.map(T => {
        const m = mastery(T.k);
        return (
          <button key={T.k} className="lesson" onClick={() => start(cardsSession([T.k], T.t, "hoy"))}>
            <span className="num">
              <span className={"dot " + T.mark} />
            </span>
            <span style={{ minWidth: 0 }}>
              <span className="ttl">{T.t}</span>
              <br />
              <span className="meta">
                <span className="hronly" lang="hr">
                  {T.hr} ·{" "}
                </span>
                {m.n} palabras{m.nw ? ` · ${m.nw} nuevas` : ""}
                {m.due ? ` · ${m.due} para hoy` : ""}
              </span>
              <span className="bar">
                <i style={{ width: m.pct + "%" }} />
              </span>
            </span>
            <span className="mastery">{m.pct}%</span>
          </button>
        );
      })}
    </div>
  );
};
