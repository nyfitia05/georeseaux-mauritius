/**
 * Tous les textes du site, mot pour mot, tels que fournis dans le cahier des
 * charges "GEORESEAUX_FRANCE_WEBSITE_V1_FINAL" (document maître, version
 * consolidée septembre 2026).
 *
 * Règle de ce fichier : aucune phrase n'est reformulée, raccourcie, complétée
 * ou inventée ici. Si un texte manque pour un bloc, le composant qui l'utilise
 * doit rester vide ou masqué plutôt que recevoir un texte de remplacement.
 * Toute correction de wording par le client se fait uniquement dans ce
 * fichier — aucun texte de contenu ne doit être écrit en dur dans un
 * composant ou une page.
 */

export interface CardItem {
  title: string;
  text: string;
}

export interface StepItem {
  number: string;
  title: string;
  text: string;
}

export const brand = {
  name: "GEORESEAUX MAURITIUS",
  tagline: "DÉTECTER • LOCALISER • CARTOGRAPHIER • MONITORER",
  signature: "Connaître aujourd'hui. Sécuriser demain.",
  signatureCaps: "CONNAÎTRE AUJOURD'HUI. SÉCURISER DEMAIN.",
  // Coordonnées communes aux sites Water Leak (Group, Expert, Academy,
  // Equipment) — header, footer et boutons d'appel.
  phone: "+230 5792 8639",
  phoneHref: "tel:+23057928639",
  email: "admin@waterleakgroup.com",
  emailHref: "mailto:admin@waterleakgroup.com",
};

/** Pied de page commun aux sites Water Leak : adresse + liens vers les
 * autres entités du groupe. */
export const footer = {
  address: ["Grand Baie – Île Maurice", "Océan Indien"],
  links: [
    { label: "Group", href: "https://waterleakgroup.com/" },
    { label: "Academy", href: "https://waterleakacademy.com/" },
    { label: "Expert", href: "https://waterleakexpert.com/" },
    { label: "Equipment", href: "https://waterleakequipment.com/" },
  ],
};

/** Bloc "Plateau technique" — repris mot pour mot sur les 4 brochures
 * GEORESEAUX FRANCE (accueil, détection & localisation, relevés &
 * cartographie, monitoring) fournies par le client en septembre 2026. Absent
 * du cahier des charges initial ; ajouté sur le site à la demande explicite
 * du client pour aligner le site sur ses supports imprimés (Accueil,
 * Détection, Cartographie, Monitoring, Copropriété).
 *
 * Simplifié le 30/09 à la demande explicite du client pour coller strictement
 * à l'imprimé : uniquement "Plateau technique" / "Gestion des appels | du
 * Lundi au vendredi 8h – 19h" / le bouton "Demander un devis" — le badge
 * "Disponibilité. / Créativité. / Rapidité." et les lignes "Gestion des
 * mails" / "Gestion des RDV" (qui n'apparaissaient sur aucune des 4
 * plaquettes) ont été retirés. */
export const plateauTechnique = {
  heading: "Plateau technique",
  item: { label: "Gestion des appels", detail: "du Lundi au vendredi 8h – 19h" },
  cta: "Demander un devis",
};

/** Adresses des agences, reprises de la capture d'écran de référence fournie
 * pour le footer (absentes du cahier des charges) — à faire confirmer par le
 * client avant mise en ligne. */
export const agences = [
  { label: "Siège social", address: "3 rue de Genève, 69006 Lyon" },
  { label: "Agence de Paris", address: "8 Bis Rue Abel 75012 Paris" },
  { label: "Agence de Nice", address: "455 promenade des Anglais 06200 Nice" },
];

/** Titre du bloc des 4 piliers sur l'accueil — repris mot pour mot de la
 * brochure GEORESEAUX_FRANCE.pdf ("DE LA CONNAISSANCE DU RÉSEAU À SA
 * SURVEILLANCE"). Remplace l'ancienne phrase de positionnement issue du
 * cahier des charges, absente de la plaquette. */
export const positioning = "De la connaissance du réseau à sa surveillance";

/** Les 4 piliers numérotés (01 → 04), repris mot pour mot de la brochure
 * GEORESEAUX_FRANCE.pdf — le 4e pilier s'appelle "SURVEILLER" sur la
 * plaquette (pas "MONITORER" comme dans le cahier des charges d'origine). */
