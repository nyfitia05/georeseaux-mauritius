/**
 * English version of the site texts — same structure as content.fr.ts.
 * Every export is typed against its French counterpart, so a missing or
 * misnamed field is caught at build time (npm run build).
 */
import type * as FR from "./content.fr";
import type { CardItem, StepItem } from "./content.fr";

export const brand: typeof FR.brand = {
  name: "GEORESEAUX MAURITIUS",
  tagline: "DETECT • LOCATE • MAP • MONITOR",
  signature: "Know today. Secure tomorrow.",
  signatureCaps: "KNOW TODAY. SECURE TOMORROW.",
  phone: "+230 5792 8639",
  phoneHref: "tel:+23057928639",
  email: "admin@waterleakgroup.com",
  emailHref: "mailto:admin@waterleakgroup.com",
};

export const footer: typeof FR.footer = {
  address: ["Lifestyle Boulevard, Sottise Road, Suite 31", "Grand Baie 30510, Mauritius"],
  links: [
    { label: "Group", href: "https://waterleakgroup.com/" },
    { label: "Academy", href: "https://waterleakacademy.com/" },
    { label: "Expert", href: "https://waterleakexpert.com/" },
    { label: "Monitoring", href: "https://waterleakmonitoring.com/" },
  ],
};

export const plateauTechnique: typeof FR.plateauTechnique = {
  heading: "Our technical support desk",
  headingAccent: "technical support desk",
  intro: "We handle:",
  items: [
    { label: "Calls", detail: "Monday to Saturday, 8am – 7pm" },
    { label: "Emails", detail: "7 days a week" },
    { label: "Appointments", detail: "same day" },
  ],
  cta: "Request a quote",
};

// Not displayed on the Mauritius site (kept for structure only).
export const agences: typeof FR.agences = [
  { label: "Head office", address: "3 rue de Genève, 69006 Lyon" },
  { label: "Paris office", address: "8 Bis Rue Abel 75012 Paris" },
  { label: "Nice office", address: "455 promenade des Anglais 06200 Nice" },
];

export const positioning: string = "From understanding your networks to monitoring them";

export const pillars: CardItem[] = [
  { title: "DETECT", text: "Search for buried networks and structures." },
  { title: "LOCATE", text: "On-site marking of routes and equipment." },
  { title: "MAP", text: "Survey and production of usable documents." },
  { title: "MONITOR", text: "Installation of monitoring solutions at strategic points." },
];

export const nav: typeof FR.nav = {
  accueil: { label: "Home", href: "/" },
  expertises: {
    label: "Our expertise",
    items: [
      { label: "Detection and location", href: "/detection-reseaux-enterres/" },
      { label: "Mapping and georeferencing", href: "/cartographie-reseaux/" },
    ],
  },
  monitoring: { label: "GEORESEAUX Monitoring", href: "/monitoring/" },
  secteurs: { label: "Sectors", href: "/secteurs/" },
  methodologie: { label: "Methodology", href: "/methodologie/" },
  aPropos: { label: "About", href: "/a-propos/" },
  devisCta: { label: "Prepare my quote", href: "/demander-un-devis/" },
  devisExpressCta: { href: "/devis-express/" },
};

export const home: typeof FR.home = {
  seo: {
    title: "Underground Network Detection & Mapping | GEORESEAUX MAURITIUS",
    description: "Detection, location and mapping of underground networks in Mauritius, without destructive works. GEORESEAUX MAURITIUS supports site managers, property managers and businesses.",
  },
  hero: {
    h1: "Detect. Locate. Map.",
    cta: "Request a quote",
    body: "From locating buried networks to mapping and monitoring them, GEORESEAUX MAURITIUS helps site managers understand and keep track of their infrastructure.",
  },
  intro: {
    items: [
      {
        title: "DETECTION & LOCATION",
        text: "Identify and locate buried networks on site, without destructive works.",
      },
      {
        title: "MAPPING",
        text: "Turn field surveys into usable plans and documents.",
      },
      {
        title: "MONITORING SYSTEM",
        text: "Remotely monitor consumption, levels and strategic equipment.",
      },
    ] satisfies CardItem[],
  },
  audiences: [
    "Property managers & condominiums",
    "Architects",
    "Civil engineering & utility contractors",
    "Engineering consultancies",
    "Project managers",
    "Developers & planners",
    "Local authorities",
    "Industrial companies",
    "Campsites & holiday resorts",
    "Golf courses & sports complexes",
    "Managers of large sites and property portfolios",
  ],
  restitution: {
    heading: "Deliverables tailored to each assignment",
    intro: "Depending on the service, GEORESEAUX provides:",
    items: [
      "Detailed intervention report",
      "On-site photographs and markings",
      "Network map / plan",
      "Georeferencing data",
      "Consumption tracking and alerts for monitoring",
    ],
    closing: "Clear, usable information to secure the management of your networks.",
  },
  closing: {
    heading: "Tell us about your site",
    body: "Send us the information and plans available. GEORESEAUX MAURITIUS reviews your needs and defines the appropriate scope of work.",
  },
  cta: "Prepare my quote",
};

