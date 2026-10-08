import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/sections/PageHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { SolutionDigitale } from "@/sections/SolutionDigitale";
import { CtaBanner } from "@/sections/CtaBanner";
import { motion } from "framer-motion";
import { EASE_SIGNATURE, staggerContainer, viewport } from "@/animations/variants";
import { detection, nav } from "@/data/content";
import { t } from "@/lib/lang";

// Photos terrain fournies par le client (public/img/detection/*.png),
// associées par titre aux 4 technologies — texte jamais modifié, seule
// l'illustration change. "Inspection et repérage des ouvrages" reprend la
// photo déjà utilisée pour l'ancien intitulé "Observation terrain" (même
// sujet, seul le libellé de la brochure diffère).
// Images dans le même ordre que detection.technologies.items (FR et EN).
const technologyImages = [
  "/img/detection/georadar.png",
  "/img/detection/detection-ele.png",
  "/img/detection/sonde.png",
  "/img/detection/observation.png",
];

// Variante "déroulé" pour les cartes photo ci-dessous : propagée depuis le
// <motion.ul> parent (variants + whileInView sur la liste, pas sur chaque
// carte individuellement) — c'est ce mécanisme, déjà utilisé pour les autres
// grilles du site (ExpertiseShowcase, MonitoringGrid, CardGrid), qui se
// déclenche réellement au scroll ; le déclenchement indépendant par carte
// testé précédemment ne s'activait jamais.
const unrollItem = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: EASE_SIGNATURE },
  },
};

// Page réécrite en septembre 2026 pour coller mot pour mot à la brochure
// DÉTECTION_LOCALISATION_COPROPRIETE.pdf (page Détection) : hero aligné à
// gauche (comme sur la plaquette) sans texte d'accroche additionnel,
// "Technologies" directement suivi des 4 cartes (plus de paragraphe
// d'intro), plus de section "Limites de la détection" (absente de la
// plaquette), un seul CTA en bas de page (pas de bouton "Être rappelé").
export default function Detection() {
  return (
    <>
      <Seo title={detection.seo.title} />
      <PageHero
        h1={detection.hero.h1}
        accent={[t("vos réseaux enterrés", "underground networks")]}
        image="/img/accueil/detection-hero.png"
        align="center"
      />

      <section className="bg-paper py-[35px]">
        <Container className="max-w-[2000px] text-center">
          <SectionHeading align="center">{detection.technologies.heading}</SectionHeading>
        </Container>
        <Container className="mt-12 max-w-[2000px]">
          {/* Chaque carte se "déroule" verticalement (clip-path) au fil du
             scroll ; le déclenchement whileInView est porté par la liste
             (<motion.ul>) et propagé aux cartes via variants, avec un léger
             décalage entre elles (staggerChildren). */}
          <motion.ul
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {detection.technologies.items.map((item, index) => (
              <motion.li
                key={item.title}
                variants={unrollItem}
                className="group relative h-72 overflow-hidden rounded-sm"
              >
                <img
                  src={technologyImages[index]}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/50 via-40% to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-blue-50">{item.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      <PlateauTechnique />
      <SolutionDigitale
        {...detection.rapport}
        image="/img/detection/rapport-intervention.png"
        imageAlt={t("Exemple de rapport d'intervention GEORESEAUX MAURITIUS", "Example of a GEORESEAUX MAURITIUS intervention report")}
      />

      <CtaBanner label={detection.cta} to={nav.devisCta.href} heading={detection.tagline} withCallback={false} />
    </>
  );
}
