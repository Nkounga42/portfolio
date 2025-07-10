import { 
  BookOpen,
  FileText,
  Dot, 
} from "lucide-react";

const Navbar  = () => {
  return (
    <div className=" bg-base-300/80 backdrop-blur-sm flex items-center justify-center h-[50px] ">
       
      <div className="hidden md:flex items-center gap-4">
        <a className="hover:underline text-sm flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          Leçons
        </a>
        <a className="hover:underline text-sm flex items-center gap-1">
          <FileText className="w-4 h-4" />
          Ressources
        </a>
        <a className="hover:underline text-sm text-white">
          Blog
        </a>
        <a className="flex items-center text-sm gap-1">
          <Dot className="w-5 h-5 text-blue-500" />
          Assistance en direct
        </a>
        <a className="hover:underline text-sm">
          Jalons
        </a>
      </div>
 
      
    </div>
  );
};

export default Navbar;
