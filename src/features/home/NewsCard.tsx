import { Ic } from "../../components/icons";
import { useNav } from "../../app/navigation";
import { flipQ } from "../../lib/questions";
import { sGet } from "../../lib/srs";
import { useAppState } from "../../lib/store";
import { LAST_UPDATE, lastClassCards, markUpdatesSeen, unseenUpdates } from "../../lib/updates";
import { shuffle } from "../../lib/util";

const day = (id: string) => new Date(id + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" });

/** "Novedades": classes published since the user last looked (badge), otherwise the newest class */
export const NewsCard = () => {
  const st = useAppState();
  const { start } = useNav();
  const unseen = unseenUpdates(st);
  const shown = unseen.length ? unseen : LAST_UPDATE ? [LAST_UPDATE] : [];
  const words = shown.flatMap(u => lastClassCards(u.id));
  if (!shown.length || (!unseen.length && !words.length)) return null;
  const practise = () => {
    markUpdatesSeen();
    start({ title: unseen.length ? "Novedades" : "Desde la última clase", questions: shuffle(words).map(c => flipQ(c, !!sGet(c.id))), back: "hoy" });
  };
  return (
    <div className={"card stack news" + (unseen.length ? " is-new" : "")}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3>
          <span className="mark green">{unseen.length ? "Novedades" : "Desde la última clase"}</span>
          {unseen.length > 0 && <span className="badge">Nuevo</span>}
        </h3>
        {unseen.length > 0 && (
          <button className="icon-btn" aria-label="Marcar como visto" title="Marcar como visto" onClick={markUpdatesSeen}>
            <Ic.close />
          </button>
        )}
      </div>
      <ul className="news-list">
        {shown.map(u => (
          <li key={u.id}>
            <span className="news-date">{day(u.id)}</span> {u.note}
            <span className="hr"> · {lastClassCards(u.id).length} palabras</span>
          </li>
        ))}
      </ul>
      {words.length > 0 && (
        <button className="btn" style={{ justifySelf: "start" }} onClick={practise}>
          <Ic.play /> Practicar
        </button>
      )}
    </div>
  );
};
