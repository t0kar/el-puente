import { IconFlame, Logo, VIEW_ICONS } from "../components/icons";
import { streak, useAppState, xpToday } from "../lib/store";
import { useNav, type ViewName } from "./navigation";

/** sticky top bar: logo (→ Hoy), streak · XP today, Progreso, Ajustes */
export const AppHeader = ({ view }: { view: ViewName }) => {
  const st = useAppState();
  const { go } = useNav();
  const days = streak(st),
    xp = xpToday(st);
  return (
    <header className="top">
      <button className="logo" aria-label="Cruza el Puente · inicio" onClick={() => go("hoy")}>
        <Logo />
        <span className="wordmark">
          Cruza <span className="brand">el Puente</span>
        </span>
      </button>
      <span className="spacer" />
      <span className="pill daypill" title={`Racha: ${days} días · XP hoy: ${xp}`} aria-label={`Racha ${days} días, ${xp} XP hoy`}>
        <span className="flame" data-on={xp > 0 || undefined}>
          <IconFlame />
        </span>
        <b>{days}</b>
        <span className="sep" aria-hidden="true" />
        <span className="xp">
          <b>{xp}</b> XP
        </span>
      </span>
      <button
        className="icon-btn"
        aria-current={view === "progreso" ? "page" : undefined}
        aria-label="Progreso"
        title="Progreso"
        onClick={() => go("progreso")}
      >
        {VIEW_ICONS.progreso}
      </button>
      <button className="icon-btn" aria-current={view === "ajustes" ? "page" : undefined} aria-label="Ajustes" title="Ajustes" onClick={() => go("ajustes")}>
        {VIEW_ICONS.ajustes}
      </button>
    </header>
  );
};
