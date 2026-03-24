import { useState} from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Logements from "./pages/Logements";
import Employes from "./pages/Employes";
import Attributions from "./pages/Attributions";
import Materiaux from "./pages/Materiaux";
import Depenses from "./pages/Depense";
import ThemeTransition from "./components/ThemeTransition";

const TITRES = {
  dashboard:    "Tableau de bord",
  logements:    "Gestion des logements",
  employes:     "Gestion des employés",
  attributions: "Gestion des attributions",
  materiaux:    "Gestion des matériaux",
  depenses:     "Gestion des dépenses",
};

export default function App() {
  const [page, setPage]             = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode]     = useState(false);
  const [trigger, setTrigger]       = useState(0);

  const handleToggleDark = (val) => {
    setTrigger(t => t + 1); // déclenche l'animation
    setTimeout(() => {
      setDarkMode(val);
      if (val) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, 350); // change le thème au milieu de l'animation
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <Dashboard />;
      case "logements":    return <Logements />;
      case "employes":     return <Employes />;
      case "attributions": return <Attributions />;
      case "materiaux":    return <Materiaux />;
      case "depenses":     return <Depenses />;
      default:             return <Dashboard />;
    }
  };

  return (
   <div className="flex h-screen bg-[#EDEBE6] dark:bg-gray-950 overflow-hidden transition-colors duration-300">

      {/* Vague de transition */}
      <ThemeTransition darkMode={darkMode} trigger={trigger} />

      <Sidebar page={page} setPage={setPage} open={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          titre={TITRES[page]}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          nbNotifs={4}
          darkMode={darkMode}
          setDarkMode={handleToggleDark}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}