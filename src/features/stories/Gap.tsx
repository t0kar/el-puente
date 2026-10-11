import { useState } from "react";
import { Hint } from "../../components/Hint";
import type { Part } from "./storyText";

/** one gap in a story: pick options until the correct one */
export const Gap = ({ p, onSolve, cls }: { p: Exclude<Part, string>; onSolve: (first: boolean) => void; cls?: string }) => {
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  return (
    <>
      <span className={"gap" + (solved ? " solved" : "") + (cls ? " " + cls : "")}>
        {p.opts.map(o => (
          <button
            key={o}
            className={solved && o === p.correct ? "ok" : wrong.includes(o) ? "bad" : ""}
            disabled={wrong.includes(o)}
            onClick={() => {
              if (solved) return;
              if (o === p.correct) {
                setSolved(true);
                onSolve(wrong.length === 0);
              } else setWrong(w => [...w, o]);
            }}
          >
            {o}
          </button>
        ))}
      </span>
      {solved && p.why && (
        <span className="gnote">
          ✓ <Hint>{p.why}</Hint>
        </span>
      )}
    </>
  );
};

/** story parts with their [start, end) range in the spoken text; text parts split into words */
