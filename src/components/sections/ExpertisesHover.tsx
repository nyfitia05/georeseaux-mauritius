import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { EXPERTISES } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const;

/**
 * Section "Expertises" de l'accueil : au survol (desktop) ou au tap
 * (mobile/tablette), l'image et le texte à droite changent pour
 * correspondre à l'expertise active. Un seul item actif à la fois, aucune
 * coupure brutale — juste un fade + léger déplacement.
 */
export function ExpertisesHover() {
  const [activeId, setActiveId] = useState(EXPERTISES[0].id);
  const prefersReducedMotion = usePrefersReducedMotion();
  const active = EXPERTISES.find((item) => item.id === activeId) ?? EXPERTISES[0];

  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <h2 className="font-heading text-[26px] font-bold text-brand-blue sm:text-[28px]">
            Expertises
          </h2>

          <ul className="mt-5 border-t border-ink-300/50">
            {EXPERTISES.map((expertise) => {
              const isActive = expertise.id === activeId;
              return (
                <li key={expertise.id} className="border-b border-ink-300/50">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(expertise.id)}
                    onFocus={() => setActiveId(expertise.id)}
                    onClick={() => setActiveId(expertise.id)}
                    aria-pressed={isActive}
                    className={clsx(
                      "flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ease-premium",
                      isActive ? "text-brand-blue" : "text-ink-900 hover:text-brand-blue"
                    )}
                  >
                    <span className="font-body text-[17px] font-bold">{expertise.title}</span>
                    <ArrowUpRight
                      className={clsx(
                        "h-5 w-5 shrink-0 transition-transform duration-300 ease-premium",
                        isActive && "translate-x-0.5 -translate-y-0.5"
                      )}
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <ButtonLink to="/expertises" className="mt-6">
            Découvrir nos expertises
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[5/4]">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt=""
                initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                style={{ filter: "saturate(0.65) brightness(0.85)" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Voile bleu, comme sur les heros — cohérence de traitement des photos. */}
            <div className="pointer-events-none absolute inset-0 bg-brand-blue/70 mix-blend-multiply" />

            <div className="absolute inset-x-0 bottom-0 bg-brand-blue/92 p-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id}
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_PREMIUM }}
                  className="font-body text-[15px] leading-snug text-white"
                >
                  {active.description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
