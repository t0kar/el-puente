import { useState } from "react";
import { firebaseConfigured, login, logout, syncNow, type SyncStatus } from "../../lib/firebase";
import { Ic } from "../../components/icons";
import { useSync } from "../../hooks/useSync";

const SYNC_TXT: Record<SyncStatus, string> = {
  off: "Solo en este dispositivo",
  guest: "No has iniciado sesión",
  busy: "Guardando…",
  sync: "Sincronizado",
  error: "Sin conexión · se guarda localmente",
};

const syncState = (s: SyncStatus) => (s === "sync" ? "sync" : s === "error" ? "error" : s === "busy" ? "busy" : "local");

export const Account = () => {
  const { user, status, lastSync, authReady } = useSync();
  const [err, setErr] = useState("");
  if (!firebaseConfigured) return <p className="hint">Prijava nije podešena (nema Firebase konfiguracije). Napredak se sprema samo u ovom pregledniku.</p>;
  if (!authReady) return <p className="hint">Comprobando sesión…</p>;
  if (!user)
    return (
      <div className="login">
        <p className="hint">
          Prijavi se Google računom i napredak se sprema u oblak. Isti račun na mobitelu i računalu = isti napredak. Bez prijave sve radi, ali samo na ovom
          uređaju.
        </p>
        <button
          className="gbtn"
          onClick={() => {
            setErr("");
            login().catch(e => setErr("Prijava nije uspjela: " + (e?.code || e?.message || e)));
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
            />
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
          </svg>
          Entrar con Google
        </button>
        {err && <p className="fb bad">{err}</p>}
      </div>
    );
  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">
          {user.photoURL && <img className="avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />}
          <span>
            <b>{user.displayName || user.email}</b>
            <br />
            <span className="hint">{user.email}</span>
          </span>
        </div>
        <button className="btn ghost" onClick={() => logout()}>
          <Ic.logout /> Cerrar sesión
        </button>
      </div>
      <div className="syncbox">
        <span className="syncdot" data-state={syncState(status)}>
          {SYNC_TXT[status]}
        </span>
        {lastSync > 0 && <span className="hint">Última vez: {new Date(lastSync).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>}
      </div>
      <p className="hint">Sprema se automatski 2 sekunde nakon odgovora i kad zatvoriš aplikaciju. Promjene s drugog uređaja stižu same.</p>
      <button className="btn ghost" style={{ justifySelf: "start" }} onClick={() => syncNow()}>
        <Ic.sync /> Sincronizar ahora
      </button>
    </div>
  );
};
