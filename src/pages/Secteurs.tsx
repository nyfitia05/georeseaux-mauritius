import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { CardGrid } from "@/components/CardGrid";
import { PageHero } from "@/sections/PageHero";
import { CtaBanner } from "@/sections/CtaBanner";
import { secteurs, nav } from "@/data/content";

export default function Secteurs() {
  return (
    <>
      <Seo title={secteurs.seo.title} />
      <PageHero eyebrow="Secteurs" h1={secteurs.hero.h1} accent={["adaptées"]} align="center" />

      <section className="bg-paper py-[35px]">
        <Container>
          <CardGrid items={secteurs.items} columns={4} />
        </Container>
      </section>

      <CtaBanner label="Demander un devis" to={nav.devisCta.href} />
    </>
  );
}
