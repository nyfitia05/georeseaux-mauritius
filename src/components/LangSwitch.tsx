import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { lang, pathFor, type Lang } from "@/lib/lang";

const OPTIONS: { code: Lang; label: string; title: string }[] = [
  { code: "fr", label: "FR", title: "Français" },
  { code: "en", label: "EN", title: "English" },
];

/** FR | EN, même principe que sur Water Leak Group et Water Leak Expert :
 * texte simple séparé par une barre, la langue active en bleu. Ce sont de
 * vrais liens vers la même page dans l'autre langue (/... ou /en/...),
 * lisibles par Google. */
export function LangSwitch({ className }: { className?: string }) {
  // Dans le routeur, pathname est déjà sans le préfixe /en.
  const { pathname, search, hash } = useLocation();
  return (
    <div
      role="group"
      aria-label={lang === "en" ? "Language" : "Langue"}
      className={cn("flex items-center gap-2 font-display text-[15px] font-semibold lg:text-sm", className)}
    >
      {OPTIONS.map((option, i) => {
        const active = option.code === lang;
        return (
          <span key={option.code} className="flex items-center gap-2">
            {i > 0 && <span className="font-normal text-[#b8bfd3]" aria-hidden>|</span>}
            <a
              href={pathFor(option.code, pathname) + search + hash}
              hrefLang={option.code}
              lang={option.code}
              title={option.title}
              aria-current={active ? "true" : undefined}
              className={cn("transition-colors duration-200", active ? "text-blue-600" : "text-ink-soft hover:text-blue-600")}
            >
              {option.label}
            </a>
          </span>
        );
      })}
    </div>
  );
}