export const pillars: CardItem[] = [
  {
    title: "DÉTECTER",
    text: "Recherche des réseaux et ouvrages enterrés.",
  },
  {
    title: "LOCALISER",
    text: "Repérage terrain des tracés et équipements.",
  },
  {
    title: "CARTOGRAPHIER",
    text: "Relevé et création de documents exploitables.",
  },
  {
    title: "SURVEILLER",
    text: "Installation de solutions de monitoring sur les points stratégiques.",
  },
];

export const nav = {
  accueil: { label: "Accueil", href: "/" },
  expertises: {
    label: "Expertises",
    // Réduit à 3 entrées (Détection & localisation, Relevés & cartographie,
    // GEORESEAUX Monitoring) pour refléter dans le menu principal la même
    // réduction déjà appliquée à la vitrine "Nos expertises" de l'accueil,
    // conformément à la brochure GEORESEAUX_FRANCE.pdf qui ne présente que ces
    // 3 piliers. "Cartographie patrimoniale" garde sa page dédiée (route
    // toujours active) mais n'est plus listée dans ce menu déroulant.
    items: [
      { label: "Détection & localisation", href: "/detection-reseaux-enterres/" },
      { label: "Relevés & cartographie", href: "/cartographie-reseaux/" },
      // "GEORESEAUX Monitoring" retiré du menu (08/10/2026) : le monitoring
      // est désormais présenté sur le site Water Leak Equipment.
    ],
  },
  monitoring: { label: "GEORESEAUX Monitoring", href: "/monitoring/" },
  secteurs: { label: "Secteurs", href: "/secteurs/" },
  methodologie: { label: "Méthodologie", href: "/methodologie/" },
  aPropos: { label: "À propos", href: "/a-propos/" },
  // "Demander un devis" renommé "Préparer mon devis" sur les CTA principaux du
  // site (nav, hero accueil, bandeau de fin d'accueil), à la demande du
  // client — le titre de la page /demander-un-devis/ et le sous-texte suivent
  // désormais le même wording (cf. data/content.ts → devis).
  devisCta: { label: "Préparer mon devis", href: "/demander-un-devis/" },
  // Page dédiée au questionnaire court (voir devisAccueil) — distincte de
  // /demander-un-devis/ (formulaire complet à 9 sections). Le bouton du
  // bandeau de clôture de l'accueil ("Parlez-nous de votre site") pointe ici
  // plutôt que d'intégrer le formulaire directement sur la page d'accueil, à
  // la demande du client ("il faut faire une redirection de page, ne pas le
  // mettre sur la même page d'accueil").
  devisExpressCta: { href: "/devis-express/" },
};

