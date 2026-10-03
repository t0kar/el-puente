// Class log (content/updates.json) and the "Novedades" badge state.
import { UPDATES } from "../content";
import { cards } from "./cards";
import { getState, update } from "./store";
import type { AppState, Update } from "./types";

/** newest class entry ("since the last class"), or null before the first one */
export const LAST_UPDATE: Update | null = UPDATES.length ? UPDATES[UPDATES.length - 1] : null;

/** cards tagged with an update id (default: the newest class) */
export const lastClassCards = (id = LAST_UPDATE?.id) => (id ? cards().filter(c => c.u === id) : []);

/** class entries newer than what this user has seen, newest first (ids are dates, so they sort) */
export const unseenUpdates = (st: AppState = getState()): Update[] => UPDATES.filter(u => u.id > (st.seenUpdate || "")).reverse();

/** mark everything up to the newest class as seen (clears the badge on every device) */
export const markUpdatesSeen = () => {
  if (LAST_UPDATE && getState().seenUpdate !== LAST_UPDATE.id)
    update(s => {
      s.seenUpdate = LAST_UPDATE.id;
    });
};

/** a brand-new user starts with everything seen, so they don't get a backlog of "new" classes */
export const initSeenUpdates = () => {
  const st = getState();
  if (LAST_UPDATE && !st.seenUpdate && !Object.keys(st.cards).length)
    update(
      s => {
        s.seenUpdate = LAST_UPDATE.id;
      },
      { remote: false },
    );
};
