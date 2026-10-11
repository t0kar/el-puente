import { useSyncExternalStore } from "react";
import type { AppState, Level, Settings } from "./types";
import { todayKey, DAY } from "./util";
import { RENAMED } from "../content/renamed";

const LS_KEY = "el-puente-v1";
export const defaultSettings = (): Settings => ({
  dir: "mix",
  type: false,
  newPerDay: 20,
  slow: false,
  verbMode: "type",
  goal: 60,
  tips: true,
  voice: "",
  theme: "auto",
  autoplay: false,
  levels: [],
  notifyContent: true,
  remind: { on: false, time: "19:00" },
  advanced: true,
});
export const defaultState = (): AppState => ({
  cards: {},
  days: {},
  best: {},
  stories: {},
  custom: {},
  seenUpdate: "",
  newDay: { d: "", n: 0 },
  settings: defaultSettings(),
  settingsAt: {},
  updatedAt: 0,
  resetAt: 0,
});

/** settings.levels used to be "a11" | "a12" | "mix" */
const migrateLevels = (v: unknown): Level[] => {
  if (Array.isArray(v)) return v.filter((x): x is Level => typeof x === "string");
  return v === "a11" ? ["A1.1"] : v === "a12" ? ["A1.2"] : [];
};

const normalize = (s: Partial<AppState> | null | undefined): AppState => {
  const st = Object.assign(defaultState(), s || {});
  st.settings = Object.assign(defaultSettings(), st.settings || {});
  st.settingsAt = st.settingsAt || {};
  // ids used to be "lesson:es" in the first version -> now "es"; corrected Spanish lines keep their progress (content/renamed.ts)
  const cards: AppState["cards"] = {};
  for (const [k, v] of Object.entries(st.cards || {})) {
    const bare = k.replace(/^\d+:/, "");
    const nk = RENAMED[bare] ?? bare;
    if (!cards[nk] || (v.t || 0) > (cards[nk].t || 0)) cards[nk] = v;
  }
  st.cards = cards;
  st.custom = st.custom || {};
  st.settings.levels = migrateLevels(st.settings.levels);
  return st;
};

let state: AppState = (() => {
  try {
    const raw = localStorage.getItem(LS_KEY) || localStorage.getItem("cuaderno-vivo-v1");
    if (raw) return normalize(JSON.parse(raw));
  } catch {
    /* ignore */
  }
  return defaultState();
})();
const listeners = new Set<() => void>();
let remoteSaver: ((s: AppState) => void) | null = null;

export const getState = () => state;
export const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
const emit = () => {
  listeners.forEach(f => f());
};
const persistLocal = () => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
};

/** Apply a change. The updater receives a shallow copy it may mutate. */
export const update = (fn: (s: AppState) => void, opts: { remote?: boolean } = {}) => {
  const next: AppState = {
    ...state,
    cards: { ...state.cards },
    days: { ...state.days },
    best: { ...state.best },
    stories: { ...state.stories },
    custom: { ...state.custom },
    settings: { ...state.settings },
    settingsAt: { ...state.settingsAt },
    newDay: { ...state.newDay },
  };
  fn(next);
  next.updatedAt = Date.now();
  state = next;
  persistLocal();
  emit();
  if (opts.remote !== false && remoteSaver) remoteSaver(state);
};
/** Replace the whole state (used after merging remote data). */
export const replaceState = (s: AppState) => {
  state = normalize(s);
  persistLocal();
  emit();
};
export const setRemoteSaver = (fn: ((s: AppState) => void) | null) => {
  remoteSaver = fn;
};

export const useAppState = () => {
  return useSyncExternalStore(subscribe, getState);
};
export const useSettings = () => useAppState().settings;
export const setSetting = <K extends keyof Settings>(k: K, v: Settings[K]) => {
  update(s => {
    s.settings[k] = v;
    s.settingsAt[k] = Date.now();
  });
};

/**
 * Each setting comes from the device that changed it last. Without timestamps (data from older versions) a changed value beats
 * a default, then the state saved last wins. So a fresh device (e.g. the iPhone home-screen app, which has its own storage)
 * can't overwrite the reminder set elsewhere just because it practised more recently.
 */
