/**
 * Single source of truth for every piece of editorial content.
 *
 * Nothing here asserts a fact about ASTRA that has not been supplied: no
 * project count, no client roster, no performance figures. What is still
 * missing is listed in `pending` at the bottom.
 *
 * Copy is written in lines, not paragraphs, because the display type is
 * set line by line and each line animates on its own. Where a heading is
 * an array, each entry is one rendered line — the break is a typographic
 * decision and belongs with the words.
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
/* Home — hero                                                         */
/* ------------------------------------------------------------------ */

export const hero = {
  kicker: "ASTRA Studio",
  title: ["Les idées qui", "méritent d'aller", "plus loin."],
  /** The last line is set in the recessed grey — the sentence resolves
   *  into the distance rather than shouting its own last word. */
  titleMutedFrom: 2,
  lead: "Nous concevons des identités, des sites et des expériences digitales pensées pour durer.",
  scroll: "Découvrir",
};

/* ------------------------------------------------------------------ */
/* Home — statement                                                    */
/* ------------------------------------------------------------------ */

export const statement = {
  title: ["Nous ne créons pas", "des sites pour remplir", "des écrans."],
  body: "Nous construisons des expériences qui donnent une forme claire aux idées.",
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  index: string;
  slug: string;
  title: string;
  /** One sentence. Shown under the title on the services page. */
  short: string;
  /** Long form, /services only. */
  body: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    index: "01",
    slug: "direction-artistique",
    title: "Direction artistique",
    short: "Une intention claire avant la première maquette.",
    body: "Tout part d'une décision, pas d'une tendance. On définit ce que le projet doit dire, à qui, et avec quelle voix — c'est la seule étape qui rend toutes les suivantes évidentes.",
    deliverables: ["Territoire visuel", "Références", "Arbitrages", "Ton"],
  },
  {
    index: "02",
    slug: "identite-visuelle",
    title: "Identité visuelle",
    short: "Un système qui tient au-delà du logo.",
    body: "Un logo ne fait pas une marque. On construit le système complet — typographie, couleur, grille, règles — pour que la marque reste elle-même partout où elle apparaît.",
    deliverables: ["Logotype", "Typographie", "Palette", "Règles d'usage"],
  },
  {
    index: "03",
    slug: "web-design",
    title: "Web design",
    short: "Des compositions dessinées écran par écran.",
    body: "Chaque largeur est composée, pas comprimée depuis le desktop. Vous validez le site en maquette avant la première ligne de code — c'est là qu'une décision coûte une heure plutôt qu'une semaine.",
    deliverables: ["Maquettes", "Design system", "Prototypes", "Responsive"],
  },
  {
    index: "04",
    slug: "developpement",
    title: "Développement",
    short: "Du code lisible, que vous pourrez faire évoluer.",
    body: "Du code typé et sobre, choisi pour le projet et non l'inverse. Un site que vous reprendrez dans deux ans sans devoir le réécrire.",
    deliverables: ["Intégration", "Performance", "CMS", "Intégrations tierces"],
  },
  {
    index: "05",
    slug: "experience-digitale",
    title: "Expérience digitale",
    short: "Le mouvement, le rythme, le détail qui reste.",
    body: "Une animation a une raison ou elle n'existe pas. On travaille le rythme du scroll, les transitions et les micro-états jusqu'à ce que le site paraisse simplement fluide.",
    deliverables: ["Motion", "Micro-interactions", "Transitions", "Accessibilité"],
  },
  {
    index: "06",
    slug: "accompagnement",
    title: "Accompagnement",
    short: "La mise en ligne est un début, pas une fin.",
    body: "Mises à jour, corrections, évolutions. Vous parlez à la personne qui a construit le site, pas à un service client.",
    deliverables: ["Maintenance", "Évolutions", "Conseil", "Formation"],
  },
];

export const servicesPage = {
  eyebrow: "Services",
  title: ["Ce que nous", "pouvons construire."],
  lead: "Six domaines, un seul interlocuteur, du premier croquis à la mise en ligne.",
};

