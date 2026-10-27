import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { HomeHero } from "@/sections/HomeHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { accueil, home } from "@/data/content";
import { cn } from "@/lib/utils";
import { Carousel, DocPage, Title, accentYellow, cardBg, titleBlue } from "@/components/Maquette";

// Accueil reproduit d'après la maquette transmise par le client (octobre
// 2026) — même structure, même design, mêmes textes — avec ses modifications :
// en-tête réduit, hero sur une ligne + "Demander un devis", bloc "Un service
// complet" retiré, flèches sur les secteurs, plateau technique séparé et placé
// au-dessus du rapport, bouton "Voir un exemple de rapport" retiré.

const card = cardBg;

function Expertises() {
  return (
    <section className="bg-white pb-6 pt-8 lg:pt-10">
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {accueil.expertises.map((item, i) => (
          <Reveal key={item.href} delay={i * 0.08}>
            <article className={cn(card, "flex h-full flex-col sm:flex-row")}>
              <div className="aspect-[16/10] overflow-hidden sm:aspect-auto sm:w-[44%] sm:flex-none">
                <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <h3 className={cn("font-display text-[22px] font-bold leading-tight lg:text-2xl", titleBlue)}>
                  {item.title}
                  <span className={cn("block", accentYellow)}>{item.accent}</span>
                </h3>
                <p className="mt-3 flex-1 text-base text-ink-soft">{item.text}</p>
                <div className="mt-5">
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-2.5 rounded-full bg-yellow-500 px-5 py-2.5 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-400"
                  >
                    {accueil.more}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

function Technologies() {
  const { title, accent, items } = accueil.technologies;
  return (
    <section className="bg-white py-8">
      <Container>
        <Title title={title} accent={accent} />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className={cn(card, "flex h-full flex-col")}>
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-blue-600">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Secteurs() {
  const { title, accent, items, prev, next } = accueil.secteurs;
  return (
    <section className="bg-white py-8">
      <Container>
        <Title title={title} accent={accent} />
        <Carousel prev={prev} next={next} className="mt-5">
          {items.map((item) => (
            <article key={item.title} className={cn(card, "home-slide-6 flex-none snap-start")}>
              <div className="aspect-[5/3] overflow-hidden">
                <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-[15px] font-bold leading-snug text-blue-600">{item.title}</h3>
                <p className="mt-1 text-sm leading-snug text-ink-soft">{item.text}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

function Methodologie() {
  const { title, accent, steps } = accueil.methodologie;
  return (
    <section className="bg-white py-8">
      <Container>
        <div className={cn(card, "px-6 py-7 lg:px-8")}>
          <Title title={title} accent={accent} />
          <ol className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {steps.map((step, i) => (
              <li key={step.number} className="relative">
                <div className="flex items-center">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-yellow-500 font-display text-base font-bold text-blue-900">
                    {step.number}
                  </span>
                  {i < steps.length - 1 && (
                    <ArrowRight className="mx-auto hidden h-5 w-5 text-blue-200 lg:block" strokeWidth={2} aria-hidden />
                  )}
                </div>
                <h3 className={cn("mt-3 font-display text-base font-bold", titleBlue)}>{step.title}</h3>
                <p className="mt-1 text-[15px] leading-snug text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Rapport() {
  const { title, accent, intro, items, coverTitle, coverFields, imageAlt } = accueil.rapport;
  return (
    <section className="bg-white py-12 lg:py-14">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <Reveal>
          <Title title={title} accent={accent} />
          <p className="mt-4 text-base text-ink">{intro}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-yellow-500">
                  <Check className="h-3 w-3 text-white" strokeWidth={3.5} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-3 gap-3 sm:gap-5" role="img" aria-label={imageAlt}>
            <DocPage>
              <img src="/img/Logolong.png" alt="" className="h-4 w-auto sm:h-5" />
              <p className="mt-6 font-display text-[9px] font-bold text-blue-900 sm:text-[11px]">{coverTitle}</p>
              <div className="mt-4 flex flex-col gap-2">
                {coverFields.map((f) => (
                  <div key={f} className="flex items-end gap-1 text-[7px] text-ink-soft sm:text-[9px]">
                    {f}
                    <span className="mb-0.5 h-px flex-1 bg-blue-100" />
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-1">
                <img src="/img/exemples/voirie-urbaine.jpg" alt="" className="aspect-[4/3] w-full object-cover" />
                <img src="/img/technologies/georadar.jpg" alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
            </DocPage>
            {/* Pages 2 et 3 : vrais plans GEORESEAUX (public/img/cartographie). */}
            <DocPage className="p-0">
              <img src="/img/cartographie/plan-3.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
            </DocPage>
            <DocPage className="p-0">
              <img src="/img/cartographie/plan-1.jpg" alt="" loading="lazy" className="h-full w-full object-cover" />
            </DocPage>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// Exportée (et non supprimée) pour que la section, masquée pour l'instant,
// ne casse pas la compilation (noUnusedLocals).
export function Exemples() {
  const { title, accent, intro, items, prev, next } = accueil.exemples;
  return (
    <section className="bg-[#0f2a5c] py-12 lg:py-14">
      <Container>
        <Title title={title} accent={accent} light />
        <p className="mt-2 text-lg text-white/90">{intro}</p>
        <Carousel prev={prev} next={next} className="mt-6">
          {items.map((item) => (
            <article key={item.title} className="home-slide-6 flex-none snap-start bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-[15px] font-bold text-blue-600">{item.title}</h3>
                <p className="mt-0.5 text-sm text-ink-soft">{item.text}</p>
              </div>
            </article>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo title={home.seo.title} description={home.seo.description} />
      <HomeHero />
      <Expertises />
      <Technologies />
      <Secteurs />
      <Methodologie />
      <PlateauTechnique />
      <Rapport />
      {/* "Exemples d'interventions" masqué en attendant les vrais documents
         de mission (retour client du 27/10/2026). Pour le réafficher :
         décommenter la ligne ci-dessous. */}
      {/* <Exemples /> */}
    </>
  );
}
