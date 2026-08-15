import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("spat_dark_mode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Compteur de déclenchement pour l'animation 
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // Sauvegarder dans localStorage à chaque changement
    localStorage.setItem("spat_dark_mode", String(darkMode));

    // Appliquer la classe sur <html>
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggle = () => {
    setDarkMode((prev) => !prev);
    setTrigger((prev) => prev + 1); 
  };

  return { darkMode, setDarkMode, toggle, trigger };
}