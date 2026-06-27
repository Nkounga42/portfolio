import { Search, Loader2, BookOpen, Layout, MessageSquare, Image as ImageIcon, FileText, ArrowRight, X, User, History, Trash2, Sparkles, Clock } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
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
  raw?: any;
}

const STATIC_PAGES = [
  { title: "Accueil", title_en: "Home", description: "Page d'accueil de mon portfolio professionnel.", description_en: "Homepage of my professional portfolio.", link: "/portfolio/", keywords: ["home", "accueil", "bienvenue", "welcome", "index"] },
  { title: "À propos", title_en: "About", description: "Découvrez mon parcours, mes compétences et ma vision.", description_en: "Learn about my journey, skills, and vision.", link: "/portfolio/about", keywords: ["about", "propos", "parcours", "bio", "qui suis-je", "who am i", "cv", "resume"] },
  { title: "Contact", title_en: "Contact", description: "Besoin d'un projet ? Contactez-moi pour en discuter.", description_en: "Need a project? Contact me to discuss.", link: "/portfolio/contact", keywords: ["contact", "email", "message", "travailler ensemble", "work together", "hire", "recruter"] },
  { title: "Projets", title_en: "Projects", description: "Liste complète de mes réalisations et projets.", description_en: "Full list of my achievements and projects.", link: "/portfolio/projects", keywords: ["projects", "projets", "portfolio", "réalisations", "work", "apps", "web", "mobile"] },
  { title: "Blog", title_en: "Blog", description: "Articles sur le développement, le design et mes idées.", description_en: "Articles on development, design, and ideas.", link: "/portfolio/blog", keywords: ["blog", "articles", "news", "nouvelles", "pensées", "thoughts", "tuto"] },
  { title: "Galerie", title_en: "Gallery", description: "Une collection visuelle de mes créations et inspirations.", description_en: "A visual collection of my creations and inspirations.", link: "/portfolio/gallery", keywords: ["gallery", "galerie", "images", "photos", "visual", "visuel", "design", "ui", "ux"] },
];

const HISTORY_KEY = 'portfolio_search_history';

const SUGGESTIONS = [
  { label: "Projets React & NextJS", query: "React" },
  { label: "Qui est Nkounga Exaucé ?", query: "Nkounga Exaucé" },
  { label: "Backend & APIs Rest", query: "API" }
];

