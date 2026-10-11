import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { currentUser, firebaseConfigured, firestore, onSync, syncInfo } from "./firebase";
import { getState } from "./store";
import { LAST_UPDATE } from "./updates";

const VAPID = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
/** push (daily reminder, new content) needs Firebase (to store the subscription) and the VAPID public key */
export const pushConfigured = firebaseConfigured && !!VAPID;
export const pushSupported = () => typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isStandalone = () => matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
/** iPhone/iPad only allow web push for apps added to the home screen */
export const needsInstall = () => isIos() && !isStandalone();
export const permission = () => (pushSupported() ? Notification.permission : "denied");

export const registerSW = () => {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js", { scope: import.meta.env.BASE_URL }).catch(() => {
    /* ignore */
  });
};
const reg = () => navigator.serviceWorker.ready;

const deviceId = () => {
  const K = "el-puente-device";
  try {
    let id = localStorage.getItem(K);
    if (!id) {
      id = Math.random().toString(36).slice(2, 12);
      localStorage.setItem(K, id);
    }
    return id;
  } catch {
    return "default";
  }
};
const keyBytes = (b64url: string) => {
  const b64 = (b64url + "=".repeat((4 - (b64url.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
};

/** is this device subscribed right now? */
export const deviceSubscribed = async () => {
  if (!pushSupported() || Notification.permission !== "granted") return false;
  try {
    return !!(await (await reg()).pushManager.getSubscription());
  } catch {
    return false;
  }
};

/** a subscription made with another VAPID key (keys regenerated, other build) is rejected by the push service */
const sameKey = (sub: PushSubscription) => {
  const k = sub.options?.applicationServerKey;
  if (!k) return true;
  const a = new Uint8Array(k),
    b = keyBytes(VAPID!);
  return a.length === b.length && a.every((x, i) => x === b[i]);
};
const subscription = async () => {
  const r = await reg();
  let sub = await r.pushManager.getSubscription();
  if (sub && !sameKey(sub)) {
    await sub.unsubscribe();
    sub = null;
  }
  return sub || r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(VAPID!) });
};
const deviceDoc = () => doc(firestore()!, "users", currentUser()!.uid, "push", deviceId());
/** (re)write this device's subscription; merge keeps lastSent/lastContent stamps of the senders */
const saveDevice = async (extra: Record<string, unknown> = {}) => {
  const sub = await subscription();
  await setDoc(
    deviceDoc(),
    {
      sub: sub.toJSON(),
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Zagreb",
      ua: navigator.userAgent.slice(0, 160),
      at: Date.now(),
      ...extra,
    },
    { merge: true },
  );
};

/** subscribe this device; returns an error message or "" */
export const enableOnDevice = async (): Promise<string> => {
  const db = firestore(),
    user = currentUser();
  if (!pushConfigured || !db) return "Podsjetnici nisu podešeni na poslužitelju.";
  if (!user) return "Prvo se prijavi Google računom.";
  if (!pushSupported()) return "Ovaj preglednik ne podržava obavijesti.";
  if (needsInstall()) return "Na iPhoneu prvo dodaj aplikaciju na početni zaslon.";
  if ((await Notification.requestPermission()) !== "granted") return "Obavijesti su blokirane. Dopusti ih u postavkama preglednika.";
  try {
    // a new device isn't told about classes published before it subscribed
    await saveDevice(LAST_UPDATE ? { lastContent: LAST_UPDATE.id } : {});
    return "";
  } catch (e) {
    return "Nije uspjelo: " + ((e as Error)?.message || e);
  }
};

/**
 * On every start (once signed in): if notifications are on and allowed, make sure this device's subscription is saved and
 * current. Repairs the silent cases: the sender deleted an expired subscription, the browser rotated it, the VAPID key
 * changed, or the time zone changed.
 */
export const syncPushDevice = async () => {
  const st = getState().settings;
  if (!pushConfigured || !firestore() || !currentUser() || !pushSupported() || needsInstall()) return;
  if (Notification.permission !== "granted" || !(st.remind.on || st.notifyContent)) return;
  try {
    await saveDevice();
  } catch {
    /* offline or blocked: try again next start */
  }
};
let syncedFor = "";
/** call once at startup: runs syncPushDevice after a user signs in and their settings are merged */
export const startPushSync = () =>
  onSync(() => {
    const { user, status } = syncInfo();
    const uid = user?.uid || "";
    if (uid && status === "sync" && uid !== syncedFor) {
      syncedFor = uid;
      syncPushDevice();
    }
  });

/** ask the reminder job (scripts/remind.mjs) to send a real push to this device on its next run; returns an error or "" */
export const requestServerTest = async (): Promise<string> => {
  if (!firestore() || !currentUser()) return "Prvo se prijavi Google računom.";
  try {
    await saveDevice({ testAt: Date.now() });
    return "";
  } catch (e) {
    return "Nije uspjelo: " + ((e as Error)?.message || e);
  }
};

export const disableOnDevice = async () => {
  try {
    const s = pushSupported() ? await (await reg()).pushManager.getSubscription() : null;
    await s?.unsubscribe();
  } catch {
    /* ignore */
  }
  const db = firestore(),
    user = currentUser();
  if (db && user) {
    try {
      await deleteDoc(doc(db, "users", user.uid, "push", deviceId()));
    } catch {
      /* ignore */
    }
  }
};

/** show a local notification so the user sees what the reminder looks like */
export const testNotification = async (): Promise<string> => {
  if (!pushSupported()) return "Ovaj preglednik ne podržava obavijesti.";
  if ((await Notification.requestPermission()) !== "granted") return "Obavijesti su blokirane. Dopusti ih u postavkama preglednika.";
  try {
    const r = await reg();
    await r.showNotification("Cruza el Puente", {
      body: "¡Hola! Así se verá tu recordatorio. ¿Repasamos 5 minutos?",
      icon: import.meta.env.BASE_URL + "favicon.svg",
      tag: "test",
    });
    return "";
  } catch (e) {
    return "Nije uspjelo: " + ((e as Error)?.message || e);
  }
};
