import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { fadeUp, viewport } from "@/animations/variants";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
}

/** Generic scroll-reveal wrapper for anything that doesn't need its own
 * bespoke animation — a paragraph, an image, a stat. Fires once, a little
 * ahead of the viewport edge (see `viewport` in animations/variants). */
export function Reveal({ children, variants = fadeUp, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
