import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../tools/supabase";
import { ExternalLink, Github } from "lucide-react";
import HeroSection from "../components/HeroSection";

export default function Projects() {
  const [allProjects, setAllProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const tabs = ["All", "Web App", "Desktop", "Mobile", "API", "Illustration"];

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        setAllProjects(data);
      }
      setLoading(false);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    const currentTab = tabRefs.current[index];
    if (currentTab) {
      setIndicator({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeTab]);

  const displayedProjects = activeTab === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeTab);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: i * 0.02,
        ease: [0.2, 0.4, 0.9, 1],
      },
    }),
  };



  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.03 + i * 0.2,
        ease: [0.2, 0.4, 0.9, 1],
      },
    }),
  };

  return (
    <section className="pb-20  bg-base-100 flex flex-col items-center min-h-screen">
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="mb-8 w-full border-b-2 border-base-300 "
      >
        <HeroSection
          title="Mes Projets"
          content="Découvrez mes réalisations, du design à la production, avec un focus sur l'expérience utilisateur et la qualité technique."
          link="/portfolio/contact"
          buttonText="Travaillons ensemble"
        >
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="relative mx-auto px-4 max-w-5xl flex gap-3 pt-2 "
          >
            {tabs.map((tab, i) => (
              <Link
                to={`#${tab}`}
                key={tab}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                className={`pb-2 px-4 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${tab === activeTab
                  ? "text-primary"
                  : "text-base-content/60 hover:text-base-content"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                <div>
                  {tab.replace(/_/g, " ")}
                </div>
              </Link>
            ))}
            <motion.div
              className="absolute bottom-0 h-[2px] bg-primary headerIndicator"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={indicator}
            />
          </motion.div>
        </HeroSection>


      </motion.div>
      <div className="container mx-auto px-4 max-w-5xl mt-5">

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            {/* Tabs */}


            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProjects.map((projet, i) => (
                <motion.div
                  custom={i / 3}
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  key={projet.id}
                  className="bg-base-200/20  border border-base-content/10 rounded-xl overflow-hidden transition-transform hover:scale-102 group  cursor-pointer transition-all hover:border-primary/10 hover:shadow-xl"
                >
                  {/* Project Image */}
                  <div className="relative h-38 overflow-hidden">
                    <img
                      src={projet.imagesIllustration?.[0] || "https://via.placeholder.com/400x200"}
                      alt={projet.nom}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
                      }}
                      className="w-full h-full object-cover group-hover:scale-100 scale-105 transition-transform duration-300"
                    />
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4 z-10 absolute bottom-0 left-4">
                      {projet.technologies?.slice(0, 2).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-base-300/20 backdrop-blur-sm text-base-100 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                      {projet.technologies?.length > 2 && (
                        <span className="px-2 py-1 bg-base-300/20 backdrop-blur-sm text-base-100 rounded-full text-xs">
                          +{projet.technologies.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold transition-colors">
                        {projet.nom}
                      </h3>
                      <span className="badge badge-soft badge-sm">
                        {projet.category}
                      </span>
                    </div>

                    <p className="text-sm text-base-content/70 mb-4 line-clamp-3 truncate">
                      {projet.description}
                    </p>


                    {/* Date and Role */}
                    {/* <div className="flex items-center gap-4 text-xs text-base-content/60 mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {new Date(projet.dateCreation).getFullYear()}
                  </div>
                  <div>{projet.Roles}</div>
                </div> */}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/portfolio/projects/${projet.slug}`}
                        className="btn btn-primary btn-sm"
                      >
                        Voir le projet
                      </Link>

                      <div className="flex gap-2">
                        {projet.repository_link && (
                          <a
                            href={projet.repository_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm btn-square"
                            title="Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {projet.page_link && (
                          <a
                            href={projet.page_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-ghost btn-sm btn-square"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {displayedProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-base-content/60">
                  Aucun projet trouvé dans cette catégorie.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
