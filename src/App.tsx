import { useEffect, type ReactElement } from "react";
import { AppHeader } from "./app/AppHeader";
import { NavCtx, type ViewName } from "./app/navigation";
import { TabBar } from "./app/TabBar";
import { useHeaderScroll } from "./app/useHeaderScroll";
import { useRoute } from "./app/useRoute";
import { useTheme } from "./app/useTheme";
import { Cards } from "./features/cards/Cards";
import { Games } from "./features/games/Games";
import { Pairs } from "./features/games/Pairs";
import { Rush } from "./features/games/Rush";
import { Home } from "./features/home/Home";
import { Runner } from "./features/practice/Runner";
import { Progress } from "./features/progress/Progress";
import { Settings } from "./features/settings/Settings";
import { Sheets } from "./features/sheets/Sheets";
import { Stories } from "./features/stories/Stories";
import { StoryView } from "./features/stories/StoryView";
import { Verbs } from "./features/verbs/Verbs";
import { useSettings } from "./lib/store";
import { initSeenUpdates } from "./lib/updates";

/** screen for each view; `story:<id>` is handled separately */
const SCREENS: Record<string, () => ReactElement> = {
  hoy: () => <Home />,
  tarjetas: () => <Cards />,
  verbos: () => <Verbs />,
  juegos: () => <Games />,
  historias: () => <Stories />,
  chuleta: () => <Sheets />,
  ajustes: () => <Settings />,
  progreso: () => <Progress />,
  pairs: () => <Pairs />,
  rush: () => <Rush />,
};
const screenFor = (view: ViewName) => (view.startsWith("story:") ? <StoryView id={view.slice(6)} /> : (SCREENS[view] ?? SCREENS.hoy)());

export const App = () => {
  const settings = useSettings();
  const { view, session, sessionKey, go, start, exitSession } = useRoute();
  useTheme(settings.theme);
  useHeaderScroll();
  useEffect(initSeenUpdates, []);
  useEffect(() => {
    document.body.classList.toggle("tips-off", !settings.tips);
  }, [settings.tips]);
  useEffect(() => {
    document.body.classList.toggle("in-session", !!session);
  }, [session]);

  return (
    <NavCtx.Provider value={{ go, start }}>
      <div className="wrap">
        <AppHeader view={view} />
        <TabBar view={view} inSession={!!session} />
        <main id="main">{session ? <Runner key={sessionKey} spec={session} onExit={exitSession} onRestart={start} /> : screenFor(view)}</main>
      </div>
    </NavCtx.Provider>
  );
};
