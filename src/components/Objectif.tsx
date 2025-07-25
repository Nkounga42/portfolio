import { BookOpen, Code, Coffee, Laptop, Target, Zap } from "lucide-react";
const goalList = [
  {
    icon: <Target className="h-8 w-8" />,
    title: "Devenir Expert",
    description:
      "Maîtriser les technologies modernes et devenir un développeur full stack accompli d'ici 2 ans.",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "Code de Qualité",
    description:
      "Écrire du code propre, maintenable et bien testé en suivant les meilleures pratiques.",
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Apprentissage Continu",
    description:
      "Rester à jour avec les dernières technologies et tendances du développement web.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Innovation",
    description:
      "Créer des solutions créatives et innovantes pour résoudre des problèmes réels.",
  },
  {
    icon: <Laptop className="h-8 w-8" />,
    title: "Projets Impactants",
    description:
      "Développer des applications qui ont un impact positif sur la vie des utilisateurs.",
  },
  {
    icon: <Coffee className="h-8 w-8" />,
    title: "Équilibre Vie-Code",
    description:
      "Maintenir une passion pour le code tout en gardant un équilibre de vie sain.",
  },
];

const goalContent = "Déterminé à acquérir une expérience professionnelle significative dans un environnement stimulant. Je désire contribuer activement à des projets tout en mettant à profit mes compétences dans le développement professionnel et personnel."
const Objectif = () => {
  return (
    <section className="py-20 flex items-center pb-30 mt-10 my-0 w-full bg-base-300 ">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Mes Objectifs</h2>
          <p className="text-lg max-w-2xl mx-auto opacity-80">
            {goalContent}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {goalList.map((goal, index) => (
            <div key={index} className="card bg-base-100  ">
              <div className="card-body items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-lg mb-4">
                  {goal.icon}
                </div>
                <h3 className="card-title">{goal.title}</h3>
                <p className="opacity-70">{goal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Objectif;
