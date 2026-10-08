import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/constants";

/**
 * Miroir de "Plateau technique" : texte à gauche (container classique),
 * image en plein-bleed à droite (aucun radius, aucun padding vertical).
 */
export function SolutionDigitale() {
  return (
    <section className="bg-brand-blue-light">
      <div className="grid lg:grid-cols-2">
        <Reveal className="order-2 flex flex-col justify-center py-10 pl-5 pr-5 sm:py-14 sm:pr-8 lg:order-1 lg:py-16 lg:pr-12 lg:pl-[max(1.25rem,calc((100vw-1280px)/2+1.25rem))]">
          <h2 className="font-heading text-[26px] font-bold text-brand-blue sm:text-[28px]">
            Une solution digitale
          </h2>
          <p className="mt-4 max-w-md font-body text-[16px] leading-relaxed text-ink-700">
            Un rapport <strong className="text-ink-900">d'intervention complet et détaillé</strong>,
            incluant conclusions techniques et préconisations d'intervention, transmis sous{" "}
            <strong className="text-ink-900">48h</strong> après l'intervention.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative order-1 min-h-[320px] lg:order-2">
          <img
            src={IMAGES.solutionDigitale}
            alt="Aperçu d'un rapport d'intervention GEORESEAUX FRANCE"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
