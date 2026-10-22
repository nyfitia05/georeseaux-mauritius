/**
 * Pré-rendu SEO — exécuté après "vite build" (voir package.json).
 *
 * Pourquoi : le site est une application React. Sans ce script, le serveur
 * renvoie le même dist/index.html pour toutes les adresses, avec le titre,
 * la description et la balise canonical de la page d'accueil. Google lit ce
 * HTML brut et en conclut que toutes les pages sont des doublons de
 * l'accueil : il n'indexe que l'accueil.
 *
 * Ce script crée, pour chaque page et chaque langue, un fichier
 * dist/<page>/index.html identique à dist/index.html, sauf l'en-tête (<head>) :
 * titre, description, canonical, hreflang, Open Graph et langue propres à la
 * page. Rien ne change à l'affichage : le corps de la page et le JavaScript
 * sont exactement les mêmes.
 *
 * Les textes (titres, descriptions) sont lus dans src/data/content.fr.ts et
 * content.en.ts, comme sur le site : une correction de wording dans ces
 * fichiers est reprise automatiquement ici au prochain build.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import os from "node:os";

const SITE = "https://www.georeseauxmauritius.com";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");

/** Pages réellement servies (mêmes chemins que src/App.tsx), avec barre finale. */
const ROUTES = [
  { path: "/", seo: (c) => c.home.seo },
  { path: "/detection-reseaux-enterres/", seo: (c) => c.detection.seo },
  { path: "/cartographie-reseaux/", seo: (c) => c.releves.seo },
  { path: "/cartographie-patrimoniale/", seo: (c) => c.cartographiePatrimoniale.seo },
  { path: "/cartographie-reseaux-copropriete/", seo: (c) => c.copropriete.seo },
  { path: "/secteurs/", seo: (c) => c.secteurs.seo },
  { path: "/methodologie/", seo: (c) => c.methodologie.seo },
  { path: "/a-propos/", seo: (c) => c.aPropos.seo },
  { path: "/demander-un-devis/", seo: (c) => c.devis.seo },
  {
    path: "/devis-express/",
    // Mêmes textes que src/pages/DevisExpress.tsx.
    seo: (c, lang) => ({
      title: `${c.home.closing.heading} | GEORESEAUX MAURITIUS`,
      description:
        lang === "en"
          ? "Tell us about your site: share your plans and information, and GEORESEAUX MAURITIUS will review your needs and define the right intervention in Mauritius."
          : "Parlez-nous de votre site : transmettez vos plans et informations, GEORESEAUX MAURITIUS étudie votre besoin et définit l'intervention adaptée à l'Île Maurice.",
    }),
  },
];

/** Même règle que pathFor() dans src/lib/lang.ts. */
const urlFor = (lang, p) => SITE + (lang === "en" ? (p === "/" ? "/en/" : "/en" + p) : p);

/** Charge un fichier de contenu .ts sans dépendance supplémentaire. */
async function loadContent(file) {
  const source = await readFile(path.join(ROOT, "src/data", file), "utf8");
  let js;
  try {
    // TypeScript est déjà une dépendance de développement du projet.
    const ts = (await import("typescript")).default;
    js = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
    }).outputText;
  } catch {
    // Repli : Node 22.13+ sait retirer les types TypeScript tout seul.
    const { stripTypeScriptTypes } = await import("node:module");
    js = stripTypeScriptTypes(source);
  }
  const tmp = path.join(os.tmpdir(), `seo-${file}-${process.pid}.mjs`);
  await writeFile(tmp, js);
  return import(pathToFileURL(tmp).href);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Remplace la valeur d'un attribut dans la première balise qui correspond. */
function setAttr(html, tagPattern, attr, value) {
  const re = new RegExp(`(<(?:meta|link)\\b[^>]*${tagPattern}[^>]*\\b${attr}=")[^"]*(")`, "i");
  if (!re.test(html)) throw new Error(`Balise introuvable dans dist/index.html : ${tagPattern}`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function renderHead(template, { lang, title, description, canonical, urlFr, urlEn }) {
  let html = template;
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setAttr(html, 'name="description"', "content", description);
  html = setAttr(html, 'rel="canonical"', "href", canonical);
  html = setAttr(html, 'property="og:url"', "content", canonical);
  html = setAttr(html, 'property="og:title"', "content", title);
  html = setAttr(html, 'property="og:description"', "content", description);
  html = setAttr(html, 'property="og:locale"', "content", lang === "en" ? "en_MU" : "fr_MU");
  // Les balises hreflang sont mises à jour (et non dupliquées) par
  // src/layout/Layout.tsx une fois la page chargée.
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*>/g, "");
  const alternates = [
    `<link rel="alternate" hreflang="fr" href="${esc(urlFr)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(urlEn)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(urlFr)}" />`,
  ].join("\n    ");
  return html.replace("</head>", `    ${alternates}\n  </head>`);
}

const template = await readFile(path.join(DIST, "index.html"), "utf8");
const content = { fr: await loadContent("content.fr.ts"), en: await loadContent("content.en.ts") };

let count = 0;
for (const route of ROUTES) {
  for (const lang of ["fr", "en"]) {
    const { title, description } = route.seo(content[lang], lang);
    if (!title || !description) throw new Error(`Titre ou description manquant : ${lang} ${route.path}`);
    const urlFr = urlFor("fr", route.path);
    const urlEn = urlFor("en", route.path);
    const html = renderHead(template, {
      lang,
      title,
      description,
      canonical: lang === "en" ? urlEn : urlFr,
      urlFr,
      urlEn,
    });
    const outDir = path.join(DIST, lang === "en" ? "en" : "", route.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), html);
    count++;
  }
}
console.log(`Pré-rendu SEO : ${count} pages écrites dans dist/.`);
