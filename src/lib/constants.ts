// Données du site — contenu fourni par le client (PDF de référence).
// N'invente aucun texte marketing ici : tout ce qui est affiché vient du PDF.

export const CONTACT_EMAIL = "admin@waterleakgroup.com";
export const CONTACT_PHONE = "04 93 69 59 62";
export const CONTACT_PHONE_HREF = "+33493695962";

export const LOGO_COLOR_URL = "https://sosfuitedeau.com/wp-content/uploads/2026/09/1-100.jpg";
export const LOGO_WHITE_URL = "https://sosfuitedeau.com/wp-content/uploads/2026/09/Blanc@2x.png";

// Images placeholders fournies par le client — à remplacer/réarranger plus tard.
// Elles sont réutilisées sur plusieurs blocs le temps que le client fournisse
// les visuels définitifs.
export const IMAGES = {
  heroHome: "https://sosfuitedeau.com/wp-content/uploads/2026/09/img1.png",
  heroExpertises: "https://sosfuitedeau.com/wp-content/uploads/2026/09/img2.png",
  heroAbout: "https://sosfuitedeau.com/wp-content/uploads/2026/07/1.png",
  heroContact: "https://sosfuitedeau.com/wp-content/uploads/2026/07/2.jpeg",
  plateauTechnique: "https://sosfuitedeau.com/wp-content/uploads/2026/09/plateau.png",
  solutionDigitale: "https://sosfuitedeau.com/wp-content/uploads/2026/09/bateauwle.png",
  expertise1: "https://sosfuitedeau.com/wp-content/uploads/2026/07/4.jpeg",
  expertise2: "https://sosfuitedeau.com/wp-content/uploads/2026/07/5.jpeg",
  expertise3: "https://sosfuitedeau.com/wp-content/uploads/2026/07/7.jpeg",
  expertise4: "https://sosfuitedeau.com/wp-content/uploads/2026/09/plateau.png",
  moyens1: "https://sosfuitedeau.com/wp-content/uploads/2026/09/img1.png",
  moyens2: "https://sosfuitedeau.com/wp-content/uploads/2026/09/img2.png",
  moyens3: "https://sosfuitedeau.com/wp-content/uploads/2026/07/4.jpeg",
  moyens4: "https://sosfuitedeau.com/wp-content/uploads/2026/07/5.jpeg",
  prestationsPipes: "https://sosfuitedeau.com/wp-content/uploads/2026/07/7.jpeg",
  prestationsPerson: "https://sosfuitedeau.com/wp-content/uploads/2026/07/1.png",
  instrumentationBanner: "https://sosfuitedeau.com/wp-content/uploads/2026/09/bateauwle.png",
} as const;

export const NAV_LINKS = [
  { label: "Accueil", to: "/" },
  { label: "Expertises", to: "/expertises" },
  { label: "À propos", to: "/a-propos" },
] as const;

export type ExpertiseItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const EXPERTISES: ExpertiseItem[] = [
  {
    id: "detection",
    title: "Détection & localisation",
    description:
      "Identification et localisation des réseaux enterrés par différentes technologies non destructives.",
    image: IMAGES.expertise1,
  },
  {
    id: "georeferencement",
    title: "Géoréférencement & cartographie",
    description:
      "Relevés terrain et production de données et plans géoréférencés exploitables.",
    image: IMAGES.expertise2,
  },
  {
    id: "dtdict",
    title: "Investigations avant travaux – DT/DICT",
    description:
      "Localisation, relevés, marquage-piquetage et constitution des éléments techniques nécessaires à la sécurisation des interventions.",
    image: IMAGES.expertise3,
  },
  {
    id: "instrumentation",
    title: "Instrumentation & supervision",
    description:
      "Mise en place de solutions permettant d'instrumenter et de suivre les infrastructures et réseaux dans le temps.",
    image: IMAGES.expertise4,
  },
];

export type MoyenItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export const MOYENS_INVESTIGATION: MoyenItem[] = [
  {
    id: "georadar",
    title: "Géoradar",
    description:
      "Investigation du sous-sol permettant notamment la détection de canalisations, fourreaux, cavités et anomalies.",
    image: IMAGES.moyens1,
  },
  {
    id: "detection-electromagnetique",
    title: "Détection électromagnétique",
    description: "Localisation des réseaux conducteurs et équipements associés.",
    image: IMAGES.moyens2,
  },
  {
    id: "sondes-tracables",
    title: "Sondes traçables",
    description:
      "Investigation de réseaux accessibles lorsqu'un traçage interne n'est pas possible.",
    image: IMAGES.moyens3,
  },
  {
    id: "marquage-sol",
    title: "Marquage au sol",
    description: "Restitution terrain permettant de matérialiser les ouvrages détectés.",
    image: IMAGES.moyens4,
  },
];

