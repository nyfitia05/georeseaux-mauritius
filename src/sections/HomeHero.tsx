import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { EASE_SIGNATURE } from "@/animations/variants";
import { home } from "@/data/content";
import { lang } from "@/lib/lang";

// The H1 is split into two visual lines to match the line break used on the
// reference GEORESEAUX FRANCE brochure exactly ("Détecter. Localiser." /
// "Cartographier. Surveiller.") — wording untouched, purely a line-break
// treatment for the full-bleed photo hero. The brochure's second line is
// entirely in yellow (not a single accent word), so it gets its own color
// instead of going through the usual word-level accent helper.
const headlineLines = lang === "en" ? ["Detect. Locate.", "Map. Monitor."] : ["Détecter. Localiser.", "Cartographier. Surveiller."];

const stage = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_SIGNATURE },
});

// Hero réécrit en septembre 2026 pour coller mot pour mot à la brochure
// GEORESEAUX_FRANCE.pdf : voile nettement allégé (la photo reste lisible sur
// la plaquette, ce n'est pas un aplat bleu sombre), et plus de bouton
// "Demander un devis" dans le hero — la plaquette n'en a pas ; le CTA du
// site reste porté par le bandeau de fin de page.
export function HomeHero() {
  return (
    // flex + items-center : le titre/texte est maintenant centré verticalement
    // dans la hauteur du hero (retour client 30/09), plutôt qu'ancré par un
    // padding haut/bas asymétrique. pt-20/sm:pt-[88px] reste nécessaire pour
    // ne pas passer sous le header fixe (même valeur que le spacer mt-20/
    // sm:mt-[88px] utilisé par PageHero pour les autres pages).
    <section className="relative flex min-h-[480px] items-center overflow-hidden bg-blue-900 pt-20 sm:pt-[88px]">
      {/* Photo terrain fournie par le client (public/img/accueil/hero.png) —
         la même photo que celle utilisée dans la brochure GEORESEAUX MAURITIUS
         de référence — en plein cadre derrière un dégradé bleu marque pour
         la lisibilité du texte. */}
      <img
        src="/img/accueil/hero.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-900/50 to-blue-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-blue-900/5" />

      <Container className="relative py-10 sm:py-12">
        <div className="max-w-2xl">
          <h1 className="font-display text-[30px] font-semibold leading-[1.25]">
            {headlineLines.map((line, lineIndex) => (
              <motion.span
                key={lineIndex}
                {...stage(0.15 + lineIndex * 0.17)}
                className={lineIndex === 0 ? "block text-white" : "block text-yellow-400"}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p {...stage(0.5)} className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
            {home.hero.body}
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
