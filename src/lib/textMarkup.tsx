import type { ReactNode } from "react";

/**
 * Découpe `text` autour des sous-chaînes listées dans `segments` et enrobe
 * chacune avec `wrap` (un <span> jaune pour un accent de titre, un <strong>
 * pour une mise en gras) — jamais de reformulation : chaque entrée de
 * `segments` doit être une sous-chaîne exacte déjà présente dans `text`. Ce
 * helper ne fait que désigner les segments à mettre en valeur, pas du
 * contenu nouveau.
 *
 * Partagé entre PageHero (accents jaunes sur les titres) et les blocs
 * "Plateau technique" / "Une solution digitale" (mise en gras de certains
 * segments) pour éviter de dupliquer la même logique de découpe.
 */
export function markSegments(
  text: string,
  segments: string[] = [],
  wrap: (part: string, key: number) => ReactNode,
): ReactNode {
  if (segments.length === 0) return text;
  const escaped = segments.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  return text.split(pattern).map((part, index) => (segments.includes(part) ? wrap(part, index) : part));
}

/**
 * Découpe `text` en phrases (sur ". ") pour les afficher chacune sur sa
 * propre ligne — demande explicite du client sur le bandeau de clôture de
 * /devis-express/ ("Transmettez-nous... GEORESEAUX FRANCE étudie..."), sans
 * dupliquer le texte source dans data/content.ts sous forme de tableau : le
 * texte lui-même ne change pas, seule sa mise en forme à l'affichage.
 */
export function splitSentences(text: string): string[] {
  return text.split(/(?<=\.)\s+/).filter(Boolean);
}
