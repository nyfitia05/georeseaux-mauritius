import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE_SIGNATURE } from "@/animations/variants";
import { cn } from "@/lib/utils";
import type { CardItem } from "@/data/content";

interface ExpertiseItem extends CardItem {
  image: string;
  href: string;
}

interface ExpertiseShowcaseProps {
  items: ExpertiseItem[];
}

/**
 * The four core expertises get a sequential-discovery interaction instead of
 * four identical static cards: one is "open" at a time, its photo and
 * description shown in a shared panel that links through to that expertise's
 * own page. The active item follows the cursor (hover/focus) as before, and
 * now also follows scroll position — as the list scrolls past the
 * viewport's centre, the row nearest it becomes active — so the panel keeps
 * up on touch devices and long reads, not only on pointer hover.
 */
export function ExpertiseShowcase({ items }: ExpertiseShowcaseProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const current = items[active];
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    // Only drive the active state from scroll while the user isn't already
    // hovering/focusing a specific row — otherwise an incidental scroll
    // could fight the cursor's choice.
    if (hovering) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = itemRefs.current?.findIndex((el) => el === entry.target) ?? -1;
          if (index !== -1) setActive(index);
        }
      },
      // A thin horizontal band through the vertical centre of the viewport:
      // whichever row crosses it while scrolling becomes the active one.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    itemRefs.current?.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [hovering, items.length]);

  return (
    <div
      className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-4"
      onMouseLeave={() => setHovering(false)}
    >
      <ul className="divide-y divide-blue-100 border-t border-blue-100 lg:border-t-0">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li
              key={item.title}
              ref={(el: HTMLLIElement | null) => {
                if (itemRefs.current) itemRefs.current[index] = el;
              }}
            >
              <Link
                to={item.href}
                onMouseEnter={() => {
                  setHovering(true);
                  setActive(index);
                }}
                onFocus={() => {
                  setHovering(true);
                  setActive(index);
                }}
                aria-current={isActive}
                className={cn(
                  "group flex w-full items-center justify-between gap-4 border-b border-blue-100 py-5 text-left transition-colors lg:border-b-0",
                  isActive ? "text-blue-700" : "text-ink-soft hover:text-blue-600",
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-display text-sm text-yellow-600">0{index + 1}</span>
                  <span className="font-display text-xl sm:text-2xl">{item.title}</span>
                </span>
                <ArrowUpRight
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform duration-300",
                    isActive ? "translate-x-0 translate-y-0 opacity-100" : "-translate-y-1 translate-x-1 opacity-0 group-hover:opacity-60",
                  )}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        to={current.href}
        className="group relative block min-h-[280px] overflow-hidden rounded-sm bg-blue-900 sm:min-h-[360px]"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/25 to-transparent transition-opacity duration-300 group-hover:from-blue-900" />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: EASE_SIGNATURE }}
            className="absolute inset-x-0 bottom-0 p-8 sm:p-10"
          >
            <p className="font-display text-2xl font-semibold text-white sm:text-3xl">{current.title}</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-blue-50">{current.text}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.08em] text-yellow-400">
              En savoir plus
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </span>
          </motion.div>
        </AnimatePresence>
      </Link>
    </div>
  );
}
