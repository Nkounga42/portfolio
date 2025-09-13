import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as icons from "../components/skills-icons";
import { Link } from "react-router-dom";
import { categories , socialLinks } from "../libs/data";
 

const tabs = Object.keys(categories);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

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

  const displayedSkills = categories[activeTab]
    .map((key) => ({
      name: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      icon: icons[key as keyof typeof icons],
      url: socialLinks[key],
    }))
    .filter((skill) => !!skill.icon);
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: i * 0.05,
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
    <section className="pb-20 pt-10 bg-base-100 flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-left mb-6">
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-4xl font-bold mb-4">Mes Compétences</h2>
          </motion.div>
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-lg max-w-2xl opacity-80">
              Voici les technologies et outils que j'ai appris et utilisés dans
              mes projets académiques et personnels.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
           className="relative flex gap-3 pt-2 mb-6 border-b border-base-content/10 overflow-y-hidden overflow-x-visible">
          {tabs.map((tab, i) => (
            <Link
              to={`#${tab}`}
              key={tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className={`pb-2 px-4 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                tab === activeTab
                  ? "text-primary"
                  : "text-base-content/60 hover:text-base-content"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <div 
              >
                {tab
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
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
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayedSkills.map(({ name, icon, url }, i) => (
            <motion.div
              custom={i / 3}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              key={i}
              className="flex flex-col items-center justify-center bg-base-100 bg-base-200/20  p-4 rounded-xl  transition-transform hover:scale-105"
            >
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={icon}
                    alt={name}
                    className="w-14 h-14 object-contain"
                  />
                </a>
              ) : (
                <img
                  src={icon}
                  alt={name}
                  className="w-14 h-14 object-contain"
                />
              )}
              <p className="mt-2 text-center text-sm font-medium">{name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
