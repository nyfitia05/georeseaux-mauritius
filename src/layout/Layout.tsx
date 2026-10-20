import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileStickyCta } from "./MobileStickyCta";
import { nav } from "@/data/content";
import { lang, pathFor } from "@/lib/lang";

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
  // Chaque page existe en français (/...) et en anglais (/en/...) : on indique
  // aussi à Google l'adresse de l'autre langue (balises hreflang).
  useEffect(() => {
    const SITE = "https://www.georeseauxmauritius.com";
    const path = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
    const urlFr = SITE + pathFor("fr", path);
    const urlEn = SITE + pathFor("en", path);
    const url = lang === "en" ? urlEn : urlFr;
    const setLink = (selector: string, attrs: Record<string, string>) => {
      let link = document.head.querySelector<HTMLLinkElement>(selector);
      if (!link) {
        link = document.createElement("link");
        document.head.appendChild(link);
      }
      for (const [k, v] of Object.entries(attrs)) link.setAttribute(k, v);
    };
    setLink('link[rel="canonical"]', { rel: "canonical", href: url });
    setLink('link[rel="alternate"][hreflang="fr"]', { rel: "alternate", hreflang: "fr", href: urlFr });
    setLink('link[rel="alternate"][hreflang="en"]', { rel: "alternate", hreflang: "en", href: urlEn });
    setLink('link[rel="alternate"][hreflang="x-default"]', { rel: "alternate", hreflang: "x-default", href: urlFr });
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "en" ? "en_MU" : "fr_MU");
    // Chaque page fixe son titre et sa description (composant <Seo>, exécuté
    // juste avant) : on recopie les deux pour le partage sur les réseaux sociaux.
    const desc = document.querySelector('meta[name="description"]')?.getAttribute("content");
    if (desc) document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
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
