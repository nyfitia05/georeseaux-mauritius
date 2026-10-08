import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { APPROCHE_GLOBALE } from "@/lib/constants";

export function ApprocheGlobale() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-content grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <Reveal>
            <SectionHeading>Une approche globale</SectionHeading>
          </Reveal>
          <RevealGroup className="mt-6 space-y-5">
            {APPROCHE_GLOBALE.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <p className="font-body text-[15px] font-bold text-ink-900">{item.title}</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>

        <Reveal delay={0.1} className="flex">
          <div className="flex flex-col justify-center rounded-2xl border-2 border-brand-yellow bg-white p-8">
            <h3 className="font-heading text-[22px] font-bold leading-tight text-brand-blue">
              Un patrimoine plus simple à suivre
            </h3>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-700">
              Associer cartographie et données terrain permet de disposer d'une vision plus
              complète et évolutive des infrastructures.
            </p>
            <ButtonLink to="/contact" className="mt-6 self-start">
              Étudier mon projet
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
