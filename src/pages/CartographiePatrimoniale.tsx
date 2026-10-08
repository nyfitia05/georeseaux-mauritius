import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { FlowLine } from "@/components/FlowLine";
import { PageHero } from "@/sections/PageHero";
import { CtaBanner } from "@/sections/CtaBanner";
import { cartographiePatrimoniale, nav } from "@/data/content";

export default function CartographiePatrimoniale() {
  return (
    <>
      <Seo title={cartographiePatrimoniale.seo.title} />
      <PageHero
        eyebrow="Cartographie patrimoniale"
        h1={cartographiePatrimoniale.hero.h1}
        accent={["mémoire technique"]}
        body={cartographiePatrimoniale.hero.body}
        image="/img/accueil/patrimonial.png"
      />

      <section className="bg-paper py-[35px]">
        <Container className="max-w-[2000px] text-center">
          <SectionHeading align="center">{cartographiePatrimoniale.evolutive.heading}</SectionHeading>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-5xl text-lg leading-relaxed text-ink-soft">
              {cartographiePatrimoniale.evolutive.body}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-blue-50/60 py-[35px]">
        {/* Container élargi à 1500px pour que les 5 étapes du flux tiennent
           sur une seule ligne au lieu de revenir à la ligne. */}
        <Container className="max-w-[2000px]">
          <FlowLine steps={cartographiePatrimoniale.flow} className="justify-center" />
        </Container>
      </section>

      <CtaBanner label={cartographiePatrimoniale.cta} to={nav.devisCta.href} />
    </>
  );
}
