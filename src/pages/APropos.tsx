import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ListBlock } from "@/components/ListBlock";
import { PageHero } from "@/sections/PageHero";
import { CtaBanner } from "@/sections/CtaBanner";
import { aPropos, nav } from "@/data/content";
import { lang, t } from "@/lib/lang";

export default function APropos() {
  return (
    <>
      <Seo title={aPropos.seo.title} />
      <PageHero
        eyebrow={t("À propos", "About")}
        h1={aPropos.hero.h1}
        accent={lang === "en" ? ["Know", "Secure"] : ["Connaître", "Sécuriser"]}
        body={aPropos.hero.body}
        align="center"
        wide
      />

      <section className="bg-paper py-[35px]">
        <Container className="max-w-4xl">
          <SectionHeading align="center" className="mb-10">
            {aPropos.engagements.heading}
          </SectionHeading>
          <ListBlock items={aPropos.engagements.items} columns={3} />
        </Container>
      </section>

      <CtaBanner label={t("Demander un devis", "Request a quote")} to={nav.devisCta.href} />
    </>
  );
}
