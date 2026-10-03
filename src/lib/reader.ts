// Sentence splitting for the read-along player (hooks/useReader.ts). Pure, no browser APIs.

export interface Sentence {
  start: number;
  end: number;
  text: string;
}

/** sentence ranges in `text`: break after . ! ? … (plus closing quotes) and before a « — » dialogue turn */
export const splitSentences = (text: string): Sentence[] => {
  const raw: Sentence[] = [];
  let s = 0;
  const push = (e: number) => {
    let a = s,
      b = e;
    while (a < b && /\s/.test(text[a])) a++;
    while (b > a && /\s/.test(text[b - 1])) b--;
    if (b > a) raw.push({ start: a, end: b, text: text.slice(a, b) });
    s = e;
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (/[.!?…]/.test(c)) {
      let j = i + 1;
      while (j < text.length && /[.!?…»"”)]/.test(text[j])) j++;
      if (j >= text.length || /\s/.test(text[j])) {
        push(j);
        i = j - 1;
      }
    } else if (c === "—" && i > 0 && /\s/.test(text[i - 1]) && text.slice(s, i).trim()) push(i);
  }
  push(text.length);
  // a lone dash or a 1–2 letter fragment joins the next sentence
  const out: Sentence[] = [];
  for (let i = 0; i < raw.length; i++) {
    const r = raw[i];
    if (r.text.replace(/[\s—.!?…»«"]/g, "").length < 3 && i + 1 < raw.length) {
      raw[i + 1] = { start: r.start, end: raw[i + 1].end, text: text.slice(r.start, raw[i + 1].end) };
      continue;
    }
    out.push(r);
  }
  return out;
};
