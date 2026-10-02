import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { exportCode, importCode, resetProgress, setSetting, useSettings } from "../lib/store";
import { esVoices, onVoices, pickVoice, speak, currentVoice } from "../lib/speech";
import { firebaseConfigured, login, logout, onSync, syncInfo, syncNow, type SyncStatus } from "../lib/firebase";
import { Seg } from "../components/ui";

const SYNC_TXT: Record<SyncStatus, string> = { off: "Solo en este dispositivo", guest: "No has iniciado sesión", busy: "Guardando…", sync: "Sincronizado", error: "Sin conexión · se guarda localmente" };
export const useSync = () => useSyncExternalStore(onSync, syncInfo);

function Row({ title, children, control }: { title: string; children: ReactNode; control: ReactNode }) {
  return <div className="setrow"><div className="settext"><b>{title}</b><p className="hint">{children}</p></div>{control}</div>;
}
function Group({ title, mark, children }: { title: string; mark: string; children: ReactNode }) {
  return <div className="card stack"><h2><span className={"mark " + mark}>{title}</span></h2>{children}</div>;
}
const syncState = (s: SyncStatus) => (s === "sync" ? "sync" : s === "error" ? "error" : s === "busy" ? "busy" : "local");

export function Account() {
  const { user, status, lastSync, authReady } = useSync();
  const [err, setErr] = useState("");
  if (!firebaseConfigured) return <p className="hint">Prijava nije podešena (nema Firebase konfiguracije). Napredak se sprema samo u ovom pregledniku.</p>;
  if (!authReady) return <p className="hint">Comprobando sesión…</p>;
  if (!user) return (
    <div className="login">
      <p className="hint">Prijavi se Google računom i napredak se sprema u oblak. Isti račun na mobitelu i računalu = isti napredak. Bez prijave sve radi, ali samo na ovom uređaju.</p>
      <button className="gbtn" onClick={() => { setErr(""); login().catch(e => setErr("Prijava nije uspjela: " + (e?.code || e?.message || e))); }}>
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
        Entrar con Google
      </button>
      {err && <p className="fb bad">{err}</p>}
    </div>
  );
  return (
    <div className="stack">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div className="row">{user.photoURL && <img className="avatar" src={user.photoURL} alt="" referrerPolicy="no-referrer" />}<span><b>{user.displayName || user.email}</b><br /><span className="hint">{user.email}</span></span></div>
        <button className="btn ghost" onClick={() => logout()}>Cerrar sesión</button>
      </div>
      <div className="syncbox"><span className="syncdot" data-state={syncState(status)}>{SYNC_TXT[status]}</span>{lastSync > 0 && <span className="hint">Última vez: {new Date(lastSync).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}</span>}</div>
      <p className="hint">Sprema se automatski 2 sekunde nakon odgovora i kad zatvoriš aplikaciju. Promjene s drugog uređaja stižu same.</p>
      <button className="btn ghost" style={{ justifySelf: "start" }} onClick={() => syncNow()}>Sincronizar ahora</button>
    </div>
  );
}

function VoicePicker() {
  const [, setV] = useState(0);
  useEffect(() => onVoices(() => setV(v => v + 1)), []);
  const cur = currentVoice();
  return (
    <select id="voice-pick" className="answer-input" style={{ fontSize: ".95rem", minHeight: 44, padding: 8 }} aria-label="Voz" value={cur?.voiceURI || ""}
      onChange={e => { setSetting("voice", e.target.value); pickVoice(); speak("¡Hola! Me llamo Paco y soy un pulpo."); }}>
      {esVoices.length ? esVoices.map(v => <option key={v.voiceURI} value={v.voiceURI}>{v.name.replace(/Microsoft |Google /, "")} · {v.lang}</option>) : <option value="">No hay voces en español</option>}
    </select>
  );
}

function Backup() {
  const [txt, setTxt] = useState(""), [msg, setMsg] = useState("");
  return (
    <div className="stack">
      <div className="row">
        <button className="btn ghost" onClick={async () => { const c = exportCode(); setTxt(c); try { await navigator.clipboard.writeText(c); setMsg("Kod je kopiran. Spremi ga negdje sigurno."); } catch { setMsg("Kod je u polju. Označi ga i kopiraj."); } }}>Copiar código</button>
        <button className="btn ghost" onClick={() => { try { importCode(txt); setMsg("Napredak je učitan i spojen s postojećim."); } catch { setMsg("Kod nije ispravan. Zalijepi cijeli kod."); } }}>Cargar código</button>
      </div>
      <textarea id="backup-text" className="answer-input" rows={3} style={{ font: "500 .8rem var(--f-mono)", minHeight: 80 }} placeholder="Pega aquí tu código…" value={txt} onChange={e => setTxt(e.target.value)} aria-label="Código de copia" />
      {msg && <p className="hint" role="status">{msg}</p>}
    </div>
  );
}

