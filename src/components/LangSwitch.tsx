import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { lang, pathFor, type Lang } from "@/lib/lang";

const OPTIONS: { code: Lang; label: string; title: string }[] = [
  { code: "fr", label: "FR", title: "Français" },
  { code: "en", label: "EN", title: "English" },
];

/** Bouton FR / EN, même principe que sur les autres sites Water Leak :
 * deux pastilles, la langue active en jaune. Ce sont de vrais liens vers la
 * même page dans l'autre langue (/... ou /en/...), lisibles par Google. */
export function LangSwitch({ className }: { className?: string }) {
  // Dans le routeur, pathname est déjà sans le préfixe /en.
  const { pathname, search, hash } = useLocation();
  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Langue"}
      className={cn("flex items-center gap-1 rounded-full bg-blue-50 p-1", className)}
    >
      {OPTIONS.map((option) => {
        const active = option.code === lang;
        return (
          <a
            key={option.code}
            href={pathFor(option.code, pathname) + search + hash}
            hrefLang={option.code}
            lang={option.code}
            title={option.title}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition-colors duration-200",
              active ? "bg-yellow-500 text-blue-900" : "text-ink-soft hover:text-blue-700",
            )}
          >
            {option.label}
          </a>
        );
      })}
    </div>
  );
}
