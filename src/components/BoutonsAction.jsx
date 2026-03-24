import { useState } from "react";

// ── Tooltip ───────────────────────────────────────────────────────────────────
function Tooltip({ texte, children }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute -top-9 left-50 -translate-x-1/2 left-1/2 bg-gray-900 dark:bg-gray-700 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap z-50 shadow-lg animate-fadeIn pointer-events-none">
          {texte}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </div>
      )}
    </div>
  );
}

// ── Animation poussière ───────────────────────────────────────────────────────
function Particules({ x, y, actif }) {
  if (!actif) return null;
  const particules = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * 360;
    const dist = 20 + Math.random() * 30;
    const dx = Math.cos((angle * Math.PI) / 180) * dist;
    const dy = Math.sin((angle * Math.PI) / 180) * dist;
    const size = 3 + Math.random() * 5;
    const colors = ["bg-rose-400", "bg-rose-300", "bg-orange-300", "bg-gray-300"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { dx, dy, size, color, angle };
  });

  return (
    <div className="fixed pointer-events-none z-[9999]" style={{ left: x, top: y }}>
      {particules.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color} animate-particule`}
          style={{
            width: p.size,
            height: p.size,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            animationDelay: `${i * 30}ms`,
          }}
        />
      ))}
    </div>
  );
}

// ── Animation message envoyé ──────────────────────────────────────────────────
export function MessageEnvoye({ actif }) {
  if (!actif) return null;
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-700 shadow-xl rounded-2xl px-5 py-3 animate-slideIn">
      <div className="relative w-8 h-8">
        {/* Enveloppe */}
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center animate-enveloppe">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        {/* Checkmark */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full flex items-center justify-center animate-check">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800 dark:text-white">Ajouté avec succès !</p>
        <p className="text-xs text-gray-400">L'élément a été enregistré</p>
      </div>
    </div>
  );
}

// ── Bouton Supprimer ──────────────────────────────────────────────────────────
export function BoutonSupprimer({ onClick }) {
  const [particules, setParticules] = useState({ actif: false, x: 0, y: 0 });

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setParticules({ actif: true, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setTimeout(() => setParticules({ actif: false, x: 0, y: 0 }), 800);
    setTimeout(() => onClick(), 600);
  };

  return (
    <>
      <Particules {...particules} />
      <Tooltip texte="Supprimer">
        <button
          onClick={handleClick}
          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-500 dark:hover:bg-rose-500 transition-all duration-200 shadow-sm hover:shadow-rose-300 dark:hover:shadow-rose-900 hover:scale-110"
        >
          <svg className="w-4 h-4 text-rose-500 group-hover:text-white transition-colors duration-200"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </Tooltip>
    </>
  );
}

// ── Bouton Ajouter ────────────────────────────────────────────────────────────
export function BoutonAjouter({ onClick, texte = "Ajouter" }) {
  const [success] = useState(false);

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <MessageEnvoye actif={success} />
      <Tooltip texte={texte}>
        <button
          onClick={handleClick}
          className="group flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 dark:hover:bg-emerald-500 transition-all duration-200 hover:scale-110 font-bold text-lg"
        >
          <span className="group-hover:text-white transition-colors duration-200">+</span>
        </button>
      </Tooltip>
    </>
  );
}

// ── Bouton Modifier ───────────────────────────────────────────────────────────
export function BoutonModifier({ onClick }) {
  return (
    <Tooltip texte="Modifier">
      <button
        onClick={onClick}
        className="group flex items-center justify-center w-8 h-8 rounded-lg bg-[#0F2D56]/10 dark:bg-gray-700 hover:bg-[#0F2D56] dark:hover:bg-[#0F2D56] transition-all duration-200 hover:scale-110"
      >
        <svg className="w-4 h-4 text-[#0F2D56] dark:text-gray-300 group-hover:text-white transition-colors duration-200"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
    </Tooltip>
  );
}

// ── Bouton Détail ─────────────────────────────────────────────────────────────
export function BoutonDetail({ onClick }) {
  return (
    <Tooltip texte="Voir le détail">
      <button
        onClick={onClick}
        className="group flex items-center justify-center w-8 h-8 rounded-lg bg-[#C9A84C]/20 hover:bg-[#C9A84C] transition-all duration-200 hover:scale-110"
      >
        <svg className="w-4 h-4 text-[#C9A84C] group-hover:text-white transition-colors duration-200"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </Tooltip>
  );
}

export function useSuccessMessage() {
  const [actif, setActif] = useState(false);
  const trigger = () => {
    setActif(true);
    setTimeout(() => setActif(false), 2500);
  };
  return { actif, trigger };
}