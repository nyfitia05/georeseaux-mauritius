import clsx from "clsx";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, staggerItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

type ClientsGridProps = {
  title: string;
  items: ReadonlyArray<{ title: string; description: string }>;
  tone?: "white" | "lavender";
};

/**
 * Grille 2 colonnes réutilisée pour "Nos clients" (accueil) et "Des
 * solutions adaptées à chaque patrimoine" (expertises) — même contenu
 * client, même composant, comme dans le PDF.
 */
export function ClientsGrid({ title, items, tone = "white" }: ClientsGridProps) {
  return (
    <section className={clsx("py-10 sm:py-14", tone === "lavender" ? "bg-brand-blue-light" : "bg-white")}>
      <div className="container-content">
        <Reveal>
          <SectionHeading align="center">{title}</SectionHeading>
        </Reveal>

        <RevealGroup className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {items.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <h3 className="font-body text-[15px] font-bold text-ink-900">{item.title}</h3>
              <p className="mt-1.5 font-body text-[14px] leading-relaxed text-ink-500">
                {item.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