// ---------------------------------------------------------------------------
// 2. Accueil
// ---------------------------------------------------------------------------
// Page réécrite en septembre 2026 pour reprendre mot pour mot et section par
// section la brochure GEORESEAUX_FRANCE.pdf — sur demande explicite et
// répétée du client ("EXACTEMENT COMME LE PDF, TU EFFACES CE QUI EST LÀ ET TU
// NE METS QUE ÇA"). Tout ce qui ne figure pas sur cette plaquette (bloc
// "Une meilleure connaissance de votre patrimoine", vitrine "Nos expertises"
// à 3 items avec panneau interactif, mise en avant Monitoring avec grille à
// 6 items, grille Secteurs, bloc Méthodologie) a été retiré de cette page.
export const home = {
  seo: {
    title: "Détection & Cartographie des Réseaux | GEORESEAUX MAURITIUS",
  },
  hero: {
    // Titre et texte repris mot pour mot de la brochure — la 2e phrase du
    // titre ("Cartographier. Surveiller.") est en jaune sur la plaquette, pas
    // seulement un mot isolé.
    //
    // L'ancien champ `sectors` (4 mots : "COPROPRIÉTÉS", "GOLFS", "CAMPINGS",
    // "COLLECTIVITÉS" affichés dans le hero) a été retiré : ce n'est ni le
    // bon contenu ni le bon endroit. La plaquette n'a aucune liste dans le
    // hero — la vraie liste de secteurs (11 items) est une bannière séparée,
    // juste sous les 3 cartes ; voir `audiences` ci-dessous.
    h1: "Détecter. Localiser. Cartographier. Surveiller.",
    body: "De la recherche des réseaux enterrés à leur cartographie et à leur surveillance, GEORESEAUX MAURITIUS accompagne les gestionnaires de sites dans la connaissance et le suivi de leurs infrastructures.",
  },
  // Bloc des 3 cartes juste sous le hero — pas de titre de section au-dessus
  // sur la plaquette (elle enchaîne directement après le hero).
  intro: {
    items: [
      {
        title: "DÉTECTION & LOCALISATION",
        text: "Identifier et localiser les réseaux enterrés sur le terrain, sans travaux destructifs.",
      },
      {
        title: "CARTOGRAPHIE",
        text: "Transformer les relevés terrain en plans et documents exploitables.",
      },
      {
        title: "MONITORING SYSTEM",
        text: "Surveiller à distance les consommations, niveaux et équipements stratégiques.",
      },
    ] satisfies CardItem[],
  },
  // Bannière des secteurs accompagnés, juste sous les 3 cartes sur la
  // plaquette (bandeau à coches, 4 colonnes) — absente de la version
  // précédente du site (qui n'affichait que 4 des 11 secteurs, dans le hero,
  // sans coche). Ordre et intitulés repris mot pour mot, colonne par colonne,
  // de la brochure GEORESEAUX_FRANCE.pdf.
  audiences: [
    "Syndics & copropriétés",
    "Architectes",
    "Entreprises TP/VRD",
    "Bureaux d'études",
    "Maîtres d'œuvre",
    "Promoteurs & aménageurs",
    "Collectivités",
    "Industriels",
    "Campings & villages vacances",
    "Golfs & complexes sportifs",
    "Gestionnaires de grands sites et patrimoines immobiliers",
  ],
  // "UNE RESTITUTION ADAPTÉE À CHAQUE MISSION" — section qui suit Plateau
  // technique sur la plaquette, juste avant le bandeau de clôture. Remplace
  // l'ancien bloc générique `solutionDigitale` ("Une solution digitale" /
  // rapport sous 48h) qui ne correspond à aucun texte présent sur les 4
  // brochures retransmises par le client fin septembre 2026 — chaque page a
  // en réalité sa propre section de restitution, avec un texte différent
  // (voir `detection.rapport`, `releves.cartographie`,
  // `monitoring.surveillance` plus bas).
  restitution: {
    heading: "Une restitution adaptée à chaque mission",
    intro: "Selon la prestation, GEORESEAUX fournit :",
    items: [
      "Rapport d'intervention détaillé",
      "Photographies et repérages terrain",
      "Cartographie / plan des réseaux",
      "Données de géoréférencement",
      "Suivi et alertes de consommation pour le monitoring",
    ],
    closing: "Des informations claires et exploitables pour sécuriser la gestion de vos réseaux.",
  },
  // Bandeau de fin — texte exact de la plaquette ("Parlez-nous de votre
  // site"). Le bouton "Préparer mon devis" est un ajout assumé du site (une
  // brochure imprimée n'a pas de bouton cliquable) : à confirmer avec le
  // client, voir la réponse envoyée avec ce changement.
  closing: {
    heading: "Parlez-nous de votre site",
    body: "Transmettez-nous les informations et plans disponibles. GEORESEAUX MAURITIUS étudie votre besoin et définit le périmètre d'intervention adapté.",
  },
  cta: "Préparer mon devis",
};

