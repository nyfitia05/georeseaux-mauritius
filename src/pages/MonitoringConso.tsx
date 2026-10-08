import { Seo } from "@/components/Seo";
import { PageHero } from "@/sections/PageHero";
import { CtaBanner } from "@/sections/CtaBanner";
import { monitoring, nav } from "@/data/content";

/**
 * Priorité 1 du plan SEO : seule déclinaison de GEORESEAUX Monitoring à
 * disposer d'une page dédiée dans cette phase — les cinq autres (Niveaux,
 * Points stratégiques, Relevage, Surpression, Forages & captages) restent
 * des cartes sur /monitoring/. La section "Mise en œuvre" qui suivait le
 * hero a été retirée : elle ne figure sur aucune des brochures de référence
 * et sa donnée (monitoring.miseEnOeuvre) a été supprimée de data/content.ts
 * lors de la mise en conformité de septembre 2026.
 */
export default function MonitoringConso() {
  const item = monitoring.items.find((entry) => entry.slug === "conso")!;

  return (
    <>
      <Seo title={monitoring.seo.title.replace("Monitoring des Réseaux & Équipements", item.title)} />
      <PageHero eyebrow={nav.monitoring.label} h1={item.title} accent={["Conso"]} body={item.text} />

      <CtaBanner label={monitoring.cta} to={nav.devisCta.href} withCallback={false} />
    </>
  );
}
