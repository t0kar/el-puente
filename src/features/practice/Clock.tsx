/** analog clock face for "¿Qué hora es?" */
export const Clock = ({ h, m }: { h: number; m: number }) => {
  const ha = ((h % 12) + m / 60) * 30,
    ma = m * 6;
  return (
    <svg className="clock" viewBox="0 0 100 100" role="img" aria-label="Reloj">
      <circle cx="50" cy="50" r="47" fill="var(--card)" stroke="var(--ink)" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={50 + 40 * Math.sin(a)}
            y1={50 - 40 * Math.cos(a)}
            x2={50 + 44 * Math.sin(a)}
            y2={50 - 44 * Math.cos(a)}
            stroke="var(--ink-soft)"
            strokeWidth={i % 3 ? 1.2 : 2.5}
          />
        );
      })}
      <line x1="50" y1="50" x2="50" y2="25" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" transform={`rotate(${ha} 50 50)`} />
      <line x1="50" y1="50" x2="50" y2="13" stroke="var(--bad)" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${ma} 50 50)`} />
      <circle cx="50" cy="50" r="3.5" fill="var(--ink)" />
    </svg>
  );
};
