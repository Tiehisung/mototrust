import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemContext";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isDark = theme == "dark";

  return (
    <button
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
      className={`relative w-14 h-7 rounded-full p-0.5 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand ${
        isDark ? "bg-brand" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-transform duration-200 ease-in-out ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon size={14} className="text-indigo-500" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </div>
    </button>
  );
}
