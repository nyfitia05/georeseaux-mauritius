import { Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { brand, nav, plateauTechnique } from "@/data/content";

/**
 * "Plateau technique" — refait en octobre 2026 sur le modèle de Water Leak
 * Expert : bandeau bleu nuit, photo du conseiller à droite fondue dans le
 * bleu, "Nous gérons :" puis une ligne par service (le détail en jaune après
 * une barre), boutons téléphone + demande de devis. Utilisé sur l'accueil et
 * sur les pages expertises.
 */
export function PlateauTechnique() {
  const { heading, headingAccent, intro, items, cta } = plateauTechnique;
  const accentAt = heading.lastIndexOf(headingAccent);
  const headingLead = accentAt > 0 ? heading.slice(0, accentAt) : heading + " ";
  const accent = accentAt > 0 ? headingAccent : "";

  return (
    <section className="relative overflow-hidden bg-blue-900 text-white">
      <div className="absolute inset-y-0 right-0 w-full opacity-20 lg:w-[55%] lg:opacity-100" aria-hidden>
        <img src="/img/global/agent-support.png" alt="" className="h-full w-full object-cover object-[center_25%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-900/60 to-transparent lg:via-blue-900/50" />
      </div>

      <div className="container-content relative py-16 lg:py-20">
        <Reveal className="max-w-[600px]">
          <h2 className="font-display text-[28px] font-bold leading-tight text-white sm:text-4xl">
            {headingLead}
            <span className="text-yellow-500">{accent}</span>
          </h2>
          <p className="mb-3.5 mt-6 text-lg text-white/80">{intro}</p>
          <ul className="mb-8 flex flex-col gap-2 text-lg">
            {items.map((item) => (
              <li key={item.label}>
                {item.label} <span className="mx-1 font-normal text-white">|</span>
                <strong className="font-semibold text-yellow-500">{item.detail}</strong>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3.5">
            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-yellow-500 px-8 py-3.5 text-lg font-bold text-blue-900 transition-colors hover:bg-yellow-400"
            >
              <Phone className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden />
              {brand.phone}
            </a>
            <Button
              to={nav.devisCta.href}
              variant="ghost"
              withArrow
              className="px-8 py-3.5 text-lg text-white ring-white/80 hover:bg-white/10"
            >
              {cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
