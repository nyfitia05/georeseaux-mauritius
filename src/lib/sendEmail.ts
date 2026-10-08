export interface EmailJsResult {
  ok: boolean;
  error?: string;
}

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/**
 * Appel direct à l'API REST d'EmailJS (api.emailjs.com/api/v1.0/email/send),
 * sans leur SDK @emailjs/browser — même logique que l'ancien appel Web3Forms
 * (fetch brut), pour ne pas ajouter de dépendance npm au projet. Remplace
 * Web3Forms le 02/10/2026 (demande client : e-mail reçu "digne d'un
 * formulaire", impossible à obtenir gratuitement sur Web3Forms — voir
 * Custom HTML Template, réservé aux plans payants).
 *
 * Les 3 identifiants viennent du compte EmailJS du client (Service ID,
 * Template ID, Public Key — créés dans leur dashboard) et vivent dans
 * .env / .env.example, jamais en dur ici. Comme la clé Web3Forms
 * précédente, la "Public Key" EmailJS est faite pour être exposée côté
 * navigateur — ce n'est pas un secret serveur à protéger.
 */
export async function sendDevisEmail(templateParams: Record<string, string>): Promise<EmailJsResult> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    return { ok: false, error: "missing_config" };
  }

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (response.ok) {
      return { ok: true };
    }
    return { ok: false, error: await response.text() };
  } catch {
    return { ok: false, error: "network_error" };
  }
}