export const servicesHome = {
  eyebrow: "Services",
  title: ["Ce que nous", "pouvons construire."],
  link: { label: "Tous les services", href: "/services" },
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
  /** Real screenshot under /public/assets/projects/. The layout
   *  re-composes around it when one exists. */
  image?: string;
  /** "delivered" is the ONLY value that presents the entry as
   *  commissioned work. */
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

export const projects: Project[] = [
  {
    slug: "mistral-pizza",
    index: "01",
    name: "Mistral Pizza",
    category: "Restauration",
    services: ["Direction artistique", "Web design", "Développement"],
    year: "—",
    status: "upcoming",
    body: "Une expérience digitale pensée pour donner envie avant même la première bouchée.",
  },
  {
    slug: "nali-restaurant-lounge",
    index: "02",
    name: "Nali Restaurant & Lounge",
    category: "Restauration · Lounge",
    services: ["Direction créative", "Exploration visuelle"],
    year: "—",
    status: "creative",
    body: "Une exploration autour d'un lieu qui mêle table et lounge. Ambiance, rythme, hiérarchie — le vocabulaire avant le site.",
  },
];

export const projectStatusLabel: Record<Project["status"], string> = {
  delivered: "Projet livré",
  creative: "Direction créative",
  upcoming: "En préparation",
};

export const projectsHome = {
  eyebrow: "Réalisations",
  title: ["Quelques projets.", "Beaucoup d'intention."],
  link: { label: "Voir les réalisations", href: "/realisations" },
};

/* ------------------------------------------------------------------ */
/* Studio                                                              */
/* ------------------------------------------------------------------ */

/**
 * FIGURES ARE VERIFIABLE ONLY.
 *
 * A "15+ projets" style counter was requested and is deliberately absent:
 * this repository contains two entries, one still in preparation and one
 * that is a creative direction rather than commissioned work. Printing a
 * project count the work cannot back is the single easiest claim for a
 * prospect to catch, and it would undermine every other sentence here.
 *
 * What is left is true and, as differentiators go, stronger: the studio is
 * independent, nothing is templated, and there is exactly one person
 * between the brief and the code.
 */
export const studio = {
  eyebrow: "Studio",
  title: ["On donne une direction", "aux idées qui cherchent", "encore leur forme."],
  body: [
    "ASTRA est un studio digital indépendant.",
    "Nous mêlons direction artistique, design et développement pour créer des expériences cohérentes, singulières et utiles.",
  ],
  figures: [
    { value: "01", label: "Studio indépendant" },
    { value: "100%", label: "Sur mesure" },
    { value: "01", label: "Interlocuteur, du brief au code" },
  ],
  link: { label: "À propos du studio", href: "/a-propos" },
};

export const about = {
  eyebrow: "À propos",
  title: ["Une idée n'a pas", "besoin d'être grande", "pour aller loin."],
  lead: "ASTRA est un studio digital indépendant. Nous mêlons direction artistique, design et développement pour créer des expériences cohérentes, singulières et utiles.",
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
      pitch: "Un site vitrine clair, rapide, dessiné sur mesure.",
      includes: ["Jusqu'à 5 pages", "Design sur mesure", "Responsive complet", "SEO technique"],
    },
    {
      index: "02",
      name: "Signature",
      from: "1 190 €",
      pitch: "Une direction artistique tenue, du mouvement, une vraie présence.",
      includes: ["Direction artistique dédiée", "Motion et micro-interactions", "Pages sur mesure", "SEO technique complet"],
    },
    {
      index: "03",
      name: "Sur mesure",
      from: "Sur devis",
      pitch: "E-commerce, outil métier, intégration particulière.",
      includes: ["Développement spécifique", "Interactions avancées", "Intégrations", "Accompagnement"],
    },
  ] as Offer[],
  custom: {
    title: "Un projet qui ne rentre dans aucune case ?",
    body: "Décrivez-le. Nous vous dirons franchement si nous sommes les bons interlocuteurs.",
    cta: { label: "Parlons-en", href: "/contact" },
  },
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  eyebrow: "Contact",
  title: ["Votre prochaine idée", "mérite de décoller."],
  lead: "Décrivez-nous votre projet. Nous reviendrons vers vous avec une première direction.",
  projectTypes: ["Site vitrine", "Site sur mesure", "E-commerce", "Refonte", "Identité visuelle", "Autre"],
  budgetLabel: "Votre budget",
  budgets: [
    "Moins de 700 €",
    "700 € – 1 200 €",
    "1 200 € – 1 800 €",
    "Plus de 1 800 €",
    "Je ne sais pas encore",
  ],
  submit: "Démarrer le projet",
};

/* Closing block, used at the foot of every page except /contact. */
export const call = {
  title: ["Votre prochaine idée", "mérite de décoller."],
  lead: "Décrivez-nous votre projet. Nous reviendrons vers vous avec une première direction.",
  cta: { label: "Démarrer le projet", href: "/contact" },
};

/* ------------------------------------------------------------------ */
/* Company details — ALL PENDING                                       */
/* ------------------------------------------------------------------ */

export const company = {
  name: "ASTRA Studio",
  tagline: "Un studio digital qui transforme les idées en expériences web.",
  /** TODO */ email: null as string | null,
  /** TODO */ phone: null as string | null,
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
      links: services.map((s) => ({ label: s.title, href: `/services#${s.slug}` })),
    },
    {
      title: "Informations",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-confidentialite" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} ASTRA Studio`,
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
          "Formulaire de contact : nom, adresse e-mail, type de projet, budget envisagé et message.",
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
          "Service d'acheminement des e-mails : Web3Forms.",
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
        body: ["Adresse pour toute question relative aux traceurs : à renseigner."],
      },
    ] as LegalSection[],
  },
};

/* ------------------------------------------------------------------ */
/* What is still missing                                               */
/* ------------------------------------------------------------------ */

export const pending = [
  "company.email / phone — le footer et les mentions légales affichent « à renseigner »",
  "company.address, legalForm, siret, vat, director, host",
  "company.socials[].href",
  "projects[].image — aucun visuel de projet dans le dépôt ; la mise en page se recompose dès qu'un fichier existe",
  "projects[].year / status — passer à « delivered » à la livraison",
  "projects[].study — étude de cas pour /realisations/[slug]",
  "Un visuel spatial éditorial pour /a-propos : les rendus 3D actuels sont des illustrations cartoon, pas de la photographie",
  "legal.* — compléter chaque « à renseigner »",
];
