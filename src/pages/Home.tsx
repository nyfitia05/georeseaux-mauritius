import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { HomeHero } from "@/sections/HomeHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { accueil, home } from "@/data/content";
import { cn } from "@/lib/utils";

// Accueil reproduit d'après la maquette transmise par le client (octobre
// 2026) — même structure, même design, mêmes textes — avec ses modifications :
// en-tête réduit, hero sur une ligne + "Demander un devis", bloc "Un service
// complet" retiré, flèches sur les secteurs, plateau technique séparé et placé
// au-dessus du rapport, bouton "Voir un exemple de rapport" retiré.

const titleBlue = "text-blue-700";
const accentYellow = "text-yellow-600";

/** Titre en deux couleurs, comme sur la maquette : bleu + jaune. */
function Title({ title, accent, light = false }: { title: string; accent: string; light?: boolean }) {
  return (
    <h2
      className={cn(
        "font-display text-[28px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[38px]",
        light ? "text-white" : titleBlue,
      )}
    >
      {title} <span className={light ? "text-yellow-500" : accentYellow}>{accent}</span>
    </h2>
  );
}

/** Rangée défilante avec une flèche jaune à gauche et à droite. */
function Carousel({
  children,
  prev,
  next,
  className,
}: {
  children: ReactNode;
  prev: string;
  next: string;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 16 : el.clientWidth * 0.8;
    const perView = Math.max(1, Math.floor((el.clientWidth + 16) / step));
    el.scrollBy({ left: dir * step * perView, behavior: "smooth" });
  };
  const arrow =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-yellow-500 text-blue-900 shadow-[0_6px_18px_rgba(16,29,64,0.25)] transition-transform hover:scale-105";
  return (
    <div className={cn("relative", className)}>
      <button type="button" onClick={() => scroll(-1)} aria-label={prev} className={cn(arrow, "-left-2 sm:-left-5")}>
        <ChevronLeft className="h-6 w-6" strokeWidth={2.6} aria-hidden />
      </button>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
      <button type="button" onClick={() => scroll(1)} aria-label={next} className={cn(arrow, "-right-2 sm:-right-5")}>
        <ChevronRight className="h-6 w-6" strokeWidth={2.6} aria-hidden />
      </button>
    </div>
  );
}

const card = "bg-[#F3F6FC] shadow-[0_6px_20px_rgba(16,29,64,0.06)]";

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

/** Une page de rapport stylisée (fond blanc, ombre), pour le visuel. */
function ReportPage({ children }: { children: ReactNode }) {
  return (
    <div className="aspect-[1/1.414] overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(16,29,64,0.18)] ring-1 ring-blue-100">
      {children}
    </div>
  );
}

function Rapport() {
  const { title, accent, intro, items, coverTitle, coverFields, imageAlt } = accueil.rapport;
  const line = "h-1 rounded bg-blue-100";
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
            <ReportPage>
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
            </ReportPage>
            <ReportPage>
              <div className={cn(line, "w-2/3")} />
              <div className={cn(line, "mt-1.5 w-1/2")} />
              <img src="/img/accueil/patrimonial.png" alt="" className="mt-3 aspect-square w-full object-cover" />
              <div className="mt-3 flex flex-col gap-1.5">
                <div className={line} />
                <div className={cn(line, "w-5/6")} />
                <div className={cn(line, "w-2/3")} />
              </div>
            </ReportPage>
            <ReportPage>
              <div className="flex flex-col gap-1.5">
                <div className={line} />
                <div className={cn(line, "w-5/6")} />
                <div className={cn(line, "w-3/4")} />
              </div>
              <img src="/img/carte.png" alt="" className="mt-3 aspect-square w-full object-cover" />
              <div className="mt-3 flex flex-col gap-1.5">
                <div className={cn(line, "w-4/5")} />
                <div className={cn(line, "w-1/2")} />
              </div>
            </ReportPage>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Exemples() {
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
      <Exemples />
    </>
  );
}
