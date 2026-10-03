import { useEffect, useRef, useState } from "react";
import type { FlipQ } from "../../lib/types";
import { useSettings } from "../../lib/store";
import { previewIntervals, sGet } from "../../lib/srs";
import { autoSpeak } from "../../lib/speech";
import { checkAnswer, type CheckRes } from "../../lib/check";
import { AccentBar } from "../../components/AccentBar";
import { Hint } from "../../components/Hint";
import { SpeakBtn } from "../../components/SpeakBtn";
import { Feedback } from "./Feedback";

/** spaced-repetition card: reveal (or type), then rate 1–4 */
export const FlipView = ({ q, onRate }: { q: FlipQ; onRate: (r: 1 | 2 | 3 | 4) => void }) => {
  const settings = useSettings();
  const c = q.card;
  const front = q.dir === "es" ? c.es : c.hr,
    back = q.dir === "es" ? c.hr : c.es;
  const typing = settings.type && q.dir === "hr";
  const [shown, setShown] = useState(false);
  const [val, setVal] = useState("");
  const [verdict, setVerdict] = useState<CheckRes | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const isNew = !sGet(c.id);
  useEffect(() => {
    if (q.dir === "es") {
      const t = window.setTimeout(() => autoSpeak(c.es), 200);
      return () => window.clearTimeout(t);
    }
    if (typing) ref.current?.focus({ preventScroll: true });
  }, [q, c.es, typing]);
  const reveal = () => {
    if (shown) return;
    if (typing) setVerdict(checkAnswer(val, [c.es]));
    setShown(true);
    if (q.dir === "hr") autoSpeak(c.es);
  };
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (!shown && (e.key === "Enter" || (e.key === " " && !typing))) {
        e.preventDefault();
        reveal();
      } else if (shown) {
        const n = +e.key;
        if (n >= 1 && n <= 4) onRate(n as 1 | 2 | 3 | 4);
      }
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  });
  const ints = previewIntervals(c.id);
  const sug = verdict ? (verdict === "bad" ? 1 : verdict === "ok" ? 3 : 2) : 3;
  return (
    <>
      {isNew && (
        <span className="mark green hr" style={{ justifySelf: "start" }}>
          nueva
        </span>
      )}
      <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap", gap: 12 }}>
        <div className="qmain" style={{ flex: 1, minWidth: 0 }}>
          {front}
        </div>
        {q.dir === "es" && <SpeakBtn text={c.es} />}
      </div>
      <div className="hr">{q.dir === "es" ? "¿Qué significa en croata?" : "¿Cómo se dice en español?"}</div>
      {typing && (
        <>
          <input
            ref={ref}
            className="answer-input"
            value={val}
            disabled={shown}
            onChange={e => setVal(e.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="Escribe en español…"
            aria-label="Respuesta"
          />
          {!shown && <AccentBar inputRef={ref} />}
        </>
      )}
      {!shown && (
        <button className="btn primary big" onClick={reveal}>
          {typing ? "Comprobar" : "Mostrar respuesta"}
        </button>
      )}
      {shown && (
        <>
          <div className="reveal">
            {verdict && (
              <Feedback
                fb={{
                  kind: verdict === "ok" ? "ok" : verdict === "bad" ? "bad" : "warn",
                  title: (
                    {
                      ok: "¡Correcto!",
                      accent: "Ojo con el acento",
                      article: "Bien, falta el artículo",
                      typo: "Casi (pequeño error)",
                      bad: "Esta vez no",
                    } as Record<CheckRes, string>
                  )[verdict],
                }}
              />
            )}
            <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
              <div className="ans">{back}</div>
              {q.dir === "hr" && <SpeakBtn text={c.es} />}
            </div>
          </div>
          <p className="hint">
            ¿Qué tal lo sabías? <Hint>Ocijeni iskreno: "Otra vez" vraća karticu za minutu, "Fácil" je odgađa.</Hint>
          </p>
          <div className="rate">
            {(
              [
                [1, "Otra vez", "r1"],
                [2, "Difícil", "r2"],
                [3, "Bien", "r3"],
                [4, "Fácil", "r4"],
              ] as const
            ).map(([r, t, cl]) => (
              <button key={r} className={cl} autoFocus={r === sug} onClick={() => onRate(r)}>
                {t}
                <small>{ints[r - 1]}</small>
              </button>
            ))}
          </div>
        </>
      )}
    </>
  );
};
