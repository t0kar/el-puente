import { useEffect, useMemo, useRef, useState } from "react";
import { STORIES } from "../../content";
import { addXP, update } from "../../lib/store";
import { stopSpeech } from "../../lib/speech";
import { useReader } from "../../hooks/useReader";
import { Hint } from "../../components/Hint";
import { Ic } from "../../components/icons";
import { useNav } from "../../app/navigation";
import { layout, parse } from "./storyText";
import { Gap } from "./Gap";
import { ReaderBar } from "./ReaderBar";
import "./stories.css";

export const StoryView = ({ id }: { id: string }) => {
  const { go } = useNav();
  const s = STORIES.find(x => x.id === id)!;
  const parts = useMemo(() => parse(s.text), [s]);
  const pieces = useMemo(() => layout(parts), [parts]);
  const total = parts.filter(p => typeof p !== "string").length;
  const [solved, setSolved] = useState(0),
    [first, setFirst] = useState(0),
    [tr, setTr] = useState(false);
  const plain = useMemo(() => parts.map(p => (typeof p === "string" ? p : p.correct)).join(""), [parts]);
  const rd = useReader(plain);
  const storyRef = useRef<HTMLDivElement>(null);
  const onSolve = (f: boolean) => {
    const ns = solved + 1,
      nf = first + (f ? 1 : 0);
    setSolved(ns);
    setFirst(nf);
    if (f) addXP(3);
    if (ns === total)
      update(st => {
        st.stories[s.id] = Math.max(st.stories[s.id] || 0, nf);
      });
  };
  const sen = rd.status !== "idle" ? rd.sentence : undefined;
  const cls = (a: number, b: number) => {
    if (!sen || b <= sen.start || a >= sen.end) return "";
    return rd.word && a < rd.word[1] && b > rd.word[0] ? "rd-sent rd-word" : "rd-sent";
  };
  // keep the sentence being read on screen
  useEffect(() => {
    if (!sen) return;
    const el = storyRef.current?.querySelector<HTMLElement>(".rd-sent");
    if (!el) return;
    const r = el.getBoundingClientRect(),
      bar = document.querySelector(".readerbar")?.getBoundingClientRect();
    if (r.top < 70 || r.bottom > (bar ? bar.top : innerHeight) - 8) el.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [rd.idx, rd.status]); // eslint-disable-line react-hooks/exhaustive-deps
  // Space = play/pause, ←/→ = sentence (not while a button or field has focus)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("button, input, textarea, select")) return;
      if (e.key === " ") {
        e.preventDefault();
        rd.toggle();
      } else if (rd.status !== "idle" && e.key === "ArrowLeft") rd.prev();
      else if (rd.status !== "idle" && e.key === "ArrowRight") rd.next();
    };
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  });
  return (
    <section className={"view" + (rd.status !== "idle" ? " reading" : "")} id="story-view">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <button
          className="btn ghost"
          onClick={() => {
            rd.stop();
            stopSpeech();
            go("historias");
          }}
        >
          <Ic.back /> Historias
        </button>
        <span className="hr">{s.g}</span>
      </div>
      <h1>{s.t}</h1>
      <div className="card stack">
        {/* tap a word while reading = jump to its sentence (keyboard: ←/→ in the player) */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="story"
          ref={storyRef}
          onClick={e => {
            if (rd.status === "idle") return;
            const w = (e.target as HTMLElement).closest<HTMLElement>("[data-s]");
            if (w) rd.seek(Number(w.dataset.s));
          }}
        >
          {pieces.map((p, i) =>
            p.kind === "sp" ? (
              sen && p.s >= sen.start && p.e <= sen.end ? (
                <span key={i} className="rd-sent">
                  {p.t}
                </span>
              ) : (
                p.t
              )
            ) : p.kind === "w" ? (
              <span key={i} data-s={p.s} className={cls(p.s, p.e) || undefined}>
                {p.t}
              </span>
            ) : (
              <Gap key={"g" + p.key} p={p.p} onSolve={onSolve} cls={cls(p.s, p.e)} />
            ),
          )}
        </div>
        <div className="row">
          <button className="btn ghost" onClick={() => setTr(t => !t)} aria-pressed={tr}>
            <Ic.translate /> Traducción
          </button>
          {rd.status === "idle" && (
            <button className="btn" onClick={rd.play}>
              <Ic.play /> Escuchar
            </button>
          )}
        </div>
        {tr && <p className="hr">{s.hr}</p>}
        {solved === total && (
          <>
            <div className="fb ok">
              <b>
                ¡Fin! {first}/{total} a la primera.
              </b>
              <span className="why">
                Escucha la historia y lee en voz alta con Paco. <Hint>Pusti priču i čitaj naglas zajedno s Pacom.</Hint>
              </span>
            </div>
            <div className="row">
              {rd.status === "idle" && (
                <button className="btn primary" onClick={rd.play}>
                  <Ic.speak /> Escuchar la historia
                </button>
              )}
              <button className="btn" onClick={() => go("historias")}>
                Más historias
              </button>
            </div>
          </>
        )}
        <ReaderBar rd={rd} />
      </div>
    </section>
  );
};
