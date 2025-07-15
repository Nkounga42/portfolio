import { Github, Search, Menu } from "lucide-react";
import * as UI from "./UICompoents";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo";

const pages = {
  Home: "/",
  About: "/about",
  Projects: "/projects",
  Skills: "/skills",
  Experience: "/experience",
  Contact: "/contact",
};

const Header = () => {
  const location = useLocation();
 const scrollToTop=()=> {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
  const NavLinks = () => (
    <>
      {Object.entries(pages).map(([page, url]) => (
        <li key={url}>
          <div
            className={`text-sm px-2 h-[50px] flex items-center block ${
              location.pathname === url && "border-primary" 
            }`}
            onClick={scrollToTop}
          >
            <Link
             className={`text-sm px-2 h-[50px] flex items-center block ${
              location.pathname === url
                ? "font-semibold text-primary border-b"
                : "text-base-content/70 hover:text-base-content"
            }`} to={url}>{page}</Link>

          </div>
        </li>
      ))}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-200">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[50px] ">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl">
            <Logo />
          </Link>
        

        <ul className="hidden lg:flex items-center gap-2">{NavLinks()}</ul>
</div>
        <div className="flex items-center gap-3">
          <button className="btn btn-primary btn-sm hidden md:inline-flex">
            Prendre Contact
          </button>

          <Search className="h-5 w-5 cursor-pointer" />
          <UI.ThemeControler />
          <Link
            to="https://github.com/Nkounga42"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-5 w-5" />
          </Link>

          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <Menu className="h-5 w-5" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {NavLinks()}
              <li className="block md:hidden">
                <button className="btn btn-primary btn-sm w-full mt-2">
                  Prendre Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
