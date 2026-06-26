import * as UI from "../components/UICompoents";
import HeroGeometric from "../components/HeroGeometric";
import { CustomerLogo } from "../components/customerLogo";
import { img } from "../libs/data";
import { Code2, Sparkles, Terminal, Zap } from "lucide-react";
import LetsWorkTogether from "../components/LetsWorkTogether";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import RainbowCard from "../components/RainbowCard";

function Home() {
  const { t } = useLanguage();
  const h = t.home;

  return (
    <div className="flex flex-col gap-0 w-full overflow-hidden">
      {/* Hero Section */}
      <HeroGeometric
        title2="Nkounga Gil Exaucé"
      />
      {/* Partenaires */}
      <section className="pb-10 pt-0  bg-base-100 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-sm font-bold  opacity-30 uppercase tracking-[0.6em]">{h.recommendedBy}</h2>
          <CustomerLogo />
        </div>
      </section>

      {/* Section Exploration / Menu Professionnel - Navigation vers les autres pages */}
      <section className="py-26 bg-base-300 ">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{h.explorationTitle}</h2>
            <p className="text-xl opacity-70 leading-relaxed">
              {h.explorationSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link to="/portfolio/projects" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Terminal size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                {h.projectsTitle} <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">{h.projectsLabel}</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">{h.projectsDesc}</p>
              <div className="flex items-center gap-2 text-[#00c950] font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                {h.projectsCta} <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/experience" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-secondary/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                {h.experienceTitle} <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">{h.experienceLabel}</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">{h.experienceDesc}</p>
              <div className="flex items-center gap-2 text-secondary font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                {h.experienceCta} <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/skills" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                {h.skillsTitle} <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">{h.skillsLabel}</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">{h.skillsDesc}</p>
              <div className="flex items-center gap-2 text-accent font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                {h.skillsCta} <span>→</span>
              </div>
            </Link>

            <Link to="/portfolio/blog" className="group relative p-10 rounded-3xl bg-base-100 border border-base-300 overflow-hidden transition-all hover:shadow-2xl hover:shadow-warning/5 hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} />
              </div>
              <h3 className="text-3xl font-bold mb-4 flex items-center gap-3">
                {h.blogTitle} <span className="text-sm font-normal opacity-50 px-3 py-1 rounded-full border border-base-300">{h.blogLabel}</span>
              </h3>
              <p className="opacity-70 text-lg mb-8 max-w-sm">{h.blogDesc}</p>
              <div className="flex items-center gap-2 text-warning font-bold group-hover:gap-4 transition-all uppercase tracking-widest text-sm">
                {h.blogCta} <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>


 
      {/* Témoignages */}
      <UI.Testimonials />
 
      {/* Newsletter Section */}
      <UI.Newsletter />

      {/* Footer est maintenant géré globalement dans main.tsx */}
    </div>

  );
}

export default Home;