export const accueil: typeof FR.accueil = {
  hero: {
    subtitle: "Knowledge of your underground networks in Mauritius and Rodrigues.",
    body: "Detection, georeferencing and mapping of underground networks to secure your projects and optimise the management of your infrastructure.",
  },
  expertises: [
    {
      title: "Detection and location",
      accent: "of underground networks",
      text: "Identify and locate existing networks on site, without destructive works.",
      image: "/img/accueil/detection-localisation.jpeg",
      credit: "",
      href: "/detection-reseaux-enterres/",
    },
    {
      title: "Mapping and",
      accent: "georeferencing",
      text: "Turn field surveys into accurate, usable digital plans.",
      image: "/img/accueil/patrimonial.png",
      credit: "",
      href: "/cartographie-reseaux/",
    },
  ],
  more: "Learn more",
  technologies: {
    title: "Our",
    accent: "technologies",
    items: [
      { title: "Ground-penetrating radar", text: "Subsurface investigation and search for buried networks and structures.", image: "/img/technologies/georadar.jpg" },
      { title: "Electromagnetic detection", text: "Locating and tracing metallic and non-metallic networks.", image: "/img/technologies/detection-electromagnetique.jpg" },
      { title: "Traceable sondes", text: "Locating pipes and structures that cannot be detected by electromagnetic methods.", image: "/img/technologies/sondes-tracables.jpg" },
      { title: "Positioning and georeferencing", text: "Accurate GPS/GNSS surveys integrated into a coordinate system.", image: "/img/technologies/positionnement-georeferencement.jpg" },
    ],
  },
  secteurs: {
    title: "Our",
    accent: "sectors",
    prev: "Previous sectors",
    next: "Next sectors",
    items: [
      { title: "Property managers & condominiums", text: "Residential networks and structures", image: "/img/secteurs/syndics-coproprietes.jpg" },
      { title: "Architects", text: "Project preparation and studies", image: "/img/secteurs/architectes.jpg" },
      { title: "Developers & planners", text: "Securing worksites and network surveys", image: "/img/secteurs/promoteurs-amenageurs.jpg" },
      { title: "Civil works & utility contractors", text: "Identifying existing networks", image: "/img/secteurs/entreprises-tp-vrd.jpg" },
      { title: "Local authorities", text: "Asset management and updates", image: "/img/secteurs/collectivites.jpg" },
      { title: "Industrial companies", text: "Technical sites and complex networks", image: "/img/secteurs/industriels.jpg" },
      { title: "Hotels & establishments", text: "Infrastructure and networks on tourist sites", image: "/img/secteurs/hotels-etablissements.jpg" },
      { title: "Golf courses & sports complexes", text: "Irrigation networks and landscaping", image: "/img/secteurs/golfs-complexes-sportifs.jpg" },
    ],
  },
  methodologie: {
    title: "Our",
    accent: "methodology",
    steps: [
      { number: "01", title: "Analysis", text: "Understand the need, the site and the constraints." },
      { number: "02", title: "Preparation", text: "Gather the available information and define the investigation methods." },
      { number: "03", title: "Field investigation", text: "Detect and locate networks and structures." },
      { number: "04", title: "Processing", text: "Analyse and structure the collected data." },
      { number: "05", title: "Mapping", text: "Produce clear, georeferenced plans." },
      { number: "06", title: "Deliverables", text: "Hand over a complete report and usable documents." },
    ] satisfies StepItem[],
  },
  rapport: {
    title: "A complete technical",
    accent: "report",
    intro: "Each intervention results in a clear, detailed report, including:",
    items: [
      "Networks and structures detected and located",
      "Methods and equipment used",
      "On-site photos and markers",
      "Georeferenced plans and maps",
      "Depths, where these can be determined",
      "Technical conclusions and any recommendations",
    ],
    coverTitle: "INTERVENTION REPORT",
    coverFields: ["Project:", "Site:", "Date:"],
    imageAlt: "Pages of a GEORESEAUX MAURITIUS intervention report",
  },
  exemples: {
    title: "Examples of",
    accent: "interventions",
    intro: "Network detection and mapping carried out in Mauritius.",
    prev: "Previous examples",
    next: "Next examples",
    items: [
      { title: "Urban roads", text: "Detection and location", image: "/img/exemples/voirie-urbaine.jpg" },
      { title: "Construction site", text: "Network marking", image: "/img/exemples/chantier-construction.jpg" },
      { title: "Residence", text: "Network mapping", image: "/img/exemples/residence.jpg" },
      { title: "Industrial site", text: "Detection and surveys", image: "/img/exemples/site-industriel.jpg" },
      { title: "Golf course", text: "Irrigation network", image: "/img/exemples/golf.jpg" },
      { title: "Hotel", text: "Site mapping", image: "/img/exemples/hotel.jpg" },
    ],
  },
};

