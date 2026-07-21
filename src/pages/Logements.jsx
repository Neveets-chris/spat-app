<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
//import { useLogements } from "../hooks/useLogements";
import StatutBadge from "../components/StatutBadge";
// import {

// } from "../components/BoutonsAction";
=======
import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import StatutBadge from "../components/StatutBadge";

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
import {
  PencilRuler,
  MapPin,
  Blocks,
  CirclePlus,
  SquareMenu,
  Loader2,
  Trash2,
  Package,
  Layers,
  Home,
  Building2,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Play,
  X,
  Sparkles,
  Activity,
  Eye,
  Plus,
  Search,
  ChevronRight,
  Maximize2,
  DoorOpen,
  Wrench,
  Check,
  HardHat,
} from "lucide-react";

const FILTRES = [
  "Tous",
  "Disponible",
  "Occupé",
  "Maintenance",
<<<<<<< HEAD
  "EN_REPARATION",
];

// ============================================
// THÈME CLAIR/SOMBRE - Détection automatique
// ============================================
=======
  "En Reparation",
];


// THÈME CLAIR/SOMBRE - Détection automatique

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
const THEMES = {
  dark: {
    bg: "from-gray-900 via-gray-900 to-[#0F2D56]",
    card: "from-gray-800/80 to-gray-900/80",
    text: "text-white",
    textMuted: "text-white/70",
    textSubtle: "text-white/50",
    textLight: "text-white/40",
    border: "border-white/10",
    input: "bg-white/5 border-white/10",
    buttonSecondary: "border-white/20 text-white/70 hover:bg-white/5",
    statBlue: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    statEmerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
    statRose: "from-rose-500/20 to-rose-600/5 border-rose-500/30",
    statAmber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    statViolet: "from-violet-500/20 to-violet-600/5 border-violet-500/30",
  },
  light: {
    bg: "from-gray-50 via-gray-100 to-blue-50",
    card: "from-white to-gray-50",
    text: "text-gray-900",
    textMuted: "text-gray-700",
    textSubtle: "text-gray-500",
    textLight: "text-gray-400",
    border: "border-gray-200",
    input: "bg-white border-gray-300",
    buttonSecondary: "border-gray-300 text-gray-600 hover:bg-gray-100",
    statBlue: "from-blue-100 to-blue-50 border-blue-200",
    statEmerald: "from-emerald-100 to-emerald-50 border-emerald-200",
    statRose: "from-rose-100 to-rose-50 border-rose-200",
    statAmber: "from-amber-100 to-amber-50 border-amber-200",
    statViolet: "from-violet-100 to-violet-50 border-violet-200",
  },
};

<<<<<<< HEAD
// ─── Hooks d'animation ───────────────────────────────────────────────────────
=======
// Hooks d'animation 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!end) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return count;
}

function useReveal(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return {
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    },
  };
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("themechange", handleThemeChange);
    };
  }, []);
  return isDark;
}

