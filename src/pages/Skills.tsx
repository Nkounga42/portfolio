const Skills = () => {
  return (
    <section className="pb-20 pt-15 bg-base-100 flex-col flex items-center">
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
                "Expo",
                "TypeScript",
                "Tailwind CSS",
                "HTML/CSS",
              ],
              level: "Avancé",
              color: "badge-primary",
            },
            {
              category: "Backend",
              skills: ["Node.js", "Express", "Python", "API REST"],
              level: "Intermédiaire",
              color: "badge-secondary",
            },
            {
              category: "Base de Données",
              skills: ["FireBase", "MySQL", ],
              level: "Intermédiaire",
              color: "badge-accent",
            },
            {
              category: "Outils & DevOps",
              skills: ["Git", "GitHub", "Docker",  "VS Code"],
              level: "Avancé",
              color: "badge-info",
            },
            {
              category: "Mobile",
              skills: ["React Native", "Expo", "Blazor"],
              level: "Débutant",
              color: "badge-warning",
            },
            {
              category: "Autres",
              skills: ["Figma", "Photoshop", "Lunacy",'curve', "Tests unitaires"],
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
      {/* <Skill_/> */}
    </section>
  );
};
export default Skills;

 
// export function Skill_() {
//   const skills: { name: string; icon: IconType; color: string }[] = [
//     { name: "React", icon: },
//     { name: "Blazor", icon:  },
//     { name: "Expo", icon: },
//     { name: ".NET", icon:  },
//     { name: "Python", icon: },
//     { name: "C#", icon: },
//     { name: "C++", _icon: },
//     { name: "HTML", icon: },
//     { name: "CSS", icon: },
//     { name: "JavaScript", icon: },
//     { name: "TypeScript", icon: },
//     { name: "MySQL", icon: },
//   ];

//   return (
//     <section className="p-10 max-w-6xl mx-auto">
//       <h2 className="text-4xl font-bold mb-8 text-center">💡 Mes Compétences</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {skills.map(({ name, icon: Icon, color }, i) => (
//           <div
//             key={i}
//             className="flex flex-col items-center justify-center bg-base-100 shadow-md p-6 rounded-lg hover:shadow-xl tranFation-transform hover:scale-105"
//           >
//             <Icon className="w-12 h-12" style={{ color }} />
//             <h3 className="text-lg font-semibold mt-2">{name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
