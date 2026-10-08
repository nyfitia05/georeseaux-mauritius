import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { cn } from "@/lib/utils";
import type { CardItem } from "@/data/content";

interface CardGridProps {
  items: CardItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * A grid of short cards, uniform white tiles — le client a demandé de
 * retirer le traitement bleu appliqué à une carte sur trois.
 */
export function CardGrid({ items, columns = 2, className }: CardGridProps) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[
    columns
  ];

  return (
    <motion.ul
      variants={staggerContainer(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn("grid grid-cols-1 gap-4", cols, className)}
    >
      {items.map((item) => (
        <motion.li key={item.title} variants={staggerItem} className="rounded-sm bg-white p-6 text-ink transition-colors duration-300">
          <h3 className="font-display text-lg font-semibold text-blue-700">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