<<<<<<< HEAD
// ─── Composant Carte Stat 3D ─────────────────────────────────────────────────
=======
// Composant Carte Stat 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function StatCard3D({
  icon: Icon,
  label,
  value,
  subValue,
  trend,
  trendValue,
  color,
  delay = 0,
  isDark,
}) {
  const animatedValue = useCountUp(value);
  const { style } = useReveal(delay);
  const theme = isDark ? THEMES.dark : THEMES.light;

  const gradients = {
    blue: theme.statBlue,
    emerald: theme.statEmerald,
    rose: theme.statRose,
    amber: theme.statAmber,
    violet: theme.statViolet,
  };

  const iconColors = {
    blue: "bg-blue-500 text-white",
    emerald: "bg-emerald-500 text-white",
    rose: "bg-rose-500 text-white",
    amber: "bg-amber-500 text-white",
    violet: "bg-violet-500 text-white",
  };

  return (
    <div style={style} className="group relative">
      <div
        className={`absolute inset-0 rounded-2xl transform translate-y-2 blur-sm group-hover:translate-y-3 transition-transform duration-300 ${isDark ? "bg-black/20" : "bg-gray-400/20"}`}
      />
      <div
        className={`relative bg-gradient-to-br ${gradients[color]} backdrop-blur-sm border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] ${isDark ? "border-opacity-30" : "shadow-lg"}`}
      >
        <div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:opacity-100 transition-all duration-500 ${isDark ? "bg-white/10" : "bg-white/50"}`}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl ${iconColors[color]} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
            >
              <Icon className="w-6 h-6" />
            </div>
            {trend && (
              <div
                className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                  trend === "up"
                    ? isDark
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-emerald-500 text-white"
                    : isDark
                      ? "bg-rose-100 text-rose-600"
                      : "bg-rose-500 text-white"
                }`}
              >
                {trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {trendValue}%
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p
              className={`text-3xl font-black tracking-tight drop-shadow-lg ${theme.text}`}
            >
              {animatedValue.toLocaleString()}
            </p>
            <p className={`text-sm font-medium ${theme.textSubtle}`}>{label}</p>
            {subValue && (
              <p className={`text-xs ${theme.textLight}`}>{subValue}</p>
            )}
          </div>
        </div>
        <div
          className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${isDark ? "border-white/0 group-hover:border-white/20" : "border-gray-200/0 group-hover:border-gray-300"}`}
        />
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Jauge circulaire 3D ──────────────────────────────────────────────────────
=======
// Jauge circulaire 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function CircularGauge({ value, max, size = 100, color = "#10b981", isDark }) {
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const offset = circumference - Math.min(value / max, 1) * circumference;
  const percentage = Math.round((value / max) * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div
        className={`absolute inset-2 rounded-full blur-md transform translate-y-1 ${isDark ? "bg-black/20" : "bg-gray-300/30"}`}
      />
      <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          fill="none"
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
          strokeWidth="6"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 8}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-lg font-black drop-shadow-lg ${theme.text}`}>
          {percentage}%
        </span>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Barre de progression animée 3D ───────────────────────────────────────────
=======
//Barre de progression animée 3D
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function AnimatedProgress({ value, max, color = "#10b981", isDark }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={`h-2.5 rounded-full overflow-hidden backdrop-blur-sm border ${isDark ? "bg-gray-700/50 border-white/10" : "bg-gray-200 border-gray-300"}`}
    >
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out relative"
        style={{
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          boxShadow: `0 0 15px ${color}60`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Statut couleur helpers ───────────────────────────────────────────────────
=======
// Statut couleur helpers
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function getStatutConfig(statut, isDark) {
  const configs = {
    Disponible: {
      color: "#10b981",
      icon: DoorOpen,
      bg: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
      text: isDark ? "text-emerald-400" : "text-emerald-600",
      glow: "#10b981",
    },
    Occupé: {
      color: "#f59e0b",
      icon: Users,
      bg: isDark ? "bg-amber-500/20" : "bg-amber-100",
      text: isDark ? "text-amber-400" : "text-amber-600",
      glow: "#f59e0b",
    },
    Maintenance: {
      color: "#f43f5e",
      icon: Wrench,
      bg: isDark ? "bg-rose-500/20" : "bg-rose-100",
      text: isDark ? "text-rose-400" : "text-rose-600",
      glow: "#f43f5e",
    },
    EN_REPARATION: {
      color: "#10b981",
      icon: HardHat,
      bg: isDark ? "bg-emerald-500/20" : "bg-emerald-100",
      text: isDark ? "text-emerald-400" : "text-emerald-600",
      glow: "#10b981",
    },
  };
  return configs[statut] || configs["Disponible"];
}

// ─── Modal Détail 3D ──────────────────────────────────────────────────────────
function ModalDetail({
  logement,
  attributions,
  onClose,
  isDark,
  travauxEnCours,
  commencerReparation,
  terminerReparation,
  alertesMaintenanceLog,
}) {
  const [now, setNow] = useState(Date.now());

  const travaux = logement ? travauxEnCours?.[logement.id] : null;

  useEffect(() => {
    if (!travaux || !logement) return;

    const t = setInterval(() => {
      setNow(Date.now());
      if (Date.now() >= travaux.fin) {
        terminerReparation(logement.id);
        clearInterval(t);
      }
    }, 1000);

    return () => clearInterval(t);
  }, [travaux, logement, terminerReparation]);

  if (!logement) return null;
  const attLogement = attributions.filter((a) => a.logement === logement.id);
  const theme = isDark ? THEMES.dark : THEMES.light;
  const statutConfig = getStatutConfig(logement.statut, isDark);

  return (
    <div
<<<<<<< HEAD
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-lg border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
=======
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl  w-full max-w-lg mx-4 border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      >
        {/* Header gradient */}
        <div
          className="relative px-6 py-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${statutConfig.color}20, ${statutConfig.color}05)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl"
            style={{ background: `${statutConfig.color}10` }}
          />
          {/* Particules */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full animate-pulse"
                style={{
                  background: `${statutConfig.color}40`,
                  left: `${10 + i * 20}%`,
                  top: `${15 + (i % 3) * 30}%`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>
          <div className="relative flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${statutConfig.bg}`}
                style={{ boxShadow: `0 4px 15px ${statutConfig.glow}30` }}
              >
                <Home className={`w-8 h-8 ${statutConfig.text}`} />
              </div>
              <div>
                <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>
                  {logement.id}
                </p>
                <h2 className={`text-2xl font-black ${theme.text}`}>
                  {logement.type}
                </h2>
                <StatutBadge statut={logement.statut} />
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:rotate-90 duration-300 ${isDark ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Infos principales en grille 3D */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: MapPin,
                label: "Localisation",
                value: logement.localisation,
                color: isDark
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-100 text-blue-600",
              },
              {
                icon: Maximize2,
                label: "Superficie",
                value: `${logement.superficie} m²`,
                color: isDark
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-amber-100 text-amber-600",
              },
              {
                icon: Users,
                label: "Capacité max",
                value: `${logement.nb_occupants_max}`,
                color: isDark
                  ? "bg-violet-500/20 text-violet-400"
                  : "bg-violet-100 text-violet-600",
              },
            ].map((item) => (
              <div key={item.label} className={`group relative`}>
                <div
                  className={`absolute inset-0 rounded-xl transform translate-y-1 blur-sm ${isDark ? "bg-black/10" : "bg-gray-300/20"}`}
                />
                <div
                  className={`relative border rounded-xl p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 ${item.color}`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                  <p className={`text-sm font-bold ${theme.text}`}>
                    {item.value}
                  </p>
                  <p className={`text-xs ${theme.textLight}`}>{item.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Jauge d'occupation */}
          <div
            className={`border rounded-2xl p-4 ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
          >
            <div className="flex items-center justify-between mb-3">
              <p
                className={`text-sm font-bold flex items-center gap-2 ${theme.text}`}
              >
                <Activity className="w-4 h-4 text-[#C9A84C]" />
                Taux d'occupation
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CircularGauge
                value={attLogement.filter((a) => a.statut === "Occupé").length}
                max={Math.max(logement.nb_occupants_max, 1)}
                size={80}
                color={statutConfig.color}
                isDark={isDark}
              />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className={theme.textSubtle}>Attributions actives</span>
                  <span className={`font-semibold ${theme.text}`}>
                    {attLogement.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme.textSubtle}>Capacité restante</span>
                  <span
                    className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                  >
                    {Math.max(
                      0,
                      logement.nb_occupants_max -
                        attLogement.filter((a) => a.statut === "Occupé").length,
                    )}
                  </span>
                </div>
              </div>
            </div>
            {logement.statut === "Maintenance" && (
              <div
                className={`border rounded-2xl p-4 space-y-3 ${isDark ? "bg-rose-500/10 border-rose-500/30" : "bg-rose-50 border-rose-200"}`}
              >
                <p
                  className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-rose-300" : "text-rose-700"}`}
                >
                  <Wrench className="w-4 h-4" /> Maintenance en cours
                </p>

                {alertesMaintenanceLog?.[logement.id]?.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${a.statut === "ok" ? "bg-emerald-500" : a.statut === "manque" ? "bg-amber-500" : "bg-rose-500"}`}
                    />
                    <span
                      className={isDark ? "text-white/70" : "text-gray-600"}
                    >
                      {a.message}
                    </span>
                  </div>
                ))}

                {!travaux ? (
                  <button
                    onClick={() => commencerReparation(logement.id, 2)}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <HardHat className="w-4 h-4" /> Commencer à réparer
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span
                        className={isDark ? "text-white/60" : "text-gray-500"}
                      >
                        Travaux en cours...
                      </span>
                      <span
                        className={`font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}
                      >
                        {Math.max(0, Math.ceil((travaux.fin - now) / 1000))}s
                        restantes
                      </span>
                    </div>
                    <div
                      className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}
                    >
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, ((now - travaux.debut) / (travaux.fin - travaux.debut)) * 100)}%`,
                        }}
                      />
                    </div>
                    {/* Bouton "Logement réparé" quand travaux terminés */}
                    {travaux && Date.now() >= travaux.fin && (
                      <div
                        className={`border rounded-2xl p-4 space-y-3 ${isDark ? "bg-emerald-500/10 border-emerald-500/30" : "bg-emerald-50 border-emerald-200"}`}
                      >
                        <p
                          className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
                        >
                          <Check className="w-4 h-4" /> Réparation terminée !
                        </p>
                        <p
                          className={`text-xs ${isDark ? "text-white/60" : "text-gray-500"}`}
                        >
                          Ce logement est réparé. Vous pouvez réemménager les
                          occupants initiaux.
                        </p>
                        <button
                          onClick={() => {
                            terminerReparation(logement.id);
                            onClose();
                          }}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition flex items-center justify-center gap-2"
                        >
                          <Home className="w-4 h-4" /> Confirmer réemménagement
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Attributions */}
          {attLogement.length > 0 && (
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Sparkles className="w-3 h-3 text-[#C9A84C]" />
                Attributions
              </p>
              <div className="space-y-2">
                {attLogement.map((a) => (
                  <div
                    key={a.id}
                    className={`border rounded-xl p-3 transition-all hover:scale-[1.01] ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:shadow-md"}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`font-semibold text-sm ${theme.text}`}>
                        {a.departement}
                      </span>
                      <StatutBadge statut={a.statut} />
                    </div>
                    <p className={`text-xs mt-1 ${theme.textLight}`}>
                      {a.date_debut} → {a.date_fin}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {a.occupants.map((o) => (
                        <span
                          key={o}
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDark ? "bg-white/10 text-white/70" : "bg-[#0F2D56]/10 text-[#0F2D56]"}`}
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          className={`px-6 py-4 border-t ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
        >
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Modal Form 3D ────────────────────────────────────────────────────────────
=======
//Modal Form 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function ModalForm({ logement, onClose, onSave, isDark }) {
  const { materiaux } = useApp();
  const { attributions: attrCtx } = useApp();

<<<<<<< HEAD
  // ─── Table de référence des types de logement ─────────────────────────────────
=======
  //Table de référence des types de logement 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const TYPES_LOGEMENT = {
    Studio: {
      minSurface: 20,
      maxSurface: 35,
      capacite: 3,
      defaultOccupants: 1,
    },
    F2: { minSurface: 35, maxSurface: 50, capacite: 6, defaultOccupants: 3 },
    F3: { minSurface: 50, maxSurface: 70, capacite: 10, defaultOccupants: 6 },
    F4: { minSurface: 70, maxSurface: 100, capacite: 15, defaultOccupants: 10 },
  };
  const getContraintes = (type) => TYPES_LOGEMENT[type] || TYPES_LOGEMENT["F2"];
  const [form, setForm] = useState(() => {
    if (logement) {
      return { ...logement };
    }
    // Valeurs par défaut pour un nouveau logement
    const contraintes = getContraintes("F2");
    return {
      type: "F2",
      localisation: "",
      statut: "Disponible",
      capacite: contraintes.capacite,
      superficie: contraintes.minSurface,
      nb_occupants_max: contraintes.defaultOccupants,
    };
  });
  const contraintes = getContraintes(form.type);
  const [saving, setSaving] = useState(false);
  const [besoinsMaintenance, setBesoinsMaintenance] = useState(
    logement?.besoinsMaintenance?.length > 0
      ? logement.besoinsMaintenance.map((b) => ({ ...b, nomManuel: "" }))
      : [{ nom: "", nomManuel: "", quantite: 1, unite: "unités" }],
  );
  const [errorsMaintenance, setErrorsMaintenance] = useState([]);
  const [errors, setErrors] = useState({});

  const isMaintenance = form.statut === "Maintenance";
  const addBesoin = () =>
    setBesoinsMaintenance((prev) => [
      ...prev,
      { nom: "", quantite: 1, unite: "unités" },
    ]);

  const updateBesoin = (i, field, val) => {
    setBesoinsMaintenance((prev) => {
      const updated = prev.map((b, idx) => {
        if (idx !== i) return b;

        // Si on change le select vers "__nouveau__"
        if (field === "nom" && val === "__nouveau__") {
          return { ...b, nom: "__nouveau__", nomManuel: "", unite: "" };
        }

        // Si on change le select vers un vrai matériau → auto-update unité
        if (field === "nom" && val !== "__nouveau__") {
          const mat = materiaux.find((m) => m.nom === val);
          const unite = mat?.unite || b.unite;
          return { ...b, nom: val, nomManuel: "", unite };
        }

        // Si on tape dans l'input nomManuel
        if (field === "nomManuel") {
          return { ...b, nomManuel: val };
        }

        return { ...b, [field]: val };
      });
      return updated;
    });
    setErrorsMaintenance([]);
  };
  const removeBesoin = (i) => {
    if (besoinsMaintenance.length === 1) {
      setErrorsMaintenance(["Au moins un matériau est requis"]);
      return;
    }
    setBesoinsMaintenance((prev) => prev.filter((_, idx) => idx !== i));
  };

  const validateMaintenance = () => {
    if (!isMaintenance) return true;
    const errors = [];

    // Vérifier chaque besoin : soit un matériau existant sélectionné, soit un nouveau nom saisi
    const valides = besoinsMaintenance.filter((b) => {
      const nomFinal = b.nom === "__nouveau__" ? b.nomManuel : b.nom;
      return nomFinal && nomFinal.trim() !== "" && b.quantite > 0;
    });

    if (valides.length === 0)
      errors.push("Au moins un matériau valide est requis");

    besoinsMaintenance.forEach((b, i) => {
      const nomFinal = b.nom === "__nouveau__" ? b.nomManuel : b.nom;
      if (!nomFinal || nomFinal.trim() === "")
        errors.push(`Matériau #${i + 1} : nom requis`);
      if (!b.quantite || b.quantite <= 0)
        errors.push(`Matériau #${i + 1} : quantité > 0 requise`);
    });

    setErrorsMaintenance(errors);
    return errors.length === 0;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.type) newErrors.type = "Type requis";
    if (!form.localisation?.trim())
      newErrors.localisation = "Localisation requise";

<<<<<<< HEAD
    // 🔥 Vérifier superficie dans les bornes
=======
    //  Vérifier superficie dans les bornes
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    if (form.superficie < contraintes.minSurface) {
      newErrors.superficie = `Minimum ${contraintes.minSurface}m² pour un ${form.type}`;
    }
    if (form.superficie > contraintes.maxSurface) {
      newErrors.superficie = `Maximum ${contraintes.maxSurface}m² pour un ${form.type}`;
    }

<<<<<<< HEAD
    // Capacité est fixée par le type — toujours valide
    // Max occupants
=======

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    if (!form.nb_occupants_max || form.nb_occupants_max < 1) {
      newErrors.nb_occupants_max = "Minimum 1 occupant";
    }
    if (form.nb_occupants_max > contraintes.capacite) {
      newErrors.nb_occupants_max = `Maximum ${contraintes.capacite} pour un ${form.type}`;
    }

<<<<<<< HEAD
    // 🔥 En édition, vérifier qu'on ne réduit pas sous le nombre d'occupants actuels
=======
   
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    if (logement) {
      const attActive = attrCtx.find(
        (a) => a.logement === logement.id && a.statut === "Occupé",
      );
      const nbOccupants = attActive ? attActive.occupants.length : 0;

      if (form.nb_occupants_max < nbOccupants) {
        newErrors.nb_occupants_max = `Capacité minimum: ${nbOccupants} occupant(s)`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const theme = isDark ? THEMES.dark : THEMES.light;

  const handleTypeChange = (newType) => {
    const nouvellesContraintes = getContraintes(newType);

    setForm((prev) => {
      // Ajuster la superficie dans les bornes du nouveau type
      const nouvelleSurface = Math.max(
        nouvellesContraintes.minSurface,
        Math.min(prev.superficie, nouvellesContraintes.maxSurface),
      );

<<<<<<< HEAD
      // 🔥 Capacité = max du type (fixe)
      const nouvelleCapacite = nouvellesContraintes.capacite;

      // 🔥 Max occupants = valeur par défaut du type (pas 3 fixe)
=======
      //  Capacité = max du type (fixe)
      const nouvelleCapacite = nouvellesContraintes.capacite;

      // Max occupants = valeur par défaut du type 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      const nouveauMaxOccupants = nouvellesContraintes.defaultOccupants;

      return {
        ...prev,
        type: newType,
        superficie: nouvelleSurface,
        capacite: nouvelleCapacite,
<<<<<<< HEAD
        nb_occupants_max: nouveauMaxOccupants, // ← VALEUR PAR DÉFAUT DU TYPE
=======
        nb_occupants_max: nouveauMaxOccupants, 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      };
    });
  };
  const handleSuperficieChange = (val) => {
    const nombre = Number(val);
<<<<<<< HEAD
    // 🔥 CLAMP : min <= superficie <= max
=======
   
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    const clamped = Math.max(
      contraintes.minSurface,
      Math.min(nombre, contraintes.maxSurface),
    );

    setForm((prev) => ({
      ...prev,
      superficie: clamped,
    }));
  };

  const handleMaxOccupantsChange = (val) => {
    const nombre = Number(val);
    // 🔥 Ne peut pas dépasser la capacité du type
    const clamped = Math.max(1, Math.min(nombre, contraintes.capacite));

    setForm((prev) => ({
      ...prev,
      nb_occupants_max: clamped,
    }));
  };

  const handleSave = () => {
    if (!validateForm()) return;
<<<<<<< HEAD
    if (isMaintenance && !validateMaintenance()) return; // ← AJOUTER CETTE LIGNE
=======
    if (isMaintenance && !validateMaintenance()) return; 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

    setSaving(true);

    if (isMaintenance) {
      const besoinsFiltres = besoinsMaintenance
        .map((b) => {
          const nomFinal = b.nom === "__nouveau__" ? b.nomManuel : b.nom;
          return {
            nom: nomFinal,
            quantite: Number(b.quantite),
            unite: b.unite || "unités",
          };
        })
        .filter((b) => b.nom && b.nom.trim() !== "" && b.quantite > 0);

      onSave({
        ...form,
        _maintenanceBesoins: besoinsFiltres,
      });
    } else {
      onSave(form);
    }

    setSaving(false);
    onClose();
  };
  // Couleurs du thème pour les selects
  const selectClass = `w-full mt-1 px-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all appearance-none cursor-pointer ${
    isDark
      ? "bg-gray-800/80 border border-white/10 text-white hover:border-white/20"
      : "bg-white border border-gray-200 text-gray-900 hover:border-gray-300 shadow-sm"
  }`;

  const inputClass = `w-full mt-1 px-3 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${
    isDark
      ? "bg-gray-800/80 border border-white/10 text-white placeholder-gray-500 hover:border-white/20"
      : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400 hover:border-gray-300 shadow-sm"
  }`;

  const labelClass = `text-[11px] font-bold uppercase tracking-[0.15em] mb-2 block ${
    isDark ? "text-gray-400" : "text-gray-500"
  }`;

  return (
    <div
      className={`fixed inset-0 z-50 backdrop-blur-md p-4 flex items-center justify-center animate-in fade-in duration-200 ${isDark ? "bg-black/70" : "bg-gray-900/50"}`}
    >
      <div
<<<<<<< HEAD
        className={`relative rounded-3xl shadow-2xl w-full max-w-lg border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${
=======
        className={`relative rounded-3xl shadow-2xl w-full max-w-lg mx-4 border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          isDark
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-white/10"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header avec gradient */}
        <div
          className={`relative px-6 py-5 border-b overflow-hidden ${
            isDark
              ? "border-white/10 bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-transparent"
              : "border-gray-200 bg-gradient-to-r from-amber-50 via-white to-white"
          }`}
        >
          <div
            className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${isDark ? "bg-[#C9A84C]/10" : "bg-amber-200/30"}`}
          />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-[#C9A84C]/20" : "bg-amber-100"}`}
              >
                <Sparkles
                  className={`w-5 h-5 ${isDark ? "text-[#C9A84C]" : "text-amber-600"}`}
                />
              </div>
              <span className={`text-lg font-bold ${theme.text}`}>
                {logement ? "Modifier le logement" : "Ajouter un logement"}
              </span>
            </div>
            <button
              onClick={onClose}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:rotate-90 duration-300 ${isDark ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"}`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="px-6 py-6 space-y-5">
          {/* Type */}
          <div>
            <label className={labelClass}>Type de logement</label>
            <div className="relative">
              <Home
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <select
                value={form.type}
                onChange={(e) => handleTypeChange(e.target.value)}
                className={`${selectClass} pl-10`}
              >
                {Object.keys(TYPES_LOGEMENT).map((t) => (
                  <option
                    key={t}
                    value={t}
                    className={
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }
                  >
                    {t}
                  </option>
                ))}
              </select>
            </div>
<<<<<<< HEAD
            {/* 🔥 Info contraintes */}
=======
            {/*  Info contraintes */}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <p
              className={`text-[10px] mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}
            >
              Surface: {contraintes.minSurface}-{contraintes.maxSurface}m² •
              Capacité max: {contraintes.capacite} employés
            </p>
          </div>

          {/* Localisation */}
          <div>
            <label className={labelClass}>Localisation</label>
            <div className="relative">
              <MapPin
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <input
                value={form.localisation}
                onChange={(e) =>
                  setForm({ ...form, localisation: e.target.value })
                }
                placeholder="Ex: 1er étage-Gauche"
                className={`${inputClass} pl-10`}
              />
            </div>
            {errors.localisation && (
              <p className="text-xs text-rose-500 mt-1">
                {errors.localisation}
              </p>
            )}
          </div>

<<<<<<< HEAD
          {/* Grille 3 colonnes : Superficie, Capacité, Max Occupants */}
          <div className="grid grid-cols-3 gap-3">
=======
         
          <div className="grid grid-cols-1 min-[527px]:grid-cols-3 gap-3">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div>
              <label className={labelClass}>Superficie (m²)</label>
              <div className="relative">
                <Maximize2
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
                <input
                  type="number"
                  min={contraintes.minSurface}
                  max={contraintes.maxSurface}
                  value={form.superficie}
                  onChange={(e) => handleSuperficieChange(e.target.value)}
                  className={`${inputClass} pl-10`}
                />
              </div>
              {/* Barre visuelle des bornes */}
              <div className="mt-1 flex items-center gap-1">
                <span
                  className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  {contraintes.minSurface}m²
                </span>
                <div
                  className={`flex-1 h-1 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}
                >
                  <div
                    className="h-full rounded-full bg-[#C9A84C]"
                    style={{
                      width: `${((form.superficie - contraintes.minSurface) / (contraintes.maxSurface - contraintes.minSurface)) * 100}%`,
                    }}
                  />
                </div>
                <span
                  className={`text-[10px] ${isDark ? "text-gray-600" : "text-gray-400"}`}
                >
                  {contraintes.maxSurface}m²
                </span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Capacité maximale</label>
              <div
                className={`relative px-3 py-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10 text-white/70" : "bg-gray-100 border-gray-200 text-gray-500"} flex items-center gap-2`}
              >
                <Users className="w-4 h-4" />
                <span className="font-bold">{form.capacite}</span>
                <span className="text-xs">employés Maximum</span>
              </div>
            </div>
            <div>
              <label className={labelClass}>Max occupants</label>
              <div className="relative">
                <Users
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
                />
                <input
                  type="number"
                  min={1}
                  max={contraintes.capacite}
                  value={form.nb_occupants_max}
                  onChange={(e) => handleMaxOccupantsChange(e.target.value)}
                  className={`${inputClass} pl-10 ${errors.nb_occupants_max ? "border-rose-500" : ""}`}
                />
              </div>
              <p
                className={`text-[10px] mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}
              >
                1 à {contraintes.capacite} employés
              </p>
              {errors.nb_occupants_max && (
                <p className="text-xs text-rose-500 mt-1">
                  {errors.nb_occupants_max}
                </p>
              )}
            </div>
          </div>

          {/* Statut */}
          <div>
            <label className={labelClass}>Statut</label>
            <div className="relative">
              <Activity
                className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
              />
              <select
                value={form.statut}
                onChange={(e) => setForm({ ...form, statut: e.target.value })}
                className={`${selectClass} pl-10`}
              >
                {["Disponible", "Maintenance"].map((s) => (
                  <option
                    key={s}
                    value={s}
                    className={
                      isDark
                        ? "bg-gray-800 text-white"
                        : "bg-white text-gray-900"
                    }
                  >
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

<<<<<<< HEAD
          {/* 🔥 SECTION MATÉRIAUX MAINTENANCE - REDESIGN */}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          {isMaintenance && (
            <div
              className={`space-y-4 pt-4 mt-4 border-t animate-in slide-in-from-top-2 duration-300 ${
                isDark ? "border-rose-500/30" : "border-rose-200"
              }`}
            >
              {/* Header alerte */}
              <div
                className={`p-4 rounded-2xl border ${
                  isDark
                    ? "bg-rose-500/10 border-rose-500/30"
                    : "bg-rose-50 border-rose-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-rose-500/20" : "bg-rose-100"}`}
                  >
                    <Wrench
                      className={`w-5 h-5 ${isDark ? "text-rose-400" : "text-rose-600"}`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold ${isDark ? "text-rose-300" : "text-rose-700"}`}
                    >
                      Matériaux requis pour la maintenance
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${isDark ? "text-rose-200/60" : "text-rose-600"}`}
                    >
                      Définissez au moins un matériau avec sa quantité
                    </p>
                  </div>
                </div>
              </div>

              {/* Liste des besoins */}
              <div className="space-y-3">
                {besoinsMaintenance.map((b, i) => (
                  <div
                    key={i}
<<<<<<< HEAD
                    className={`p-4 rounded-2xl border transition-all duration-300 ${
=======
                    className={`p-4 rounded-2xl border transition-all duration-300  ${
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                      isDark
                        ? "bg-white/[0.03] border-white/10 hover:border-white/20"
                        : "bg-gray-50/80 border-gray-200 hover:border-gray-300"
                    }`}
                  >
<<<<<<< HEAD
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 text-sm font-bold ${
=======
       
                    <div className="flex min-[477px]:hidden flex-col items-center gap-3">
                      {/* Numéro centré en haut */}
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
                          isDark
                            ? "bg-white/10 text-white/60"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {i + 1}
                      </div>

                      
                      <div className="w-full">
                        <div className="relative">
                          <Package
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
                          />
                          <select
                            value={b.nom}
                            onChange={(e) =>
                              updateBesoin(i, "nom", e.target.value)
                            }
                            className={`${selectClass} pl-10 w-full text-sm`}
                          >
                            <option
                              value=""
                              className={isDark ? "bg-gray-800" : "bg-white"}
                            >
                              -- Choisir un matériau --
                            </option>
                            {materiaux.map((m) => (
                              <option
                                key={m.id}
                                value={m.nom}
                                className={isDark ? "bg-gray-800" : "bg-white"}
                              >
                                {m.nom} (Stock: {m.stock})
                              </option>
                            ))}
                            <option
                              value="__nouveau__"
                              className={isDark ? "bg-gray-800" : "bg-white"}
                            >
                              + Nouveau matériau
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Input nouveau matériau (si sélectionné) */}
                      {b.nom === "__nouveau__" && (
                        <div className="w-full">
                          <input
                            type="text"
                            placeholder="Nom du nouveau matériau"
                            value={b.nomManuel || ""}
                            onChange={(e) =>
                              updateBesoin(i, "nomManuel", e.target.value)
                            }
                            className={`${inputClass} w-full text-sm`}
                            autoFocus
                          />
                        </div>
                      )}

                      {/* Quantité + Unité côte à côte */}
                      <div className="flex gap-2 w-full">
                        <div className="relative flex-1">
                          <Layers
                            className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                          />
                          <input
                            type="number"
                            min={1}
                            value={b.quantite}
                            onChange={(e) =>
                              updateBesoin(
                                i,
                                "quantite",
                                Number(e.target.value),
                              )
                            }
                            placeholder="Quantité *"
                            className={`${inputClass} pl-10 w-full text-sm h-10`}
                          />
                        </div>
                        <div className="relative w-28">
                          {b.nom === "__nouveau__" ? (
                            <select
                              value={b.unite}
                              onChange={(e) =>
                                updateBesoin(i, "unite", e.target.value)
                              }
                              className={`${selectClass} w-full text-sm h-10`}
                            >
                              <option
                                value=""
                                className={isDark ? "bg-gray-800" : "bg-white"}
                              >
                                unité
                              </option>
                              {[
                                "kg",
                                "litres",
                                "m²",
                                "m³",
                                "pcs",
                                "sacs",
                                "feuilles",
                                "ml",
                                "tonnes",
                              ].map((u) => (
                                <option
                                  key={u}
                                  value={u}
                                  className={
                                    isDark ? "bg-gray-800" : "bg-white"
                                  }
                                >
                                  {u}
                                </option>
                              ))}
                            </select>
                          ) : b.nom && b.nom !== "" ? (
                            <input
                              type="text"
                              value={b.unite}
                              readOnly
                              placeholder="unité"
                              className={`${inputClass} w-full text-sm h-10 opacity-70 cursor-not-allowed`}
                            />
                          ) : (
                            <input
                              type="text"
                              value={b.unite}
                              onChange={(e) =>
                                updateBesoin(i, "unite", e.target.value)
                              }
                              placeholder="unité"
                              className={`${inputClass} w-full text-sm h-10`}
                            />
                          )}
                        </div>
                      </div>

                      {/* Poubelle centrée en bas */}
                      <button
                        onClick={() => removeBesoin(i)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all hover:scale-110 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* ── DESKTOP (≥477px) : Layout horizontal original ── */}
                    <div className="hidden min-[477px]:flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                          isDark
                            ? "bg-white/10 text-white/60"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {i + 1}
                      </div>

                      <div className="flex-1 space-y-3">
                        {/* Select matériau + input nouveau */}
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Package
                              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDark ? "text-gray-500" : "text-gray-400"}`}
                            />
                            <select
                              value={b.nom}
                              onChange={(e) =>
                                updateBesoin(i, "nom", e.target.value)
                              }
                              className={`${selectClass} pl-10 w-full text-sm`}
                            >
                              <option
                                value=""
                                className={isDark ? "bg-gray-800" : "bg-white"}
                              >
                                -- Choisir un matériau --
                              </option>
                              {materiaux.map((m) => (
                                <option
                                  key={m.id}
                                  value={m.nom}
                                  className={
                                    isDark ? "bg-gray-800" : "bg-white"
                                  }
                                >
                                  {m.nom} (Stock: {m.stock})
                                </option>
                              ))}
                              <option
                                value="__nouveau__"
                                className={isDark ? "bg-gray-800" : "bg-white"}
                              >
                                + Nouveau matériau
                              </option>
                            </select>
                          </div>

                          {b.nom === "__nouveau__" && (
                            <input
                              type="text"
                              placeholder="Nom du nouveau matériau"
                              value={b.nomManuel || ""}
                              onChange={(e) =>
                                updateBesoin(i, "nomManuel", e.target.value)
                              }
                              className={`${inputClass} flex-1 text-sm`}
                              autoFocus
                            />
                          )}
                        </div>

                        {/* Quantité + Unité */}
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Layers
                              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10 ${isDark ? "text-gray-500" : "text-gray-400"}`}
                            />
                            <input
                              type="number"
                              min={1}
                              value={b.quantite}
                              onChange={(e) =>
                                updateBesoin(
                                  i,
                                  "quantite",
                                  Number(e.target.value),
                                )
                              }
                              placeholder="Quantité *"
                              className={`${inputClass} pl-10 w-full text-sm h-10`}
                            />
                          </div>
                          <div className="relative w-28">
                            {b.nom === "__nouveau__" ? (
                              <select
                                value={b.unite}
                                onChange={(e) =>
                                  updateBesoin(i, "unite", e.target.value)
                                }
                                className={`${selectClass} w-full text-sm h-10`}
                              >
                                <option
                                  value=""
                                  className={
                                    isDark ? "bg-gray-800" : "bg-white"
                                  }
                                >
                                  unité
                                </option>
                                {[
                                  "kg",
                                  "litres",
                                  "m²",
                                  "m³",
                                  "pcs",
                                  "sacs",
                                  "feuilles",
                                  "ml",
                                  "tonnes",
                                ].map((u) => (
                                  <option
                                    key={u}
                                    value={u}
                                    className={
                                      isDark ? "bg-gray-800" : "bg-white"
                                    }
                                  >
                                    {u}
                                  </option>
                                ))}
                              </select>
                            ) : b.nom && b.nom !== "" ? (
                              <input
                                type="text"
                                value={b.unite}
                                readOnly
                                placeholder="unité"
                                className={`${inputClass} w-full text-sm h-10 opacity-70 cursor-not-allowed`}
                              />
                            ) : (
                              <input
                                type="text"
                                value={b.unite}
                                onChange={(e) =>
                                  updateBesoin(i, "unite", e.target.value)
                                }
                                placeholder="unité"
                                className={`${inputClass} w-full text-sm h-10`}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeBesoin(i)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-all hover:scale-110 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bouton ajouter */}
              <button
                onClick={addBesoin}
                className={`w-full py-3 rounded-xl text-sm font-semibold border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-2 ${
                  isDark
                    ? "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70 hover:bg-white/5"
                    : "border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Plus className="w-4 h-4" /> Ajouter un matériau
              </button>

              {/* Erreurs */}
              {errorsMaintenance.length > 0 && (
                <div
                  className={`p-4 rounded-2xl border space-y-1.5 ${
                    isDark
                      ? "bg-rose-500/10 border-rose-500/30"
                      : "bg-rose-50 border-rose-200"
                  }`}
                >
                  {errorsMaintenance.map((err, i) => (
                    <p
                      key={i}
                      className={`text-xs flex items-center gap-1.5 ${
                        isDark ? "text-rose-300" : "text-rose-600"
                      }`}
                    >
                      <AlertTriangle className="w-3 h-3 shrink-0" /> {err}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-5 border-t flex gap-3 ${isDark ? "border-white/10 bg-white/[0.02]" : "border-gray-200 bg-gray-50/50"}`}
        >
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02] ${
              isDark
                ? "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                : "border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            <Check size={16} />
            {logement ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
// ─── Carte Logement 3D ────────────────────────────────────────────────────────
=======
// Carte Logement 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function LogementCard3D({
  logement,
  occupants,
  onDetail,
  onEdit,
  index,
  isDark,
  setLogMaintenance,
}) {
  const { style } = useReveal(index * 80);
  const theme = isDark ? THEMES.dark : THEMES.light;
  const statutConfig = getStatutConfig(logement.statut, isDark);
  const isFull = occupants.length >= logement.nb_occupants_max;
  const isMaintenance = logement.statut === "Maintenance";

  const accentColor = statutConfig.color;

  return (
    <div style={style} className="group relative">
<<<<<<< HEAD
      {/* Ombre 3D dynamique */}
=======
     
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      <div
        className="absolute inset-0 rounded-2xl transform translate-y-3 blur-xl transition-all duration-500 group-hover:translate-y-5 group-hover:blur-2xl opacity-60"
        style={{ background: `${accentColor}${isMaintenance ? "30" : "20"}` }}
      />

      <div
        className={`relative backdrop-blur-xl border rounded-2xl p-6 overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-[1.03] ${
          isDark
            ? "bg-gradient-to-br from-gray-800/90 via-gray-900/80 to-gray-900/90 border-white/10"
            : "bg-gradient-to-br from-white via-gray-50/80 to-white border-gray-200/60 shadow-xl shadow-gray-200/50"
        }`}
      >
<<<<<<< HEAD
        {/* Halo lumineux au hover */}
=======
        
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"
          style={{ background: `${accentColor}15` }}
        />

<<<<<<< HEAD
        {/* Ligne lumineuse en haut */}
=======
       
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div
          className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`,
          }}
        />

<<<<<<< HEAD
        {/* Badge statut flottant */}
        <div className="absolute top-4 right-4 z-20">
=======
        
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          <div
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-white/80"
            }`}
          >
            <span style={{ color: accentColor }}>{logement.statut}</span>
          </div>
        </div>

<<<<<<< HEAD
        {/* Header avec icône */}
=======
        
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${
              isDark ? "bg-white/5" : "bg-gray-100"
            }`}
            style={{
              boxShadow: `0 0 20px ${accentColor}20, inset 0 1px 0 ${isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.8)"}`,
            }}
          >
            <Home
              className="w-7 h-7 transition-colors duration-300"
              style={{ color: accentColor }}
            />
            <div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 animate-pulse"
              style={{
                backgroundColor: accentColor,
                borderColor: isDark ? "#1f2937" : "#ffffff",
              }}
            />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <p
              className={`text-[10px] font-mono tracking-widest uppercase mb-1.5 ${theme.textLight}`}
            >
              {logement.id}
            </p>
            <h3
              className={`text-xl font-black tracking-tight truncate group-hover:text-[#C9A84C] transition-colors duration-300 ${theme.text}`}
            >
              {logement.type}
            </h3>
          </div>
        </div>

<<<<<<< HEAD
        {/* Infos localisation */}
=======
        
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div
          className="flex items-center gap-2 mb-5 px-3 py-2.5 rounded-xl border transition-colors duration-300"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          }}
        >
          <MapPin
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: accentColor }}
          />
          <p className={`text-xs truncate ${theme.textSubtle}`}>
            {logement.localisation || "Non défini"}
          </p>
        </div>

        {/* Grille infos */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
              isDark
                ? "border-white/5 bg-white/[0.02]"
                : "border-gray-100 bg-gray-50/50"
            }`}
          >
            <Maximize2
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: accentColor }}
            />
            <div>
              <p
                className={`text-[10px] uppercase tracking-wider ${theme.textLight}`}
              >
                Superficie
              </p>
              <p className={`text-sm font-bold ${theme.text}`}>
                {logement.superficie} m²
              </p>
            </div>
          </div>
          <div
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-300 ${
              isDark
                ? "border-white/5 bg-white/[0.02]"
                : "border-gray-100 bg-gray-50/50"
            }`}
          >
            <Users
              className="w-3.5 h-3.5 shrink-0"
              style={{ color: accentColor }}
            />
            <div>
              <p
                className={`text-[10px] uppercase tracking-wider ${theme.textLight}`}
              >
                Capacité
              </p>
              <p className={`text-sm font-bold ${theme.text}`}>
                {logement.nb_occupants_max} pers.
              </p>
            </div>
          </div>
        </div>

        {/* Barre d'occupation */}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider ${theme.textLight}`}
            >
              Occupation
            </span>
            <span
              className={`text-xs font-black ${isFull ? "text-rose-500" : theme.textMuted}`}
            >
              {occupants.length} / {logement.nb_occupants_max}
            </span>
          </div>
          <AnimatedProgress
            value={occupants.length}
            max={logement.nb_occupants_max}
            color={
              isFull ? "#f43f5e" : occupants.length > 0 ? "#C9A84C" : "#9ca3af"
            }
            isDark={isDark}
          />
        </div>

<<<<<<< HEAD
        {/* 🔥 Info attribution si occupé */}
=======
        
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        {logement.statut === "Occupé" && (
          <div
            className={`flex items-center gap-2 mb-3 px-3 py-2 rounded-xl border ${
              isDark
                ? "bg-amber-500/10 border-amber-500/20"
                : "bg-amber-50 border-amber-200"
            }`}
          >
            <Users className="w-3 h-3 text-amber-500" />
            <span
              className={`text-xs ${isDark ? "text-amber-300" : "text-amber-700"}`}
            >
              {occupants.length === logement.nb_occupants_max
<<<<<<< HEAD
                ? "🔒 Logement plein"
=======
                ? " Logement plein"
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                : `${logement.nb_occupants_max - occupants.length} place(s) disponible(s)`}
            </span>
          </div>
        )}

        {/* Tags occupants */}
        {occupants.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {occupants.slice(0, 3).map((o) => (
              <span
                key={o}
                className={`text-[10px] px-2.5 py-1 rounded-full font-semibold border backdrop-blur-sm ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white/70"
                    : "bg-[#0F2D56]/5 border-[#0F2D56]/10 text-[#0F2D56]"
                }`}
              >
                {o}
              </span>
            ))}
            {occupants.length > 3 && (
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                  isDark ? "text-white/40" : "text-gray-400"
                }`}
              >
                +{occupants.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div
          className="flex gap-2 pt-4 border-t"
          style={{
            borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          }}
        >
          <button
            onClick={onDetail}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDark
                ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10"
                : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 border border-gray-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Détails
          </button>

          {/* 🔒 Bouton Modifier désactivé si en Maintenance */}
          <button
            onClick={isMaintenance ? undefined : onEdit}
            disabled={isMaintenance}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
              isMaintenance
                ? isDark
                  ? "bg-white/[0.02] text-white/20 border border-white/5 cursor-not-allowed"
                  : "bg-gray-100 text-gray-300 border border-gray-200 cursor-not-allowed"
                : isDark
                  ? "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 hover:scale-105 active:scale-95"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 border border-gray-200 hover:scale-105 active:scale-95"
            }`}
            title={
              isMaintenance
                ? "Réparation requise avant modification"
                : "Modifier"
            }
          >
            <PencilRuler className="w-3.5 h-3.5" />
            {isMaintenance ? "Bloqué" : "Modifier"}
          </button>
        </div>

        {/* Reflet lumineux en bas */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

function ModalMaintenance({ logement, materiaux, onClose, onConfirm, isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const [besoins, setBesoins] = useState([
    { nom: "", quantite: 1, unite: "unités" },
  ]);

  const addLigne = () =>
    setBesoins((prev) => [...prev, { nom: "", quantite: 1, unite: "unités" }]);
  const updateLigne = (i, field, val) =>
    setBesoins((prev) =>
      prev.map((b, idx) => (idx === i ? { ...b, [field]: val } : b)),
    );
  const removeLigne = (i) =>
    setBesoins((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div
<<<<<<< HEAD
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-lg border overflow-hidden ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
=======
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-2 sm:p-4 overflow-y-auto ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-lg mx-4 border overflow-hidden ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      >
        <div
          className="px-6 py-5 border-b flex items-center justify-between"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h2 className={`text-lg font-black ${theme.text}`}>
                Passer en Maintenance
              </h2>
              <p className={`text-xs ${theme.textSubtle}`}>
                {logement.id} — {logement.type}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className={`text-sm font-semibold ${theme.textMuted}`}>
            Définir les matériaux nécessaires :
          </p>
          {besoins.map((b, i) => (
            <div key={i} className="flex gap-2 items-center">
              <select
                value={b.nom}
                onChange={(e) => updateLigne(i, "nom", e.target.value)}
                className={`flex-1 px-3 py-2 rounded-xl text-sm border focus:outline-none focus:border-[#C9A84C] ${theme.input} ${theme.text}`}
              >
                <option value="">-- Choisir matériau --</option>
                {materiaux.map((m) => (
                  <option key={m.id} value={m.nom}>
                    {m.nom}
                  </option>
                ))}
                <option value="__nouveau__">+ Nouveau matériau</option>
              </select>
              {b.nom === "__nouveau__" && (
                <input
                  placeholder="Nom du matériau"
                  onChange={(e) => updateLigne(i, "nom", e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-xl text-sm border focus:outline-none focus:border-[#C9A84C] ${theme.input} ${theme.text}`}
                />
              )}
              <input
                type="number"
                min={1}
                value={b.quantite}
                onChange={(e) =>
                  updateLigne(i, "quantite", Number(e.target.value))
                }
                className={`w-20 px-3 py-2 rounded-xl text-sm border focus:outline-none ${theme.input} ${theme.text}`}
              />
              <input
                value={b.unite}
                onChange={(e) => updateLigne(i, "unite", e.target.value)}
                placeholder="unité"
                className={`w-24 px-3 py-2 rounded-xl text-sm border focus:outline-none ${theme.input} ${theme.text}`}
              />
              <button
                onClick={() => removeLigne(i)}
                className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={addLigne}
            className={`w-full py-2 rounded-xl text-sm border-dashed border-2 transition ${isDark ? "border-white/20 text-white/50 hover:border-white/40" : "border-gray-300 text-gray-400 hover:border-gray-400"}`}
          >
            + Ajouter un matériau
          </button>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${theme.buttonSecondary}`}
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm(
                besoins.filter((b) => b.nom && b.nom !== "__nouveau__"),
              );
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg hover:shadow-rose-500/25 transition"
          >
            Confirmer la maintenance
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Main ─────────────────────────────────────────────────────────────────────
=======
//Main 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
export default function Logements() {
  const {
    logements,
    attributions,
    ajouterLogement,
    modifierLogement,

    materiaux,
    demarrerMaintenance,
    commencerReparation,
    terminerReparation,
    alertesMaintenanceLog,
    travauxEnCours,
<<<<<<< HEAD
     logementsLoading, 
  } = useApp();
  const { logementsLoading: loading } = useApp();
=======
  } = useApp();
  const loading = false;
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const isDark = useDarkMode();

  const theme = isDark ? THEMES.dark : THEMES.light;

  const [vue, setVue] = useState("carte");
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [logMaintenance, setLogMaintenance] = useState(null);
<<<<<<< HEAD
 
  const [, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now(); // ✅ nom différent

      // 🔄 met à jour le temps
      setNow(currentTime);

      // 🔧 vérifie fin des travaux
      Object.entries(travauxEnCours || {}).forEach(([logId, travaux]) => {
        if (currentTime >= travaux.fin) {
          terminerReparation(logId);
        }
      });
    }, 1000); // 👉 100 = ultra fluide

    return () => clearInterval(interval);
  }, [travauxEnCours, terminerReparation]);

  const filtered = logements.filter(
  (l) =>
    (filtre === "Tous" || l.statut === filtre) &&
    (String(l.id).toLowerCase().includes(search.toLowerCase()) ||
      (l.localisation || "").toLowerCase().includes(search.toLowerCase()) ||
      (l.type || "").toLowerCase().includes(search.toLowerCase())),
);
=======
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
 
  useEffect(() => {
    console.log("[DEBUG] Contexte disponible:", {
      demarrerMaintenance: typeof demarrerMaintenance,
      alertesMaintenanceLog: alertesMaintenanceLog,
      logementsCount: logements.length,
    });
  }, [demarrerMaintenance, alertesMaintenanceLog, logements.length]);
  
  const [, setNow] = useState(Date.now());
  const terminerEnCours = useRef(new Set());

  const travauxRef = useRef(travauxEnCours);
  useEffect(() => {
    travauxRef.current = travauxEnCours;
  }, [travauxEnCours]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      Object.entries(travauxRef.current || {}).forEach(([logId, travaux]) => {
        if (currentTime >= travaux.fin && !terminerEnCours.current.has(logId)) {
          terminerEnCours.current.add(logId);
          terminerReparation(logId).finally(() => {
            terminerEnCours.current.delete(logId);
          });
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [terminerReparation]); 

  const filtered = logements.filter(
    (l) =>
      (filtre === "Tous" || l.statut === filtre) &&
      (String(l.id).toLowerCase().includes(search.toLowerCase()) ||
        (l.localisation || "").toLowerCase().includes(search.toLowerCase()) ||
        (l.type || "").toLowerCase().includes(search.toLowerCase())),
  );
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

  const getOccupants = (logId) => {
    const att = attributions.find(
      (a) => a.logement === logId && a.statut === "Occupé",
    );
    return att ? att.occupants : [];
  };

  const handleSave = (form) => {
    if (formData) {
      // Mode MODIFICATION
      const ancienLogement = logements.find((l) => l.id === formData.id);

<<<<<<< HEAD
      // 🔒 BLOCAGE 1 : Si en Maintenance et pas réparé, bloquer modification
=======
      
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      if (
        ancienLogement?.statut === "Maintenance" &&
        form.statut !== "Disponible"
      ) {
        alert("Ce logement est en maintenance. Vous devez d'abord le réparer.");
        setFormData(null);
        setIsAdding(false);
        return;
      }

<<<<<<< HEAD
      // 🔒 BLOCAGE 2 : Interdiction de passer de "Occupé" à "Disponible" manuellement
=======
      
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      if (ancienLogement?.statut === "Occupé" && form.statut === "Disponible") {
        alert(
          "Impossible de remettre un logement occupé en disponible manuellement. Utilisez le module Employés pour libérer le logement.",
        );
        setFormData(null);
        setIsAdding(false);
        return;
      }

<<<<<<< HEAD
      // 🔒 BLOCAGE 3 : Disponible → Occupé interdit
=======
      
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      if (ancienLogement?.statut === "Disponible" && form.statut === "Occupé") {
        alert(
          "Impossible de passer un logement disponible en occupé manuellement. Utilisez le module Attributions.",
        );
        setFormData(null);
        setIsAdding(false);
        return;
      }

<<<<<<< HEAD
      // 🔒 BLOCAGE 4 : Capacité minimum = nombre d'occupants actuels
=======
      
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      const occupants = getOccupants(formData.id);
      if (form.nb_occupants_max < occupants.length) {
        alert(
          `Impossible de réduire la capacité en dessous du nombre d'occupants actuels (${occupants.length}).`,
        );
        setFormData(null);
        setIsAdding(false);
        return;
      }

<<<<<<< HEAD
      // Mise à jour du logement
      const logementData = {
        ...form,
        id: formData.id,
        // 🔥 Si le logement était Occupé, on garde Occupé (seul employes.jsx change ça)
        statut: ancienLogement?.statut === "Occupé" ? "Occupé" : form.statut,
      };

      // 🔥 Ajouter besoinsMaintenance si passage en maintenance
=======
      
      const logementData = {
        ...form,
        id: formData.id,
        statut:
          ancienLogement?.statut === "Occupé"
            ? "Occupé"
            : form.statut === "Maintenance"
              ? ancienLogement?.statut || "Disponible"
              : form.statut, 
      };

      
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      if (form.statut === "Maintenance" && form._maintenanceBesoins) {
        const besoinsFiltres = form._maintenanceBesoins.filter(
          (b) => b.nom && b.nom.trim() !== "" && b.quantite > 0,
        );
        logementData.besoinsMaintenance = besoinsFiltres;
      }

<<<<<<< HEAD
      modifierLogement(logementData);

      // 🔥 Si passage en maintenance, démarrer le suivi avec les matériaux
      if (form.statut === "Maintenance" && form._maintenanceBesoins) {
        const besoinsFiltres = form._maintenanceBesoins.filter(
          (b) => b.nom && b.nom.trim() !== "" && b.quantite > 0,
        );
        demarrerMaintenance(formData.id, besoinsFiltres, logementData);
      }

      setFormData(null);
      setIsAdding(false);
=======
     
      modifierLogement(logementData)
        .then((logMaj) => {
          if (form.statut === "Maintenance" && form._maintenanceBesoins) {
            const besoinsFiltres = form._maintenanceBesoins.filter(
              (b) => b.nom && b.nom.trim() !== "" && b.quantite > 0,
            );
            demarrerMaintenance(
              formData.id,
              besoinsFiltres,
              logMaj || logementData,
            );
          }
          setFormData(null);
          setIsAdding(false);
        })
        .catch((err) => {
          console.error("Erreur modification logement", err);
          setFormData(null);
          setIsAdding(false);
        });
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    } else {
      // Mode AJOUT - nouveau logement
      const now = new Date();
      const nouvelHistorique = [
        {
          id: `hist-${Date.now()}`,
          type: "creation",
          date: now.toLocaleDateString("fr-FR"),
          heure: now.toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          details: `Création du logement ${form.type} - ${form.localisation}`,
          statut: form.statut === "Maintenance" ? "Maintenance" : "Disponible",
        },
      ];
<<<<<<< HEAD

      if (form.statut === "Maintenance" && form._maintenanceBesoins) {
        // 🔥 Vérifier les matériaux avant création en maintenance
=======
      // APRÈS
      if (form.statut === "Maintenance" && form._maintenanceBesoins) {
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        const besoins = form._maintenanceBesoins;
        const besoinsValides = besoins.filter(
          (b) => b.nom && b.nom.trim() !== "" && b.quantite > 0,
        );

        if (besoinsValides.length === 0) {
          alert(
            "Vous devez définir au moins un matériau valide pour créer un logement en maintenance.",
          );
          setIsAdding(false);
          return;
        }

<<<<<<< HEAD
        // Ajout avec maintenance → _statutInitial sera "Disponible" dans ajouterLogement
        const newLog = ajouterLogement({
          ...form,
          statut: "Maintenance",
          besoinsMaintenance: besoinsValides,
          historique: nouvelHistorique,
        });

        if (newLog && newLog.id) {
          demarrerMaintenance(newLog.id, besoinsValides, newLog);
        }
      } else {
        // Ajout normal → statut forcé à "Disponible" dans ajouterLogement
        ajouterLogement({
          ...form,
          statut: "Disponible", // sera forcé de toute façon
          historique: nouvelHistorique,
        });
      }

      setIsAdding(false);
=======
        ajouterLogement({
          ...form,
          statut: "Disponible", 
          besoinsMaintenance: besoinsValides,
          historique: nouvelHistorique,
        })
          .then((newLog) => {
            if (newLog && newLog.id) {
              demarrerMaintenance(newLog.id, besoinsValides, newLog);
            }
            setIsAdding(false);
          })
          .catch((err) => {
            console.error("Erreur création logement maintenance", err);
            setIsAdding(false);
          });
      } else {
        ajouterLogement({
          ...form,
          statut: "Disponible",
          historique: nouvelHistorique,
        })
          .then(() => {
            setIsAdding(false);
          })
          .catch((err) => {
            console.error("Erreur création logement", err);
            setIsAdding(false);
          });
      }
     
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    }
  };
  // Stats
  const totalLogements = logements.length;
  const disponibles = logements.filter((l) => l.statut === "Disponible").length;
  const occupes = logements.filter((l) => l.statut === "Occupé").length;
  const maintenance = logements.filter(
    (l) => l.statut === "Maintenance",
  ).length;
<<<<<<< HEAD
  //const totalSuperficie = logements.reduce((s, l) => s + (l.superficie || 0), 0);
=======
  
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${theme.bg} flex items-center justify-center`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center shadow-lg shadow-blue-500/20 animate-pulse">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <Loader2 className="w-6 h-6 animate-spin text-[#C9A84C] absolute -bottom-1 -right-1" />
          </div>
          <span className={theme.textSubtle}>Chargement des logements...</span>
        </div>
      </div>
    );
  }

  return (
    <div
<<<<<<< HEAD
      className={`min-h-screen bg-gradient-to-br p-6 space-y-6 transition-colors duration-500 ${theme.bg}`}
=======
      className={`min-h-screen bg-gradient-to-br p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 transition-colors duration-500 ${theme.bg}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    >
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite; }
<<<<<<< HEAD
=======
        
        /* breakpoint xs personnalisé */
        @media (min-width: 400px) {
          .xs\\:inline { display: inline !important; }
        }
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      `}</style>

      {detail && (
        <ModalDetail
          logement={detail}
          attributions={attributions}
          onClose={() => setDetail(null)}
          isDark={isDark}
          travauxEnCours={travauxEnCours}
          commencerReparation={commencerReparation}
          terminerReparation={terminerReparation}
          alertesMaintenanceLog={alertesMaintenanceLog}
        />
      )}
      {(formData || isAdding) && (
        <ModalForm
          logement={formData}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
          isDark={isDark}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-3xl font-black flex items-center gap-3 ${theme.text}`}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            Gestion des Logements
          </h1>
          <p className={theme.textSubtle}>
            Suivi du parc immobilier et des attributions
          </p>
        </div>
      </div>

      {/* Stats 3D */}
<<<<<<< HEAD
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
=======
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <StatCard3D
          icon={Building2}
          label="Total logements"
          value={totalLogements}
          color="blue"
          delay={0}
          trend="up"
          trendValue={5}
          isDark={isDark}
        />
        <StatCard3D
          icon={DoorOpen}
          label="Disponibles"
          value={disponibles}
          color="emerald"
          delay={100}
          subValue={`${totalLogements > 0 ? Math.round((disponibles / totalLogements) * 100) : 0}% du parc`}
          isDark={isDark}
        />
        <StatCard3D
          icon={Users}
          label="Occupés"
          value={occupes}
          color="amber"
          delay={200}
          trend="up"
          trendValue={3}
          isDark={isDark}
        />
        <StatCard3D
          icon={Wrench}
          label="En maintenance"
          value={maintenance}
          color="rose"
          delay={300}
          subValue={maintenance > 0 ? "Intervention requise" : "Aucun problème"}
          isDark={isDark}
        />
      </div>

<<<<<<< HEAD
      {/* 🔥🔥🔥 CARTES "COMMENCER À RÉPARER" - STYLE PHOTO 🔥🔥🔥 */}
      {logements.filter(
        (l) =>
          (l.statut === "Maintenance" || l.statut === "EN_REPARATION") &&
          l.materiauxSortis,
      ).length > 0 && (
=======
      {logements.filter((l) => {
        if (l.statut !== "Maintenance" && l.statut !== "EN_REPARATION")
          return false;
        const besoins = l.besoinsMaintenance || [];
        const sortis = l.materiauxSortis || [];
        if (besoins.length === 0) return false;
        
        return sortis.length > 0;
      }).length > 0 && (
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? "bg-emerald-500/20" : "bg-emerald-200"
              }`}
            >
              <HardHat
                className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
              />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${theme.text}`}>
                🔧 Prêt à réparer
              </h3>
              <p className={`text-sm ${theme.textSubtle}`}>
                Les matériaux sont arrivés, vous pouvez commencer les travaux
              </p>
            </div>
<<<<<<< HEAD
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {logements
              .filter(
                (l) =>
                  (l.statut === "Maintenance" ||
                    l.statut === "EN_REPARATION") &&
                  l.materiauxSortis,
              )
              .map((logement) => {
                const travaux = travauxEnCours?.[logement.id];
                const besoins = logement.besoinsMaintenance || [];
                const materiauxSortis = logement.materiauxSortis || [];
                const now = Date.now();

                return (
                  <div key={logement.id} className="group relative">
                    {/* Ombre 3D */}
                    <div
                      className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${
                        isDark ? "bg-emerald-500/20" : "bg-emerald-400/30"
                      } group-hover:translate-y-4 group-hover:blur-xl`}
                    />

                    <div
                      className={`relative bg-gradient-to-br ${
                        isDark
                          ? "from-emerald-500/15 to-emerald-600/5 border-emerald-500/30"
                          : "from-emerald-100 to-emerald-50 border-emerald-300"
                      } backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${
                        isDark ? "" : "shadow-lg"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 ${
                            isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <HardHat className="w-7 h-7" />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            travaux
                              ? isDark
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-amber-100 text-amber-600 border-amber-300"
                              : isDark
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-emerald-100 text-emerald-600 border-emerald-300"
                          }`}
                        >
                          {travaux ? (
                            <>
                              <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                              En cours
                            </>
                          ) : (
                            "✓ Matériaux reçus"
                          )}
                        </span>
                      </div>

                      {/* Infos logement */}
                      <div className="space-y-3">
                        <div>
                          <p
                            className={`text-xs font-mono mb-1 ${theme.textLight}`}
                          >
                            {logement.id}
                          </p>
                          <h3
                            className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors ${theme.text}`}
                          >
                            {logement.type}
                          </h3>
                          <p className={`text-sm ${theme.textMuted}`}>
                            {logement.localisation}
                          </p>
                        </div>

                        {/* Matériaux reçus */}
                        <div
                          className={`p-3 rounded-xl border ${
                            isDark
                              ? "bg-white/5 border-white/10"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <p
                            className={`text-xs font-bold mb-2 ${theme.textSubtle}`}
                          >
                            Matériaux reçus :
                          </p>
                          <div className="space-y-1.5">
                            {materiauxSortis.map((ms, i) => {
                              const besoin = besoins.find(
                                (b) => b.nom === ms.nom,
                              );
                              const isSurplus =
                                besoin && ms.quantiteSortie > besoin.quantite;

                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className={theme.textMuted}>
                                    {ms.nom} × {ms.quantiteSortie} {ms.unite}
                                  </span>
                                  {isSurplus ? (
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isDark
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-amber-100 text-amber-600"
                                      }`}
                                    >
                                      Surplus +
                                      {ms.quantiteSortie - besoin.quantite}
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isDark
                                          ? "bg-emerald-500/20 text-emerald-400"
                                          : "bg-emerald-100 text-emerald-600"
                                      }`}
                                    >
                                      ✓ OK
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Timer ou bouton */}
                        {travaux ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className={theme.textSubtle}>
                                Progression
                              </span>
                              <span
                                className={`font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}
                              >
                                {Math.max(
                                  0,
                                  Math.ceil((travaux.fin - now) / 1000),
                                )}
                                s
                              </span>
                            </div>
                            <div
                              className={`h-2 rounded-full overflow-hidden ${
                                isDark ? "bg-white/10" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-1000"
                                style={{
                                  width: `${Math.min(100, ((now - travaux.debut) / (travaux.fin - travaux.debut)) * 100)}%`,
                                }}
                              />
                            </div>
                            <p
                              className={`text-xs text-center ${theme.textLight}`}
                            >
                              Le surplus sera retourné au stock automatiquement
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              // 🔥 Vérifier avant de lancer
                              const besoins = logement.besoinsMaintenance || [];
                              const sortis = logement.materiauxSortis || [];
                              const manquants = besoins.filter((b) => {
                                const s = sortis.find(
                                  (ms) =>
                                    ms.nom.toLowerCase() ===
                                    b.nom.toLowerCase(),
                                );
                                return !s || s.quantiteSortie < b.quantite;
                              });

                              if (manquants.length > 0) {
                                alert(
                                  `Matériaux manquants : ${manquants.map((b) => b.nom).join(", ")}\n\nSortez-les d'abord du stock.`,
                                );
                                return;
                              }

                              commencerReparation(logement.id, 2);
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
                          >
                            <Play className="w-5 h-5" />
                            Commencer à réparer
                          </button>
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Alertes maintenance */}
      {maintenance > 0 && (
        <div
          className={`relative overflow-hidden border rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500 ${
            isDark
              ? "bg-gradient-to-r from-rose-500/20 to-amber-500/20 border-rose-500/30"
              : "bg-gradient-to-r from-rose-100 to-amber-100 border-rose-300"
          }`}
        >
          <div
            className={`absolute inset-0 animate-pulse ${isDark ? "bg-gradient-to-r from-rose-500/10 to-transparent" : "bg-gradient-to-r from-rose-200/50 to-transparent"}`}
          />
          <div className="relative flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center animate-bounce ${isDark ? "bg-rose-500/20" : "bg-rose-200"}`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${isDark ? "text-rose-400" : "text-rose-600"}`}
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${isDark ? "text-rose-200" : "text-rose-700"}`}
              >
                ⚠ {maintenance} logement{maintenance > 1 ? "s" : ""} en
                maintenance
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {logements
                  .filter((l) => l.statut === "Maintenance")
                  .map((l) => (
                    <span
                      key={l.id}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isDark
                          ? "bg-rose-500/20 border border-rose-500/30 text-rose-200"
                          : "bg-rose-200 border border-rose-300 text-rose-700"
                      }`}
                    >
                      {l.id} — {l.type}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alertes matériaux maintenance */}

      {/* Barre outils */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
          >
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  filtre === f
                    ? "bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white shadow-lg shadow-amber-500/20"
                    : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div
            className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
          >
            <button
              onClick={() => setVue("carte")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                vue === "carte"
                  ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/20"
                  : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
              }`}
            >
              <Blocks className="w-4 h-4" /> Cartes
            </button>
            <button
              onClick={() => setVue("tableau")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
=======
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {logements
              .filter(
                (l) =>
                  (l.statut === "Maintenance" ||
                    l.statut === "EN_REPARATION") &&
                  l.materiauxSortis,
              )
              .map((logement) => {
                const travaux = travauxEnCours?.[logement.id];
                const besoins = logement.besoinsMaintenance || [];
                const materiauxSortis = logement.materiauxSortis || [];
                const now = Date.now();

                return (
                  <div key={logement.id} className="group relative">
                    {/* Ombre 3D */}
                    <div
                      className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${
                        isDark ? "bg-emerald-500/20" : "bg-emerald-400/30"
                      } group-hover:translate-y-4 group-hover:blur-xl`}
                    />

                    <div
                      className={`relative bg-gradient-to-br ${
                        isDark
                          ? "from-emerald-500/15 to-emerald-600/5 border-emerald-500/30"
                          : "from-emerald-100 to-emerald-50 border-emerald-300"
                      } backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${
                        isDark ? "" : "shadow-lg"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 ${
                            isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <HardHat className="w-7 h-7" />
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${
                            travaux
                              ? isDark
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-amber-100 text-amber-600 border-amber-300"
                              : isDark
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-emerald-100 text-emerald-600 border-emerald-300"
                          }`}
                        >
                          {travaux ? (
                            <>
                              <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                              En cours
                            </>
                          ) : (
                            "✓ Matériaux reçus"
                          )}
                        </span>
                      </div>

                      {/* Infos logement */}
                      <div className="space-y-3">
                        <div>
                          <p
                            className={`text-xs font-mono mb-1 ${theme.textLight}`}
                          >
                            {logement.id}
                          </p>
                          <h3
                            className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors ${theme.text}`}
                          >
                            {logement.type}
                          </h3>
                          <p className={`text-sm ${theme.textMuted}`}>
                            {logement.localisation}
                          </p>
                        </div>

                        {/* Matériaux reçus */}
                        <div
                          className={`p-3 rounded-xl border ${
                            isDark
                              ? "bg-white/5 border-white/10"
                              : "bg-white border-gray-200"
                          }`}
                        >
                          <p
                            className={`text-xs font-bold mb-2 ${theme.textSubtle}`}
                          >
                            Matériaux reçus :
                          </p>
                          <div className="space-y-1.5">
                            {materiauxSortis.map((ms, i) => {
                              const besoin = besoins.find(
                                (b) => b.nom === ms.nom,
                              );
                              const isSurplus =
                                besoin && ms.quantiteSortie > besoin.quantite;

                              return (
                                <div
                                  key={i}
                                  className="flex items-center justify-between text-sm"
                                >
                                  <span className={theme.textMuted}>
                                    {ms.nom} × {ms.quantiteSortie} {ms.unite}
                                  </span>
                                  {isSurplus ? (
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isDark
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-amber-100 text-amber-600"
                                      }`}
                                    >
                                      Surplus +
                                      {ms.quantiteSortie - besoin.quantite}
                                    </span>
                                  ) : (
                                    <span
                                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                        isDark
                                          ? "bg-emerald-500/20 text-emerald-400"
                                          : "bg-emerald-100 text-emerald-600"
                                      }`}
                                    >
                                      ✓ OK
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Timer ou bouton */}
                        {travaux ? (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className={theme.textSubtle}>
                                Progression
                              </span>
                              <span
                                className={`font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}
                              >
                                {Math.max(
                                  0,
                                  Math.ceil((travaux.fin - now) / 1000),
                                )}
                                s
                              </span>
                            </div>
                            <div
                              className={`h-2 rounded-full overflow-hidden ${
                                isDark ? "bg-white/10" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400 transition-all duration-1000"
                                style={{
                                  width: `${Math.min(100, ((now - travaux.debut) / (travaux.fin - travaux.debut)) * 100)}%`,
                                }}
                              />
                            </div>
                            <p
                              className={`text-xs text-center ${theme.textLight}`}
                            >
                              Le surplus sera retourné au stock automatiquement
                            </p>
                          </div>
                        ) : (
                          <button
                            onClick={async () => {
                              // Vérifier avant de lancer
                              const besoins = logement.besoinsMaintenance || [];
                              const sortis = logement.materiauxSortis || [];
                              const manquants = besoins.filter((b) => {
                                const s = sortis.find(
                                  (ms) =>
                                    ms.nom.toLowerCase() ===
                                    b.nom.toLowerCase(),
                                );
                                return !s || s.quantiteSortie < b.quantite;
                              });

                              if (manquants.length > 0) {
                                alert(
                                  `Matériaux manquants : ${manquants.map((b) => b.nom).join(", ")}\n\nSortez-les d'abord du stock.`,
                                );
                                return;
                              }

                              await commencerReparation(logement.id, 2);
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
                          >
                            <Play className="w-5 h-5" />
                            Commencer à réparer
                          </button>
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Alertes maintenance */}
      {maintenance > 0 && (
        <div
          className={`relative overflow-hidden border rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500 ${
            isDark
              ? "bg-gradient-to-r from-rose-500/20 to-amber-500/20 border-rose-500/30"
              : "bg-gradient-to-r from-rose-100 to-amber-100 border-rose-300"
          }`}
        >
          <div
            className={`absolute inset-0 animate-pulse ${isDark ? "bg-gradient-to-r from-rose-500/10 to-transparent" : "bg-gradient-to-r from-rose-200/50 to-transparent"}`}
          />
          <div className="relative flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center animate-bounce ${isDark ? "bg-rose-500/20" : "bg-rose-200"}`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${isDark ? "text-rose-400" : "text-rose-600"}`}
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${isDark ? "text-rose-200" : "text-rose-700"}`}
              >
                ⚠ {maintenance} logement{maintenance > 1 ? "s" : ""} en
                maintenance
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {logements
                  .filter((l) => l.statut === "Maintenance")
                  .map((l) => (
                    <span
                      key={l.id}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        isDark
                          ? "bg-rose-500/20 border border-rose-500/30 text-rose-200"
                          : "bg-rose-200 border border-rose-300 text-rose-700"
                      }`}
                    >
                      {l.id} — {l.type}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col gap-3">
       
        <div className="flex items-center gap-2 flex-wrap">
          
          <div className="hidden sm:block">
            <div
              className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
            >
              {FILTRES.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltre(f)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    filtre === f
                      ? "bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white shadow-lg shadow-amber-500/20"
                      : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ── Filtres : mobile (dropdown) ── */}
          <div className="sm:hidden relative flex-1 min-w-0">
            <button
              onClick={() => setMenuMobileOuvert(!menuMobileOuvert)}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                isDark
                  ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <span className="flex items-center gap-2">
                <SquareMenu className="w-4 h-4" />
                <span className="max-[352px]:hidden"> : </span>
                <span className="text-[#C9A84C] overflow-hidden">{filtre}</span>
              </span>
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 ${menuMobileOuvert ? "rotate-90" : ""}`}
              />
            </button>

            {menuMobileOuvert && (
              <div
                className={`absolute top-full left-0 right-0 mt-1.5 rounded-xl border shadow-xl z-30 overflow-hidden ${
                  isDark
                    ? "bg-gray-900 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {FILTRES.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFiltre(f);
                      setMenuMobileOuvert(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                      filtre === f
                        ? isDark
                          ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                          : "bg-amber-50 text-amber-700"
                        : isDark
                          ? "text-white/70 hover:bg-white/5"
                          : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {filtre === f && <Check className="w-4 h-4" />}
                    <span className={filtre === f ? "font-bold" : ""}>{f}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Vue Carte/Tableau (compact) ── */}
          <div
            className={`flex gap-1 p-1 rounded-xl border backdrop-blur-sm shrink-0 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
          >
            <button
              onClick={() => setVue("carte")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                vue === "carte"
                  ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/20"
                  : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
              }`}
            >
              <Blocks className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Cartes</span>
            </button>
            <button
              onClick={() => setVue("tableau")}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                vue === "tableau"
                  ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/20"
                  : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
              }`}
            >
<<<<<<< HEAD
              <SquareMenu className="w-4 h-4" /> Tableau
            </button>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
=======
              <SquareMenu className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Tableau</span>
            </button>
          </div>
        </div>

        {/* Ligne 2 : Recherche + Ajouter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textLight}`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
<<<<<<< HEAD
              className={`pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition w-56 ${theme.input} ${theme.text}`}
=======
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition text-sm ${theme.input} ${theme.text}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            />
          </div>
          <button
            onClick={() => setIsAdding(true)}
<<<<<<< HEAD
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
          >
            <CirclePlus className="w-4 h-4" /> Ajouter
=======
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
          >
            <CirclePlus className="w-4 h-4" />
            <span className="hidden sm:inline">Ajouter</span>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          </button>
        </div>
      </div>

<<<<<<< HEAD
      <p className={theme.textLight}>
        {filtered.length} logement{filtered.length > 1 ? "s" : ""} trouvé
        {filtered.length > 1 ? "s" : ""}
      </p>

      {/* Vue carte 3D */}
      {vue === "carte" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
=======
      {/* Fermer le dropdown quand on clique ailleurs */}
      {menuMobileOuvert && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setMenuMobileOuvert(false)}
        />
      )}

      <p className={theme.textLight}>
        {filtered.length} logement{filtered.length > 1 ? "s" : ""} trouvé
        {filtered.length > 1 ? "s" : ""}
      </p>

      {/* Vue carte 3D */}
      {vue === "carte" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          {filtered.map((l, index) => (
            <LogementCard3D
              key={l.id}
              logement={l}
              occupants={getOccupants(l.id)}
              onDetail={() => setDetail(l)}
              onEdit={() => setFormData(l)}
              index={index}
              isDark={isDark}
              setLogMaintenance={setLogMaintenance}
            />
          ))}
        </div>
      )}

      {/* Vue tableau moderne */}
      {vue === "tableau" && (
        <div className="group relative">
          <div
            className={`absolute inset-0 rounded-2xl transform translate-y-2 blur-sm ${isDark ? "bg-black/20" : "bg-gray-400/15"}`}
          />
          <div
            className={`relative backdrop-blur-sm border rounded-3xl overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-xl shadow-gray-200/30"}`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr
                    className={`border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
                  >
                    <th
                      className={`text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <Home
                            className="w-3 h-3"
                            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                          />
                        </div>
                        Référence
                      </div>
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <Building2
                            className="w-3 h-3"
                            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                          />
                        </div>
                        Type & Localisation
                      </div>
                    </th>
                    <th
<<<<<<< HEAD
                      className={`text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
=======
                      className={`hidden md:table-cell text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <Maximize2
                            className="w-3 h-3"
                            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                          />
                        </div>
                        Superficie
                      </div>
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <Users
                            className="w-3 h-3"
                            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                          />
                        </div>
                        Occupation
                      </div>
                    </th>
                    <th
                      className={`text-left px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${isDark ? "bg-white/5" : "bg-gray-100"}`}
                        >
                          <Activity
                            className="w-3 h-3"
                            style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                          />
                        </div>
                        Statut
                      </div>
                    </th>
                    <th
                      className={`text-right px-6 py-4 text-[11px] font-bold uppercase tracking-widest ${theme.textLight}`}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l, i) => {
                    const occupants = getOccupants(l.id);
                    const isFull = occupants.length >= l.nb_occupants_max;
                    const statutCfg = getStatutConfig(l.statut, isDark);
                    const occPercent = Math.min(
                      (occupants.length / Math.max(l.nb_occupants_max, 1)) *
                        100,
                      100,
                    );

                    return (
                      <tr
                        key={l.id}
                        className={`border-b transition-all duration-300 cursor-pointer ${
                          isDark
                            ? "border-white/[0.04] hover:bg-white/[0.04]"
                            : "border-gray-100 hover:bg-gray-50/80"
                        }`}
                        onClick={() => setDetail(l)}
                      >
                        {/* Référence */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110`}
                              style={{
                                background: `${statutCfg.color}15`,
                                boxShadow: `0 0 12px ${statutCfg.color}10`,
                              }}
                            >
                              <Home
                                className="w-5 h-5"
                                style={{ color: statutCfg.color }}
                              />
                            </div>
                            <div>
                              <p
                                className={`text-xs font-mono font-semibold ${theme.textLight}`}
                              >
                                {l.id}
                              </p>
                              <p className={`text-xs ${theme.textSubtle}`}>
                                {l.type}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type & Localisation */}
                        <td className="px-6 py-4">
                          <p className={`text-sm font-bold mb-1 ${theme.text}`}>
                            {l.type}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <MapPin
                              className="w-3 h-3 shrink-0"
                              style={{ color: statutCfg.color }}
                            />
                            <p className={`text-xs ${theme.textSubtle}`}>
                              {l.localisation || "Non défini"}
                            </p>
                          </div>
                        </td>

                        {/* Superficie */}
<<<<<<< HEAD
                        <td className="px-6 py-4">
=======
                        <td className="px-6 py-4 hidden md:table-cell text-left ">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-lg font-black ${theme.text}`}
                            >
                              {l.superficie}
                            </span>
                            <span className={`text-xs ${theme.textLight}`}>
                              m²
                            </span>
                          </div>
                        </td>

                        {/* Occupation avec barre */}
                        <td className="px-6 py-4">
                          <div className="w-full max-w-[140px]">
                            <div className="flex justify-between items-center mb-1.5">
                              <span
                                className={`text-xs font-semibold ${isFull ? "text-rose-500" : theme.textMuted}`}
                              >
                                {occupants.length}/{l.nb_occupants_max}
                              </span>
                              <span
                                className={`text-[10px] ${theme.textLight}`}
                              >
                                {Math.round(occPercent)}%
                              </span>
                            </div>
                            <div
                              className={`h-1.5 rounded-full overflow-hidden ${
                                isDark ? "bg-white/10" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width: `${occPercent}%`,
                                  background: `linear-gradient(90deg, ${statutCfg.color}, ${statutCfg.color}cc)`,
                                  boxShadow: `0 0 6px ${statutCfg.color}30`,
                                }}
                              />
                            </div>
                            {occupants.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {occupants.slice(0, 2).map((o) => (
                                  <span
                                    key={o}
                                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium border ${
                                      isDark
                                        ? "bg-white/5 border-white/10 text-white/60"
                                        : "bg-gray-100 border-gray-200 text-gray-600"
                                    }`}
                                  >
                                    {o}
                                  </span>
                                ))}
                                {occupants.length > 2 && (
                                  <span
                                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                                      isDark ? "text-white/30" : "text-gray-400"
                                    }`}
                                  >
                                    +{occupants.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Statut */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{
                                backgroundColor: statutCfg.color,
                                boxShadow: `0 0 8px ${statutCfg.color}`,
                              }}
                            />
                            <span
                              className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                              style={{
                                color: statutCfg.color,
                                backgroundColor: `${statutCfg.color}15`,
                                borderColor: `${statutCfg.color}30`,
                              }}
                            >
                              {l.statut}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDetail(l);
                              }}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                                isDark
                                  ? "bg-blue-500/10 hover:bg-blue-500/20 text-blue-400"
                                  : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData(l);
                              }}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                                isDark
                                  ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-400"
                                  : "bg-amber-50 hover:bg-amber-100 text-amber-600"
                              }`}
                            >
                              <PencilRuler className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div
                className={`flex flex-col items-center justify-center py-16 ${isDark ? "text-white/30" : "text-gray-400"}`}
              >
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-sm font-medium">Aucun logement trouvé</p>
                <p className="text-xs mt-1">Essayez de modifier vos filtres</p>
              </div>
            )}

            {filtered.length > 10 && (
              <div
                className={`px-6 py-4 border-t flex items-center justify-between ${isDark ? "border-white/10" : "border-gray-200"}`}
              >
                <p className={`text-xs ${theme.textLight}`}>
                  Affichage de {filtered.length} logements
                </p>
                <button
                  className={`text-xs font-semibold flex items-center gap-1 transition-colors ${
                    isDark
                      ? "text-white/50 hover:text-white"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Voir tout
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          {logMaintenance && (
            <ModalMaintenance
              logement={logMaintenance}
              materiaux={materiaux}
              onClose={() => setLogMaintenance(null)}
              onConfirm={(besoins) =>
                demarrerMaintenance(logMaintenance.id, besoins)
              }
              isDark={isDark}
            />
          )}
        </div>
      )}
<<<<<<< HEAD
      {/* ── État des logements ── */}
      <div
        className={`backdrop-blur-sm border rounded-3xl p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
      >
        <div className="flex items-center justify-between mb-6">
=======
      {/*État des logements */}
      <div
        className={`backdrop-blur-sm border rounded-3xl p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
      >
        <div className="flex items-center justify-between mb-6 max-[1148px]:flex-col max-[1148px]:items-start max-[1148px]:gap-4">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text}`}>
                Historique de logements
              </h3>
              <p className={theme.textSubtle}>
                {logements.length} logement(s) — statut en temps réel
              </p>
            </div>
          </div>
<<<<<<< HEAD
          <div className="flex gap-4 text-sm">
=======
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm max-[1148px]:w-full max-[1148px]:justify-start">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            {["Disponible", "Occupé", "Maintenance"].map((s) => {
              const cfg = getStatutConfig(s, isDark);
              const count = logements.filter((l) => l.statut === s).length;
              return (
                <span
                  key={s}
                  className={`flex items-center gap-2 font-semibold px-3 py-1.5 rounded-lg`}
                  style={{
                    color: cfg.color,
                    backgroundColor: `${cfg.color}15`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cfg.color }}
                  />
                  {count} {s}
                </span>
              );
            })}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
              >
                {["Logement", "Événement", "Date", "Heure", "Détails"].map(
                  (h) => (
                    <th
                      key={h}
                      className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {logements
                .map((l) => ({
<<<<<<< HEAD
                  logementId: String(l.id),          // ← String() ici
                  logementType: l.type || "",
                  logementLocalisation: l.localisation || "",
                  statut: l.statut || "Disponible",
=======
                  logementId: l.id,
                  logementType: l.type,
                  logementLocalisation: l.localisation,
                  statut: l.statut,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  dernierChangement: l.dernierChangementStatut || null,
                  dateCreation:
                    l.historique?.find((h) => h.type === "creation")?.date ||
                    "-",
                  heureCreation:
                    l.historique?.find((h) => h.type === "creation")?.heure ||
                    "-",
                }))
                .sort((a, b) => {
<<<<<<< HEAD
                  if (a.statut === "Maintenance" && b.statut !== "Maintenance") return -1;
                  if (b.statut === "Maintenance" && a.statut !== "Maintenance") return 1;
                  return String(a.logementId).localeCompare(String(b.logementId));
=======
                  // Trier par statut Maintenance en premier, puis par ordre alphabétique
                  if (a.statut === "Maintenance" && b.statut !== "Maintenance")
                    return -1;
                  if (b.statut === "Maintenance" && a.statut !== "Maintenance")
                    return 1;
                  return String(a.logementId).localeCompare(
                    String(b.logementId),
                  );
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                })
                .map((l, idx) => {
                  const cfg = getStatutConfig(l.statut, isDark);
                  const isMaintenance = l.statut === "Maintenance";

                  return (
                    <tr
                      key={l.logementId}
                      className={`border-b transition group ${
                        isDark
                          ? `border-white/5 ${isMaintenance ? "bg-rose-500/5" : "hover:bg-white/5"}`
                          : `border-gray-100 ${isMaintenance ? "bg-rose-50/50" : "hover:bg-gray-50"}`
                      }`}
                    >
                      <td className={`py-3 px-4 ${theme.text}`}>
                        <div className="flex items-center gap-2">
                          <Home
                            className="w-4 h-4 shrink-0"
                            style={{ color: cfg.color }}
                          />
                          <div>
                            <p
<<<<<<< HEAD
                              className={`text-sm font-semibold group-hover:text-[#C9A84C] transition ${theme.text}`}
                            >
                              {l.logementId}
                            </p>
                            <p className={`text-xs ${theme.textLight}`}>
=======
                              className={`text-sm font-semibold group-hover:text-[#C9A84C] transition max-[744px]:text-xs max-[744px]:font-bold ${theme.text}`}
                            >
                              {l.logementId}
                            </p>
                            <p
                              className={`text-xs ${theme.textLight} max-[744px]:text-[10px]`}
                            >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                              {l.logementType} — {l.logementLocalisation}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border"
                          style={{
                            color: cfg.color,
                            backgroundColor: `${cfg.color}15`,
                            borderColor: `${cfg.color}30`,
                          }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${isMaintenance ? "animate-pulse" : ""}`}
                            style={{ backgroundColor: cfg.color }}
                          />
                          {l.statut}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>
                        {l.dernierChangement?.date || l.dateCreation}
                      </td>
                      <td
                        className={`py-3 px-4 text-xs font-mono ${theme.textLight}`}
                      >
                        {l.dernierChangement?.heure || l.heureCreation}
                      </td>
                      <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>
                        {l.dernierChangement
                          ? `Changement: ${l.dernierChangement.ancienStatut} → ${l.dernierChangement.nouveauStatut}`
                          : "Création du logement"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {logements.reduce((s, l) => s + (l.historique?.length || 0), 0) ===
          0 && (
          <div
            className={`flex flex-col items-center justify-center py-12 ${isDark ? "text-white/30" : "text-gray-400"}`}
          >
            <Activity className="w-10 h-10 mb-3 opacity-50" />
            <p className="text-sm font-medium">Aucun historique disponible</p>
          </div>
        )}

        {logements.reduce((s, l) => s + (l.historique?.length || 0), 0) >
          20 && (
          <button
            className={`w-full mt-4 py-3 text-sm rounded-xl transition flex items-center justify-center gap-2 ${isDark ? "text-white/50 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            Voir tout l'historique
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
