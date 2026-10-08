import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";
import { CONTACT_PHONE, CONTACT_PHONE_HREF, IMAGES } from "@/lib/constants";

const ITEMS = [
  { label: "Gestion des appels", detail: "du Lundi au samedi 8h – 19h" },
  { label: "Gestion des mails", detail: "7/7 jours" },
  { label: "Gestion des RDV", detail: "dans la journée" },
];

/**
 * Image en plein-bleed à gauche (aucun radius, aucun padding vertical —
 * elle occupe toute la hauteur de la section, bord à bord), texte à droite
 * avec le confort d'un container classique.
 */
export function PlateauTechnique() {
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        <Reveal className="relative min-h-[320px]">
          <img src={IMAGES.plateauTechnique} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div className="absolute bottom-0 left-0 bg-brand-blue-dark/90 px-5 py-4">
            <p className="font-heading text-[17px] font-bold leading-tight text-white">
              Disponibilité.
              <br />
              Créativité.
              <br />
              Rapidité.
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="flex flex-col justify-center py-10 pl-5 pr-5 sm:py-14 sm:pl-8 lg:py-16 lg:pl-12 lg:pr-[max(2rem,calc((100vw-1280px)/2+2rem))]"
        >
          <h2 className="font-heading text-[26px] font-bold text-brand-blue sm:text-[28px]">
            Plateau technique
          </h2>
          <p className="mt-4 font-body text-[15px] font-bold text-ink-900">Nous gérons :</p>
          <ul className="mt-3 space-y-2.5">
            {ITEMS.map((item) => (
              <li key={item.label} className="font-body text-[15px] text-ink-700">
                {item.label} <span className="font-bold text-ink-900">| {item.detail}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink to="/contact">Demander un devis</ButtonLink>
            <ButtonAnchor href={`tel:${CONTACT_PHONE_HREF}`} variant="outline-blue" withArrow={false}>
              {CONTACT_PHONE}
            </ButtonAnchor>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
