import { Reveal } from "@/components/ui/Reveal";

type IntroBannerProps = {
  title: string;
  description: string;
};

/**
 * Bandeau blanc qui chevauche légèrement le bas du hero — pattern du PDF
 * page Expertises ("Localiser les réseaux enterrés sans destruction
 * inutile.").
 */
export function IntroBanner({ title, description }: IntroBannerProps) {
  return (
    <div className="container-content relative z-10 -mt-8 sm:-mt-10">
      <Reveal>
        <div className="rounded-2xl bg-white px-6 py-8 text-center shadow-card sm:px-10 sm:py-10">
          <h2 className="font-heading text-[22px] font-bold text-brand-blue sm:text-[26px]">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ink-700">
            {description}
          </p>
        </div>
      </Reveal>
    </div>
  );
}
