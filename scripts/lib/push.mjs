// Shared by the push senders (remind.mjs, notify-content.mjs). Runs in GitHub Actions with a Firebase service account.
// Subscriptions live in users/{uid}/push/{device} (written by src/lib/push.ts); user settings in users/{uid}.
import { pathToFileURL } from "node:url";

/** true when the file is run directly (node scripts/x.mjs), false when imported by a test */
export const isMain = url => !!process.argv[1] && url === pathToFileURL(process.argv[1]).href;

/** local calendar date (YYYY-MM-DD, same format as the app's todayKey) and minutes since midnight in `tz` */
export const localParts = (now, tz) => {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(now)
      .map(x => [x.type, x.value]),
  );
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: +p.hour * 60 + +p.minute };
};

/**
 * Connects to Firestore and web-push, then calls `decide(user, pushDoc, now)` for every subscribed device.
 * `decide` returns null (skip) or { payload, stamp } — `stamp` fields are written to the push doc after sending.
 * Without secrets it logs and returns (so forks and unconfigured repos don't fail).
 */
export const runSender = async (name, decide) => {
  const { FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, DRY_RUN } = process.env;
  if (!FIREBASE_SERVICE_ACCOUNT || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.log(`${name}: push not configured (secrets missing) — skipping.`);
    return;
  }
  const { initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const webpush = (await import("web-push")).default;
  initializeApp({ credential: cert(JSON.parse(FIREBASE_SERVICE_ACCOUNT)) });
  webpush.setVapidDetails(VAPID_SUBJECT || "mailto:admin@example.com", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  const db = getFirestore(),
    now = new Date(),
    users = new Map();
  const subs = await db.collectionGroup("push").get();
  const n = { sent: 0, skipped: 0, removed: 0, failed: 0 };
  for (const d of subs.docs) {
    const uid = d.ref.parent.parent?.id;
    if (!uid) continue;
    if (!users.has(uid)) users.set(uid, (await db.doc(`users/${uid}`).get()).data() || null);
    const user = users.get(uid),
      p = d.data();
    const r = user && p.sub ? decide(user, p, now) : null;
    if (!r) {
      n.skipped++;
      continue;
    }
    if (DRY_RUN) {
      n.sent++;
      continue;
    }
    try {
      await webpush.sendNotification(p.sub, JSON.stringify(r.payload), { TTL: 3 * 3600, urgency: "normal" });
      await d.ref.update(r.stamp);
      n.sent++;
    } catch (e) {
      if (e?.statusCode === 404 || e?.statusCode === 410) {
        await d.ref.delete(); // subscription expired or revoked
        n.removed++;
      } else {
        n.failed++;
        console.error("push error", e?.statusCode || e?.message);
      }
    }
  }
  console.log(
    `${name}: ${DRY_RUN ? "[dry run] " : ""}subscriptions ${subs.size} · sent ${n.sent} · skipped ${n.skipped} · expired removed ${n.removed} · failed ${n.failed}`,
  );
};
