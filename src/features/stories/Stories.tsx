import { activeStories } from "../../lib/level";
import { useAppState } from "../../lib/store";
import { Hint } from "../../components/Hint";
import { useNav } from "../../app/navigation";
import { gapsOf } from "./storyText";

export const Stories = () => {
  const st = useAppState();
  const { go } = useNav();
  return (
    <section className="view">
      <h1>
        <span className="mark yellow">Historias de Paco</span>
      </h1>
      <p>
        Paco es un pulpo cocinero de Zaragoza. Tiene ocho brazos y muchos problemas. <Hint>Popuni praznine. Svaka priča ponavlja jednu gramatičku temu.</Hint>
      </p>
      <div className="stack">
        {activeStories().map(s => {
          const sc = st.stories[s.id];
          return (
            <button key={s.id} className="game" onClick={() => go(`story:${s.id}`)}>
              <span className="gi yellow">{sc != null ? `${sc}/${gapsOf(s)}` : gapsOf(s)}</span>
              <span>
                <h3>{s.t}</h3>
                <span className="hr">
                  {s.g}
                  {sc != null ? " · hecho" : ""}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
