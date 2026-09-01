/**
 * Single source of truth for every piece of editorial content on the site.
 *
 * Nothing here asserts a fact about ASTRA Studio that has not been supplied:
 * no review scores, no headcount, no performance statistics, no invented
 * clients. What is still missing is listed in `pending` at the bottom.
 */

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const primaryCta = { label: "Démarrer un projet", href: "/contact" };

/* ------------------------------------------------------------------ */
/* Home — hero (VALIDATED, do not restructure)                         */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Agence de création de sites web",
  titleLines: [
    [{ t: "Nous créons" }],
    [{ t: "des " }, { t: "sites web", accent: true }],
    [{ t: "qui propulsent" }],
    [{ t: "votre business." }],
  ] as { t: string; accent?: boolean }[][],
  lead: "Des expériences digitales sur mesure, pensées pour être belles, rapides et réellement utiles à votre activité.",
  primaryCta: { label: "Voir nos réalisations", href: "/realisations" },
  secondaryCta: { label: "Parler à un expert", href: "/contact" },
  signature: ["Space", "Design", "Technology"],
};

/* ------------------------------------------------------------------ */
/* Home — trust                                                        */
/* ------------------------------------------------------------------ */

/**
 * HONEST BY CONSTRUCTION.
 *
 * `relation` decides the wording, and there is deliberately no "client"
 * value to reach for:
 *
 *   "project"  — work actually delivered by the studio
 *   "creative" — a creative direction or demonstration, NOT commissioned work
 *
 * `logo` stays null until a real file exists. The official Mister Dalle mark
 * lives on Shopify's CDN (`shopify://shop_images/PNG-_-1.png` in the theme
 * export) and is not in this repository — download it from the Shopify admin
 * and drop it in /public/assets/clients/. Nothing is redrawn by hand: an
 * approximated logo misrepresents someone else's brand.
 */
export type TrustEntry = {
  name: string;
  relation: "project" | "creative";
  /** Path under /public/assets/clients/, or null while unavailable. */
  logo: string | null;
};

export const trust = {
  eyebrow: "Ils nous font confiance",
  lead: "Des univers auxquels nous aimons donner vie.",
  entries: [
    { name: "Mister Dalle", relation: "project", logo: null },
    { name: "Nali Restaurant & Lounge", relation: "creative", logo: null },
  ] as TrustEntry[],
  labels: {
    project: "Projet",
    creative: "Direction créative",
  },
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type IconName =
  | "design"
  | "code"
  | "gauge"
  | "devices"
  | "search"
  | "support";

export type Service = {
  index: string;
  slug: string;
  title: string;
  /** ONE sentence. The home grid must be readable in two seconds. */
  short: string;
  icon: IconName;
  /** Long form, /services only. */
  body: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    index: "01",
    slug: "design",
    title: "Design",
    short: "Une identité digitale pensée pour votre marque.",
    icon: "design",
    body: "On part de votre marché et de vos clients, pas d'un template. Tout est arbitré en maquette avant la première ligne de code — c'est là qu'une décision coûte une heure plutôt qu'une semaine.",
    deliverables: [
      "Direction artistique",
      "UI/UX",
      "Wireframes",
      "Prototypes",
      "Design system",
    ],
  },
  {
    index: "02",
    slug: "developpement",
    title: "Développement",
    short: "Un site rapide, propre et évolutif.",
    icon: "code",
    body: "Du code typé et lisible, choisi pour le projet et non l'inverse. Un site que vous ferez évoluer dans deux ans sans le réécrire.",
    deliverables: [
      "Sites vitrines",
      "Développement sur mesure",
      "Animations",
      "Intégrations",
      "CMS",
    ],
  },
  {
    index: "03",
    slug: "performance",
    title: "Performance",
    short: "Chaque détail optimisé pour la vitesse.",
    icon: "gauge",
    body: "La vitesse n'est pas une finition, c'est une contrainte de conception. Chaque image, chaque script est pesé — et mesuré.",
    deliverables: [
      "Images optimisées",
      "Architecture",
      "Core Web Vitals",
      "Code propre",
      "Chargement rapide",
    ],
  },
  {
    index: "04",
    slug: "responsive",
    title: "Responsive",
    short: "Une expérience pensée pour chaque écran.",
    icon: "devices",
    body: "Le mobile n'est pas une version réduite du desktop. Chaque largeur est composée séparément, et vérifiée sur captures réelles.",
    deliverables: ["Mobile", "Tablette", "Desktop", "Grands écrans"],
  },
  {
    index: "05",
    slug: "seo",
    title: "SEO",
    short: "Une base technique faite pour être trouvée.",
    icon: "search",
    body: "Un site que les moteurs comprennent. Le référencement commence dans la structure du code, pas dans un plugin ajouté après coup.",
    deliverables: [
      "Structure",
      "Métadonnées",
      "Données structurées",
      "Indexation",
      "Performance",
    ],
  },
  {
    index: "06",
    slug: "accompagnement",
    title: "Accompagnement",
    short: "Un site qui continue d'évoluer avec vous.",
    icon: "support",
    body: "La mise en ligne est un début. Mises à jour, corrections, évolutions : on reste joignables.",
    deliverables: ["Maintenance", "Évolutions", "Corrections", "Conseil"],
  },
];

