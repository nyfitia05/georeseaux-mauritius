import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxCardGroupProps {
  name: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
}

/**
 * Multi-select twin of RadioCardGroup — even visual vocabulary (bordered
 * card, filled indicator, same spacing/grid) but a square check indicator
 * instead of a circle, and toggling instead of exclusive selection, for the
 * "Préparer mon devis" form sections where several answers can apply at once
 * (réseaux concernés, objet de l'intervention, documents disponibles…).
 */
export function CheckboxCardGroup({ name, options, values, onChange }: CheckboxCardGroupProps) {
  const groupId = useId();

  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <div role="group" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {options.map((option) => {
        const id = `${groupId}-${option}`;
        const checked = values.includes(option);
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
              type="checkbox"
              id={id}
              name={name}
              value={option}
              checked={checked}
              onChange={() => toggle(option)}
              className="sr-only"
            />
            <span
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors",
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
