import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { AgencesMap } from "@/components/sections/AgencesMap";
import { IMAGES } from "@/lib/constants";

export function Contact() {
  return (
    <>
      <PageHero image={IMAGES.heroContact} compact>
        <h1 className="font-heading text-[34px] font-bold leading-[1.15] text-white sm:text-[42px]">
          Parlons de <span className="text-brand-yellow">votre projet</span>
        </h1>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-white/90">
          Vous avez besoin de localiser, géoréférencer ou cartographier vos réseaux ? Transmettez-
          nous les informations disponibles sur votre site et notre équipe pourra étudier votre
          besoin.
        </p>
      </PageHero>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-content mx-auto max-w-2xl">
          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <AgencesMap />
    </>
  );
}
