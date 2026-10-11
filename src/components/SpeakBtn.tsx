import { speak } from "../lib/speech";
import { Ic } from "./icons";

/** round speaker button that says `text` in Spanish */
export const SpeakBtn = ({ text, label = "Escuchar" }: { text: string; label?: string }) => {
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={label}
      title={label}
      onClick={e => {
        e.stopPropagation();
        speak(text);
      }}
    >
      <Ic.speak />
    </button>
  );
};
