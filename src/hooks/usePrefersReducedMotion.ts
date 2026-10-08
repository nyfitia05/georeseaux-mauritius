import { useEffect, useState } from "react";

/** Tracks the visitor's `prefers-reduced-motion` setting live, so animated
 * components can swap to a short fade instead of skipping the transition
 * detection outright (the setting can also change mid-session on some OSes). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);

  return reduced;
}
