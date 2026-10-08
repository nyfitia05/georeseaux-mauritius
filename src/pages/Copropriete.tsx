import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FlowLine } from "@/components/FlowLine";
import { PageHero } from "@/sections/PageHero";
import { MethodologyPath } from "@/sections/MethodologyPath";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { SolutionDigitale } from "@/sections/SolutionDigitale";
import { CtaBanner } from "@/sections/CtaBanner";
import { copropriete, detection, nav } from "@/data/content";

export default function Copropriete() {
  return (
    <>
      <Seo title={copropriete.seo.title} />
      <PageHero eyebrow="Syndics & copropriétés" h1={copropriete.hero.h1} accent={["connaître"]}>
        {copropriete.hero.body.map((paragraph) => (
          <p key={paragraph} className="mt-4 first:mt-0">
            {paragraph}
          </p>
        ))}
      </PageHero>

      <section className="bg-paper py-[35px]">
        <Container>
          <SectionHeading className="mb-16">
            {copropriete.demarche.heading}
          </SectionHeading>
          <MethodologyPath steps={copropriete.demarche.steps} />
        </Container>
      </section>

      <section className="bg-blue-50/60 py-[35px]">
        <Container className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-500">
            {copropriete.anomalie.heading}
          </p>
          <Reveal>
            <FlowLine steps={copropriete.anomalie.flow} />
          </Reveal>
        </Container>
      </section>

      <PlateauTechnique />
      {/* La brochure "copropriété" fournie par le client est en réalité le
         même document que DÉTECTION_LOCALISATION_COPROPRIETE.pdf, sans aucun
         contenu spécifique à la copropriété — on réutilise donc le même
         rapport technique que la page Détection (voir data/content.ts). */}
      <SolutionDigitale
        {...detection.rapport}
        image="/img/detection/rapport-intervention.png"
        imageAlt="Exemple de rapport d'intervention GEORESEAUX MAURITIUS"
      />

      <CtaBanner label={copropriete.cta} to={nav.devisCta.href} />
    </>
  );
}
