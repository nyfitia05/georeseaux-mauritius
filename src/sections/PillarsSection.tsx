import { motion } from "framer-motion";
import { staggerContainer, staggerItem, viewport } from "@/animations/variants";
import type { CardItem } from "@/data/content";

interface PillarsSectionProps {
  pillars: CardItem[];
}

/** The four pillars (Détecter / Localiser / Cartographier / Surveiller) — le
 * bloc "01 → 04" de la brochure GEORESEAUX_FRANCE.pdf ("DE LA CONNAISSANCE DU
 * RÉSEAU À SA SURVEILLANCE"). Numérotation rétablie en septembre 2026 : la
 * brochure affiche bien un numéro devant chaque pilier — la décision "pas de
 * numérotation" prise plus tôt reposait sur un souvenir approximatif du
 * document avant relecture complète, elle est annulée ici sur preuve du PDF. */
export function PillarsSection({ pillars }: PillarsSectionProps) {
  return (
    <motion.ol
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="grid grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4"
    >
      {pillars.map((pillar, index) => (
        <motion.li key={pillar.title} variants={staggerItem}>
          <p className="font-display text-2xl font-bold text-blue-700">{`0${index + 1}`}</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-blue-700">{pillar.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
