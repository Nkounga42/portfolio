const categoriesBase = {
  Frontend: [
    "react_native",
    "javascript",
    "typescript",
    "bootstrap",
    "tailwindcss",
    "html",
    "css",
    "expo",
    "radzen_og",
    "chromium",
    "blazor",
  ],
  Backend: ["dotnet", "nodejs", "express_js", "python", "c_sharp"],
  UI_UX: ["figma", "adobe_xd", "lunacy"],
  Base_de_donnees: ["mysql", "firebase", "mongo_db"],
  Design: ["adobe_illustrator", "adobe_photoshop", "adobe_premiere_pro"],
  DevOps: ["google_colab", "git", "codepen"],
  Social: [
    "x",
    "facebook",
    "instagram",
    "linkedin_circled",
    "pinterest",
    "whatsapp",
    "behance",
  ],
};

const categories = {
  All: [
    ...categoriesBase.Frontend,
    ...categoriesBase.Backend,
    ...categoriesBase.UI_UX,
    ...categoriesBase.Base_de_donnees,
    ...categoriesBase.Design,
    ...categoriesBase.DevOps,
    // ...categoriesBase.Social,
  ],
  ...categoriesBase,
};

const socialLinks: Record<string, string> = {
  x: "https://x.com",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  linkedin_circled: "https://linkedin.com",
  pinterest: "https://pin.it/4UWl5mfpk",
  // ios_logo: "https://apple.com/ios",
  whatsapp: "+242064493007",
  behance: "https://behance.net",
};


