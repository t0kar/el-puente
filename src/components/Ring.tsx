/** daily XP goal ring */
export const Ring = ({ value, goal }: { value: number; goal: number }) => {
  const C = 2 * Math.PI * 40,
    pct = Math.min(1, value / goal);
  return (
    <svg className="ring" viewBox="0 0 100 100" role="img" aria-label={`Objetivo diario ${value} de ${goal} XP`}>
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--paper-2)" strokeWidth="10" />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={pct >= 1 ? "var(--ok)" : "var(--brand)"}
        opacity={pct ? 1 : 0}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${C * pct} ${C}`}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="52" textAnchor="middle">
        {value}
      </text>
      <text className="lbl" x="50" y="68" textAnchor="middle">
        de {goal} XP
      </text>
    </svg>
  );
};
