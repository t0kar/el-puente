import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { speak } from "../lib/speech";
import { conj, PERSONS, PERSONS_SHORT } from "../lib/verbs";
import type { SessionSpec, Verb } from "../lib/types";

// ---------- navigation ----------
export type ViewName = "hoy" | "tarjetas" | "verbos" | "juegos" | "historias" | "chuleta" | "ajustes" | "progreso" | "pairs" | "rush" | `story:${string}`;
export const NavCtx = createContext<{ go: (v: ViewName) => void; start: (s: SessionSpec) => void }>({ go: () => {}, start: () => {} });
export const useNav = () => useContext(NavCtx);

// ---------- Croatian hint: shown inline, or (setting "Al tocar") behind a small translate icon ----------
export const IconTranslate = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 5h8M8 3v2M10.5 5c-.8 3.6-3.2 6.5-6.5 8" /><path d="M6 9c1.2 2 3 3.5 5 4.4" /><path d="m13 21 4-9 4 9M14.4 18h5.2" /></svg>
);
export function Hint({ children, html, block }: { children?: ReactNode; html?: string; block?: boolean }) {
  const [open, setOpen] = useState(false);
  const Tag = block ? "div" : "span";
  const toggle = (e: React.MouseEvent) => { e.stopPropagation(); setOpen(o => !o); };
  return (
    <Tag className={"hrtip" + (block ? " block" : "") + (open ? " open" : "")}>
      <button type="button" className="hrbtn" aria-expanded={open} aria-label={open ? "Ocultar croata" : "Ver en croata"} title="Ver en croata" onClick={toggle}><IconTranslate /></button>
      {html ? <span className="hrtxt" onClick={open ? toggle : undefined} dangerouslySetInnerHTML={{ __html: html }} /> : <span className="hrtxt" onClick={open ? toggle : undefined}>{children}</span>}
    </Tag>
  );
}

export function Seg<T extends string | number | boolean>({ options, value, onChange, label }: { options: [T, string, boolean?][]; value: T; onChange: (v: T) => void; label?: string }) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map(([v, t, off]) => <button key={String(v)} type="button" aria-pressed={v === value} disabled={off} onClick={() => onChange(v)}>{t}</button>)}
    </div>
  );
}

export const IconSpeak = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></svg>
);
// small stroke icons for buttons (24×24, currentColor)
const ic = (d: ReactNode) => () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
export const Ic = {
  back: ic(<path d="M15 18l-6-6 6-6" />),
  next: ic(<path d="M5 12h14M13 6l6 6-6 6" />),
  play: ic(<path d="M7 4.5v15l12-7.5z" />),
  again: ic(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>),
  plus: ic(<path d="M12 5v14M5 12h14" />),
  check: ic(<path d="M5 12.5l4.5 4.5L19 7.5" />),
  close: ic(<path d="M6 6l12 12M18 6 6 18" />),
  slow: ic(<><path d="M12 14l3.5-3.5" /><path d="M3.3 19a10 10 0 1 1 17.4 0" /></>),
  copy: ic(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></>),
  load: ic(<><path d="M12 15V3M7 10l5 5 5-5" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></>),
  logout: ic(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5M21 12H9" /></>),
  sync: ic(<><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5M3 21v-5h5" /></>),
  bell: ic(<><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a2 2 0 0 0 3.4 0" /></>),
  trash: ic(<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />),
  edit: ic(<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></>),
  pause: ic(<path d="M8 5v14M16 5v14" />),
  stop: ic(<rect x="6" y="6" width="12" height="12" rx="2" />),
  prevS: ic(<><path d="M6 5v14" /><path d="M18 6l-8 6 8 6z" /></>),
  nextS: ic(<><path d="M18 5v14" /><path d="M6 6l8 6-8 6z" /></>),
};

export function SpeakBtn({ text, label = "Escuchar" }: { text: string; label?: string }) {
  return <button type="button" className="icon-btn" aria-label={label} title={label} onClick={e => { e.stopPropagation(); speak(text); }}><IconSpeak /></button>;
}

/** grammar HTML from content/sheets.ts; every <i> example is a button that speaks itself */
export function SheetHtml({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll("i").forEach(i => { i.tabIndex = 0; i.setAttribute("role", "button"); i.title = "Escuchar"; });
  }, [html]);
  const say = (el: EventTarget) => {
    const i = (el as HTMLElement).closest?.("i");
    if (!i || !ref.current?.contains(i)) return;
    speak(i.textContent || "");
    i.classList.remove("said"); void i.offsetWidth; i.classList.add("said");
  };
  return <div ref={ref} className="stack sheet-body" onClick={e => say(e.target)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); say(e.target); } }} dangerouslySetInnerHTML={{ __html: html }} />;
}

