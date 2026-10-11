import { useState } from "react";
import { exportCode, importCode } from "../../lib/store";
import { Ic } from "../../components/icons";

export const Backup = () => {
  const [txt, setTxt] = useState(""),
    [msg, setMsg] = useState("");
  return (
    <div className="stack">
      <div className="row">
        <button
          className="btn ghost"
          onClick={async () => {
            const c = exportCode();
            setTxt(c);
            try {
              await navigator.clipboard.writeText(c);
              setMsg("Kod je kopiran. Spremi ga negdje sigurno.");
            } catch {
              setMsg("Kod je u polju. Označi ga i kopiraj.");
            }
          }}
        >
          <Ic.copy /> Copiar código
        </button>
        <button
          className="btn ghost"
          onClick={() => {
            try {
              importCode(txt);
              setMsg("Napredak je učitan i spojen s postojećim.");
            } catch {
              setMsg("Kod nije ispravan. Zalijepi cijeli kod.");
            }
          }}
        >
          <Ic.load /> Cargar código
        </button>
      </div>
      <textarea
        id="backup-text"
        className="answer-input"
        rows={3}
        style={{ font: "500 .8rem var(--f-mono)", minHeight: 80 }}
        placeholder="Pega aquí tu código…"
        value={txt}
        onChange={e => setTxt(e.target.value)}
        aria-label="Código de copia"
      />
      {msg && (
        <p className="hint" role="status">
          {msg}
        </p>
      )}
    </div>
  );
};
