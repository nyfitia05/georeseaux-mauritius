import { cn } from "@/lib/utils";
import { lang, setLang, type Lang } from "@/lib/lang";

const OPTIONS: { code: Lang; label: string; title: string }[] = [
  { code: "fr", label: "FR", title: "Français" },
  { code: "en", label: "EN", title: "English" },
];

/** Bouton FR / EN, même principe que sur les autres sites Water Leak :
 * deux pastilles, la langue active en jaune. */
export function LangSwitch({ className }: { className?: string }) {
  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Langue"}
      className={cn("flex items-center gap-1 rounded-full bg-blue-50 p-1", className)}
    >
      {OPTIONS.map((option) => {
        const active = option.code === lang;
        return (
          <button
            key={option.code}
            type="button"
            title={option.title}
            aria-pressed={active}
            onClick={() => setLang(option.code)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-colors duration-200",
              active ? "bg-yellow-500 text-blue-900" : "text-ink-soft hover:text-blue-700",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
