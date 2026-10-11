// Rules and verbs missed twice in one session: the session moves on, and they come first next time.
// (Flashcards don't need this, SRS keeps a failed card due.) Local to the device on purpose: small, short-lived, nothing to merge.
const K = "el-puente-missed";
const MAX = 40;

const load = (): string[] => {
  try {
    const v: unknown = JSON.parse(localStorage.getItem(K) || "[]");
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
};
const save = (keys: string[]) => {
  try {
    localStorage.setItem(K, JSON.stringify(keys.slice(0, MAX)));
  } catch {
    /* ignore */
  }
};

export const missedKeys = load;
export const markMissed = (key: string) => save([key, ...load().filter(k => k !== key)]);
export const clearMissed = (key: string) => {
  const keys = load();
  if (keys.includes(key)) save(keys.filter(k => k !== key));
};
/** the same items with the missed ones moved to the front (most recently missed first) */
export const missedFirst = <T>(xs: T[], keyOf: (x: T) => string): T[] => {
  const order = new Map(load().map((k, i) => [k, i]));
  const hit = xs.filter(x => order.has(keyOf(x))).sort((a, b) => order.get(keyOf(a))! - order.get(keyOf(b))!);
  return [...hit, ...xs.filter(x => !order.has(keyOf(x)))];
};
