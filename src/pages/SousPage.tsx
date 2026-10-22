import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/sections/PageHero";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { CtaBanner } from "@/sections/CtaBanner";
import { detection, nav, releves, sousPages } from "@/data/content";
import { cn } from "@/lib/utils";

type SousPageId = keyof typeof sousPages;

/**
 * Sous-page SEO (cahier des charges SEO WATER LEAK GROUP, fiches 14, 15, 17).
 * Tous les textes viennent de data/content.*.ts (sousPages), mot pour mot :
 * rien n'est écrit en dur ici. Les liens du bas renvoient vers les autres
 * prestations GEORESEAUX (sous-pages et pages existantes Détection /
 * Cartographie), avec leur titre de page comme libellé.
 */
export default function SousPage({ id }: { id: SousPageId }) {
  const page = sousPages[id];
  const autres = [
    { label: detection.hero.h1, href: nav.expertises.items[0].href },
    { label: releves.hero.h1, href: nav.expertises.items[1].href },
    ...(Object.keys(sousPages) as SousPageId[])
      .filter((k) => k !== id)
      .map((k) => ({ label: sousPages[k].label, href: sousPages[k].path })),
  ];
  return (
    <>
      <Seo title={page.seo.title} description={page.seo.description} />
      <PageHero eyebrow={page.tags.join(" • ") || undefined} h1={page.h1} image={page.heroImage} />

      <section className="bg-paper py-[35px]">
        <Container className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            {page.intro.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <img
              src={page.image}
              alt={page.imageAlt}
              loading="lazy"
              className="h-72 w-full rounded-sm object-cover sm:h-[360px]"
            />
          </Reveal>
        </Container>
      </section>

      {page.sections.map((s, i) => (
        <section key={s.heading + i} className={cn("py-[35px]", i % 2 === 0 ? "bg-blue-50/60" : "bg-paper")}>
          <Container className="max-w-3xl">
            {s.heading && <SectionHeading className="mb-4">{s.heading}</SectionHeading>}
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          </Container>
        </section>
      ))}

      <PlateauTechnique />

      <section className="bg-paper py-[35px]">
        <Container>
          <ul className="flex flex-wrap justify-center gap-3">
            {autres.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner label={nav.devisCta.label} to={nav.devisCta.href} />
    </>
  );
}
