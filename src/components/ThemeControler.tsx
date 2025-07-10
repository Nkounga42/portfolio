import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "../hooks/useTheme"; // Create this custom hook

const ThemeControler = () => {
  const { theme, toggleTheme } = useTheme();

  // Update document theme when component mounts or theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input 
        type="checkbox" 
        className="theme-controller" 
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <Moon className="swap-on h-5 w-5"/>
      <Sun className="swap-off h-5 w-5" />
    </label>
  );
};

export default ThemeControler;