import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import clsx from "clsx";
import { isValidEmail } from "@/lib/validation";
import { submitNewsletter } from "@/lib/submitLead";

type Status = "idle" | "loading" | "success" | "error";

/** Champ "Entrez votre mail" du footer — capture rapide, mêmes règles que le formulaire de contact. */
export function NewsletterInput() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await submitNewsletter({ email });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex overflow-hidden rounded-lg bg-white">
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="Entrez votre mail"
          aria-label="Votre adresse email"
          aria-invalid={status === "error"}
          className={clsx(
            "w-full min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none",
            status === "error" && "text-red-600"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          aria-label="Envoyer"
          className="flex w-11 shrink-0 items-center justify-center bg-brand-blue text-white transition-colors duration-200 hover:bg-brand-blue-dark disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </div>
      <p className="mt-1.5 min-h-[1em] text-xs" aria-live="polite">
        {status === "error" && <span className="text-brand-yellow">Adresse email invalide.</span>}
        {status === "success" && <span className="text-brand-yellow">Merci, votre demande a été transmise.</span>}
      </p>
    </form>
  );
}
