import { Flame, Github, Search } from "lucide-react";
import * as UI from "./UICompoents";

const pages = {
  Home: "/",
  About: "/about",
  Projects: "/projects",
  Skills: "/skills",
  Experience: "/experience",
  Education: "/education",
  Blog: "/blog",
  Contact: "/contact", 
}
const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 z-90 bg-base-100/80 backdrop-blur-sm border-b-1 border-base-200 flex items-center justify-center h-[50px] ">
      <div className="max-w-5xl mx-auto flex items-between justify-between w-full ">
        <div className="text-base flex items-center gap-2">
            <a className="text-xl mr-2  transition-all duration-200">
              <Flame className="w-6 h-6" />
            </a>
          {
            Object.entries(pages).map(([page, url], index) => {
              return (
                <div className={`h-[50px] flex items-center transition-all duration-200 ease-in-out ${window.location.pathname === url ? 'border-b-3 border-primary ' : ''}`}>
                  <a 
                    key={index} 
                    href={url}  
                    className={`text-base-content p-2 ${window.location.pathname === url ? 'font-semibold' : 'text-base-content/60 hover:text-base-content'}`}
                    onClick={(e) => {
                      if (url.startsWith('http')) {
                        // window.open(url, '_blank');
                        e.preventDefault();
                      }
                    }}
                  >
                    {page}
                  </a>
                </div>
              );
            })
          }



          {/* Article <ChevronRight size={16} />{" "}
          <span className="text-base-content">Title</span> */}
        </div>
        <div className="text-base flex items-center gap-4">
          <div className="flex items-center gap-4 ml-4">
            <button className="btn btn-primary btn-sm normal-case text-sm">
              Prendre Contact
            </button>
            <button>
              <Search className="h-5 w-5 cursor-pointer" />
            </button>
            <UI.ThemeControler></UI.ThemeControler>
            <button>
              <Github className="h-5 w-5" />
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
};

// const Navigation = () =>{
//   return(
//     <div>
//       <h1>Navigation</h1>
//     </div>
//   )
// }

export default Header;
