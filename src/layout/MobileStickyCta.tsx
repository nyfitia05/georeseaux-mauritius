import { Button } from "@/components/Button";
import { nav } from "@/data/content";

/**
 * A permanent "Demander un devis" affordance on small screens, where the
 * primary CTA otherwise lives inside a closed hamburger menu — cahier des
 * charges développeur §10: "Bouton permanent « Demander un devis »". Hidden
 * on desktop, where the navbar's own CTA is always visible.
 */
export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-blue-100 bg-paper/95 p-3 backdrop-blur lg:hidden">
      <Button to={nav.devisCta.href} variant="primary" withArrow className="w-full justify-center">
        {nav.devisCta.label}
      </Button>
    </div>
  );
}
