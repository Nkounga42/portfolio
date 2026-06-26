import { Search, Loader2, BookOpen, Layout, MessageSquare, Image as ImageIcon, FileText, ArrowRight, X, User, History, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../tools/supabase";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { motion, AnimatePresence } from "framer-motion";

type ResultType = 'blog' | 'project' | 'testimonial' | 'gallery' | 'page';

interface SearchResult {
  id: string | number;
  type: ResultType;
  title: string;
  description: string;
  link: string;
  category?: string;
  image?: string;
}

const STATIC_PAGES = [
  { title: "Accueil", title_en: "Home", description: "Page d'accueil de mon portfolio professionnel.", description_en: "Homepage of my professional portfolio.", link: "/portfolio/", keywords: ["home", "accueil", "bienvenue", "welcome"] },
  { title: "À propos", title_en: "About", description: "Découvrez mon parcours, mes compétences et ma vision.", description_en: "Learn about my journey, skills, and vision.", link: "/portfolio/about", keywords: ["about", "propos", "parcours", "bio", "qui suis-je", "who am i"] },
  { title: "Contact", title_en: "Contact", description: "Besoin d'un projet ? Contactez-moi pour en discuter.", description_en: "Need a project? Contact me to discuss.", link: "/portfolio/contact", keywords: ["contact", "email", "message", "travailler ensemble", "work together"] },
  { title: "Projets", title_en: "Projects", description: "Liste complète de mes réalisations et projets.", description_en: "Full list of my achievements and projects.", link: "/portfolio/projects", keywords: ["projects", "projets", "portfolio", "réalisations", "work"] },
  { title: "Blog", title_en: "Blog", description: "Articles sur le développement, le design et mes idées.", description_en: "Articles on development, design, and ideas.", link: "/portfolio/blog", keywords: ["blog", "articles", "news", "nouvelles", "pensées", "thoughts"] },
  { title: "Galerie", title_en: "Gallery", description: "Une collection visuelle de mes créations et inspirations.", description_en: "A visual collection of my creations and inspirations.", link: "/portfolio/gallery", keywords: ["gallery", "galerie", "images", "photos", "visual", "visuel"] },
];

const HISTORY_KEY = 'portfolio_search_history';

export default function SearchPage() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ResultType | 'all'>('all');
  const [history, setHistory] = useState<string[]>([]);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (q: string) => {
    if (!q.trim() || q.length < 2) return;
    setHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== q.toLowerCase());
      const newHistory = [q, ...filtered].slice(0, 5);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const performSearch = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const searchVal = `%${searchTerm}%`;

    try {
      // 1. Search Static Pages
      const pageResults: SearchResult[] = STATIC_PAGES
        .filter(p => 
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          p.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.keywords.some(k => k.includes(searchTerm.toLowerCase()))
        )
        .map(p => ({
          id: `page-${p.link}`,
          type: 'page',
          title: language === 'fr' ? p.title : p.title_en,
          description: language === 'fr' ? p.description : p.description_en,
          link: p.link
        }));

      // 2. Search Blogs
      const { data: blogs } = await supabase
        .from('blog_posts')
        .select('*')
        .or(`title.ilike.${searchVal},summary.ilike.${searchVal},content.ilike.${searchVal}`)
        .limit(10);

      const blogResults: SearchResult[] = (blogs || []).map(b => ({
        id: b.id,
        type: 'blog',
        title: b.title,
        description: b.summary || '',
        link: `/portfolio/blog/${b.slug}`,
        category: b.category,
        image: b.cover_image
      }));

      // 3. Search Projects
      const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .or(`nom.ilike.${searchVal},description.ilike.${searchVal},readme.ilike.${searchVal}`)
        .limit(10);

      const projectResults: SearchResult[] = (projects || []).map(p => ({
        id: p.id,
        type: 'project',
        title: p.nom,
        description: p.description || '',
        link: `/portfolio/projects/${p.slug}`,
        category: p.category,
        image: p.image || (p.imagesIllustration && p.imagesIllustration[0])
      }));

      // 4. Search Testimonials
      const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .or(`name.ilike.${searchVal},message.ilike.${searchVal}`)
        .limit(5);

      const testimonialResults: SearchResult[] = (testimonials || []).map(t => ({
        id: t.id,
        type: 'testimonial',
        title: t.name,
        description: t.message || '',
        link: `/portfolio/#testimonials`,
        image: t.image
      }));

      // 5. Search Gallery
      const { data: gallery } = await supabase
        .from('gallery')
        .select('*')
        .or(`title.ilike.${searchVal},description.ilike.${searchVal}`)
        .limit(10);

      const galleryResults: SearchResult[] = (gallery || []).map(g => ({
        id: g.id,
        type: 'gallery',
        title: g.title,
        description: g.description || '',
        link: `/portfolio/gallery`,
        category: g.category,
        image: g.image_url
      }));

      setResults([
        ...pageResults,
        ...blogResults,
        ...projectResults,
        ...testimonialResults,
        ...galleryResults
      ]);

      if (searchTerm.length >= 3) {
        addToHistory(searchTerm);
      }

    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        performSearch(query);
      } else if (query.length === 0) {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(r => r.type === activeTab);

  const getIcon = (type: ResultType) => {
    switch (type) {
      case 'blog': return <BookOpen className="w-5 h-5" />;
      case 'project': return <Layout className="w-5 h-5" />;
      case 'testimonial': return <MessageSquare className="w-5 h-5" />;
      case 'gallery': return <ImageIcon className="w-5 h-5" />;
      case 'page': return <FileText className="w-5 h-5" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  const getLabel = (type: ResultType) => {
    if (language === 'en') {
      switch (type) {
        case 'blog': return 'Blog';
        case 'project': return 'Projects';
        case 'testimonial': return 'Testimonials';
        case 'gallery': return 'Gallery';
        case 'page': return 'Pages';
      }
    }
    switch (type) {
      case 'blog': return 'Blog';
      case 'project': return 'Projets';
      case 'testimonial': return 'Témoignages';
      case 'gallery': return 'Galerie';
      case 'page': return 'Pages';
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Search Header */}
      <div className="pattern-flower pt-24 pb-12 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">
              {language === 'fr' ? 'Que cherchez-vous ?' : 'What are you looking for?'}
            </h1>
            <p className="text-white/80 text-lg">
              {language === 'fr' 
                ? 'Trouvez des articles, des projets, des témoignages ou explorez le site.' 
                : 'Find articles, projects, testimonials or explore the site.'}
            </p>
          </motion.div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
            </div>
            <input
              type="text"
              autoFocus
              className="w-full h-16 pl-14 pr-16 text-xl bg-base-200 border-2 border-base-content/5 focus:border-primary rounded-3xl outline-none shadow-2xl transition-all"
              placeholder={language === 'fr' ? 'Rechercher...' : 'Search...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute inset-y-0 right-5 flex items-center text-base-content/40 hover:text-error transition-colors"
                title="Effacer"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Search History Underneath */}
          {history.length > 0 && !query && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 text-white/60 text-sm font-medium mr-2">
                <History className="w-4 h-4" />
                {language === 'fr' ? 'Récent :' : 'Recent:'}
              </div>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(h)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full backdrop-blur-md transition-all border border-white/5"
                >
                  {h}
                </button>
              ))}
              <button 
                onClick={clearHistory}
                className="text-white/30 hover:text-error transition-colors p-1"
                title={language === 'fr' ? 'Effacer l\'historique' : 'Clear history'}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Tabs & Results */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
        {results.length > 0 ? (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'all' ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 hover:bg-base-300'}`}
              >
                {language === 'fr' ? 'Tout voir' : 'Show all'} ({results.length})
              </button>
              {(['page', 'blog', 'project', 'testimonial', 'gallery'] as ResultType[]).map(type => {
                const count = results.filter(r => r.type === type).length;
                if (count === 0) return null;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all ${activeTab === type ? 'bg-primary text-primary-content shadow-lg' : 'bg-base-200 hover:bg-base-300'}`}
                  >
                    {getIcon(type)}
                    {getLabel(type)} ({count})
                  </button>
                );
              })}
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
              <AnimatePresence mode="popLayout">
                {filteredResults.map((result, idx) => (
                  <motion.div
                    key={result.id + '-' + result.type}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    layout
                  >
                    <Link
                      to={result.link}
                      onClick={() => addToHistory(query)}
                      className="group flex flex-col h-full bg-base-200/50 hover:bg-base-200 border border-base-content/5 hover:border-primary/30 rounded-[2rem] p-6 transition-all shadow-sm hover:shadow-xl"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-2xl bg-base-100 shadow-md group-hover:bg-primary group-hover:text-primary-content transition-colors`}>
                          {getIcon(result.type)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-base-content/10 px-3 py-1 rounded-full opacity-60">
                          {getLabel(result.type)}
                        </span>
                      </div>

                      <div className="flex gap-4 items-center mb-3">
                        {result.image && (
                          <img 
                            src={result.image} 
                            alt={result.title} 
                            className="w-16 h-16 rounded-xl object-cover shadow-lg border border-base-content/5"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                            {result.title}
                          </h3>
                          {result.category && (
                            <span className="text-xs text-primary font-semibold">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-base-content/60 text-sm line-clamp-3 mb-6 flex-1">
                        {result.description}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-base-content/5">
                        <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-primary">
                          {language === 'fr' ? 'Découvrir' : 'Discover'} <ArrowRight className="w-3 h-3" />
                        </span>
                        <div className="text-xs opacity-30 italic">
                          {result.id.toString().includes('page') ? '/web/page' : '#search_hit'}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            {query.length > 0 && !loading ? (
              <div className="max-w-md">
                <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Search className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  {language === 'fr' ? 'Pas encore de résultat' : 'No results yet'}
                </h3>
                <p className="text-base-content/60">
                  {language === 'fr' 
                    ? `Nous n'avons rien trouvé pour "${query}". Essayez d'autres mots-clés.` 
                    : `We couldn't find anything for "${query}". Try different keywords.`}
                </p>
              </div>
            ) : query.length > 0 && loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-xl font-bold opacity-50">Exploration de l'univers...</p>
              </div>
            ) : (
              <div className="w-full max-w-4xl space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-8 bg-base-200/30 rounded-[3rem] border border-dashed border-base-content/10 hover:border-primary/30 transition-colors">
                    <h4 className="font-extrabold text-xl flex items-center gap-2 mb-4">
                      <User className="w-6 h-6 text-primary" /> Suggestions
                    </h4>
                    <ul className="text-md space-y-3 opacity-70">
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("React")}>
                        <ArrowRight className="w-4 h-4" /> Projets React & NextJS
                      </li>
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("Gil")}>
                        <ArrowRight className="w-4 h-4" /> Qui est Gil Exaucé ?
                      </li>
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("API")}>
                        <ArrowRight className="w-4 h-4" /> Backend & APIs Rest
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-base-200/30 rounded-[3rem] border border-dashed border-base-content/10 hover:border-primary/30 transition-colors">
                    <h4 className="font-extrabold text-xl flex items-center gap-2 mb-4">
                      <Layout className="w-6 h-6 text-primary" /> Raccourcis
                    </h4>
                    <ul className="text-md space-y-3 opacity-70">
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("Contact")}>
                        <ArrowRight className="w-4 h-4" /> Me contacter directement
                      </li>
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("Blog")}>
                        <ArrowRight className="w-4 h-4" /> Lire mes derniers articles
                      </li>
                      <li className="cursor-pointer hover:text-primary transition-colors flex items-center gap-2" onClick={() => setQuery("Gallery")}>
                        <ArrowRight className="w-4 h-4" /> Voir mes designs visuels
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
