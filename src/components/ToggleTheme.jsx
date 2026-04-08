import "../toggle.css";
import { SunMedium ,Moon } from "lucide-react";

export default function ToggleTheme({ darkMode, setDarkMode }) {
  const Actuel = darkMode ? Moon  : SunMedium;
  const Suivant = darkMode ? SunMedium : Moon;

  return (
    <div className="container-button" onClick={() => setDarkMode(!darkMode)}>
      <div className="hover-zone bt-1"></div>
      <div className="hover-zone bt-2"></div>
      <div className="hover-zone bt-3"></div>
      <div className="hover-zone bt-4"></div>
      <div className="hover-zone bt-5"></div>
      <div className="hover-zone bt-6"></div>
      <button
        className={`toggle-btn ${darkMode ? "mode-clair" : "mode-sombre"}`}
      >
        <span className="emoji-actuel"><Actuel className="text-yellow-400 " /></span>
        <span className="emoji-suivant"><Suivant className="text-white"/></span>
      </button>
    </div>
  );
}
