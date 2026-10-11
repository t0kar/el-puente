import { useEffect, useState } from "react";
import { setSetting } from "../../lib/store";
import { esVoices, onVoices, pickVoice, speak, currentVoice } from "../../lib/speech";

export const VoicePicker = () => {
  const [, setV] = useState(0);
  useEffect(() => onVoices(() => setV(v => v + 1)), []);
  const cur = currentVoice();
  return (
    <select
      id="voice-pick"
      className="answer-input"
      style={{ fontSize: ".95rem", minHeight: 44, padding: 8 }}
      aria-label="Voz"
      value={cur?.voiceURI || ""}
      onChange={e => {
        setSetting("voice", e.target.value);
        pickVoice();
        speak("¡Hola! Me llamo Paco y soy un pulpo.");
      }}
    >
      {esVoices.length ? (
        esVoices.map(v => (
          <option key={v.voiceURI} value={v.voiceURI}>
            {v.name.replace(/Microsoft |Google /, "")} · {v.lang}
          </option>
        ))
      ) : (
        <option value="">No hay voces en español</option>
      )}
    </select>
  );
};