export const pageDetection: typeof FR.pageDetection = {
  crumb: "Detection and location of underground networks",
  hero: {
    title: "Detection and location",
    accent: "of underground networks",
    body: "Identify and locate existing networks on site, without destructive works, to secure your projects and optimise the management of your infrastructure.",
  },
  expertise: {
    title: "Our",
    accent: "expertise",
    text: "We detect and locate underground networks to establish their position, route and depth. This information helps you secure your works, avoid damage and optimise the management of your assets.",
    items: [
      "Wet and dry networks",
      "Buried structures and fittings",
      "Accurate routing and on-site marking",
      "Non-destructive methods",
      "Suitable for all types of sites",
    ],
    image: "/img/accueil/hero.png",
    imageAlt: "GEORESEAUX MAURITIUS operator with a ground-penetrating radar",
  },
  technologies: {
    title: "Our",
    accent: "technologies",
    items: [
      { title: "Ground-penetrating radar", text: "Subsurface investigation and network search.", image: "/img/technologies/georadar.jpg" },
      { title: "Electromagnetic detection", text: "Locating conductive and non-metallic networks.", image: "/img/technologies/detection-electromagnetique.jpg" },
      { title: "Traceable sondes", text: "Locating pipes that cannot be detected otherwise.", image: "/img/technologies/sondes-tracables.jpg" },
      { title: "Positioning and georeferencing", text: "Accurate surveys integrated into your plans.", image: "/img/technologies/positionnement-georeferencement.jpg" },
    ],
  },
  reseaux: {
    title: "Types of networks",
    accent: "detected",
    prev: "Previous networks",
    next: "Next networks",
    items: [
      { title: "Drinking water and wastewater", image: "/img/reseaux/eau-potable-eaux-usees.jpg" },
      { title: "Stormwater", image: "/img/reseaux/eaux-pluviales.jpg" },
      { title: "Electrical and lighting networks", image: "/img/reseaux/reseaux-electriques-eclairage.jpg" },
      { title: "Telecommunications", image: "/img/reseaux/telecommunications.jpg" },
      { title: "Gas and other networks", image: "/img/reseaux/gaz.jpg" },
      { title: "Structures and fittings (chambers, manholes, etc.)", image: "/img/reseaux/ouvrages-accessoires.jpg" },
    ],
  },
  besoins: {
    title: "Interventions tailored",
    accent: "to your needs",
    items: [
      { icon: "projet", title: "Design phase", text: "Network survey before works." },
      { icon: "travaux", title: "Works phase", text: "Securing and monitoring the worksite." },
      { icon: "existant", title: "Existing sites", text: "Location and marking to update plans." },
    ],
  },
  livrables: {
    title: "Our deliverables",
    items: [
      "Detailed intervention report",
      "Location and marking plans",
      "Georeferenced data (DWG, PDF)",
      "On-site photographs",
      "Depths recorded (where possible)",
    ],
  },
};

