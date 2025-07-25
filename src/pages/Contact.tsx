import LetsWorkTogether from "../components/LetsWorkTogether";
import * as UI from "../components/UICompoents";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const Contact = () => {
   const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Attend que le DOM soit prêt
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100); // petit délai pour être sûr que l'élément existe
      }
    }
  }, [location]);
  return (
    <>
      <LetsWorkTogether />
      <UI.Getintouch />
      {/* <UI.HeroSection /> */}
      <UI.Newsletter />
    </>
  );
};

export default Contact;
