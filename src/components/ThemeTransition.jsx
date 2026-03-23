import { useEffect, useRef } from "react";

export default function ThemeTransition({ darkMode, trigger }) {
  const waveRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const wave = waveRef.current;
    if (!wave) return;

    // Couleur de la vague selon le mode qui arrive
    wave.style.background = darkMode
      ? "linear-gradient(90deg, transparent 0%, rgba(10,22,40,0.6) 50%, transparent 100%)"
      : "linear-gradient(90deg, transparent 0%, rgba(242,242,240,0.7) 50%, transparent 100%)"

    // Remet la vague à gauche
    wave.style.transition = "none";
    wave.style.transform = "translateX(-100%)";
    wave.style.opacity = "1";

    void wave.offsetWidth;

    // Lance la vague de gauche à droite
    wave.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    wave.style.transform = "translateX(100%)";

    // Efface après
    setTimeout(() => {
      wave.style.opacity = "0";
    }, 800);

  }, [trigger]);

  return (
    <div
      ref={waveRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transform: "translateX(-100%)",
      }}
    />
  );
}