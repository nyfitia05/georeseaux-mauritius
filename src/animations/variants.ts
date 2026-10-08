import type { Variants } from "framer-motion";

/**
 * Shared animation vocabulary for the site. Centralising timings and easing
 * here is what keeps every reveal, stagger and hover feeling like the same
 * hand designed it — a component should import from here rather than invent
 * its own duration or curve.
 */

export const EASE_SIGNATURE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SIGNATURE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: EASE_SIGNATURE } },
};

/** Reveals a group of children in sequence — used for the hero's word tags
 * and for card grids, so a set of related items arrives as one gesture
 * rather than as one long list of individually-timed elements. */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SIGNATURE },
  },
};

/** Hero title lines: a slightly larger vertical travel than the standard
 * fadeUp, so the title reads as the entrance's centrepiece rather than one
 * more revealed block. */
export const heroLine: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_SIGNATURE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SIGNATURE },
  },
};

/** Standard viewport trigger for scroll reveals: fires once, a little before
 * the element is fully on screen, so content is never seen popping in at the
 * very edge of the viewport. */
export const viewport = { once: true, margin: "-80px" } as const;
