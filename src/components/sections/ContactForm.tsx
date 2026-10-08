import { useState, type FormEvent } from "react";
import clsx from "clsx";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { TYPE_DEMANDE_OPTIONS } from "@/lib/constants";
import { isValidEmail } from "@/lib/validation";
import { submitContactForm } from "@/lib/submitLead";

type FormState = {
  company: string;
  fullName: string;
  phone: string;
  email: string;
  siteAddress: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  company: "",
  fullName: "",
  phone: "",
  email: "",
  siteAddress: "",
  message: "",
};

const FIELD_CLASSES =
  "w-full rounded-lg border border-ink-300/60 bg-white px-4 py-3 font-body text-[15px] text-ink-900 placeholder:text-ink-500 transition-colors duration-200 ease-premium focus:border-brand-blue focus:outline-none";

const FIELD_ERROR_CLASSES = "border-red-400 focus:border-red-500";

export function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((entry) => entry !== type) : [...prev, type]
    );
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Merci d'indiquer votre nom et prénom.";
    if (!values.email.trim() || !isValidEmail(values.email)) {
      nextErrors.email = "Adresse email invalide.";
    }
    if (!values.message.trim()) nextErrors.message = "Merci de décrire votre besoin.";
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    try {
      await submitContactForm({
        company: values.company,
        fullName: values.fullName,
        phone: values.phone,
        email: values.email,
        siteAddress: values.siteAddress,
        requestTypes: selectedTypes,
        message: values.message,
      });
      setStatus("success");
      setValues(INITIAL_STATE);
      setSelectedTypes([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-blue-light p-8 text-center sm:p-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-blue" strokeWidth={1.5} />
        <h3 className="mt-4 font-heading text-[22px] font-bold text-brand-blue">
          Votre demande a bien été envoyée
        </h3>
        <p className="mt-2 font-body text-[15px] text-ink-700">
          Notre équipe revient vers vous rapidement pour étudier votre projet.
        </p>
        <Button variant="primary" withArrow={false} className="mt-6" onClick={() => setStatus("idle")}>
          Envoyer une nouvelle demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-brand-blue-light p-6 sm:p-10">
      <p className="font-body text-sm font-bold uppercase tracking-wide text-ink-700">
        Votre demande
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <input
            value={values.company}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Société / organisme"
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <input
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            placeholder="Nom et prénom"
            aria-invalid={Boolean(errors.fullName)}
            className={clsx(FIELD_CLASSES, errors.fullName && FIELD_ERROR_CLASSES)}
          />
          {errors.fullName && <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <input
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="Téléphone"
            type="tel"
            className={FIELD_CLASSES}
          />
        </div>
        <div>
          <input
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="Email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            className={clsx(FIELD_CLASSES, errors.email && FIELD_ERROR_CLASSES)}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <input
            value={values.siteAddress}
            onChange={(event) => update("siteAddress", event.target.value)}
            placeholder="Adresse du site"
            className={FIELD_CLASSES}
          />
        </div>
      </div>

      <p className="mt-6 font-body text-sm font-bold uppercase tracking-wide text-ink-700">
        Type de demande
      </p>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {TYPE_DEMANDE_OPTIONS.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={selectedTypes.includes(option)}
            onClick={() => toggleType(option)}
          />
        ))}
      </div>

      <p className="mt-6 font-body text-sm font-bold uppercase tracking-wide text-ink-700">
        Description du besoin
      </p>
      <textarea
        value={values.message}
        onChange={(event) => update("message", event.target.value)}
        placeholder="Description du besoin"
        rows={6}
        aria-invalid={Boolean(errors.message)}
        className={clsx(FIELD_CLASSES, "mt-3 resize-none", errors.message && FIELD_ERROR_CLASSES)}
      />
      {errors.message && <p className="mt-1.5 text-xs text-red-600">{errors.message}</p>}

      {status === "error" && (
        <p className="mt-4 font-body text-sm font-semibold text-red-600">
          Une erreur est survenue, merci de réessayer.
        </p>
      )}

      <Button type="submit" className="mt-7" disabled={status === "loading"} withArrow={status !== "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
          </>
        ) : (
          "Envoyez"
        )}
      </Button>
    </form>
  );
}
