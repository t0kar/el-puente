// Error reports ("Reportar un error"): saved to Firestore `reports/{id}`; scripts/report-issues.mjs turns them into GitHub issues.
import { addDoc, collection } from "firebase/firestore";
import { currentUser, firestore } from "./firebase";
import type { Question } from "./types";

export interface ReportCtx {
  kind: "question" | "general";
  key?: string;
  tag?: string;
  prompt?: string;
  options?: string[];
  answer?: string;
  lvl?: string;
}
export const MAX_REPORT = 1000;
const EMAIL = import.meta.env.VITE_REPORT_EMAIL as string | undefined;

/** what the user was looking at, so the report can be found in the content */
export const questionCtx = (q: Question): ReportCtx => {
  const base = { kind: "question" as const, key: q.key, tag: q.tag, lvl: q.lvl };
  if (q.kind === "flip") return { ...base, prompt: q.dir === "es" ? q.card.es : q.card.hr, answer: q.dir === "es" ? q.card.hr : q.card.es };
  if (q.kind === "mc")
    return { ...base, prompt: q.prompt || (q.clock ? `reloj ${q.clock.h}:${q.clock.m}` : ""), options: q.options, answer: q.options[q.correct] };
  if (q.kind === "tiles") return { ...base, prompt: q.prompt, answer: q.target.join(" ") };
  return { ...base, prompt: q.listen || q.prompt, answer: q.answers[0] };
};
/** short one-line description of the context (dialog preview, e-mail subject) */
export const ctxLine = (c: ReportCtx) => (c.prompt ? `${c.prompt}${c.answer ? " → " + c.answer : ""}` : "");

export const canSendReport = () => !!(firestore() && currentUser());
/** e-mail fallback for signed-out users, only when VITE_REPORT_EMAIL is set */
export const reportMailto = (c: ReportCtx, text: string) => {
  if (!EMAIL) return null;
  const body = [
    text,
    "",
    c.tag && `Tipo: ${c.tag}`,
    c.prompt && `Pregunta: ${c.prompt}`,
    c.options && `Opciones: ${c.options.join(" / ")}`,
    c.answer && `Respuesta: ${c.answer}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent("Cruza el Puente: " + (ctxLine(c) || "problema").slice(0, 80))}&body=${encodeURIComponent(body)}`;
};

/** returns an error message or "" */
export const sendReport = async (ctx: ReportCtx, text: string): Promise<string> => {
  const db = firestore(),
    user = currentUser();
  if (!db || !user) return "Prijavi se Google računom (Ajustes) da pošalješ prijavu.";
  const clean = Object.fromEntries(Object.entries(ctx).filter(([, v]) => v !== undefined && v !== ""));
  try {
    await addDoc(collection(db, "reports"), {
      uid: user.uid,
      at: Date.now(),
      ctx: clean,
      text: text.trim().slice(0, MAX_REPORT),
      ua: navigator.userAgent.slice(0, 160),
      url: location.origin + location.pathname,
    });
    return "";
  } catch (e) {
    return "Slanje nije uspjelo: " + ((e as Error)?.message || e);
  }
};