// ---------------------------------------------------------------------------
// 3. Détection & localisation — /detection-reseaux-enterres/
// ---------------------------------------------------------------------------
// Page réécrite en septembre 2026 pour reprendre mot pour mot la brochure
// DÉTECTION_LOCALISATION_COPROPRIETE.pdf (page Détection) — plus de texte
// d'intro ni de section absente de la plaquette (cahier des charges mis de
// côté ici, sur demande explicite et répétée du client : "EXACTEMENT COMME
// LA PLAQUETTE, MÊME MOT").
export const detection = {
  seo: { title: "Détection de Réseaux Enterrés | GEORESEAUX MAURITIUS" },
  hero: {
    // Titre et découpage repris mot pour mot de la brochure — pas de eyebrow,
    // pas de texte de corps sous le titre : la plaquette n'en a pas.
    h1: "Détectez et localisez vos réseaux enterrés",
  },
  technologies: {
    heading: "Technologies",
    items: [
      {
        title: "Géoradar",
        text: "Investigation du sous-sol et recherche des réseaux et ouvrages enterrés.",
      },
      {
        title: "Détection électromagnétique",
        text: "Repérage et suivi des réseaux détectables par méthode électromagnétique.",
      },
      {
        title: "Sondes traçables",
        text: "Localisation et suivi de canalisations à l'aide de sondes adaptées.",
      },
      {
        title: "Inspection et repérage des ouvrages",
        text: "Identification terrain des regards, équipements et points accessibles.",
      },
    ] satisfies CardItem[],
  },
  // À l'issue de chaque intervention — liste du rapport technique transmis,
  // reprise mot pour mot de la brochure DÉTECTION_LOCALISATION_COPROPRIETE.pdf
  // (section sans titre, entre Plateau technique et le bandeau de clôture).
  // Absente de la page jusqu'ici. Réutilisée telle quelle par la page
  // Copropriété (voir data/content.ts → Copropriete.tsx) : la plaquette
  // "copropriété" fournie par le client est en réalité le même document que
  // celui-ci, sans aucun contenu spécifique à la copropriété.
  rapport: {
    intro:
      "À l'issue de chaque intervention, GEORESEAUX vous transmet un rapport technique complet et détaillé, comprenant :",
    items: [
      "Les réseaux et ouvrages recherchés",
      "Les méthodes et équipements utilisés",
      "Les zones investiguées",
      "Les réseaux détectés et localisés",
      "Les photographies de repérage et de matérialisation sur site",
      "Les profondeurs ou indications relevées lorsque celles-ci peuvent être déterminées",
      "Les éventuelles anomalies ou difficultés rencontrées",
      "Les conclusions techniques et préconisations éventuelles",
    ],
  },
  // Bandeau de fin — tagline exacte de la plaquette, remplace la signature de
  // marque générique utilisée par défaut sur les autres pages.
  //
  // Correction (relecture de la brochure re-transmise fin septembre 2026) :
  // le texte affiché ("Retrouvez les tracés et ouvrages présents sur votre
  // site sans travaux destructifs.") ne correspond pas à la phrase de
  // clôture de la plaquette — corrigé pour être mot pour mot.
  tagline: "Localisez vos réseaux et ouvrages enterrés sans travaux destructifs.",
  cta: "Demander une investigation",
};

// ---------------------------------------------------------------------------
// 4. Relevés & cartographie — /cartographie-reseaux/
// ---------------------------------------------------------------------------
// Page réécrite en septembre 2026 pour reprendre mot pour mot la brochure
// RELEVÉS_CARTOGRAPHIE.pdf — hero sans texte de corps, flow "Détection →
// Géoréférencement → Cartographie → Documentation", les 2 paragraphes
// d'intro, Plateau technique, Une solution digitale. Plus de bloc
// "Restitutions possibles" ni "Chaîne de valeur" (absents de la plaquette).
export const releves = {
  seo: { title: "Cartographie des Réseaux Enterrés | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Cartographiez vos réseaux enterrés",
  },
  flow: ["Détection", "Géoréférencement", "Cartographie", "Documentation"],
  intro: {
    left: "Transformez la connaissance terrain de vos réseaux en documents clairs et exploitables.",
    right: "Facilitez l'identification des réseaux, sécurisez vos futures interventions et optimisez la gestion technique de votre patrimoine.",
  },
  // "UNE CARTOGRAPHIE CLAIRE ET EXPLOITABLE" — section entre Plateau
  // technique et le bandeau de clôture sur la plaquette, absente de la page
  // jusqu'ici. Repris mot pour mot de RELEVÉS_CARTOGRAPHIE.pdf.
  cartographie: {
    heading: "Une cartographie claire et exploitable",
    intro:
      "À l'issue de la prestation, GEORESEAUX vous remet un plan numérique des réseaux détectés et relevés sur site, intégrant selon la mission :",
    items: ["Tracé et identification des réseaux", "Ouvrages et points singuliers", "Profondeurs relevées", "Géoréférencement des éléments"],
  },
  tagline: "Vos réseaux deviennent visibles, localisés et documentés.",
  cta: "Préparer mon devis",
};

