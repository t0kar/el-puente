export type Mark = "green" | "yellow" | "pink" | "blue";

export interface Topic { k: string; t: string; hr: string; mark: Mark; v: string }
export interface Card { id: string; T: string; es: string; hr: string; u: string }

export type StemType = "o-ue" | "e-ie" | "e-i" | "u-ue";
export interface Verb { inf: string; hr: string; type?: StemType; refl?: boolean; irr?: string[]; note?: string; u?: string; _imp?: boolean }

/** [sentence with ___, options, correct index, explanation (hr), tag or update id] */
export type Rule = [string, string[], number, string, (number | string)?];

export interface Story { id: string; g: string; t: string; hr: string; text: string; u?: string }
export interface Sheet { t: string; mark: Mark; html: string; u?: string }

export interface CardState { i: number; e: number; r: number; l: number; d: number; t: number }

export interface Settings {
  dir: "es" | "hr" | "mix";
  type: boolean;
  newPerDay: number;
  slow: boolean;
  verbMode: "type" | "mc";
  goal: number;
  tips: boolean;
  voice: string;
}

export interface AppState {
  cards: Record<string, CardState>;
  days: Record<string, number>;
  best: Record<string, number>;
  stories: Record<string, number>;
  newDay: { d: string; n: number };
  settings: Settings;
  updatedAt: number;
  resetAt: number;
}

interface QBase { tag: string; explain?: string; speak?: string; grid?: { verb: Verb; person: number }; _retry?: boolean; _counted?: boolean; key?: string }
export interface FlipQ extends QBase { kind: "flip"; card: Card; dir: "es" | "hr"; cram?: boolean }
export interface MCQ extends QBase { kind: "mc"; prompt: string; clock?: { h: number; m: number }; options: string[]; correct: number; shuffle?: boolean; speakPrompt?: string; sub?: string }
export interface TypeQ extends QBase { kind: "type"; prompt: string; sub?: string; answers: string[]; strict?: boolean; numeric?: boolean; listen?: string; dict?: boolean }
export interface TilesQ extends QBase { kind: "tiles"; prompt: string; target: string[]; pool: string[] }
export type Question = FlipQ | MCQ | TypeQ | TilesQ;

export interface SessionSpec { title: string; questions: Question[]; again?: () => SessionSpec; back?: string }