const mergeSettings = (a: AppState, b: AppState) => {
  const def = defaultSettings();
  const newer = (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a;
  const out = { ...def } as Record<keyof Settings, unknown>;
  const at: AppState["settingsAt"] = {};
  for (const k of Object.keys(def) as (keyof Settings)[]) {
    const ta = a.settingsAt[k] || 0,
      tb = b.settingsAt[k] || 0;
    let from: AppState;
    if (ta !== tb) from = ta > tb ? a : b;
    else {
      const isDef = (s: AppState) => JSON.stringify(s.settings[k]) === JSON.stringify(def[k]);
      from = isDef(a) !== isDef(b) ? (isDef(a) ? b : a) : newer;
    }
    out[k] = from.settings[k];
    if (ta || tb) at[k] = Math.max(ta, tb);
  }
  return { settings: out as unknown as Settings, settingsAt: at };
};

export const mergeStates = (a0: AppState, b0: AppState): AppState => {
  let a = normalize(a0),
    b = normalize(b0);
  const ra = a.resetAt || 0,
    rb = b.resetAt || 0;
  if (ra !== rb) {
    // one side was reset: from the other side keep only what happened after the reset
    const newer = ra > rb ? a : b,
      older = ra > rb ? b : a,
      r = newer.resetAt;
    const cleaned: AppState = {
      ...older,
      cards: Object.fromEntries(Object.entries(older.cards).filter(([, v]) => (v.t || 0) > r)),
      days: {},
      best: {},
      stories: {},
      resetAt: r,
    };
    if (ra > rb) b = cleaned;
    else a = cleaned;
  }
  const out = defaultState();
  out.resetAt = Math.max(ra, rb);
  out.cards = { ...a.cards };
  for (const [k, v] of Object.entries(b.cards)) if (!out.cards[k] || (v.t || 0) > (out.cards[k].t || 0)) out.cards[k] = v;
  out.days = { ...a.days };
  for (const [k, v] of Object.entries(b.days)) out.days[k] = Math.max(out.days[k] || 0, v);
  out.best = { ...a.best };
  for (const [k, v] of Object.entries(b.best)) out.best[k] = k.endsWith("time") ? Math.min(out.best[k] ?? Infinity, v) : Math.max(out.best[k] || 0, v);
  out.stories = { ...a.stories };
  for (const [k, v] of Object.entries(b.stories)) out.stories[k] = Math.max(out.stories[k] || 0, v);
  // custom words are content, not progress: a reset on one side doesn't remove them
  out.custom = { ...(a0.custom || {}) };
  for (const [k, v] of Object.entries(b0.custom || {})) if (!out.custom[k] || v.t > out.custom[k].t) out.custom[k] = v;
  const newer = (b.updatedAt || 0) > (a.updatedAt || 0) ? b : a;
  Object.assign(out, mergeSettings(a, b));
  out.newDay = newer.newDay;
  out.seenUpdate = (a.seenUpdate || "") > (b.seenUpdate || "") ? a.seenUpdate : b.seenUpdate; // ids are dates
  out.updatedAt = Math.max(a.updatedAt || 0, b.updatedAt || 0);
  return out;
};

// ---- XP & streak ----
export const addXP = (n: number) => {
  const k = todayKey();
  update(s => {
    s.days[k] = (s.days[k] || 0) + n;
  });
};
export const xpToday = (s = state) => s.days[todayKey()] || 0;
export const streak = (s = state) => {
  let n = 0,
    t = Date.now();
  if (!s.days[todayKey(t)]) t -= DAY;
  while (s.days[todayKey(t)]) {
    n++;
    t -= DAY;
  }
  return n;
};
export const resetProgress = () => {
  update(s => {
    const keep = s.settings,
      custom = s.custom,
      seen = s.seenUpdate;
    Object.assign(s, defaultState());
    s.settings = keep;
    s.custom = custom;
    s.seenUpdate = seen;
    s.resetAt = Date.now();
  });
};
export const exportCode = () => btoa(unescape(encodeURIComponent(JSON.stringify(state))));
export const importCode = (code: string) => {
  const s = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
  const merged = mergeStates(state, s);
  replaceState(merged);
  if (remoteSaver) remoteSaver(state);
};
