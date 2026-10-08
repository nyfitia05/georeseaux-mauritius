export interface EmailJsResult {
  ok: boolean;
  error?: string;
}

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

/**
 * Compte EmailJS GEORESEAUX MAURITIUS (admin@waterleakgroup.com), modèle
 * « Devis GEORESEAUX MAURITIUS » qui envoie les devis sur admin@.
 * Ces 3 identifiants sont publics par conception (EmailJS les fait passer
 * par le navigateur) : ils sont écrits ici pour que le site fonctionne sur
 * Vercel sans réglage supplémentaire, et ne dépendent plus du .env (qui
 * contenait encore les identifiants du compte France).
 * Ne JAMAIS mettre ici la « Private Key » du compte.
 */
const EMAILJS_SERVICE_ID = "service_gu0rmgm";
const EMAILJS_TEMPLATE_ID = "template_aby3oeu";
const EMAILJS_PUBLIC_KEY = "lgz2-5SKXhhVYB6Hg";

/**
 * Appel direct à l'API REST d'EmailJS (api.emailjs.com/api/v1.0/email/send),
 * sans leur SDK @emailjs/browser — même logique que l'ancien appel Web3Forms
 * (fetch brut), pour ne pas ajouter de dépendance npm au projet. Remplace
 * Web3Forms le 02/10/2026 (demande client : e-mail reçu "digne d'un
 * formulaire", impossible à obtenir gratuitement sur Web3Forms — voir
 * Custom HTML Template, réservé aux plans payants).
 *
 * Les 3 identifiants viennent du compte EmailJS du client (Service ID,
 * Template ID, Public Key) — voir les constantes ci-dessus. Comme la clé Web3Forms
 * précédente, la "Public Key" EmailJS est faite pour être exposée côté
 * navigateur — ce n'est pas un secret serveur à protéger.
 */
export async function sendDevisEmail(templateParams: Record<string, string>): Promise<EmailJsResult> {
  const serviceId = EMAILJS_SERVICE_ID;
  const templateId = EMAILJS_TEMPLATE_ID;
  const publicKey = EMAILJS_PUBLIC_KEY;

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
