import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { plateauTechnique, nav } from "@/data/content";

/**
 * "Plateau technique" — bloc repris à l'identique (photo + texte) sur les 4
 * brochures GEORESEAUX FRANCE fournies par le client en septembre 2026 :
 * photo du conseiller disponible en centre d'appels, avec la ligne des
 * horaires et le bouton "Demander un devis" en vis-à-vis. Absent du cahier
 * des charges initial, ajouté à la demande explicite du client pour aligner
 * le site sur ses supports imprimés — voir data/content.ts
 * (plateauTechnique).
 *
 * Simplifié le 30/09 à la demande explicite du client pour coller
 * strictement à l'imprimé : plus de badge jaune "Disponibilité. /
 * Créativité. / Rapidité." ni de lignes "Gestion des mails" / "Gestion des
 * RDV" (absentes des 4 plaquettes) — juste la photo, "Plateau technique",
 * la ligne des horaires et le bouton, comme sur l'imprimé. Photo remplacée
 * par le nouveau visuel fourni par le client (global.png).
 */
export function PlateauTechnique() {
  return (
    <section className="bg-blue-50/60">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[280px] sm:min-h-[360px]">
          {/* Correction (retour client 30/09) : "global.png" ne concernait
             pas cette photo mais celle des sections de restitution
             (après Plateau technique) — la photo du conseiller reste
             agent-support.png sur toutes les pages. */}
          <img
            src="/img/global/agent-support.png"
            alt="Conseiller GEORESEAUX MAURITIUS au téléphone"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:px-16 lg:py-0">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-blue-700 sm:text-3xl">
              {plateauTechnique.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink">
              {plateauTechnique.item.label} <span className="mx-1 text-blue-300">|</span>
              <span className="font-bold">{plateauTechnique.item.detail}</span>
            </p>
            <div className="mt-8">
              <Button to={nav.devisCta.href} variant="primary" withArrow>
                {plateauTechnique.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
