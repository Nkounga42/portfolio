import { useState, useRef } from "react";
import { projets } from "../libs/data"; 
import { Calendar } from "lucide-react";
import { Link } from "react-router";
import * as UI from "../components/UICompoents";
export default function ProjetsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const carouselRef = useRef();

  const scrollToItem = (index) => {
    const carousel = carouselRef.current;
    if (carousel && carousel.children[index]) {
      carousel.children[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
      setActiveIndex(index);
      setImageIndex(0);
    }
  };

  const nextProjet = () => scrollToItem((activeIndex + 1) % projets.length);
  const prevProjet = () =>
    scrollToItem((activeIndex - 1 + projets.length) % projets.length);
  const nextImage = () => {
    const total = projets[activeIndex].imagesIllustration.length;
    setImageIndex((imageIndex + 1) % total);
  };
  const prevImage = () => {
    const total = projets[activeIndex].imagesIllustration.length;
    setImageIndex((imageIndex - 1 + total) % total);
  };

  const projetActif = projets[activeIndex];

  return (
  <>
    <div className="flex items-center flex-col mb-20">
      <div className="max-w-5xl space-y-6 ">
        <div className="flex flex-col lg:flex-row  ">
          <div className="relative w-full  ">
            <figure className="w-full h-[60vh] bg-base-200 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={projetActif.imagesIllustration[imageIndex]}
                alt={projetActif.nom}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.png"; // ton image de secours
                }}
              />
            </figure>
            <div className="absolute bottom-0 p-15 right-0 left-0 flex justify-between items-end z-10 text-white  bg-gradient-to-t  from-base-200 to-transparent">
              <div className="w-full lg:w-1/3 space-y-4 ">
                <h2 className="text-3xl font-bold  text-shadow-md">{projetActif.nom}</h2>
                
                <div className="flex flex-wrap gap-2">
                  {projetActif.technologies.map((tech) => (
                    <span key={tech} className="p-2 py-1 rounded-full backdrop-blur-md border border-base-content/30 bg-base-200/30">
                      {tech}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-white/60 flex items-center gap-2">
                <Calendar size={16}/>  {projetActif.dateCreation}
                </p>
              </div>
              <div className="flex-col items-end flex">
                <div className="mb-7 flex">
                     <Link
                  to={ `${projetActif.slug}`}
                  >

                  <div
                  className="backdrop-blur-md py-3  px-4 border border-base-content/30 hover:-primary/79 hover:border-primary/80 btn-circle mr-2 "
                  
                  >
                  Voir le projet
                </div>
                </Link>
                  <button
                  onClick={prevImage}
                  className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary mr-2 "
                >
                  ❮
                </button>
                <button
                  onClick={nextImage}
                  className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary "
                >
                  ❯
                </button>
                </div>
                

                <div className="flex justify-center gap-2 ">
                  {projetActif.imagesIllustration.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setImageIndex(index)}
                      className={`bg-base-300 w-7 h-2  rounded-full ${
                        index === imageIndex ? "bg-primary  " : "bg-base-300/50 backdrop-blur-md   shadow"
                      }`}
                    />
                  ))}
                </div>
              </div> 
            </div> 
          </div>
        </div> 
        <div className="relative w-full">
          <div
            ref={carouselRef}
            className={`carousel flex space-x-4 overflow-x-auto scroll-smooth duration-300  ${
              projets[activeIndex].id === 1 && "ml-15"
            } ${
              projets[activeIndex].id === projets[projets.length - 1].id &&
              "mr-15"
            }`}
          >
            {projets.map((projet, index) => (
              <div
                key={projet.slug}
                onClick={() => scrollToItem(index)}
                className={`carousel-item min-w-[250px] my-9 bg-base-200 sm:min-w-[280px] max-w-xs rounded-xl cursor-pointer transition-all duration-300 hover:border-primary/10 hover:shadow-xl border-2 ${
                  index === activeIndex ? "border-primary bg-primary/40 shadow-2xl" : "border-base-300"
                }`}
              >
                <div className="card shadow-md w-full ">
                  <figure>
                    <img
                      src={projet.imagesIllustration[0]}
                      alt={projet.nom}
                      className="h-36 sm:h-40 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-3">
                    <h3 className="text-base font-semibold">{projet.nom}</h3>
                    <p className="text-xs text-base-content/60">
                      {projet.technologies.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons du carousel projets */}
          <button
            onClick={prevProjet}
            className=" backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary absolute -left-5 top-1/2 -translate-y-1/2 z-10"
          >
            ❮
          </button>
          <button
            onClick={nextProjet}
            className="backdrop-blur-md h-12 w-12 border border-base-content/30 hover:border-primary/80 btn-circle hover:text-primary absolute -right-5 top-1/2 -translate-y-1/2 z-10"
          >
            ❯
          </button>
        </div>
      </div>
      
    </div>
    
            <UI.Footer />
    </>
  );
}
