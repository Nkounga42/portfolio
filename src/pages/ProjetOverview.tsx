import { useParams, useNavigate, Link } from "react-router-dom"; 
import { useEffect, useState } from "react";

import { projets } from "../libs/data";
import { ArrowLeft, ArrowRight, CalendarDays, X } from "lucide-react";

export default function ProjetOverview() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  if (!slug) {
    return <div className="p-6 text-center text-red-500">Aucun slug fourni dans l’URL.</div>;
  }

  const indexActuel = projets.findIndex((p) => p.slug === slug);
  if (indexActuel === -1) {
    return <div className="p-6 text-center text-red-500">Projet introuvable : <strong>{slug}</strong></div>;
  }

  const projet = projets[indexActuel];
  const projetPrecedent = projets[indexActuel - 1];
  const projetSuivant = projets[indexActuel + 1];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const previousProject = () => {
    scrollToTop();
    if (projetPrecedent) navigate(`/projects/${projetPrecedent.slug}`);
  };

  const nextProject = () => {
    scrollToTop();
    if (projetSuivant) navigate(`/projects/${projetSuivant.slug}`);
  };

  const openViewer = (index: number) => {
    setImageIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  const nextImage = () =>
    setImageIndex((imageIndex + 1) % projet.imagesIllustration.length);

  const prevImage = () =>
    setImageIndex((imageIndex - 1 + projet.imagesIllustration.length) % projet.imagesIllustration.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!viewerOpen) return;
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [viewerOpen, imageIndex]);

  return (
    <div className="relative">
      {/* Image Viewer Overlay */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-base-300/70 backdrop-blur-lg z-50 flex flex-col items-center justify-center ">
          <button onClick={closeViewer} className="absolute top-5 right-5 text-base-content text-3xl"><X/></button>

          <div className="w-full max-w-4xl p-4 flex items-center justify-between">
            <button onClick={prevImage} className="text-base-content text-4xl px-4"><ArrowLeft/></button>
            <img
              src={projet.imagesIllustration[imageIndex]}
              alt={`Image ${imageIndex + 1}`}
              className="max-h-[80vh] object-contain rounded-lg "
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
              }}
            />
            <button onClick={nextImage} className="text-base-content text-4xl px-4"><ArrowRight/></button>
          </div>

          <div className="absolute bottom-3 left-0 right-0 items-center justify-center w-full max-w-xl px-4 flex">
            {projet.imagesIllustration.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i + 1}`}
                onClick={() => setImageIndex(i)}
                onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
              }}
                className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  i === imageIndex ? "border-primary" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bandeau principal */}
      <div
        className="relative bg-center bg-cover"
        style={{ backgroundImage: `url(${projet.imagesIllustration?.[0] ?? ""})` }}
      >
        <div className="w-full h-[60vh] overflow-hidden rounded-b-2xl inset-0 flex justify-center items-end bg-gradient-to-t from-base-200/90 to-transparent">
          <div className="text-base-content space-y-2 w-[75%] mb-10">
            <h1 className="text-4xl font-semibold flex items-center gap-2">{projet.nom}</h1>
            <div className="text-sm breadcrumbs">
              <ul>
                <li><Link to={"/projects"}>Project</Link></li>
                <li>{projet.cathegorie}</li>
                <li>{projet.Client}</li>
                <li>{projet.Roles}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <p className="text-sm text-base-content-100/80 max-w-3xl">
          {projet.description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="w-4 h-4" />
          {projet.dateCreation}
        </div>

        <div className="flex flex-wrap gap-2">
          {projet.technologies?.map((tech) => (
            <span key={tech} className="badge badge-outline badge-lg px-3 py-2">{tech}</span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projet.imagesIllustration?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Illustration ${i + 1}`}
              onClick={() => openViewer(i)}
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.onerror = null;
                t.src = "https://i.pinimg.com/736x/36/85/37/368537ab800464ee9b14d843e117ab01.jpg";
              }}
              className="w-full h-40 md:h-60 object-cover rounded-lg hover:scale-105 transition duration-300 cursor-pointer"
            />
          ))}
        </div>

        <div className="flex justify-between mt-30 mb-20">
          <button
            className="btn p-5 btn-soft tooltip tooltip-info"
            data-tip={projetPrecedent ? projetPrecedent.nom : "Aucun précédent"}
            onClick={previousProject}
            disabled={!projetPrecedent}
          >
            <ArrowLeft /> Précédent
          </button>

          <button
            className="btn p-5 btn-soft tooltip tooltip-info"
            data-tip={projetSuivant ? projetSuivant.nom : "Aucun suivant"}
            onClick={nextProject}
            disabled={!projetSuivant}
          >
            Suivant <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
