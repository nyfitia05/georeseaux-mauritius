import { Link } from "react-router-dom";
import type { monitoring } from "@/data/content";

interface MonitoringGridProps {
  items: (typeof monitoring)["items"];
}

// Photos terrain fournies par le client (public/img/monitoring/*.png),
// associées par slug aux 6 applications de GEORESEAUX Monitoring — les noms
// de fichiers ne correspondent pas tous mot pour mot au slug (le monitoring
// "forage" est illustré par captage.png, "niveau" par niveaux.png) : mapping
// fait à vue, à confirmer si ce n'est pas la bonne association.
const monitoringImages: Record<string, string> = {
  conso: "/img/monitoring/conso.png",
  niveau: "/img/monitoring/niveaux.png",
  forage: "/img/monitoring/captage.png",
  relevage: "/img/monitoring/relevage.png",
  surpression: "/img/monitoring/surpression.png",
  reseaux: "/img/monitoring/reseaux.png",
};

type MonitoringItem = (typeof monitoring)["items"][number];

/** Une carte : photo en haut, titre en majuscules et texte centrés dessous. */
function MonitoringCard({ item }: { item: MonitoringItem }) {
  return (
    <Link
      to={item.href}
      className="group flex h-full flex-col border border-blue-100 bg-blue-50/60 text-center transition-colors duration-300 hover:border-blue-300"
    >
      <div className="overflow-hidden">
        <img
          src={monitoringImages[item.slug]}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
      </div>
    </Link>
  );
}

/** Les 6 applications GEORESEAUX Monitoring, en grille statique 3 colonnes
 * (2 rangées de 3) — reprend exactement la mise en page de la brochure
 * GEORESEAUX_MONITORING.pdf ("Applications"). Remplace l'ancien carrousel à
 * défilement horizontal : avec un ordre et un nombre de cartes fixes (6),
 * une grille qui s'enroule sur plusieurs rangées en dessous de lg convient
 * mieux qu'un défilement, et colle à la maquette de référence. */
export function MonitoringGrid({ items }: MonitoringGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.slug}>
          <MonitoringCard item={item} />
        </li>
      ))}
    </ul>
  );
}
