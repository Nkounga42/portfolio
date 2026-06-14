import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const flags: Record<string, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
  };

  const labels: Record<string, string> = {
    fr: "FR",
    en: "EN",
  };

  const nextLang = language === "fr" ? "en" : "fr";

  return (
    <motion.button
      id="language-switcher"
      aria-label={`Switch to ${nextLang === "fr" ? "French" : "English"}`}
      title={`Switch to ${nextLang === "fr" ? "Français" : "English"}`}
      onClick={() => setLanguage(nextLang)}
      className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-base-content/15 bg-base-100/60 hover:bg-base-200/80 hover:border-primary/30 transition-all duration-200 cursor-pointer select-none ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className="text-base leading-none"
        >
          {flags[language]}
        </motion.span>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${language}`}
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 4 }}
          transition={{ duration: 0.15 }}
          className="text-xs font-bold tracking-wider text-base-content/80"
        >
          {labels[language]}
        </motion.span>
      </AnimatePresence>
      {/* Subtle glow on active */}
      <span className="absolute inset-0 rounded-full bg-primary/0 hover:bg-primary/5 transition-colors duration-200" />
    </motion.button>
  );
};

export default LanguageSwitcher;
