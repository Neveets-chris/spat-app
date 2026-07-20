import { Sun, Moon } from "lucide-react";

export default function ToggleTheme({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
      className="w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C9A84C]"
      style={{
        background: darkMode
          ? "linear-gradient(90deg, #1e293b 0%, #334155 100%)"
          : "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center"
        style={{ left: darkMode ? "calc(100% - 22px)" : "2px" }}
      >
        {darkMode ? (
          <Moon className="w-3 h-3 text-indigo-600" />
        ) : (
          <Sun className="w-3 h-3 text-amber-500" />
        )}
      </div>
    </button>
  );
}