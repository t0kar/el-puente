// "New class material" push. Run by .github/workflows/notify-content.yml after every successful deploy.
// Idempotent: each device is told about the newest entry of src/content/updates.json once (push doc field lastContent).
//   node scripts/notify-content.mjs            send (same secrets as remind.mjs)
//   DRY_RUN=1 node scripts/notify-content.mjs  decide and log, send nothing
import { readFileSync } from "node:fs";
import { isMain, runSender } from "./lib/push.mjs";

/** don't announce a class that's older than this (e.g. a deploy weeks later for something unrelated) */
const MAX_AGE_DAYS = 10;

/** should this device hear about `latest`? */
export const shouldNotify = (user, pushDoc, latest, now) => {
  if (!latest || user?.settings?.notifyContent === false) return false;
  if (pushDoc.lastContent && pushDoc.lastContent >= latest.id) return false; // ids are dates
  return now.getTime() - Date.parse(latest.id + "T00:00:00Z") <= MAX_AGE_DAYS * 86400000;
};

export const contentMessage = latest => ({
  title: "Nuevo en Cruza el Puente",
  body: latest.note ? `${latest.note} — ¡a practicar!` : "Hay material nuevo de la última clase.",
  tag: "content",
});

if (isMain(import.meta.url)) {
  const updates = JSON.parse(readFileSync(new URL("../src/content/updates.json", import.meta.url), "utf8"));
  const latest = updates.at(-1);
  if (!latest) console.log("notify-content: no updates yet — nothing to announce.");
  else
    runSender("notify-content", (user, p, now) =>
      shouldNotify(user, p, latest, now) ? { payload: contentMessage(latest), stamp: { lastContent: latest.id } } : null,
    ).catch(e => {
      console.error(e);
      process.exit(1);
    });
}
