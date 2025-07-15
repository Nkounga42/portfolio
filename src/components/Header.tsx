import { Flame, Github, Search } from "lucide-react";
import * as UI from "./UICompoents";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/logo'
const pages = {
  Home: "/",
  About: "/about",
  Projects: "/projects",
  Skills: "/skills",
  Experience: "/experience",
  // Education: "/education",
  // Blog: "/blog",
  Contact: "/contact",
};

const Header = () => {
  const location = useLocation(); // Pour éviter d'utiliser window.location.pathname directement

  return (
    <div className="sticky top-0 left-0 right-0 z-90 bg-base-100/80 backdrop-blur-sm border-b border-base-200 flex items-center justify-center h-[50px]">
      <div className="max-w-5xl mx-auto flex items-center justify-between w-full">
        <div className="text-base flex items-center gap-2">
          <Link to="/" className="text-xl mr-2 transition-all duration-200">
             <Logo/>
          </Link>

          {Object.entries(pages).map(([page, url], index) => (
            <div
              key={url}
              className={`h-[50px] flex items-center transition-all duration-200 ease-in-out ${
                location.pathname === url ? "border-b-3 border-primary" : ""
              }`}
            >
              <Link
                to={url}
                className={`text-base-content p-2 ${
                  location.pathname === url
                    ? "font-semibold"
                    : "text-base-content/60 hover:text-base-content"
                }`}
                onClick={(e) => {
                  if (url.startsWith("http")) {
                    e.preventDefault();
                  }
                }}
              >
                {page}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-base flex items-center gap-4 ml-4">
          <button className="btn btn-primary btn-sm normal-case text-sm">
            Prendre Contact
          </button>
          <button>
            <Search className="h-5 w-5 cursor-pointer" />
          </button>
          <UI.ThemeControler />
          <Link to='https://github.com/Nkounga42' target="_blank" rel="noreferrer">
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
