import { useEffect, useRef, useState } from "react";
import type { SessionSpec } from "../lib/types";
import { isView, TABS, type Nav, type ViewName } from "./navigation";

// Hash routing: the URL hash is the view (#tarjetas, #story:s1). go() pushes a history entry and a practice
// session pushes one too, so the phone/browser back button returns to the previous screen or closes the session.

const LAST_TAB = "el-puente-view";
const fromHash = (): ViewName | null => {
  const h = decodeURIComponent(location.hash.slice(1));
  return isView(h) ? h : null;
};
const initialView = (): ViewName => {
  const h = fromHash();
  if (h) return h;
  try {
    const v = localStorage.getItem(LAST_TAB);
    if (v && TABS.some(t => t[0] === v)) return v as ViewName;
  } catch {
    /* storage blocked */
  }
  return "hoy";
};
const rememberTab = (v: ViewName) => {
  try {
    if (TABS.some(t => t[0] === v)) localStorage.setItem(LAST_TAB, v);
  } catch {
    /* storage blocked */
  }
};
const inSessionEntry = () => !!(history.state as { session?: boolean } | null)?.session;

export const useRoute = () => {
  const [view, setView] = useState<ViewName>(initialView);
  const [session, setSession] = useState<SessionSpec | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  const viewRef = useRef(view);
  viewRef.current = view;

  useEffect(() => {
    history.replaceState({ v: viewRef.current }, "", "#" + viewRef.current);
    const onPop = () => {
      setSession(null);
      const v = fromHash() ?? "hoy";
      setView(v);
      rememberTab(v);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go: Nav["go"] = v => {
    window.scrollTo({ top: 0 });
    if (v === viewRef.current && !session) return;
    setSession(null);
    setView(v);
    rememberTab(v);
    history.pushState({ v }, "", "#" + v);
  };
  const start: Nav["start"] = s => {
    setSession(s);
    setSessionKey(k => k + 1);
    window.scrollTo({ top: 0 });
    // "Otra ronda" replaces the session entry instead of stacking another one
    if (inSessionEntry()) history.replaceState({ v: viewRef.current, session: true }, "");
    else history.pushState({ v: viewRef.current, session: true }, "");
  };
  /** leave the session: same as pressing back */
  const exitSession = () => {
    if (inSessionEntry()) history.back();
    else setSession(null);
  };

  return { view, session, sessionKey, go, start, exitSession };
};
