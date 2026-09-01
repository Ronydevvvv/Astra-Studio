# ASTRA Studio

Site d'agence multi-pages. Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.

**SPACE × DESIGN × TECHNOLOGY**

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
```

> **`Cannot find module './xxx.js'` au démarrage ?**
> Le dossier `.next` mélange les artefacts de `dev` et de `build`. Passer de l'un à l'autre — ou interrompre un build — laisse un manifeste qui pointe vers des fichiers absents.
>
> ```bash
> npm run clean && npm run dev
> ```

---

## Pages

| Route | Rôle |
|---|---|
| `/` | Vitrine — hero, confiance, aperçu services, index réalisations, process, positionnement, CTA |
| `/services` | Six services développés, un par double page alternée |
| `/realisations` | Galerie des projets |
| `/realisations/[slug]` | Étude de cas — prérendue pour chaque projet de `content.ts` |
| `/tarifs` | Trois offres en lignes éditoriales + section sur mesure |
| `/a-propos` | Approche, vision, méthode |
| `/contact` | Formulaire validé + coordonnées |
| `/mentions-legales` · `/politique-confidentialite` · `/cookies` | Modèles juridiques, `noindex` |

La homepage ne contient pas le détail du site : chaque bloc est une porte vers sa page.

---

## Aucune donnée inventée

Le site n'affiche **aucun client, logo, avis, chiffre ou projet fabriqué**. Ce qui manque est visible plutôt que comblé :

- la bande de confiance annonce qu'elle attend de vraies références ;
- les réalisations décrivent des **types de missions**, sans nom de client ni année ni capture ;
- les montants affichent un filet pointillé « montant à définir » ;
- l'e-mail, le téléphone, l'adresse et les mentions légales affichent **« à renseigner »** en violet.

Un placeholder qu'on peut confondre avec une vraie donnée est pire qu'un vide : personne ne le remarque avant la mise en ligne.

La liste complète de ce qui reste à fournir est dans l'export `pending` de [content.ts](src/lib/content.ts).

### Publier une vraie réalisation

Déposez la capture dans `public/assets/projects/`, puis :

```ts
// src/lib/content.ts
{
  slug: "mistral-pizza",
  index: "01",
  name: "Mistral Pizza",
  category: "Restauration",
  services: ["Direction artistique", "Développement", "SEO local"],
  year: "2026",
  body: "…",
  image: "/assets/projects/mistral-pizza.webp",
  study: { objective: "…", direction: "…", approach: "…", outcome: "…" },
}
```

**La mise en page se recompose autour de l'image.** Sans `image`, l'entrée est menée par le texte et la colonne visuelle reste une zone marquée par deux filets. Avec `image`, la capture devient le sujet, prend la plus grande moitié, gagne une parallaxe et un survol qui décale le titre. La page `/realisations/mistral-pizza` est générée et prérendue automatiquement ; sans `study`, elle affiche ce qu'elle a réellement.

---

## Architecture

```
src/
├─ app/
│  ├─ layout.tsx                  navbar, footer, îlots clients, transition de page
│  ├─ page.tsx                    accueil
│  ├─ services|realisations|tarifs|a-propos|contact/
│  ├─ realisations/[slug]/        étude de cas prérendue
│  ├─ mentions-legales|politique-confidentialite|cookies/
│  └─ globals.css                 tokens, keyframes, grain, utilitaires
├─ components/
│  ├─ layout/    Navbar · Footer · Logo
│  ├─ sections/  Hero · TrustBar · ServicesGrid · ServicesDetail
│  │             ProjectsPreview · ProjectsList · Process · Manifesto
│  │             Approach · Pricing · CTA · LegalBody
│  ├─ forms/     ContactForm
│  └─ ui/        Button · ArrowLink · Icon · PageHero · SectionHeading
│                Starfield · ScrollProgress · MouseParallax · RevealController
└─ lib/
   ├─ content.ts   100 % du contenu éditorial
   └─ seo.ts       title, description, canonical, OG, Twitter
