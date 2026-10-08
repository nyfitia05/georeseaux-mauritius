import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { LogoLockup } from "@/components/ui/Logo";
import { NewsletterInput } from "./NewsletterInput";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_HREF, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-brand-blue">
      <div className="container-content grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:py-14">
        <div>
          <LogoLockup variant="white" />
        </div>

        <nav aria-label="Liens du site" className="flex flex-col gap-2.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-body text-[15px] font-semibold text-white/90 transition-colors hover:text-brand-yellow"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5">
          <a
            href={`tel:${CONTACT_PHONE_HREF}`}
            className="flex items-center gap-2.5 text-[15px] font-semibold text-white/90 transition-colors hover:text-brand-yellow"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            {CONTACT_PHONE}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2.5 text-[15px] font-semibold text-white/90 transition-colors hover:text-brand-yellow"
          >
            <Mail className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
            {CONTACT_EMAIL}
          </a>
        </div>

        <div className="max-w-xs">
          <NewsletterInput />
        </div>
      </div>

      <div className="border-t border-white/15 py-4">
        <p className="container-content text-center text-xs text-white/60">
          © {new Date().getFullYear()} GEORESEAUX MAURITIUS. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
