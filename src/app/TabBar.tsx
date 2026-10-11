import { VIEW_ICONS } from "../components/icons";
import { useAppState } from "../lib/store";
import { unseenUpdates } from "../lib/updates";
import { TABS, tabOf, useNav, type ViewName } from "./navigation";

/** main sections: bottom bar on phones, sticky bar under the header on desktop */
export const TabBar = ({ view, inSession }: { view: ViewName; inSession: boolean }) => {
  const { go } = useNav();
  const st = useAppState();
  const active = tabOf(view);
  const news = unseenUpdates(st).length > 0;
  return (
    <nav className="tabs" aria-label="Secciones">
      {TABS.map(([k, t]) => (
        <button key={k} aria-current={!inSession && active === k ? "page" : undefined} onClick={() => go(k)}>
          <span className="tab-ico">
            {VIEW_ICONS[k]}
            {k === "hoy" && news && <span className="dot-new" aria-label="Novedades" />}
          </span>
          <span>{t}</span>
        </button>
      ))}
    </nav>
  );
};
