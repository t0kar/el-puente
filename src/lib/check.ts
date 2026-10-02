export const stripAcc = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
const baseNorm = (s: string) => s.toLowerCase().replace(/\([^)]*\)/g, " ").replace(/[¿?¡!.,;:«»"…—–-]/g, " ").replace(/\s+/g, " ").trim();
const ART = /^(el|la|los|las|un|una|unos|unas) /;
function variants(ans: string[]) {
  const out = new Set<string>();
  for (const a of ans) {
    out.add(baseNorm(a));
    for (const p of a.split(/ = | \/ | ≠ |, /)) { const n = baseNorm(p); if (n) out.add(n); }
  }
  return [...out].filter(Boolean);
}
function lev(a: string, b: string) {
  const m = a.length, n = b.length; if (Math.abs(m - n) > 2) return 9;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) { const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
export type CheckRes = "ok" | "accent" | "article" | "typo" | "bad";
export function checkAnswer(input: string, answers: string[], maxTypos = 1): CheckRes {
  const inp = baseNorm(input); if (!inp) return "bad";
  const vs = variants(answers);
  if (vs.includes(inp)) return "ok";
  if (vs.some(v => stripAcc(v) === stripAcc(inp))) return "accent";
  if (vs.some(v => { const va = v.replace(ART, ""), ia = inp.replace(ART, ""); return va === ia || stripAcc(va) === stripAcc(ia); })) return "article";
  if (maxTypos > 0 && vs.some(v => v.length > 4 && lev(stripAcc(v), stripAcc(inp)) <= Math.max(maxTypos, Math.floor(v.length / 12)))) return "typo";
  return "bad";
}
/** word-by-word diff for dictation feedback */
export function wordDiff(input: string, target: string) {
  const t = baseNorm(target).split(" "), i = baseNorm(input).split(" ");
  return t.map((w, k) => ({ w, ok: !!i[k] && stripAcc(i[k]) === stripAcc(w) }));
}