// ---------------------------------------------------------------------------
// Cartographie patrimoniale — /cartographie-patrimoniale/
// ---------------------------------------------------------------------------
export const cartographiePatrimoniale = {
  seo: { title: "Cartographie Patrimoniale des Réseaux | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Construire la mémoire technique de vos réseaux",
    body: "Travaux successifs, modifications, extensions ou absence de plans peuvent progressivement créer un écart entre la documentation disponible et la réalité du terrain. GEORESEAUX accompagne les gestionnaires dans la constitution progressive d'une cartographie de leur patrimoine.",
  },
  evolutive: {
    heading: "Une cartographie évolutive",
    body: "Il n'est pas toujours nécessaire de cartographier immédiatement l'intégralité d'un patrimoine. GEORESEAUX peut intervenir par bâtiment, parcelle, zone ou famille de réseaux. Les nouvelles informations recueillies peuvent ensuite venir enrichir la documentation existante.",
  },
  flow: ["INVESTIGUER", "LOCALISER", "RELEVER", "CARTOGRAPHIER", "CAPITALISER"],
  cta: "Étudier mon projet de cartographie",
};

// ---------------------------------------------------------------------------
// 5. GEORESEAUX Monitoring — /monitoring/
// ---------------------------------------------------------------------------
// Page réécrite en septembre 2026 pour reprendre mot pour mot la brochure
// GEORESEAUX_MONITORING.pdf — hero sans texte de corps, "Applications"
// (6 cartes, ordre et texte de la plaquette), bandeau photo, Plateau
// technique, Une solution digitale. Plus de section "Mise en œuvre" ni
// "Détecter. Cartographier. Surveiller." (absentes de la plaquette).
export const monitoring = {
  seo: { title: "Monitoring des Réseaux & Équipements | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Surveillez vos réseaux d'eau 24 h/24",
  },
  items: [
    {
      slug: "conso",
      title: "Consommation d'eau",
      text: "Suivi des consommations.",
      href: "/monitoring-consommation-eau/",
    },
    {
      slug: "niveau",
      title: "Niveaux",
      text: "Suivi des niveaux sur les installations équipées.",
      href: "/monitoring/",
    },
    {
      slug: "reseaux",
      title: "Points stratégiques du réseau",
      text: "Surveillance des points identifiés comme essentiels.",
      href: "/monitoring/",
    },
    {
      slug: "relevage",
      title: "Relevage",
      text: "Suivi des installations de relevage.",
      href: "/monitoring/",
    },
    {
      slug: "surpression",
      title: "Surpression",
      text: "Suivi des équipements de surpression.",
      href: "/monitoring/",
    },
    {
      slug: "forage",
      title: "Forages & captages",
      text: "Surveillance des installations équipées.",
      href: "/monitoring/",
    },
  ],
  banner: "Gardez à distance une visibilité sur les points stratégiques de votre installation.",
  // "UNE SURVEILLANCE CONNECTÉE" — section entre Plateau technique et le
  // bandeau de clôture sur la plaquette, absente de la page jusqu'ici. Repris
  // mot pour mot de MONITORING.pdf.
  surveillance: {
    heading: "Une surveillance connectée",
    intro: "Suivez en continu la consommation de vos réseaux d'eau et détectez rapidement les anomalies.",
    items: [
      "Suivi à distance 24 h/24",
      "Alertes en cas de consommation anormale",
      "Historique des consommations",
      "Aide à l'identification des fuites et dérives",
    ],
  },
  // Phrase de clôture de la plaquette ("Visualisez vos consommations et
  // recevez vos alertes à distance."), non reprise jusqu'ici — le bandeau de
  // fin de la page utilisait par défaut la signature de marque générique.
  tagline: "Visualisez vos consommations et recevez vos alertes à distance.",
  cta: "Étudier mon projet monitoring",
};

// ---------------------------------------------------------------------------
// 6. Syndics & copropriétés — /cartographie-reseaux-copropriete/
// ---------------------------------------------------------------------------
export const copropriete = {
  seo: { title: "Plan & Cartographie des Réseaux de Copropriété | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Mieux connaître les réseaux de votre copropriété",
    body: [
      "Les réseaux d'une copropriété sont souvent anciens, modifiés au fil des années ou insuffisamment documentés. Plans inexistants, tracés imprécis, regards non identifiés ou canalisations difficiles à localiser compliquent les opérations de maintenance et la préparation des travaux.",
      "GEORESEAUX MAURITIUS accompagne les syndics et copropriétés dans l'identification, la localisation et la cartographie progressive de leurs réseaux.",
    ],
  },
  demarche: {
    heading: "Démarche",
    steps: [
      { number: "1", title: "Collecter", text: "Analyser les plans, documents et informations existants." },
      { number: "2", title: "Investiguer", text: "Rechercher les réseaux et ouvrages dans le périmètre étudié." },
      { number: "3", title: "Localiser", text: "Identifier les tracés et éléments détectés." },
      {
        number: "4",
        title: "Cartographier",
        text: "Créer ou enrichir les documents représentant les réseaux identifiés.",
      },
      { number: "5", title: "Actualiser", text: "Enrichir la documentation lors de nouvelles interventions." },
      {
        number: "6",
        title: "Monitorer",
        text: "Surveiller certains points stratégiques lorsque cela est pertinent.",
      },
    ] satisfies StepItem[],
  },
  anomalie: {
    heading: "De l'anomalie à l'intervention",
    flow: ["SURVEILLER", "INVESTIGUER", "LOCALISER", "CARTOGRAPHIER", "CAPITALISER"],
  },
  cta: "Étudier ma copropriété",
};

