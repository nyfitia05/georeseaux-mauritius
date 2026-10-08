import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { brand, nav } from "@/data/content";
import { t } from "@/lib/lang";

export default function NotFound() {
  return (
    <>
      <Seo title={`${t("Page introuvable", "Page not found")} | ${brand.name}`} />
      <section className="flex min-h-[70vh] items-center bg-paper py-[35px]">
        <Container className="text-center">
          <p className="eyebrow justify-center">{t("Erreur 404", "Error 404")}</p>
          <h1 className="mt-4 font-display text-[30px] font-semibold text-ink">{t("Page introuvable", "Page not found")}</h1>
          <div className="mt-8 flex justify-center">
            <Button to={nav.accueil.href} variant="secondary">
              {t("Retour à l'accueil", "Back to home")}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