export function Settings() {
  const s = useSettings();
  const [confirm, setConfirm] = useState(false);
  return (
    <section className="view">
      <h1>Ajustes</h1>
      <p className="hint">Objašnjenja postavki uvijek su na hrvatskom.</p>
      <Group title="Cuenta y progreso" mark="green">
        <Account />
        <details><summary>Copia de seguridad</summary><p className="hint">Rezervni način prijenosa bez prijave: kopiraj kod na jednom uređaju i učitaj ga na drugom. Spajanje ne briše ništa.</p><Backup /></details>
      </Group>
      <Group title="Ayuda" mark="yellow">
        <Row title="Pistas en croata" control={<Seg options={[[true, "Sí"], [false, "No"]]} value={s.tips} onChange={v => setSetting("tips", v)} />}>
          Uključeno: hrvatska objašnjenja vidljiva su odmah. Isključeno: skrivaju se iza malog gumba HR pa ih otvoriš samo kad ne razumiješ. Isto radi gumb HR gore desno.
        </Row>
      </Group>
      <Group title="Tarjetas" mark="green">
        <Row title="Dirección" control={<Seg options={[["es", "ES → HR"], ["hr", "HR → ES"], ["mix", "Mezcla"]]} value={s.dir} onChange={v => setSetting("dir", v)} />}>
          ES → HR: vidiš španjolski, prisjećaš se značenja (lakše). HR → ES: vidiš hrvatski, prisjećaš se španjolskog (teže, bolje za govor). Mezcla: nasumično.
        </Row>
        <Row title="Escribir la respuesta" control={<Seg options={[[true, "Sí"], [false, "No"]]} value={s.type} onChange={v => setSetting("type", v)} />}>
          Kod HR → ES upisuješ odgovor umjesto da samo okreneš karticu. Sporije, ali pamtiš i pravopis.
        </Row>
        <Row title="Palabras nuevas por día" control={<Seg options={[[10, "10"], [20, "20"], [40, "40"]]} value={s.newPerDay} onChange={v => setSetting("newPerDay", v)} />}>
          Koliko novih kartica dobiješ dnevno. Više = brže kroz gradivo, ali više ponavljanja idućih dana. Gradivo sa zadnjeg sata uvijek dolazi prvo.
        </Row>
      </Group>
      <Group title="Verbos" mark="pink">
        <Row title="Modo" control={<Seg options={[["type", "Escribir"], ["mc", "Elegir"]]} value={s.verbMode} onChange={v => setSetting("verbMode", v)} />}>
          Escribir: upisuješ oblik glagola (bolje pamćenje). Elegir: biraš između 4 ponuđena (brže, zgodno na mobitelu).
        </Row>
      </Group>
      <Group title="Objetivo" mark="blue">
        <Row title="Objetivo diario" control={<Seg options={[[30, "30"], [60, "60"], [100, "100"]]} value={s.goal} onChange={v => setSetting("goal", v)} />}>
          Dnevni cilj u bodovima (XP). Točan odgovor daje 2–3 XP. 60 XP je otprilike 10 minuta. Niz (racha) raste svaki dan kad vježbaš.
        </Row>
      </Group>
      <Group title="Voz" mark="blue">
        <Row title="Velocidad" control={<Seg options={[[false, "Normal"], [true, "Lenta"]]} value={s.slow} onChange={v => setSetting("slow", v)} />}>Lenta pomaže kod dugih rečenica, brojeva i diktata.</Row>
        <div className="stack">
          <div className="row" style={{ justifyContent: "space-between" }}><b>Voz</b><button className="btn ghost" onClick={() => speak("¡Hola! Me llamo Paco y soy un pulpo.")}>Probar</button></div>
          <VoicePicker />
          <p className="hint">Glas dolazi s tvog uređaja. Najbolji imaju oznaku Natural, Online, Enhanced ili Google. iPhone: Postavke → Pristupačnost → Izgovoreni sadržaj → Glasovi → Español (España) → Mónica (Enhanced). Android: Speech Services by Google → preuzmi španjolski. Računalo: Edge ima dobre Natural glasove.</p>
        </div>
      </Group>
      <Group title="Otros" mark="yellow">
        <Row title="Teclado" control={<span />}>Enter = dalje · 1–4 = odgovor ili ocjena · razmak = okreni karticu.</Row>
        <Row title="Borrar progreso" control={confirm
          ? <div className="row"><button className="btn" onClick={() => { resetProgress(); setConfirm(false); }}>Sí, borrar</button><button className="btn ghost" onClick={() => setConfirm(false)}>Cancelar</button></div>
          : <button className="btn ghost" onClick={() => setConfirm(true)}>Borrar progreso</button>}>
          Briše kartice, bodove i rekorde na svim uređajima. Postavke ostaju.
        </Row>
      </Group>
    </section>
  );
}
