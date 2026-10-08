import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { IMAGES, NOS_PRESTATIONS } from "@/lib/constants";

export function NosPrestations() {
  return (
    <section id="georeferencement" className="scroll-mt-[76px] bg-white">
      <div className="container-content py-10 sm:py-14">
        <Reveal>
          <h2 className="max-w-xl font-heading text-[24px] font-bold leading-tight text-brand-blue sm:text-[28px]">
            Localiser les réseaux enterrés sans destruction inutile.
          </h2>
          <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ink-700">
            GEORESEAUX FRANCE réalise des investigations permettant d'identifier et de localiser
            les réseaux et ouvrages présents dans le sous-sol. Selon la configuration du site et
            la nature des ouvrages, différentes technologies peuvent être combinées.
          </p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-2">
        <Reveal delay={0.05} className="grid grid-rows-2">
          <img
            src={IMAGES.prestationsPipes}
            alt=""
            className="h-56 w-full object-cover sm:h-64"
            loading="lazy"
          />
          <img
            src={IMAGES.prestationsPerson}
            alt=""
            className="h-56 w-full object-cover sm:h-64"
            loading="lazy"
          />
        </Reveal>

        <div className="py-10 pl-5 pr-5 sm:py-14 sm:pl-8 lg:py-16 lg:pl-12 lg:pr-[max(2rem,calc((100vw-1280px)/2+2rem))]">
          <h3 className="font-heading text-[22px] font-bold text-brand-blue">Nos prestations</h3>
          <RevealGroup className="mt-5 space-y-5">
            {NOS_PRESTATIONS.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <p className="font-body text-[15px] font-bold text-ink-900">{item.title}</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
