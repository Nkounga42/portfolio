export const LANGUAGES = ["fr", "en"] as const;
export type Language = typeof LANGUAGES[number];

export const translations = {
  fr: {
    // Header / Navigation
    nav: {
      home: "Accueil",
      projects: "Projets",
      blog: "Blog",
      skills: "Compétences",
      gallery: "Galerie",
      about: "À propos",
      admin: "Admin",
      contact: "Prendre Contact",
      contactShort: "Contact",
    },

    // Home page
    home: {
      explorationTitle: "Exploration",
      explorationSubtitle:
        "Plongez plus profondément dans mon univers professionnel et découvrez comment je peux apporter de la valeur à vos projets.",
      projectsTitle: "Réalisations",
      projectsLabel: "Portfolio",
      projectsDesc:
        "Une collection de solutions numériques complexes, de l'architecture logicielle au design de l'interface.",
      projectsCta: "Découvrir mes projets",
      experienceTitle: "Parcours",
      experienceLabel: "Expertise",
      experienceDesc:
        "Mon parcours professionnel détaillé, mes collaborations et les jalons qui ont façonné mon expertise actuelle.",
      experienceCta: "Consulter mon CV",
      skillsTitle: "Expertise",
      skillsLabel: "Stack",
      skillsDesc:
        "Une vision détaillée des technologies et outils que je maîtrise pour construire des produits d'exception.",
      skillsCta: "Voir mes compétences",
      blogTitle: "Journal",
      blogLabel: "Notes",
      blogDesc:
        "Partage de retours d'expérience, tutoriels et réflexions sur les tendances du développement moderne.",
      blogCta: "Lire mes articles",
      recommendedBy: "Recommandé par",
      galleryTitle: "Galerie",
      gallerySubtitle: "Un aperçu visuel de mes inspirations et de mon univers créatif.",
      galleryViewAll: "Tout voir",
    },

    // Hero Section
    hero: {
      badge: "Disponible pour travailler",
      title1: "Construire des",
      title2: "expériences",
      title3: "numériques",
      subtitle:
        "Développeur full-stack en formation à ESCIC. Je conçois des écosystèmes digitaux performants, de l'infrastructure backend aux interfaces utilisateurs intuitives.",
      cta: "Voir mes projets",
      ctaSecondary: "Me contacter",
    },

    // About page
    about: {
      title: "À propos de moi",
      greeting: "Bonjour, je suis",
      bio: "Développeur Full-Stack passionné basé au Congo-Brazzaville. Je crée des expériences numériques qui combinent performance technique et design soigné.",
    },

    // Contact page
    contact: {
      title: "Prise de Contact",
      subtitle: "Discutons de votre projet",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "Votre email",
      messagePlaceholder: "Votre message...",
      send: "Envoyer",
      sending: "Envoi en cours...",
    },

    // Footer
    footer: {
      rights: "Tous droits réservés.",
      madeWith: "Fait avec",
      by: "par",
    },

    // Newsletter
    newsletter: {
      title: "Restez informé",
      subtitle: "Recevez mes derniers articles et projets directement dans votre boîte mail.",
      placeholder: "Votre adresse email",
      subscribe: "S'abonner",
      success: "Merci pour votre inscription !",
      card1Title: "Articles hebdomadaires",
      card1Text: "Chaque semaine, découvrez un nouvel article sur mes projets, idées et explorations créatives. Court. Inspirant. Direct.",
      card2Title: "Zero spam",
      card2Text: "Juste du contenu pertinent, quand il le faut.",
    },

    // Projects
    projects: {
      title: "Mes Projets",
      subtitle: "Une sélection de mes travaux les plus récents.",
      viewProject: "Voir le projet",
      sourceCode: "Code source",
      noProjects: "Aucun projet pour le moment.",
    },

    // Blog
    blog: {
      title: "Blog & Articles",
      subtitle: "Mes réflexions et expériences sur le développement.",
      readMore: "Lire la suite",
      noArticles: "Aucun article pour le moment.",
      search: "Rechercher un article...",
    },

    // Skills
    skills: {
      title: "Mes Compétences",
      subtitle: "Les technologies que j'utilise au quotidien.",
    },

    // Gallery
    gallery: {
      title: "Galerie",
      subtitle: "Inspirations & créations visuelles.",
    },

    // Search
    search: {
      placeholder: "Rechercher...",
      noResults: "Aucun résultat trouvé.",
      results: "résultats",
    },

    // Common
    common: {
      loading: "Chargement...",
      error: "Une erreur est survenue.",
      back: "Retour",
      seeAll: "Voir tout",
      learnMore: "En savoir plus",
    },

    // Testimonials
    testimonials: {
      title: "testimonials",
      heading: "Ce que les autres disent",
      description: "J'ai travaillé avec des gens extraordinaires au fil des ans. Voici ce qu'ils ont à dire sur moi.",
      checkLinkedIn: "Voir sur LinkedIn",
      checkMail: "Voir sur Mail",
      add: "Ajouter",
      addTestimonial: "Ajouter un témoignage",
      name: "Nom",
      email: "Email",
      message: "Message",
      image: "Image",
      orEnterUrl: "Ou entrez une URL d'image",
      or: "ou",
      linkedinUrl: "LinkedIn URL",
      mailUrl: "Mail URL",
      uploading: "Upload en cours...",
      createTestimonial: "Créer le témoignage",
      noTestimonials: "Aucun témoignage disponible",
    },
  },

  en: {
    // Header / Navigation
    nav: {
      home: "Home",
      projects: "Projects",
      blog: "Blog",
      skills: "Skills",
      gallery: "Gallery",
      about: "About",
      admin: "Admin",
      contact: "Get in Touch",
      contactShort: "Contact",
    },

    // Home page
    home: {
      explorationTitle: "Exploration",
      explorationSubtitle:
        "Dive deeper into my professional universe and discover how I can bring value to your projects.",
      projectsTitle: "Achievements",
      projectsLabel: "Portfolio",
      projectsDesc:
        "A collection of complex digital solutions, from software architecture to interface design.",
      projectsCta: "Discover my projects",
      experienceTitle: "Journey",
      experienceLabel: "Expertise",
      experienceDesc:
        "My detailed professional journey, collaborations, and milestones that shaped my current expertise.",
      experienceCta: "View my resume",
      skillsTitle: "Expertise",
      skillsLabel: "Stack",
      skillsDesc:
        "A detailed overview of the technologies and tools I master to build exceptional products.",
      skillsCta: "See my skills",
      blogTitle: "Journal",
      blogLabel: "Notes",
      blogDesc:
        "Sharing experience feedback, tutorials, and reflections on modern development trends.",
      blogCta: "Read my articles",
      recommendedBy: "Recommended by",
      galleryTitle: "Gallery",
      gallerySubtitle: "A visual overview of my inspirations and creative universe.",
      galleryViewAll: "View all",
    },

    // Hero Section
    hero: {
      badge: "Available for work",
      title1: "Building",
      title2: "digital",
      title3: "experiences",
      subtitle:
        "Full-stack developer in training at ESCIC. I design high-performance digital ecosystems, from backend infrastructure to intuitive user interfaces.",
      cta: "See my projects",
      ctaSecondary: "Contact me",
    },

    // About page
    about: {
      title: "About me",
      greeting: "Hi, I'm",
      bio: "Passionate Full-Stack Developer based in Congo-Brazzaville. I create digital experiences that combine technical performance and thoughtful design.",
    },

    // Contact page
    contact: {
      title: "Get in Touch",
      subtitle: "Let's talk about your project",
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message...",
      send: "Send",
      sending: "Sending...",
    },

    // Footer
    footer: {
      rights: "All rights reserved.",
      madeWith: "Made with",
      by: "by",
    },

    // Newsletter
    newsletter: {
      title: "Stay updated",
      subtitle: "Get my latest articles and projects directly in your inbox.",
      placeholder: "Your email address",
      subscribe: "Subscribe",
      success: "Thanks for subscribing!",
      card1Title: "Weekly articles",
      card1Text: "Every week, discover a new article about my projects, ideas, and creative explorations. Short. Inspiring. Direct.",
      card2Title: "Zero spam",
      card2Text: "Just relevant content, when it matters.",
    },

    // Projects
    projects: {
      title: "My Projects",
      subtitle: "A selection of my most recent work.",
      viewProject: "View project",
      sourceCode: "Source code",
      noProjects: "No projects yet.",
    },

    // Blog
    blog: {
      title: "Blog & Articles",
      subtitle: "My thoughts and experiences on development.",
      readMore: "Read more",
      noArticles: "No articles yet.",
      search: "Search an article...",
    },

    // Skills
    skills: {
      title: "My Skills",
      subtitle: "The technologies I use on a daily basis.",
    },

    // Gallery
    gallery: {
      title: "Gallery",
      subtitle: "Inspirations & visual creations.",
    },

    // Search
    search: {
      placeholder: "Search...",
      noResults: "No results found.",
      results: "results",
    },

    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred.",
      back: "Back",
      seeAll: "See all",
      learnMore: "Learn more",
    },

    // Testimonials
    testimonials: {
      title: "testimonials",
      heading: "What others say",
      description: "I've worked with extraordinary people over the years. Here's what they have to say about me.",
      checkLinkedIn: "Check it out on LinkedIn",
      checkMail: "Check it out on Mail",
      add: "Add",
      addTestimonial: "Add a testimonial",
      name: "Name",
      email: "Email",
      message: "Message",
      image: "Image",
      orEnterUrl: "Or enter an image URL",
      or: "or",
      linkedinUrl: "LinkedIn URL",
      mailUrl: "Mail URL",
      uploading: "Uploading...",
      createTestimonial: "Create testimonial",
      noTestimonials: "No testimonials available",
    },
  },
};

export type TranslationKeys = typeof translations.fr;
