import { LEVELS, levelHasContent } from "../../lib/level";
import { setSetting, useSettings } from "../../lib/store";
import type { Level } from "../../lib/types";

/** multi-select of course levels; nothing selected = all ("Todos") */
export const LevelPicker = () => {
  const { levels } = useSettings();
  const toggle = (id: Level) => setSetting("levels", levels.includes(id) ? levels.filter(l => l !== id) : [...levels, id]);
  return (
    <div className="row" role="group" aria-label="Nivel">
      <button type="button" className="chip" aria-pressed={!levels.length} onClick={() => setSetting("levels", [])}>
        Todos
      </button>
      {LEVELS.map(l => (
        <button key={l.id} type="button" className="chip" aria-pressed={levels.includes(l.id)} disabled={!levelHasContent(l.id)} onClick={() => toggle(l.id)}>
          {l.name}
        </button>
      ))}
    </div>
  );
};
