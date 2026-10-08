import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { LogoLockup } from "@/components/ui/Logo";
import { ButtonAnchor } from "@/components/ui/Button";
import { CONTACT_PHONE, CONTACT_PHONE_HREF, EXPERTISES } from "@/lib/constants";

interface NavItem {
  label: string;
  to: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
  { label: "Accueil", to: "/" },
  { label: "Expertises", to: "/expertises", hasDropdown: true },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
];

/**
 * Header — fond blanc en permanence (le hero commence sous le header, pas
 * derrière), avec juste une légère ombre qui apparaît au scroll pour donner
 * de la profondeur. Fidèle au PDF : pas de version "transparente sur photo".
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpertisesOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white transition-shadow duration-300 ease-premium",
        scrolled && "shadow-soft"
      )}
    >
      <div className="container-content flex h-[76px] items-center justify-between">
        <Link to="/" aria-label="GEORESEAUX MAURITIUS — accueil" onClick={() => setMobileOpen(false)}>
          <LogoLockup />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setExpertisesOpen(true)}
                onMouseLeave={() => setExpertisesOpen(false)}
                onFocus={() => setExpertisesOpen(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setExpertisesOpen(false);
                  }
                }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-1 font-body text-[15px] font-bold text-ink-900 transition-colors duration-200",
                      isActive && "text-brand-blue"
                    )
                  }
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                </NavLink>

                <AnimatePresence>
                  {expertisesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-1/2 top-full w-64 -translate-x-1/2 rounded-xl border border-ink-300/40 bg-white p-2 shadow-card"
                    >
                      {EXPERTISES.map((expertise) => (
                        <Link
                          key={expertise.id}
                          to={`/expertises#${expertise.id}`}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-brand-blue-light hover:text-brand-blue"
                        >
                          {expertise.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    "font-body text-[15px] font-bold text-ink-900 transition-colors duration-200",
                    isActive && "text-brand-blue"
                  )
                }
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <ButtonAnchor href={`tel:${CONTACT_PHONE_HREF}`} withArrow={false} className="px-5 py-2.5 text-sm">
            {CONTACT_PHONE}
          </ButtonAnchor>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white shadow-soft lg:hidden"
          >
            <nav className="container-content flex flex-col gap-1 py-4" aria-label="Navigation mobile">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      "rounded-lg px-3 py-3 text-base font-semibold text-ink-900",
                      isActive && "bg-brand-blue-light text-brand-blue"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {EXPERTISES.map((expertise) => (
                <Link
                  key={expertise.id}
                  to={`/expertises#${expertise.id}`}
                  className="rounded-lg px-3 py-2 pl-6 text-sm font-medium text-ink-700"
                >
                  {expertise.title}
                </Link>
              ))}
              <ButtonAnchor href={`tel:${CONTACT_PHONE_HREF}`} withArrow={false} className="mt-3 justify-center">
                {CONTACT_PHONE}
              </ButtonAnchor>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}