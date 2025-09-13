import { Github, Search, Menu } from "lucide-react";
import * as UI from "./UICompoents";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo";

const pages = {
  Home: "/portfolio/",
  Projects: "/portfolio/projects",
  Skills: "/portfolio/skills",
  // Experience: "/portfolio/experience",
  About: "/portfolio/about",
  Contact: "/portfolio/contact",
};

const Header = () => {
  const location = useLocation();
  const navRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeLink = nav.querySelector(
      `a[href="${location.pathname}"]`
    ) as HTMLElement;

    if (activeLink) {
      setIndicatorStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [location.pathname]);
  const NavLinks = ({ isMobile = false }) => (
    <>
      {Object.entries(pages).map(([page, url]) => {
        const currentPath = location.pathname;
        const isActive =
          url === "/portfolio/" ? currentPath === "/portfolio/" : currentPath.startsWith(url);
        return (
          <li key={url}>
            <Link
              to={url}
              className={`text-sm transition-colors duration-300 ${
                isMobile 
                  ? "px-4 py-2 block hover:bg-base-200 rounded-lg" 
                  : "px-2 h-[50px] flex items-center"
              } ${
                isActive
                  ? "text-primary"
                  : "text-base-content/70 hover:text-base-content"
              }`}
              onClick={scrollToTop}
            >
              {page}
            </Link>
          </li>
        );
      })}
    </>
  );
  const headerFloat = true;
  return (
    <div
      className={`${
        headerFloat ? "fixed top-1 sm:top-2 " : "sticky top-0 bg-base-100/80  "
      } w-full left-0 right-0 z-50 flex justify-center items-center px-1 sm:px-2 md:px-4`}
    >
      <div
        className={`${
          headerFloat
            ? "w-full max-w-5xl mx-2 sm:mx-0 rounded-full backdrop-blur-[10px] border border-base-content/10 bg-base-100/80 "
            : "w-full max-w-5xl  "
        } px-2 sm:px-3 md:px-4 flex items-center justify-between h-[50px]`}
      >
        <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
          <Link to="/portfolio/" className="text-lg sm:text-xl flex-shrink-0">
            <Logo />
          </Link>

          <ul
            ref={navRef}
            className="hidden lg:flex items-center justify-center relative ml-2 xl:ml-4"
          >
            <NavLinks />
            <motion.div
              className="absolute bottom-0 h-[2px] bg-primary rounded transition-all headerIndicator"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
            />
          </ul>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
          <Link
            className="btn btn-primary btn-sm hidden md:inline-flex text-xs md:text-sm"
            to="/portfolio/contact#contactfield"
          >
            <span className="hidden lg:inline">Prendre Contact</span>
            <span className="lg:hidden">Contact</span>
          </Link>
          <Link to="/search" className="hidden sm:block p-1">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 cursor-pointer" />
          </Link>
          <div className="scale-90 sm:scale-100">
            <UI.ThemeControler />
          </div>
          <Link
            to="https://github.com/Nkounga42"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:block p-1"
          >
            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <div className="dropdown dropdown-end lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm p-1.5">
              <Menu className="h-4 w-4" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content  menu mt-4 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 sm:w-64 border border-base-content/10 -right-4"
            >
              <NavLinks isMobile={true} />
              <div className="divider my-1"></div>
              <li>
                <Link 
                  to="/portfolio/contact#contactfield"
                  className="btn btn-primary btn-sm w-full justify-center"
                  onClick={scrollToTop}
                >
                  Prendre Contact
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <div className="flex items-center justify-around gap-2">
                  <Link 
                    to="/search" 
                    className="btn btn-ghost btn-sm btn-square flex-1"
                    onClick={scrollToTop}
                  >
                    <Search className="h-4 w-4" />
                  </Link>
                  <Link
                    to="https://github.com/Nkounga42"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost btn-sm btn-square flex-1"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
