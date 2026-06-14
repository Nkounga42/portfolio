import { Download } from "lucide-react";
import { motion } from "motion/react";
import * as UI from "../components/UICompoents";
import { Link } from "react-router-dom";
import img from "../../public/image.jpg";
import { handleDowload } from "../tools/tools";
import { useLanguage } from "../hooks/useLanguage";

// import {SocialLogo} from "../components/customerLogo";

export default function About() {
  const { language } = useLanguage();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className=" ">
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <ProfileCard />
      </motion.div>

      {/* <SocialLogo/> */}
      <div className="min-h-screen flex items-center flex-col">
        <motion.div
        custom={2}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >

        <UI.Objectif />
      </motion.div>
        <section className="py-20  ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {language === "fr" ? "Formation & Expérience" : "Education & Experience"}
              </h2>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                {language === "fr"
                  ? "Mon parcours académique et mes expériences pratiques en développement."
                  : "My academic journey and practical development experiences."}
              </p>
            </div>
            <UI.Timeline />
          </div>
        </section>
      </div>
      <section className="py-40 bg-base-100 ">
        <div className="container mx-auto px-4 flex justify-center ">
          <div className="hero rounded-3xl max-w-4xl">
            <div className="hero-content text-center text-base-content py-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">
                  {language === "fr" ? "Travaillons Ensemble !" : "Let's Work Together!"}
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  {language === "fr"
                    ? "Je suis toujours ouvert aux opportunités de stage, projets collaboratifs ou simplement pour discuter de technologie. N'hésitez pas à me contacter !"
                    : "I'm always open to internship opportunities, collaborative projects, or simply to discuss technology. Feel free to reach out!"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link className="rounded-full btn  text-base-content btn-lg hover:bg-base-content hover:text-base-200"
                  to='/contact#contactfield'
                  >
                    {language === "fr" ? "Me Contacter" : "Contact Me"}
                  </Link>
                  <Link className="rounded-full btn btn-outline btn-lg text-base-content -primary-content hover:border-base-content hover:bg-base-content hover:text-base-200"
                  to="www.linkedin.com/in/exaucé-nkounga-b99ab9401"
                  >
                    {language === "fr" ? "Voir LinkedIn" : "View LinkedIn"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className=" flex items-center flex-col">
        {/* <InfiniteScroll items={Array.from({ length: 10 }, (v, i) => i)} /> */}
      </div>
    </div>
  );
}

const ProfileCard = () => {
  const viableToWork = false;
  const { language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6  rounded-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row  sm:items-start items-center  justify-center gap-6 mt-6">
        <div className="avatar align-top sm:mb-5">
          <div className="mask mask-squircle w-50">
            <img src={img} />
          </div>
        </div>
        <div className="ml-5">
          <h1 className="text-xl font-semibold  mb-5">
            {language === "fr" ? "Moi c'est Nkounga Exaucé" : "Hi, I'm Nkounga Exaucé"} -
            <span className="text-base-content/70 mx-1">
              {language === "fr"
                ? "Je suis un développeur full-stack en formation à ESCIC , je crée des solutions numériques complètes, du backend à l'interface utilisateur. Je cherche à relever des défis concrets pour mettre mes compétences en pratique."
                : "I'm a full-stack developer in training at ESCIC, building complete digital solutions from backend to user interface. I seek concrete challenges to put my skills into practice."}
            </span>
          </h1>
          <p className="text-gray-400 font-medium">
            {language === "fr" ? "Actuellement chez" : "Currently at"}{" "}
            <Link to={"https://www.xn--wilka-gta.com/"}>Wilkaî</Link>.
          </p>
          {/* Description */}
          <p className="text-sm text-gray-500 mb-8">
            {language === "fr"
              ? "Je m'intéresse à la création d'outils numériques utiles qui améliorent l'expérience utilisateur et facilitent le travail des créateurs. Curieux et motivé, je cherche à concevoir des solutions qui allient efficacité et créativité."
              : "I'm interested in building useful digital tools that improve user experience and empower creators. Curious and motivated, I seek to design solutions that combine efficiency and creativity."}
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-8 ">
            {viableToWork && (
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 via-rose-500/20 to-amber-500/20 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {}}
                animate={{
                  background: [
                    "linear-gradient(90deg, rgba(99, 101, 241, 0.66) 0%, rgba(244,114,182,0.5) 50%, rgba(251,191,36,0.5) 100%)",
                    "linear-gradient(90deg, rgba(251,191,36,0.5) 0%, rgba(99,102,241,0.5) 50%, rgba(244,114,182,0.5) 100%)",
                    "linear-gradient(90deg, rgba(244,114,182,0.5) 0%, rgba(251,191,36,0.5) 50%, rgba(99,102,241,0.5) 100%)",
                    "linear-gradient(90deg, rgba(99,102,241,0.5) 0%, rgba(244,114,182,0.5) 50%, rgba(251,191,36,0.5) 100%)",
                  ],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <span className="text-sm text-base/90 tracking-wide">
                  {language === "fr" ? "Disponible pour travailler" : "Available for work"}
                </span>
              </motion.div>
            )}
            <motion.div
              className="flex text-sm text-base-content tracking-wide px-3 py-2 m x-3 rounded-full cursor-pointer hover:text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDowload(language)}
            >
              <Download className="h-5 w-5 mr-1" />
              {language === "fr" ? "Voir mon CV" : "View my Resume"}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
