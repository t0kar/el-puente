import { RATES, type Reader } from "../../hooks/useReader";
import { Ic } from "../../components/icons";
import { Seg } from "../../components/Seg";

/** controls of the read-along player (shown while reading) */
export const ReaderBar = ({ rd }: { rd: Reader }) => {
  const playing = rd.status === "playing";
  if (rd.status === "idle") return null;
  const n = rd.sentences.length;
  return (
    <div className="readerbar" role="toolbar" aria-label="Lectura">
      <div className="rb-row">
        <button className="icon-btn" aria-label="Frase anterior" title="Frase anterior" onClick={rd.prev} disabled={rd.idx === 0}>
          <Ic.prevS />
        </button>
        <button className="icon-btn rb-main" aria-label={playing ? "Pausa" : "Continuar"} title={playing ? "Pausa" : "Continuar"} onClick={rd.toggle}>
          {playing ? <Ic.pause /> : <Ic.play />}
        </button>
        <button className="icon-btn" aria-label="Frase siguiente" title="Frase siguiente" onClick={rd.next} disabled={rd.idx >= n - 1}>
          <Ic.nextS />
        </button>
        <button className="icon-btn" aria-label="Parar" title="Parar" onClick={rd.stop}>
          <Ic.stop />
        </button>
        <span className="rb-pos" aria-label={`Frase ${rd.idx + 1} de ${n}`}>
          <span className="rb-lbl">Frase </span>
          <b>{rd.idx + 1}</b> / {n}
        </span>
      </div>
      <div className="rb-row">
        <Seg label="Velocidad" options={RATES.map(([v, t]) => [v, t] as [number, string])} value={rd.rate} onChange={rd.setRate} />
        <span className="rb-bar" aria-hidden="true">
          <i style={{ width: (100 * (rd.idx + (playing ? 0.5 : 0))) / n + "%" }} />
        </span>
      </div>
    </div>
  );
};
