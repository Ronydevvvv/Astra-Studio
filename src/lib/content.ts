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
 * Just the section's own copy — the entries themselves are the real
 * `projects` array below (TrustBar renders it directly), so a project's
 * name, image, category and status can never drift between the home page
 * teaser and /realisations.
 */
export const trust = {
  eyebrow: "Projets & expérimentations",
  lead: "Des univers auxquels nous aimons donner vie.",
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
  /** Why the studio exists at all — the question §13-14 of the brief keeps
   * asking for, distinct from `vision` (what a site should do) and from
   * `blocks` (how a project runs). Real reasoning, not a slogan: templates
   * and generic themes already solve "a website" — the only reason to hire
   * a studio instead is when the site has to fit one specific activity
   * closely enough that a template would show its seams. */
  why: {
    eyebrow: "Pourquoi ASTRA",
    body: "Un thème du marché peut habiller n'importe quelle activité — c'est justement sa limite. ASTRA existe pour les projets où ça ne suffit plus : quand le site doit épouser un métier précis plutôt que l'inverse. C'est pour ça que chaque projet est repris depuis la maquette, jamais depuis un modèle : le sur-mesure n'est pas un argument commercial, c'est la seule méthode qui tient quand le gabarit générique ne colle plus.",
  },
  vision: {
    eyebrow: "Notre vision",
    body: "Un site ne doit pas seulement être beau. Direction artistique et développement ne sont pas deux métiers séparés qui se transmettent un fichier : ils avancent ensemble, du premier croquis à la dernière ligne de code — c'est ce qui évite qu'une idée forte s'use en traversant l'équipe.",
  },
  portfolioLink: {
    eyebrow: "Nos réalisations",
    title: "Voir le travail plutôt que la promesse.",
    cta: { label: "Découvrir les réalisations", href: "/realisations" },
  },
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
  status: "delivered" | "built" | "creative" | "upcoming";
  /**
   * A single accent used only for the case-study hero's ambient glow —
   * never a full re-theme of ASTRA's own violet system. Set only when the
   * project's own `study.direction` text already names a real palette, so
   * the accent is a visualisation of a documented fact, not a decoration
   * invented for variety. Omitted (falls back to violet) when no palette is
   * on record — see Mister Dalle, whose direction text names "noir, violet"
   * anyway.
   */
  accent?: string;
  study?: {
    context: string;
    objective: string;
    direction: string;
    build: string;
    outcome: string;
    /** Each image carries its own alt — a generic "visuel du projet"
     * repeated across every gallery photo tells a screen-reader user
     * nothing that distinguishes one from the next. */
    gallery?: { src: string; alt: string }[];
    /** A real mobile capture, shown next to the desktop hero — proof the
     * responsive work actually happened, not a claim about it. */
    mobileImage?: string;
    /** A real demo clip. Muted/looped, never autoplaying at full weight —
     * see the <video> markup in [slug]/page.tsx. */
    video?: string;
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
    slug: "mister-dalle",
    index: "01",
    name: "Mister Dalle",
    category: "E-commerce · Shopify",
    services: ["Direction artistique", "Développement Shopify", "Performance"],
    year: "—",
    status: "delivered",
    image: "/assets/projects/mister-dalle/hero-lifestyle.webp",
    body: "Une boutique Shopify reprise et refondue : thème sur mesure, structure repensée et parcours d'achat resserré.",
    study: {
      context:
        "Mister Dalle vend des dalles et pavés personnalisables en ligne. Le thème Shopify existant ne mettait pas en valeur ce qui rend le produit spécial : la possibilité de le configurer avant achat.",
      objective:
        "Reprendre le thème pour resserrer le parcours d'achat et donner au configurateur de produit la place centrale qu'il méritait.",
      direction:
        "Identité de marque conservée (noir, violet), mise en page resserrée autour de la fiche produit et du configurateur plutôt que diluée dans des sections génériques.",
      build:
        "Développement sur un thème Shopify Liquid sur mesure, incluant une section de simulateur de personnalisation produit et une section FAQ dédiée.",
      outcome:
        "Boutique en ligne, thème sur mesure livré et déployé.",
      gallery: [
        { src: "/assets/projects/mister-dalle/logo.webp", alt: "Logo Mister Dalle" },
      ],
    },
  },
  {
    slug: "mistral-pizza",
    index: "02",
    name: "Mistral Pizza",
    category: "Restauration · Projet conceptuel",
    services: ["Direction artistique", "Web design", "Développement"],
    year: "—",
    status: "creative",
    /** Documented below in study.direction: "feu, pierre, bois". */
    accent: "rgba(217,119,6,0.16)",
    image: "/assets/projects/mistral-pizza/hero-four.jpg",
    body: "Un concept ASTRA pour une pizzeria au feu de bois : donner envie avant même la première bouchée, sans commande client à l'origine.",
    study: {
      context:
        "Une pizzeria au feu de bois n'a presque jamais besoin d'un site — le bouche-à-oreille suffit. C'est justement ce qui en fait un bon terrain d'exploration : montrer qu'un site peut donner faim aussi efficacement qu'une vitrine, sans fiche technique (menu, horaires, adresse) en premier plan.",
      objective:
        "Concevoir, à titre d'exercice de studio, un site vitrine multi-pages complet — accueil, carte, galerie, réservation, à propos, contact — pour une pizzeria imaginée par ASTRA.",
      direction:
        "L'ambiance italienne classique (feu, pierre, bois) a été choisie parce qu'elle porte à elle seule tout l'argument commercial : personne n'a besoin d'un texte pour comprendre ce qu'une flamme dans un four en dit sur la cuisson. Photographie brute en ouverture, typographie éditoriale, une structure numérotée (le feu, la pâte, le temps) qui raconte la méthode avant de vendre le produit.",
      build:
        "Site multi-pages en HTML/CSS/JS, avec sitemap et robots.txt dédiés et une page de réservation fonctionnelle — construit avec le même soin technique qu'un projet client, précisément pour servir de démonstration.",
      outcome:
        "Concept abouti, non publié et sans client réel à ce jour : c'est une pièce de portfolio, pas une commande.",
      gallery: [
        { src: "/assets/projects/mistral-pizza/pizza-table.jpg", alt: "Pizzas dressées sur une table en bois, concept Mistral Pizza" },
        { src: "/assets/projects/mistral-pizza/margherita.jpg", alt: "Gros plan sur une pizza margherita cuite au feu de bois" },
        { src: "/assets/projects/mistral-pizza/pizza-charcuterie-four.jpg", alt: "Pizza à la charcuterie devant le four à bois" },
      ],
      video: "/assets/projects/mistral-pizza/mistral-four.mp4",
    },
  },
  {
    slug: "terralec-btp",
    index: "03",
    name: "Terralec B.T.P",
    category: "BTP · Travaux publics",
    services: ["Direction artistique", "Développement Next.js", "Responsive"],
    year: "—",
    status: "built",
    /** Documented below in study.direction: "Palette encre / pierre / orange". */
    accent: "rgba(234,88,12,0.14)",
    image: "/assets/projects/terralec/hero-desktop.png",
    body: "Un site vitrine complet pour une entreprise de travaux publics et réseaux (Enedis, GRDF, Orange), avec une scène 3D interactive et une direction artistique dédiée.",
    study: {
      context:
        "TERRALEC B.T.P est une entreprise de travaux publics et réseaux (électricité Enedis, gaz GRDF, télécom Orange, éclairage public) basée en Moselle. Le site devait présenter clairement six métiers techniques à des donneurs d'ordre exigeants.",
      objective:
        "Construire un site vitrine complet et multilingue, capable de présenter l'entreprise, ses équipes et ses chantiers, et de recevoir de vraies demandes de devis qualifiées par métier.",
      direction:
        "Palette encre / pierre / orange, typographies Inter Tight et Inter. Une structure éditoriale sobre laisse respirer les photos de chantier réelles ; une scène 3D interactive (coupe de tranchée réseaux) illustre le métier dès la page d'accueil.",
      build:
        "Développé avec Next.js et React (TypeScript), animations au scroll avec GSAP, défilement fluide avec Lenis, interactions de menu avec Framer Motion, scène 3D avec React Three Fiber. Site multilingue, formulaire de demande de devis avec validation.",
      outcome:
        "Le site est fonctionnellement terminé. Il n'est pas encore publié : la configuration de la messagerie de devis et la finalisation des mentions légales restent à faire avant la mise en ligne.",
      gallery: [
        { src: "/assets/projects/terralec/services-grid.png", alt: "Grille des services Terralec B.T.P sur le site" },
        { src: "/assets/projects/terralec/int-desktop.png", alt: "Page intérieure du site Terralec B.T.P en version desktop" },
        { src: "/assets/projects/terralec/equipe-chantier.jpg", alt: "Équipe Terralec B.T.P sur un chantier" },
      ],
      mobileImage: "/assets/projects/terralec/int-mobile.png",
    },
  },
];

