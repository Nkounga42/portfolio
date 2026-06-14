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
  x: "https://x.com/Mr_Nkounga",
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
    readme: ``,
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
  },
  {
    id: 2,
    nom: "WidgetHora",
    description: "WidgetHora est un widget d'horloge personnalisable pour Windows, développé en Python avec PyQt5.",
    readme: `# 🕒 WidgetHora

**WidgetHora** est un widget d'horloge personnalisable pour **Windows**, développé en **Python** avec **PyQt5**.  
Il s'affiche discrètement sur le bureau, offre de nombreuses options de personnalisation (polices, couleurs, formats), et peut démarrer automatiquement avec Windows.

Ce projet a pour but de proposer une horloge **élégante**, **moderne**, **légère** et **fonctionnelle** pour améliorer l'environnement de travail quotidien.

---

## ✨ Fonctionnalités

- 🕰️ **Affichage de l'heure et de la date** dans plusieurs formats (24h, 12h AM/PM, personnalisés)
- 🎨 **Personnalisation avancée** : police, taille, couleur, espacement, visibilité heure/date
- 🌙 **Mode sombre automatique** selon le thème Windows
- 🖱️ **Déplacement du widget** sur le bureau (drag & drop)
- ⚙️ **Démarrage automatique avec Windows** (création/suppression d'un raccourci \`.bat\`)
- 💾 **Sauvegarde des préférences** avec \`QSettings\`
- 🧩 **Panneau de configuration intuitif**
- ℹ️ **Fenêtre "À propos"** avec lien GitHub

---

## 📸 Aperçu en images

### 1. Horloge sur le bureau  
![Fenêtre À propos](https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005241.png)

### 2. Panneau de paramètres  
![Panneau de configuration](https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005205.png)

### 3. Fenêtre « À propos »  
![Widget principal](https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005153.png)

---

## ⚙️ Installation

### ✅ Prérequis

- **Python 3.7+**
- **Windows 10/11**
- Modules requis :
  - \`PyQt5\`
  - \`pywin32\`

### 📦 Installation des dépendances

\`\`\`bash
pip install pyqt5 pywin32
\`\`\`

## 🚀 Utilisation

1. Lancez l'application
2. Configurez l'apparence via le panneau de paramètres
3. Positionnez le widget où vous le souhaitez sur votre bureau
4. Activez le démarrage automatique si désiré

## 🛠️ Technologies Utilisées

- **Python 3.7+**
- **PyQt5** pour l'interface graphique
- **pywin32** pour l'intégration Windows
- **QSettings** pour la persistance des données

## 📝 Licence

MIT License`,
    badge: [
      "https://img.shields.io/badge/Python-3.7+-blue?logo=python&logoColor=white",
      "https://img.shields.io/badge/PyQt5-GUI-green?logo=qt&logoColor=white",
      "https://img.shields.io/badge/Windows-10/11-blue?logo=windows&logoColor=white",
      "https://img.shields.io/badge/License-MIT-green"
    ],
    slug: "widgethora",
    Roles: "Desktop Application Development",
    cathegorie: "Desktop ",
    technologies: ["Python", "PyQt5", "pywin32", "QSettings"],
    Client: "",
    dateCreation: "2025-07-02",
    links: {
      repository: "https://github.com/Nkounga42/PYTHON-PROJECT",
      page: "",
    },
    imagesIllustration: [
      "https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005241.png",
      "https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005205.png",
      "https://raw.githubusercontent.com/Nkounga42/PYTHON-PROJECT/master/Capture%20d'%C3%A9cran%202025-07-02%20005153.png"
    ],
  },
  {
    id: 3,
    nom: "Fency in the Univers",
    description: "Un jeu de vaisseau spatial moderne développé en HTML5/JavaScript avec des graphiques 2D avancés et une physique réaliste.",
    readme: `# 🚀 Fency in Univers

Un jeu de vaisseau spatial moderne développé en HTML5/JavaScript avec des graphiques 2D avancés et une physique réaliste.

## 🎮 Aperçu du Jeu

**Fency in Univers** offre une expérience de combat spatial immersive avec :
- **Contrôles fluides** au clavier et à la souris
- **Système de combat** avec projectiles et ennemis variés
- **Minimap circulaire** pour la navigation
- **Effets visuels** et explosions
- **Système de progression** avec différents types d'ennemis

## 🎯 Fonctionnalités

### ✨ Gameplay
- **Monde ouvert** avec caméra qui suit le vaisseau
- **12 types d'ennemis** différents avec des caractéristiques uniques
- **Système de tir** avec projectiles du joueur et des ennemis
- **Collisions réalistes** et système de dégâts
- **Barre de vie** et système de santé
- **Score** basé sur les ennemis détruits

### 🎮 Contrôles
#### Clavier
- \`Z\` ou \`↑\` - Avancer
- \`Q\` ou \`←\` - Tourner à gauche  
- \`D\` ou \`→\` - Tourner à droite
- \`S\` ou \`↓\` - Freiner
- \`Espace\` - Tirer

#### Souris
- \`M\` - Activer/désactiver le contrôle à la souris
- Déplacer la souris - Orienter le vaisseau
- Clic gauche - Tirer

### 🤖 Ennemis
Le jeu propose 12 types d'ennemis avec des caractéristiques progressives :

| Type | Couleur | Dégâts | Rayon | Vie | Score | Cadence de Tir |
|------|---------|--------|-------|-----|-------|----------------|
| 1 | Rouge | 5 | 15px | 40 | 5 pts | Lente |
| 2 | Bleu | 10 | 20px | 60 | 10 pts | Rapide |
| 3 | Vert | 15 | 25px | 80 | 15 pts | Rapide |
| 4 | Jaune | 20 | 30px | 100 | 20 pts | Rapide |
| 5 | Violet | 30 | 35px | 130 | 30 pts | Très rapide |
| 6 | Corail | 40 | 40px | 150 | 50 pts | Ultra rapide |
| 7 | Orange | 50 | 45px | 200 | 100 pts | Ultra rapide |
| 8 | Rose | 60 | 50px | 250 | 150 pts | Lente |
| 9 | Cyan | 60 | 55px | 300 | 200 pts | Rapide |
| 10 | Lime | 70 | 60px | 350 | 250 pts | Très rapide |
| 11 | Magenta | 86 | 65px | 400 | 300 pts | Ultra rapide |
| 12 | Blanc | 88 | 70px | 500 | 500 pts | Lente |

## 🛠️ Technologies Utilisées

- **HTML5 Canvas** - Rendu graphique 2D
- **JavaScript ES6+** - Logique de jeu et animations
- **CSS3** - Interface utilisateur et styling
- **Programmation orientée objet** - Architecture modulaire

## 📁 Structure du Projet

\`\`\`
fency-in-univers/
├── fency 0.1.1.html          # Version finale du jeu
├── fency 0.1.0.html          # Version précédente
├── fency 0.0.x.html          # Versions de développement
├── Capture d'écran *.png     # Screenshots du jeu
├── Enregistrement *.mp4      # Vidéo de démonstration
└── README.md                 # Ce fichier
\`\`\`

## 🚀 Comment Jouer

1. **Ouvrir le jeu** : Lancez \`fency 0.1.1.html\` dans votre navigateur web
2. **Contrôles** : Utilisez les touches ZQSD ou les flèches directionnelles
3. **Objectif** : Détruisez les ennemis pour gagner des points
4. **Survie** : Évitez les projectiles ennemis et les collisions
5. **Progression** : Affrontez des ennemis de plus en plus puissants

## 🎨 Caractéristiques Techniques

### Physique du Jeu
- **Système de mouvement** avec accélération et décélération
- **Rotation progressive** du vaisseau
- **Détection de collisions** circulaires
- **Système de répulsion** pour éviter les chevauchements

### Graphiques
- **Rendu en temps réel** à 60 FPS
- **Effets de particules** pour les explosions
- **Animations fluides** des sprites
- **Interface utilisateur** responsive

### Intelligence Artificielle
- **IA des ennemis** avec comportement de poursuite
- **Évitement de collisions** entre ennemis
- **Système de tir** intelligent basé sur la distance
- **Spawn aléatoire** des ennemis autour du joueur

## 🔧 Développement

### Versions
- **v0.0.1** - Prototype initial avec vaisseau de base
- **v0.0.5** - Ajout des ennemis et système de combat
- **v0.1.0** - Implémentation de la minimap et améliorations UI
- **v0.1.1** - Version finale avec tous les systèmes optimisés

### Améliorations Futures
- [ ] Système de power-ups
- [ ] Niveaux avec boss
- [ ] Multijoueur local
- [ ] Effets sonores
- [ ] Sauvegarde des scores

## 📊 Statistiques du Projet

- **Lignes de code** : ~1700 lignes JavaScript
- **Types d'ennemis** : 12 variantes
- **Système de contrôle** : Clavier + Souris
- **Compatibilité** : Tous navigateurs modernes

## 🏆 Crédits

Développé avec passion pour créer une expérience de jeu spatial immersive et addictive.

---

*Amusez-vous bien et que la force soit avec vous dans l'espace ! 🌌*`,
    badge: [
      "https://img.shields.io/badge/HTML5-Canvas-orange?logo=html5&logoColor=white",
      "https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=white",
      "https://img.shields.io/badge/CSS3-Styling-blue?logo=css3&logoColor=white",
      "https://img.shields.io/badge/Game-2D%20Space%20Shooter-green",
      "https://img.shields.io/badge/Enemies-12%20Types-red"
    ],
    slug: "fency-in-the-univers",
    Roles: "Game Development & Frontend",
    cathegorie: "Game",
    technologies: ["HTML5", "JS ES6+", "CSS3", "Canvas API", "Game Physics"],
    Client: "",
    dateCreation: "2025-09-13",
    links: {
      repository: "https://github.com/Nkounga42/fency-in-the-univers",
      page: "https://nkounga42.github.io/fency-in-the-univers/",
    },
    imagesIllustration: [
      "https://github.com/Nkounga42/fency-in-the-univers/blob/main/fency%20logo.png?raw=true",
      "https://github.com/Nkounga42/fency-in-the-univers/blob/main/Capture%20d'%C3%A9cran%202025-09-13%20214126.png?raw=true",
      "https://github.com/Nkounga42/fency-in-the-univers/raw/main/Capture%20d'%C3%A9cran%202025-09-13%20214146.png"
    ],
  },
  {
    id: 4,
    nom: "PayVite",
    description: "PayVite est une application mobile de paiement moderne développée avec React Native (Expo) et Node.js. L'application permet aux utilisateurs d'effectuer des transferts d'argent, de gérer leurs transactions et de communiquer avec leurs contacts de manière sécurisée.",
    readme: `# PayVite 💳

> ⚠️ **Application en cours de développement** - Cette application est actuellement en phase de développement actif. Certaines fonctionnalités peuvent être incomplètes ou sujettes à des modifications.

PayVite est une application mobile de paiement moderne développée avec React Native (Expo) et Node.js. L'application permet aux utilisateurs d'effectuer des transferts d'argent, de gérer leurs transactions et de communiquer avec leurs contacts de manière sécurisée.

## 📸 Aperçu de l'Application

### Screenshots

| Écran de connexion | verification OTP | Paramètres |
|:--:|:--:|:--:|
| ![Login](https://raw.githubusercontent.com/Nkounga42/payvite/refs/heads/master/assets/srceenshot%20(1).png?token=GHSAT0AAAAAADKSEQWPGC7PRJOVSOGLKU422GF7OGQ) | ![OTP](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(2).png?token=GHSAT0AAAAAADKSEQWOKWEKOIXEYPX3JCL42GF6RXQ) | ![Settings](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(3).png?token=GHSAT0AAAAAADKSEQWPNTTPGMH4PGJTSNAU2GF6T6A) |

| Tableau de bord | Transactions | Transfert |
|:--:|:--:|:--:|
| ![Dashboard](https://raw.githubusercontent.com/Nkounga42/payvite/refs/heads/master/assets/srceenshot%20(4).png?token=GHSAT0AAAAAADKSEQWPJXK7LUA6WH3OMMKM2GF7PRQ) | ![Transactions](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(5).png?token=GHSAT0AAAAAADKSEQWOWCBD6DNDBL4OLI4O2GF6VCA) | ![Transfer](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(6).png?token=GHSAT0AAAAAADKSEQWPJKZTTH56SBSFS3K62GF6VVQ) |

| Historique des transactions | Notifications | Support |
|:--:|:--:|:--:|
| ![Transactions History](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(5).png?raw=true) | ![Notifications](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(8).png?token=GHSAT0AAAAAADKSEQWOXVTX3R4DLMXCZHDU2GF6XGA) | ![Support](https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(9).png?token=GHSAT0AAAAAADKSEQWOIZHHKOGKT2QTH3SI2GF6XWQ) |

## 🚀 Fonctionnalités

### 📱 Application Mobile (Frontend)
- **Authentification sécurisée** avec vérification OTP par SMS
- **Tableau de bord** avec aperçu du solde et transactions récentes
- **Transferts d'argent** vers des contacts ou numéros de téléphone
- **Gestion des contacts** avec carnet d'adresses intégré
- **Historique des transactions** avec détails complets
- **Notifications** en temps réel
- **Scanner QR Code** pour les paiements rapides
- **Profil utilisateur** avec paramètres personnalisables
- **Support multilingue** (Français)
- **Interface moderne** avec animations fluides

### 🔧 Backend API
- **API REST** pour l'authentification et les transactions
- **Service OTP** via Twilio pour la vérification SMS
- **Authentification JWT** sécurisée
- **Gestion des sessions** utilisateur
- **Middleware CORS** pour les requêtes cross-origin

## 🛠️ Technologies Utilisées

### Frontend
- **React Native** 0.79.2 avec **Expo** ~53.0.9
- **TypeScript** pour la sécurité des types
- **React Navigation** pour la navigation
- **Expo Router** pour le routage avancé
- **React Native Vector Icons** pour les icônes
- **Expo Camera** pour le scanner QR
- **Expo Notifications** pour les notifications push
- **React Native Chart Kit** pour les graphiques
- **Axios** pour les requêtes HTTP

### Backend
- **Node.js** avec **Express.js** 5.1.0
- **Twilio** pour l'envoi de SMS OTP
- **JSON Web Tokens (JWT)** pour l'authentification
- **CORS** pour la sécurité cross-origin
- **dotenv** pour la gestion des variables d'environnement

## 📋 Prérequis

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- **Expo CLI** (\`npm install -g @expo/cli\`)
- **Compte Twilio** pour les SMS OTP
- **Android Studio** ou **Xcode** pour les émulateurs (optionnel)

## 🚀 Installation

### 1. Cloner le projet
\`\`\`bash
git clone <url-du-repo>
cd payvite
\`\`\`

### 2. Configuration du Backend

\`\`\`bash
cd backend
npm install
\`\`\`

Créer un fichier \`.env\` avec vos credentials Twilio :
\`\`\`env
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
PORT=3000
\`\`\`

Démarrer le serveur backend :
\`\`\`bash
npm start
\`\`\`

Le serveur sera accessible sur \`http://localhost:3000\`

### 3. Configuration du Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

Démarrer l'application Expo :
\`\`\`bash
npm start
\`\`\`

## 📱 Utilisation

### Démarrage de l'application
1. Lancez le backend avec \`npm start\` dans le dossier \`backend\`
2. Lancez le frontend avec \`npm start\` dans le dossier \`frontend\`
3. Scannez le QR code avec l'app Expo Go ou utilisez un émulateur

### Authentification
1. Entrez votre numéro de téléphone
2. Recevez et saisissez le code OTP envoyé par SMS
3. Accédez au tableau de bord principal

### Effectuer un transfert
1. Allez dans l'onglet "Transfert"
2. Sélectionnez un contact ou entrez un numéro
3. Saisissez le montant et une note (optionnelle)
4. Confirmez la transaction

## 🔐 Sécurité

- **Authentification OTP** via SMS pour vérifier l'identité
- **Tokens JWT** avec expiration pour les sessions
- **Validation des données** côté client et serveur
- **Chiffrement des communications** HTTPS recommandé en production
- **Gestion sécurisée** des variables d'environnement

## 📁 Structure du Projet

\`\`\`
payvite/
├── backend/
│   ├── authentification.js    # API d'authentification OTP
│   ├── server.js              # Serveur principal
│   ├── package.json           # Dépendances backend
│   └── .env                   # Variables d'environnement
├── frontend/
│   ├── src/
│   │   ├── screens/           # Écrans de l'application
│   │   ├── components/        # Composants réutilisables
│   │   ├── navigation/        # Configuration navigation
│   │   ├── context/           # Contextes React
│   │   ├── data/              # Données et utilitaires
│   │   ├── libs/              # Bibliothèques utilitaires
│   │   └── translations/      # Fichiers de traduction
│   ├── assets/                # Images et ressources
│   ├── App.tsx                # Composant principal
│   └── package.json           # Dépendances frontend
└── README.md                  # Documentation
\`\`\`

## 🔧 Scripts Disponibles

### Backend
\`\`\`bash
npm start          # Démarre le serveur de production
npm test           # Lance les tests (à configurer)
\`\`\`

### Frontend
\`\`\`bash
npm start          # Démarre Expo en mode développement
npm run android    # Lance sur émulateur Android
npm run ios        # Lance sur émulateur iOS
npm run web        # Lance la version web
\`\`\`

## 🌐 API Endpoints

### Authentification
- \`POST /api/send-otp\` - Envoie un code OTP
- \`POST /api/verify-otp\` - Vérifie le code OTP
- \`POST /api/resend-otp\` - Renvoie un nouveau code OTP

### Paramètres de requête
\`\`\`json
{
  "phone": "+237xxxxxxxxx",
  "code": "123456"
}
\`\`\`

## 🚀 Déploiement

### Backend
1. Configurez les variables d'environnement sur votre serveur
2. Utilisez PM2 ou un gestionnaire de processus similaire
3. Configurez un reverse proxy (Nginx recommandé)
4. Activez HTTPS en production

### Frontend
1. Buildez l'application avec \`expo build\`
2. Publiez sur Google Play Store / App Store
3. Ou utilisez Expo Application Services (EAS)

## 🤝 Contribution

1. Forkez le projet
2. Créez une branche feature (\`git checkout -b feature/nouvelle-fonctionnalite\`)
3. Committez vos changements (\`git commit -m 'Ajout nouvelle fonctionnalité'\`)
4. Pushez vers la branche (\`git push origin feature/nouvelle-fonctionnalite\`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence ISC. Voir le fichier \`LICENSE\` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe de développement

## 🔄 Versions

- **v1.0.0** - Version initiale avec authentification OTP et transferts basiques

---

**PayVite** - Simplifiez vos paiements mobiles 💳✨`,
    badge: [
      "https://img.shields.io/badge/React%20Native-0.79.2-blue?logo=react&logoColor=white",
      "https://img.shields.io/badge/Expo-~53.0.9-black?logo=expo&logoColor=white",
      "https://img.shields.io/badge/Node.js-Express-green?logo=node.js&logoColor=white",
      "https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Twilio-SMS%20OTP-red?logo=twilio&logoColor=white",
      "https://img.shields.io/badge/JWT-Authentication-orange",
      "https://img.shields.io/badge/Status-In%20Development-yellow"
    ],
    slug: "payvite",
    Roles: "Full Stack Mobile Development",
    cathegorie: "Mobile App",
    technologies: ["React Native", "Expo", "TypeScript", "Node.js", "Express.js", "Twilio", "JWT", "Axios"],
    Client: "",
    dateCreation: "2025-09-13",
    links: {
      repository: "https://github.com/Nkounga42/payvite",
      page: "",
    },
    imagesIllustration: [
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(1).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(2).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(3).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(4).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(5).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(6).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(7).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(8).png?raw=true",
      "https://github.com/Nkounga42/payvite/blob/master/assets/srceenshot%20(9).png?raw=true",
      "https://github.com/Nkounga42/payvite/raw/master/assets/srceenshot%20(10).png?raw=true",
    ],
  },
  {
    id: 5,
    nom: "NED Studio",
    description: "NED Studio est une application Electron moderne qui combine un frontend React/TypeScript avec un backend Node.js/Express, offrant un environnement de développement modulaire et extensible.",
    readme: `# 🎨 NED Studio

> **Système modulaire de développement créatif**

NED Studio est une application Electron moderne qui combine un frontend React/TypeScript avec un backend Node.js/Express, offrant un environnement de développement modulaire et extensible.

## 📸 Aperçu de l'application

![Interface principale de NED Studio](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224343.png)
*Interface module de NED Studio (theme par defaut)*

![Sidebar réduite](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224401.png)
*Sidebar réduite*

![Page des modules en darker mode](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224604.png)
*Page des modules en darker mode*

![Page des modules en light mode](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224650.png)
*Page des modules en light mode*

![Page de connexion](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224904.png)
*Page de connexion*

![Page d'inscription](https://github.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224946.png)
*Page d'inscription*

## 🚀 Démarrage rapide

\`\`\`bash
# Cloner le projet
git clone https://github.com/Nkounga42/NED-studio.git
cd NED-studio

# Installation des dépendances
npm install

# Démarrer l'application complète (frontend + backend)
npm run dev
\`\`\`

L'application sera accessible à l'adresse configurée dans le frontend Electron.

## 🏗️ Architecture

NED Studio suit une architecture modulaire avec séparation claire des responsabilités :

\`\`\`
NED-studio/
├── 📁 frontend/          # Application Electron (React + TypeScript)
├── 📁 backend/           # API REST (Node.js + Express + MongoDB)
├── 📄 package.json      # Scripts de gestion globale
└── 📄 README.md         # Documentation principale
\`\`\`

### Stack technologique

**Frontend (Electron)**
- ⚛️ React 18 avec TypeScript
- 🎨 DaisyUI + Tailwind CSS
- 🔄 Framer Motion (animations)
- 🛣️ React Router (navigation)
- 🔔 Sonner (notifications)

**Backend (API)**
- 🟢 Node.js + Express
- 🍃 MongoDB + Mongoose
- 🔐 JWT (authentification)
- 🔒 bcryptjs (hachage)
- 🌐 CORS activé

## ✨ Fonctionnalités

### 🔐 Système d'authentification complet
- ✅ Connexion/inscription avec validation
- ✅ Gestion des sessions persistantes
- ✅ Protection des routes
- ✅ Interface utilisateur avec header personnalisé
- ✅ Redirection automatique selon l'état de connexion

### 🧩 Architecture modulaire
- ✅ Système de plugins extensible
- ✅ Composants réutilisables
- ✅ Hooks personnalisés
- ✅ Configuration flexible

### 🎨 Interface moderne
- ✅ Design responsive avec DaisyUI
- ✅ Animations fluides avec Framer Motion
- ✅ Thème sombre/clair
- ✅ Notifications toast intégrées

## 🛠️ Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn
- MongoDB (local ou distant)

### Installation complète

\`\`\`bash
# 1. Cloner le repository
git clone https://github.com/Nkounga42/NED-studio.git
cd NED-studio

# 2. Installer les dépendances globales
npm install

# 3. Installer les dépendances du backend
cd backend
npm install

# 4. Installer les dépendances du frontend
cd ../frontend
npm install

# 5. Retourner à la racine
cd ..
\`\`\`

### Configuration

1. **Backend** : Créer un fichier \`.env\` dans le dossier \`backend/\`
\`\`\`env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/nedstudio
JWT_SECRET=votre_secret_jwt_ici
\`\`\`

2. **Frontend** : La configuration se trouve dans les fichiers de configuration Electron

## 🔧 Développement

### Scripts disponibles

\`\`\`bash
# Démarrer l'application complète (recommandé)
npm run dev
# ou
npm run studio

# Démarrer uniquement le backend
npm run server

# Démarrer uniquement le frontend
npm run client

# Build de production
npm run build
\`\`\`

### Structure de développement

- **Frontend** : Port par défaut Electron
- **Backend** : Port 3001 (configurable via .env)
- **Base de données** : MongoDB sur port 27017

## 📦 Build et déploiement

### Build du frontend

\`\`\`bash
cd frontend

# Windows
npm run build:win

# macOS  
npm run build:mac

# Linux
npm run build:linux
\`\`\`

### Déploiement du backend

Le backend peut être déployé sur n'importe quelle plateforme supportant Node.js (Heroku, Vercel, DigitalOcean, etc.).

## 🔐 Authentification

Le système d'authentification inclut :

- **Routes protégées** : \`/app\`, \`/plugins\`, \`/settings\`
- **Routes publiques** : \`/login\`, \`/register\`
- **Comptes de démonstration** :
  - \`admin\` / \`password\`
  - \`demo\` / \`demo123\`

### Flux d'authentification

1. Utilisateur non connecté → redirection vers \`/login\`
2. Connexion réussie → redirection vers \`/app\`
3. Header avec informations utilisateur affiché
4. Déconnexion → retour vers \`/login\`

## 🧩 Système de plugins

NED Studio dispose d'un système de plugins extensible permettant d'ajouter facilement de nouvelles fonctionnalités.

## 📚 Documentation

### Documentation détaillée

- 📖 Frontend README - Configuration et développement Electron
- 📖 Backend README - API et base de données
- 📖 Guide des plugins - Développement de plugins

### Ressources utiles

- [Documentation Electron](https://www.electronjs.org/docs)
- [Documentation React](https://react.dev)
- [Documentation DaisyUI](https://daisyui.com)
- [Documentation Express](https://expressjs.com)

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité (\`git checkout -b feature/AmazingFeature\`)
3. **Commit** vos changements (\`git commit -m 'Add some AmazingFeature'\`)
4. **Push** vers la branche (\`git push origin feature/AmazingFeature\`)
5. **Ouvrir** une Pull Request

### Standards de code

- Utiliser TypeScript pour le frontend
- Suivre les conventions ESLint configurées
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les nouvelles API

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

**Gil Nkounga**
- Email: exaucenkoungadivina@gmail.com
- GitHub: [@Nkounga42](https://github.com/Nkounga42)

---

**Développé avec ❤️ par l'équipe NED Studio**`,
    badge: [
      "https://img.shields.io/badge/Electron-Latest-blue?logo=electron&logoColor=white",
      "https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white",
      "https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Node.js-Express-green?logo=node.js&logoColor=white",
      "https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb&logoColor=white",
      "https://img.shields.io/badge/DaisyUI-Tailwind-purple?logo=tailwindcss&logoColor=white",
      "https://img.shields.io/badge/JWT-Authentication-orange"
    ],
    slug: "ned-studio",
    Roles: "Full Stack Desktop Development",
    cathegorie: "Desktop ",
    technologies: ["Electron", "React", "TypeScript", "Node.js", "Express.js", "MongoDB", "DaisyUI", "Tailwind CSS", "JWT"],
    Client: "",
    dateCreation: "2025-09-13",
    links: {
      repository: "https://github.com/Nkounga42/NED-studio",
      page: "",
    },
    imagesIllustration: [
      "https://raw.githubusercontent.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224343.png?raw=true",
      "https://raw.githubusercontent.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224604.png?raw=true",
      "https://raw.githubusercontent.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224650.png?raw=true",
      "https://raw.githubusercontent.com/Nkounga42/NED-studio/blob/main/assets/Capture%20d'%C3%A9cran%202025-09-13%20224904.png?raw=true"
    ],
  }
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

export { projets, categories, socialLinks, img }