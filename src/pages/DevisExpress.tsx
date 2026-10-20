import { Seo } from "@/components/Seo";
import { PageHero } from "@/sections/PageHero";
import { HomeDevisForm } from "@/sections/HomeDevisForm";
import { home } from "@/data/content";
import { splitSentences } from "@/lib/textMarkup";
import { t } from "@/lib/lang";

/**
 * Page dédiée au questionnaire court de demande de devis — reprend le texte
 * exact du bandeau de clôture de l'accueil ("Parlez-nous de votre site") en
 * guise de hero, puis le formulaire (HomeDevisForm). Créée pour que le
 * questionnaire ne soit plus intégré directement sur la page d'accueil, à la
 * demande du client : le bouton du bandeau de fin de l'accueil redirige ici
 * plutôt que d'afficher le formulaire sur la même page.
 *
 * Les 2 phrases de `home.closing.body` sont affichées chacune sur sa propre
 * ligne (demande explicite du client) via `splitSentences` — le texte
 * lui-même reste celui de data/content.ts, seule la mise en forme change ici.
 */
export default function DevisExpress() {
  return (
    <>
      <Seo
        title={`${home.closing.heading} | GEORESEAUX MAURITIUS`}
        description={t(
          "Parlez-nous de votre site : transmettez vos plans et informations, GEORESEAUX MAURITIUS étudie votre besoin et définit l'intervention adaptée à l'Île Maurice.",
          "Tell us about your site: share your plans and information, and GEORESEAUX MAURITIUS will review your needs and define the right intervention in Mauritius.",
        )}
      />
      <PageHero
        h1={home.closing.heading}
        body={splitSentences(home.closing.body).map((sentence, index) => (
          <span key={index} className="block">
            {sentence}
          </span>
        ))}
        align="center"
      />
      <HomeDevisForm />
    </>
  );
}
