import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import { cn } from "@/lib/utils";

interface FlowLineProps {
  steps: string[];
  className?: string;
  /** "pill" (par défaut) : chaque étape dans un badge bleu clair — traitement
   * d'origine. "plain" : texte noir nu à 25px, sans badge — demandé pour la
   * page Relevés & cartographie afin de coller au rendu de la plaquette
   * RELEVÉS_CARTOGRAPHIE.pdf ("Détection → Géoréférencement → Cartographie →
   * Documentation" y est en texte simple, pas en étiquettes colorées). */
  variant?: "pill" | "plain";
}

/** Renders a literal sequential process such as "DÉTECTER → LOCALISER →
 * CARTOGRAPHIER → MONITORER" as a real visual sequence rather than plain
 * text with arrow characters — each step is its own tag, connected by an
 * icon, staggered in on scroll. Used for every "X → Y → Z" line in the
 * cahier des charges. */
export function FlowLine({ steps, className, variant = "pill" }: FlowLineProps) {
  const plain = variant === "plain";
  return (
    <motion.ol
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={cn("flex flex-wrap items-center gap-x-3 gap-y-4", className)}
    >
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3">
          <motion.span
            variants={staggerItem}
            className={
              plain
                ? "text-[25px] font-semibold text-ink"
                : "rounded-sm bg-blue-50 px-4 py-2 text-sm font-semibold tracking-wide text-blue-700"
            }
          >
            {step}
          </motion.span>
          {index < steps.length - 1 && (
            <ArrowRight className={cn("shrink-0", plain ? "h-5 w-5 text-ink" : "h-4 w-4 text-yellow-600")} aria-hidden />
          )}
        </li>
      ))}
    </motion.ol>
  );
}
