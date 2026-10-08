import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { cn } from "@/lib/utils";
import { markSegments } from "@/lib/textMarkup";

interface PageHeroProps {
  eyebrow?: string;
  h1: string;
  /** Mot(s) du h1 à mettre en jaune — même traitement typographique que le
   * hero de l'accueil (HomeHero), qui accentue "Détection," et
   * "cartographie" dans son titre. Le texte du h1 n'est jamais modifié :
   * chaque entrée doit être une sous-chaîne exacte, déjà présente dans le
   * h1 fourni par data/content.ts — ce tableau ne fait que désigner les
   * segments à colorer, pas du contenu nouveau. */
  accent?: string[];
  body?: ReactNode;
  /** Optional full-bleed background photo (e.g. a page that has a real
   * terrain photo instead of a plain field) — when set, it replaces the
   * plain background entirely, same treatment as the homepage hero. */
  image?: string;
  /** Centers the eyebrow/h1/body/children block instead of the default
   * left alignment — used on the pages whose hero content should read as
   * centered (Secteurs, Méthodologie, À propos, Demander un devis). */
  align?: "left" | "center";
  /** Élargit la colonne de texte du hero (h1 + body) — utilisé sur À propos
   * dont le texte de présentation est plus long et bénéficie d'une largeur
   * de lecture plus généreuse que le hero par défaut. */
  wide?: boolean;
  children?: ReactNode;
}

/** Colore en jaune les mots de `accents` au sein de `h1` — voir markSegments
 * (lib/textMarkup) pour le détail du découpage, jamais de reformulation. */
function renderAccentedHeadline(text: string, accents: string[] = []): ReactNode {
  return markSegments(text, accents, (part, key) => (
    <span key={key} className="text-yellow-400">
      {part}
    </span>
  ));
}

/**
 * The shared hero for every interior page: dark blue field, the page's H1,
 * and an optional lead paragraph — kept deliberately calmer than the
 * homepage hero (no multi-stage entrance) so the homepage keeps its
 * "arrival" moment distinct rather than every page opening with the same
 * elaborate sequence.
 */
export function PageHero({ eyebrow, h1, accent, body, image, align = "left", wide = false, children }: PageHeroProps) {
  const centered = align === "center";
  return (
    // mt-20/sm:mt-[88px] is a structural spacer that exactly clears the fixed
    // white navbar's height (56px logo + 24px vertical padding = 80px below
    // sm, 64px logo + 24px = 88px at sm and up) — it isn't "padding" in the
    // visual sense. py-[35px] below is the actual 30px top/bottom padding
    // around the heading content itself.
    <section
      className={cn(
        "relative mt-20 overflow-hidden bg-blue-700 py-[35px] sm:mt-[88px]",
        // Hero un peu plus haut quand il porte une photo — mais sans
        // exagérer sa hauteur (retour client) : juste assez pour que la
        // photo respire, pas une bande écran-pleine comme une V1.
        image && "flex min-h-[300px] items-center sm:min-h-[360px]",
      )}
    >
      {image && (
        <>
          <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
          {/* Voile nettement allégé par rapport à la version précédente
             (90/70/40) — sur les plaquettes de référence, la photo reste
             lisible et claire à droite, seul un dégradé assombri à gauche
             sert d'assise au texte. */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/75 via-blue-900/50 to-blue-900/20" />
        </>
      )}
      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className={cn(wide ? "max-w-5xl" : "max-w-3xl", centered && "mx-auto text-center")}
        >
          {eyebrow && (
            <motion.p variants={fadeUp} className="eyebrow mb-4 text-yellow-400">
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 variants={fadeUp} className="text-[30px] font-semibold leading-[1.25] text-white">
            {renderAccentedHeadline(h1, accent)}
          </motion.h1>
          {body && (
            <motion.div
              variants={fadeUp}
              className={cn(
                "mt-6 text-lg leading-relaxed text-blue-100",
                wide ? "max-w-4xl" : "max-w-2xl",
                centered && "mx-auto",
              )}
            >
              {body}
            </motion.div>
          )}
          {children && (
            <motion.div variants={fadeUp} className={cn("mt-8", centered && "flex justify-center")}>
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
