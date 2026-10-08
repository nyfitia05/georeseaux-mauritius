import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { brand, nav } from "@/data/content";

export default function NotFound() {
  return (
    <>
      <Seo title={`Page introuvable | ${brand.name}`} />
      <section className="flex min-h-[70vh] items-center bg-paper py-[35px]">
        <Container className="text-center">
          <p className="eyebrow justify-center">Erreur 404</p>
          <h1 className="mt-4 font-display text-[30px] font-semibold text-ink">Page introuvable</h1>
          <div className="mt-8 flex justify-center">
            <Button to={nav.accueil.href} variant="secondary">
              Retour à l'accueil
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