export const pageCartographie: typeof FR.pageCartographie = {
  realisations: {
    title: "Sample",
    accent: "deliverables",
    intro: "A few real plans produced on site, available to view and download.",
    view: "View the plan",
    download: "Download",
    close: "Close",
    items: [
      {
        tag: "Utility detection",
        title: "Utility detection plan – road works",
        text: "Detection of underground networks over 4,148 m² around a roundabout, ahead of road works. The detected networks are plotted on the georeferenced topographic survey.",
        image: "/img/realisations/geodetection-montauroux.jpg",
        pdf: "/rapports/plan-geodetection-montauroux.pdf",
      },
      {
        tag: "Demolition plan",
        title: "Demolition plan – same site",
        text: "Plan of the structures to be removed, drawn on the topographic survey and the located networks. It lets the contractor prepare demolition with full knowledge of what is there.",
        image: "/img/realisations/demolition-montauroux.jpg",
        pdf: "/rapports/plan-demolition-montauroux.pdf",
      },
      {
        tag: "Design plan",
        title: "Design plan – same site",
        text: "Plan of the planned layout (roundabout, kerbs, surfacing, street furniture) overlaid on the existing site. The design takes the located networks into account.",
        image: "/img/realisations/projet-montauroux.jpg",
        pdf: "/rapports/plan-projet-montauroux.pdf",
      },
    ],
  },
  crumb: "Mapping and georeferencing",
  hero: {
    title: "Mapping and",
    accent: "georeferencing",
    subtitle: "Turn field surveys into accurate, usable digital plans.",
    body: "GEORESEAUX MAURITIUS maps underground networks and georeferences structures to provide reliable documents that integrate into your projects and asset management systems.",
  },
  prestations: {
    title: "Our",
    accent: "services",
    text: "All the information collected on site is processed and integrated into clear, georeferenced, ready-to-use plans.",
    items: [
      "Field surveys of detected networks",
      "High-precision georeferencing (GNSS)",
      "Digital plans (DWG, PDF)",
      "Integration into your GIS",
      "Identification of structures and key points",
      "Adapted to your projects' reference systems and formats",
    ],
    image: "/img/technologies/positionnement-georeferencement.jpg",
    imageAlt: "GNSS survey on a field tablet",
  },
  technologies: {
    title: "Our",
    accent: "technologies",
    after: "for mapping",
    items: [
      { title: "Positioning and georeferencing", text: "Accurate surveys integrated into your plans.", image: "/img/technologies/positionnement-georeferencement.jpg" },
      { title: "Ground-penetrating radar", text: "Subsurface investigation and network location.", image: "/img/technologies/georadar.jpg" },
      { title: "Electromagnetic detection", text: "Locating conductive and non-metallic networks.", image: "/img/technologies/detection-electromagnetique.jpg" },
      { title: "Traceable sondes", text: "Locating pipes that cannot be detected otherwise.", image: "/img/technologies/sondes-tracables.jpg" },
    ],
  },
  livrables: {
    title: "Deliverables",
    accent: "tailored",
    after: "to your needs",
    text: "We provide accurate, usable documents adapted to your projects and management tools.",
    items: [
      "Georeferenced network plans (DWG, PDF)",
      "Attribute tables and structure sheets",
      "Precise coordinates of surveyed elements",
      "Formats compatible with your GIS",
      "Detailed technical report with methodology and photos",
    ],
    imageAlt: "Examples of network plans produced by GEORESEAUX MAURITIUS",
  },
};

export const detection: typeof FR.detection = {
  seo: {
    title: "Underground Network Detection | GEORESEAUX MAURITIUS",
    description: "Underground network detection in Mauritius: ground-penetrating radar, electromagnetic detection, traceable sondes and access point surveys, without destructive works.",
  },
  hero: {
    h1: "Detect and locate your underground networks",
  },
  technologies: {
    heading: "Technologies",
    items: [
      {
        title: "Ground-penetrating radar",
        text: "Subsurface investigation and search for buried networks and structures.",
      },
      {
        title: "Electromagnetic detection",
        text: "Locating and tracing networks that can be detected electromagnetically.",
      },
      {
        title: "Traceable sondes",
        text: "Locating and tracing pipes using suitable sondes.",
      },
      {
        title: "Inspection and marking of structures",
        text: "On-site identification of manholes, equipment and access points.",
      },
    ] satisfies CardItem[],
  },
  rapport: {
    intro: "After each intervention, GEORESEAUX sends you a complete, detailed technical report, including:",
    items: [
      "The networks and structures searched for",
      "The methods and equipment used",
      "The areas investigated",
      "The networks detected and located",
      "Photographs of the markings made on site",
      "Depths or readings recorded where they can be determined",
      "Any anomalies or difficulties encountered",
      "Technical conclusions and any recommendations",
    ],
  },
  tagline: "Locate your buried networks and structures without destructive works.",
  cta: "Request an investigation",
};

