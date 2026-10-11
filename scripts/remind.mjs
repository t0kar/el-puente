// Daily reminder push. Run by .github/workflows/remind.yml every 15 minutes.
// A user gets one notification per day, inside [remind.time, +2h) of their local time (may run past midnight), only if they
// haven't practised that day. A device can also ask for a test push ("Probar desde el servidor" → pushDoc.testAt).
//   node scripts/remind.mjs            send (needs FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT)
//   DRY_RUN=1 node scripts/remind.mjs  decide and log, send nothing
import { isMain, localParts, runMain } from "./lib/push.mjs";

const WINDOW_MIN = 120;
const TEST_MAX_AGE = 24 * 3600 * 1000;
const prevDay = d => new Date(Date.parse(d + "T12:00:00Z") - 86400000).toISOString().slice(0, 10);

/** streak up to yesterday (today isn't practised yet, otherwise we wouldn't send) */
export const streakBefore = (days, date) => {
  let n = 0,
    d = prevDay(date);
  while (days?.[d]) {
    n++;
    d = prevDay(d);
  }
  return n;
};

/** the local date to stamp as lastSent, or null when nothing should be sent */
export const shouldSend = (user, pushDoc, now) => {
  const r = user?.settings?.remind;
  if (!r?.on || !/^\d\d:\d\d$/.test(r.time || "")) return null;
  const { date, minutes } = localParts(now, pushDoc.tz || "Europe/Zagreb");
  const [h, m] = r.time.split(":").map(Number),
    start = h * 60 + m;
  if ((minutes - start + 1440) % 1440 >= WINDOW_MIN) return null;
  // after midnight we're still in yesterday's window (e.g. 23:30 → 00:15)
  const day = minutes < start ? prevDay(date) : date;
  if (pushDoc.lastSent === day || user.days?.[day]) return null;
  return day;
};

/** a test push was requested from the app and not sent yet (requests older than a day are ignored) */
export const wantsTest = (pushDoc, now) => !!pushDoc.testAt && pushDoc.testAt > (pushDoc.testSent || 0) && now - pushDoc.testAt < TEST_MAX_AGE;
export const testMessage = () => ({ title: "Cruza el Puente", body: "¡Funciona! Así llegará tu recordatorio diario.", tag: "test" });

/** what to send to one device: the test push first, otherwise the daily reminder */
export const decide = (user, p, now) => {
  if (wantsTest(p, now)) return { payload: testMessage(), stamp: { testSent: now.getTime() } };
  const date = shouldSend(user, p, now);
  return date ? { payload: message(user, date), stamp: { lastSent: date } } : null;
};

export const message = (user, date) => {
  const s = streakBefore(user.days, date);
  return {
    title: "Cruza el Puente",
    body: s >= 2 ? `¡No pierdas tu racha de ${s} días! 5 minutos de repaso y listo.` : "¡Hola! Hoy todavía no has repasado. ¿5 minutos?",
    tag: "reminder",
  };
};

if (isMain(import.meta.url)) runMain("remind", decide);
