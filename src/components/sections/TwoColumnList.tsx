import { motion } from "framer-motion";
import clsx from "clsx";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type TwoColumnListProps = {
  title: string;
  items: ReadonlyArray<{ title: string; description: string }>;
  tone?: "white" | "lavender";
};

/** Liste 2 colonnes réutilisée pour "Nos interventions". */
export function TwoColumnList({ title, items, tone = "white" }: TwoColumnListProps) {
  return (
    <section className={clsx("py-10 sm:py-14", tone === "lavender" ? "bg-brand-blue-light" : "bg-white")}>
      <div className="container-content">
        <Reveal>
          <SectionHeading>{title}</SectionHeading>
        </Reveal>
        <RevealGroup className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {items.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <p className="font-body text-[15px] font-bold text-ink-900">{item.title}</p>
              <p className="mt-1 font-body text-[14px] leading-relaxed text-ink-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
