import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import { MOYENS_INVESTIGATION } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Nos moyens d'investigation" — scroll-driven storytelling horizontal.
 *
 * Desktop (>= lg) : la section se fixe à l'écran pendant que la piste
 * d'images/textes défile horizontalement, pilotée 1:1 par le scroll
 * vertical (GSAP ScrollTrigger, scrub). Chaque "moyen" entre par la droite
 * au fur et à mesure qu'on descend.
 *
 * Mobile/tablette : le scroll-jacking horizontal est une mauvaise idée sur
 * petit écran (désorientant, peu fiable au tactile) — on retombe sur une
 * grille simple avec reveal au scroll, sans rien perdre du contenu.
 */
export function InvestigationMoyens() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Le scroll-jacking horizontal ne doit exister que pour les visiteurs
  // desktop qui n'ont pas demandé de réduire les animations : sinon, la
  // piste horizontale n'est même pas montée (cf. rendu ci-dessous), donc pas
  // besoin de la piloter ici.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const getDistance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getDistance(),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (MOYENS_INVESTIGATION.length - 1));
            setActiveIndex(Math.min(MOYENS_INVESTIGATION.length - 1, Math.max(0, index)));
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="detection" ref={sectionRef} className="relative overflow-hidden bg-white scroll-mt-[76px]">
      <div className="lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="container-content py-10 sm:py-14 lg:flex-none lg:py-0">
          <Reveal>
            <SectionHeading align="center">Nos moyens d'investigation</SectionHeading>
          </Reveal>
        </div>

        {/*
          Mobile/tablette toujours, et desktop dès que l'utilisateur préfère
          des animations réduites : grille statique avec reveal au scroll,
          pour ne jamais laisser un visiteur sans accès aux 4 items.
        */}
        <div
          className={clsx(
            "container-content mt-8 grid gap-6 pb-10 sm:grid-cols-2",
            !prefersReducedMotion && "lg:hidden"
          )}
        >
          {MOYENS_INVESTIGATION.map((moyen) => (
            <Reveal key={moyen.id} className="overflow-hidden">
              <img src={moyen.image} alt="" className="h-48 w-full object-cover" loading="lazy" />
              <div className="bg-brand-blue p-5">
                <h3 className="font-heading text-[16px] font-bold text-white">{moyen.title}</h3>
                <p className="mt-1.5 font-body text-[14px] leading-relaxed text-white/85">
                  {moyen.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Desktop uniquement, animations autorisées : piste horizontale pilotée par le scroll */}
        {!prefersReducedMotion && (
          <>
            <div ref={viewportRef} className="hidden lg:mt-8 lg:block lg:flex-1 lg:overflow-hidden">
              <div ref={trackRef} className="flex h-full">
                {MOYENS_INVESTIGATION.map((moyen, index) => (
                  <div
                    key={moyen.id}
                    className="flex h-full w-screen shrink-0 items-center gap-10 px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]"
                  >
                    <div className="relative h-[64%] w-3/5 overflow-hidden">
                      <img
                        src={moyen.image}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="w-2/5 max-w-sm">
                      <span className="font-heading text-6xl font-bold text-brand-blue/15">
                        0{index + 1}
                      </span>
                      <h3 className="mt-2 font-heading text-[24px] font-bold text-brand-blue">
                        {moyen.title}
                      </h3>
                      <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-700">
                        {moyen.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 hidden justify-center gap-2 pb-8 lg:flex">
              {MOYENS_INVESTIGATION.map((moyen, index) => (
                <span
                  key={moyen.id}
                  className={clsx(
                    "h-1.5 rounded-pill transition-all duration-300 ease-premium",
                    index === activeIndex ? "w-8 bg-brand-yellow" : "w-4 bg-ink-300"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
