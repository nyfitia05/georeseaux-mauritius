import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EASE_SIGNATURE } from "@/animations/variants";
import { accueil, home, nav } from "@/data/content";

// Hero de la maquette d'octobre 2026, avec les modifications demandées :
// titre sur une seule ligne ("Cartographier." en jaune) et bouton
// "Demander un devis" à la place du téléphone.
const words = home.hero.h1.split(" ");
const accent = words.pop() ?? "";
const lead = words.join(" ");

const stage = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_SIGNATURE },
});

export function HomeHero() {
  return (
    <section className="relative flex min-h-[540px] items-center overflow-hidden bg-blue-900 pb-14 pt-28 lg:min-h-[600px]">
      <img
        src="/img/accueil/hero.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3d]/95 via-[#0b1a3d]/60 to-transparent" />

      <Container className="relative">
        <div className="max-w-4xl">
          <motion.h1
            {...stage(0.15)}
            className="font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.01em] text-white sm:text-5xl lg:whitespace-nowrap lg:text-[60px]"
          >
            {lead} <span className="text-yellow-500">{accent}</span>
          </motion.h1>

          <motion.p {...stage(0.3)} className="mt-5 max-w-xl font-display text-xl font-bold leading-snug text-white sm:text-2xl">
            {accueil.hero.subtitle}
          </motion.p>

          <motion.p {...stage(0.4)} className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">
            {accueil.hero.body}
          </motion.p>

          <motion.div {...stage(0.5)} className="mt-8">
            <Button to={nav.devisCta.href} variant="primary" withArrow className="px-8 py-4 text-lg font-bold shadow-[0_8px_24px_rgba(255,212,9,0.35)]">
              {home.hero.cta}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
