import { ArrowDown, RefreshCcw } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

export default function LetsWorkTogether() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (card) {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
      }
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-6 bg-content-base">
      <div className="text-sm px-4 py-1 rounded-full bg-base-200  shadow text-base-content/100">
        nkoungagil@gmail.com
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
        Travaillons <br className="sm:hidden" /> <span className="text-base-content /700">Ensemble</span>
      </h1>

      <div className="flex items-center justify-center gap-4 mt-6">
        <div
          ref={cardRef}
          className="w-40 h-60 shadow-xl overflow-hidden rounded-3xl transition-transform duration-300 [transform-style:preserve-3d]"
        >
          <div className="w-full h-full p-0">
            <img
              src="https://i.pinimg.com/736x/ce/20/59/ce20595cea6a964dabc0122ac58f1ebc.jpg"
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-base-content shadow-md">
          <RefreshCcw className="w-6 h-6 text-base-content/80" />
        </div>

         <div
          ref={cardRef}
          className="w-40 h-40 shadow-xl overflow-hidden rounded-3xl transition-transform duration-300 [transform-style:preserve-3d]"
        >
          <div className="w-full h-full p-0">
            <img
              src="https://i.pinimg.com/736x/ce/20/59/ce20595cea6a964dabc0122ac58f1ebc.jpg"
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <p className="text-base-content/600 max-w-md text-base">
        Je vais t’aider à obtenir le site web dont tu rêves. Réserve juste un appel 👇
      </p>

      <button className="flex items-center gap-2 mt-2 text-content-base bg-black p-5 hidden">
        Réserver un appel <ArrowDown className="w-4 h-4" />
      </button>
    </div>
  );
}