export const releves: typeof FR.releves = {
  seo: {
    title: "Underground Network Mapping | GEORESEAUX MAURITIUS",
    description: "Underground network mapping in Mauritius: routes, structures, measured depths and georeferencing, delivered as clear and usable plans.",
  },
  hero: {
    h1: "Map your underground networks",
  },
  flow: ["Detection", "Georeferencing", "Mapping", "Documentation"],
  intro: {
    left: "Turn your on-site knowledge of your networks into clear, usable documents.",
    right: "Make your networks easier to identify, secure your future works and optimise the technical management of your property.",
  },
  cartographie: {
    heading: "Clear, usable mapping",
    intro:
      "At the end of the assignment, GEORESEAUX provides a digital plan of the networks detected and surveyed on site, including, depending on the scope:",
    items: ["Network routes and identification", "Structures and singular points", "Recorded depths", "Georeferencing of all elements"],
  },
  tagline: "Your networks become visible, located and documented.",
  cta: "Prepare my quote",
};

export const cartographiePatrimoniale: typeof FR.cartographiePatrimoniale = {
  seo: {
    title: "Network Asset Mapping | GEORESEAUX MAURITIUS",
    description: "Network asset mapping in Mauritius: rebuild the technical memory of your networks, building by building or zone by zone, and update it at every intervention.",
  },
  hero: {
    h1: "Building the technical memory of your networks",
    body: "Successive works, modifications, extensions or missing plans can gradually create a gap between the available documentation and the reality on the ground. GEORESEAUX helps managers progressively build a map of their assets.",
  },
  evolutive: {
    heading: "Mapping that evolves with you",
    body: "It is not always necessary to map an entire property at once. GEORESEAUX can work building by building, plot by plot, by area or by type of network. New information can then be added to the existing documentation.",
  },
  flow: ["INVESTIGATE", "LOCATE", "SURVEY", "MAP", "CAPITALISE"],
  cta: "Discuss my mapping project",
};

// Monitoring pages are no longer published on the Mauritius site.
export const monitoring: typeof FR.monitoring = {
  seo: {
    title: "Network & Equipment Monitoring | GEORESEAUX MAURITIUS",
    description: "Remote monitoring of water networks in Mauritius: consumption, levels, lift and booster stations, boreholes and alerts when anomalies occur.",
  },
  hero: {
    h1: "Monitor your water networks 24/7",
  },
  items: [
    { slug: "conso", title: "Water consumption", text: "Consumption tracking.", href: "/monitoring-consommation-eau/" },
    { slug: "niveau", title: "Levels", text: "Level tracking on equipped installations.", href: "/monitoring/" },
    { slug: "reseaux", title: "Strategic network points", text: "Monitoring of points identified as essential.", href: "/monitoring/" },
    { slug: "relevage", title: "Lifting stations", text: "Monitoring of lifting installations.", href: "/monitoring/" },
    { slug: "surpression", title: "Booster stations", text: "Monitoring of booster equipment.", href: "/monitoring/" },
    { slug: "forage", title: "Boreholes & water intakes", text: "Monitoring of equipped installations.", href: "/monitoring/" },
  ],
  banner: "Keep remote visibility over the strategic points of your installation.",
  surveillance: {
    heading: "Connected monitoring",
    intro: "Continuously track the consumption of your water networks and quickly detect anomalies.",
    items: [
      "Remote monitoring 24/7",
      "Alerts in case of abnormal consumption",
      "Consumption history",
      "Help identifying leaks and drifts",
    ],
  },
  tagline: "View your consumption and receive alerts remotely.",
  cta: "Discuss my monitoring project",
};

export const copropriete: typeof FR.copropriete = {
  seo: {
    title: "Condominium Network Plans & Mapping | GEORESEAUX MAURITIUS",
    description: "Condominium network plans and mapping in Mauritius: network investigation, location of routes and manholes, and creation or update of plans.",
  },
  hero: {
    h1: "Get to know your condominium's networks better",
    body: [
      "The networks of a condominium are often old, modified over the years or poorly documented. Missing plans, inaccurate routes, unidentified manholes or pipes that are hard to locate complicate maintenance and the preparation of works.",
      "GEORESEAUX MAURITIUS supports property managers and condominiums in identifying, locating and progressively mapping their networks.",
    ],
  },
  demarche: {
    heading: "Our approach",
    steps: [
      { number: "1", title: "Collect", text: "Analyse existing plans, documents and information." },
      { number: "2", title: "Investigate", text: "Search for networks and structures within the study area." },
      { number: "3", title: "Locate", text: "Identify the routes and elements detected." },
      { number: "4", title: "Map", text: "Create or enrich the documents showing the identified networks." },
      { number: "5", title: "Update", text: "Enrich the documentation during new interventions." },
      { number: "6", title: "Monitor", text: "Monitor certain strategic points where relevant." },
    ] satisfies StepItem[],
  },
  anomalie: {
    heading: "From anomaly to intervention",
    flow: ["MONITOR", "INVESTIGATE", "LOCATE", "MAP", "CAPITALISE"],
  },
  cta: "Discuss my condominium",
};

