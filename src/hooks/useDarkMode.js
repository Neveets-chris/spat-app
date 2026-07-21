import { useState, useEffect } from "react";
<<<<<<< HEAD
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    // 1. Vérifier localStorage en priorité
    const saved = localStorage.getItem("spat_dark_mode");
    if (saved !== null) return saved === "true";

    // 2. Sinon, suivre la préférence système
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Sauvegarder la préférence
    localStorage.setItem("spat_dark_mode", darkMode.toString());
  }, [darkMode]);

  return [darkMode, setDarkMode];
=======

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
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
}