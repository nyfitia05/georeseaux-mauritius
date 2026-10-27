import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EASE_SIGNATURE } from "@/animations/variants";
import { home, nav } from "@/data/content";

// Titre sur une seule ligne (maquette d'octobre 2026) : "Détecter. Localiser."
// en blanc, "Cartographier." en jaune. Le dernier mot du h1 est l'accent.
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
    // pt-24 : dégage l'en-tête flottant (10 px + 64/72 px de haut).
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-blue-900 pb-14 pt-28 sm:min-h-[620px] lg:min-h-[680px]">
      <img
        src="/img/accueil/hero.png"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/55 to-blue-900/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />

      <Container className="relative">
        <div className="max-w-4xl">
          <motion.h1
            {...stage(0.15)}
            className="font-display text-[32px] font-bold leading-[1.15] tracking-[-0.01em] text-white sm:text-5xl lg:whitespace-nowrap lg:text-[56px]"
          >
            {lead} <span className="text-yellow-500">{accent}</span>
          </motion.h1>

          <motion.p {...stage(0.35)} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            {home.hero.body}
          </motion.p>

          <motion.div {...stage(0.5)} className="mt-9">
            <Button to={nav.devisCta.href} variant="primary" withArrow className="px-8 py-4 text-lg">
              {home.hero.cta}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
