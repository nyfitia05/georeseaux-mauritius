import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Engagements } from "@/components/sections/Engagements";
import { AgencesMap } from "@/components/sections/AgencesMap";
import { IMAGES } from "@/lib/constants";

export function About() {
  return (
    <>
      <PageHero image={IMAGES.heroAbout}>
        <h1 className="font-heading text-[36px] font-bold leading-[1.12] text-white sm:text-[46px]">
          Connaître aujourd'hui.
          <br />
          <span className="text-brand-yellow">Sécuriser demain.</span>
        </h1>
        <p className="mt-5 font-body text-[16px] leading-relaxed text-white/90">
          GEORESEAUX MAURITIUS est spécialisée dans la détection, le géoréférencement, la
          cartographie et le suivi des réseaux et infrastructures.
        </p>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-white/90">
          Notre approche associe investigation terrain et traitement de la donnée afin de fournir
          à nos clients une information technique exploitable et durable.
        </p>
        <ButtonLink to="/contact" className="mt-7">
          Demander un devis
        </ButtonLink>
      </PageHero>

      <Engagements />
      <AgencesMap />
    </>
  );
}