export const secteurs: typeof FR.secteurs = {
  seo: {
    title: "Our Sectors | GEORESEAUX MAURITIUS",
    description: "Property managers, hotels, industry, local authorities, developers and contractors: GEORESEAUX MAURITIUS detection and mapping solutions for every sector.",
  },
  hero: { h1: "Solutions tailored to every property" },
  items: [
    {
      title: "Property managers & condominiums",
      text: "Detection • Asset mapping • Monitoring of consumption and equipment.",
    },
    { title: "Industry", text: "Detection • Surveys • Mapping • Monitoring • Supervision." },
    { title: "Local authorities", text: "Investigation • Location • Mapping • Asset documentation." },
    { title: "Hotels & establishments", text: "Mapping • Consumption • Levels • Pumping • Alerts." },
    { title: "Property portfolio managers", text: "Evolving mapping • Updates • Monitoring." },
    { title: "Construction companies", text: "Investigation • Location • On-site marking." },
    { title: "Developers & project owners", text: "Field investigation • Location • Surveys • Mapping." },
    { title: "Network operators & managers", text: "Detection • Location • Mapping • Monitoring." },
  ] satisfies CardItem[],
};

export const secteursMenu: typeof FR.secteursMenu = [
  "Property managers & condominiums",
  "Industry",
  "Local authorities",
  "Hotels",
  "Property portfolio managers",
  "Construction companies",
];

export const methodologie: typeof FR.methodologie = {
  seo: {
    title: "Methodology | GEORESEAUX MAURITIUS",
    description: "The GEORESEAUX MAURITIUS method in 6 steps: needs analysis, preparation, field investigation, data processing, mapping and final delivery.",
  },
  hero: { h1: "From needs analysis to final delivery" },
  steps: [
    { number: "01", title: "Analysis", text: "Understand the need, the site, the scope and the expected results." },
    { number: "02", title: "Preparation", text: "Review the available information and select the investigation methods." },
    { number: "03", title: "Field investigation", text: "Search for and locate networks and structures." },
    { number: "04", title: "Processing", text: "Organise and structure the information collected." },
    { number: "05", title: "Mapping", text: "Represent the identified elements when the assignment includes this service." },
    { number: "06", title: "Delivery", text: "Hand over the documents and information agreed for the assignment." },
  ] satisfies StepItem[],
};

export const aPropos: typeof FR.aPropos = {
  seo: {
    title: "About Us | GEORESEAUX MAURITIUS",
    description: "GEORESEAUX MAURITIUS helps professionals and asset managers in Mauritius understand their underground networks and infrastructure.",
  },
  hero: {
    h1: "Know today. Secure tomorrow.",
    body: "GEORESEAUX MAURITIUS helps professionals and property managers understand their networks and infrastructure. Our approach combines field investigation, location, surveys, mapping and monitoring to progressively turn the information gathered on site into usable technical knowledge.",
  },
  engagements: {
    heading: "Our commitments",
    items: [
      "Non-destructive investigation",
      "Multi-technology approach",
      "Traceable information",
      "Asset mapping",
      "Evolving documentation",
      "Responsiveness",
    ],
  },
};

