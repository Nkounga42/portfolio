import { LinkIcon } from 'lucide-react';
import React, { useState } from 'react';

// Base de données structurée de tes liens
const ressourcesData = [
    { id: 1, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jP9BOnawITBHphkDeMYubMXjP9byFnFkmj5oZWN-JhmnD3_kbMEDPuQ&s=10", name: 'Wavs Samples', url: 'https://wavs.com/samples', category: 'Audio & Médias', desc: 'Banque de samples audio.' },
    { id: 2, logo: "https://taye.me/blog/img/ijs-design/5.png", name: 'Interact.js', url: 'https://interactjs.io/', category: 'Librairies JS', desc: 'Gestion du drag & drop et du redimensionnement.' },
    { id: 3, logo: "https://images.icon-icons.com/2699/PNG/512/opencv_logo_icon_170888.png", name: 'OpenCV', url: 'https://opencv.org/', category: 'Librairies JS', desc: 'Librairie de vision par ordinateur.' },
    { id: 4, logo: "https://palettegenerator.com/images/logo.svg", name: 'JSON Color Palette Generator', url: 'https://json-color-palette-generator.vercel.app/', category: 'Design & Couleurs', desc: 'Générateur de nuances de couleurs au format JSON.' },
    { id: 5, logo: "https://i0.wp.com/www.cssscript.com/wp-content/uploads/2019/03/Represent-Percentage-In-A-SVG-Circle-Circular-Progress-Bar.jpg?fit=435%2C320&ssl=1", name: 'SVG Circle Progress', url: 'https://nikitahl.github.io/svg-circle-progress-generator/', category: 'Design & Couleurs', desc: 'Générateur de barres de progression circulaires en SVG.' },
    { id: 6, logo: "https://pbs.twimg.com/profile_images/1930935185991954432/ZW_QgE6a_400x400.jpg", name: 'Design Spells', url: 'https://www.designspells.com', category: 'Inspiration UX/UI', desc: 'Modèles et détails de design UX/UI captivants.' },
    { id: 7, logo: "https://pub-0cd6f9d4131f4f79ac40219248ae64db.r2.dev/logo.svg", name: 'EasyUI Templates', url: 'https://www.easyui.pro/templates', category: 'Templates & UI', desc: 'Templates de composants prêts à l\'emploi.' },
    { id: 9, logo: "https://nextui.org/favicon.ico", name: 'NextUI', url: 'https://nextui.org', category: 'Templates & UI', desc: 'Composants et templates pour Next.js.' },
    { id: 10, logo: "https://csshero.org/favicon.ico", name: 'CSSHero Mesher', url: 'https://csshero.org/mesher/', category: 'Design & Couleurs', desc: 'Générateur de gradients Mesh en CSS.' },
    { id: 11, logo: "https://animate.style/favicon.ico", name: 'Animate.style', url: 'https://animate.style', category: 'Animations', desc: 'Framework d\'animations CSS prêtes à l\'emploi.' },
    { id: 12, logo: "https://www.freefaces.gallery/favicon.ico", name: 'Free Faces Gallery', url: 'https://www.freefaces.gallery/typefaces', category: 'Design & Couleurs', desc: 'Sélection de polices de caractères gratuites.' },
    { id: 13, logo: "https://toolfolio.com/icon.png?icon.1oj3nv0dxqus2.png", name: 'Toolfolio', url: 'https://toolfolio.io', category: 'Inspiration UX/UI', desc: 'Ressources et outils pour créatifs.' },
    { id: 14, logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6B6Z07u4DMSX88tn0AU-71PiWFjmR9ySVqkw5w5R-sw&s=10", name: 'Shadcn UI Themes', url: 'https://ui.shadcn.com/themes', category: 'Templates & UI', desc: 'Thèmes et templates modernes haut de gamme.' },
    { id: 15, logo: "", name: 'ColorKit Shades', url: 'https://colorkit.io/shades-tints', category: 'Design & Couleurs', desc: 'Générateur de teintes et nuances de couleurs.' },
    { id: 16, logo: "", name: 'WpShout Patterns', url: 'https://wpshout.com/pattern-collection/#gref', category: 'Design & Couleurs', desc: 'Collection d\'images de stock et patterns.' },
    { id: 17, logo: "", name: 'UseVisuals', url: 'https://usevisuals.com/resources', category: 'Design & Couleurs', desc: 'Ressources de design gratuites.' },
    { id: 18, logo: "", name: 'CallToInspiration', url: 'https://calltoinspiration.com/tabs', category: 'Inspiration UX/UI', desc: 'Références en image et inspiration d\'interfaces.' },
    { id: 19, logo: "", name: 'Checklist Design', url: 'https://www.checklist.design', category: 'Inspiration UX/UI', desc: 'Collection des meilleures pratiques de design.' },
    { id: 20, logo: "", name: 'DevResourc.es', url: 'https://devresourc.es/category/animation', category: 'Animations', desc: 'Ressources de dev axées sur les animations.' },
    { id: 21, logo: "", name: 'Typeface Animator', url: 'https://www.typefaceanimator.com', category: 'Animations', desc: 'Outil d\'animation de texte.' },
    { id: 22, logo: "", name: 'Iconfinder', url: 'https://www.iconfinder.com/', category: 'Design & Couleurs', desc: 'Banque d\'icônes vectorielles.' },
    { id: 23, logo: "", name: 'Codrops (Tympanus)', url: 'https://tympanus.net/codrops/category/tutorials/', category: 'Tutos & Dev', desc: 'Tutoriels web avancés et démos interactives.' },
    { id: 24, logo: "", name: 'Joseph.cv', url: 'https://joseph.cv/', category: 'Inspiration Portfolios', desc: 'Inspiration Portfolio ultra-pro.' },
    { id: 25, logo: "", name: 'Zegzulka Play', url: 'https://www.zegzulka.com/play', category: 'Inspiration Portfolios', desc: 'Portfolio interactif et créatif.' },
    { id: 26, logo: "", name: 'Seyit Yilmaz', url: 'https://www.seyityilmaz.com/', category: 'Inspiration Portfolios', desc: 'Portfolio minimaliste et impactant.' },
    { id: 27, logo: "", name: 'Hasque (Hanzala)', url: 'https://hasque.com/', category: 'Inspiration Portfolios', desc: 'Portfolio au design travaillé.' },
    { id: 28, logo: "", name: 'Mapbox', url: 'https://www.mapbox.com/', category: 'Librairies JS', desc: 'Création d\'applications avec cartes interactives.' },
    { id: 29, logo: "", name: 'Editor.js', url: 'https://editorjs.io/', category: 'Librairies JS', desc: 'Éditeur de texte par blocs moderne pour le HTML.' },
    { id: 30, logo: "", name: 'FilePond', url: 'https://pqina.nl/filepond/', category: 'Librairies JS', desc: 'Framework puissant pour la gestion des uploads de fichiers.' },
    { id: 31, logo: "", name: 'Responsively App', url: 'https://responsively.app/download', category: 'Outils Dev', desc: 'Navigateur pour tester la réactivité (responsive) de vos apps.' },
    { id: 32, logo: "", name: 'Netlify App', url: 'https://app.netlify.com', category: 'Outils Dev', desc: 'Plateforme cloud pour le déploiement d\'applications React/Web.' },
    { id: 33, logo: "", name: 'TinyMCE', url: 'https://www.tiny.cloud/', category: 'Librairies JS', desc: 'Éditeur WYSIWYG robuste.' },
    { id: 34, logo: "", name: 'Vanta.js', url: 'https://www.vantajs.com/', category: 'Animations', desc: 'Fonds animés 3D en quelques lignes de code.' },
    { id: 35, logo: "", name: 'Gluestack UI', url: 'https://gluestack.io/ui/docs/components/avatar', category: 'Mobile & React Native', desc: 'Composants UI pour React Native (ex: Avatars).' },
    { id: 36, logo: "", name: 'Tailblocks', url: 'https://tailblocks.cc/', category: 'Templates & UI', desc: 'Blocs de code Tailwind prêts à copier-coller.' },
    { id: 37, logo: "", name: 'Pagedone', url: 'https://pagedone.io/blocks', category: 'Templates & UI', desc: 'Composants et sections d\'interface Tailwind CSS.' },
    { id: 38, logo: "", name: 'Tweakcn', url: 'https://tweakcn.com/editor/theme', category: 'Templates & UI', desc: 'Éditeur de thèmes pour Shadcn UI.' },
    { id: 39, logo: "", name: 'Motion Primitives', url: 'https://motion-primitives.com/', category: 'Animations', desc: 'Composants d\'animations fluides basés sur Framer Motion.' },
    { id: 40, logo: "", name: 'Prompt Kit', url: 'https://www.prompt-kit.com', category: 'Outils Dev', desc: 'Kits et ressources pour ingénierie de prompts.' },
    { id: 41, logo: "", name: 'Fancy Components', url: 'https://www.fancycomponents.dev/', category: 'Animations', desc: 'Collection de composants React hautement animés.' },
    { id: 42, logo: "", name: 'DaisyUI', url: 'https://daisyui.com/', category: 'Design Systems', desc: 'Surcouche élégante à Tailwind avec thèmes intégrés.' },
    { id: 43, logo: "", name: 'MUI (Material UI)', url: 'https://mui.com/material-ui/react-progress/', category: 'Design Systems', desc: 'Composants respectant les guidelines Material Design.' },
    { id: 44, logo: "", name: 'Radix UI', url: 'https://www.radix-ui.com/', category: 'Design Systems', desc: 'Composants bas niveau, accessibles et unstyled.' },
    { id: 45, logo: "", name: 'Ark UI', url: 'https://ark-ui.com/', category: 'Design Systems', desc: 'Composants Headless pour personnalisation avancée.' },
    { id: 46, logo: "", name: 'Subframe', url: 'https://www.subframe.com', category: 'Templates & UI', desc: 'Plateforme visuelle pour concevoir des UI de haut niveau.' },
    { id: 47, logo: "", name: 'Carbon Design System', url: 'https://carbondesignsystem.com/', category: 'Design Systems', desc: 'Le design system open-source robuste d’IBM.' },
    { id: 48, logo: "", name: 'Park UI', url: 'https://park-ui.com/', category: 'Design Systems', desc: 'Composants Tailwind modernes inspirés de Shadcn.' },
    { id: 49, logo: "", name: 'Tetrisly', url: 'https://docs.tetrisly.com/components', category: 'Design Systems', desc: 'Système de design professionnel axé produit.' },
    { id: 50, logo: "", name: 'Magic UI', url: 'https://magicui.design/docs/components/typing-animation', category: 'Animations', desc: 'Composants Tailwind animés (Typing animation, effets dynamiques).' },
    { id: 51, logo: "", name: 'David UI', url: 'https://www.creative-tim.com/david-ui/docs/html/liquid-glass/usecases', category: 'Templates & UI', desc: 'Composants HTML et utilitaires CSS avancés.' },
    { id: 52, logo: "", name: 'Material Tailwind', url: 'https://www.material-tailwind.com/blocks/categories', category: 'Templates & UI', desc: 'Bibliothèques de blocs Tailwind CSS pré-conçus.' },
    { id: 53, logo: "", name: '21st.dev', url: 'https://21st.dev/s/hero', category: 'Templates & UI', desc: 'Composants vitrines et sections de héros.' }
];

const categories = [...new Set(ressourcesData.map(item => item.category))];

export default function Ressources() {
    const [searchTerm, setSearchTerm] = useState('');

    // Group resources by category
    const resourcesByCategory = categories.reduce((acc, category) => {
        acc[category] = ressourcesData.filter(item => item.category === category);
        return acc;
    }, {} as Record<string, typeof ressourcesData>);

    // Filter resources by search term
    const filteredResourcesByCategory = Object.keys(resourcesByCategory).reduce((acc, category) => {
        acc[category] = resourcesByCategory[category].filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.desc.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
        return acc;
    }, {} as Record<string, typeof ressourcesData>);

    return (
        <div className="min-h-screen relative bg-base-200 text-base-content pt-12 font-sans">
            {/* Header */}
            <div className=" mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4 py-4 px-8  ">
                <div>
                    <h1 className="text-xl font-semibold">
                        Hub de Ressources Pro
                    </h1>
                </div>

                <div className="form-control w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Rechercher une ressource..."
                        className="input input-bordered input-primary w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Columns layout - one column per category */}
            <div className="  mx-auto px-8 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {categories.map((category) => {
                        const categoryResources = filteredResourcesByCategory[category] || [];
                        if (categoryResources.length === 0) return null;

                        return (
                            <div key={category} className=" relative mb-12 rounded-xl overflow-hidden">
                                <div className="mb-4 sticky ml-3">
                                    <h2 className="text-lg font-bold text-base-content">{category}</h2>
                                    <p className="text-xs text-base-content/60">{categoryResources.length} ressources</p>
                                </div>
                                <div className="max-h-[600px] overflow-y-auto ">
                                    {categoryResources.map((item) => (
                                        <a
                                            key={item.id}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-100 transition-colors cursor-pointer group"
                                        >
                                            <div className="w-8 h-8 rounded bg-base-300 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {item.logo ? (
                                                    <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <div className="w-full h-full  bg-primary/20 rounded flex items-center justify-center">
                                                        <span className="text-primary text-xs font-bold">{item.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-base-content truncate group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <LinkIcon className="w-4 h-4 text-base-content/40 group-hover:text-primary transition-colors flex-shrink-0" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}