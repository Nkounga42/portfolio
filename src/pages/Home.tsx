import * as UI from "../components/UICompoents";
import HeroGeometric from "../components/HeroGeometric";
import { CustomerLogo } from "../components/customerLogo";
import { img } from "../libs/data";
import { Code2, Sparkles, Terminal, Zap } from "lucide-react";
import LetsWorkTogether from "../components/LetsWorkTogether";
import { Link } from "react-router-dom";



function Home() {
  return (
    <div className="flex flex-col gap-0 w-full overflow-hidden">
      {/* Hero Section */}
      <HeroGeometric 
        title2="Nkounga Gil Exaucé" 
      />


      {/* Section Exploration / Menu Professionnel - Navigation vers les autres pages */}
      <section className="py-24 bg-base-200/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Exploration</h2>
            <p className="text-xl opacity-70 leading-relaxed">
              Plongez plus profondément dans mon univers professionnel et découvrez comment je peux apporter de la valeur à vos projets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/portfolio/projects" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Terminal size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                Réalisations <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">Portfolio</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">Une collection de solutions numériques complexes, de l'architecture logicielle au design de l'interface.</p>
              <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Découvrir mes projets <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/experience" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Zap size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                Parcours <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">Expertise</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">Mon parcours professionnel détaillé, mes collaborations et les jalons qui ont façonné mon expertise actuelle.</p>
              <div className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Consulter mon CV <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/skills" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Code2 size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                Expertise <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">Stack</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">Une vision détaillée des technologies et outils que je maîtrise pour construire des produits d'exception.</p>
              <div className="flex items-center gap-2 text-accent font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Voir mes compétences <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/blog" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-warning/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Sparkles size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                Journal <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">Notes</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">Partage de retours d'expérience, tutoriels et réflexions sur les tendances du développement moderne.</p>
              <div className="flex items-center gap-2 text-warning font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Lire mes articles <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-sm font-bold mb-12 opacity-30 uppercase tracking-[0.6em]">Recommandé par</h2>
            <CustomerLogo />
        </div>
      </section>

      {/* Aperçu de la Galerie */}
      <section className="py-24 bg-base-100 overflow-hidden">
        <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
              Galerie <Sparkles className="text-warning" />
            </h2>
            <p className="opacity-70">Un aperçu visuel de mes inspirations et de mon univers créatif.</p>
          </div>
          <Link to="/portfolio/gallery" className="btn btn-ghost hover:bg-base-200 text-primary">Tout voir</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {img.slice(0, 10).map((src, i) => (
            <div key={i} className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg border border-base-300 group">
              <img 
                src={src} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                alt={`Visual ${i}`} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <UI.Testimonials />

      {/* Lets Work Together - Section Interactive de CTA */}
      <LetsWorkTogether />

      {/* Newsletter Section */}
      <UI.Newsletter />

      {/* Footer est maintenant géré globalement dans main.tsx */}
    </div>

  );
}

export default Home;