export const devis: typeof FR.devis = {
  seo: {
    title: "Prepare a Quote | GEORESEAUX MAURITIUS",
    description: "Prepare your quote for network detection or mapping in Mauritius: describe your site and your needs, and GEORESEAUX MAURITIUS will review your request.",
  },
  hero: {
    h1: "Prepare my quote",
    body: "So that we can offer you a suitable intervention, please fill in the information below. This form allows us to analyse your needs and, where possible, to prepare your quote without a prior site visit.",
  },
  coordonnees: {
    heading: "Your contact details",
    fields: [
      { name: "nomPrenom", label: "Full name", required: true, type: "text" },
      { name: "societe", label: "Company / Condominium", required: false, type: "text" },
      { name: "telephone", label: "Phone", required: true, type: "tel" },
      { name: "email", label: "Email", required: true, type: "email" },
    ],
  },
  adresseSite: {
    heading: "Address of the site",
    fields: [
      { name: "adresse", label: "Address", required: true },
      { name: "codePostal", label: "Postcode", required: true },
      { name: "ville", label: "Town / City", required: true },
    ] as { name: string; label: string; required: boolean }[],
    note: "The address allows us to carry out an initial analysis of the site footprint and the available cadastral data.",
  },
  besoin: {
    heading: "Your needs",
    question: "What is your request?",
    options: [
      "Underground network detection",
      "Locating a specific network",
      "Network detection and mapping",
      "Mapping / updating an existing plan",
      "Pre-works marking",
      "Search for an unknown network",
      "Other",
    ],
  },
  reseaux: {
    heading: "Networks concerned",
    question: "Which networks would you like to find or locate?",
    options: [
      "Drinking water",
      "Irrigation",
      "Wastewater",
      "Stormwater",
      "Electricity",
      "Telecom / fibre",
      "Gas",
      "Outdoor lighting",
      "Several networks",
      "I don't know",
      "Other",
    ],
  },
  typeSite: {
    heading: "Type of site",
    options: [
      "House / private property",
      "Residence / condominium",
      "Car park",
      "Land",
      "Commercial or industrial site",
      "Roads / outdoor areas",
      "Other",
    ],
    surface: {
      label: "Approximate area to investigate, if known",
      unit: "m²",
    },
  },
  documents: {
    heading: "Available documents",
    question: "Do you have any plans or documents relating to the site?",
    items: ["Site plan", "Cadastral plan", "Network plan", "As-built plan", "O&M file", "Previous report", "Other document"],
    linkLabel: "Link to your documents (Google Drive, WeTransfer, etc.)",
    linkHint: "Upload your file to Google Drive, WeTransfer or a similar service, then paste the sharing link here.",
  },
  objetIntervention: {
    heading: "Purpose of the intervention",
    options: [
      "Planned works",
      "Excavation",
      "Missing or lost plans",
      "Updating the network map",
      "Damage / anomaly",
      "Site maintenance",
      "Other",
    ],
  },
  delai: {
    heading: "Desired timeframe",
    options: ["No particular urgency", "Intervention needed quickly", "Works already scheduled"],
    dateLabel: "Desired date or planned date of works",
  },
  complementaire: {
    heading: "Additional information",
    label: "Add any useful information about your request here",
  },
  submit: "SEND MY REQUEST",
  success: {
    heading: "Thank you for your request.",
    body: "The GEORESEAUX team will review the information provided to determine the resources needed and prepare your proposal. We will only contact you if additional information is required.",
  },
  ctaLabel: "Prepare my quote",
  ctaSubtitle: "A few details are enough for us to analyse your needs.",
};

export const devisAccueil: typeof FR.devisAccueil = {
  coordonnees: {
    heading: "Client contact details",
    fields: [
      { name: "nomPrenom", label: "Full name", required: true, type: "text" },
      { name: "societe", label: "Company / Condominium", required: false, type: "text" },
      { name: "telephone", label: "Phone", required: true, type: "tel" },
      { name: "email", label: "Email", required: true, type: "email" },
    ] as { name: string; label: string; required: boolean; type?: string }[],
  },
  adresseSite: {
    heading: "Address of the site",
    fields: [
      { name: "adresse", label: "Address", required: true },
      { name: "codePostalVille", label: "Postcode / Town", required: true },
    ] as { name: string; label: string; required: boolean }[],
  },
  besoin: {
    heading: "Your needs",
    options: [
      "Underground network detection",
      "Network mapping",
      "Detection + mapping",
      "Monitoring systems",
      "Other",
    ],
  },
  reseaux: {
    heading: "Networks concerned",
    options: ["Water", "Electricity", "Sewerage", "Telecom", "Several networks", "I don't know"],
  },
  typeSite: {
    heading: "Type of site",
    options: ["House / private property", "Residence / condominium", "Land", "Commercial site", "Other"],
  },
  plan: {
    heading: "Do you have a plan of the site or networks?",
    options: ["Yes", "No"],
  },
  complementaire: {
    heading: "Any additional details",
    label: "Any additional details",
  },
};

