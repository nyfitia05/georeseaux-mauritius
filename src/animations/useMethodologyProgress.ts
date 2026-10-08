import { useEffect, type RefObject } from "react";
import { ScrollTrigger } from "./gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Ties the methodology's connecting line to scroll position: as the visitor
 * scrolls through the steps container, `--progress` (0 → 1) is written onto
 * it, and every step marked with `data-step-index` lights up once progress
 * passes its own threshold. The component stays a plain CSS consumer of
 * `--progress` — this hook only owns the scroll math.
 */
export function useMethodologyProgress(containerRef: RefObject<HTMLElement | null>, stepCount: number) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || stepCount === 0) return;

    if (reducedMotion) {
      container.style.setProperty("--progress", "1");
      container.querySelectorAll<HTMLElement>("[data-step-index]").forEach((el) => el.classList.add("is-active"));
      return;
    }

    container.style.setProperty("--progress", "0");

    const steps = Array.from(container.querySelectorAll<HTMLElement>("[data-step-index]"));

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      end: "bottom 40%",
      scrub: 0.6,
      onUpdate: (self: { progress: number }) => {
        const progress = self.progress;
        container.style.setProperty("--progress", progress.toFixed(4));
        const activeCount = Math.round(progress * stepCount);
        steps.forEach((el) => {
          const stepIndex = Number(el.dataset.stepIndex ?? -1);
          el.classList.toggle("is-active", stepIndex < activeCount);
        });
      },
    });

    return () => trigger.kill();
  }, [containerRef, reducedMotion, stepCount]);
}
