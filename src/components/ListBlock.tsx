import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface ListBlockProps {
  items: string[];
  columns?: 1 | 2 | 3;
  className?: string;
}

/** A plain textual list ("Restitutions possibles", "Nos engagements"…)
 * rendered as a checked list rather than default browser bullets, so it
 * reads as a set of concrete deliverables/commitments instead of a wall of
 * text — without adding any wording that wasn't in the source list. */
export function ListBlock({ items, columns = 1, className }: ListBlockProps) {
  return (
    <motion.ul
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-3",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <motion.li key={item} variants={staggerItem} className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" strokeWidth={3} aria-hidden />
          <span className="text-base leading-relaxed text-ink-soft">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
