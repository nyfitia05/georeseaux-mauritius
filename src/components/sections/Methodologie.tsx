import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { METHODOLOGIE } from "@/lib/constants";

export function Methodologie() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-content">
        <Reveal>
          <SectionHeading align="center">MÉTHODOLOGIE</SectionHeading>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {METHODOLOGIE.map((step) => (
            <motion.div key={`${step.number}-${step.title}`} variants={staggerItem} className="flex gap-4">
              <span className="font-heading text-2xl font-bold text-brand-yellow-dark">
                {step.number}
              </span>
              <div>
                <p className="font-body text-[15px] font-bold text-ink-900">{step.title}</p>
                <p className="mt-1 font-body text-[14px] leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
