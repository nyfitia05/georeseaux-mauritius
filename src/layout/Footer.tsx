import type { CSSProperties } from "react";
import { Mail, Phone } from "lucide-react";
import { brand, footer } from "@/data/content";
import { t } from "@/lib/lang";

/** Pied de page commun aux sites Water Leak (même modèle sur Group, Expert,
 * Academy, Equipment et ici) : logo + adresse | société / BRN / TAN | liens
 * vers les autres sites | téléphone. Styles dans styles/globals.css
 * (bloc "FOOTER COMMUN WATER LEAK"), identiques aux sites en HTML. */
export function Footer() {
  return (
    <footer
      className="wl-footer"
      style={{ "--wlf-btn": "#FFD409", "--wlf-btn-text": "#101D40" } as CSSProperties}
    >
      <div className="wlf-brand">
        <a href="/" className="wlf-logo">
          <img src="/img/Logolong.png" alt={brand.name} />
        </a>
        <address className="wlf-addr">
          {footer.address.map((line, index) => (
            <span key={line}>
              {index > 0 && <br />}
              {line}
            </span>
          ))}
        </address>
      </div>

      <div className="wlf-mid">
        <ul className="wlf-links" aria-label={t("Sites du groupe Water Leak", "Water Leak group websites")}>
          {footer.links.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p className="wlf-legal-mini">
          WATER LEAK CO LTD<span className="sep">·</span>
          <strong>BRN :</strong> C234653<span className="sep">·</span>
          <strong>TAN :</strong> 28535794
        </p>
      </div>

      <div className="wlf-contact">
        {/* Même bouton que celui de l'en-tête (Navbar), à l'identique. */}
        <a
          href={brand.phoneHref}
          className="flex items-center gap-2 whitespace-nowrap rounded-full bg-yellow-500 px-4 py-2.5 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-400"
        >
          <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          {brand.phone}
        </a>
        <a href={brand.emailHref} className="wlf-email">
          <Mail aria-hidden />
          {brand.email}
        </a>
      </div>
    </footer>
  );
}
