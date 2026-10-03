import { createContext, useContext } from "react";
import type { SessionSpec } from "../lib/types";

/** every screen; `story:<id>` opens one story. The hash in the URL is the view name (#tarjetas). */
export type ViewName = "hoy" | "tarjetas" | "verbos" | "juegos" | "historias" | "chuleta" | "ajustes" | "progreso" | "pairs" | "rush" | `story:${string}`;

/** main tabs, in tab-bar order */
export const TABS: [ViewName, string][] = [
  ["hoy", "Hoy"],
  ["tarjetas", "Tarjetas"],
  ["verbos", "Verbos"],
  ["juegos", "Juegos"],
  ["historias", "Historias"],
  ["chuleta", "Chuleta"],
];
const OTHER_VIEWS = ["ajustes", "progreso", "pairs", "rush"];

export const isView = (h: string): h is ViewName => TABS.some(t => t[0] === h) || OTHER_VIEWS.includes(h) || /^story:[\w-]+$/.test(h);
/** the tab a view belongs to (for highlighting the tab bar) */
export const tabOf = (v: ViewName): ViewName => (v.startsWith("story:") ? "historias" : v === "pairs" || v === "rush" ? "juegos" : v);

export interface Nav {
  /** open a screen (pushes a history entry, so the back button works) */
  go: (v: ViewName) => void;
  /** start a practice session on top of the current screen */
  start: (s: SessionSpec) => void;
}
export const NavCtx = createContext<Nav>({ go: () => {}, start: () => {} });
export const useNav = () => useContext(NavCtx);
