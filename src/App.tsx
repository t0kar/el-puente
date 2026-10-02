import { useEffect, useState } from "react";
import { NavCtx, ICONS, Logo, type ViewName } from "./components/ui";
import { Runner } from "./components/Runner";
import { setSetting, streak, useAppState, xpToday } from "./lib/store";
import { firebaseConfigured, login } from "./lib/firebase";
import type { SessionSpec } from "./lib/types";
import { Home } from "./views/Home";
import { Cards } from "./views/Cards";
import { Verbs } from "./views/Verbs";
import { Games, Pairs, Rush } from "./views/Games";
import { Stories, StoryView } from "./views/Stories";
import { Sheets } from "./views/Sheets";
import { Settings, useSync } from "./views/Settings";
import { Progress } from "./views/Progress";

const TABS: [ViewName, string][] = [["hoy", "Hoy"], ["tarjetas", "Tarjetas"], ["verbos", "Verbos"], ["juegos", "Juegos"], ["historias", "Historias"], ["chuleta", "Chuleta"]];
const VIEW_KEY = "el-puente-view";
const initialView = (): ViewName => {
  const h = location.hash.slice(1);
  if (TABS.some(t => t[0] === h) || h === "ajustes" || h === "progreso") return h as ViewName;
  try { const v = localStorage.getItem(VIEW_KEY); if (v && TABS.some(t => t[0] === v)) return v as ViewName; } catch { /* ignore */ }
  return "hoy";
};

function LoginBanner() {
  const { user, authReady } = useSync();
  const [hide, setHide] = useState(() => { try { return localStorage.getItem("el-puente-nobanner") === "1"; } catch { return false; } });
  if (!firebaseConfigured || !authReady || user || hide) return null;
  return (
    <div className="banner">
      <span>Inicia sesión para guardar tu progreso en móvil y ordenador.</span>
      <span className="row">
        <button className="btn" onClick={() => login().catch(() => {})}>Entrar con Google</button>
        <button className="btn ghost" onClick={() => { setHide(true); try { localStorage.setItem("el-puente-nobanner", "1"); } catch { /* ignore */ } }}>Ahora no</button>
      </span>
    </div>
  );
}

export function App() {
  const st = useAppState();
  const [view, setView] = useState<ViewName>(initialView);
  const [session, setSession] = useState<SessionSpec | null>(null);
  const [sessionKey, setSessionKey] = useState(0);
  useEffect(() => { document.body.classList.toggle("tips-off", !st.settings.tips); }, [st.settings.tips]);
  const go = (v: ViewName) => { setSession(null); setView(v); window.scrollTo({ top: 0 }); try { if (TABS.some(t => t[0] === v)) localStorage.setItem(VIEW_KEY, v); } catch { /* ignore */ } };
  const start = (s: SessionSpec) => { setSession(s); setSessionKey(k => k + 1); window.scrollTo({ top: 0 }); };
  const exitSession = () => { const back = (session?.back as ViewName) || view; setSession(null); setView(back); };

  let body;
  if (session) body = <Runner key={sessionKey} spec={session} onExit={exitSession} onRestart={start} />;
  else if (view.startsWith("story:")) body = <StoryView id={view.slice(6)} />;
  else body = ({ hoy: <Home />, tarjetas: <Cards />, verbos: <Verbs />, juegos: <Games />, historias: <Stories />, chuleta: <Sheets />, ajustes: <Settings />, progreso: <Progress />, pairs: <Pairs />, rush: <Rush /> } as Record<string, JSX.Element>)[view] ?? <Home />;
  const activeTab = view.startsWith("story:") ? "historias" : view === "pairs" || view === "rush" ? "juegos" : view;

  return (
    <NavCtx.Provider value={{ go, start }}>
      <div className="wrap">
        <header className="top">
          <button className="logo" style={{ background: "none", border: 0, padding: 0 }} onClick={() => go("hoy")}><Logo /><span>El puente</span></button>
          <span className="spacer" />
          <span className="pill" title="Racha (dani zaredom)">Racha <b>{streak(st)}</b></span>
          <span className="pill" title="XP danas">XP <b>{xpToday(st)}</b></span>
          <button className="tips-toggle" aria-pressed={st.settings.tips} title="Pomoć na hrvatskom: uključi / isključi" onClick={() => setSetting("tips", !st.settings.tips)}>HR</button>
          <button className={"icon-btn"} aria-current={view === "progreso" ? "page" : undefined} aria-label="Progreso" title="Progreso" onClick={() => go("progreso")}>{ICONS.progreso}</button>
          <button id="gear" className="icon-btn" aria-current={view === "ajustes" ? "page" : undefined} aria-label="Ajustes" title="Ajustes" onClick={() => go("ajustes")}>{ICONS.ajustes}</button>
        </header>
        <nav className="tabs" aria-label="Secciones">
          {TABS.map(([k, t]) => <button key={k} aria-current={!session && activeTab === k ? "page" : undefined} onClick={() => go(k)}>{ICONS[k]}<span>{t}</span></button>)}
        </nav>
        <main id="main">
          {!session && view === "hoy" && <div style={{ marginTop: 8 }}><LoginBanner /></div>}
          {body}
        </main>
      </div>
    </NavCtx.Provider>
  );
}
