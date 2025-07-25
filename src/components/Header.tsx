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
  const NavLinks = () => (
    <>
      {Object.entries(pages).map(([page, url]) => {
        const currentPath = location.pathname;
        const isActive =
          url === "/portfolio/" ? currentPath === "/" : currentPath.startsWith(url);
        return (
          <li key={url}>
            <Link
              to={url}
              className={`text-sm px-2 h-[50px] flex items-center block transition-colors duration-300 ${
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
        headerFloat ? "fixed top-2 " : "sticky top-0 bg-base-100/80  "
      } w-full overflow-hidden left-0 right-0 z-50 flex justify-center items-center `}
    >
      <div
        className={`${
          headerFloat
            ? "max-w-6xl rounded-full backdrop-blur-[10px]  border-base-content/10 bg-base-100/80 "
            : "lg:min-w-4xl  "
        }    px-4 flex items-center justify-between h-[50px] gap-15  `}
      >
        <div className="flex items-center gap-2">
          <Link to="/portfolio/" className="text-xl">
            <Logo />
          </Link>

          <ul
            ref={navRef}
            className="hidden lg:flex items-center justify-center relative"
          >
            {NavLinks()}
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

        <div className="flex items-center gap-3">
          <Link
            className="btn btn-primary btn-sm hidden md:inline-flex"
            to="/portfolio/contact#contactfield"
          >
            Prendre Contact
          </Link>
          <Link to="/search">
            <Search className="h-5 w-5 cursor-pointer" />
          </Link>
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
