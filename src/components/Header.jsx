import ToggleTheme from "./ToggleTheme";
export default function Header({ titre, setSidebarOpen, sidebarOpen, nbNotifs, darkMode, setDarkMode }) {
  return (
    <header className="bg-[#0F2D56] dark:bg-gray-900 border-b border-[#1a3f75] dark:border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">

      {/* Gauche : bouton menu + titre */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/60 hover:text-white transition text-xl"
        >
          ☰
        </button>
        <h1 className="font-bold text-white tracking-wide">{titre}</h1>
      </div>

      {/* Droite */}
      <div className="flex items-center gap-3">

        {/* Date */}
        <span className="text-xs text-white/50 hidden md:block">
          {new Date().toLocaleDateString("fr-MG", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>

       {/* Toggle dark/light */}
        <ToggleTheme darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Cloche */}
        <div className="relative">
          <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition">
            🔔
          </button>
          {nbNotifs > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-white text-xs rounded-full flex items-center justify-center font-bold">
              {nbNotifs}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}