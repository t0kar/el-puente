import { useEffect, useRef, useState } from "react";
import { useSync } from "../hooks/useSync";
import { canSendReport, ctxLine, MAX_REPORT, reportMailto, sendReport, type ReportCtx } from "../lib/report";
import { Ic } from "./icons";

/** "Reportar un error": a modal with the context of what was on screen and a comment. Closes itself shortly after sending. */
export const ReportDialog = ({ ctx, onClose }: { ctx: ReportCtx; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const { user } = useSync();
  const [text, setText] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");
  const [err, setErr] = useState("");
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  useEffect(() => {
    if (state !== "sent") return;
    const t = window.setTimeout(onClose, 1400);
    return () => window.clearTimeout(t);
  }, [state, onClose]);
  const send = async () => {
    setState("busy");
    setErr("");
    const e = await sendReport(ctx, text);
    if (e) {
      setErr(e);
      setState("idle");
    } else setState("sent");
  };
  const line = ctxLine(ctx);
  const mail = !user ? reportMailto(ctx, text) : null;
  const general = ctx.kind === "general";
  return (
    // keys typed here must not reach the practice shortcuts (1–4, Enter) listening on document
    <dialog ref={ref} className="report" aria-labelledby="report-title" onClose={onClose} onKeyDown={e => e.stopPropagation()}>
      <h2 id="report-title">{general ? "Reportar un problema" : "Reportar un error"}</h2>
      {line && (
        <p className="report-ctx">
          {ctx.tag && <span className="qtag">{ctx.tag}</span>}
          <b>{line}</b>
          {ctx.options && <span className="report-opts">{ctx.options.join(" · ")}</span>}
        </p>
      )}
      {state === "sent" ? (
        <p className="fb ok" role="status">
          ¡Gracias! <span lang="hr">Prijava je poslana.</span>
        </p>
      ) : (
        <>
          <label htmlFor="report-text" className="hint" lang="hr">
            {general ? "Opiši problem: što si radio/la i što se dogodilo." : "Što nije u redu? Npr. dva točna odgovora, krivi prijevod, greška u španjolskom."}
          </label>
          <textarea
            id="report-text"
            className="answer-input"
            rows={4}
            maxLength={MAX_REPORT}
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={state === "busy"}
          />
          {!user && !mail && (
            <p className="hint" role="status" lang="hr">
              Za slanje prijave prijavi se Google računom (Ajustes → Cuenta y progreso).
            </p>
          )}
          {err && (
            <p className="fb bad" role="status" lang="hr">
              {err}
            </p>
          )}
          <div className="row report-actions">
            <button className="btn ghost" onClick={onClose}>
              Cancelar
            </button>
            {mail ? (
              <a className="btn primary" href={mail} onClick={onClose}>
                <Ic.flag /> Enviar por correo
              </a>
            ) : (
              <button className="btn primary" disabled={state === "busy" || !canSendReport() || (general && !text.trim())} onClick={send}>
                <Ic.flag /> {state === "busy" ? "Enviando…" : "Enviar"}
              </button>
            )}
          </div>
        </>
      )}
    </dialog>
  );
};
