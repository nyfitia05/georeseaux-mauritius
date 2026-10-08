import { Check } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface SolutionDigitaleProps {
  /** Titre de section — absent sur la brochure Détection (le paragraphe suit
   * directement "Plateau technique"), présent ailleurs ("Une restitution
   * adaptée à chaque mission", "Une cartographie claire et exploitable",
   * "Une surveillance connectée"). */
  heading?: string;
  intro: string;
  items?: string[];
  /** Phrase de clôture propre à ce bloc (utilisée seulement sur l'accueil —
   * les autres pages affichent déjà leur phrase de clôture de plaquette dans
   * le bandeau CtaBanner qui suit, via sa prop `heading`). */
  closing?: string;
  /** Image propre à chaque page (fournie par le client le 30/09 pour
   * Cartographie et Monitoring) — reste sur le visuel générique du rapport
   * d'intervention tant qu'aucune image dédiée n'a été fournie (Accueil,
   * Détection, Copropriété). */
  image?: string;
  imageAlt?: string;
}

/**
 * Section "restitution" : chacune des 4 brochures GEORESEAUX FRANCE a sa
 * propre version de cette section, avec un texte différent — "Une
 * restitution adaptée à chaque mission" (accueil), le rapport technique
 * détaillé (détection), "Une cartographie claire et exploitable" (relevés &
 * cartographie), "Une surveillance connectée" (monitoring). Remplace
 * l'ancien composant à contenu fixe ("Une solution digitale" / rapport sous
 * 48h) qui affichait le même texte, identique, sur toutes les pages — ce
 * texte ne correspond en réalité à aucune des 4 brochures retransmises par
 * le client fin septembre 2026 (probablement une version antérieure de la
 * plaquette, depuis remplacée). Voir data/content.ts pour le contenu de
 * chaque page (home.restitution, detection.rapport, releves.cartographie,
 * monitoring.surveillance).
 *
 * L'illustration reste volontairement inchangée (même image sur toutes les
 * pages) : les visuels ne sont pas traités dans cette passe de mise à jour,
 * le client doit fournir les bons liens séparément.
 */
export function SolutionDigitale({
  heading,
  intro,
  items,
  closing,
  image = "/img/global/rapport-intervention.png",
  imageAlt = "Exemple de restitution GEORESEAUX MAURITIUS",
}: SolutionDigitaleProps) {
  return (
    <section className="bg-paper py-[35px]">
      <Container>
        {/* Retour client : l'essai précédent (image en fond de colonne,
           object-cover) recadrait la photo du rapport — le client veut
           l'image ENTIÈRE, non recadrée, juste affichée en plus petit. Donc
           pas de crop/object-cover ici : taille naturelle de l'image,
           contrainte seulement par max-w-xs (plus petit que le max-w-sm
           d'origine). */}
        {/* items-stretch (au lieu de items-center) : la colonne image doit
           occuper toute la hauteur de la ligne, qui varie beaucoup d'une
           page à l'autre (8 puces pour Détection, 4 pour Cartographie/
           Monitoring, aucune pour l'accueil) — retour client : "il faut
           mettre proportionnel avec leur texte, genre full image mais
           proportionnel au texte". L'image reste entière (object-contain,
           jamais recadrée) mais sa hauteur affichée suit celle du texte
           plutôt qu'une taille fixe identique sur toutes les pages. */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            {heading && (
              <h2 className="font-display text-2xl font-semibold text-blue-700 sm:text-3xl">{heading}</h2>
            )}
            <p className={cn("max-w-xl text-lg leading-relaxed text-ink", heading && "mt-6")}>{intro}</p>
            {items && items.length > 0 && (
              <ul className="mt-4 max-w-xl space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base leading-relaxed text-ink">
                    <Check className="mt-1 h-4 w-4 flex-none text-blue-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {closing && <p className="mt-6 max-w-xl text-lg font-medium text-blue-700">{closing}</p>}
          </Reveal>
          {/* Légèrement agrandies (retour client) : max-w et max-h augmentés
             d'un cran chacun. */}
          <Reveal delay={0.1} className="flex min-h-[240px] items-center justify-center lg:justify-end">
            <img
              src={image}
              alt={imageAlt}
              className="h-full max-h-[500px] w-full max-w-md rounded-sm object-contain shadow-lg"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
