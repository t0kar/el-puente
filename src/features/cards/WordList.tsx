import { useMemo, useState } from "react";
import { TOPIC_BY_K } from "../../lib/cards";
import { stripAcc } from "../../lib/check";
import { speak } from "../../lib/speech";
import type { Card } from "../../lib/types";

/** searchable list of every active card; tap a word to hear it */
export const WordList = ({ all }: { all: Card[] }) => {
  const [q, setQ] = useState("");
  const rows = useMemo(() => {
    const t = stripAcc(q.toLowerCase());
    return all.filter(c => !t || stripAcc((c.es + " " + c.hr).toLowerCase()).includes(t)).slice(0, 200);
  }, [q, all]);
  return (
    <div className="stack" style={{ marginTop: 10 }}>
      <input id="word-search" className="answer-input" placeholder="Buscar…" aria-label="Buscar palabra" value={q} onChange={e => setQ(e.target.value)} />
      <div className="tbl">
        <table>
          <tbody>
            {rows.map(c => (
              <tr key={c.id}>
                <td>
                  <span className={"dot " + TOPIC_BY_K[c.T].mark} title={TOPIC_BY_K[c.T].t} />
                </td>
                <td>
                  <button type="button" className="linkish" title="Escuchar" onClick={() => speak(c.es)}>
                    {c.es}
                  </button>
                </td>
                <td className="hr" lang="hr">
                  {c.hr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