// ---------------------------------------------------------------------------
// 7. Nos secteurs — /secteurs/
// ---------------------------------------------------------------------------
export const secteurs = {
  seo: { title: "Nos Secteurs | GEORESEAUX MAURITIUS" },
  hero: { h1: "Des solutions adaptées à chaque patrimoine" },
  items: [
    {
      title: "Syndics & copropriétés",
      text: "Détection • Cartographie patrimoniale • Monitoring des consommations et équipements.",
    },
    { title: "Industries", text: "Détection • Relevés • Cartographie • Monitoring • Supervision." },
    { title: "Collectivités", text: "Investigation • Localisation • Cartographie • Documentation patrimoniale." },
    {
      title: "Hôtels & établissements",
      text: "Cartographie • Consommations • Niveaux • Pompage • Alertes.",
    },
    {
      title: "Gestionnaires de patrimoine",
      text: "Cartographie évolutive • Mise à jour • Monitoring.",
    },
    {
      title: "Entreprises de travaux",
      text: "Investigation • Localisation • Matérialisation terrain.",
    },
    {
      title: "Promoteurs & maîtres d'ouvrage",
      text: "Investigation terrain • Localisation • Relevés • Cartographie.",
    },
    {
      title: "Exploitants & gestionnaires de réseaux",
      text: "Détection • Localisation • Cartographie • Monitoring.",
    },
  ] satisfies CardItem[],
};

// Sous-ensemble utilisé sur l'accueil : le menu principal ne liste que ces six
// secteurs (cahier des charges §1, "Menu principal") — la page /secteurs/
// affiche les huit catégories du §7 "Nos secteurs", qui en ajoute deux
// (Promoteurs & maîtres d'ouvrage, Exploitants & gestionnaires de réseaux)
// absentes du menu. Écart présent dans le document source, non résolu
// silencieusement : voir la note transmise au client.
export const secteursMenu = [
  "Syndics & copropriétés",
  "Industries",
  "Collectivités",
  "Hôtels",
  "Gestionnaires de patrimoine",
  "Entreprises de travaux",
];

// ---------------------------------------------------------------------------
// 8. Méthodologie — /methodologie/
// ---------------------------------------------------------------------------
export const methodologie = {
  seo: { title: "Méthodologie | GEORESEAUX MAURITIUS" },
  hero: { h1: "De l'analyse du besoin à la restitution" },
  steps: [
    {
      number: "01",
      title: "Analyse",
      text: "Comprendre le besoin, le site, le périmètre et les résultats attendus.",
    },
    {
      number: "02",
      title: "Préparation",
      text: "Analyser les informations disponibles et sélectionner les moyens d'investigation.",
    },
    {
      number: "03",
      title: "Investigation terrain",
      text: "Rechercher et localiser les réseaux et ouvrages.",
    },
    {
      number: "04",
      title: "Traitement",
      text: "Organiser et structurer les informations recueillies.",
    },
    {
      number: "05",
      title: "Cartographie",
      text: "Représenter les éléments identifiés lorsque la mission comprend cette prestation.",
    },
    {
      number: "06",
      title: "Restitution",
      text: "Transmettre les documents et informations prévus dans le cadre de la mission.",
    },
  ] satisfies StepItem[],
};

