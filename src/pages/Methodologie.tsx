import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { PageHero } from "@/sections/PageHero";
import { MethodologyPath } from "@/sections/MethodologyPath";
import { CtaBanner } from "@/sections/CtaBanner";
import { methodologie, nav } from "@/data/content";

export default function Methodologie() {
  return (
    <>
      <Seo title={methodologie.seo.title} />
      <PageHero
        eyebrow="Méthodologie"
        h1={methodologie.hero.h1}
        accent={["analyse", "restitution"]}
        align="center"
      />

      <section className="bg-paper py-[35px]">
        <Container>
          <MethodologyPath steps={methodologie.steps} />
        </Container>
      </section>

      <CtaBanner label="Demander un devis" to={nav.devisCta.href} />
    </>
  );
}
