import { activeSheets } from "../../lib/level";
import { useSettings } from "../../lib/store";
import { Hint } from "../../components/Hint";
import { SheetHtml } from "../../components/SheetHtml";
import { Boot } from "../../components/Boot";

export const Sheets = () => {
  useSettings(); // re-render when the level changes
  return (
    <section className="view">
      <h1>
        <span className="mark yellow">Chuleta</span>
      </h1>
      <p>
        La gramática como fórmulas. <Hint>Dodirni podcrtani primjer i čut ćeš izgovor.</Hint>
      </p>
      {activeSheets().map(s => (
        <div key={s.t} className="card sheet">
          <h3>
            <span className={"mark " + s.mark}>{s.t}</span>
          </h3>
          <SheetHtml html={s.html} />
          {s.widget === "boot" && <Boot />}
        </div>
      ))}
    </section>
  );
};