export const NOS_PRESTATIONS = [
  {
    title: "Relevés terrain",
    description: "Acquisition des positions des ouvrages et éléments identifiés.",
  },
  {
    title: "Géoréférencement",
    description: "Positionnement des réseaux et ouvrages selon les besoins et le niveau de précision recherché.",
  },
  {
    title: "Cartographie",
    description:
      "Création et mise à jour de plans représentant les réseaux identifiés. Intégration SIG.",
  },
  {
    title: "Structuration des données",
    description:
      "Structuration des données afin de permettre leur exploitation dans les systèmes d'information géographique.",
  },
  {
    title: "Classement des réseaux",
    description: "Qualification des données selon leur niveau de précision.",
  },
];

export const NOS_INTERVENTIONS = [
  {
    title: "Investigation terrain",
    description: "Détection et localisation des réseaux et ouvrages existants.",
  },
  {
    title: "Marquage-piquetage",
    description: "Matérialisation sur le terrain des réseaux identifiés.",
  },
  {
    title: "Relevés",
    description: "Acquisition des informations nécessaires à leur représentation.",
  },
  {
    title: "Cartographie",
    description: "Production ou mise à jour des documents techniques.",
  },
  {
    title: "Rapport",
    description: "Restitution des résultats de l'investigation.",
  },
];

export const APPROCHE_GLOBALE = [
  {
    title: "Capteurs & instrumentation",
    description: "Mise en place de dispositifs de mesure adaptés aux ouvrages et infrastructures.",
  },
  {
    title: "Transmission des données",
    description: "Collecte et transmission des informations issues des équipements.",
  },
  {
    title: "Supervision",
    description: "Centralisation et visualisation des données utiles au suivi des installations.",
  },
  {
    title: "Cartographie & SIG",
    description: "Association des équipements et des données à leur localisation géographique.",
  },
];

export const CLIENTS = [
  {
    title: "Collectivités",
    description:
      "Cartographie et connaissance des réseaux et infrastructures du patrimoine communal ou intercommunal.",
  },
  {
    title: "Syndics & copropriétés",
    description:
      "Cartographier des réseaux souvent anciens, incomplets ou insuffisamment documentés afin de constituer progressivement le dossier technique de la copropriété.",
  },
  {
    title: "Entreprises de TP",
    description:
      "Investigations avant travaux et localisation des ouvrages afin de mieux préparer et sécuriser les interventions.",
  },
  {
    title: "Industriels",
    description:
      "Localisation et cartographie des réseaux techniques présents sur les sites et emprises industrielles.",
  },
  {
    title: "Exploitants de réseaux",
    description:
      "Détection, relevés et constitution ou enrichissement du patrimoine cartographique.",
  },
  {
    title: "Promoteurs & maîtres d'ouvrage",
    description:
      "Investigations et connaissance des réseaux existants en amont des opérations et travaux.",
  },
];

export const METHODOLOGIE = [
  {
    number: "01",
    title: "Analyse",
    description: "Étude de votre demande, du périmètre d'intervention et des documents disponibles.",
  },
  {
    number: "02",
    title: "Préparation",
    description: "Analyse des données existantes et définition des moyens d'investigation adaptés.",
  },
  {
    number: "03",
    title: "Investigation terrain",
    description: "Détection, localisation et relevé des réseaux et ouvrages existants.",
  },
  {
    number: "03",
    title: "Traitement des données",
    description: "Contrôle, organisation et structuration des informations collectées.",
  },
  {
    number: "04",
    title: "Cartographie",
    description: "Production ou mise à jour des plans et données géoréférencées.",
  },
  {
    number: "05",
    title: "Restitution",
    description: "Transmission des documents et données issus de la mission.",
  },
];

export const ENGAGEMENTS = [
  {
    icon: "search",
    title: "Investigation non destructive",
    description: "Limiter les ouvertures et destructions inutiles.",
  },
  {
    icon: "badge-check",
    title: "Fiabilité",
    description: "Produire une information exploitable pour les opérations futures.",
  },
  {
    icon: "file-search",
    title: "Traçabilité",
    description: "Conserver et structurer les informations recueillies.",
  },
  {
    icon: "cpu",
    title: "Digitalisation",
    description: "Transformer l'investigation terrain en patrimoine documentaire.",
  },
  {
    icon: "lightbulb",
    title: "Réactivité",
    description: "Organisation adaptée aux besoins des professionnels et gestionnaires de patrimoine.",
  },
] as const;

export type Agence = {
  id: string;
  label: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
};

// Coordonnées approximatives (géocodage manuel) — à affiner si besoin exact.
export const AGENCES: Agence[] = [
  {
    id: "lyon",
    label: "Siège social",
    address: "3 rue de Genève",
    city: "69006 Lyon",
    lat: 45.7746,
    lng: 4.8532,
  },
  {
    id: "paris",
    label: "Agence de Paris",
    address: "8 Bis Rue Abel",
    city: "75012 Paris",
    lat: 48.8468,
    lng: 2.3751,
  },
  {
    id: "nice",
    label: "Agence de Nice",
    address: "455 promenade des Anglais",
    city: "06200 Nice",
    lat: 43.6673,
    lng: 7.21434,
  },
];

export const TYPE_DEMANDE_OPTIONS = [
  "Détection",
  "Géoréférencement & cartographie",
  "DT/DICT",
  "Instrumentation & supervision",
  "Autre",
] as const;
