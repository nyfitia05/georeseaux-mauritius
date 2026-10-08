import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Draws an SVG path as the visitor scrolls it into view — used for the
 * cartographic motif (a plan's tracé, not a decorative flourish). GSAP earns
 * its place here specifically because ScrollTrigger's scrub ties the
 * drawing to scroll position itself, which Framer Motion's viewport
 * triggers don't do as cleanly.
 *
 * With reduced motion requested, the path is simply shown fully drawn.
 */
export function useDrawOnScroll(pathRef: RefObject<SVGPathElement | null>, scrub: number | boolean = 0.6) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    if (reducedMotion) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = "0";
      return;
    }

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: path,
        start: "top 85%",
        end: "bottom 55%",
        scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pathRef, reducedMotion, scrub]);
}
