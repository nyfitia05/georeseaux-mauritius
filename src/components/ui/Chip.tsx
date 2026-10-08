import clsx from "clsx";

type ChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

/** Pastille de sélection (type de demande) — état actif bleu, inactif neutre. */
export function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onClick}
      className={clsx(
        "rounded-pill border px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-premium",
        selected
          ? "border-brand-blue bg-brand-blue text-white"
          : "border-ink-300 bg-white text-ink-700 hover:border-brand-blue hover:text-brand-blue"
      )}
    >
      {label}
    </button>
  );
}
