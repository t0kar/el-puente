import { DAY, todayKey } from "../../lib/util";

/** bar chart of XP over the last 14 days */
export const XPChart = ({ days, goal }: { days: Record<string, number>; goal: number }) => {
  const N = 14,
    W = 340,
    H = 140,
    pad = { l: 26, r: 6, t: 10, b: 22 };
  const data = Array.from({ length: N }, (_, i) => {
    const t = Date.now() - (N - 1 - i) * DAY;
    return { k: todayKey(t), d: new Date(t), v: days[todayKey(t)] || 0 };
  });
  const max = Math.max(goal, ...data.map(d => d.v)) * 1.1;
  const bw = (W - pad.l - pad.r) / N;
  const y = (v: number) => pad.t + (H - pad.t - pad.b) * (1 - v / max);
  const ticks = [0, Math.round(goal / 2), goal];
  const DOW = ["D", "L", "M", "X", "J", "V", "S"];
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="XP de los últimos 14 días">
      {ticks.map(t => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--line)" strokeDasharray={t === goal ? "4 3" : undefined} />
          <text x={pad.l - 4} y={y(t) + 3} textAnchor="end">
            {t}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = pad.l + i * bw + bw * 0.15,
          w = bw * 0.7,
          top = y(d.v);
        return (
          <g key={d.k}>
            <rect x={x} y={top} width={w} height={Math.max(0, H - pad.b - top)} rx="3" fill={d.v >= goal ? "var(--ok)" : "var(--ink)"} opacity={d.v ? 1 : 0.15}>
              <title>
                {d.k}: {d.v} XP
              </title>
            </rect>
            <text x={x + w / 2} y={H - 8} textAnchor="middle" style={i === N - 1 ? { fill: "var(--ink)", fontWeight: 700 } : undefined}>
              {DOW[d.d.getDay()]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
