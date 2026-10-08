import { Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { HomeHero } from "@/sections/HomeHero";
import { PillarsSection } from "@/sections/PillarsSection";
import { PlateauTechnique } from "@/sections/PlateauTechnique";
import { SolutionDigitale } from "@/sections/SolutionDigitale";
import { CtaBanner } from "@/sections/CtaBanner";
import { home, nav, pillars, positioning } from "@/data/content";

// Les 2 cartes juste sous le hero (Détection, Cartographie — la carte
// Monitoring a été retirée le 08/10/2026, le monitoring passant sur le site
// Water Leak Equipment). Photos choisies pour coller au plus près
// des 3 visuels de la brochure (vue aérienne de résidence / carte avec tracés
// colorés / équipement de monitoring en gros plan) parmi les images déjà
// disponibles sur le site — aucune nouvelle image nécessaire.
const introItems = [
  { ...home.intro.items[0], image: "/img/accueil/detection-hero.png", href: nav.expertises.items[0].href },
  { ...home.intro.items[1], image: "/img/accueil/patrimonial.png", href: nav.expertises.items[1].href },
];

// Page réécrite en septembre 2026 pour reprendre section par section, mot
// pour mot, la brochure GEORESEAUX_FRANCE.pdf — à la demande explicite et
// répétée du client ("EXACTEMENT COMME LE PDF, TU EFFACES CE QUI EST LÀ ET TU
// NE METS QUE ÇA"). Tout ce qui ne figure pas sur cette plaquette a été
// retiré (voir le commentaire sur `home` dans data/content.ts pour le détail
// de ce qui a été enlevé).
export default function Home() {
  return (
    <>
      <Seo title={home.seo.title} />
      <HomeHero />

      {/* Bloc des 3 cartes — directement après le hero sur la plaquette,
         sans titre de section au-dessus. Fond blanc (retour du client le
         30/09 : le fond bleu clair passe maintenant à la bannière des
         secteurs juste en dessous, pour alterner blanc/bleu/blanc plutôt que
         bleu/bleu/blanc). */}
      <section className="bg-paper py-[35px]">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
            {introItems.map((item) => (
              <div key={item.title}>
                <Reveal>
                  <a href={item.href} className="group block">
                    <div className="h-48 overflow-hidden rounded-sm sm:h-56">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-4 font-display text-base font-bold tracking-wide text-blue-700">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                  </a>
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bandeau des secteurs accompagnés — bannière à coches, 4 colonnes,
         juste sous les 3 cartes sur la plaquette GEORESEAUX_FRANCE.pdf.
         Remplace la mini-liste de 4 mots qui était affichée dans le hero
         (incomplète et mal placée par rapport à la plaquette — voir le
         commentaire sur `home.audiences` dans data/content.ts). */}
      <section className="border-y border-blue-100 bg-blue-50/60 py-10">
        <Container>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {home.audiences.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm font-medium text-ink">
                <Check className="mt-0.5 h-4 w-4 flex-none text-blue-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* "De la connaissance du réseau à sa surveillance" — les 4 piliers
         numérotés (01 → 04) exactement comme sur la plaquette. Fond blanc
         (échangé avec la section des 3 cartes au-dessus), à la demande du
         client. */}
      <section className="bg-paper py-[35px]">
        <Container>
          <SectionHeading align="center" className="mx-auto mb-12 max-w-3xl">
            {positioning}
          </SectionHeading>
          <PillarsSection pillars={pillars} />
        </Container>
      </section>

      <PlateauTechnique />
      <SolutionDigitale
        {...home.restitution}
        image="/img/accueil/restitution.png"
        imageAlt="Exemple de restitution GEORESEAUX MAURITIUS"
      />

      {/* Bandeau de clôture — texte exact de la plaquette ("Parlez-nous de
         votre site"), fond bleu clair comme tous les autres CTA du site (le
         client est revenu sur sa demande précédente de voile bleu foncé). Le
         bouton redirige vers le questionnaire court (/devis-express/) plutôt
         que d'afficher le formulaire directement sur la page d'accueil. */}
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
