// Couleurs reprises telles quelles de tailwind.config.ts (blue-600/700/100,
// ink, ink-soft) : les e-mails ne chargent pas Tailwind, donc tout est en
// style inline avec les valeurs hex de la marque, pas des classes.
const BLUE_600 = "#244597";
const BLUE_700 = "#1C3679";
const BLUE_100 = "#DCE3F5";
const INK = "#12182B";
const INK_SOFT = "#3A4258";

export interface EmailSection {
  step: string;
  heading: string;
  rows: { label: string; value: string }[];
}

/**
 * Rend les sections du formulaire en HTML inline-styled, avec le même
 * vocabulaire visuel que StepLegend sur le site (badge rond numéroté +
 * titre bleu + séparateur) — injecté tel quel dans le template EmailJS via
 * la variable brute {{{sections_html}}} (triple accolade = HTML non échappé
 * côté EmailJS, voir leur doc "Can I send HTML from my code?"). Partagé par
 * Devis.tsx et HomeDevisForm.tsx pour ne pas dupliquer le balisage entre les
 * deux formulaires.
 */
export function renderEmailSections(sections: EmailSection[]): string {
  return sections
    .map(
      (section) => `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding-bottom:10px; border-bottom:1px solid ${BLUE_100};">
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:26px; height:26px; border-radius:50%; background-color:${BLUE_600}; text-align:center; vertical-align:middle; font-family:Arial, Helvetica, sans-serif; font-size:12px; font-weight:bold; color:#ffffff;">${escapeHtml(section.step)}</td>
              <td style="padding-left:10px; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:bold; color:${BLUE_700};">${escapeHtml(section.heading)}</td>
            </tr>
          </table>
        </td>
      </tr>
      ${section.rows
        .map(
          (row) => `
      <tr>
        <td style="padding:10px 0 0 36px; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:${INK_SOFT};">${escapeHtml(row.label)} : <span style="color:${INK}; font-weight:bold;">${escapeHtml(row.value)}</span></td>
      </tr>`,
        )
        .join("")}
    </table>`,
    )
    .join("");
}

/**
 * Échappement minimal avant injection en HTML brut — indispensable ici
 * puisque sections_html passe par {{{...}}} (non échappé par EmailJS) :
 * sans ça, un visiteur tapant "<" ou "&" dans un champ texte casserait la
 * mise en page de l'e-mail reçu.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
