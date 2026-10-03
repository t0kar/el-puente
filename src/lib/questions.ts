import { cards, TOPIC_BY_K } from "./cards";
import { LAST_UPDATE, lastClassCards } from "./updates";
import { activeRules, activeStories, activeVerbs } from "./level";
import { getState } from "./store";
import { conj, imperative, verbGroup, PERSONS } from "./verbs";
import { num, timeES } from "./numbers";
import { dueCards, newCards, newLeft, hardCards, sGet, cardsFor } from "./srs";
import type { Card, FlipQ, MCQ, Question, Rule, SessionSpec, TilesQ, TypeQ, Verb } from "./types";
import { pick, shuffle } from "./util";

export const flipQ = (card: Card, cram = false): FlipQ => {
  const d = getState().settings.dir;
  const dir = d === "mix" ? (Math.random() < 0.5 ? "es" : "hr") : d;
  return { kind: "flip", card, dir, cram, tag: TOPIC_BY_K[card.T].t };
};
export const vocabMC = (card: Card, pool: Card[] = cards()): MCQ => {
  const others = shuffle(pool.filter(c => c.id !== card.id && c.hr !== card.hr)).slice(0, 3);
  const opts = shuffle([card, ...others]);
  return {
    kind: "mc",
    tag: "¿Qué significa?",
    prompt: card.es,
    speak: card.es,
    speakPrompt: card.es,
    options: opts.map(o => o.hr),
    correct: opts.indexOf(card),
    explain: card.es + " = " + card.hr,
  };
};
const verbQ = (v: Verb, mode?: "type" | "mc"): Question => {
  const sel = mode || getState().settings.verbMode;
  if (v._imp) {
    const who = pick(["tu", "usted"] as const);
    const r = imperative(v, who);
    const base = {
      tag: "Imperativo · " + (who === "tu" ? "tú" : "usted"),
      prompt: `${v.inf} → ¡(${who === "tu" ? "tú" : "usted"}) …!`,
      sub: v.hr,
      speak: r.form,
      explain: `<p class="formula">${r.formula}</p>`,
    };
    if (sel === "mc") {
      const o = shuffle([...new Set([r.form, imperative(v, who === "tu" ? "usted" : "tu").form, conj(v, 1).form, conj(v, 0).form])]);
      return { ...base, kind: "mc", options: o, correct: o.indexOf(r.form) };
    }
    return { ...base, kind: "type", answers: [r.form], strict: true };
  }
  const p = (Math.random() * 6) | 0;
  const c = conj(v, p);
  const g = verbGroup(v);
  const base = {
    tag: "Fórmula · " + ({ reg: "regular", irr: "irregular", refl: "reflexivo" } as Record<string, string>)[g] || g.replace("-", "→"),
    prompt: `${v.inf} → ${PERSONS[p]}`,
    sub: v.hr,
    speak: c.form,
    explain: `<p class="formula">${c.formula}</p>`,
    grid: { verb: v, person: p },
  };
  if (sel === "mc") {
    const forms = new Set([0, 1, 2, 3, 4, 5].map(q => conj(v, q).form));
    if (v.type && c.inBoot) forms.add(c.naive);
    forms.delete(c.form);
    const o = shuffle([c.form, ...shuffle([...forms]).slice(0, 3)]);
    return { ...base, kind: "mc", options: o, correct: o.indexOf(c.form) };
  }
  return { ...base, kind: "type", answers: [c.form], strict: true };
};
const ruleQ = (r: Rule): MCQ => ({
  kind: "mc",
  tag: "Regla rápida",
  prompt: r[0],
  speak: r[0].replace("___", r[1][r[2]]),
  options: r[1].slice(),
  correct: r[2],
  explain: r[3],
  shuffle: true,
});

