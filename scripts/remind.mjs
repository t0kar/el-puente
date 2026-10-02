// Sends the daily reminder push. Run by .github/workflows/remind.yml every 15 minutes.
// A user gets one notification per day, inside [remind.time, +2h) of their local time, only if they haven't practiced yet.
//   node scripts/remind.mjs            send (needs FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT)
//   DRY_RUN=1 node scripts/remind.mjs  decide and log, send nothing
//   node scripts/remind.mjs --selftest check the scheduling logic offline
const WINDOW_MIN = 120;

/** local calendar date (YYYY-MM-DD, same format as the app's todayKey) and minutes since midnight in `tz` */
export function localParts(now, tz) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
    .formatToParts(now).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: +p.hour * 60 + +p.minute };
}
const prevDay = d => new Date(Date.parse(d + "T12:00:00Z") - 86400000).toISOString().slice(0, 10);
/** streak up to yesterday (today isn't practiced yet, otherwise we wouldn't send) */
export function streakBefore(days, date) { let n = 0, d = prevDay(date); while (days?.[d]) { n++; d = prevDay(d); } return n; }

/** returns the local date to stamp as lastSent, or null when nothing should be sent */
export function shouldSend(user, pushDoc, now) {
  const r = user?.settings?.remind;
  if (!r?.on || !/^\d\d:\d\d$/.test(r.time || "")) return null;
  const { date, minutes } = localParts(now, pushDoc.tz || "Europe/Zagreb");
  const [h, m] = r.time.split(":").map(Number), start = h * 60 + m;
  if (minutes < start || minutes >= start + WINDOW_MIN) return null;
  if (pushDoc.lastSent === date || user.days?.[date]) return null;
  return date;
}
export function message(user, date) {
  const s = streakBefore(user.days, date);
  return {
    title: "Cruza el Puente",
    body: s >= 2 ? `¡No pierdas tu racha de ${s} días! 5 minutos de repaso y listo.` : "¡Hola! Hoy todavía no has repasado. ¿5 minutos?",
    tag: "reminder",
  };
}

function selftest() {
  const assert = (c, m) => { if (!c) { console.error("FAIL:", m); process.exit(1); } };
  const user = { settings: { remind: { on: true, time: "19:00" } }, days: { "2026-10-01": 20, "2026-10-02": 15 } };
  const zg = { tz: "Europe/Zagreb" };
  // 2026-10-03 17:10 UTC = 19:10 in Zagreb (CEST, UTC+2)
  const t = new Date("2026-10-03T17:10:00Z");
  assert(localParts(t, "Europe/Zagreb").date === "2026-10-03" && localParts(t, "Europe/Zagreb").minutes === 19 * 60 + 10, "local time Zagreb");
  assert(shouldSend(user, zg, t) === "2026-10-03", "sends inside window");
  assert(shouldSend(user, zg, new Date("2026-10-03T16:50:00Z")) === null, "not before time");
  assert(shouldSend(user, zg, new Date("2026-10-03T19:05:00Z")) === null, "not after 2h window");
  assert(shouldSend(user, { ...zg, lastSent: "2026-10-03" }, t) === null, "once per day");
  assert(shouldSend({ ...user, days: { ...user.days, "2026-10-03": 4 } }, zg, t) === null, "skip if practiced today");
  assert(shouldSend({ ...user, settings: { remind: { on: false, time: "19:00" } } }, zg, t) === null, "off");
  assert(shouldSend(user, { tz: "America/New_York" }, t) === null, "other time zone: 13:10 in NY");
  assert(shouldSend(user, { tz: "America/New_York" }, new Date("2026-10-03T23:30:00Z")) === "2026-10-03", "NY 19:30");
  // late reminder crossing midnight in UTC but not locally
  const late = { settings: { remind: { on: true, time: "23:30" } }, days: {} };
  assert(shouldSend(late, zg, new Date("2026-10-03T21:45:00Z")) === "2026-10-03", "23:45 local still today");
  assert(streakBefore(user.days, "2026-10-03") === 2 && message(user, "2026-10-03").body.includes("2 días"), "streak message");
  assert(!message({ days: {} }, "2026-10-03").body.includes("racha"), "plain message");
  console.log("selftest ok");
}

async function main() {
  const { FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, DRY_RUN } = process.env;
  if (!FIREBASE_SERVICE_ACCOUNT || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) { console.log("Reminders not configured (secrets missing) — skipping."); return; }
  const { initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const webpush = (await import("web-push")).default;
  initializeApp({ credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT)) });
  webpush.setVapidDetails(VAPID_SUBJECT || "mailto:admin@example.com", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  const db = getFirestore(), now = new Date(), users = new Map();
  const subs = await db.collectionGroup("push").get();
  let sent = 0, skipped = 0, removed = 0, failed = 0;
  for (const d of subs.docs) {
    const uid = d.ref.parent.parent?.id;
    if (!uid) continue;
    if (!users.has(uid)) users.set(uid, (await db.doc(`users/${uid}`).get()).data() || null);
    const user = users.get(uid), p = d.data();
    const date = user && shouldSend(user, p, now);
    if (!date || !p.sub) { skipped++; continue; }
    if (DRY_RUN) { sent++; continue; }
    try {
      await webpush.sendNotification(p.sub, JSON.stringify(message(user, date)), { TTL: 3 * 3600, urgency: "normal" });
      await d.ref.update({ lastSent: date });
      sent++;
    } catch (e) {
      if (e?.statusCode === 404 || e?.statusCode === 410) { await d.ref.delete(); removed++; } else { failed++; console.error("push error", e?.statusCode || e?.message); }
    }
  }
  console.log(`${DRY_RUN ? "[dry run] " : ""}subscriptions ${subs.size} · sent ${sent} · skipped ${skipped} · expired removed ${removed} · failed ${failed}`);
}

if (process.argv.includes("--selftest")) selftest();
else main().catch(e => { console.error(e); process.exit(1); });
