import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { PageHero } from "@/sections/PageHero";
import { MonitoringGrid } from "@/sections/MonitoringGrid";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { SolutionDigitale } from "@/sections/SolutionDigitale";
import { CtaBanner } from "@/sections/CtaBanner";
import { monitoring, nav } from "@/data/content";

// Page réécrite en septembre 2026 pour coller mot pour mot à la brochure
// GEORESEAUX_MONITORING.pdf : hero sans texte de corps, "Applications"
// directement suivi des 6 cartes en grille statique (plus de carrousel),
// bandeau photo, plus de section "Mise en œuvre" ni "Détecter.
// Cartographier. Surveiller." (absentes de la plaquette), un seul CTA en bas
// de page.
export default function Monitoring() {
  return (
    <>
      <Seo title={monitoring.seo.title} />
      <PageHero
        h1={monitoring.hero.h1}
        accent={["d'eau 24 h/24"]}
        image="/img/accueil/monitoring.png"
        align="center"
      />

      {/* Grille "Applications" + bandeau "Gardez à distance..." réunis dans
         une seule section (même fond, pas de coupure entre les deux) pour
         que le bandeau lise comme la suite immédiate de la grille plutôt que
         comme un bloc séparé plus bas dans la page — retour explicite du
         client ("faites remonter un peu, comme si ça fait partie de ce qui
         est au début"). Photo réduite en hauteur pour la même raison. */}
      <section className="bg-paper py-[35px]">
        <Container className="max-w-[2000px] text-center">
          <SectionHeading align="center">Applications</SectionHeading>
          <div className="mt-12">
            <MonitoringGrid items={monitoring.items} />
          </div>
        </Container>
        <Container className="mt-6 max-w-[2000px] text-left">
          {/* h-[600px] testé le 01/10/2026 à la demande du client : rendu
             confirmé cassé (items-stretch étire la colonne texte sur 600px,
             la phrase se retrouve seule dans un grand pavé bleu vide) —
             revenu à une hauteur plus raisonnable, toujours plus haute que le
             gabarit "bandeau fin" d'origine (h-28/h-32). */}
          <div className="grid grid-cols-1 items-stretch gap-0 border border-blue-100 bg-blue-50/60 sm:grid-cols-[1.1fr_1fr]">
            <div className="h-48 overflow-hidden sm:h-56">
              <img src="/img/monitoring/mec.png" alt="" aria-hidden className="h-full w-full object-cover" />
            </div>
            <p className="flex items-center p-6 text-base leading-relaxed text-ink sm:p-7">
              {monitoring.banner}
            </p>
          </div>
        </Container>
      </section>

      <PlateauTechnique />
      <SolutionDigitale
        {...monitoring.surveillance}
        image="/img/monitoring/monitoring.png"
        imageAlt="Exemple de tableau de bord GEORESEAUX Monitoring"
      />

      <CtaBanner
        label={monitoring.cta}
        to={nav.devisCta.href}
        heading={monitoring.tagline}
        withCallback={false}
      />
    </>
  );
}
