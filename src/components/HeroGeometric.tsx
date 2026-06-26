import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import bgDark from "../assets/bg-dark.png";
import bgLight from "../assets/bg-light.png";
import img from "../../public/image.jpg";
import RainbowCard from "./RainbowCard";
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
  const { t } = useLanguage();

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
      className="relative min-h-[55vh] w-full flex items-center"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >  <div className="absolute inset-0 z-[30] w-full h-full top-0 left-0 hidden lg:block pointer-events-none ">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[60%] top-[15%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-rose-500/[0.15]" className="right-0 top-[75%]" />
        <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[10%] bottom-[10%]" />
        <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-amber-500/[0.15]" className="right-[10%] top-[15%]" />
        <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[25%] top-[10%]" />
      </div>
      <div className="bg-gradient-to-t absolute inset-0 z-[20] left-0 right-0 from-base-100 via-base-100/20 to-primary/50" />
      <div className="relative z-[20] px-6 pb-20 pt-32 w-full min-h-[50vh] flex flex-col justify-center   ">
        <div className="max-w-3xl mx-auto text-center mt-[-40px]">

          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 relative inline-block"
          >
            <div className="w-50 sm:w-40 sm:h-40 group rounded-[20px]">
              <RainbowCard className="mask mask-squircle w-50 sm:w-40 sm:h-40 mx-auto ">
                <img
                  src={img}
                  alt="Nkounga Gil Exaucé"
                  className="block w-full h-full object-cover transition  duration-500 group-hover:scale-98 will-change-transform mask mask-squircle"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              </RainbowCard>
            </div>

            <div className="absolute bottom-5 -right-5  backdrop-blur-md  rounded-xl z-20  -rotate-12 overflow-hidden ">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1  bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-red-500/10border border-white/[0.05]  cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                  },
                }}
              >
                <span className="text-xs sm:text-sm text-white/80 tracking-wide">
                  {t.hero.badge}
                </span>
              </motion.div>
              <br />
            </div>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="text-3xl sm:text-7xl font-bold my-4 mb-6 tracking-tight">

              <span className="bg-clip-text text-transparent bg-gradient-to-t from-base-content to-base-content/70">
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="text-base sm:text-lg text-base-content/70 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              {t.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
