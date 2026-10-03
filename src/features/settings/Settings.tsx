import { useState } from "react";
import { resetProgress, setSetting, useSettings } from "../../lib/store";
import { speak } from "../../lib/speech";
import { LEVELS, levelHasContent } from "../../lib/level";
import { customCards } from "../../lib/cards";
import { Ic } from "../../components/icons";
import { Seg } from "../../components/Seg";
import { useNav } from "../../app/navigation";
import { Account } from "./Account";
import { Backup } from "./Backup";
import { LevelPicker } from "./LevelPicker";
import { Notifications } from "./Notifications";
import { VoicePicker } from "./VoicePicker";
import { Group, Row } from "./SettingsLayout";
import "./settings.css";

export const Settings = () => {
  const s = useSettings();
  const { go } = useNav();
  const [confirm, setConfirm] = useState(false);
  const mine = customCards().length;
  return (
    <section className="view">
      <h1>Ajustes</h1>
      <p className="hint">Objašnjenja postavki uvijek su na hrvatskom.</p>
      <Group title="Cuenta y progreso" mark="green">
        <Account />
        <details>
          <summary>Copia de seguridad</summary>
          <p className="hint">Rezervni način prijenosa bez prijave: kopiraj kod na jednom uređaju i učitaj ga na drugom. Spajanje ne briše ništa.</p>
          <Backup />
        </details>
      </Group>
      <Group title="Apariencia" mark="blue">
        <Row
          title="Tema"
          control={
            <Seg
              label="Tema"
              options={[
                ["auto", "Auto"],
                ["light", "Claro"],
                ["dark", "Oscuro"],
              ]}
              value={s.theme}
              onChange={v => setSetting("theme", v)}
            />
          }
        >
          Auto prati postavku uređaja (svijetlo danju, tamno noću ako je tako podešeno).
        </Row>
        <Row
          title="Traducción al croata"
          control={
            <Seg
              label="Traducción al croata"
              options={[
                [true, "Visible"],
                [false, "Al tocar"],
              ]}
              value={s.tips}
              onChange={v => setSetting("tips", v)}
            />
          }
        >
          Visible: hrvatska objašnjenja odmah su na ekranu. Al tocar: skrivena su iza male ikone prijevoda pa ih otvoriš samo kad ne razumiješ — više
          španjolskog, manje čitanja.
        </Row>
      </Group>
      <Group title="Nivel" mark="yellow">
        <Row title="Contenido" control={<LevelPicker />}>
          Koje razine vježbaš. «Todos» = sve izmiješano. Vrijedi za kartice, glagole, pravila, priče i chuletu. Tvoje riječi (Mis palabras) uvijek su uključene.
          {LEVELS.some(l => !levelHasContent(l.id)) && " Razine bez gradiva još su sive."}
        </Row>
      </Group>
      <Group title="Notificaciones" mark="pink">
        <Notifications />
      </Group>
      <Group title="Tarjetas" mark="green">
        <Row
          title="Dirección"
          control={
            <Seg
              options={[
                ["es", "ES → HR"],
                ["hr", "HR → ES"],
                ["mix", "Mezcla"],
              ]}
              value={s.dir}
              onChange={v => setSetting("dir", v)}
            />
          }
        >
          ES → HR: vidiš španjolski, prisjećaš se značenja (lakše). HR → ES: vidiš hrvatski, prisjećaš se španjolskog (teže, bolje za govor). Mezcla: nasumično.
        </Row>
        <Row
          title="Escribir la respuesta"
          control={
            <Seg
              options={[
                [true, "Sí"],
                [false, "No"],
              ]}
              value={s.type}
              onChange={v => setSetting("type", v)}
            />
          }
        >
          Kod HR → ES upisuješ odgovor umjesto da samo okreneš karticu. Sporije, ali pamtiš i pravopis.
        </Row>
        <Row
          title="Palabras nuevas por día"
          control={
            <Seg
              options={[
                [10, "10"],
                [20, "20"],
                [40, "40"],
              ]}
              value={s.newPerDay}
              onChange={v => setSetting("newPerDay", v)}
            />
          }
        >
          Koliko novih kartica dobiješ dnevno. Više = brže kroz gradivo, ali više ponavljanja idućih dana. Gradivo sa zadnjeg sata uvijek dolazi prvo.
        </Row>
        <Row
          title="Mis palabras"
          control={
            <button
              className="btn ghost"
              onClick={() => {
                go("tarjetas");
                window.setTimeout(() => document.getElementById("mis-palabras")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
              }}
            >
              {mine ? (
                <>
                  <Ic.edit /> Editar ({mine})
                </>
              ) : (
                <>
                  <Ic.plus /> Añadir
                </>
              )}
            </button>
          }
        >
          Dodaj vlastite riječi (npr. s nastave ili iz pjesme). Postaju zasebna tema i ponavljaju se kao i ostale kartice.
        </Row>
      </Group>
      <Group title="Verbos" mark="pink">
        <Row
          title="Modo"
          control={
            <Seg
              options={[
                ["type", "Escribir"],
                ["mc", "Elegir"],
              ]}
              value={s.verbMode}
              onChange={v => setSetting("verbMode", v)}
            />
          }
        >
          Escribir: upisuješ oblik glagola (bolje pamćenje). Elegir: biraš između 4 ponuđena (brže, zgodno na mobitelu).
        </Row>
      </Group>
      <Group title="Objetivo" mark="blue">
        <Row
          title="Objetivo diario"
          control={
            <Seg
              options={[
                [30, "30"],
                [60, "60"],
                [100, "100"],
              ]}
              value={s.goal}
              onChange={v => setSetting("goal", v)}
            />
          }
        >
          Dnevni cilj u bodovima (XP). Točan odgovor daje 2–3 XP. 60 XP je otprilike 10 minuta. Niz (racha) raste svaki dan kad vježbaš.
        </Row>
      </Group>
      <Group title="Voz" mark="blue">
        <Row
          title="Reproducir automáticamente"
          control={
            <Seg
              options={[
                [false, "No"],
                [true, "Sí"],
              ]}
              value={s.autoplay}
              onChange={v => setSetting("autoplay", v)}
            />
          }
        >
          Isključeno: zvuk se pušta samo kad dodirneš zvučnik. Uključeno: riječi i odgovori izgovaraju se sami.
        </Row>
        <Row
          title="Velocidad"
          control={
            <Seg
              options={[
                [false, "Normal"],
                [true, "Lenta"],
              ]}
              value={s.slow}
              onChange={v => setSetting("slow", v)}
            />
          }
        >
          Lenta pomaže kod dugih rečenica, brojeva i diktata.
        </Row>
        <div className="stack">
          <div className="row" style={{ justifyContent: "space-between" }}>
            <b>Voz</b>
            <button className="btn ghost" onClick={() => speak("¡Hola! Me llamo Paco y soy un pulpo.")}>
              <Ic.speak /> Probar
            </button>
          </div>
          <VoicePicker />
          <p className="hint">
            Glas dolazi s tvog uređaja. Najbolji imaju oznaku Natural, Online, Enhanced ili Google. iPhone: Postavke → Pristupačnost → Izgovoreni sadržaj →
            Glasovi → Español (España) → Mónica (Enhanced). Android: Speech Services by Google → preuzmi španjolski. Računalo: Edge ima dobre Natural glasove.
          </p>
        </div>
      </Group>
      <Group title="Otros" mark="yellow">
        <Row title="Teclado" control={<span />}>
          Enter = dalje · 1–4 = odgovor ili ocjena · razmak = okreni karticu.
        </Row>
        <Row
          title="Borrar progreso"
          control={
            confirm ? (
              <div className="row">
                <button
                  className="btn"
                  onClick={() => {
                    resetProgress();
                    setConfirm(false);
                  }}
                >
                  <Ic.trash /> Sí, borrar
                </button>
                <button className="btn ghost" onClick={() => setConfirm(false)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="btn ghost" onClick={() => setConfirm(true)}>
                <Ic.trash /> Borrar progreso
              </button>
            )
          }
        >
          Briše kartice, bodove i rekorde na svim uređajima. Postavke ostaju.
        </Row>
      </Group>
    </section>
  );
};