export default function SearchPage() {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ResultType | 'all'>('all');
  const [history, setHistory] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      const newHistory = [q.trim(), ...filtered].slice(0, 8);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const removeFromHistory = (q: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory(prev => {
      const newHistory = prev.filter(item => item !== q);
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
    const lowSearch = searchTerm.toLowerCase();

    try {
      // 1. Search Static Pages (Local)
      const pageResults: SearchResult[] = STATIC_PAGES
        .filter(p =>
          p.title.toLowerCase().includes(lowSearch) ||
          p.title_en.toLowerCase().includes(lowSearch) ||
          p.keywords.some(k => k.includes(lowSearch))
        )
        .map(p => ({
          id: `page-${p.link}`,
          type: 'page',
          title: language === 'fr' ? p.title : p.title_en,
          description: language === 'fr' ? p.description : p.description_en,
          link: p.link
        }));

      // 2. Fetch Data from Supabase
      const [
        { data: blogs },
        { data: projects },
        { data: testimonials },
        { data: gallery }
      ] = await Promise.all([
        supabase.from('blog_posts').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('gallery').select('*')
      ]);

      const blogResults: SearchResult[] = (blogs || [])
        .filter(b =>
          b.title?.toLowerCase().includes(lowSearch) ||
          b.summary?.toLowerCase().includes(lowSearch) ||
          b.content?.toLowerCase().includes(lowSearch) ||
          b.category?.toLowerCase().includes(lowSearch)
        )
        .map(b => ({
          id: b.id,
          type: 'blog',
          title: b.title,
          description: b.summary || '',
          link: `/portfolio/blog/${b.slug}`,
          category: b.category,
          image: b.cover_image
        }));

      const projectResults: SearchResult[] = (projects || [])
        .filter(p =>
          p.nom?.toLowerCase().includes(lowSearch) ||
          p.description?.toLowerCase().includes(lowSearch) ||
          p.readme?.toLowerCase().includes(lowSearch) ||
          p.category?.toLowerCase().includes(lowSearch) ||
          (p.technologies && Array.isArray(p.technologies) && p.technologies.some((t: any) => t.toLowerCase().includes(lowSearch))) ||
          (typeof p.technologies === 'string' && p.technologies.toLowerCase().includes(lowSearch))
        )
        .map(p => ({
          id: p.id,
          type: 'project',
          title: p.nom,
          description: p.description || '',
          link: `/portfolio/projects/${p.slug}`,
          category: p.category,
          image: p.image || (p.imagesIllustration && p.imagesIllustration[0])
        }));

      const testimonialResults: SearchResult[] = (testimonials || [])
        .filter(t =>
          t.name?.toLowerCase().includes(lowSearch) ||
          t.message?.toLowerCase().includes(lowSearch)
        )
        .map(t => ({
          id: t.id,
          type: 'testimonial',
          title: t.name,
          description: t.message || '',
          link: `/portfolio/#testimonials`,
          image: t.image
        }));

      const galleryResults: SearchResult[] = (gallery || [])
        .filter(g =>
          g.title?.toLowerCase().includes(lowSearch) ||
          g.description?.toLowerCase().includes(lowSearch) ||
          g.category?.toLowerCase().includes(lowSearch)
        )
        .map(g => ({
          id: g.id,
          type: 'gallery',
          title: g.title,
          description: g.description || '',
          link: `/portfolio/gallery`,
          category: g.category,
          image: g.image_url
        }));

      const allResults = [
        ...pageResults,
        ...blogResults,
        ...projectResults,
        ...testimonialResults,
        ...galleryResults
      ];

      setResults(allResults);

    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query.trim());
      } else if (query.length === 0) {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const handleSuggestionClick = (val: string) => {
    setQuery(val);
    setShowDropdown(false);
    addToHistory(val);
  };

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

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 flex flex-col overflow-x-hidden">
      {/* Search Header */}
      <div className="pattern-flower pt-24 pb-12 px-4 shadow-inner ">
        <div className="max-w-4xl mx-auto  z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <h1 className="text-2xl  font-bold text-white mb-2 drop-shadow-xl text-center md:text-left">
              {language === 'fr' ? 'Recherche Globale' : 'Global Search'}
            </h1>
            <p className="text-white/70 text-lg  text-center md:text-left font-medium">
              {language === 'fr'
                ? 'Explorez mes projets, articles et réalisations...'
                : 'Explore my projects, articles and achievements...'}
            </p>
          </motion.div>

          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-base-content/30 group-focus-within:text-primary transition-all scale-110 z-99">
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                autoFocus
                onFocus={() => setShowDropdown(true)}
                className="w-full h-12 pl-16 pr-6  bg-base-100/60 backdrop-blur-xl border-2 border-transparent focus:border-primary/50 rounded-[2.5rem] outline-none shadow-2xl transition-all placeholder:text-base-content/30 z-20 sticky"
                placeholder={language === 'fr' ? 'Rechercher quelque chose...' : 'Search for something...'}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.length >= 2) {
                    addToHistory(query);
                    setShowDropdown(false);
                  }
                }}
              />

              {query && (
                <button
                  onClick={() => { setQuery(""); setShowDropdown(true); }}
                  className="absolute inset-y-0 right-6 flex items-center text-base-content/40 hover:text-error transition-all z-30"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              {/* CHROME-LIKE DROPDOWN */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  >
                    <div
                      className="absolute top-full left-0 right-0 mt-3 bg-base-100/60 backdrop-blur-xl  rounded-[2rem] shadow  border border-base-content/5 overflow-hidden z-150 "

                    >

                      {/* Recent History Section */}
                      {history.length > 0 && (
                        <div className="mb-2">
                          <div className="px-6 py-3 flex justify-between items-center opacity-40">
                            <span className="text-[10px] font-black uppercase tracking-widest">{language === 'fr' ? 'Recherches récentes' : 'Recent searches'}</span>
                            <button onClick={clearHistory} className="text-[10px] uppercase font-black hover:text-error">{language === 'fr' ? 'Effacer tout' : 'Clear all'}</button>
                          </div>
                          {history.map((h, i) => (
                            <div
                              key={i}
                              onClick={() => handleSuggestionClick(h)}
                              className="group flex items-center justify-between px-6 py-3 hover:bg-base-200 cursor-pointer rounded-2xl transition-all mx-1"
                            >
                              <div className="flex items-center gap-4">
                                <History className="w-4 h-4 text-base-content/20 group-hover:text-primary" />
                                <span className="font-bold text-base-content/80 group-hover:text-base-content">{h}</span>
                              </div>
                              <button
                                onClick={(e) => removeFromHistory(h, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:text-error transition-all"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Suggestions Section */}
                      <div>
                        <div className="px-6 py-3 opacity-40">
                          <span className="text-[10px] uppercase">{language === 'fr' ? 'Suggestions' : 'Suggestions'}</span>
                        </div>
                        {SUGGESTIONS.map((s, i) => (
                          <div
                            key={i}
                            onClick={() => handleSuggestionClick(s.query)}
                            className="group flex items-center gap-4 px-6 py-2 hover:bg-base-200 cursor-pointer rounded-md xl transition-all mx-1"
                          >
                            <Search className="w-4 h-4 text-primary/30 group-hover:text-primary" />
                            <span className="text-base-content/80 group-hover:text-base-content">{s.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer / Shortcut */}
                      <div className="bg-base-200/50 p-3 mt-2 text-center">
                        <p className="text-[10px] opacity-30 flex items-center justify-center gap-2">
                          <Clock className="w-3 h-3" /> Appuyez sur Entrer pour rechercher
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Results */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 ">
        {results.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-2 mb-12 overflow-x-auto pb-4 scrollbar-none"
            >
              <button
                onClick={() => setActiveTab('all')}
                className={`px-8 py-3 rounded-full text-xs transition-all ${activeTab === 'all' ? 'bg-primary text-primary-content shadow-2xl scale-105' : 'bg-base-200 hover:bg-base-300 opacity-60'}`}
              >
                {language === 'fr' ? 'Tout' : 'All'} <span className="opacity-40 ml-2">{results.length}</span>
              </button>
              {(['page', 'blog', 'project', 'testimonial', 'gallery'] as ResultType[]).map(type => {
                const count = results.filter(r => r.type === type).length;
                if (count === 0) return null;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveTab(type)}
                    className={`px-8 py-3 rounded-full text-xs flex items-center gap-2 transition-all ${activeTab === type ? 'bg-primary text-primary-content shadow-2xl scale-105' : 'bg-base-200 hover:bg-base-300 opacity-60'}`}
                  >
                    {getIcon(type)}
                    {getLabel(type)} <span className="opacity-40 ml-2">{count}</span>
                  </button>
                );
              })}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-40">
              <AnimatePresence mode="popLayout">
                {filteredResults.map((result, idx) => (
                  <motion.div
                    key={result.id + '-' + result.type}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    layout
                  >
                    <Link
                      to={result.link}
                      onClick={() => addToHistory(query)}
                      className="group flex flex-col h-full bg-base-200 hover:bg-base-200/80 border border-base-content/5 hover:border-primary/20 rounded-[3rem] p-8 transition-all shadow-sm hover:shadow-2xl  overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-[1.5rem] bg-base-100 shadow-lg group-hover:bg-primary group-hover:text-primary-content transition-all duration-500`}>
                          {getIcon(result.type)}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-base-content/5 px-5 py-2 rounded-full opacity-40">
                          {getLabel(result.type)}
                        </span>
                      </div>

                      <div className="flex gap-6 items-center mb-6">
                        {result.image && (
                          <div className="flex-shrink-0">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="w-24 h-24 rounded-[2rem] object-cover shadow-2xl border-2 border-base-content/5 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl md:text-3xl font-black group-hover:text-primary transition-colors line-clamp-1 mb-2">
                            {result.title}
                          </h3>
                          {result.category && (
                            <span className="text-[10px] text-primary font-black uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-base-content/50 text-md leading-relaxed line-clamp-3 mb-10 flex-1 font-medium">
                        {result.description}
                      </p>

                      <div className="flex items-center justify-between pt-8 border-t border-base-content/5">
                        <span className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 text-primary group-hover:translate-x-3 transition-all duration-300">
                          {language === 'fr' ? 'Découvrir' : 'Discover'} <ArrowRight className="w-5 h-5" />
                        </span>
                        <div className="text-[10px] font-mono opacity-20 uppercase">
                          REC: {idx + 1}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {query.length > 2 && !loading ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md"
              >
                <div className="w-32 h-32 bg-base-200 rounded-[3rem] flex items-center justify-center mb-10 mx-auto shadow-inner">
                  <Search className="w-14 h-14 opacity-10 " />
                </div>
                <h3 className="text-3xl font-semibold mb-4">
                  {language === 'fr' ? 'Silence Radio...' : 'Radio Silence...'}
                </h3>
                <p className="text-base-content/40 text-lg px-10">
                  {language === 'fr'
                    ? `Nous n'avons rien trouvé pour "${query}". Essayez un terme plus générique.`
                    : `We couldn't find anything for "${query}". Try a more generic term.`}
                </p>
                <button onClick={() => setQuery("")} className="mt-8 btn btn-ghost btn-sm border-2 border-base-content P6' rounded-full opacity-60 hover:opacity-100 text-sm ">
                  Réinitialiser
                </button>
              </motion.div>
            ) : query.length > 0 && loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-4 opacity-20" />
                <p className="text-xl  opacity-10 animate-pulse ">Scan...</p>
              </div>
            ) : (
              <div className="w-full max-w-4xl py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="text-left space-y-6">
                    <h4 className="text-4xl font-black opacity-10 uppercase tracking-tighter leading-none">Explore<br />Design<br />Build</h4>
                    <p className="text-base-content/30 font-medium text-lg max-w-xs">{language === 'fr' ? 'Utilisez la barre de recherche pour naviguer rapidement à travers mon univers créatif.' : 'Use the search bar to quickly navigate through my creative universe.'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['React', 'UI', 'Mobile', 'Node'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleSuggestionClick(tag)}
                        className="h-24 bg-base-200/30 hover:bg-primary/10 rounded-[2rem] border border-dashed border-base-content/10 flex items-center justify-center font-black uppercase tracking-widest text-xs transition-all hover:scale-105 hover:border-primary/50 group"
                      >
                        <span className="opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all">{tag}</span>
                      </button>
                    ))}
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
