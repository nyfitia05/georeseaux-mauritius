import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { PageHero } from "@/sections/PageHero";
import { MethodologyPath } from "@/sections/MethodologyPath";
import { CtaBanner } from "@/sections/CtaBanner";
import { methodologie, nav } from "@/data/content";
import { lang, t } from "@/lib/lang";

export default function Methodologie() {
  return (
    <>
      <Seo title={methodologie.seo.title} />
      <PageHero
        eyebrow={t("Méthodologie", "Methodology")}
        h1={methodologie.hero.h1}
        accent={lang === "en" ? ["needs analysis", "final delivery"] : ["analyse", "restitution"]}
        align="center"
      />

      <section className="bg-paper py-[35px]">
        <Container>
          <MethodologyPath steps={methodologie.steps} />
        </Container>
      </section>

      <CtaBanner label={t("Demander un devis", "Request a quote")} to={nav.devisCta.href} />
    </>
  );
}