const numberQ = (kind?: "tiles" | "listen" | "calc"): Question => {
  kind = kind || pick(["tiles", "listen", "calc", "tiles"] as const);
  if (kind === "tiles") {
    const n = pick([
      pick([16, 17, 18, 19, 22, 23, 26, 27, 28]),
      30 + ((Math.random() * 70) | 0),
      100 + ((Math.random() * 900) | 0),
      1000 + ((Math.random() * 9000) | 0),
    ]);
    const words = num(n).split(" ");
    const dis = shuffle(
      [
        "y",
        "cien",
        "ciento",
        "quinientos",
        "cincuenta",
        "quince",
        "setecientos",
        "sesenta",
        "setenta",
        "doce",
        "dos",
        "doscientos",
        "mil",
        "veinte",
        "treinta",
        "nueve",
        "noventa",
        "seis",
        "dieciséis",
      ].filter(w => !words.includes(w)),
    ).slice(0, 4);
    const q: TilesQ = {
      kind: "tiles",
      tag: "Números · construye",
      prompt: String(n),
      target: words,
      pool: shuffle([...words, ...dis]),
      speak: num(n),
      explain: words.includes("y") ? "«y» samo između desetica i jedinica." : "",
    };
    return q;
  }
  if (kind === "listen") {
    const n = pick([(Math.random() * 30) | 0, 30 + ((Math.random() * 70) | 0), 100 + ((Math.random() * 900) | 0)]);
    const q: TypeQ = {
      kind: "type",
      tag: "Números · escucha",
      prompt: "Escucha y escribe el número",
      sub: "Pritisni zvučnik. Upiši znamenkama.",
      listen: num(n),
      speak: num(n),
      answers: [String(n)],
      explain: n + " = " + num(n),
      numeric: true,
    };
    return q;
  }
  const ops: [string, (a: number, b: number) => number, string][] = [
    ["más", (a, b) => a + b, "+"],
    ["menos", (a, b) => a - b, "−"],
    ["por", (a, b) => a * b, "×"],
  ];
  const [w, f, sym] = pick(ops);
  let a = 2 + ((Math.random() * 18) | 0),
    b = 2 + ((Math.random() * 9) | 0);
  if (w === "menos" && b > a) [a, b] = [b, a];
  if (w === "por") a = 2 + ((Math.random() * 9) | 0);
  const r = f(a, b);
  const cand = new Set([r]);
  while (cand.size < 4) {
    const d = r + pick([-10, -2, -1, 1, 2, 10, 3]);
    if (d >= 0 && d < 100) cand.add(d);
  }
  const o = shuffle([...cand]);
  const text = `¿Cuánto es ${num(a)} ${w} ${num(b)}?`;
  return {
    kind: "mc",
    tag: "Números · cálculo",
    prompt: text,
    speak: text,
    speakPrompt: text,
    options: o.map(num),
    correct: o.indexOf(r),
    explain: `${a} ${sym} ${b} = ${r} → ${num(r)}`,
  };
};
const timeQ = (): MCQ => {
  const hh = (Math.random() * 24) | 0,
    m = ((Math.random() * 12) | 0) * 5;
  const digital = Math.random() < 0.4;
  const right = timeES(hh, m, digital);
  const alts = new Set([right]);
  for (const [a, b] of shuffle([
    [hh, (m + 5) % 60],
    [(hh + 1) % 24, m],
    [(hh + 23) % 24, m],
    [hh, (60 - m) % 60],
    [hh, (m + 30) % 60],
    [(hh + 12) % 24, m],
  ])) {
    if (alts.size >= 4) break;
    alts.add(timeES(a, b, digital));
  }
  const o = shuffle([...alts]);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    kind: "mc",
    tag: "¿Qué hora es?",
    prompt: digital ? `${pad(hh)}:${pad(m)}` : "",
    clock: digital ? undefined : { h: hh, m },
    speak: right,
    options: o,
    correct: o.indexOf(right),
    explain: (m > 30 ? `Više od 30 min → idući sat + menos ${60 - m}. ` : "") + right,
  };
};

// ---- dictation: hear a sentence, type it ----
const sentencePool = (): string[] => {
  const fromCards = cards()
    .filter(c => c.es.split(" ").length >= 3 && !c.es.includes("...") && !/[=≠/]/.test(c.es))
    .map(c => c.es.replace(/\s*\([^)]*\)/g, ""));
  const fromRules = activeRules()
    .map(r => r[0].replace("___", r[1][r[2]]))
    .filter(s => !s.includes("(") && !s.includes("—"));
  const fromStories = activeStories().flatMap(s =>
    s.text
      .replace(/\{([^}]+)\}/g, (_, g: string) =>
        g
          .split("::")[0]
          .split("|")
          .find(o => o.endsWith("*"))!
          .slice(0, -1),
      )
      .split(/(?<=[.!?])\s+/)
      .filter(x => {
        const n = x.split(" ").length;
        return n >= 4 && n <= 10 && !x.includes("—") && !x.includes("«");
      }),
  );
  return [...new Set([...fromCards, ...fromRules, ...fromStories])];
};
const dictationQ = (): TypeQ => {
  const s = pick(sentencePool());
  return {
    kind: "type",
    tag: "Dictado",
    prompt: "Escucha y escribe la frase",
    sub: "Možeš preslušati koliko puta želiš. Interpunkcija se ne broji.",
    listen: s,
    speak: s,
    answers: [s],
    dict: true,
    explain: s,
  };
};

