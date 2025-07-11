 
import { useEffect, useRef } from "react";

const Vanta = () => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    // Eviter de recréer l’effet si déjà actif
    if (!effectRef.current && window.VANTA) {
      effectRef.current = window.VANTA.FOG({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        highlightColor: 0x5cf9f6,
        midtoneColor: 0x202040,
        lowlightColor: 0x0d0d1a,
        baseColor: 0x000000,
        blurFactor: 0.7,
        speed: 2.0,
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 -z-20" />;
};

export default Vanta;


function hexToNumber(hexString) {
  if (hexString.startsWith("#")) {
    hexString = hexString.slice(1);
  }

  // Gère le format court (ex: "fff" => "ffffff")
  if (hexString.length === 3) {
    hexString = hexString
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const number = parseInt(hexString, 16);
  return "0x" + number.toString(16).toUpperCase().padStart(6, "0");
}
