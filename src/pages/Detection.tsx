import { Gauge, Landmark, Map as MapIcon, type LucideIcon } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { Carousel, CheckList, ExpertiseHero, PhotoCard, Title, cardBg, titleBlue } from "@/components/Maquette";
import { detection, home, nav, pageDetection as p } from "@/data/content";
import { cn } from "@/lib/utils";

// Page refaite d'après la maquette "Détection et localisation" (octobre 2026),
// avec les consignes du client : bouton "Demander un devis" dans le hero,
// "Notre expertise" en deux blocs l'un sous l'autre avec la photo à la
// hauteur des textes, "Types de réseaux détectés" en section à part avec une
// photo par réseau et des flèches, plateau technique retiré, "Nos
// interventions récentes" masqué (voir en bas du fichier).

const icons: Record<string, LucideIcon> = { projet: MapIcon, travaux: Gauge, existant: Landmark };

export default function Detection() {
  return (
    <>
      <Seo title={detection.seo.title} description={detection.seo.description} />

      <ExpertiseHero
        title={p.hero.title}
        accent={p.hero.accent}
        body={p.hero.body}
        image="/img/accueil/carto.png"
        imagePosition="center 40%"
        cta={{ label: home.hero.cta, href: nav.devisCta.href }}
      />

      {/* Notre expertise : texte et liste l'un sous l'autre, photo à droite à
         la même hauteur que les deux blocs. */}
      <section className="bg-white py-10 lg:py-12">
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <Title title={p.expertise.title} accent={p.expertise.accent} />
            <p className="text-lg leading-relaxed text-ink">{p.expertise.text}</p>
            <CheckList items={p.expertise.items} />
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[280px] overflow-hidden">
            <img
              src={p.expertise.image}
              alt={p.expertise.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>
        </Container>
      </section>

      <section className="bg-white py-8">
        <Container>
          <Title title={p.technologies.title} accent={p.technologies.accent} />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.technologies.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <PhotoCard {...item} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Types de réseaux détectés : section à part, une photo par réseau,
         défilement avec les flèches. */}
      <section className="bg-white py-8">
        <Container>
          <Title title={p.reseaux.title} accent={p.reseaux.accent} />
          <Carousel prev={p.reseaux.prev} next={p.reseaux.next} className="mt-5">
            {p.reseaux.items.map((item) => (
              <PhotoCard key={item.title} {...item} ratio="aspect-[4/3]" className="home-slide-6 flex-none snap-start" />
            ))}
          </Carousel>
        </Container>
      </section>

      <section className="bg-white pb-14 pt-8">
        <Container className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr]">
          <Reveal className={cn(cardBg, "p-6 lg:p-8")}>
            <h2 className={cn("font-display text-2xl font-extrabold leading-tight sm:text-[28px]", titleBlue)}>
              {p.besoins.title} <span className="text-yellow-600">{p.besoins.accent}</span>
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-blue-100">
              {p.besoins.items.map((item) => {
                const Icon = icons[item.icon] ?? MapIcon;
                return (
                  <div key={item.title} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
                    <Icon className="h-8 w-8 text-blue-700" strokeWidth={1.6} aria-hidden />
                    <h3 className={cn("mt-3 font-display text-base font-bold", titleBlue)}>{item.title}</h3>
                    <p className="mt-1 text-[15px] leading-snug text-ink-soft">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <Reveal delay={0.1} className={cn(cardBg, "p-6 lg:p-8")}>
            <h2 className={cn("font-display text-2xl font-extrabold leading-tight sm:text-[28px]", titleBlue)}>
              {p.livrables.title}
            </h2>
            <CheckList items={p.livrables.items} className="mt-5" />
          </Reveal>
        </Container>
      </section>

      {/* "Nos interventions récentes" (maquette) : masqué en attendant les
         vrais documents de mission, comme sur l'accueil (retour client du
         27/10/2026). Pour l'activer, réutiliser le carrousel <Exemples />
         de pages/Home.tsx. */}
    </>
  );
}