// Sous-pages SEO — version anglaise des fiches 14, 15, 16 et 17 du cahier des
// charges SEO (texte « English version – publication draft », mot pour mot).
export const sousPages: typeof FR.sousPages = {
  localisationCanalisations: {
    "path": "/localisation-canalisations/",
    "label": "Underground Pipe Locating Mauritius",
    "seo": {
      "title": "Underground Pipe Locating Mauritius | GEORESEAUX MAURITIUS",
      "description": "Underground pipe locating in Mauritius and Rodrigues: finding the route of buried pipes for maintenance, repairs and construction. GEORESEAUX MAURITIUS."
    },
    "h1": "Underground Pipe Locating Mauritius",
    "heroImage": "/img/accueil/detection.png",
    "image": "/img/detection/sonde.png",
    "imageAlt": "Locating a buried pipe with a traceable sonde in Mauritius",
    "intro": [
      "Locating an underground pipe route can support maintenance, repair planning and construction work. Feasibility depends on pipe material, depth, surrounding conditions and available access."
    ],
    "tags": [],
    "sections": [
      {
        "heading": "",
        "text": "Services are subject to site conditions and confirmation of the proposed scope. Contact WATER LEAK GROUP to discuss your property, facility or project in Mauritius or Rodrigues."
      }
    ]
  },
  detectionAvantTravaux: {
    "path": "/detection-reseaux-avant-travaux/",
    "label": "Utility Detection Before Excavation Mauritius",
    "seo": {
      "title": "Utility Detection Before Excavation Mauritius | GEORESEAUX MAURITIUS",
      "description": "Utility detection before excavation in Mauritius and Rodrigues: locating buried services to prepare construction and earthworks. GEORESEAUX MAURITIUS."
    },
    "h1": "Utility Detection Before Excavation Mauritius",
    "heroImage": "/img/accueil/hero.png",
    "image": "/img/detection/georadar.png",
    "imageAlt": "Ground-penetrating radar utility detection before excavation",
    "intro": [
      "Excavation should be prepared with the best available information about buried services. Detection can support on-site planning but does not replace applicable safety procedures or legal obligations."
    ],
    "tags": [],
    "sections": [
      {
        "heading": "",
        "text": "Services are subject to site conditions and confirmation of the proposed scope. Contact WATER LEAK GROUP to discuss your property, facility or project in Mauritius or Rodrigues."
      }
    ]
  },
  localisationIrrigation: {
    "path": "/localisation-reseaux-irrigation/",
    "label": "Irrigation Pipeline Locating Mauritius",
    "seo": {
      "title": "Irrigation Pipeline Locating Mauritius | GEORESEAUX MAURITIUS",
      "description": "Irrigation pipeline locating in Mauritius and Rodrigues: finding buried irrigation pipes on golf courses, estates and agricultural land."
    },
    "h1": "Irrigation Pipeline Locating Mauritius",
    "heroImage": "/img/accueil/patrimonial.png",
    "image": "/img/detection/detection-ele.png",
    "imageAlt": "Electromagnetic detection of a buried irrigation network",
    "intro": [
      "Irrigation pipe networks may extend across golf courses, estates and agricultural land. Pipe route investigation can support maintenance and network documentation, depending on materials, depth and site conditions."
    ],
    "tags": [],
    "sections": [
      {
        "heading": "",
        "text": "Services are subject to site conditions and confirmation of the proposed scope. Contact WATER LEAK GROUP to discuss your property, facility or project in Mauritius or Rodrigues."
      }
    ]
  },
  cartographieGeoreferencement: {
    "path": "/cartographie-georeferencement-reseaux/",
    "label": "Underground Utility Mapping Mauritius",
    "seo": {
      "title": "Underground Utility Mapping Mauritius | GEORESEAUX MAURITIUS",
      "description": "Underground utility mapping and georeferencing in Mauritius and Rodrigues: coordinates, accuracy and deliverables for asset management and future works."
    },
    "h1": "Underground Utility Mapping Mauritius",
    "heroImage": "/img/accueil/carto.png",
    "image": "/img/global/carto.png",
    "imageAlt": "Georeferenced map of underground utilities in Mauritius",
    "intro": [
      "Utility mapping organises information about underground infrastructure for maintenance and future projects. Coordinate systems, accuracy requirements, deliverable formats and survey methods should be agreed for each assignment."
    ],
    "tags": [],
    "sections": [
      {
        "heading": "",
        "text": "Services are subject to site conditions and confirmation of the proposed scope. Contact WATER LEAK GROUP to discuss your property, facility or project in Mauritius or Rodrigues."
      }
    ]
  },
};
