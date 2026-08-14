// src/App.js
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Logements from "./pages/Logements";
import Employes from "./pages/Employes";
import Attributions from "./pages/Attributions";
import Materiaux from "./pages/Materiaux";
import Depenses from "./pages/Depense";
import PageWrapper from "./components/PageWrapper";
import ThemeTransition from "./components/ThemeTransition";
import Logi from "./components/Logi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import useDarkMode from "./hooks/useDarkMode"; 
import { useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SpalshScreen from "./components/SpalshScreen";

const TITRES = {
  dashboard: "Tableau de bord",
  logements: "Gestion des logements",
  employes: "Gestion des employés",
  attributions: "Gestion des attributions",
  materiaux: "Gestion des matériaux",
  depenses: "Gestion des dépenses",
};

function AppLayout() {
  const location = useLocation();
const [page, setPage] = useState(() => {
  const map = {
    "/dashboard": "dashboard",
    "/logements": "logements",
    "/employes": "employes",
    "/attributions": "attributions",
    "/materiaux": "materiaux",
    "/depenses": "depenses",
  };
  return map[location.pathname] || "dashboard";
});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode, toggle, trigger } = useDarkMode();

  const pages = {
    dashboard: <Dashboard />,
    logements: <Logements />,
    employes: <Employes />,
    attributions: <Attributions />,
    materiaux: <Materiaux />,
    depenses: <Depenses />,
  };

  return (
    <div className="flex h-screen bg-[#EDEBE6] dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <ThemeTransition darkMode={darkMode} trigger={trigger} />

      <Sidebar
        page={page}
        setPage={setPage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          titre={TITRES[page]}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          nbNotifs={4}
          darkMode={darkMode}
          setDarkMode={toggle} 
        />

        <main className="flex-1 overflow-y-auto p-6">
          <PageWrapper key={page}>
            {pages[page] || <Dashboard />}
          </PageWrapper>
        </main>
      </div>

      <Logi />
    </div>
  );
}

export default function App() {
  return (
    <SpalshScreen>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </SpalshScreen>
  );
}