import { useState, useEffect } from "react";
import { supabase } from "../tools/supabase";

interface ExperienceEvent {
  id?: number;
  date_period: string;
  title: string;
  content: string;
  position: "start" | "end";
}

export default function Timeline() {
  const [experiences, setExperiences] = useState<ExperienceEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')

      console.log("Supabase experiences query result:", { data, error });

      if (error) {
        console.error('Erreur Supabase (Experiences):', error.message);
      } else if (data && data.length > 0) {
        setExperiences(data as ExperienceEvent[]);
      } else {
        console.warn("La table 'experiences' semble vide ou inaccessible (vérifiez les politiques RLS).");
      }
      setLoading(false);
    };

    fetchExperience();
  }, []);

  const renderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" >
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );

  if (loading) return <div className="text-center p-10 opacity-50 italic">Chargement du parcours...</div>;

  return (
    <div className="w-full flex justify-center">
      {experiences.length > 0 ? (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical max-w-4xl">
          {experiences.map((event, index) => (
            <li key={event.id || index} >
              <hr />
              <div className="timeline-middle">{renderIcon()}</div>
              <div
                className={`relative timeline-${event.position} ${event.position === "start" ? "mb-10 md:text-end" : "md:mb-10"
                  }`}
              >
                <time className="font-mono italic">{event.date_period}</time>
                <div className={`md:w-full h-full md:mb-0 mb-4  md:absolute top-3  ${event.position === "start" ? "-right-full bg-base-300__ md:-mr-8  mr-0" : "-left-full bg-primary__ -300 md:-ml-8   ml-0"} `} ></div>
                <div className="text-lg font-black">{event.title}</div>
                <div className="opacity-80 leading-relaxed whitespace-pre-wrap">{event.content}</div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center p-10 bg-base-200/50 rounded-3xl border border-dashed border-base-content/20 max-w-xl">
          <p className="text-lg font-medium opacity-70">Aucune expérience trouvée dans la base de données.</p>
          <p className="text-sm opacity-50 mt-2">Si vous avez inséré des données, assurez-vous d'avoir activé l'accès public (RLS) sur la table 'experiences'.</p>
        </div>
      )}
    </div>
  );
}