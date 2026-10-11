import type { LevelId } from "../content/levels";

export type Mark = "green" | "yellow" | "pink" | "blue";
/** course level id from content/levels.ts; set automatically from the content folder */
export type Level = LevelId;
/** one class's worth of new material (content/updates.json); id is the class date YYYY-MM-DD */
export interface Update {
  id: string;
  note: string;
}

/** CEFR level of an item that is harder than its course level (discussed in class; can be hidden in Ajustes) */
export type Cefr = "A2" | "B1" | "B2";

export interface Topic {
  k: string;
  t: string;
  hr: string;
  mark: Mark;
  v: string;
  lvl?: Level;
}
export interface Card {
  id: string;
  T: string;
  es: string;
  hr: string;
  u: string;
  x?: Cefr;
  /** example sentence: [español, hrvatski] */
  ex?: [string, string];
}

export type StemType = "o-ue" | "e-ie" | "e-i" | "u-ue";
export interface Verb {
  inf: string;
  hr: string;
  type?: StemType;
  refl?: boolean;
  irr?: string[];
  note?: string;
  u?: string;
  x?: Cefr;
  lvl?: Level;
  _imp?: boolean;
}

/** quick rule: sentence with ___, options, index of the correct option, Croatian explanation */
export interface Rule {
  q: string;
  o: string[];
  a: number;
  hr: string;
  u?: string;
  x?: Cefr;
  lvl?: Level;
}

export interface Story {
  id: string;
  g: string;
  t: string;
  hr: string;
  text: string;
  u?: string;
  lvl?: Level;
}
export interface Sheet {
  t: string;
  mark: Mark;
  html: string;
  u?: string;
  lvl?: Level;
  widget?: "boot";
}

export interface CardState {
  i: number;
  e: number;
  r: number;
  l: number;
  d: number;
  t: number;
}

export interface Settings {
  dir: "es" | "hr" | "mix";
  type: boolean;
  newPerDay: number;
  slow: boolean;
  verbMode: "type" | "mc";
  goal: number;
  tips: boolean;
  voice: string;
  theme: "auto" | "light" | "dark";
  autoplay: boolean;
  /** selected course levels; empty = all */
  levels: Level[];
  /** push when new class material is published */
  notifyContent: boolean;
  /** daily push reminder; time is local "HH:MM" */
  remind: { on: boolean; time: string };
  /** include items above the course level (marked A2/B1…) */
  advanced: boolean;
}

/** a word the user added; `del` is a tombstone so deletions survive sync */
export interface CustomWord {
  es: string;
  hr: string;
  t: number;
  del?: boolean;
}

export interface AppState {
  cards: Record<string, CardState>;
  days: Record<string, number>;
  best: Record<string, number>;
  stories: Record<string, number>;
  custom: Record<string, CustomWord>;
  /** newest update id the user has seen ("Novedades" badge) */
  seenUpdate: string;
  newDay: { d: string; n: number };
  settings: Settings;
  /** when each setting was last changed by the user (per-key sync, see mergeStates) */
  settingsAt: Partial<Record<keyof Settings, number>>;
  updatedAt: number;
  resetAt: number;
}

interface QBase {
  tag: string;
  explain?: string;
  speak?: string;
  grid?: { verb: Verb; person: number };
  _retry?: boolean;
  _counted?: boolean;
  /** stable id ("card:…", "rule:…", "verb:…") for "next time" and error reports */
  key?: string;
  /** level pill: course level ("A1.1") or the CEFR of a harder item */
  lvl?: string;
  hard?: boolean;
}
export interface FlipQ extends QBase {
  kind: "flip";
  card: Card;
  dir: "es" | "hr";
  cram?: boolean;
}
export interface MCQ extends QBase {
  kind: "mc";
  prompt: string;
  clock?: { h: number; m: number };
  options: string[];
  correct: number;
  shuffle?: boolean;
  speakPrompt?: string;
  sub?: string;
}
export interface TypeQ extends QBase {
  kind: "type";
  prompt: string;
  sub?: string;
  answers: string[];
  strict?: boolean;
  numeric?: boolean;
  listen?: string;
  dict?: boolean;
}
export interface TilesQ extends QBase {
  kind: "tiles";
  prompt: string;
  target: string[];
  pool: string[];
}
export type Question = FlipQ | MCQ | TypeQ | TilesQ;

export interface SessionSpec {
  title: string;
  questions: Question[];
  again?: () => SessionSpec;
  back?: string;
}
