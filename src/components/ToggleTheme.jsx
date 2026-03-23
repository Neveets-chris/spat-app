import "../toggle.css";

export default function ToggleTheme({ darkMode, setDarkMode }) {
  const actuel = darkMode ? "🌙" : "☀️";
  const suivant = darkMode ? "☀️" : "🌙";

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
        <span className="emoji-actuel">{actuel}</span>
        <span className="emoji-suivant">{suivant}</span>
      </button>
    </div>
  );
}
