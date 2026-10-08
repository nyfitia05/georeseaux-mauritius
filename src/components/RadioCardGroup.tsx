import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface RadioCardGroupProps {
  name: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

/**
 * "Type de besoin" as six visible, selectable cards rather than a hidden
 * <select> — with only six mutually exclusive options, showing them all is
 * both more premium and easier to scan than a dropdown, and avoids adding a
 * Radix/shadcn select just to reproduce what six radio inputs already do
 * natively and accessibly.
 */
export function RadioCardGroup({ name, options, value, onChange }: RadioCardGroupProps) {
  const groupId = useId();

  return (
    <div role="radiogroup" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => {
        const id = `${groupId}-${option}`;
        const checked = value === option;
        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3.5 text-sm font-medium transition-all duration-200",
              checked
                ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                : "border-blue-100 text-ink-soft hover:border-blue-300 hover:bg-blue-50/40",
            )}
          >
            <input
              type="radio"
              id={id}
              name={name}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                checked ? "border-blue-600 bg-blue-600" : "border-blue-200",
              )}
              aria-hidden
            >
              {checked && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
            </span>
            {option}
          </label>
        );
      })}
    </div>
  );
}
