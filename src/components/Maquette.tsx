import { useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { EASE_SIGNATURE } from "@/animations/variants";
import { cn } from "@/lib/utils";

/**
 * Briques communes aux pages refaites d'après les maquettes d'octobre 2026
 * (accueil, Détection et localisation, Cartographie et géoréférencement) :
 * titres bleu + jaune, cartes sur fond bleu très clair, listes à coches
 * jaunes, carrousels à flèches jaunes, hero avec fil d'Ariane.
 */

export const titleBlue = "text-blue-700";
export const accentYellow = "text-yellow-600";
export const cardBg = "bg-[#F3F6FC] shadow-[0_6px_20px_rgba(16,29,64,0.06)]";

/** Titre de section : texte bleu, mot d'accent jaune, suite éventuelle en bleu. */
export function Title({
  title,
  accent,
  after,
  light = false,
  className,
}: {
  title: string;
  accent: string;
  after?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-[28px] font-extrabold leading-tight tracking-[-0.01em] sm:text-[38px]",
        light ? "text-white" : titleBlue,
        className,
      )}
    >
      {title} <span className={light ? "text-yellow-500" : accentYellow}>{accent}</span>
      {after ? ` ${after}` : null}
    </h2>
  );
}

/** Liste à coches jaunes. */
export function CheckList({ items, className, round = false }: { items: string[]; className?: string; round?: boolean }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-base text-ink">
          {round ? (
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-yellow-500">
              <Check className="h-3 w-3 text-white" strokeWidth={3.5} aria-hidden />
            </span>
          ) : (
            <Check className="mt-0.5 h-5 w-5 flex-none text-yellow-500" strokeWidth={3} aria-hidden />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Rangée défilante avec une flèche jaune à gauche et à droite. */
export function Carousel({
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

/** Carte photo + titre bleu + texte (technologies, secteurs, réseaux…). */
export function PhotoCard({
  title,
  text,
  image,
  className,
  ratio = "aspect-[3/2]",
}: {
  title: string;
  text?: string;
  image: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <article className={cn(cardBg, "flex flex-col", className)}>
      <div className={cn(ratio, "overflow-hidden")}>
        <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 p-4 sm:p-5">
        <h3 className="font-display text-base font-bold leading-snug text-blue-600">{title}</h3>
        {text && <p className="mt-1.5 text-[15px] leading-snug text-ink-soft">{text}</p>}
      </div>
    </article>
  );
}

/** Une page de document stylisée (fond blanc, ombre). */
export function DocPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("aspect-[1/1.414] overflow-hidden bg-white p-3 shadow-[0_10px_30px_rgba(16,29,64,0.18)] ring-1 ring-blue-100", className)}>
      {children}
    </div>
  );
}

const stage = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE_SIGNATURE },
});

/** Hero des pages expertises (sans fil d'Ariane, demande client) : titre 2 lignes (2e en jaune),
 * sous-titre, texte, bouton "Demander un devis". */
export function ExpertiseHero({
  title,
  accent,
  subtitle,
  body,
  image,
  imagePosition = "center",
  cta,
}: {
  title: string;
  accent: string;
  subtitle?: string;
  body?: string;
  image: string;
  imagePosition?: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="relative flex min-h-[520px] items-center overflow-hidden bg-blue-900 pb-14 pt-28 lg:min-h-[560px]">
      <img
        src={image}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3d]/95 via-[#0b1a3d]/65 to-transparent" />
      <Container className="relative">
        <div className="max-w-3xl">
          <motion.h1
            {...stage(0.1)}
            className="font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl lg:text-[58px]"
          >
            {title}
            <span className="block text-yellow-500">{accent}</span>
          </motion.h1>
          {subtitle && (
            <motion.p {...stage(0.25)} className="mt-5 max-w-xl font-display text-xl font-semibold leading-snug text-white sm:text-2xl">
              {subtitle}
            </motion.p>
          )}
          {body && (
            <motion.p {...stage(0.35)} className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">
              {body}
            </motion.p>
          )}
          <motion.div {...stage(0.45)} className="mt-8">
            <Button to={cta.href} variant="primary" withArrow className="px-8 py-4 text-lg font-bold shadow-[0_8px_24px_rgba(255,212,9,0.35)]">
              {cta.label}
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
