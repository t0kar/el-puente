import { shuffle } from "../../lib/util";
import type { Story } from "../../lib/types";

// Story text format: gaps are {option|correct*|option::explanation}. Pure helpers, no React.
export type Part = string | { opts: string[]; correct: string; why: string };
export const parse = (text: string): Part[] => {
  const parts: Part[] = [];
  const re = /\{([^}]+)\}/g;
  let last = 0,
    m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    parts.push(text.slice(last, m.index));
    const [o, why] = m[1].split("::");
    const raw = o.split("|");
    parts.push({ opts: shuffle(raw.map(x => x.replace(/\*$/, ""))), correct: raw.find(x => x.endsWith("*"))!.slice(0, -1), why: why || "" });
    last = re.lastIndex;
  }
  parts.push(text.slice(last));
  return parts;
};
export const gapsOf = (s: Story) => (s.text.match(/\{/g) || []).length;

export type Piece =
  | { kind: "sp"; t: string; s: number; e: number }
  | { kind: "w"; t: string; s: number; e: number }
  | { kind: "gap"; p: Exclude<Part, string>; s: number; e: number; key: number };
export const layout = (parts: Part[]) => {
  const pieces: Piece[] = [];
  let pos = 0;
  parts.forEach((p, k) => {
    if (typeof p !== "string") {
      pieces.push({ kind: "gap", p, s: pos, e: pos + p.correct.length, key: k });
      pos += p.correct.length;
      return;
    }
    for (const t of p.split(/(\s+)/)) {
      if (!t) continue;
      if (/^\s+$/.test(t)) pieces.push({ kind: "sp", t, s: pos, e: pos + t.length });
      else pieces.push({ kind: "w", t, s: pos, e: pos + t.length });
      pos += t.length;
    }
  });
  return pieces;
};
