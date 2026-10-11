/** small level label: the course level ("A1.1") or, for items harder than the course, their CEFR ("B1") */
export const LevelPill = ({ lvl, hard }: { lvl?: string; hard?: boolean }) =>
  lvl ? (
    <span className={"pill lvl" + (hard ? " up" : "")} title={hard ? "Más difícil que el curso (extra)" : "Nivel del curso"}>
      {lvl}
    </span>
  ) : null;
