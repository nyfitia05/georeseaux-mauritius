import { useRef } from "react";
import { useDrawOnScroll } from "@/animations/useDrawOnScroll";
import { cn } from "@/lib/utils";

type Variant = "route" | "grid" | "network";

interface MapMotifProps {
  variant?: Variant;
  className?: string;
  animated?: boolean;
}

/**
 * The site's single recurring graphic idea: a cartographic fil conducteur —
 * a tracé, a grid, a set of connected points — rendered in one flat tone so
 * it always reads as "plan", never as a decorative texture. It changes shape
 * per section (see `variant`) instead of repeating identically everywhere,
 * which is what keeps it feeling like a system rather than a background
 * pattern applied by default.
 *
 * Purely decorative: hidden from assistive tech via aria-hidden.
 */
export function MapMotif({ variant = "route", className, animated = true }: MapMotifProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  useDrawOnScroll(animated ? pathRef : { current: null });

  if (variant === "grid") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className={cn("pointer-events-none", className)}
        preserveAspectRatio="none"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" stroke="currentColor" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="currentColor" strokeWidth="0.5" />
        ))}
        <circle cx="150" cy="200" r="4" fill="currentColor" />
        <circle cx="300" cy="100" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "network") {
    const nodes = [
      [40, 220],
      [140, 120],
      [230, 180],
      [320, 80],
      [360, 200],
    ];
    return (
      <svg aria-hidden viewBox="0 0 400 300" className={cn("pointer-events-none", className)}>
        <polyline points={nodes.map((p) => p.join(",")).join(" ")} fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === nodes.length - 1 ? 6 : 4} fill="currentColor" />
        ))}
      </svg>
    );
  }

  // "route" — the default: a single tracé with two waypoints, drawn on
  // scroll when `animated` is true.
  return (
    <svg aria-hidden viewBox="0 0 400 300" className={cn("pointer-events-none", className)}>
      <path
        ref={pathRef}
        d="M20 260 C 120 260, 100 120, 190 120 S 300 40, 380 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20" cy="260" r="4" fill="currentColor" />
      <circle cx="190" cy="120" r="4" fill="currentColor" />
      <circle cx="380" cy="40" r="6" fill="currentColor" />
    </svg>
  );
}
