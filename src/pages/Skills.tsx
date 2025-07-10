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
    </section>
  );
};
export default Skills;