import { useParams } from "react-router-dom";
import { projets } from "../libs/data";
import { CalendarDays } from "lucide-react";

export default function ProjetOverview() {
  const { slug } = useParams();
  const projet = projets.find((p) => p.slug === slug);

  if (!projet) {
    return (
      <div className="p-6 text-center text-red-500">Projet introuvable.</div>
    );
  }

  return (
    <div className="relative">
      <div className={`relative bg-center bg-cover`}
        style={{
          backgroundImage: `url(${projet.imagesIllustration[0]})`, 
        }}
      >
        <div className=" w-full h-[60vh] overflow-hidden rounded-b-2xl inset-0 flex justify-center items-end bg-gradient-to-t from-base-200/90 to-transparent ">
          <div className="text-base-content space-y-2 w-[75%] mb-10  ">
            <h1 className="text-4xl   font-semibold flex items-center gap-2">
              {projet.nom}
            </h1>
            <div className="text-sm breadcrumbs">
          <ul>
            <li>{projet.cathegorie}</li>
            <li>{projet.Client}</li>
            <li>{projet.Roles}</li>
          </ul>
        </div>
          
          </div>
        </div>
      </div>

      {/* === INFOS DETAILLEES === */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Catégorie et client */}
         <p className="text-sm text-base-content-100/80 max-w-3xl">{projet.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" />
              {projet.dateCreation}
            </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {projet.technologies.map((tech) => (
            <span key={tech} className="badge badge-outline badge-lg px-3 py-2">
              {tech}
            </span>
          ))}
        </div>

        {/* Galerie d’illustrations */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projet.imagesIllustration.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Illustration ${i + 1}`}
              className="w-full h-40 md:h-60 object-cover rounded-lg hover:scale-105 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
