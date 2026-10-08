/**
 * Langue du site (FR / EN).
 *
 * La langue est choisie une fois, au chargement de la page, puis gardée en
 * mémoire dans le navigateur (localStorage). Le bouton FR / EN du menu
 * appelle setLang(), qui enregistre le choix et recharge la page : tous les
 * textes (data/content.ts) sont alors lus dans la bonne langue, sans avoir à
 * modifier chaque composant.
 *
 * Un lien ?lang=en (ou ?lang=fr) force aussi la langue — pratique pour
 * partager directement la version anglaise.
 */
export type Lang = "fr" | "en";

const STORAGE_KEY = "lang";

function isLang(value: unknown): value is Lang {
  return value === "fr" || value === "en";
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (isLang(fromUrl)) {
      try {
        window.localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        /* stockage indisponible : la langue reste valable pour cette page */
      }
      return fromUrl;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* stockage bloqué (navigation privée stricte, etc.) : français par défaut */
  }
  return "fr";
}

export const lang: Lang = detectLang();

if (typeof document !== "undefined") {
  document.documentElement.lang = lang;
}

/** Change de langue et recharge la page sur la même adresse. */
export function setLang(next: Lang) {
  if (next === lang) return;
  let stored = false;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
    stored = true;
  } catch {
    stored = false;
  }
  const url = new URL(window.location.href);
  if (stored) {
    url.searchParams.delete("lang");
  } else {
    // Sans stockage possible, on passe la langue dans l'adresse.
    url.searchParams.set("lang", next);
  }
  window.location.assign(url.toString());
}

/** Petit texte d'interface écrit directement dans un composant : t("Bonjour", "Hello"). */
export function t(fr: string, en: string): string {
  return lang === "en" ? en : fr;
}
