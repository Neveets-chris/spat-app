import { useState, useEffect } from "react";
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
}