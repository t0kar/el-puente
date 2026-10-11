import { useSyncExternalStore } from "react";
import { onSync, syncInfo } from "../lib/firebase";

/** Firebase auth + sync status (user, status, lastSync, authReady) */
export const useSync = () => useSyncExternalStore(onSync, syncInfo);
