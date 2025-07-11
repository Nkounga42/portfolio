import {
  Code,
  BookOpen,
  Laptop,
  Coffee,
  Target,
  Zap,
  Download,
} from "lucide-react";
import { motion } from "motion/react";
import * as UI from "../components/UICompoents";
import { Link } from "react-router-dom";



export default function About() {
  return (
    <div className=" ">
      <div className="min-h-screen flex items-center flex-col">
        <ProfileCard />

        {/* Statistiques */}
        <section className="py-10 mb-10 max-w-4xl ">
          <div className="container mx-auto px-4">
            <div className="stats stats-vertical lg:stats-horizontal  w-full">
              <div className="stat">
                <div className="stat-value text-primary font-medium text-4xl mb-2">
                  15+
                </div>
                <div className="stat-title">Projets Réalisés</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary font-medium text-4xl mb-2">
                  9
                </div>
                <div className="stat-title">Technologies Maîtrisées</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary font-medium text-4xl mb-2">
                  2
                </div>
                <div className="stat-title">Années d'Études</div>
              </div>
              <div className="stat">
                <div className="stat-value text-primary font-medium text-4xl mb-2">
                  500+
                </div>
                <div className="stat-title">Heures de Code</div>
              </div>
            </div>
          </div>
        </section>

        {/* Formation & Expérience */}
        <section className="py-20  ">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Formation & Expérience
              </h2>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                Mon parcours académique et mes expériences pratiques en
                développement.
              </p>
            </div>
            <UI.Timeline />
            {/* <div className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono italic">2024 - Présent</time>
              <div className="text-lg font-black">
                3ème Année - Licence Informatique
              </div>
              <div className="opacity-80">
                Université de Technologie - Spécialisation Développement Web
              </div>
              <div className="mt-2">
                <div className="badge badge-primary">En cours</div>
              </div>
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />

            <hr />
            <div className="timeline-end mb-10">
              <time className="font-mono italic">Été 2024</time>
              <div className="text-lg font-black">Stage Développeur Web</div>
              <div className="opacity-80">TechStart Solutions - 2 mois</div>
              <div className="mt-2">
                <div className="badge badge-success">Terminé</div>
              </div>
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />

            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono italic">2022 - 2024</time>
              <div className="text-lg font-black">DUT Informatique</div>
              <div className="opacity-80">IUT de Lyon - Mention Bien</div>
              <div className="mt-2">
                <div className="badge badge-success">Diplômé</div>
              </div>
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L7.53 10.53a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr />
          </div> */}
          </div>
        </section>
</div>
        {/* Section Contact */}
        <section className="py-20   ">
          <div className="container mx-auto px-4">
            <div className="hero bg-primary rounded-3xl">
              <div className="hero-content text-center text-primary-content py-12">
                <div className="max-w-2xl">
                  <h2 className="text-4xl font-bold mb-4">
                    Travaillons Ensemble !
                  </h2>
                  <p className="text-lg mb-8 opacity-90">
                    Je suis toujours ouvert aux opportunités de stage, projets
                    collaboratifs ou simplement pour discuter de technologie.
                    N'hésitez pas à me contacter !
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="rounded-full btn  text-base-content btn-lg">
                      Me Contacter
                    </button>
                    <button className="rounded-full btn btn-outline btn-lg text-primary-content -primary-content hover:border-primary-content hover:bg-primary-content hover:text-primary">
                      Voir LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
        <UI.Footer />
    </div>
  );
}

const ProfileCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-6  rounded-xl flex flex-col gap-4">
      {/* Avatar and Header */}
      <div className="flex items-start gap-4 mt-15 ">
        <div className="avatar">
          <div className="mask mask-squircle w-50">
            <img src="../../public/image.jpg" />
          </div>
        </div>
        <div className="ml-5">
          <h1 className="text-xl font-semibold  mb-5">
            Moi c'est Nkounga Exaucé -
            <span className="text-base-content/70 mx-1">
              Je suis un développeur full-stack en formation à ESCIC , je crée
              des solutions numériques complètes, du backend à l’interface
              utilisateur. Je cherche à relever des défis concrets pour mettre
              mes compétences en pratique.
            </span>
          </h1>
          <p className="text-gray-400 font-medium">
            Actuellement chez{" "}
            <Link to={"https://www.xn--wilka-gta.com/"}>Wilkaî</Link>.
          </p>
          {/* Description */}
          <p className="text-sm text-gray-500 mb-8">
            Je m'intéresse à la création d'outils numériques utiles qui
            améliorent l'expérience utilisateur et facilitent le travail des
            créateurs. Curieux et motivé, je cherche à concevoir des solutions
            qui allient efficacité et créativité.
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mb-8 ">
            {/* Audio Player and Status */}
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
                Disponible pour travailler
              </span>
            </motion.div>
            <motion.div
              className="flex text-sm text-base-content tracking-wide px-3 py-2 mx-3 rounded-full cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-5 w-5 mr-1" />
              Télécharger mon CV
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
