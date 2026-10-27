import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { CheckList, DocPage, ExpertiseHero, PhotoCard, Title } from "@/components/Maquette";
import { home, nav, pageCartographie as p, releves } from "@/data/content";

// Page refaite d'après la maquette "Cartographie et géoréférencement"
// (octobre 2026), avec les consignes du client : "Principales applications"
// retiré, visuel des livrables = nos vrais plans (public/img/cartographie), "Nos
// interventions récentes" masqué (voir en bas du fichier).

export default function CartographieReseaux() {
  return (
    <>
      <Seo title={releves.seo.title} description={releves.seo.description} />

      <ExpertiseHero
        title={p.hero.title}
        accent={p.hero.accent}
        subtitle={p.hero.subtitle}
        body={p.hero.body}
        image="/img/accueil/patrimonial.png"
        imagePosition="70% center"
        cta={{ label: home.hero.cta, href: nav.devisCta.href }}
      />

      <section className="bg-white py-10 lg:py-12">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Reveal className="flex flex-col">
            <Title title={p.prestations.title} accent={p.prestations.accent} />
            <p className="mt-3 text-lg leading-relaxed text-ink">{p.prestations.text}</p>
            <CheckList items={p.prestations.items} className="mt-5" />
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[300px] overflow-hidden">
            <img
              src={p.prestations.image}
              alt={p.prestations.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container>
          <Title title={p.technologies.title} accent={p.technologies.accent} after={p.technologies.after} />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.technologies.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <PhotoCard {...item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Livrables : uniquement nos plans (demande client : pas d'ordinateur). */}
      <section className="bg-white pb-16 pt-8">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <Title title={p.livrables.title} accent={p.livrables.accent} after={p.livrables.after} />
            <p className="mt-3 text-lg leading-relaxed text-ink">{p.livrables.text}</p>
            <CheckList items={p.livrables.items} className="mt-5" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mx-auto flex max-w-[560px] items-center justify-center py-6" role="img" aria-label={p.livrables.imageAlt}>
              <DocPage className="w-[40%] -rotate-3 p-0">
                <img src="/img/cartographie/plan-1.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
              </DocPage>
              <DocPage className="relative z-10 -ml-[8%] w-[40%] p-0">
                <img src="/img/cartographie/plan-2.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
              </DocPage>
              <DocPage className="-ml-[8%] w-[40%] rotate-3 p-0">
                <img src="/img/cartographie/plan-4.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
              </DocPage>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* "Nos interventions récentes" (maquette) : masqué en attendant les
         vrais documents de mission (retour client du 27/10/2026). Pour
         l'activer, réutiliser le carrousel <Exemples /> de pages/Home.tsx. */}
    </>
  );
}
