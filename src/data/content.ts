/**
 * Point d'entrée unique des textes du site.
 *
 * Les textes français sont dans content.fr.ts, les textes anglais dans
 * content.en.ts (même structure). Ce fichier choisit la bonne version selon
 * la langue active (voir lib/lang.ts) : les composants continuent d'importer
 * depuis "@/data/content" sans rien changer.
 */
import * as fr from "./content.fr";
import * as en from "./content.en";
import { lang } from "@/lib/lang";

export type { CardItem, StepItem } from "./content.fr";

const c = lang === "en" ? en : fr;

export const brand = c.brand;
export const footer = c.footer;
export const plateauTechnique = c.plateauTechnique;
export const agences = c.agences;
export const positioning = c.positioning;
export const pillars = c.pillars;
export const nav = c.nav;
export const home = c.home;
export const detection = c.detection;
export const releves = c.releves;
export const cartographiePatrimoniale = c.cartographiePatrimoniale;
export const monitoring = c.monitoring;
export const copropriete = c.copropriete;
export const secteurs = c.secteurs;
export const secteursMenu = c.secteursMenu;
export const methodologie = c.methodologie;
export const aPropos = c.aPropos;
export const devis = c.devis;
export const devisAccueil = c.devisAccueil;