export function AccentBar({ inputRef }: { inputRef: React.RefObject<HTMLInputElement> }) {
  return (
    <div className="accents" aria-label="Acentos">
      {"áéíóúñü¿¡".split("").map(ch => (
        <button key={ch} type="button" onClick={() => {
          const el = inputRef.current; if (!el) return;
          const s = el.selectionStart ?? el.value.length, e = el.selectionEnd ?? s;
          const v = el.value.slice(0, s) + ch + el.value.slice(e);
          const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
          setter.call(el, v); el.dispatchEvent(new Event("input", { bubbles: true }));
          el.focus(); el.setSelectionRange(s + 1, s + 1);
        }}>{ch}</button>
      ))}
    </div>
  );
}

export function Clock({ h, m }: { h: number; m: number }) {
  const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
  return (
    <svg className="clock" viewBox="0 0 100 100" role="img" aria-label="Reloj">
      <circle cx="50" cy="50" r="47" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => { const a = (i * 30 * Math.PI) / 180; return <line key={i} x1={50 + 40 * Math.sin(a)} y1={50 - 40 * Math.cos(a)} x2={50 + 44 * Math.sin(a)} y2={50 - 44 * Math.cos(a)} stroke="var(--ink-soft)" strokeWidth={i % 3 ? 1.2 : 2.5} />; })}
      <line x1="50" y1="50" x2="50" y2="25" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${ha} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="13" stroke="var(--bad)" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${ma} 50 50)`} />
      <circle cx="50" cy="50" r="3.5" fill="var(--ink)" />
    </svg>
  );
}

export function ConjGrid({ verb, highlight = -1 }: { verb: Verb; highlight?: number }) {
  return (
    <div className="conj-grid">
      {[0, 3, 1, 4, 2, 5].map(p => {
        const c = conj(verb, p);
        return (
          <span key={p} className={(c.changed ? "chg " : "") + (p === highlight ? "me" : "")} title={PERSONS[p]} onClick={() => speak(c.form)}>
            <small className="hr">{PERSONS_SHORT[p]} </small>{c.form}
          </span>
        );
      })}
    </div>
  );
}

export function Ring({ value, goal }: { value: number; goal: number }) {
  const C = 2 * Math.PI * 40, pct = Math.min(1, value / goal);
  return (
    <svg className="ring" viewBox="0 0 100 100" role="img" aria-label={`Objetivo diario ${value} de ${goal} XP`}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--paper-2)" strokeWidth="10" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={pct >= 1 ? "var(--ok)" : "var(--brand)"} opacity={pct ? 1 : 0} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${C * pct} ${C}`} transform="rotate(-90 50 50)" />
      <text x="50" y="52" textAnchor="middle">{value}</text>
      <text className="lbl" x="50" y="68" textAnchor="middle">de {goal} XP</text>
    </svg>
  );
}

export function Toast({ msg }: { msg: string | null }) { return msg ? <div className="toast" role="status">{msg}</div> : null; }
export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  const t = useRef<number>();
  const show = (m: string) => { setMsg(m); window.clearTimeout(t.current); t.current = window.setTimeout(() => setMsg(null), 2200); };
  return { msg, show };
}

export const ICONS: Record<string, ReactNode> = {
  hoy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></svg>,
  tarjetas: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="6" width="14" height="14" rx="2" /><path d="M7 3h12a2 2 0 0 1 2 2v12" /></svg>,
  verbos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 4c-3 0-3 4-4 8s-1 8-4 8" /><path d="M7 11h8" /><path d="M15 15l5 5M20 15l-5 5" /></svg>,
  juegos: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="4" /><circle cx="8.5" cy="8.5" r="1.3" fill="currentColor" /><circle cx="15.5" cy="15.5" r="1.3" fill="currentColor" /><circle cx="15.5" cy="8.5" r="1.3" fill="currentColor" /><circle cx="8.5" cy="15.5" r="1.3" fill="currentColor" /></svg>,
  historias: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /><path d="M9 8h6M9 12h4" /></svg>,
  chuleta: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" strokeWidth="3" /></svg>,
  progreso: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
  ajustes: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>,
};
export const Logo = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 30v-8M18 30v-14M24 30v-17M30 30v-14M36 30v-8" stroke="var(--ink)" strokeWidth="2" /><path d="M6 30c4-12 10-18 18-18s14 6 18 18" fill="none" stroke="var(--brand)" strokeWidth="3.5" strokeLinecap="round" /><path d="M3 30h42" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" /><path d="M2 38c4-3 8-3 11 0s8 3 11 0 8-3 11 0 8 3 11 0" fill="none" stroke="var(--hl-blue)" strokeWidth="3" strokeLinecap="round" /></svg>
);
export const IconFlame = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 3.2-1 5-2.6 6.8C8 10.4 6.5 12 6.5 14.8A5.5 5.5 0 0 0 12 20.5a5.5 5.5 0 0 0 5.5-5.6c0-2.3-1-4.1-2.3-5.4.1 1.5-.4 2.8-1.6 3.4.4-3.9-.7-8.2-1.6-10.9z" /></svg>
);
