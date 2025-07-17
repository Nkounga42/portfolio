import { ArrowDown, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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

        const rotateX = ((y - centerY) / centerY) * -20;
        const rotateY = ((x - centerX) / centerX) * 20;

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
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };
  return (
    <div className="min-h-[80%] pt-10 pb-15 flex flex-col items-center justify-center px-4 text-center space-y-6 bg-content-base">
      <motion.div
        custom={1}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: "1000px" }}
      >
        <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
          Travaillons <br className="sm:hidden" />
          <span className="text-base-content/700"> Ensemble</span>
        </h1>
      </motion.div>
      <div
        className="flex items-center justify-center gap-4 mt-6"
      >
        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          style={{ perspective: "2500px" }}
        >
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
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        style={{ perspective: "2500px" }}

        >
        <div className="p-3 rounded-2xl">
          <RefreshCcw className="w-6 h-6 text-base-content/80" />
        </div>
</motion.div>
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
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
        </motion.div>
      </div>
      <motion.div
        custom={5}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-base-content/600 max-w-md text-base">
          Je vais vous aider à obtenir le site web dont vous rêvez. Réserve
          juste un appel 👇
        </p>
      </motion.div>
      <motion.div
        custom={6}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          className="btn btn-soft flex items-center gap-2 mt-2 text-base-content/100 p-5"
          to="#contactfield"
        >
          Réserver un appel <ArrowDown className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}
