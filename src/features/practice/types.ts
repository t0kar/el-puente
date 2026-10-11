import { pick } from "../../lib/util";

/** feedback shown after an answer */
export type Fb = { kind: "ok" | "bad" | "warn"; title: string; why?: string; diff?: { w: string; ok: boolean }[] };
/** props of every question view; onResult(correct, xpGain) is called once when answered */
export type QProps<T> = { q: T; onResult: (ok: boolean, gain: number) => void; onNext: () => void };

export const praise = () => pick(["¡Correcto!", "¡Muy bien!", "¡Eso es!", "¡Perfecto!", "¡Genial!"]);
