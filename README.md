# GEORESEAUX FRANCE — site web

Site construit avec React + TypeScript + Vite + Tailwind CSS + React Router + Framer Motion + GSAP, à partir du cahier des charges `GEORESEAUX_FRANCE_WEBSITE_V1_FINAL.docx` (version consolidée septembre 2026).

## Démarrer

```bash
npm install
npm run dev
```

`npm run build` produit le site statique dans `dist/` ; `npm run lint` lance uniquement la vérification TypeScript (`tsc --noEmit`).

## Important : comment ce projet a été vérifié

Ce projet a été écrit dans un environnement cloud dont la politique réseau bloque `registry.npmjs.org` (confirmé : la requête renvoie explicitement `x-deny-reason: host_not_allowed`). Il n'a donc pas été possible d'y exécuter `npm install`, `npm run dev`/`build`, ni de faire une capture d'écran réelle du rendu.

Ce qui **a** été vérifié dans cet environnement :
- Chaque fichier a été relu.
- L'intégralité du code source a été passée dans `tsc --noEmit` en mode strict, contre des déclarations de types minimales pour react, react-router-dom, framer-motion, gsap et lucide-react (ces packages n'étaient pas installables). Cela a permis de détecter et corriger plusieurs bugs réels (imports inutilisés, paramètres non typés, etc.) avant la livraison.
- Cette vérification ne remplace pas un vrai build : elle confirme la cohérence interne du code (types de props, données de `content.ts`, structure JSX), mais ne valide pas le rendu visuel ni la conformité exacte aux API réelles des librairies (assurée ici par la connaissance de leurs API, pas par une compilation réelle contre elles).

**Recommandation** : faites `npm install && npm run dev` en premier, avant toute autre modification, pour vérifier vous-même le rendu et me signaler ce qui doit être ajusté.

## Décisions prises faute d'information, à valider

Le cahier des charges est très complet, mais quelques points restent ouverts. Plutôt que d'inventer une réponse, voici ce qui a été décidé et pourquoi — à corriger dans `src/data/content.ts` (textes) ou ce README (données manquantes) selon le cas :

1. **Secteurs : 6 vs 8.** Le "Menu principal" (§1) liste 6 secteurs dans le sous-menu ; la section "7. Nos secteurs" en donne 8 (elle ajoute Promoteurs & maîtres d'ouvrage et Exploitants & gestionnaires de réseaux). Le site utilise les 8 catégories sur la page `/secteurs/` (contenu le plus complet) et n'affiche pas de méga-menu déroulant pour Secteurs dans la nav (lien simple vers `/secteurs/`) plutôt que de proposer un sous-menu incomplet par rapport à la page cible.
2. **Photos.** Les 4 visuels transmis par URL (`sosfuitedeau.com`) sont ceux d'une autre entreprise, sur un métier différent (détection de fuites d'eau) — et le cahier des charges lui-même demande d'éviter "une esthétique de plombier" (§10). Ils n'ont donc pas été utilisés. Le hero et les sections utilisent à la place un système graphique de marque (le motif cartographique, `src/components/MapMotif.tsx`) en attendant les photos réelles listées au §10 ("Photographies à produire"). Chaque emplacement prévu pour une photo porte un commentaire `TODO(contenu)` dans le code.
3. **Téléphone cliquable.** Le cahier des charges développeur demande un "téléphone cliquable" (§10), mais aucun numéro n'apparaît nulle part dans le document. Rien n'a été inventé : dès que vous avez le numéro, ajoutez-le dans `src/data/content.ts` et dans le Footer / la Navbar sous forme de lien `tel:`.
4. **Pages Monitoring secondaires et pages SEO profondes.** Seule `/monitoring-consommation-eau/` a une page dédiée : c'est la seule déclinaison de Monitoring en Priorité 1 du plan de mise en ligne (§12). Niveau / Forage / Relevage / Surpression / Réseaux restent des cartes sur `/monitoring/` (Priorité 2, pas de contenu long fourni). De même, `/detection-georadar/`, `/recherche-canalisation-enterree/` et `/detection-reseaux-avant-travaux/` (plan SEO, §11) n'ont pas de page dédiée : le document ne fournit qu'un mot-clé et un `<title>` pour ces URLs, pas de contenu de page. Les construire aurait nécessité d'inventer du texte.
5. **Confirmation du formulaire de devis.** Aucun texte de confirmation n'est fourni dans le cahier des charges, et aucun système d'envoi (API, e-mail) n'y est précisé. Le formulaire valide, simule un envoi et affiche "Demande envoyée" (texte fonctionnel minimal, pas un texte marketing) — à raccorder à un vrai service d'envoi avant mise en production.
6. **"Être rappelé".** Présent comme CTA secondaire à côté de "Demander un devis" (bannières de fin de page), il renvoie vers le même formulaire de devis faute d'un flux dédié précisé dans le cahier des charges.

## Ce qui respecte déjà le cahier des charges

- Wording : tous les textes visibles viennent mot pour mot de `src/data/content.ts`, qui documente sa source (aucune reformulation, aucun texte inventé).
- SEO : les balises `<title>` par page reprennent exactement le "Plan SEO prioritaire" (§11) ; un seul `<h1>` par page ; hiérarchie H2/H3 cohérente.
- Règles éditoriales (§1, §10) : aucun tarif, aucun nom de fabricant, aucune certification ou classe A non fournie n'apparaît nulle part dans le contenu.
- Accessibilité : navigation clavier, `prefers-reduced-motion` respecté (Framer Motion via `MotionConfig`, GSAP via `usePrefersReducedMotion`), champs de formulaire correctement liés à leurs labels.
- Performance : aucune image lourde par défaut (le système graphique est en SVG), animations sur `transform`/`opacity`, pas de librairie ajoutée sans usage réel (pas de Radix/shadcn, pas de Lenis, pas de Three.js — aucun n'apportait un gain justifiable ici).
