import { useState, type ReactNode } from "react";
import { Ic } from "./icons";

/** Croatian help text: shown inline, or (setting "Al tocar" → body.tips-off) behind a small translate icon */
export const Hint = ({ children, html, block }: { children?: ReactNode; html?: string; block?: boolean }) => {
  const [open, setOpen] = useState(false);
  const Tag = block ? "div" : "span";
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(o => !o);
  };
  return (
    <Tag className={"hrtip" + (block ? " block" : "") + (open ? " open" : "")}>
      <button
        type="button"
        className="hrbtn"
        aria-expanded={open}
        aria-label={open ? "Ocultar croata" : "Ver en croata"}
        title="Ver en croata"
        onClick={toggle}
      >
        <Ic.translate />
      </button>
      {/* tapping the opened text closes it again; the button above is the keyboard path */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span className="hrtxt" lang="hr" onClick={open ? toggle : undefined} {...(html ? { dangerouslySetInnerHTML: { __html: html } } : { children })} />
    </Tag>
  );
};
