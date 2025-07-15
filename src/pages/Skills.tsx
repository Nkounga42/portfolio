const Skills = () => {
  return (
    <section className="py-20 bg-base-100 flex-col flex items-center">
      <div className="container mx-auto px-4 max-w-5xl ">
        <div className="text-left mb-16 ">
          <h2 className="text-4xl font-bold mb-4">Mes Compétences</h2>
          <p className="text-lg max-w-2xl   opacity-80">
            Voici les technologies et outils que j'ai appris et utilisés dans
            mes projets académiques et personnels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              category: "Frontend",
              skills: [
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "HTML/CSS",
              ],
              level: "Avancé",
              color: "badge-primary",
            },
            {
              category: "Backend",
              skills: ["Node.js", "Express", "Python", "Django", "API REST"],
              level: "Intermédiaire",
              color: "badge-secondary",
            },
            {
              category: "Base de Données",
              skills: ["MongoDB", "PostgreSQL", "MySQL", "Prisma", "Supabase"],
              level: "Intermédiaire",
              color: "badge-accent",
            },
            {
              category: "Outils & DevOps",
              skills: ["Git", "GitHub", "Docker", "Vercel", "VS Code"],
              level: "Avancé",
              color: "badge-info",
            },
            {
              category: "Mobile",
              skills: ["React Native", "Expo", "Flutter (débutant)"],
              level: "Débutant",
              color: "badge-warning",
            },
            {
              category: "Autres",
              skills: ["Figma", "Photoshop", "Agile/Scrum", "Tests unitaires"],
              level: "Intermédiaire",
              color: "badge-success",
            },
          ].map((skillSet, index) => (
            <div key={index} className="card bg-base-100  ">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="card-title">{skillSet.category}</h3>
                  <div className={`badge ${skillSet.color}`}>
                    {skillSet.level}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillSet.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="badge  bg-base-200">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Skill/> */}
    </section>
  );
};
export default Skills;


// import {
//   SiReact,
//   SiBlazor,
//   SiExpo,
//   SiDotnet,
//   SiPython,
//   SiCsharp,
//   SiCplusplus,
//   SiHtml5,
//   SiCss3,
//   SiJavascript,
//   SiTypescript,
//   SiMysql,
// } from "react-icons/si";
// import { DiReact } from "react-icons/di"; // exemple si on préfère Devicons
// import { IconType } from "react-icons";

// export  function Skill() {
//   const skills: { name: string; icon: IconType; color: string }[] = [
//     { name: "React", icon: SiReact, color: "#61DAFB" },
//     { name: "Blazor", icon: SiBlazor, color: "#512BD4" },
//     { name: "Expo", icon: SiExpo, color: "#000020" },
//     { name: ".NET", icon: SiDotnet, color: "#512BD4" },
//     { name: "Python", icon: SiPython, color: "#3776AB" },
//     { name: "C#", icon: SiCsharp, color: "#239120" },
//     { name: "C++", icon: SiCplusplus, color: "#00599C" },
//     { name: "HTML", icon: SiHtml5, color: "#E34F26" },
//     { name: "CSS", icon: SiCss3, color: "#1572B6" },
//     { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
//     { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
//     { name: "MySQL", icon: SiMysql, color: "#4479A1" },
//   ];

//   return (
//     <section className="p-10 max-w-6xl mx-auto">
//       <h2 className="text-4xl font-bold mb-8 text-center">💡 Mes Compétences</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {skills.map(({ name, icon: Icon, color }, i) => (
//           <div
//             key={i}
//             className="flex flex-col items-center justify-center bg-base-100 shadow-md p-6 rounded-lg hover:shadow-xl transition-transform hover:scale-105"
//           >
//             <Icon className="w-12 h-12" style={{ color }} />
//             <h3 className="text-lg font-semibold mt-2">{name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

