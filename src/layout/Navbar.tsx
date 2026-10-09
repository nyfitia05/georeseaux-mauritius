import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/Button";
import { LangSwitch } from "@/components/LangSwitch";
import { t } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { brand, nav } from "@/data/content";

const navLinkBase = "font-display text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-blue-700";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const location = useLocation();

  // Close any open menu on route change, so a click that navigates doesn't
  // leave a stale dropdown or mobile panel hanging over the new page.
  useEffect(() => {
    setMobileOpen(false);
    setExpertisesOpen(false);
  }, [location.pathname]);

  return (
    // Fond blanc permanent (plus de variante transparente en haut de page) :
    // le header reste identique quel que soit le défilement, conformément à
    // la maquette de référence transmise par le client.
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_1px_0_rgba(18,24,43,0.08)]">
      {/* Barre en pleine largeur (pas de container-content ici) : le logo et
         la pastille téléphone doivent toucher les bords de l'écran, pas les
         bords d'une colonne centrée à 1320px — seul un petit padding de
         respiration est conservé. */}
      <div className="flex w-full items-center justify-between gap-6 px-5 py-3 sm:px-8">
        {/* Le lien garde h-14 / sm:h-16 (hauteur du header compensée par
           PageHero) ; le logo est plus petit à l'intérieur. */}
        <Link to="/" className="flex h-14 shrink-0 items-center sm:h-16">
          <img src="/img/Logolong.png" alt={brand.name} className="h-10 w-auto max-w-[52vw] object-contain sm:h-[48px] sm:max-w-none lg:h-11 xl:h-[48px]" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          <NavLink
            to={nav.accueil.href}
            end
            className={({ isActive }) => cn(navLinkBase, isActive && "text-blue-700")}
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
              className={cn(navLinkBase, "flex items-center gap-1")}
            >
              {nav.expertises.label}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expertisesOpen && "rotate-180")} aria-hidden />
            </button>
            <AnimatePresence>
              {expertisesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-sm bg-white shadow-xl ring-1 ring-blue-100">
                    {nav.expertises.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="block px-5 py-3.5 text-sm text-ink-soft transition-colors hover:bg-blue-50 hover:text-blue-700"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GEORESEAUX Monitoring vit désormais dans le menu déroulant
             Expertises ci-dessus (cf. data/content.ts) plutôt qu'en lien
             séparé, pour ne pas le lister deux fois dans la nav. */}
          {[nav.secteurs, nav.methodologie, nav.aPropos].map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => cn(navLinkBase, isActive && "text-blue-700")}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch />
          {/* Pastille téléphone jaune, cf. maquette de référence — remplace le
             bouton "Demander un devis" dans le header (retiré à la demande du
             client, conservé plus bas dans le menu mobile et ailleurs sur le
             site). Numéro à confirmer par le client (voir commentaire dans
             data/content.ts). */}
          {/* Visible à partir de 1280 px : entre 1024 et 1280 px, le menu en
             Poppins ne laisse pas la place au logo, au menu, au bouton FR/EN
             et au téléphone sur une seule ligne. Le numéro reste dans le
             footer. */}
          <a
            href={brand.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-yellow-500 px-4 py-2.5 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-400 xl:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            {brand.phone}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t("Fermer le menu", "Close menu") : t("Ouvrir le menu", "Open menu")}
          >
            {mobileOpen ? <X className="h-6 w-6 text-blue-700" /> : <Menu className="h-6 w-6 text-blue-700" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white lg:hidden"
          >
            <nav className="container-content flex flex-col gap-1 pb-6 pt-2">
              <Link to={nav.accueil.href} className="py-3 text-base font-medium text-ink">
                {nav.accueil.label}
              </Link>
              <p className="pt-3 text-xs font-semibold uppercase tracking-widest text-blue-400">{nav.expertises.label}</p>
              {nav.expertises.items.map((item) => (
                <Link key={item.href} to={item.href} className="py-2.5 pl-3 text-base text-ink-soft">
                  {item.label}
                </Link>
              ))}
              {[nav.secteurs, nav.methodologie, nav.aPropos].map((item) => (
                <Link key={item.href} to={item.href} className="py-3 text-base font-medium text-ink">
                  {item.label}
                </Link>
              ))}
              <a
                href={brand.phoneHref}
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-4 py-3 text-sm font-bold text-blue-900"
              >
                <Phone className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                {brand.phone}
              </a>
              <Button to={nav.devisCta.href} variant="primary" withArrow className="mt-3 justify-center">
                {nav.devisCta.label}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