export const projectStatusLabel: Record<Project["status"], string> = {
  delivered: "Projet livré",
  built: "Projet réalisé",
  creative: "Direction créative",
  upcoming: "En préparation",
};

export const projectsHome = {
  eyebrow: "Réalisations",
  title: ["Le travail,", "pas la promesse."],
  link: { label: "Voir nos réalisations", href: "/realisations" },
};

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type Offer = {
  index: string;
  name: string;
  from: string;
  /** Who it's for — one line, answers "is this me?" before the price does. */
  audience: string;
  pitch: string;
  includes: string[];
  recommended?: boolean;
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
      from: "450 €",
      audience: "Vous démarrez ou refaites une présence web simple.",
      pitch:
        "Un site vitrine propre et rapide, qui présente clairement votre activité et donne envie de vous contacter.",
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
      from: "850 €",
      audience: "Votre marque a besoin d'une vraie identité en ligne.",
      pitch:
        "Une direction artistique pensée pour vous, des animations soignées et une expérience qui donne au site une vraie personnalité.",
      includes: [
        "Direction artistique dédiée",
        "Animations et micro-interactions",
        "Pages sur mesure",
        "SEO technique complet",
      ],
      recommended: true,
    },
    {
      index: "03",
      name: "Expérience",
      from: "1 100 €",
      audience: "Votre projet demande plus de technique et d'ambition.",
      pitch:
        "Du développement sur mesure, des interactions avancées et une expérience utilisateur pensée dans le détail.",
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
/* Pricing — FAQ                                                       */
/* ------------------------------------------------------------------ */

/**
 * Answers only what the site can already back up elsewhere (the four-step
 * process, the three tiers, the contact form) — no delivery-time promise,
 * since none is fixed, and no claim about post-launch support beyond what
 * `services` already states.
 */
export const pricingFaq = {
  eyebrow: "Questions fréquentes",
  title: "Avant de nous écrire.",
  items: [
    {
      q: "Combien coûte un site avec ASTRA ?",
      a: "Les tarifs affichés sont des points de départ : 450 € pour un site vitrine simple, 850 € pour une direction artistique dédiée avec animations, 1 100 € pour un projet plus technique. Le prix exact dépend du nombre de pages et des fonctionnalités — il est confirmé après un échange, jamais deviné à l'avance.",
    },
    {
      q: "Combien de temps prend un projet ?",
      a: "Cela dépend directement de sa taille et de sa complexité. Nous ne donnons pas de délai standard avant d'avoir vu le projet : un site vitrine de 5 pages et un site avec développement sur mesure ne se planifient pas de la même façon.",
    },
    {
      q: "Comment se déroule un projet ?",
      a: "Quatre étapes : on creuse votre activité et vos objectifs (découverte), vous validez le site avant qu'il existe (conception), l'intégration est testée sur tous les écrans (développement), puis vient le déploiement.",
    },
    {
      q: "Puis-je demander des modifications après la mise en ligne ?",
      a: "Oui — c'est le rôle de l'accompagnement : mises à jour, corrections et évolutions restent possibles une fois le site en ligne.",
    },
    {
      q: "Le site sera-t-il optimisé pour mobile ?",
      a: "Oui, systématiquement. Chaque largeur d'écran est composée séparément et vérifiée, pas simplement redimensionnée depuis le desktop.",
    },
    {
      q: "Faites-vous du référencement (SEO) ?",
      a: "Oui, en base technique : structure du code, métadonnées et données structurées font partie du développement, pas d'un plugin ajouté après coup. Nous ne garantissons pas de position sur Google — personne ne le peut honnêtement.",
    },
  ],
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
  primary: { label: "Démarrer un projet", href: "/contact" },
  secondary: { label: "Voir nos réalisations", href: "/realisations" },
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
  email: "Ronydevvvv@gmail.com" as string | null,
  phone: "06 52 80 67 94" as string | null,
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

/**
 * The footer's own closing line — deliberately NOT `cta.title`. Most pages
 * already end on the CTA section right above the footer; repeating the same
 * headline twice in a row read as a stutter rather than emphasis.
 */
export const footerCta = {
  title: ["On en discute", "quand vous voulez."],
  cta: { label: "Écrire à ASTRA", href: "/contact" },
};

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
  "projects[].image / year / status — passer à « delivered » à la livraison",
  "projects[].study — étude de cas pour /realisations/[slug]",
  "legal.* — compléter chaque « à renseigner »",
];
