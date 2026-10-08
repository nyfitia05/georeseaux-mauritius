import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { brand } from "@/data/content";
import { t } from "@/lib/lang";

interface CtaBannerProps {
  label: string;
  to: string;
  heading?: string;
  /** Show the "Être rappelé" secondary CTA (cahier des charges développeur
   * §10, "CTA secondaires : Étudier mon projet / Être rappelé"). On by
   * default since no page-specific alternative wording was given for it. */
  withCallback?: boolean;
  /** Petite légende affichée sous le bouton principal — utilisée pour
   * "Quelques informations suffisent pour nous permettre d'analyser votre
   * besoin." sous le CTA "Préparer mon devis" (demande explicite du client).
   * Absente par défaut : les autres pages n'en ont pas. */
  subtitle?: string;
  /** "light" (par défaut) : fond bleu très clair, texte foncé — traitement
   * demandé par le client pour tous les bandeaux de clôture, accueil compris
   * ("mettez le CTA comme les autres sur un fond bleu clair"). "dark" :
   * voile bleu foncé, texte blanc — disponible si besoin ponctuel, mais plus
   * utilisé par défaut nulle part depuis la dernière consigne du client. */
  tone?: "light" | "dark";
}

/** The recurring end-of-page CTA. `heading` defaults to the brand signature
 * so every page closes on "Connaître aujourd'hui. Sécuriser demain." unless
 * a page has its own closing line from the source content. Ordre du
 * contenu : heading, puis subtitle (le texte continue la phrase du
 * heading), puis le bouton — le subtitle doit se lire AVANT le bouton, pas
 * après (corrigé suite au retour du client : "Parlez-nous de votre site"
 * puis "Transmettez-nous..." puis le bouton, dans cet ordre). */
export function CtaBanner({
  label,
  to,
  heading = brand.signature,
  withCallback = true,
  subtitle,
  tone = "light",
}: CtaBannerProps) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden py-[35px]", dark ? "bg-blue-700" : "bg-blue-50/60")}>
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <Reveal>
          <p className={cn("font-display text-2xl font-semibold sm:text-3xl", dark ? "text-white" : "text-blue-700")}>
            {heading}
          </p>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.08}>
            <p className={cn("max-w-2xl text-base", dark ? "text-blue-100" : "text-ink-soft")}>{subtitle}</p>
          </Reveal>
        )}
        <Reveal delay={0.16} className="flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button to={to} variant="primary" withArrow>
              {label}
            </Button>
            {withCallback && (
              <Button to={to} variant="ghost" className={dark ? "text-white" : "text-blue-700"}>
                {t("Être rappelé", "Request a call back")}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
