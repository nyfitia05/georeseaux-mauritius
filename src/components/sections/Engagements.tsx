import { BadgeCheck, Cpu, FileSearch, Lightbulb, Search, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ENGAGEMENTS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  "badge-check": BadgeCheck,
  "file-search": FileSearch,
  cpu: Cpu,
  lightbulb: Lightbulb,
};

export function Engagements() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="container-content">
        <Reveal>
          <SectionHeading align="center">Nos engagements</SectionHeading>
        </Reveal>

        <RevealGroup className="mx-auto mt-10 grid max-w-3xl gap-x-10 gap-y-10 text-center sm:grid-cols-3">
          {ENGAGEMENTS.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <motion.div key={item.title} variants={staggerItem} className="flex flex-col items-center">
                <Icon className="h-8 w-8 text-brand-blue" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-3 font-body text-[15px] font-bold text-ink-900">{item.title}</p>
                <p className="mt-1.5 font-body text-[13px] leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
