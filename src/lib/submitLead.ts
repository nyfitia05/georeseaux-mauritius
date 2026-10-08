import { CONTACT_EMAIL } from "./constants";

export type ContactPayload = {
  company: string;
  fullName: string;
  phone: string;
  email: string;
  siteAddress: string;
  requestTypes: string[];
  message: string;
};

export type NewsletterPayload = {
  email: string;
};

/**
 * Point de branchement unique pour l'envoi des demandes vers
 * projets@georeseauxfrance.fr.
 *
 * Aucun service d'envoi n'est configuré pour le moment : cette fonction
 * simule un envoi réussi côté front (délai réseau + résolution) afin que le
 * formulaire soit testable de bout en bout (états normal/focus/erreur/succès).
 *
 * Pour connecter un vrai envoi, remplacer le corps de cette fonction par un
 * appel à ton service :
 *   - Formspree / Getform : fetch(endpoint, { method: "POST", body: ... })
 *   - EmailJS            : emailjs.send(serviceId, templateId, payload)
 *   - API perso           : fetch("/api/contact", { method: "POST", ... })
 * Le destinataire (CONTACT_EMAIL, "projets@georeseauxfrance.fr") est déjà
 * centralisé dans src/lib/constants.ts — ne pas le dupliquer ailleurs.
 */
export async function submitContactForm(payload: ContactPayload): Promise<void> {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[submitContactForm] destinataire: ${CONTACT_EMAIL}`, payload);
  }

  await new Promise<void>((resolve, reject) => {
    window.setTimeout(() => {
      if (!payload.email || !payload.message) {
        reject(new Error("Champs requis manquants."));
        return;
      }
      resolve();
    }, 700);
  });
}

export async function submitNewsletter(payload: NewsletterPayload): Promise<void> {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.info(`[submitNewsletter] destinataire: ${CONTACT_EMAIL}`, payload);
  }

  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 500);
  });
}
