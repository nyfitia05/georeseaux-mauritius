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

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className={showStickyCta ? "flex-1 pb-20 lg:pb-0" : "flex-1"}>
        <Outlet />
      </main>
      <Footer />
      {showStickyCta && <MobileStickyCta />}
    </div>
  );
}
