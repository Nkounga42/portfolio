import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as icons from "../components/skills-icons";
import { Link } from "react-router-dom";

const categories = {
  All: [
    "react_native",
    "javascript",
    "c_sharp",
    "expo",
    "nodejs",
    "python",
    "typescript",
    "bootstrap",
    "tailwindcss",
    "html",
    "css",
    "radzen_og",
    "chromium",
    "blazor",
    "dotnet",
    "express_js",
    "firebase",
    "mysql_logo",
    "figma",
    "adobe_xd",
    "lunacy",
    "adobe_illustrator",
    "adobe_photoshop",
    "adobe_premiere_pro",
    "google_colab",
    "git",
    "codepen",
  ],

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
  Base_de_donnees: ["mysql", "firebase"],
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

const tabs = Object.keys(categories);

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Frontend");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
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

  return (
    <section className="pb-20 pt-10 bg-base-100 flex flex-col items-center">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-left mb-6">
          <h2 className="text-4xl font-bold mb-4">Mes Compétences</h2>
          <p className="text-lg max-w-2xl opacity-80">
            Voici les technologies et outils que j'ai appris et utilisés dans
            mes projets académiques et personnels.
          </p>
        </div>

        {/* Tabs */}
        <div className="relative flex gap-3 pt-2 mb-6 border-b border-base-content/10 overflow-y-hidden overflow-x-visible">
          {tabs.map((tab, i) => (
            <Link
              to={`#${tab}`}
              key={tab}
              ref={(el) => (tabRefs.current[i] = el)}
              className={`pb-2 px-4 text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                tab === activeTab
                  ? "text-primary"
                  : "text-base-content/60 hover:text-base-content"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Link>
          ))}
          <motion.div
            className="absolute bottom-0 h-[2px] bg-primary headerIndicator"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={indicator}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {displayedSkills.map(({ name, icon, url }, i) => (
            <div
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
