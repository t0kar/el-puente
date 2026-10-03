import { useEffect, useState } from "react";
import { Ic } from "../../components/icons";
import { Seg } from "../../components/Seg";
import { useSync } from "../../hooks/useSync";
import { deviceSubscribed, disableOnDevice, enableOnDevice, needsInstall, permission, pushConfigured, pushSupported, testNotification } from "../../lib/push";
import { setSetting, useSettings } from "../../lib/store";
import { Row } from "./SettingsLayout";

type Kind = "remind" | "content";

/**
 * Push notifications: daily reminder and new class material. The device subscription is created when either
 * switch is turned on here and removed when both are off. Senders: scripts/remind.mjs, scripts/notify-content.mjs.
 */
export const Notifications = () => {
  const s = useSettings();
  const { user } = useSync();
  const [here, setHere] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    deviceSubscribed().then(setHere);
  }, [user]);

  if (!pushConfigured)
    return (
      <p className="hint" lang="hr">
        Obavijesti još nisu podešene (nedostaje VAPID ključ ili Firebase). Upute su u README-u.
      </p>
    );
  if (!pushSupported())
    return (
      <p className="hint" lang="hr">
        Ovaj preglednik ne podržava obavijesti.
      </p>
    );
  if (needsInstall())
    return (
      <p className="hint" lang="hr">
        Na iPhoneu i iPadu obavijesti rade samo kad je aplikacija na početnom zaslonu: u Safariju dodirni <b>Dijeli</b> → <b>Dodaj na početni zaslon</b>, otvori
        aplikaciju odande i vrati se ovdje.
      </p>
    );
  if (!user)
    return (
      <p className="hint" lang="hr">
        Prijavi se Google računom (gore, Cuenta y progreso) da bi uključio obavijesti.
      </p>
    );

  const isOn = (k: Kind) => (k === "remind" ? s.remind.on : s.notifyContent);
  const setOn = (k: Kind, v: boolean) => (k === "remind" ? setSetting("remind", { ...s.remind, on: v }) : setSetting("notifyContent", v));
  const run = async (f: () => Promise<string | void>) => {
    setBusy(true);
    setMsg("");
    const e = await f();
    setBusy(false);
    if (e) setMsg(e);
    setHere(await deviceSubscribed());
  };
  const toggle = (k: Kind, v: boolean) =>
    run(async () => {
      if (v && !here) {
        const e = await enableOnDevice();
        if (e) return e;
      }
      setOn(k, v);
      const other: Kind = k === "remind" ? "content" : "remind";
      if (!v && !isOn(other)) await disableOnDevice();
    });

  const anyOn = s.remind.on || s.notifyContent;
  const status =
    permission() === "denied"
      ? "Obavijesti su blokirane u pregledniku. Dopusti ih u postavkama stranice pa pokušaj ponovno."
      : here
        ? "Obavijesti stižu na ovaj uređaj."
        : anyOn
          ? "Ovaj uređaj još ne prima obavijesti. Uključi jednu od opcija da stižu i ovdje."
          : "";
  const value = (k: Kind) => isOn(k) && !!here;
  return (
    <div className="stack">
      <Row
        title="Recordatorio diario"
        control={
          <Seg
            label="Recordatorio diario"
            options={[
              [false, "No"],
              [true, "Sí"],
            ]}
            value={value("remind")}
            onChange={v => toggle("remind", v)}
          />
        }
      >
        Ako taj dan još nisi vježbao, u odabrano vrijeme stiže obavijest. Ako jesi, ne stiže ništa.
      </Row>
      {value("remind") && (
        <Row
          title="Hora"
          control={
            <input
              type="time"
              className="answer-input timepick"
              value={s.remind.time}
              step={900}
              onChange={e => e.target.value && setSetting("remind", { ...s.remind, time: e.target.value })}
              aria-label="Hora del recordatorio"
            />
          }
        >
          Obavijest može kasniti nekoliko minuta (šalje je automatski servis svakih 15 min).
        </Row>
      )}
      <Row
        title="Contenido nuevo"
        control={
          <Seg
            label="Contenido nuevo"
            options={[
              [false, "No"],
              [true, "Sí"],
            ]}
            value={value("content")}
            onChange={v => toggle("content", v)}
          />
        }
      >
        Obavijest kad se u aplikaciju doda gradivo s novog sata. Na početnoj stranici svejedno vidiš oznaku «Novedades».
      </Row>
      <div className="row">
        <button className="btn ghost" disabled={busy} onClick={() => run(testNotification)}>
          <Ic.bell /> Probar notificación
        </button>
      </div>
      {(msg || status) && (
        <p className="hint" role="status" lang="hr">
          {msg || status}
        </p>
      )}
    </div>
  );
};