export const servicesPage = {
  eyebrow: "Services",
  title: ["Des solutions digitales", "pensées pour votre activité."],
  lead: "Six domaines, un seul interlocuteur.",
};

export const servicesHome = {
  eyebrow: "Nos services",
  title: ["Créer des sites", "qui ont une raison d'exister."],
  link: { label: "Voir le détail", href: "/services" },
};

/* ------------------------------------------------------------------ */
/* Home — method                                                       */
/* ------------------------------------------------------------------ */

export const processIntro = {
  eyebrow: "Notre méthode",
  title: ["Quatre étapes.", "Aucune surprise."],
};

export type Step = {
  index: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * All four were cut from the same 724px-tall source strip, so rendering them
 * at an identical CSS height reproduces the original relative scale and the
 * shared ground line for free.
 */
export const process: Step[] = [
  {
    index: "01",
    title: "Découverte",
    body: "On creuse votre activité et vos objectifs.",
    image: "/assets/process-01-discovery.webp",
    alt: "Astronaute ASTRA examinant le terrain à la loupe",
    width: 464,
    height: 724,
  },
  {
    index: "02",
    title: "Conception",
    body: "Vous validez le site avant qu'il existe.",
    image: "/assets/process-02-design.webp",
    alt: "Astronaute ASTRA tenant un grand crayon violet",
    width: 460,
    height: 724,
  },
  {
    index: "03",
    title: "Développement",
    body: "Intégration au pixel, testée sur tous les écrans.",
    image: "/assets/process-03-build.webp",
    alt: "Astronaute ASTRA en train de coder sur un ordinateur portable",
    width: 524,
    height: 724,
  },
  {
    index: "04",
    title: "Mise en ligne",
    body: "Déploiement, mesure, et la suite ensemble.",
    image: "/assets/process-04-launch.webp",
    alt: "Astronaute ASTRA plantant un drapeau sur la lune",
    width: 580,
    height: 724,
  },
];

/* ------------------------------------------------------------------ */
/* Home — why ASTRA                                                    */
/* ------------------------------------------------------------------ */

export const why = {
  eyebrow: "Pourquoi ASTRA",
  title: ["Un interlocuteur.", "Pas un service client."],
  points: [
    {
      index: "01",
      title: "Vous parlez à celui qui construit",
      body: "Pas de chef de projet intermédiaire. La personne qui dessine est celle qui code, et celle qui vous répond.",
    },
    {
      index: "02",
      title: "Vous voyez avant de payer la suite",
      body: "Les maquettes sont validées avant le développement. Aucun projet ne démarre sur une promesse.",
    },
    {
      index: "03",
      title: "Le site vous appartient",
      body: "Code livré, hébergement au choix, aucune dépendance à un abonnement maison pour modifier une page.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: "À propos",
  title: ["Une bonne idée ne suffit pas.", "Il faut la rendre évidente."],
  lead: "ASTRA n'est pas une agence qui fabrique des pages. Nous concevons des expériences digitales qui doivent servir une vraie activité.",
  blocks: [
    {
      index: "01",
      title: "Comprendre",
      body: "Votre métier, vos clients, ce qui déclenche un appel ou une commande. On ne décore pas : on résout.",
    },
    {
      index: "02",
      title: "Concevoir",
      body: "Une direction artistique tenue, arbitrée en maquette. Vous voyez le site avant qu'il existe.",
    },
    {
      index: "03",
      title: "Construire",
      body: "Du code propre et rapide, composé écran par écran plutôt que comprimé depuis le desktop.",
    },
    {
      index: "04",
      title: "Faire évoluer",
      body: "Un site vit. La structure prévoit la suite au lieu de la subir.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  services: string[];
  year: string;
  body: string;
  /**
   * Real screenshot. Drop the file in /public/assets/projects/ and set the
   * path — the layout re-composes around it: the image becomes the subject
   * and takes the larger half. Until then the entry stays text-led.
   */
  image?: string;
  /**
   * "delivered" is the ONLY value that presents the entry as commissioned
   * work. Anything not actually built for a paying client stays "creative"
   * and is labelled as a creative direction, never as a réalisation.
   */
  status: "delivered" | "creative" | "upcoming";
  study?: {
    context: string;
    objective: string;
    direction: string;
    build: string;
    outcome: string;
    gallery?: string[];
  };
};

export const projectsIntro = {
  eyebrow: "Réalisations",
  title: ["Quelques projets.", "Beaucoup d'intention."],
  lead: "Chaque projet est mené de bout en bout par le studio.",
};

/**
 * Mistral Pizza is prepared as the lead entry but is NOT presented as
 * delivered: `status` stays "upcoming" and no year or image is claimed.
 * Set `status: "delivered"`, a real `year`, the `image` and the `study`
 * block the day it ships — the page re-composes around it.
 */
export const projects: Project[] = [
  {
    slug: "mistral-pizza",
    index: "01",
    name: "Mistral Pizza",
    category: "Restauration",
    services: ["Direction artistique", "Web design", "Développement"],
    year: "—",
    status: "upcoming",
    body: "Une expérience digitale pensée pour une pizzeria locale qui veut donner envie avant même la première bouchée.",
  },
  {
    slug: "nali-restaurant-lounge",
    index: "02",
    name: "Nali Restaurant & Lounge",
    category: "Restauration · Lounge",
    services: ["Direction créative", "Exploration visuelle"],
    year: "—",
    status: "creative",
    body: "Une exploration de direction créative autour d'un lieu qui mêle table et lounge. Ambiance, rythme, hiérarchie — le vocabulaire avant le site.",
  },
];

export const projectStatusLabel: Record<Project["status"], string> = {
  delivered: "Projet livré",
  creative: "Direction créative",
  upcoming: "En préparation",
};

export const projectsHome = {
  eyebrow: "Réalisations",
  title: ["Le travail,", "pas la promesse."],
  link: { label: "Voir les réalisations", href: "/realisations" },
};

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type Offer = {
  index: string;
  name: string;
  from: string;
  pitch: string;
  includes: string[];
};

export const pricing = {
  eyebrow: "Tarifs",
  title: ["Des offres claires.", "Pas de formule toute faite."],
  lead: "Chaque projet est différent. Nous construisons une proposition selon vos objectifs et le travail réellement nécessaire.",
  note: "Le tarif final dépend du contenu, du nombre de pages et des fonctionnalités.",
  offers: [
    {
      index: "01",
      name: "Essentiel",
      from: "690 €",
      pitch: "Pour un site vitrine simple et efficace.",
      includes: [
        "Jusqu'à 5 pages",
        "Design sur mesure",
        "Responsive complet",
        "SEO technique de base",
      ],
    },
    {
      index: "02",
      name: "Signature",
      from: "1 190 €",
      pitch:
        "Pour un site avec une vraie direction artistique, des animations et une expérience plus poussée.",
      includes: [
        "Direction artistique dédiée",
        "Animations et micro-interactions",
        "Pages sur mesure",
        "SEO technique complet",
      ],
    },
    {
      index: "03",
      name: "Expérience",
      from: "1 690 €",
      pitch: "Pour un site plus technique, avec des interactions poussées.",
      includes: [
        "3D légère",
        "Animations avancées",
        "Interactions sur mesure",
        "Développement spécifique",
      ],
    },
  ] as Offer[],
  custom: {
    title: "E-commerce ou besoin très spécifique ?",
    body: "Boutique en ligne, outil métier, intégration particulière : ces projets se chiffrent après un échange. Décrivez le vôtre, nous vous dirons franchement si nous sommes les bons interlocuteurs.",
    price: "Sur devis",
    cta: { label: "Parlons-en", href: "/contact" },
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Contact",
  title: ["Parlons de votre projet."],
  lead: "Une idée, une refonte ou simplement envie d'en discuter ? Expliquez-nous votre projet.",
  reassurance: {
    title: "Pas besoin d'avoir tout préparé.",
    body: "Quelques lignes suffisent pour commencer. On vous répond avec un premier avis, sans engagement.",
  },
  projectTypes: [
    "Site vitrine",
    "Site sur mesure",
    "E-commerce",
    "Refonte",
    "Autre",
  ],
  budgetLabel: "Quel budget avez-vous prévu ?",
  budgets: [
    "Moins de 700 €",
    "700 € – 1 200 €",
    "1 200 € – 1 800 €",
    "Plus de 1 800 €",
    "Je ne sais pas encore",
  ],
  submit: "Parler de mon projet",
};

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */

export const cta = {
  title: ["Prêt à donner vie", "à votre projet ?"],
  lead: "Discutons de votre projet et créons ensemble un site qui fera la différence.",
  primary: { label: "Démarrer mon projet", href: "/contact" },
  secondary: { label: "Nous contacter", href: "/contact" },
};

/* ------------------------------------------------------------------ */
/* Company details — ALL PENDING                                       */
/* ------------------------------------------------------------------ */

/**
 * Every value below is unset. Components render an explicit "à renseigner"
 * marker rather than a plausible-looking placeholder: a fake address that
 * ships by accident is a legal problem, and nobody notices a convincing one.
 */
export const company = {
  name: "ASTRA Studio",
  tagline:
    "Une agence digitale qui transforme les idées en expériences web.",
  /** TODO */ email: null as string | null,
  /** TODO */ phone: null as string | null,
  /** TODO */ availability: null as string | null,
  /** TODO */ address: null as string | null,
  /** TODO */ legalForm: null as string | null,
  /** TODO */ siret: null as string | null,
  /** TODO */ vat: null as string | null,
  /** TODO */ director: null as string | null,
  /** TODO */ host: null as string | null,
  socials: [
    { label: "Instagram", href: null as string | null },
    { label: "LinkedIn", href: null as string | null },
  ],
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  columns: [
    { title: "Navigation", links: nav },
    {
      title: "Services",
      links: services.map((s) => ({
        label: s.title,
        href: `/services#${s.slug}`,
      })),
    },
    {
      title: "Infos",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        {
          label: "Politique de confidentialité",
          href: "/politique-confidentialite",
        },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} ASTRA Studio. Tous droits réservés.`,
};

/* ------------------------------------------------------------------ */
/* Legal pages — templates to complete                                 */
/* ------------------------------------------------------------------ */

export type LegalSection = { title: string; body: string[] };

export const legal = {
  notice: {
    eyebrow: "Informations légales",
    title: "Mentions légales",
    intro:
      "Ce document est un modèle. Les informations d'identification de l'éditeur et de l'hébergeur doivent être complétées avant toute mise en ligne : leur absence est sanctionnée par la loi pour la confiance dans l'économie numérique.",
    sections: [
      {
        title: "Éditeur du site",
        body: [
          "Dénomination sociale : à renseigner.",
          "Forme juridique et capital social : à renseigner.",
          "Siège social : à renseigner.",
          "Numéro SIRET : à renseigner.",
          "Numéro de TVA intracommunautaire : à renseigner.",
          "Directeur de la publication : à renseigner.",
          "Adresse e-mail de contact : à renseigner.",
        ],
      },
      {
        title: "Hébergement",
        body: [
          "Nom de l'hébergeur : à renseigner.",
          "Adresse de l'hébergeur : à renseigner.",
          "Téléphone de l'hébergeur : à renseigner.",
        ],
      },
      {
        title: "Propriété intellectuelle",
        body: [
          "L'ensemble des contenus présents sur ce site — textes, visuels, illustrations, code — est protégé par le droit d'auteur. Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.",
        ],
      },
      {
        title: "Responsabilité",
        body: [
          "L'éditeur met tout en œuvre pour assurer l'exactitude des informations publiées, sans pouvoir en garantir l'exhaustivité. Les liens vers des sites tiers n'engagent pas sa responsabilité quant à leur contenu.",
        ],
      },
    ] as LegalSection[],
  },
  privacy: {
    eyebrow: "Informations légales",
    title: "Politique de confidentialité",
    intro:
      "Ce document est un modèle conforme dans sa structure au RGPD. Les mentions concernant le responsable de traitement, les durées de conservation et les sous-traitants doivent être complétées selon les outils réellement utilisés.",
    sections: [
      {
        title: "Responsable du traitement",
        body: [
          "Identité et coordonnées du responsable de traitement : à renseigner.",
          "Coordonnées du délégué à la protection des données, le cas échéant : à renseigner.",
        ],
      },
      {
        title: "Données collectées",
        body: [
          "Formulaire de contact : nom, entreprise, adresse e-mail, téléphone, type de projet, budget envisagé et message.",
          "Ces données sont fournies volontairement par l'utilisateur et servent uniquement à répondre à sa demande.",
        ],
      },
      {
        title: "Finalité et base légale",
        body: [
          "Les données du formulaire sont traitées pour répondre à une demande de contact et, le cas échéant, pour établir une proposition commerciale.",
          "La base légale est l'intérêt légitime du studio à répondre aux sollicitations reçues, ainsi que les mesures précontractuelles prises à la demande de la personne concernée.",
        ],
      },
      {
        title: "Durée de conservation",
        body: [
          "Durée de conservation des demandes de contact : à définir (recommandation : trois ans à compter du dernier échange).",
        ],
      },
      {
        title: "Destinataires et sous-traitants",
        body: [
          "Hébergeur du site : à renseigner.",
          "Service d'acheminement des e-mails : à renseigner.",
          "Aucune donnée n'est cédée ni vendue à des tiers.",
        ],
      },
      {
        title: "Vos droits",
        body: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données.",
          "Adresse à laquelle exercer ces droits : à renseigner.",
          "Vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).",
        ],
      },
    ] as LegalSection[],
  },
  cookies: {
    eyebrow: "Informations légales",
    title: "Cookies",
    intro:
      "En l'état actuel, ce site ne dépose aucun cookie de mesure d'audience ni de publicité. Ce document doit être mis à jour si un outil d'analytics, une carte, une vidéo intégrée ou un pixel publicitaire est ajouté.",
    sections: [
      {
        title: "Cookies actuellement déposés",
        body: [
          "Aucun cookie de suivi n'est utilisé à ce jour.",
          "Aucun outil de mesure d'audience n'est installé.",
          "Aucun service tiers déposant des traceurs n'est intégré.",
        ],
      },
      {
        title: "Si des cookies sont ajoutés",
        body: [
          "Un bandeau de consentement conforme aux recommandations de la CNIL devra être mis en place avant tout dépôt de traceur non strictement nécessaire.",
          "Le consentement devra pouvoir être refusé aussi facilement qu'accepté, et retiré à tout moment.",
          "La liste des cookies, leur finalité et leur durée de vie devront être détaillées ici.",
        ],
      },
      {
        title: "Contact",
        body: [
          "Adresse pour toute question relative aux traceurs : à renseigner.",
        ],
      },
    ] as LegalSection[],
  },
};

/* ------------------------------------------------------------------ */
/* What is still missing                                               */
/* ------------------------------------------------------------------ */

export const pending = [
  "company.email / phone / availability",
  "company.address, legalForm, siret, vat, director, host",
  "company.socials[].href",
  "trust.entries[].logo — logos officiels dans /public/assets/clients/",
  "projects[].image / year / status — passer à « delivered » à la livraison",
  "projects[].study — étude de cas pour /realisations/[slug]",
  "legal.* — compléter chaque « à renseigner »",
];
