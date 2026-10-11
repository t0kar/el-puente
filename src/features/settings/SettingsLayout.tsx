import { useId, type ReactNode } from "react";
import type { Mark } from "../../lib/types";

/** one setting: title + Croatian explanation on the left, control on the right (stacks on phones) */
export const Row = ({ title, children, control }: { title: string; children: ReactNode; control: ReactNode }) => (
  <div className="setrow">
    <div className="settext">
      <b>{title}</b>
      <p className="hint" lang="hr">
        {children}
      </p>
    </div>
    {control}
  </div>
);

/** a card of related settings with a highlighted heading */
export const Group = ({ title, mark, children }: { title: string; mark: Mark; children: ReactNode }) => {
  const id = useId();
  return (
    <section className="card stack" aria-labelledby={id}>
      <h2 id={id}>
        <span className={"mark " + mark}>{title}</span>
      </h2>
      {children}
    </section>
  );
};
