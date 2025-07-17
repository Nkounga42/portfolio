import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme"; 
import bgDark from "../assets/bg-dark.png";
import bgLight from "../assets/bg-light.png";

interface MyProps {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}

function ElegantShape({
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-base/[0.08]",
  className = "",
}: MyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className={`relative ${className}`}
      >
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[2px] border-2 border-white/[0.15] shadow-base-300 after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroGeometric({
  title2 = "Moi c'est Nkounga exaucé",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
const { theme } = useTheme();

const backgroundImage = theme === "dark" ? bgDark : bgLight;

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
    <div
    key={theme} 
      className="relative min-h-[80vh] w-full"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat", 
      }}
    >
      <div className="absolute inset-0 z-[30] w-full h-screen top-0 left-0 xs:hidden sm:visible">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[60%] top-[15%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-0 top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[10%] bottom-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[10%] top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[25%] top-[10%]" />
      </div>

      <div className="bg-gradient-to-t absolute inset-0 z-[1] left-0 right-0 from-base-300 to-base-100/10" />

      <div className="relative z-10 px-6 pb-25 pt-15 w-full  h-full backdrop-blur-3xl ">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-3xl sm:text-8xl font-bold my-6 mb-8 tracking-tight">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 via-rose-500/20 to-amber-500/20 border border-white/[0.08] mb-8 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 10px rgba(99,102,241,0.2)",
                    "0 0 20px rgba(244,114,182,0.2)",
                    "0 0 20px rgba(251, 190, 36, 0.2)",
                    "0 0 20px rgba(244,114,182,0.2)",
                    "0 0 10px rgba(99,102,241,0.2)",
                  ],
                  background: [
                    "linear-gradient(90deg, rgba(99, 101, 241, 0.66) 0%, rgba(244,114,182,0.35) 50%, rgba(251,191,36,0.35) 100%)",
                    "linear-gradient(90deg, rgba(251,191,36,0.35) 0%, rgba(99,102,241,0.35) 50%, rgba(244,114,182,0.35) 100%)",
                    "linear-gradient(90deg, rgba(244,114,182,0.35) 0%, rgba(251,191,36,0.35) 50%, rgba(99,102,241,0.35) 100%)",
                    "linear-gradient(90deg, rgba(99,102,241,0.35) 0%, rgba(244,114,182,0.35) 50%, rgba(251,191,36,0.35) 100%)",
                  ],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <span className="text-sm text-base-content/90 tracking-wide">
                  Disponible pour travailler
                </span>
              </motion.div>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-t from-base-content to-base-content/70">
                {title2}
              </span> 
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-base-content/80 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Développeur full-stack en formation à{" "}
              <strong>
                <Link to="/" className="text-base-content">
                  ESCIC
                </Link>
              </strong>
              , <br /> je crée des solutions numériques complètes, du backend à
              l’interface utilisateur. Je cherche à relever des défis concrets
              pour mettre mes compétences en pratique.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
