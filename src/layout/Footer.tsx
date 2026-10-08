import { Mail, Phone } from "lucide-react";
import { brand, footer } from "@/data/content";
import { t } from "@/lib/lang";

/** Pied de page aligné sur les autres sites Water Leak (Group, Expert,
 * Academy, Equipment) : logo et adresse à gauche, liens vers les entités du
 * groupe au centre, téléphone et e-mail à droite — aux couleurs GEORESEAUX
 * (pastille jaune, texte bleu). */
export function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white text-ink">
      <div className="container-content grid grid-cols-1 items-center gap-10 py-10 text-center lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        <div className="flex flex-col items-center">
          <img src="/img/Logolong.png" alt={brand.name} className="h-12 w-auto sm:h-14" />
          <address className="mt-4 text-base not-italic leading-relaxed text-ink-soft">
            {footer.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <nav aria-label={t("Sites du groupe Water Leak", "Water Leak group websites")}>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {footer.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-base font-medium text-ink-soft transition-colors hover:text-blue-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-3 lg:items-end">
          <a
            href={brand.phoneHref}
            className="flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-2.5 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-400"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            {brand.phone}
          </a>
          <a
            href={brand.emailHref}
            className="flex items-center gap-2 text-base font-medium text-ink transition-colors hover:text-blue-700"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
