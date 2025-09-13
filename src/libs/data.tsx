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
  pinterest: "https://pinterest.com",
  ios_logo: "https://apple.com/ios",
  whatsapp: "https://whatsapp.com",
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
export { projets, categories, socialLinks, experience };