const projets = [
  {
    id: 1,
    nom: "ColorVerse",
    description: ` ColorVerse est une application web interactive pour la création et l'édition d'images.`,
    readme: `# ColorVerse  

ColorVerse est une application web interactive pour la création et l'édition d'images. Elle offre une interface utilisateur intuitive avec des outils de dessin avancés basés sur Fabric.js.



![ColorVerse Interface](https://github.com/Nkounga42/colorize/blob/main/colorize%20screen%20shot.png)

## Fonctionnalités

- Outils de dessin variés (crayon, formes géométriques, texte)
- Importation et manipulation d'images
- Gestion des calques
- Personnalisation des propriétés visuelles (couleur, taille, rotation, etc.)
- Interface réactive et moderne

## Structure du Projet

Le projet est organisé comme suit dans le dossier \`src\`:

- \`components/\`: Contient les composants réutilisables de l'interface utilisateur
  - \`ImageDropZone.tsx\`: Zone de dépôt pour l'importation d'images
  - \`SecondaryToolbar.tsx\`: Barre d'outils secondaire pour les ajustements fins
- \`fabric/\`: Contient les fichiers liés à l'intégration de Fabric.js
  - \`canvasActions.tsx\`: Définit les actions et outils disponibles sur le canvas
- \`pages/\`: Contient les pages principales de l'application
  - \`drawing.tsx\`: Page principale de dessin et d'édition

## Technologies Utilisées

- React
- TypeScript
- Fabric.js
- Tailwind CSS (présumé basé sur les classes utilisées)

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec \`npm install\`
3. Lancez l'application en mode développement avec \`npm run dev\`

## Utilisation

1. Ouvrez l'application dans votre navigateur
2. Utilisez les outils de la barre latérale pour dessiner ou ajouter des formes
3. Importez des images en les faisant glisser dans la zone de dépôt
4. Ajustez les propriétés des objets sélectionnés avec la barre d'outils secondaire

## Image Description Metadata

This project includes an interactive canvas where users can create and manipulate images. The main visual elements include:

- A drawing canvas powered by Fabric.js
- Toolbars for selecting drawing tools and adjusting object properties
- An image drop zone for importing external images into the canvas

These elements combine to provide a rich user experience for image creation and editing.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT Lisence`,
    badge: ["https://img.shields.io/badge/React-18.0.0-blue?logo=react&logoColor=white",
      "https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Fabric.js-Canvas-orange",
      "https://img.shields.io/badge/TailwindCSS-3.0-06B6D4?logo=tailwindcss&logoColor=white",
      "https://img.shields.io/badge/License-MIT-green"],
    slug: "colorverse",
    Roles: "UI/UX & Front-end Developement ",
    cathegorie: "Web App",
    technologies: ["React", "TypeScript", "Fabric.js", "Tailwind CSS"],
    Client: "",
    dateCreation: "2025-07-04",
    links: {
      repository: "https://github.com/Nkounga42/colorize/",
      page: "https://nkounga42.github.io/colorize/",
    },
    imagesIllustration: [
      "https://raw.githubusercontent.com/Nkounga42/colorize/main/colorize%20screen%20shot.png",
    ],
  }
];
const experience = [
  {
    date: "2025 ",
    illustraction: "",
    title: "Stage a Wilkaî",
    content: `The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh
    personal computer. It played a pivotal role in establishing desktop publishing as a general
    office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed
    in a beige case with integrated carrying handle; it came with a keyboard and single-button mouse.`,
    position: "start",
  },
  {
    date: "2025",
    illustraction: "",
    title: "Développeur Backend – Projet Universitaire ESCIC",
    content: `ESCIC – École Supérieure de Commerce et d’Industrie du Congo
Janvier 2025 – Aujourd’hui 
Développement du backend complet d’une marketplace dans le cadre d’un projet académique. Mise en place d’une architecture RESTful, Implémentation de l’authentification, gestion des rôles utilisateurs, Intégration de Nodemailer pour les notifications par email
`,
    position: "end",
  },
  {
    date: "2024",
    illustraction: "",
    title: "Consulting Informatique (Brazzaville)",
    content: `Participation à la conception et au développement de sites web dynamiques en collaboration avec une équipe de développeurs pour optimiser l’expérience utilisateur et améliorer les performances des sites. `,
    position: "start",
  },
  {
    date: "2023",
    illustraction: "",
    title: "BAC D - CL Pointe-Noire ",
    content: `Passage en classe de Terminale D après des résultats solides en Première. Participation à des ateliers de préparation
  au baccalauréat, exposés scientifiques et concours interscolaires de mathématiques.`,
    position: "end",
  },
];
const img = [
  "https://i.pinimg.com/736x/65/87/fd/6587fd3d1f09d3085e0406b9598607c1.jpg",
  "https://i.pinimg.com/736x/dd/2e/92/dd2e920f1a2c92eb33a2ac7771ef8cda.jpg",
  "https://i.pinimg.com/736x/cc/b0/46/ccb0462defcf1fb788e4c151086ad0bf.jpg",
  "https://i.pinimg.com/1200x/df/88/1e/df881e66fd0ce73825986ff814d89818.jpg",
  "https://i.pinimg.com/1200x/08/ca/d1/08cad18c548840e34d94ddbab0898c48.jpg",
  "https://i.pinimg.com/736x/c0/9f/62/c09f62cefe85f72e1c1d6bcef022e030.jpg",
  "https://i.pinimg.com/736x/65/87/fd/6587fd3d1f09d3085e0406b9598607c1.jpg",
  "https://i.pinimg.com/736x/c9/d3/c9/c9d3c9f18882fd9e681ddf78580238ef.jpg",
  "https://i.pinimg.com/1200x/a7/a3/c6/a7a3c634f91dc85df4443473b6991fe0.jpg",
  "https://i.pinimg.com/736x/3a/61/19/3a6119b6894b8d08330285e155af78af.jpg",
  "https://i.pinimg.com/1200x/67/89/02/6789021f3fbc4a94dd661ed5d79fe6ef.jpg",
  "https://i.pinimg.com/736x/d8/a9/54/d8a9543ebe5810d498f9616521d16328.jpg",
  "https://i.pinimg.com/1200x/0f/8d/ad/0f8dad72e95ac171ec19fa8d6006dcd8.jpg",
  "https://i.pinimg.com/736x/30/5b/6f/305b6f57145b4c65fb6fa47785e9dd6e.jpg",
  "https://i.pinimg.com/736x/3c/af/df/3cafdf92a15ef8724674461cf0d4fa2f.jpg",
  "https://i.pinimg.com/736x/f5/d6/ee/f5d6ee9cb6f3067dea33f6f3f201dcdb.jpg",
  "https://i.pinimg.com/736x/6f/03/a1/6f03a12910c282821f628ecddd75a9f8.jpg",
  "https://i.pinimg.com/736x/ec/78/ca/ec78ca735cfe8904d6a456c7fd9d7e47.jpg",
  "https://i.pinimg.com/736x/72/d7/e8/72d7e8dc9f87cee12f9c84625528084d.jpg",
  "https://i.pinimg.com/736x/30/88/4b/30884b941f00d4ce0c30e8f913c13b21.jpg",
  "https://i.pinimg.com/736x/91/64/19/9164191c5aee685530d57daea7c0f326.jpg"
]

export { img }