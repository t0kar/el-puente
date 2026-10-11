import { useState } from "react";
import { useSync } from "../../hooks/useSync";
import { firebaseConfigured, login } from "../../lib/firebase";

const KEY = "el-puente-nobanner";
const dismissed = () => {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

/** nudge to sign in (sync between phone and computer); hidden once dismissed or signed in */
export const LoginBanner = () => {
  const { user, authReady } = useSync();
  const [hide, setHide] = useState(dismissed);
  if (!firebaseConfigured || !authReady || user || hide) return null;
  const dismiss = () => {
    setHide(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* storage blocked */
    }
  };
  return (
    <div className="banner">
      <span>Inicia sesión para guardar tu progreso en móvil y ordenador.</span>
      <span className="row">
        <button className="btn" onClick={() => login().catch(() => {})}>
          Entrar con Google
        </button>
        <button className="btn ghost" onClick={dismiss}>
          Ahora no
        </button>
      </span>
    </div>
  );
};
