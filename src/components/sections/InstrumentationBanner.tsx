import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/constants";

export function InstrumentationBanner() {
  return (
    <section id="instrumentation" className="relative scroll-mt-[76px] overflow-hidden py-14 sm:py-16">
      <div className="absolute inset-0">
        <img
          src={IMAGES.instrumentationBanner}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "saturate(0.6) brightness(0.8)" }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />
      </div>

      <div className="container-content relative z-10 text-center">
        <Reveal>
          <h2 className="font-heading text-[24px] font-bold tracking-tight text-white sm:text-[30px]">
            INSTRUMENTATION &amp; SUPERVISION
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-white/90">
            De la cartographie à la connaissance dynamique du réseau. La connaissance d'un réseau
            peut aller au-delà de sa localisation.
          </p>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-white/80">
            GEORESEAUX FRANCE accompagne les projets intégrant des solutions d'instrumentation et
            de suivi des infrastructures.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
