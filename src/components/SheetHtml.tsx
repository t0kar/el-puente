import { useEffect, useRef } from "react";
import { speak } from "../lib/speech";

/** grammar HTML from content/<level>/sheets.ts; every <i> example is a button that speaks itself */
export const SheetHtml = ({ html }: { html: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll("i").forEach(i => {
      i.tabIndex = 0;
      i.setAttribute("role", "button");
      i.title = "Escuchar";
    });
  }, [html]);
  const say = (el: EventTarget) => {
    const i = (el as HTMLElement).closest?.("i");
    if (!i || !ref.current?.contains(i)) return;
    speak(i.textContent || "");
    i.classList.remove("said");
    void i.offsetWidth;
    i.classList.add("said");
  };
  return (
    // event delegation: the <i> examples inside get role=button + tabIndex in the effect above
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={ref}
      className="stack sheet-body"
      onClick={e => say(e.target)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          say(e.target);
        }
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
