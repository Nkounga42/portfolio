export default function Timeline() {
  const events = [
    {
      date: "2025 ",
      title: "Stage a Wilkaî",
      content: `The Apple Macintosh—later rebranded as the Macintosh 128K—is the original Apple Macintosh
      personal computer. It played a pivotal role in establishing desktop publishing as a general
      office function. The motherboard, a 9 in (23 cm) CRT monitor, and a floppy drive were housed
      in a beige case with integrated carrying handle; it came with a keyboard and single-button mouse.`,
      position: "start",
    },
    {
      date: "2025",
      title: "Développeur Backend – Projet Universitaire ESCIC",
      content: `ESCIC – École Supérieure de Commerce et d’Industrie du Congo
Janvier 2025 – Aujourd’hui 
Développement du backend complet d’une marketplace dans le cadre d’un projet académique. Mise en place d’une architecture RESTful, Implémentation de l’authentification, gestion des rôles utilisateurs, Intégration de Nodemailer pour les notifications par email
`,
      position: "end",
    },
    {
      date: "2024",
      title: "Consulting Informatique (Brazzaville)",
      content: `Participation à la conception et au développement de sites web dynamiques en collaboration avec une équipe de développeurs pour optimiser l’expérience utilisateur et améliorer les performances des sites. `,
      position: "start",
    },
    {
      date: "2023",
      title: "BAC D - CL Pointe-Noire ",
      content: `Passage en classe de Terminale D après des résultats solides en Première. Participation à des ateliers de préparation
    au baccalauréat, exposés scientifiques et concours interscolaires de mathématiques.`,
      position: "end",
    },
  ];

  const renderIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical max-w-4xl">
      {events.map((event, index) => (
        <li key={index}>
          {index !== 0 && <hr />}
          <div className="timeline-middle">{renderIcon()}</div>
          <div
            className={`timeline-${event.position} ${
              event.position === "start" ? "mb-10 md:text-end" : "md:mb-10"
            }`}
          >
            <time className="font-mono italic">{event.date}</time>
            <div className="text-lg font-black">{event.title}</div>
            {event.content}
          </div>
          <hr />
        </li>
      ))}
    </ul>
  );
}
