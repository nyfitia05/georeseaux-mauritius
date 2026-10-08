import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { FormField } from "@/components/FormField";
import { RadioCardGroup } from "@/components/RadioCardGroup";
import { CheckboxCardGroup } from "@/components/CheckboxCardGroup";
import { Button } from "@/components/Button";
import { EASE_SIGNATURE } from "@/animations/variants";
import { devisAccueil, devis } from "@/data/content";
import { renderEmailSections, type EmailSection } from "@/lib/emailTemplate";
import { sendDevisEmail } from "@/lib/sendEmail";
import { lang, t } from "@/lib/lang";

type Status = "idle" | "submitting" | "sent";

const AUTRE = t("Autre", "Other");

/** Même vocabulaire visuel que StepLegend dans Devis.tsx (badge numéroté +
 * légende) — dupliqué ici plutôt que partagé car les deux formulaires
 * évoluent indépendamment et n'ont pas le même nombre d'étapes. */
function StepLegend({ step, children }: { step: string; children: string }) {
  return (
    <legend className="mb-6 flex w-full items-center gap-4 border-b border-blue-100 pb-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 font-display text-sm font-semibold text-white">
        {step}
      </span>
      <span className="font-display text-lg font-semibold text-blue-700">{children}</span>
    </legend>
  );
}

/** Champ "Autre : [Champ]" — n'apparaît que si l'option "Autre" est
 * sélectionnée, même logique que dans Devis.tsx. */
