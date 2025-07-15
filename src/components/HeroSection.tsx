import { useNavigate } from "react-router";

const HeroSection = ({title, content, link }: { title?: string; content?: string; link?: string}) => {
  const navigate: ReturnType<typeof useNavigate> = useNavigate();

  return (
    
    <div className=" bg-base-200 h-[65vh] m-[64px] overflow-hidden justify-between items-center flex  border border-base-content/10 gap-5 lg:flex-row-reverse rounded-4xl  ">
        <img
          src="https://i.pinimg.com/736x/34/53/8d/34538d9f40246bba3e5faa2c5d943f17.jpg"
          className="w-full h-full  max-w-[55%] "
        />
        <div className="min-w-[500px] pl-[67px] ">
          <h1 className="text-5xl font-bold max-w-[300px] font-medium">{ !title && "Apprenez gratuitement les bases de Framer"}</h1>
          <p className="py-6 max-w-[400px]">
            {!content && `Initiez-vous au design interactif et au prototypage sans code avec Framer, l'outil préféré des designers modernes.`}
          </p>
          { link && <button className="btn btn-primary" onClick={() => navigate(link)} > Get Started </button> }
        </div>
       
    </div>
  );
};
export default HeroSection;