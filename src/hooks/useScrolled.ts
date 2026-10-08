import { useEffect, useState } from "react";

/** True once the page has scrolled past `threshold` — drives the navbar's
 * transition from a transparent, hero-integrated bar to a compact, opaque
 * one. Uses a passive listener and a boolean flip rather than tracking the
 * raw scroll position, since the navbar only ever needs the two states. */
export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
