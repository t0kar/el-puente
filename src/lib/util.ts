export const DAY = 86400000;
export function shuffle<T>(a: readonly T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
export const pick = <T,>(a: readonly T[]): T => a[(Math.random() * a.length) | 0];
export const todayKey = (t = Date.now()) => {
  const d = new Date(t);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
};
export const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