function AutrePrecision({
  visible,
  name,
  value,
  onChange,
}: {
  visible: boolean;
  name: string;
  value: string;
  onChange: (value: string) => void;
}) {
  if (!visible) return null;
  return (
    <div className="mt-4">
      <FormField label={t("Précisez", "Please specify")} name={name} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

/**
 * Questionnaire court intégré directement en page d'accueil — à la demande
 * explicite du client, distinct du formulaire complet de /demander-un-devis/
 * (7 sections au lieu de 9, pas de pièce jointe, pas de délai souhaité). Sert
 * désormais de véritable point de conversion de la page d'accueil : le
 * bandeau de clôture juste au-dessus n'a plus de bouton, ce formulaire en
 * tient lieu.
 */
export function HomeDevisForm() {
  const [besoin, setBesoin] = useState<string | null>(null);
  const [besoinAutre, setBesoinAutre] = useState("");
  const [reseaux, setReseaux] = useState<string[]>([]);
  const [typeSite, setTypeSite] = useState<string | null>(null);
  const [typeSiteAutre, setTypeSiteAutre] = useState("");
  const [plan, setPlan] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Bug corrigé (septembre 2026) : cette vérification coupait la soumission
    // sans jamais rien afficher — un visiteur qui oubliait de cocher une
    // option en section 03 (aucun astérisque ne la signalait comme
    // obligatoire, contrairement aux champs texte) cliquait sur "Envoyer" et
    // ne voyait absolument rien se passer. On affiche maintenant une erreur
    // explicite au lieu de sortir en silence.
    if (!besoin) {
      setError(t("Merci de sélectionner une option dans « 03 — Votre besoin » avant d'envoyer votre demande.", "Please select an option in “03 — Your needs” before sending your request."));
      return;
    }

    // formData ne sert plus qu'à lire les champs non contrôlés du <form> —
    // rien n'est plus envoyé sous cette forme depuis le passage à EmailJS
    // (02/10/2026, voir Devis.tsx pour le même changement et pourquoi).
    const formData = new FormData(event.currentTarget);
    if (formData.get("botcheck")) {
      return;
    }

    const get = (name: string) => (formData.get(name) as string) || "—";
    const list = (values: string[]) => (values.length === 0 ? "—" : values.join(", "));
    const single = (value: string | null, autre: string) =>
      value === AUTRE && autre ? `${AUTRE} (${autre})` : value || "—";

    setError(null);
    setStatus("submitting");

    const sections: EmailSection[] = [
      {
        step: "1",
        heading: devisAccueil.coordonnees.heading,
        rows: [
          { label: "Nom / Prénom", value: get("nomPrenom") },
          { label: "Société / Copropriété", value: get("societe") },
          { label: "Téléphone", value: get("telephone") },
          { label: "E-mail", value: get("email") },
        ],
      },
      {
        step: "2",
        heading: devisAccueil.adresseSite.heading,
        rows: [
          { label: "Adresse", value: get("adresse") },
          { label: "Code postal / Ville", value: get("codePostalVille") },
        ],
      },
      {
        step: "3",
        heading: devisAccueil.besoin.heading,
        rows: [{ label: "Demande", value: single(besoin, besoinAutre) }],
      },
      {
        step: "4",
        heading: devisAccueil.reseaux.heading,
        rows: [{ label: "Réseaux", value: list(reseaux) }],
      },
      {
        step: "5",
        heading: devisAccueil.typeSite.heading,
        rows: [{ label: "Type de site", value: single(typeSite, typeSiteAutre) }],
      },
      {
        step: "6",
        heading: devisAccueil.plan.heading,
        rows: [{ label: "Réponse", value: plan || "—" }],
      },
      {
        step: "7",
        heading: devisAccueil.complementaire.heading,
        rows: [{ label: "Précisions", value: get("complementaire") }],
      },
    ];

    const result = await sendDevisEmail({
      subject: `Nouvelle demande de devis${lang === "en" ? " (client anglophone)" : ""} — ${single(besoin, besoinAutre)} (page d'accueil)`,
      from_name: "Formulaire GEORESEAUX MAURITIUS — Page d'accueil",
      reply_to: get("email"),
      sections_html: renderEmailSections(sections),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      setError(
        result.error === "missing_config"
          ? t("Le formulaire n'est pas encore configuré (identifiants EmailJS manquants). Contactez GEORESEAUX MAURITIUS directement en attendant.", "The form is not configured yet. Please contact GEORESEAUX MAURITIUS directly in the meantime.")
          : t("L'envoi a échoué. Vérifiez votre connexion et réessayez, ou contactez GEORESEAUX MAURITIUS directement si le problème persiste.", "Sending failed. Please check your connection and try again, or contact GEORESEAUX MAURITIUS directly if the problem persists."),
      );
    }
  };

  return (
    <section className="bg-paper py-[35px]">
      <Container className="max-w-4xl">
        {status === "sent" ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SIGNATURE }}
            className="flex flex-col items-center gap-4 rounded-sm border border-blue-100 bg-blue-50 px-8 py-16 text-center sm:py-20"
          >
            <CheckCircle2 className="h-10 w-10 text-blue-600" aria-hidden />
            <p className="font-display text-2xl font-semibold text-blue-700">{devis.success.heading}</p>
            <p className="max-w-md text-base text-ink-soft">{devis.success.body}</p>
          </motion.div>
        ) : (
          <Reveal>
            <div className="rounded-sm border border-blue-100 border-t-4 border-t-blue-600 bg-white p-6 sm:p-10 lg:p-14">
              <form onSubmit={handleSubmit} className="space-y-14">
                {/* Piège à bots Web3Forms — voir Devis.tsx. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                />

                <fieldset>
                  <StepLegend step="01">{devisAccueil.coordonnees.heading}</StepLegend>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                    {devisAccueil.coordonnees.fields.map((field) => (
                      <FormField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        required={field.required}
                        type={field.type ?? "text"}
                      />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <StepLegend step="02">{devisAccueil.adresseSite.heading}</StepLegend>
                  <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                    {devisAccueil.adresseSite.fields.map((field) => (
                      <FormField key={field.name} label={field.label} name={field.name} required={field.required} />
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <StepLegend step="03">{devisAccueil.besoin.heading}</StepLegend>
                  <p className="mb-4 text-sm font-medium text-ink">
                    Sélectionnez une option <span className="text-yellow-600">*</span>
                  </p>
                  <RadioCardGroup name="besoin" options={devisAccueil.besoin.options} value={besoin} onChange={setBesoin} />
                  <AutrePrecision
                    visible={besoin === AUTRE}
                    name="besoinAutre"
                    value={besoinAutre}
                    onChange={setBesoinAutre}
                  />
                </fieldset>

                <fieldset>
                  <StepLegend step="04">{devisAccueil.reseaux.heading}</StepLegend>
                  <CheckboxCardGroup name="reseaux" options={devisAccueil.reseaux.options} values={reseaux} onChange={setReseaux} />
                </fieldset>

                <fieldset>
                  <StepLegend step="05">{devisAccueil.typeSite.heading}</StepLegend>
                  <RadioCardGroup
                    name="typeSite"
                    options={devisAccueil.typeSite.options}
                    value={typeSite}
                    onChange={setTypeSite}
                  />
                  <AutrePrecision
                    visible={typeSite === AUTRE}
                    name="typeSiteAutre"
                    value={typeSiteAutre}
                    onChange={setTypeSiteAutre}
                  />
                </fieldset>

                <fieldset>
                  <StepLegend step="06">{devisAccueil.plan.heading}</StepLegend>
                  <RadioCardGroup name="plan" options={devisAccueil.plan.options} value={plan} onChange={setPlan} />
                </fieldset>

                <fieldset>
                  <StepLegend step="07">{devisAccueil.complementaire.heading}</StepLegend>
                  <FormField label={devisAccueil.complementaire.label} name="complementaire" multiline />
                </fieldset>

                {error && (
                  <p className="flex items-start gap-2 rounded-sm border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {error}
                  </p>
                )}

                <Button type="submit" variant="primary" withArrow disabled={status === "submitting"} className="w-full sm:w-auto">
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      {t("Envoi…", "Sending…")}
                    </>
                  ) : (
                    devis.submit
                  )}
                </Button>
              </form>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
