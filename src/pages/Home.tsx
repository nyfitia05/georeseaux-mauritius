import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { HomeHero } from "@/sections/HomeHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { CtaBanner } from "@/sections/CtaBanner";
import { accueil, detection, home, methodologie, nav } from "@/data/content";
import { cn } from "@/lib/utils";

// Accueil refait en octobre 2026 d'après la maquette transmise par le client :
// hero, 2 cartes expertises, Nos technologies, Nos secteurs d'intervention
// (carrousel à flèches), Notre méthodologie, Plateau technique, Rapport
// technique complet, Exemples d'interventions, bandeau de fin.

/** Titre de section en deux couleurs : texte bleu nuit + mot d'accent
 * surligné en jaune (le jaune seul sur fond blanc n'est pas lisible). */
function TwoToneTitle({
  title,
  accent,
  className,
  as: Tag = "h2",
}: {
  title: string;
  accent: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <Tag className={cn("font-display font-bold leading-tight text-blue-900", className)}>
      {title}{" "}
      <span className="px-0.5" style={accentStyle}>
        {accent}
      </span>
    </Tag>
  );
}

// Surlignage jaune sous le mot d'accent (style en ligne : plus fiable qu'une
// classe arbitraire Tailwind contenant des virgules).
const accentStyle = {
  backgroundImage: "linear-gradient(transparent 58%, #FFD409 58%, #FFD409 92%, transparent 92%)",
};

const sectionTitle = "text-[28px] sm:text-4xl";

function Expertises() {
  return (
    <section className="bg-paper py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {accueil.expertises.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.08}>
              <article className="group flex h-full flex-col bg-white shadow-[0_10px_30px_rgba(16,29,64,0.07)]">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <TwoToneTitle as="h3" title={item.title} accent={item.accent} className="text-2xl sm:text-[28px]" />
                  <p className="mt-4 flex-1 text-lg text-ink-soft">{item.text}</p>
                  <div className="mt-7">
                    <Link
                      to={item.href}
                      className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-3 font-semibold text-blue-900 transition-colors hover:bg-yellow-400"
                    >
                      {accueil.more}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Technologies() {
  const { title, accent, intro, items } = accueil.technologies;
  return (
    <section className="bg-paper-tint py-16 lg:py-20">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <TwoToneTitle title={title} accent={accent} className={sectionTitle} />
          <p className="mt-4 text-lg text-ink-soft">{intro}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="flex h-full flex-col bg-white">
                <div className="aspect-[3/2] overflow-hidden bg-blue-50">
                  <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 border-t-4 border-yellow-500 p-6">
                  <h3 className="font-display text-lg font-bold leading-snug text-blue-900">{item.title}</h3>
                  <p className="mt-2.5 text-base text-ink-soft">{item.text}</p>
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
  const { title, accent, intro, items, prev, next } = accueil.secteurs;
  const track = useRef<HTMLDivElement>(null);

  // Défile d'une "page" visible (moins une carte de recouvrement).
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    const perView = Math.max(1, Math.floor(el.clientWidth / step));
    el.scrollBy({ left: dir * step * perView, behavior: "smooth" });
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-900 text-blue-900 transition-colors hover:bg-blue-900 hover:text-white";

  return (
    <section className="bg-paper py-16 lg:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal className="max-w-2xl">
            <TwoToneTitle title={title} accent={accent} className={sectionTitle} />
            <p className="mt-4 text-lg text-ink-soft">{intro}</p>
          </Reveal>
          <div className="flex gap-3">
            <button type="button" className={arrow} onClick={() => scroll(-1)} aria-label={prev}>
              <ChevronLeft className="h-6 w-6" strokeWidth={2.4} aria-hidden />
            </button>
            <button type="button" className={arrow} onClick={() => scroll(1)} aria-label={next}>
              <ChevronRight className="h-6 w-6" strokeWidth={2.4} aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={track}
          className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <article
              key={item.title}
              data-card
              className="group relative sector-card aspect-[4/5] flex-none snap-start overflow-hidden"
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent" />
              <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-xl font-bold leading-snug text-white">
                <span className="mb-3 block h-1 w-10 bg-yellow-500" aria-hidden />
                {item.title}
              </h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Methodologie() {
  const { title, accent, intro } = accueil.methodologie;
  return (
    <section className="bg-paper-tint py-16 lg:py-20">
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <TwoToneTitle title={title} accent={accent} className={sectionTitle} />
          <p className="mt-4 text-lg text-ink-soft">{intro}</p>
        </Reveal>
        <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {methodologie.steps.map((step, i) => (
            <li key={step.number}>
              <Reveal delay={(i % 3) * 0.06} className="flex gap-5">
                <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-blue-900 font-display text-lg font-bold text-yellow-500">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-blue-900">{step.title}</h3>
                  <p className="mt-1.5 text-base text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Rapport() {
  const { title, accent, imageAlt } = accueil.rapport;
  return (
    <section className="bg-paper py-16 lg:py-20">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <TwoToneTitle title={title} accent={accent} className={sectionTitle} />
          <p className="mt-5 text-lg text-ink">{detection.rapport.intro}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {detection.rapport.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base text-ink">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-yellow-500">
                  <Check className="h-3.5 w-3.5 text-blue-900" strokeWidth={3} aria-hidden />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[560px]">
          <img
            src="/img/accueil/restitution.png"
            alt=""
            loading="lazy"
            className="w-full shadow-[0_20px_50px_rgba(16,29,64,0.18)]"
          />
          <img
            src="/img/detection/rapport-intervention.png"
            alt={imageAlt}
            loading="lazy"
            className="absolute -bottom-8 -left-4 w-[42%] border-4 border-white shadow-[0_20px_50px_rgba(16,29,64,0.25)] sm:-left-8"
          />
        </Reveal>
      </Container>
    </section>
  );
}

function Exemples() {
  const { title, accent, intro, badge, items } = accueil.exemples;
  return (
    <section className="bg-paper-tint py-16 lg:py-20">
      <Container>
        <Reveal className="mb-10 max-w-2xl">
          <TwoToneTitle title={title} accent={accent} className={sectionTitle} />
          <p className="mt-4 text-lg text-ink-soft">{intro}</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="flex h-full flex-col bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                  {badge && (
                    <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink-soft">
                      {badge}
                    </span>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-500">{item.tag}</p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug text-blue-900">{item.title}</h3>
                  <p className="mt-2.5 text-base text-ink-soft">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
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
      <Exemples />
      <CtaBanner
        label={home.cta}
        to={nav.devisExpressCta.href}
        heading={home.closing.heading}
        subtitle={home.closing.body}
        withCallback={false}
      />
    </>
  );
}
