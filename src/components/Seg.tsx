/** segmented control (single choice). Options: [value, label, disabled?] */
export const Seg = <T extends string | number | boolean>({
  options,
  value,
  onChange,
  label,
}: {
  options: [T, string, boolean?][];
  value: T;
  onChange: (v: T) => void;
  label?: string;
}) => {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map(([v, t, off]) => (
        <button key={String(v)} type="button" aria-pressed={v === value} disabled={off} onClick={() => onChange(v)}>
          {t}
        </button>
      ))}
    </div>
  );
};
