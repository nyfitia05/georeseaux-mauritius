import type { ElementType, ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  as?: ElementType;
  align?: "left" | "center";
  /** "light" for a light-background section (default), "dark" when the
   * section sits on a blue field — controls the eyebrow and heading colour
   * explicitly rather than relying on text-color inheritance. */
  tone?: "light" | "dark";
  children: ReactNode;
  className?: string;
}

/** Standard section title: an optional small eyebrow label above a large
 * display heading, revealed once as the section enters view. `as` controls
 * the heading level so each page keeps a single H1 while every section title
 * underneath it is an H2 (or H3 for a nested sub-section). */
export function SectionHeading({
  eyebrow,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  children,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(align === "center" && "text-center", className)}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", tone === "dark" && "text-yellow-400")}>{eyebrow}</p>
      )}
      <Tag
        className={cn(
          "text-[30px] leading-[1.25]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
