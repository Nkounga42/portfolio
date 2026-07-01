import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { supabase } from "../tools/supabase";

const HeroSection = ({
  title,
  content,
  link,
  buttonText = "Get Started",
  images,
  children
}: {
  title?: string;
  content?: string;
  link?: string;
  buttonText?: string;
  images?: string[];
  children?: React.ReactNode;
}) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: false });

      if (!error && data) {
        const mappedData = data.map((p: any) => ({
          ...p,
          imagesIllustration: p.images_illustration || [],
          dateCreation: p.date_creation,
          Roles: p.roles,
          Client: p.client
        }));
        setProjects(mappedData);
      }
    };
    fetchProjects();
  }, []);


  const defaultImages = projects
    .map((p) => p.imagesIllustration?.[0])
    .filter(Boolean) as string[];

  const heroImages = images && images.length > 0 ? images : defaultImages;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="relative overflow-hidden">
      {heroImages.map((image, index) => (
        <img
          key={image}
          src={image}
          alt={`Hero section ${index + 1}`}
          className={`absolute inset-0 z-1 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === activeImage ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className=" min-h-[55vh]  mx-auto max-w-7xl flex flex-col lg:flex-row-reverse justify-between items-center gap-6 lg:gap-10 rounded-[2rem] p-6 md:p-10 ">
        <div className="w-full absolute bg-base-200/70 backdrop-blur-sm right-0 left-0 top-0 bottom-0 inset-0 z-10 lg:pl-[32px]">
          <div className="mx-auto px-4 max-w-5xl pt-25 ">

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold max-w-[320px]">
              {title || "Apprenez gratuitement les bases de Framer"}
            </h1>
            <p className="py-6 text-base-content/80 max-w-[460px]">
              {content || "Initiez-vous au design interactif et au prototypage sans code avec Framer, l'outil préféré des designers modernes."}
            </p>
            {link && (
              <button className="btn btn-primary" onClick={() => navigate(link)}>
                {buttonText}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full absolute bg-base-300/70 backdrop-blur-sm bottom-0 left-0 right-0 z-110 lg:pl-[32px]">
        {children}
      </div>
    </div>
  );
};

export default HeroSection;