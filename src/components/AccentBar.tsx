/** buttons that insert Spanish characters at the cursor of `inputRef` */
export const AccentBar = ({ inputRef }: { inputRef: React.RefObject<HTMLInputElement> }) => {
  return (
    <div className="accents" role="group" aria-label="Acentos">
      {"áéíóúñü¿¡".split("").map(ch => (
        <button
          key={ch}
          type="button"
          onClick={() => {
            const el = inputRef.current;
            if (!el) return;
            const s = el.selectionStart ?? el.value.length,
              e = el.selectionEnd ?? s;
            const v = el.value.slice(0, s) + ch + el.value.slice(e);
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
            setter.call(el, v);
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.focus();
            el.setSelectionRange(s + 1, s + 1);
          }}
        >
          {ch}
        </button>
      ))}
    </div>
  );
};
