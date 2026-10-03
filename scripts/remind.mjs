// Daily reminder push. Run by .github/workflows/remind.yml every 15 minutes.
// A user gets one notification per day, inside [remind.time, +2h) of their local time, only if they haven't practised yet.
//   node scripts/remind.mjs            send (needs FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT)
//   DRY_RUN=1 node scripts/remind.mjs  decide and log, send nothing
import { isMain, localParts, runSender } from "./lib/push.mjs";

const WINDOW_MIN = 120;
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
  if (minutes < start || minutes >= start + WINDOW_MIN) return null;
  if (pushDoc.lastSent === date || user.days?.[date]) return null;
  return date;
};

export const message = (user, date) => {
  const s = streakBefore(user.days, date);
  return {
    title: "Cruza el Puente",
    body: s >= 2 ? `¡No pierdas tu racha de ${s} días! 5 minutos de repaso y listo.` : "¡Hola! Hoy todavía no has repasado. ¿5 minutos?",
    tag: "reminder",
  };
};

if (isMain(import.meta.url)) {
  runSender("remind", (user, p, now) => {
    const date = shouldSend(user, p, now);
    return date ? { payload: message(user, date), stamp: { lastSent: date } } : null;
  }).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
