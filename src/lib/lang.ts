/**
 * Langue du site (FR / EN) — elle dépend de l'adresse :
 *   https://www.georeseauxmauritius.com/...     -> français
 *   https://www.georeseauxmauritius.com/en/...  -> anglais
 *
 * Chaque page existe donc en deux adresses distinctes, que Google peut
 * indexer séparément. Les liens internes n'ont pas besoin de changer :
 * main.tsx donne "/en" comme base au routeur sur les pages anglaises, et tous
 * les <Link to="/..."> pointent alors automatiquement vers /en/...
 *
 * Les textes viennent de data/content.fr.ts ou data/content.en.ts selon la
 * langue (voir data/content.ts).
 *
 * Compatibilité : les anciens liens ?lang=en sont redirigés vers /en/...
 */
export type Lang = "fr" | "en";

/** Préfixe des adresses anglaises. */
const EN_PREFIX = "/en";

function isEnPath(pathname: string): boolean {
  return pathname === EN_PREFIX || pathname.startsWith(EN_PREFIX + "/");
}

/** Chemin de la page sans le préfixe /en (ex. "/en/secteurs/" -> "/secteurs/"). */
export function pagePath(pathname: string): string {
  if (!isEnPath(pathname)) return pathname || "/";
  const rest = pathname.slice(EN_PREFIX.length);
  return rest === "" ? "/" : rest;
}

/** Adresse d'une page dans une langue donnée (chemin sans /en en entrée). */
export function pathFor(target: Lang, path: string): string {
  const p = path.startsWith("/") ? path : "/" + path;
  if (target === "fr") return p;
  return p === "/" ? EN_PREFIX + "/" : EN_PREFIX + p;
}

function detectLang(): Lang {
  if (typeof window === "undefined") return "fr";
  const { pathname, search, hash } = window.location;
  // Ancien lien ?lang=en / ?lang=fr : on redirige vers la bonne adresse.
  const params = new URLSearchParams(search);
  const asked = params.get("lang");
  if (asked === "en" || asked === "fr") {
    params.delete("lang");
    const qs = params.toString();
    const target = pathFor(asked, pagePath(pathname)) + (qs ? "?" + qs : "") + hash;
    if (target !== pathname + search + hash) window.location.replace(target);
  }
  return isEnPath(pathname) ? "en" : "fr";
}

export const lang: Lang = detectLang();

/** Base du routeur : "/en" sur les pages anglaises, rien sur les françaises. */
export const routerBasename: string = lang === "en" ? EN_PREFIX : "/";

if (typeof document !== "undefined") {
  document.documentElement.lang = lang;
}

/** Petit texte d'interface écrit directement dans un composant : t("Bonjour", "Hello"). */
export function t(fr: string, en: string): string {
  return lang === "en" ? en : fr;
}
