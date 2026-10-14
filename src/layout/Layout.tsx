import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileStickyCta } from "./MobileStickyCta";
import { nav } from "@/data/content";

export function Layout() {
  const { pathname } = useLocation();
  // Hide the sticky "Demander un devis" bar on the devis page itself — the
  // form's own submit button already serves that role there, and floating a
  // second, identically-worded CTA over it would only confuse the page it's
  // meant to lead to.
  const showStickyCta = pathname !== nav.devisCta.href;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // Adresse "officielle" de chaque page pour Google (balise canonical) :
  // sans ça, toutes les pages se déclaraient comme étant la page d'accueil.
  useEffect(() => {
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const url = "https://www.georeseauxmauritius.com" + path;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", url);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Espace sous le footer sur mobile, pour que la barre "Demander un
         devis" fixée en bas de l'écran ne cache pas le bas du footer. */}
      {showStickyCta && <div className="h-20 lg:hidden" aria-hidden />}
      {showStickyCta && <MobileStickyCta />}
    </div>
  );
}
