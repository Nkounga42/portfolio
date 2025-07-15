import { ArrowDown, RefreshCcw } from "lucide-react";
import { useRef, useEffect } from "react";

export default function LetsWorkTogether() {
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);

  const addTiltEffect = (ref: React.RefObject<HTMLDivElement | null>) => {
    useEffect(() => {
      const card = ref.current;
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        card.style.background = `
          radial-gradient(
            circle at ${percentX}% ${percentY}%,
            rgba(255, 255, 255, 0.2),
            transparent 60%
          )
        `;
      };

      const handleMouseLeave = () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
        card.style.background = "none";
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, [ref]);
  };

  addTiltEffect(cardRef1);
  addTiltEffect(cardRef2);

  return (
    <div className="min-h-[80%] py-15 flex flex-col items-center justify-center px-4 text-center space-y-6 bg-content-base">
      <div className="text-sm px-4 py-1 rounded-full bg-base-200 shadow text-base-content/100">
        nkoungagil@gmail.com
      </div>

      <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
        Travaillons <br className="sm:hidden" />
        <span className="text-base-content/700"> Ensemble</span>
      </h1>

      <div
        className="flex items-center justify-center gap-4 mt-6"
        style={{ perspective: "1000px" }}
      >
        {/* Carte 1 */}
        <div
          ref={cardRef1}
          className="w-40 h-60 overflow-hidden rounded-3xl transition-transform duration-300 [transform-style:preserve-3d] hover:shadow-xl relative z-10"
        >
          <img
            src="https://i.pinimg.com/736x/ae/94/97/ae94977fe94c32d093f156476a9890c1.jpg"
            alt="Portrait"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bouton Refresh */}
        <div className="p-3 rounded-2xl">
          <RefreshCcw className="w-6 h-6 text-base-content/80" />
        </div>

        {/* Carte 2 */}
        <div
          ref={cardRef2}
          className="w-40 h-60 overflow-hidden rounded-3xl transition-transform duration-300 [transform-style:preserve-3d] hover:shadow-xl relative z-10"
        >
          <img
            src="https://i.pinimg.com/1200x/f8/5b/11/f85b11a77e9694bd0b033d472f7163d9.jpg"
            alt="Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className="text-base-content/600 max-w-md text-base">
        Je vais vous aider à obtenir le site web dont vous rêvez. Réserve juste un appel 👇
      </p>

      <button className="btn btn-soft flex items-center gap-2 mt-2 text-base-content/100 p-5">
        Réserver un appel <ArrowDown className="w-4 h-4" />
      </button>
    </div>
  );
}
