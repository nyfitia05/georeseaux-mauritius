import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * Active un smooth scroll léger (Lenis) sur l'ensemble du site et le
 * synchronise avec la boucle GSAP/ScrollTrigger — c'est ce qui permet à la
 * section "Nos moyens d'investigation" de rester millimétrée pendant le
 * scroll fluide. Désactivé si l'utilisateur préfère les animations réduites.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
}
