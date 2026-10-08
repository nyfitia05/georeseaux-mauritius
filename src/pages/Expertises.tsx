import { PageHero } from "@/components/sections/PageHero";
import { IntroBanner } from "@/components/sections/IntroBanner";
import { ButtonLink } from "@/components/ui/Button";
import { InvestigationMoyens } from "@/components/sections/InvestigationMoyens";
import { NosPrestations } from "@/components/sections/NosPrestations";
import { DTDICTBanner } from "@/components/sections/DTDICTBanner";
import { TwoColumnList } from "@/components/sections/TwoColumnList";
import { InstrumentationBanner } from "@/components/sections/InstrumentationBanner";
import { ApprocheGlobale } from "@/components/sections/ApprocheGlobale";
import { ClientsGrid } from "@/components/sections/ClientsGrid";
import { Methodologie } from "@/components/sections/Methodologie";
import { AgencesMap } from "@/components/sections/AgencesMap";
import { IMAGES, CLIENTS, NOS_INTERVENTIONS } from "@/lib/constants";

export function Expertises() {
  return (
    <>
      <PageHero image={IMAGES.heroExpertises} compact>
        <h1 className="font-heading text-[32px] font-bold leading-[1.15] text-white sm:text-[40px]">
          Des solutions pour connaître, <span className="text-brand-yellow">localiser et suivre</span>{" "}
          vos réseaux
        </h1>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-white/90">
          GEORESEAUX MAURITIUS intervient de la détection terrain jusqu'à la production de données
          géoréférencées exploitables.
        </p>
        <ButtonLink to="/contact" className="mt-7">
          Demander un devis
        </ButtonLink>
      </PageHero>

      <IntroBanner
        title="Localiser les réseaux enterrés sans destruction inutile."
        description="GEORESEAUX MAURITIUS réalise des investigations permettant d'identifier et de localiser les réseaux et ouvrages présents dans le sous-sol. Selon la configuration du site et la nature des ouvrages, différentes technologies peuvent être combinées."
      />

      <div className="h-6 sm:h-8" />

      <InvestigationMoyens />
      <NosPrestations />
      <DTDICTBanner />
      <TwoColumnList title="Nos interventions" items={NOS_INTERVENTIONS} />
      <InstrumentationBanner />
      <ApprocheGlobale />
      <ClientsGrid title="Des solutions adaptées à chaque patrimoine" items={CLIENTS} tone="lavender" />
      <Methodologie />
      <AgencesMap />
    </>
  );
}
