import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HeroSection = ({
  title,
  content,
  link,
  buttonText = "Get Started",
}: {
  title?: string;
  content?: string;
  link?: string;
  buttonText?: string;
}) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const heroImages = [
    "https://i.pinimg.com/1200x/1b/a8/33/1ba833ca70694836aeb99c11b4b2b3b9.jpg",
    "https://i.pinimg.com/736x/0d/0d/b5/0d0db5b6d4b77ae7381d90b2ee6a5dd4.jpg",
    "https://i.pinimg.com/1200x/c4/de/11/c4de111fd0966b2f10beb3923b275809.jpg",
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

  return () => window.clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className=" ">
    <div className=" min-h-[60vh]  mx-auto max-w-7xl  overflow-hidden flex flex-col lg:flex-row-reverse justify-between items-center gap-6 lg:gap-10 rounded-[2rem] p-6 md:p-10 ">
      {/* Conteneur de l'image ajusté pour le comportement responsive */}
      <div className="relative w-full h-64 sm:h-80 lg:h-[400px]   overflow-hidden rounded-[1.5rem]">
        {heroImages.map((image, index) => (
          <img
            key={image}
            src={image}
            alt={`Hero section ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === activeImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="w-full max-w-[600px] lg:min-w-[360px] lg:pl-[32px]">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-[320px]">
          {title || "Apprenez gratuitement les bases de Framer"}
        </h1>
        <p className="py-6 text-base-content/80 max-w-[460px]">
          {content ||
            "Initiez-vous au design interactif et au prototypage sans code avec Framer, l'outil préféré des designers modernes."}
        </p>
        {link && (
          <button className="btn btn-primary" onClick={() => navigate(link)}>
            {buttonText}
          </button>
        )}
      </div>
      </div>
    </div>
  );
};

export default HeroSection;