// ---------------------------------------------------------------------------
// À propos — /a-propos/
// ---------------------------------------------------------------------------
export const aPropos = {
  seo: { title: "À Propos | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Connaître aujourd'hui. Sécuriser demain.",
    body: "GEORESEAUX MAURITIUS accompagne les professionnels et gestionnaires de patrimoine dans la connaissance de leurs réseaux et infrastructures. Notre approche associe investigation terrain, localisation, relevés, cartographie et monitoring afin de transformer progressivement les informations recueillies sur le terrain en une connaissance technique exploitable.",
  },
  engagements: {
    heading: "Nos engagements",
    items: [
      "Investigation non destructive",
      "Approche multi-technologies",
      "Traçabilité des informations",
      "Cartographie du patrimoine",
      "Documentation évolutive",
      "Réactivité",
    ],
  },
};

// ---------------------------------------------------------------------------
// 9. Préparer mon devis — /demander-un-devis/
// ---------------------------------------------------------------------------
// Formulaire réécrit en septembre 2026 à partir de la structure exacte
// transmise par le client ("exactement comme ce que mon boss le dit") : 9
// sections numérotées, texte repris mot pour mot. Remplace intégralement
// l'ancien formulaire à 4 blocs (Type de besoin / Informations site /
// Documents / Coordonnées).
export const devis = {
  seo: { title: "Préparer un Devis | GEORESEAUX MAURITIUS" },
  hero: {
    h1: "Préparer mon devis",
    body: "Afin de vous proposer une intervention adaptée, merci de compléter les informations ci-dessous. Ce formulaire nous permet d'analyser votre besoin et, lorsque cela est possible, d'établir votre devis sans visite préalable.",
  },
  // 1. Vos coordonnées
  coordonnees: {
    heading: "Vos coordonnées",
    fields: [
      { name: "nomPrenom", label: "Nom / Prénom", required: true, type: "text" },
      { name: "societe", label: "Société / Copropriété", required: false, type: "text" },
      { name: "telephone", label: "Téléphone", required: true, type: "tel" },
      { name: "email", label: "E-mail", required: true, type: "email" },
    ],
  },
  // 2. Adresse du site à étudier
  adresseSite: {
    heading: "Adresse du site à étudier",
    fields: [
      { name: "adresse", label: "Adresse", required: true },
      { name: "codePostal", label: "Code postal", required: true },
      { name: "ville", label: "Ville", required: true },
    ] as { name: string; label: string; required: boolean }[],
    note: "L'adresse nous permet notamment d'effectuer une première analyse de l'emprise du site et des données cadastrales disponibles.",
  },
  // 3. Votre besoin
  besoin: {
    heading: "Votre besoin",
    question: "Quelle est votre demande ?",
    options: [
      "Détection de réseaux enterrés",
      "Localisation d'un réseau précis",
      "Détection et cartographie des réseaux",
      "Cartographie / mise à jour d'un plan existant",
      "Repérage avant travaux",
      "Recherche d'un réseau inconnu",
      "Autre",
    ],
  },
  // 4. Réseaux concernés
  reseaux: {
    heading: "Réseaux concernés",
    question: "Quels réseaux souhaitez-vous rechercher ou localiser ?",
    options: [
      "Eau potable",
      "Arrosage",
      "Eaux usées",
      "Eaux pluviales",
      "Électricité",
      "Télécom / fibre",
      "Gaz",
      "Éclairage extérieur",
      "Plusieurs réseaux",
      "Je ne sais pas",
      "Autre",
    ],
  },
  // 5. Type de site
  typeSite: {
    heading: "Type de site",
    options: [
      "Maison / propriété privée",
      "Résidence / copropriété",
      "Parking",
      "Terrain",
      "Site professionnel ou industriel",
      "Voirie / espaces extérieurs",
      "Autre",
    ],
    surface: {
      label: "Surface approximative de la zone à investiguer, si connue",
      unit: "m²",
    },
  },
  // 6. Documents disponibles
  // uploadLabel/uploadButton/accept/hint (envoi direct de fichier) remplacés
  // par linkLabel/linkHint le 02/10/2026 : la migration de Web3Forms vers
  // EmailJS (demande client, pour un e-mail reçu "digne d'un formulaire")
  // perd la pièce jointe — le plan gratuit EmailJS ne supporte aucune pièce
  // jointe (choix explicite du client, qui connaît cette limite : dépôt sur
  // Drive/WeTransfer + lien collé dans le formulaire). Texte de ce champ
  // rédigé par moi, pas repris d'une plaquette — à valider par le client.
  documents: {
    heading: "Documents disponibles",
    question: "Disposez-vous de plans ou documents relatifs au site ?",
    items: ["Plan de masse", "Plan cadastral", "Plan des réseaux", "Plan de recollement", "DOE", "Ancien rapport", "Autre document"],
    linkLabel: "Lien vers vos documents (Google Drive, WeTransfer, etc.)",
    linkHint: "Déposez votre fichier sur Google Drive, WeTransfer ou un service équivalent, puis collez ici le lien de partage.",
  },
  // 7. Objet de l'intervention
  objetIntervention: {
    heading: "Objet de l'intervention",
    options: [
      "Projet de travaux",
      "Terrassement",
      "Absence ou perte des plans",
      "Mise à jour de la cartographie des réseaux",
      "Sinistre / anomalie",
      "Maintenance du site",
      "Autre",
    ],
  },
  // 8. Délai souhaité
  delai: {
    heading: "Délai souhaité",
    options: ["Pas d'urgence particulière", "Intervention souhaitée rapidement", "Travaux déjà programmés"],
    dateLabel: "Date souhaitée ou date prévue des travaux",
  },
  // 9. Informations complémentaires
  complementaire: {
    heading: "Informations complémentaires",
    label: "Vous pouvez préciser ici toute information utile concernant votre demande",
  },
  submit: "ENVOYER MA DEMANDE",
  success: {
    heading: "Merci pour votre demande.",
    body: "L'équipe GEORESEAUX va analyser les informations transmises afin de déterminer les moyens nécessaires à l'intervention et de préparer votre proposition. Nous vous contacterons uniquement si des informations complémentaires sont nécessaires.",
  },
  // Bouton CTA "Préparer mon devis" à afficher sur les pages principales du
  // site (accueil, navigation, footer), avec sa légende optionnelle — demande
  // explicite du client relayant les instructions de son responsable.
  ctaLabel: "Préparer mon devis",
  ctaSubtitle: "Quelques informations suffisent pour nous permettre d'analyser votre besoin.",
};

