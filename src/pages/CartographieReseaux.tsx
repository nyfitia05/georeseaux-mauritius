import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { FlowLine } from "@/components/FlowLine";
import { PageHero } from "@/sections/PageHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { SolutionDigitale } from "@/sections/SolutionDigitale";
import { CtaBanner } from "@/sections/CtaBanner";
import { releves, nav } from "@/data/content";
import { t } from "@/lib/lang";

// Page réécrite en septembre 2026 pour coller mot pour mot à la brochure
// RELEVÉS_CARTOGRAPHIE.pdf : hero sans texte de corps, flow "Détection →
// Géoréférencement → Cartographie → Documentation", les 2 paragraphes
// d'intro côte à côte, plus de bloc "Restitutions possibles" ni "Chaîne de
// valeur" (absents de la plaquette), un seul CTA en bas de page.
export default function CartographieReseaux() {
  return (
    <>
      <Seo title={releves.seo.title} />
      <PageHero
        h1={releves.hero.h1}
        accent={[t("vos réseaux enterrés", "underground networks")]}
        image="/img/accueil/patrimonial.png"
        align="center"
      />

      <section className="bg-blue-50/60 py-[35px]">
        <Container className="text-center">
          <FlowLine steps={releves.flow} variant="plain" className="justify-center" />
        </Container>
      </section>

      <section className="bg-paper py-[35px]">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <p className="text-base leading-relaxed text-ink-soft">{releves.intro.left}</p>
            <p className="text-base leading-relaxed text-ink-soft">{releves.intro.right}</p>
          </div>
        </Container>
      </section>

      <PlateauTechnique />
      <SolutionDigitale
        {...releves.cartographie}
        image="/img/carte.png"
        imageAlt={t("Exemple de plan numérique des réseaux GEORESEAUX MAURITIUS", "Example of a GEORESEAUX MAURITIUS digital network plan")}
      />

      <CtaBanner label={releves.cta} to={nav.devisCta.href} heading={releves.tagline} withCallback={false} />
    </>
  );
}
