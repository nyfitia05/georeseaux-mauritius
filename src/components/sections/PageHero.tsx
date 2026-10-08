import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

type PageHeroProps = {
  image: string;
  children: React.ReactNode;
  compact?: boolean;
};

/**
 * Chrome commun à tous les heros (photo en duoton bleu + overlay) : chaque
 * page apporte son propre titre/texte en children pour rester fidèle au
 * contenu spécifique du PDF, sans dupliquer la mécanique visuelle.
 */
export function PageHero({ image, children, compact = false }: PageHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      className={`relative flex items-center overflow-hidden ${
        compact ? "min-h-[420px]" : "min-h-[560px] sm:min-h-[620px]"
      }`}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "saturate(0.65) brightness(0.85)" }}
        />
        <div className="absolute inset-0 bg-brand-blue/78 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/40 via-transparent to-transparent" />
      </div>

      <div className="container-content relative z-10 py-14 sm:py-16">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_PREMIUM }}
          className="max-w-2xl"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