// Questionnaire court, intégré directement en page d'accueil — demande
// explicite du client ("est-ce que tu peux me faire ce questionnaire sur la
// demande de devis sur la page d'accueil stp"), texte transmis tel quel.
// Version réduite du formulaire de /demander-un-devis/ : 7 sections au lieu
// de 9 (pas de pièce jointe, pas de délai souhaité, pas d'objet
// d'intervention) — ne pas fusionner avec `devis` ci-dessus, ce sont deux
// formulaires distincts avec des libellés différents.
export const devisAccueil = {
  coordonnees: {
    heading: "Coordonnées du client",
    fields: [
      { name: "nomPrenom", label: "Nom / Prénom", required: true, type: "text" },
      { name: "societe", label: "Société / Copropriété", required: false, type: "text" },
      { name: "telephone", label: "Téléphone", required: true, type: "tel" },
      { name: "email", label: "E-mail", required: true, type: "email" },
    ] as { name: string; label: string; required: boolean; type?: string }[],
  },
  adresseSite: {
    heading: "Adresse du site à étudier",
    fields: [
      { name: "adresse", label: "Adresse", required: true },
      { name: "codePostalVille", label: "Code postal / Ville", required: true },
    ] as { name: string; label: string; required: boolean }[],
  },
  besoin: {
    heading: "Votre besoin",
    // "Monitoring systems" ajouté à la demande du client (30/09) — absent
    // jusqu'ici alors que c'est l'un des 3 piliers mis en avant sur
    // l'accueil (voir home.intro, "MONITORING SYSTEM").
    options: [
      "Détection de réseaux enterrés",
      "Cartographie des réseaux",
      "Détection + cartographie",
      "Monitoring systems",
      "Autre",
    ],
  },
  reseaux: {
    heading: "Réseaux concernés",
    options: ["Eau", "Électricité", "Assainissement", "Télécom", "Plusieurs réseaux", "Je ne sais pas"],
  },
  typeSite: {
    heading: "Type de site",
    options: ["Maison / propriété privée", "Résidence / copropriété", "Terrain", "Site professionnel", "Autre"],
  },
  plan: {
    heading: "Disposez-vous d'un plan du site ou des réseaux ?",
    options: ["Oui", "Non"],
  },
  complementaire: {
    heading: "Précision complémentaire éventuelle",
    label: "Précision complémentaire éventuelle",
  },
};