// ---- sessions ----
const srsQueue = (topics: string[] | null, maxDue = 25, maxNew?: number) => {
  const due = dueCards(topics).slice(0, maxDue);
  const nw = newCards(topics).slice(0, maxNew ?? newLeft());
  return [...shuffle(due), ...nw].map(c => flipQ(c));
};
const interleave = (main: Question[], others: Question[]) => {
  const o = shuffle(others),
    out: Question[] = [];
  main.forEach((q, i) => {
    out.push(q);
    if (i % 3 === 2 && o.length) out.push(o.shift()!);
  });
  return [...out, ...o];
};
export const dailySession = (): SessionSpec => {
  let qs = srsQueue(null, 14, Math.min(newLeft(), 6));
  if (!qs.length)
    qs = shuffle(cards())
      .slice(0, 8)
      .map(c => flipQ(c, true));
  const others = [
    ...shuffle(activeVerbs())
      .slice(0, 4)
      .map(v => verbQ(v)),
    ...shuffle(activeRules()).slice(0, 3).map(ruleQ),
    numberQ(),
    timeQ(),
    dictationQ(),
  ];
  return { title: "Repaso del día", questions: interleave(qs, others), again: dailySession, back: "hoy" };
};
/** ~5 minutes before the next class: newest material + weakest cards + a little grammar */
export const beforeClassSession = (): SessionSpec => {
  const last = lastClassCards();
  const lastIds = new Set(last.map(c => c.id));
  const hard = hardCards()
    .filter(c => !lastIds.has(c.id))
    .slice(0, last.length ? 5 : 10);
  const qs = [...shuffle(last).slice(0, 10), ...hard].map(c => flipQ(c, !!sGet(c.id)));
  if (qs.length < 6)
    qs.push(
      ...shuffle(cardsFor(null).filter(c => sGet(c.id)))
        .slice(0, 8 - qs.length)
        .map(c => flipQ(c, true)),
    );
  if (qs.length < 6)
    qs.push(
      ...shuffle(cards())
        .slice(0, 6)
        .map(c => flipQ(c, true)),
    );
  const u = LAST_UPDATE?.id;
  const vs = activeVerbs(),
    rs = activeRules();
  const verbs = (u ? vs.filter(v => v.u === u) : [])
    .concat(shuffle(vs))
    .slice(0, 3)
    .map(v => verbQ(v, "mc"));
  const rules = (u ? rs.filter(r => r[4] === u) : []).concat(shuffle(rs)).slice(0, 3).map(ruleQ);
  return { title: "Antes de clase", questions: interleave(qs, [...verbs, ...rules]), again: beforeClassSession, back: "hoy" };
};
export const cardsSession = (topics: string[] | null, title = "Tarjetas", back = "tarjetas"): SessionSpec => {
  let qs: Question[] = srsQueue(topics, 30, topics ? 15 : undefined);
  if (!qs.length)
    qs = shuffle(cardsFor(topics))
      .slice(0, 12)
      .map(c => flipQ(c, true));
  return { title, questions: qs, again: () => cardsSession(topics, title, back), back };
};
export const verbSession = (pool: Verb[], mode?: "type" | "mc", title = "Fórmulas de verbos", back = "verbos"): SessionSpec => {
  return { title, questions: Array.from({ length: 12 }, () => verbQ(pick(pool), mode)), again: () => verbSession(pool, mode, title, back), back };
};
export const gameSessions = {
  numbers: (): SessionSpec => ({ title: "Números", questions: Array.from({ length: 10 }, () => numberQ()), again: gameSessions.numbers, back: "juegos" }),
  clock: (): SessionSpec => ({ title: "La hora", questions: Array.from({ length: 10 }, timeQ), again: gameSessions.clock, back: "juegos" }),
  rules: (): SessionSpec => ({ title: "Reglas rápidas", questions: shuffle(activeRules()).slice(0, 12).map(ruleQ), again: gameSessions.rules, back: "juegos" }),
  verbs: (): SessionSpec => ({
    title: "Fórmula exprés",
    questions: Array.from({ length: 10 }, () => verbQ(pick(activeVerbs()), "mc")),
    again: gameSessions.verbs,
    back: "juegos",
  }),
  dictation: (): SessionSpec => ({ title: "Dictado", questions: Array.from({ length: 8 }, dictationQ), again: gameSessions.dictation, back: "juegos" }),
};
