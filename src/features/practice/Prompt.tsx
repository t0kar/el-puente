import { useEffect } from "react";
import type { MCQ, TilesQ, TypeQ } from "../../lib/types";
import { autoSpeak, speak } from "../../lib/speech";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { SpeakBtn } from "../../components/SpeakBtn";
import { Clock } from "./Clock";

/** question header: text, clock, or listening buttons, plus the Croatian sub-hint */
export const Prompt = ({ q }: { q: MCQ | TypeQ | TilesQ }) => {
  const listen = q.kind === "type" ? q.listen : undefined;
  useEffect(() => {
    if (listen) {
      const t = window.setTimeout(() => autoSpeak(listen), 250);
      return () => window.clearTimeout(t);
    }
  }, [listen]);
  return (
    <>
      {listen ? (
        <>
          {q.prompt && <div className="qmain">{q.prompt}</div>}
          <div className="listen">
            <button className="btn" onClick={() => speak(listen)}>
              <Ic.speak /> Escuchar
            </button>
            <button className="btn ghost" onClick={() => speak(listen, true)}>
              <Ic.slow /> Lento
            </button>
          </div>
        </>
      ) : (
        <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap", gap: 12 }}>
          {q.kind === "mc" && q.clock ? (
            <div style={{ flex: 1 }}>
              <Clock h={q.clock.h} m={q.clock.m} />
            </div>
          ) : q.prompt ? (
            <div className="qmain" style={{ flex: 1, minWidth: 0 }}>
              {q.prompt}
            </div>
          ) : null}
          {q.kind === "mc" && q.speakPrompt ? <SpeakBtn text={q.speakPrompt} /> : null}
        </div>
      )}
      {"sub" in q && q.sub && (
        <div>
          <Hint>{q.sub}</Hint>
        </div>
      )}
    </>
  );
};
