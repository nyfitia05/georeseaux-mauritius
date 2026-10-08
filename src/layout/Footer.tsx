import type { CSSProperties } from "react";
import { brand, footer } from "@/data/content";
import { t } from "@/lib/lang";

/** Pied de page commun aux sites Water Leak (même modèle sur Group, Expert,
 * Academy, Equipment et ici) : logo + adresse | TAN / BRN / société | liens
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

      <div className="wlf-legal">
        <p>
          <strong>TAN :</strong> 28535794
        </p>
        <p>
          <strong>BRN :</strong> C234653
        </p>
        <p>WATER LEAK CO LTD</p>
      </div>

      <ul className="wlf-links" aria-label={t("Sites du groupe Water Leak", "Water Leak group websites")}>
        {footer.links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className="wlf-contact">
        <a href={brand.phoneHref} className="wlf-phone">
          {brand.phone}
        </a>
      </div>
    </footer>
  );
}
