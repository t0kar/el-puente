import { useEffect, useRef } from "react";
import { activeSheets } from "../lib/level";
import { useSettings } from "../lib/store";
import { speak } from "../lib/speech";
import { Hint } from "../components/ui";

export function Sheets() {
  const ref = useRef<HTMLElement>(null);
  const { levels } = useSettings();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.querySelectorAll<HTMLElement>(".sheet i").forEach(i => { i.style.cursor = "pointer"; i.tabIndex = 0; i.onclick = () => speak(i.textContent || ""); i.onkeydown = e => { if (e.key === "Enter") speak(i.textContent || ""); }; });
  }, [levels]);
  return (
    <section className="view" ref={ref}>
      <h1><span className="mark yellow">Chuleta</span></h1>
      <p>La gramática como fórmulas. <Hint>Klik na primjer u kurzivu = izgovor.</Hint></p>
      {activeSheets().map(s => (
        <div key={s.t} className="card sheet">
          <h3><span className={"mark " + s.mark}>{s.t}</span></h3>
          <div className="stack" dangerouslySetInnerHTML={{ __html: s.html }} />
        </div>
      ))}
    </section>
  );
}
