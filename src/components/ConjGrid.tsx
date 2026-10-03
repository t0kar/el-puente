import { speak } from "../lib/speech";
import { conj, PERSONS, PERSONS_SHORT } from "../lib/verbs";
import type { Verb } from "../lib/types";

/** the six present-tense forms of a verb; tap a form to hear it */
export const ConjGrid = ({ verb, highlight = -1 }: { verb: Verb; highlight?: number }) => {
  return (
    <div className="conj-grid">
      {[0, 3, 1, 4, 2, 5].map(p => {
        const c = conj(verb, p);
        return (
          <button type="button" key={p} className={(c.changed ? "chg " : "") + (p === highlight ? "me" : "")} title={PERSONS[p]} onClick={() => speak(c.form)}>
            <small className="hr">{PERSONS_SHORT[p]} </small>
            {c.form}
          </button>
        );
      })}
    </div>
  );
};
