import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { currentUser, firebaseConfigured, firestore } from "./firebase";

const VAPID = import.meta.env.VITE_VAPID_PUBLIC_KEY as string | undefined;
/** reminders need Firebase (to store the subscription) and the VAPID public key */
export const pushConfigured = firebaseConfigured && !!VAPID;
export const pushSupported = () => typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
export const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
export const isStandalone = () => matchMedia("(display-mode: standalone)").matches || (navigator as { standalone?: boolean }).standalone === true;
/** iPhone/iPad only allow web push for apps added to the home screen */
export const needsInstall = () => isIos() && !isStandalone();
export const permission = () => (pushSupported() ? Notification.permission : "denied");

export function registerSW() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.register(import.meta.env.BASE_URL + "sw.js", { scope: import.meta.env.BASE_URL }).catch(() => { /* ignore */ });
}
const reg = () => navigator.serviceWorker.ready;

function deviceId() {
  const K = "el-puente-device";
  try { let id = localStorage.getItem(K); if (!id) { id = Math.random().toString(36).slice(2, 12); localStorage.setItem(K, id); } return id; } catch { return "default"; }
}
function keyBytes(b64url: string) {
  const b64 = (b64url + "=".repeat((4 - (b64url.length % 4)) % 4)).replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
}

/** is this device subscribed right now? */
export async function deviceSubscribed() {
  if (!pushSupported() || Notification.permission !== "granted") return false;
  try { return !!(await (await reg()).pushManager.getSubscription()); } catch { return false; }
}

/** subscribe this device; returns an error message or "" */
export async function enableOnDevice(): Promise<string> {
  const db = firestore(), user = currentUser();
  if (!pushConfigured || !db) return "Podsjetnici nisu podešeni na poslužitelju.";
  if (!user) return "Prvo se prijavi Google računom.";
  if (!pushSupported()) return "Ovaj preglednik ne podržava obavijesti.";
  if (needsInstall()) return "Na iPhoneu prvo dodaj aplikaciju na početni zaslon.";
  if ((await Notification.requestPermission()) !== "granted") return "Obavijesti su blokirane. Dopusti ih u postavkama preglednika.";
  try {
    const r = await reg();
    const sub = (await r.pushManager.getSubscription()) || (await r.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(VAPID!) }));
    await setDoc(doc(db, "users", user.uid, "push", deviceId()), {
      sub: sub.toJSON(), tz: Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Zagreb", ua: navigator.userAgent.slice(0, 160), at: Date.now(),
    }, { merge: true });
    return "";
  } catch (e) { return "Nije uspjelo: " + ((e as Error)?.message || e); }
}

export async function disableOnDevice() {
  try { const s = pushSupported() ? await (await reg()).pushManager.getSubscription() : null; await s?.unsubscribe(); } catch { /* ignore */ }
  const db = firestore(), user = currentUser();
  if (db && user) { try { await deleteDoc(doc(db, "users", user.uid, "push", deviceId())); } catch { /* ignore */ } }
}

/** show a local notification so the user sees what the reminder looks like */
export async function testNotification(): Promise<string> {
  if (!pushSupported()) return "Ovaj preglednik ne podržava obavijesti.";
  if ((await Notification.requestPermission()) !== "granted") return "Obavijesti su blokirane. Dopusti ih u postavkama preglednika.";
  try {
    const r = await reg();
    await r.showNotification("Cruza el Puente", { body: "¡Hola! Así se verá tu recordatorio. ¿Repasamos 5 minutos?", icon: import.meta.env.BASE_URL + "favicon.svg", tag: "test" });
    return "";
  } catch (e) { return "Nije uspjelo: " + ((e as Error)?.message || e); }
}
