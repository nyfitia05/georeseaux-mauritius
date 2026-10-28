import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { LangSwitch } from "@/components/LangSwitch";
import { t } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { brand, nav } from "@/data/content";

// En-tête refait en octobre 2026 sur le modèle de Water Leak Group / Water
// Leak Expert : barre blanche flottante aux bords flous (pas en pleine
// largeur), logo à gauche, menu au centre (Accueil + Nos expertises), téléphone
// et FR | EN à droite. Sur mobile : logo, FR | EN hors du burger, et le
// téléphone dans le menu déroulant.
const linkBase =
  "relative inline-flex items-center gap-1 px-4 py-2.5 font-display text-[15px] font-medium text-ink transition-colors duration-200 hover:text-blue-600";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setExpertisesOpen(false);
  }, [location.pathname]);

  const expertiseActive = nav.expertises.items.some((item) => location.pathname.startsWith(item.href));
  const groupLinks = [
    { label: "Group", href: "https://waterleakgroup.com/" },
    { label: "Academy", href: "https://waterleakacademy.com/" },
    { label: "Expert", href: "https://waterleakexpert.com/" },
    { label: "Monitoring", href: "https://waterleakmonitoring.com/" },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-2.5 z-50">
      <div
        className={cn(
          "pointer-events-auto mx-auto grid h-16 w-[calc(100%-24px)] max-w-[1400px] items-center gap-x-3.5 rounded-[18px] bg-white/[0.92] px-4 backdrop-blur-md",
          "grid-cols-[auto_1fr_auto] lg:h-[72px] lg:w-[calc(100%-48px)] lg:grid-cols-[1fr_auto_1fr] lg:px-7",
          "shadow-[0_0_22px_14px_rgba(255,255,255,0.6),0_10px_30px_rgba(36,69,151,0.08)]",
        )}
      >
        <Link to="/" className="flex shrink-0 items-center justify-self-start" aria-label={brand.name}>
          <img src="/img/Logolong.png" alt={brand.name} className="h-8 w-auto max-w-[48vw] object-contain lg:h-10" />
        </Link>

        {/* Menu centré (ordinateur) */}
        <nav className="hidden items-center lg:flex" aria-label={t("Menu principal", "Main menu")}>
          <NavLink
            to={nav.accueil.href}
            end
            className={({ isActive }) => cn(linkBase, isActive && "text-blue-600 after:absolute after:inset-x-4 after:bottom-0.5 after:h-0.5 after:rounded after:bg-yellow-500")}
          >
            {nav.accueil.label}
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setExpertisesOpen(true)}
            onMouseLeave={() => setExpertisesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setExpertisesOpen((v) => !v)}
              aria-expanded={expertisesOpen}
              aria-haspopup="true"
              className={cn(linkBase, expertiseActive && "text-blue-600 after:absolute after:inset-x-4 after:bottom-0.5 after:h-0.5 after:rounded after:bg-yellow-500")}
            >
              {nav.expertises.label}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expertisesOpen && "rotate-180")} strokeWidth={2.4} aria-hidden />
            </button>
            <AnimatePresence>
              {expertisesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full pt-2"
                >
                  <div className="min-w-[300px] bg-white p-2 shadow-[0_18px_40px_rgba(16,29,64,0.14)]">
                    {nav.expertises.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex whitespace-nowrap px-3.5 py-2.5 font-display text-sm font-medium text-ink transition-colors hover:bg-blue-50 hover:text-blue-600"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {groupLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkBase}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Droite : téléphone + FR | EN (ordinateur), FR | EN seul (mobile) */}
        <div className="flex items-center gap-5 justify-self-start lg:justify-self-end">
          <a
            href={brand.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-yellow-500 px-5 py-2.5 text-base font-bold text-blue-900 transition-colors hover:bg-yellow-400 lg:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            {brand.phone}
          </a>
          <LangSwitch />
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? t("Fermer le menu", "Close menu") : t("Ouvrir le menu", "Open menu")}
          className="flex flex-col gap-[5px] justify-self-end p-1.5 lg:hidden"
        >
          <span className={cn("block h-[3px] w-[26px] rounded bg-ink transition-transform duration-300", mobileOpen && "translate-y-2 rotate-45")} />
          <span className={cn("block h-[3px] w-[26px] rounded bg-ink transition-opacity duration-300", mobileOpen && "opacity-0")} />
          <span className={cn("block h-[3px] w-[26px] rounded bg-ink transition-transform duration-300", mobileOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mx-3 mt-2 flex max-h-[calc(100vh-100px)] flex-col overflow-y-auto bg-white shadow-[0_18px_40px_rgba(16,29,64,0.14)] lg:hidden"
            aria-label={t("Menu principal", "Main menu")}
          >
            <div className="px-5 py-3.5">
              <a
                href={brand.phoneHref}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-yellow-500 px-4 py-3 text-[17px] font-bold text-blue-900"
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                {brand.phone}
              </a>
            </div>
            <Link to={nav.accueil.href} className="border-b border-blue-50 px-5 py-3.5 font-display text-base font-medium text-ink">
              {nav.accueil.label}
            </Link>
            <span className="px-5 pb-1 pt-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-ink-soft">
              {nav.expertises.label}
            </span>
            {nav.expertises.items.map((item) => (
              <Link key={item.href} to={item.href} className="border-b border-blue-50 py-3 pl-9 pr-5 text-[15px] text-ink">
                {item.label}
              </Link>
            ))}
            {groupLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-blue-50 py-3 pl-9 pr-5 text-[15px] text-ink"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
