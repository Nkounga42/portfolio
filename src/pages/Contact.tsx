import LetsWorkTogether from "../components/LetsWorkTogether";
import * as UI from "../components/UICompoents";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import * as icons from "../components/skills-icons";
import { categories, socialLinks } from "../libs/data";


const Contact = () => {
   const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) { 
        // Attend que le DOM soit prêt
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // petit délai pour être sûr que l'élément existe
      }
    }
  }, [location]);
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <>
      <LetsWorkTogether />
      <UI.Getintouch />
      
      {/* Social Links Section */}
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="py-16 bg-base-100"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Retrouvez-moi sur</h2>
            <p className="text-lg opacity-80">
              Connectons-nous sur les réseaux sociaux et plateformes professionnelles
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {categories.Social.map((socialKey, i) => {
              const icon = icons[socialKey as keyof typeof icons];
              const url = socialLinks[socialKey];
              const name = socialKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
              
              if (!icon) return null;
              
              return (
                <motion.div
                  key={socialKey}
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.3 + i * 0.1,
                        ease: [0.25, 0.4, 0.25, 1],
                      },
                    }),
                  }}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center bg-base-200/30 hover:bg-base-200/50 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[120px]"
                >
                  {url ? (
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex flex-col items-center"
                    >
                      <img
                        src={icon}
                        alt={name}
                        className="w-12 h-12 object-contain mb-3"
                      />
                      <p className="text-center text-sm font-medium text-base-content/80 hover:text-primary transition-colors">
                        {name}
                      </p>
                    </a>
                  ) : (
                    <>
                      <img
                        src={icon}
                        alt={name}
                        className="w-12 h-12 object-contain mb-3"
                      />
                      <p className="text-center text-sm font-medium text-base-content/80">
                        {name}
                      </p>
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      
      {/* <UI.HeroSection /> */}
      <UI.Newsletter />
    </>
  );
};

export default Contact;
