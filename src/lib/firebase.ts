import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from "firebase/auth";
import { doc, getDoc, getFirestore, onSnapshot, setDoc, type Firestore } from "firebase/firestore";
import { getState, mergeStates, replaceState, setRemoteSaver } from "./store";
import type { AppState } from "./types";

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
};
export const firebaseConfigured = !!(cfg.apiKey && cfg.projectId && cfg.appId);

let app: FirebaseApp | null = null,
  db: Firestore | null = null;
if (firebaseConfigured) {
  app = initializeApp(cfg);
  db = getFirestore(app);
}
const auth = app ? getAuth(app) : null;

export type SyncStatus = "off" | "guest" | "busy" | "sync" | "error";
type Listener = () => void;
let user: User | null = null,
  status: SyncStatus = firebaseConfigured ? "guest" : "off",
  lastSync = 0,
  authReady = !firebaseConfigured;
const listeners = new Set<Listener>();
export interface SyncInfo {
  user: User | null;
  status: SyncStatus;
  lastSync: number;
  authReady: boolean;
}
let info: SyncInfo = { user, status, lastSync, authReady };
const emit = () => {
  info = { user, status, lastSync, authReady };
  listeners.forEach(f => f());
};
/** stable snapshot for useSyncExternalStore */
export const syncInfo = () => info;
export const onSync = (f: Listener) => {
  listeners.add(f);
  return () => {
    listeners.delete(f);
  };
};
const setStatus = (s: SyncStatus) => {
  status = s;
  if (s === "sync") lastSync = Date.now();
  emit();
};

const clean = (s: AppState) => JSON.parse(JSON.stringify(s)) as AppState;
let timer: number | undefined,
  saving = false,
  pending = false,
  unsub: (() => void) | null = null,
  lastWritten = 0;

const push = async () => {
  if (!db || !user) return;
  if (saving) {
    pending = true;
    return;
  }
  saving = true;
  setStatus("busy");
  try {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref); // merge what another device saved first
    const merged = snap.exists() ? mergeStates(getState(), snap.data() as AppState) : getState();
    lastWritten = merged.updatedAt;
    await setDoc(ref, clean(merged));
    replaceState(merged);
    setStatus("sync");
  } catch {
    setStatus("error");
  }
  saving = false;
  if (pending) {
    pending = false;
    push();
  }
};
const schedulePush = () => {
  window.clearTimeout(timer);
  timer = window.setTimeout(push, 2000);
};

const attach = async (u: User) => {
  user = u;
  setStatus("busy");
  setRemoteSaver(schedulePush);
  await push();
  const ref = doc(db!, "users", u.uid);
  unsub?.();
  unsub = onSnapshot(
    ref,
    snap => {
      // live updates from the other device
      if (snap.metadata.hasPendingWrites || !snap.exists()) return;
      const remote = snap.data() as AppState;
      if ((remote.updatedAt || 0) <= lastWritten) return;
      replaceState(mergeStates(getState(), remote));
      setStatus("sync");
    },
    () => setStatus("error"),
  );
};
const detach = () => {
  unsub?.();
  unsub = null;
  user = null;
  setRemoteSaver(null);
  setStatus(firebaseConfigured ? "guest" : "off");
};

if (auth) {
  onAuthStateChanged(auth, u => {
    authReady = true;
    if (u) attach(u);
    else detach();
    emit();
  });
  document.addEventListener("visibilitychange", () => {
    if (user) {
      if (document.visibilityState === "hidden") {
        window.clearTimeout(timer);
        push();
      } else push();
    }
  });
}
export const login = async () => {
  if (!auth) return;
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (e: unknown) {
    const code = (e as { code?: string }).code || "";
    if (code.includes("popup-blocked") || code.includes("operation-not-supported")) await signInWithRedirect(auth, provider);
    else throw e;
  }
};
export const logout = async () => {
  if (auth) {
    window.clearTimeout(timer);
    await push();
    await signOut(auth);
  }
};
export const syncNow = () => push();
/** handles for other Firestore features (push subscriptions) */
export const firestore = () => db;
export const currentUser = () => user;
