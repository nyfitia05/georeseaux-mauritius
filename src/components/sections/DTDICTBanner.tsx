import { Reveal } from "@/components/ui/Reveal";

export function DTDICTBanner() {
  return (
    <section id="dtdict" className="scroll-mt-[76px] bg-brand-yellow py-8 sm:py-10">
      <div className="container-content text-center">
        <Reveal>
          <h2 className="font-heading text-[22px] font-bold tracking-tight text-brand-blue-dark sm:text-[26px]">
            INVESTIGATIONS DT/DICT
          </h2>
        </Reveal>
      </div>

      <div className="container-content mt-6">
        <Reveal delay={0.05}>
          <div className="rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10">
            <h3 className="font-heading text-[19px] font-bold text-ink-900">
              Sécuriser avant d'intervenir
            </h3>
            <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ink-700">
              Avant tout travaux à proximité de réseaux, disposer d'une connaissance fiable des
              ouvrages présents permet de mieux sécuriser l'intervention.
            </p>
            <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ink-700">
              GEORESEAUX FRANCE réalise les investigations terrain nécessaires à la localisation
              et au relevé des réseaux et accompagne les professionnels dans leurs besoins liés
              aux procédures DT/DICT.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