```

Toutes les sections sont des **Server Components**. Quatre petits îlots clients seulement (`Navbar`, `ScrollProgress`, `RevealController`, `MouseParallax`, plus `ContactForm` sur une page) : **112 kB de JS** au premier chargement, 103 kB partagés.

Il n'y a **pas de curseur personnalisé**.

### Quatre choix qui structurent le reste

**Un seul observer pour toute la page.** Les sections restent des Server Components et portent `data-reveal` ; `RevealController` les observe depuis un unique `IntersectionObserver`. L'état masqué n'est appliqué que sous `html.js` — si le JS échoue, le contenu reste lisible.

**Le mouvement passe par le CSS.** Aucune librairie d'animation. La parallaxe publie la position du pointeur en variables CSS (`--px` / `--py`) et chaque calque choisit sa profondeur par un `calc()`. La transition de page est une animation de 0,5 s sur le landmark `<main>`. Tout est neutralisé sous `prefers-reduced-motion`.

**Le grain est global.** Appliqué à une seule section, un grain à 3 % relève son noir d'une quantité mesurable et la différence se voit comme une marche à la frontière. Il vit sur `body::after` en `position: fixed`.

**Les icônes sont dessinées à la main.** Six glyphes outline, 24px, stroke 1.4, ~1 kB au total. Une librairie aurait embarqué des centaines d'icônes dans une autre graisse pour en utiliser six.

---

## Direction artistique

Couleurs prélevées dans les PNG fournis, pour que les visuels 3D se fondent dans la page.

| Token | Valeur | Usage |
|---|---|---|
| `--color-void` | `#04050f` | fond de page |
| `--color-ink` / `--color-panel` | `#070a1a` / `#0a0d20` | bandes et panneaux |
| `--color-violet-500` | `#7c3af5` | accent signature |
| `--color-violet-700` | `#500fd9` | halos, profondeur |
| `--color-chalk` / `--color-mist` | `#eceaf7` / `#a9a6c4` | texte principal / secondaire |

Typographies : **Inter Tight** (titres) et **Inter** (textes), auto-hébergées via `next/font`.

### Où vivent les astronautes

Quatre emplacements, pas un de plus : **hero** (grand astronaute), **process** (les quatre personnages), **à propos** (astronaute à l'ampoule), **CTA** (scène spatiale). Partout ailleurs l'identité tient à la typographie, aux filets, au rythme et au violet — un personnage 3D par section ferait du site une galerie d'illustrations.

---

## Assets

```bash
node scripts/key-hero.mjs        # détoure le hero
node scripts/repair-assets.mjs   # nettoie les personnages
node scripts/optimize-assets.mjs # design/masters/*.png → public/assets/*.webp
```

Les trois écrivent dans `public/assets/`. **`optimize-assets.mjs` exclut `hero-astronaut.png`** : le convertir écraserait le détourage par l'original rectangulaire.

Total livré : **655 Ko** depuis 7,4 Mo de masters.

### Le hero est détouré, pas masqué

Le PNG fourni est un rectangle avec **son propre ciel noir cuit dedans**. Posé sur la page il se lit toujours comme une image collée, et un masque radial n'y change rien — il remplace un bord net par un bord flou. `key-hero.mjs` retire ce ciel :

1. **Alpha par luminance.** Le fond mesure ~(1,1,3), plus sombre que la page (`#04050f`). Un `smoothstep` rend le noir transparent et garde le sujet.
2. **Remplissage par diffusion depuis les bords.** L'étape 1 seule perce des trous *à travers* le sujet : la visière et l'écran du laptop sont aussi sombres que le ciel. Seules les zones sombres atteignables depuis le bord sont du ciel.
3. **Plancher d'alpha à 14.** En dessous, l'alpha est invisible mais laisse une brume rectangulaire — le fantôme du cadrage — et coûte un tiers du poids.

Résultat : le champ d'étoiles **de la page** passe derrière l'astronaute. Aucun `mask-image`, aucun halo, aucun anneau CSS.

### Les personnages sont réparés par composantes connexes

`repair-assets.mjs` corrige deux défauts mesurés :

- **`process-04-launch`** portait un fragment de 303 px du personnage 03 (son laptop) au bord gauche. Les quatre figures se chevauchent horizontalement dans la bande source : aucune recoupe verticale ne pouvait les séparer.
- **`idea-astronaut`** gardait des éclats détachés en bas de cadre.

Le critère de tri est la **proximité**, pas la taille : les rayons de l'ampoule sont de vraies composantes détachées à quelques dizaines de pixels du sujet, tandis que le fragment parasite en était à ~140 px. Une première version fondée sur la taille avait supprimé les rayons.

---

## Vérification

```bash
npm run smoke                 # les 10 routes répondent-elles et rendent-elles un h1 ?
npm run shoot http://localhost:3001   # audit visuel complet
```

Le smoke test est la vérification rapide après un changement de structure ; `shoot` est l'audit complet :

Charge **les 10 routes** à 1920 / 1440 / 1280 / 1024 / 768 / 480 / 390 / 375 px, force toutes les apparitions au scroll, puis rapporte par combinaison : débordement horizontal, erreurs console, requêtes échouées, images cassées.

Dernier passage : **80 combinaisons route × largeur, toutes propres.**

---

## Accessibilité

Navigation clavier complète, lien d'évitement vers le landmark `<main>`, `aria-current="page"` sur l'onglet actif, `Escape` ferme le menu mobile (avec verrou de scroll et focus déplacé), focus visible, visuels décoratifs en `alt=""`, personnages décrits.

Le formulaire de contact : `<label>` associé à chaque champ, `aria-invalid` et `aria-describedby` sur les champs en erreur, focus déplacé vers le premier problème à la soumission, et re-validation par champ **seulement après une première erreur** — valider à chaque frappe dès le départ revient à crier sur quelqu'un qui tape encore son adresse.
