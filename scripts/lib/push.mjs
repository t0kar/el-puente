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

/** "web.push.apple.com" etc. — which push service a subscription belongs to (for logs, never the full endpoint) */
export const pushHost = sub => {
  try {
    return new URL(sub?.endpoint).host;
  } catch {
    return "?";
  }
};

/**
 * Connects to Firestore and web-push, then calls `decide(user, pushDoc, now)` for every subscribed device.
 * `decide` returns null (skip) or { payload, stamp } — `stamp` fields are written to the push doc after sending.
 * Without secrets it logs and returns (so forks and local runs don't fail). Returns the counts; the caller turns
 * "everything failed" into a failed workflow run so GitHub e-mails the owner instead of staying green.
 */
export const runSender = async (name, decide) => {
  const { FIREBASE_SERVICE_ACCOUNT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY, VAPID_SUBJECT, DRY_RUN, GITHUB_ACTIONS } = process.env;
  if (!FIREBASE_SERVICE_ACCOUNT || !VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    console.log(`${name}: push not configured (secrets missing) — skipping.`);
    // in Actions the workflow only runs once VITE_VAPID_PUBLIC_KEY is set, so a missing secret is a mistake worth a red run
    if (GITHUB_ACTIONS) throw new Error("FIREBASE_SERVICE_ACCOUNT / VAPID_PRIVATE_KEY secret missing");
    return null;
  }
  if (!VAPID_SUBJECT && GITHUB_ACTIONS)
    console.log("::warning::VAPID_SUBJECT is not set. Apple (iPhone) push may reject the placeholder; set the repo variable to mailto:you@example.com.");
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
    const p = d.data(),
      host = pushHost(p.sub);
    let r;
    try {
      if (!users.has(uid)) users.set(uid, (await db.doc(`users/${uid}`).get()).data() || null);
      const user = users.get(uid);
      r = user && p.sub ? decide(user, p, now) : null;
    } catch (e) {
      // one bad document (e.g. an unknown time zone) must not stop everybody else's reminders
      n.failed++;
      console.error(`decide error (${host}):`, e?.message || e);
      continue;
    }
    if (!r) {
      n.skipped++;
      continue;
    }
    if (DRY_RUN) {
      n.sent++;
      console.log(`[dry run] would send to ${host}: ${r.payload.body}`);
      continue;
    }
    try {
      await webpush.sendNotification(p.sub, JSON.stringify(r.payload), { TTL: 3 * 3600, urgency: "normal" });
      n.sent++;
    } catch (e) {
      if (e?.statusCode === 404 || e?.statusCode === 410) {
        await d.ref.delete(); // subscription expired or revoked; the app re-subscribes on its next start (syncPushDevice)
        n.removed++;
        console.log(`removed expired subscription (${host}, ${e.statusCode})`);
      } else {
        n.failed++;
        // Apple/Google put the reason in the body, e.g. {"reason":"BadJwtToken"} (VAPID subject/keys) — that's the clue to fix it
        console.error(`push error ${host}: ${e?.statusCode || ""} ${e?.body || e?.message || e}`.trim());
      }
      continue;
    }
    try {
      await d.ref.update(r.stamp);
    } catch (e) {
      console.error(`stamp error (${host}):`, e?.message || e);
    }
  }
  console.log(
    `${name}: ${DRY_RUN ? "[dry run] " : ""}subscriptions ${subs.size} · sent ${n.sent} · skipped ${n.skipped} · expired removed ${n.removed} · failed ${n.failed}`,
  );
  return n;
};

/** run a sender as a script: exit 1 on a crash or when every attempted push failed (so the workflow turns red) */
export const runMain = (name, decide) =>
  runSender(name, decide).then(
    n => {
      if (n && n.failed > 0 && n.sent === 0) {
        console.error(`${name}: every push failed — see the errors above.`);
        process.exitCode = 1;
      }
    },
    e => {
      console.error(e);
      process.exitCode = 1;
    },
  );
