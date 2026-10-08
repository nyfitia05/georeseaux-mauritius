import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { CardGrid } from "@/components/CardGrid";
import { PageHero } from "@/sections/PageHero";
import { CtaBanner } from "@/sections/CtaBanner";
import { secteurs, nav } from "@/data/content";
import { t } from "@/lib/lang";

export default function Secteurs() {
  return (
    <>
      <Seo title={secteurs.seo.title} />
      <PageHero eyebrow={t("Secteurs", "Sectors")} h1={secteurs.hero.h1} accent={[t("adaptées", "tailored")]} align="center" />

      <section className="bg-paper py-[35px]">
        <Container>
          <CardGrid items={secteurs.items} columns={4} />
        </Container>
      </section>

      <CtaBanner label={t("Demander un devis", "Request a quote")} to={nav.devisCta.href} />
    </>
  );
}
