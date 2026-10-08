import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/sections/PageHero";
import { FormField } from "@/components/FormField";
import { RadioCardGroup } from "@/components/RadioCardGroup";
import { CheckboxCardGroup } from "@/components/CheckboxCardGroup";
import { Button } from "@/components/Button";
import { EASE_SIGNATURE } from "@/animations/variants";
import { devis } from "@/data/content";
import { renderEmailSections, type EmailSection } from "@/lib/emailTemplate";
import { sendDevisEmail } from "@/lib/sendEmail";

type Status = "idle" | "submitting" | "sent";

const AUTRE = "Autre";

/** Un badge numéroté + une légende — même vocabulaire visuel que les étapes
 * de MethodologyPath (cercle, chiffre, tracking large), repris ici en
 * statique pour donner au formulaire une structure "dossier à remplir en N
 * étapes" plutôt que des blocs indifférenciés. `<legend>` doit rester flex
 * directement (pas de wrapper) pour que l'association fieldset/legend reste
 * correcte pour les lecteurs d'écran. */
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

/** Champ "Autre : [Champ]" — n'apparaît que lorsque l'option "Autre" est
 * cochée/sélectionnée dans le groupe correspondant, conformément à la
 * structure exacte transmise par le client. */
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
      <FormField label="Précisez" name={name} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default function Devis() {
  // 3. Votre besoin
  const [besoin, setBesoin] = useState<string | null>(null);
  const [besoinAutre, setBesoinAutre] = useState("");
  // 4. Réseaux concernés
  const [reseaux, setReseaux] = useState<string[]>([]);
  const [reseauxAutre, setReseauxAutre] = useState("");
  // 5. Type de site
  const [typeSite, setTypeSite] = useState<string | null>(null);
  const [typeSiteAutre, setTypeSiteAutre] = useState("");
  // 6. Documents disponibles
  const [aDesDocuments, setADesDocuments] = useState<string | null>(null);
  const [documentsTypes, setDocumentsTypes] = useState<string[]>([]);
  const [documentsAutre, setDocumentsAutre] = useState("");
  // 7. Objet de l'intervention
  const [objetIntervention, setObjetIntervention] = useState<string[]>([]);
  const [objetAutre, setObjetAutre] = useState("");
  // 8. Délai souhaité
  const [delai, setDelai] = useState<string | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Bug corrigé (septembre 2026) : sortie silencieuse sans aucun message —
    // un visiteur qui oubliait de cocher une option en section 3 (pas
    // d'astérisque dessus, contrairement aux champs texte) cliquait sur
    // "Envoyer" et ne voyait rien se passer. Voir aussi HomeDevisForm.tsx,
    // même correction.
    if (!besoin) {
      setError("Merci de sélectionner une option dans « 3. Votre besoin » avant d'envoyer votre demande.");
      return;
    }

    // formData ne sert plus qu'à LIRE les champs non contrôlés du <form>
    // (FormField gère son propre affichage mais ne remonte pas sa valeur par
    // onChange) — rien n'est plus envoyé sous cette forme depuis le passage
    // à EmailJS (02/10/2026), voir sendDevisEmail. Piège à bots conservé en
    // local (hérité de Web3Forms) : une case cachée qu'un visiteur humain ne
    // remplit jamais ; si elle est cochée, on abandonne silencieusement.
    const formData = new FormData(event.currentTarget);
    if (formData.get("botcheck")) {
      return;
    }

    const get = (name: string) => (formData.get(name) as string) || "—";
    const list = (values: string[], autre: string) =>
      values.length === 0 ? "—" : values.map((v) => (v === AUTRE && autre ? `Autre (${autre})` : v)).join(", ");
    const single = (value: string | null, autre: string) =>
      value === AUTRE && autre ? `Autre (${autre})` : value || "—";

    setError(null);
    setStatus("submitting");

    // Sections affichées dans l'e-mail reçu avec le même vocabulaire visuel
    // que le formulaire du site (badge numéroté + titre + lignes) — voir
    // emailTemplate.ts. Pièce jointe remplacée par un lien (voir
    // content.ts, devis.documents) : le plan gratuit EmailJS ne supporte pas
    // les pièces jointes.
    const sections: EmailSection[] = [
      {
        step: "1",
        heading: devis.coordonnees.heading,
        rows: [
          { label: "Nom / Prénom", value: get("nomPrenom") },
          { label: "Société / Copropriété", value: get("societe") },
          { label: "Téléphone", value: get("telephone") },
          { label: "E-mail", value: get("email") },
        ],
      },
      {
        step: "2",
        heading: devis.adresseSite.heading,
        rows: [
          { label: "Adresse", value: get("adresse") },
          { label: "Code postal", value: get("codePostal") },
          { label: "Ville", value: get("ville") },
        ],
      },
      {
        step: "3",
        heading: devis.besoin.heading,
        rows: [{ label: "Demande", value: single(besoin, besoinAutre) }],
      },
      {
        step: "4",
        heading: devis.reseaux.heading,
        rows: [{ label: "Réseaux", value: list(reseaux, reseauxAutre) }],
      },
      {
        step: "5",
        heading: devis.typeSite.heading,
        rows: [
          { label: "Type de site", value: single(typeSite, typeSiteAutre) },
          { label: "Surface approximative", value: `${get("surface")} m²` },
        ],
      },
      {
        step: "6",
        heading: devis.documents.heading,
        rows: [
          { label: "Plans ou documents disponibles", value: aDesDocuments || "—" },
          ...(aDesDocuments === "Oui"
            ? [
                { label: "Documents", value: list(documentsTypes, documentsAutre) },
                { label: "Lien vers les documents", value: get("documentLink") },
              ]
            : []),
        ],
      },
      {
        step: "7",
        heading: devis.objetIntervention.heading,
        rows: [{ label: "Objet", value: list(objetIntervention, objetAutre) }],
      },
      {
        step: "8",
        heading: devis.delai.heading,
        rows: [
          { label: "Délai", value: delai || "—" },
          { label: "Date souhaitée / prévue", value: get("delaiDate") },
        ],
      },
      {
        step: "9",
        heading: devis.complementaire.heading,
        rows: [{ label: "Précisions", value: get("complementaire") }],
      },
    ];

    const result = await sendDevisEmail({
      subject: `Nouvelle demande de devis — ${single(besoin, besoinAutre)}`,
      from_name: "Formulaire GEORESEAUX MAURITIUS — Préparer mon devis",
      reply_to: get("email"),
      sections_html: renderEmailSections(sections),
    });

    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      setError(
        result.error === "missing_config"
          ? "Le formulaire n'est pas encore configuré (identifiants EmailJS manquants). Contactez GEORESEAUX MAURITIUS directement en attendant."
          : "L'envoi a échoué. Vérifiez votre connexion et réessayez, ou contactez GEORESEAUX MAURITIUS directement si le problème persiste.",
      );
    }
  };

  return (
    <>
      <Seo title={devis.seo.title} />
      <PageHero eyebrow="Préparer mon devis" h1={devis.hero.h1} accent={["devis"]} body={devis.hero.body} align="center" />

      {/* pt réduit (au lieu de py-[35px] symétrique) : le hero a déjà 35px de
         padding bas, ce qui donnait ~70px de vide avant "01 Vos coordonnées"
         — trop, retour client ("remontez un peu les coordonnées, il y a un
         peu d'espace"). pb inchangé pour ne pas resserrer le bas du
         formulaire. */}
      <section className="bg-paper pb-[35px] pt-6 sm:pt-8">
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
                  {/* Piège à bots : champ caché qu'un visiteur humain ne
                     remplit jamais, laissé décoché il n'est pas envoyé du
                     tout (même logique que du temps de Web3Forms, conservée
                     côté client même si EmailJS n'a pas de honeypot intégré
                     — voir handleSubmit). */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    className="hidden"
                    style={{ display: "none" }}
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                  />

                  {/* 1. Vos coordonnées */}
                  <fieldset>
                    <StepLegend step="01">{devis.coordonnees.heading}</StepLegend>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                      {devis.coordonnees.fields.map((field) => (
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

                  {/* 2. Adresse du site à étudier */}
                  <fieldset>
                    <StepLegend step="02">{devis.adresseSite.heading}</StepLegend>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
                      {devis.adresseSite.fields.map((field) => (
                        <div key={field.name} className={field.name === "adresse" ? "sm:col-span-2" : undefined}>
                          <FormField label={field.label} name={field.name} required={field.required} />
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-ink-soft">{devis.adresseSite.note}</p>
                  </fieldset>

                  {/* 3. Votre besoin */}
                  <fieldset>
                    <StepLegend step="03">{devis.besoin.heading}</StepLegend>
                    <p className="mb-4 text-sm font-medium text-ink">
                      {devis.besoin.question} <span className="text-yellow-600">*</span>
                    </p>
                    <RadioCardGroup name="besoin" options={devis.besoin.options} value={besoin} onChange={setBesoin} />
                    <AutrePrecision
                      visible={besoin === AUTRE}
                      name="besoinAutre"
                      value={besoinAutre}
                      onChange={setBesoinAutre}
                    />
                  </fieldset>

                  {/* 4. Réseaux concernés */}
                  <fieldset>
                    <StepLegend step="04">{devis.reseaux.heading}</StepLegend>
                    <p className="mb-4 text-sm font-medium text-ink">{devis.reseaux.question}</p>
                    <CheckboxCardGroup name="reseaux" options={devis.reseaux.options} values={reseaux} onChange={setReseaux} />
                    <AutrePrecision
                      visible={reseaux.includes(AUTRE)}
                      name="reseauxAutre"
                      value={reseauxAutre}
                      onChange={setReseauxAutre}
                    />
                  </fieldset>

                  {/* 5. Type de site */}
                  <fieldset>
                    <StepLegend step="05">{devis.typeSite.heading}</StepLegend>
                    <RadioCardGroup name="typeSite" options={devis.typeSite.options} value={typeSite} onChange={setTypeSite} />
                    <AutrePrecision
                      visible={typeSite === AUTRE}
                      name="typeSiteAutre"
                      value={typeSiteAutre}
                      onChange={setTypeSiteAutre}
                    />
                    {/* max-w-xs (avant) était trop étroit pour ce label long
                       ("Surface approximative de la zone à investiguer, si
                       connue (m²)") : il passait sur 2 lignes et débordait
                       sur le filet du champ — retour client. Élargi pour que
                       le label tienne sur une ligne dans la grande majorité
                       des cas (voir aussi le correctif dans FormField.tsx). */}
                    <div className="mt-6 max-w-sm sm:max-w-md">
                      <FormField label={`${devis.typeSite.surface.label} (${devis.typeSite.surface.unit})`} name="surface" />
                    </div>
                  </fieldset>

                  {/* 6. Documents disponibles */}
                  <fieldset>
                    <StepLegend step="06">{devis.documents.heading}</StepLegend>
                    <p className="mb-4 text-sm font-medium text-ink">{devis.documents.question}</p>
                    <RadioCardGroup
                      name="aDesDocuments"
                      options={["Oui", "Non"]}
                      value={aDesDocuments}
                      onChange={setADesDocuments}
                    />
                    {aDesDocuments === "Oui" && (
                      <div className="mt-6 space-y-6">
                        <CheckboxCardGroup
                          name="documentsTypes"
                          options={devis.documents.items}
                          values={documentsTypes}
                          onChange={setDocumentsTypes}
                        />
                        <AutrePrecision
                          visible={documentsTypes.includes("Autre document")}
                          name="documentsAutre"
                          value={documentsAutre}
                          onChange={setDocumentsAutre}
                        />
                        {/* Envoi direct de fichier remplacé par un lien
                           (02/10/2026) : voir le commentaire dans
                           content.ts (devis.documents) sur pourquoi. */}
                        <div className="max-w-md">
                          <FormField label={devis.documents.linkLabel} name="documentLink" type="url" />
                          <p className="mt-2 text-xs text-ink-soft">{devis.documents.linkHint}</p>
                        </div>
                      </div>
                    )}
                  </fieldset>

                  {/* 7. Objet de l'intervention */}
                  <fieldset>
                    <StepLegend step="07">{devis.objetIntervention.heading}</StepLegend>
                    <CheckboxCardGroup
                      name="objetIntervention"
                      options={devis.objetIntervention.options}
                      values={objetIntervention}
                      onChange={setObjetIntervention}
                    />
                    <AutrePrecision
                      visible={objetIntervention.includes(AUTRE)}
                      name="objetAutre"
                      value={objetAutre}
                      onChange={setObjetAutre}
                    />
                  </fieldset>

                  {/* 8. Délai souhaité */}
                  <fieldset>
                    <StepLegend step="08">{devis.delai.heading}</StepLegend>
                    <RadioCardGroup name="delai" options={devis.delai.options} value={delai} onChange={setDelai} />
                    {/* Même correctif que le champ "Surface" ci-dessus : label
                       long ("Date souhaitée ou date prévue des travaux") trop
                       à l'étroit dans max-w-xs. */}
                    <div className="mt-6 max-w-sm sm:max-w-md">
                      <FormField label={devis.delai.dateLabel} name="delaiDate" type="date" />
                    </div>
                  </fieldset>

                  {/* 9. Informations complémentaires */}
                  <fieldset>
                    <StepLegend step="09">{devis.complementaire.heading}</StepLegend>
                    <FormField label={devis.complementaire.label} name="complementaire" multiline />
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
                        Envoi…
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
    </>
  );
}
