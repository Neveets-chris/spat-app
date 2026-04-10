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
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

const TITRES = {
  dashboard: "Tableau de bord",
  logements: "Gestion des logements",
  employes: "Gestion des employés",
  attributions: "Gestion des attributions",
  materiaux: "Gestion des matériaux",
  depenses: "Gestion des dépenses",
};

function AppLayout() {
  const [page, setPage]           = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode]   = useState(false);
  const [trigger, setTrigger]     = useState(0);

  const handleToggleDark = (val) => {
    setTrigger(t => t + 1);
    setTimeout(() => {
      setDarkMode(val);
      document.documentElement.classList.toggle("dark", val);
    }, 350);
  };

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
      <Sidebar page={page} setPage={setPage} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
          <PageWrapper key={page}>
            {pages[page] || <Dashboard />}
          </PageWrapper>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}