import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { MessageEnvoye, useSuccessMessage } from "../components/BoutonsAction";
<<<<<<< HEAD
=======

import { api } from "../api";
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Layers,
  Receipt,
  Activity,
  Search,
  Plus,
<<<<<<< HEAD
  Building2,
=======
  Wrench,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  Eye,
  Pencil,
  Trash2,
  Check,
  X,
  FileText,
  Calendar,
  Package,
  BarChart3,
  PieChart,
  Target,
  Clock,
  History,
  CheckCircle2,
  Truck,
<<<<<<< HEAD
=======
  Lock
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
} from "lucide-react";

const CATEGORIES = [
  "Tous",
  "Travaux",
  "Matériaux",
  "Finition",
  "Électricité",
  "Plomberie",
  "Menuiserie",
  "Autre",
];
const STATUTS = ["Tous", "En attente", "Validé", "Rejeté"];
const FOURNISSEURS = ["TRANO MORA", "BATIMA", "SOCOBAT", "MATÉRIAUX PLUS"];

function fmt(n) {
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(n)
    .replace("MGA", "Ar");
}

<<<<<<< HEAD
// ============================================
// HOOKS D'ANIMATION
// ============================================
=======
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

<<<<<<< HEAD
// ============================================
// DÉTECTION DU THÈME
// ============================================
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
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
    return () => observer.disconnect();
  }, []);

  return isDark;
}

//theme ntsika
const THEMES = {
  dark: {
    bg: "from-gray-900 via-gray-900 to-[#0F2D56]",
    card: "from-gray-800/80 to-gray-900/80",
    cardAlert: "from-rose-500/10 to-rose-600/5",
    text: "text-white",
    textMuted: "text-white/70",
    textSubtle: "text-white/50",
    textLight: "text-white/40",
    border: "border-white/10",
    borderAlert: "border-rose-500/30",
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
    cardAlert: "from-rose-100 to-rose-50",
    text: "text-gray-900",
    textMuted: "text-gray-700",
    textSubtle: "text-gray-500",
    textLight: "text-gray-400",
    border: "border-gray-200",
    borderAlert: "border-rose-300",
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
// ============================================
// CARTE STATISTIQUE 3D
// ============================================
=======
//carte statistique 3D
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
    blue: isDark ? "bg-blue-500 text-white" : "bg-blue-500 text-white",
    emerald: isDark ? "bg-emerald-500 text-white" : "bg-emerald-500 text-white",
    rose: isDark ? "bg-rose-500 text-white" : "bg-rose-500 text-white",
    amber: isDark ? "bg-amber-500 text-white" : "bg-amber-500 text-white",
    violet: isDark ? "bg-violet-500 text-white" : "bg-violet-500 text-white",
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
// ============================================
// JAUGE CIRCULAIRE 3D
// ============================================
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function CircularGauge({
  value,
  max,
  size = 120,
  color = "#10b981",
  label,
  isDark,
}) {
  const circumference = 2 * Math.PI * (size / 2 - 10);
  const offset = circumference - Math.min(value / max, 1) * circumference;
  const percentage = Math.round((value / max) * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div
          className={`absolute inset-2 rounded-full blur-md transform translate-y-2 ${isDark ? "bg-black/20" : "bg-gray-300/30"}`}
        />
        <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            fill="none"
            stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
            strokeWidth="8"
          />
          <defs>
            <linearGradient
              id={`grad-${color}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 10}
            fill="none"
            stroke={`url(#grad-${color})`}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 10px ${color}50)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-black drop-shadow-lg ${theme.text}`}>
            {percentage}%
          </span>
        </div>
      </div>
      <p
        className={`mt-2 text-xs font-semibold uppercase tracking-wider ${theme.textSubtle}`}
      >
        {label}
      </p>
    </div>
  );
}

<<<<<<< HEAD
// ============================================
// BARRE DE PROGRESSION ANIMÉE
// ============================================
=======
//barre de progression
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function AnimatedProgress({
  value,
  max,
  color = "emerald",
  showValue = true,
  isDark,
}) {
  const percentage = Math.min((value / max) * 100, 100);
  const isLow = percentage < 30;
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className="space-y-2">
      <div
        className={`h-3 rounded-full overflow-hidden backdrop-blur-sm border ${isDark ? "bg-gray-700/50 border-white/10" : "bg-gray-200 border-gray-300"}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isLow ? "bg-rose-500" : `bg-${color}-500`}`}
          style={{
            width: `${percentage}%`,
            boxShadow: `0 0 20px ${isLow ? "#f43f5e" : "#10b981"}80`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      {showValue && (
        <div className="flex justify-between text-xs">
          <span className={theme.textLight}>{fmt(value)}</span>
          <span className={`font-semibold ${theme.textMuted}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
// ============================================
// CARTE DÉPENSE 3D
// ============================================
=======
// carte de depense
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function DepenseCard3D({
  depense,
  onDetail,
  onEdit,
  onDelete,
  onValider,
  onRejeter,
  index,
  isDark,
}) {
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
<<<<<<< HEAD

=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const statutConfig = {
    Validé: {
      bg: isDark
        ? "from-emerald-500/10 to-emerald-600/5 border-emerald-500/30"
        : "from-emerald-100 to-emerald-50 border-emerald-300",
      icon: isDark
        ? "bg-emerald-500/20 text-emerald-400"
        : "bg-emerald-100 text-emerald-600",
      badge: isDark
        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        : "bg-emerald-100 text-emerald-600 border-emerald-300",
    },
    "En attente": {
      bg: isDark
        ? "from-amber-500/10 to-amber-600/5 border-amber-500/30"
        : "from-amber-100 to-amber-50 border-amber-300",
      icon: isDark
        ? "bg-amber-500/20 text-amber-400"
        : "bg-amber-100 text-amber-600",
      badge: isDark
        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
        : "bg-amber-100 text-amber-600 border-amber-300",
    },
    Rejeté: {
      bg: isDark
        ? "from-rose-500/10 to-rose-600/5 border-rose-500/30"
        : "from-rose-100 to-rose-50 border-rose-300",
      icon: isDark
        ? "bg-rose-500/20 text-rose-400"
        : "bg-rose-100 text-rose-600",
      badge: isDark
        ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
        : "bg-rose-100 text-rose-600 border-rose-300",
    },
  };

  const config = statutConfig[depense.statut] || statutConfig["En attente"];
  const estReceptionnee = depense.receptionne || false;

  return (
    <div style={style} className="group relative">
      <div
        className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${isDark ? "bg-amber-500/10" : "bg-amber-400/20"} group-hover:translate-y-4 group-hover:blur-xl`}
      />
      <div
        className={`relative bg-gradient-to-br ${config.bg} backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${isDark ? "" : "shadow-lg"}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${config.icon}`}
          >
            <Receipt className="w-7 h-7" />
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onDetail}
              title="Voir détails"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                isDark
                  ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700"
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            {depense.statut === "En attente" && (
              <>
                <button
                  onClick={onEdit}
                  title="Modifier"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700"
                  }`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={onDelete}
                  title="Supprimer"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                    isDark
                      ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300"
                      : "bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>
              {depense.id}
            </p>
            <h3
              className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors line-clamp-1 ${theme.text}`}
            >
              {depense.description}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}
              >
                {depense.statut}
              </span>
              {depense.statut === "Validé" && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    estReceptionnee
                      ? isDark
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-emerald-100 text-emerald-600"
                      : isDark
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {estReceptionnee ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
                      Reçu
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3" />
                      Attente réception
                    </>
                  )}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200/20">
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Montant</p>
              <p className="text-2xl font-black text-[#C9A84C]">
                {fmt(depense.montant)}
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Quantité</p>
              <p className={`text-lg font-semibold ${theme.text}`}>
                {depense.quantite || 1} {depense.unite || "unités"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className={theme.textLight}>{depense.date}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? "bg-white/10 text-white/70" : "bg-gray-200 text-gray-600"}`}
            >
              {depense.logement}
            </span>
          </div>

          <div
            className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? "bg-white/5" : "bg-gray-100"}`}
          >
            <Package className={`w-4 h-4 ${theme.textSubtle}`} />
            <span className={`text-xs ${theme.textMuted}`}>
              {depense.fournisseur}
            </span>
          </div>

          {depense.statut === "En attente" && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={onValider}
                className="flex-1 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
              >
                <Check className="w-3 h-3" />
                Valider
              </button>
              <button
                onClick={onRejeter}
                className="flex-1 py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1"
              >
                <X className="w-3 h-3" />
                Rejeter
              </button>
            </div>
          )}
        </div>

        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </div>
  );
}

function Graphique3D({ depenses, isDark }) {
  const parMois = {};
  depenses.forEach((d) => {
    if (d.statut === "Validé") {
      const mois = d.date.split("/").slice(1).join("/");
      parMois[mois] = (parMois[mois] || 0) + d.montant;
    }
  });

  const data = Object.entries(parMois).slice(-6);
  const max = Math.max(...data.map((d) => d[1]), 1);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div
      className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-blue-500/5 to-transparent" : "from-blue-50 to-transparent"} opacity-50`}
      />

      <div className="relative z-10">
        <h3 className={`font-bold mb-1 flex items-center gap-2 ${theme.text}`}>
          <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
          Évolution des dépenses
        </h3>
        <p className={`text-xs mb-5 ${theme.textSubtle}`}>
          Par mois — en Ariary (validées uniquement)
        </p>

        {data.length > 0 ? (
          <div className="flex items-end gap-3 h-40">
            {data.map(([mois, montant], i) => (
              <div
                key={mois}
                className="flex-1 flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full">
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? "bg-white/10 text-white" : "bg-gray-800 text-white"}`}
                  >
                    {fmt(montant)}
                  </div>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out group-hover:brightness-110 ${isDark ? "bg-gradient-to-t from-[#0F2D56] to-[#C9A84C]" : "bg-gradient-to-t from-blue-600 to-blue-400"}`}
                    style={{
                      height: `${(montant / max) * 120}px`,
                      animationDelay: `${i * 100}ms`,
                    }}
                  />
                </div>
                <span className={`text-xs ${theme.textLight}`}>{mois}</span>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-col items-center justify-center h-40 ${theme.textSubtle}`}
          >
            <BarChart3 className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">Aucune donnée validée</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SuiviBudget3D({ depenses, isDark, budgetGlobal, onEditBudget }) {
<<<<<<< HEAD
    const BUDGET_GLOBAL = budgetGlobal || 20000000;
=======
  const BUDGET_GLOBAL = budgetGlobal || 20000000;
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const valides = depenses.filter((d) => d.statut === "Validé");
  const total = valides.reduce((s, d) => s + d.montant, 0);
  const pctGlobal = Math.min((total / BUDGET_GLOBAL) * 100, 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
 

  const parCategorie = {};
  valides.forEach((d) => {
    parCategorie[d.categorie] = (parCategorie[d.categorie] || 0) + d.montant;
  });

  return (
    <div
      className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${isDark ? "from-emerald-500/5 to-transparent" : "from-emerald-50 to-transparent"} opacity-50`}
      />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-bold flex items-center gap-2 ${theme.text}`}>
            <Target className="w-5 h-5 text-[#C9A84C]" />
            Suivi budgétaire
          </h3>
        </div>

        <div className="flex items-center gap-6">
          <CircularGauge
            value={total}
            max={budgetGlobal}
            size={100}
            color={
              pctGlobal >= 90
                ? "#f43f5e"
                : pctGlobal >= 70
                  ? "#f59e0b"
                  : "#10b981"
            }
            label="Budget global"
            isDark={isDark}
          />
<<<<<<< HEAD
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className={`font-semibold ${theme.text}`}>
                Budget global annuel
              </span>
              <span className={theme.textMuted}>
=======
          <div className="flex-1 max-[440px]:w-full">
            <div className="flex justify-between text-sm mb-2 max-[864px]:flex-col max-[864px]:gap-1">
              <span className={`font-semibold ${theme.text}`}>
                Budget global annuel
              </span>
              <span className={`${theme.textMuted} max-[864px]:text-right`}>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                {fmt(total)} / {fmt(budgetGlobal)}
              </span>
            </div>
            <AnimatedProgress
              value={total}
              max={budgetGlobal}
              color={
                pctGlobal >= 90 ? "rose" : pctGlobal >= 70 ? "amber" : "emerald"
              }
              isDark={isDark}
            />
            <p
              className={`text-xs mt-1 font-semibold ${pctGlobal >= 90 ? "text-rose-500" : pctGlobal >= 70 ? "text-amber-500" : "text-emerald-500"}`}
            >
              {pctGlobal.toFixed(1)}% utilisé
            </p>
          </div>
        </div>

        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-wide mb-3 ${theme.textLight}`}
          >
            Par catégorie
          </p>
          <div className="space-y-3">
            {Object.entries(parCategorie)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([cat, montant], i) => {
                const pct = (montant / total) * 100 || 0;
                const colors = [
                  "bg-blue-500",
                  "bg-emerald-500",
                  "bg-amber-500",
                  "bg-rose-500",
                  "bg-violet-500",
                ];
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <div
                      className={`w-2 h-8 rounded-full ${colors[i % colors.length]}`}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`font-medium ${theme.text}`}>
                          {cat}
                        </span>
                        <span className={theme.textMuted}>
                          {fmt(montant)} ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div
                        className={`h-1.5 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                      >
                        <div
                          className={`h-1.5 rounded-full ${colors[i % colors.length]} transition-all duration-1000`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalDetail3D({ depense, onClose, isDark }) {
  if (!depense) return null;
  const theme = isDark ? THEMES.dark : THEMES.light;

  const statutStyles = {
    Validé: isDark
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-emerald-100 text-emerald-700 border-emerald-300",
    "En attente": isDark
      ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
      : "bg-amber-100 text-amber-700 border-amber-300",
    Rejeté: isDark
      ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
      : "bg-rose-100 text-rose-700 border-rose-300",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-md border overflow-hidden animate-in zoom-in-95 duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
      >
        <div
          className={`relative px-6 py-6 border-b ${isDark ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-white/10" : "bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200"}`}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? "bg-white/5" : "bg-blue-200/50"}`}
          />
          <div className="relative flex items-start justify-between">
            <div>
              <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>
                {depense.id}
              </p>
              <h2 className={`text-xl font-black ${theme.text}`}>
                {depense.description}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statutStyles[depense.statut]}`}
                >
                  {depense.statut}
                </span>
                {depense.receptionne && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      isDark
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Reçu
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isDark ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900"}`}
            >
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            ["Montant total", fmt(depense.montant), DollarSign],
            [
              "Quantité",
              `${depense.quantite || 1} ${depense.unite || "unités"}`,
              Package,
            ],
            [
              "Prix unitaire",
              fmt(
                depense.prixUnitaire ||
                  Math.round(depense.montant / (depense.quantite || 1)),
              ),
              DollarSign,
            ],
<<<<<<< HEAD
            ["Logement", depense.logement, Building2],
            ["Catégorie", depense.categorie, Layers],
            ["Fournisseur", depense.fournisseur, Package],
            ["Date", depense.date, Calendar],
            ["Département", depense.departement, User],
=======

            ["Catégorie", depense.categorie, Layers],
            ["Fournisseur", depense.fournisseur, Package],
            ["Date", depense.date, Calendar],
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          ].map(([label, value, Icon]) => (
            <div
              key={label}
              className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10" : "bg-gray-200"}`}
                >
                  <Icon className={`w-5 h-5 ${theme.textSubtle}`} />
                </div>
                <span className={`text-sm ${theme.textSubtle}`}>{label}</span>
              </div>
              <span className={`font-semibold ${theme.text}`}>{value}</span>
            </div>
          ))}

          {depense.historique && depense.historique.length > 0 && (
            <div
              className={`mt-4 ${isDark ? "bg-white/5" : "bg-gray-50"} rounded-xl p-4`}
            >
              <p
                className={`text-sm font-semibold mb-3 flex items-center gap-2 ${theme.text}`}
              >
                <History className="w-4 h-4 text-[#C9A84C]" />
                Historique
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {depense.historique.map((h, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs ${theme.textMuted}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        h.action === "Création"
                          ? "bg-blue-500"
                          : h.action === "Validation"
                            ? "bg-emerald-500"
                            : h.action === "Réception"
                              ? "bg-violet-500"
                              : "bg-amber-500"
                      }`}
                    />
                    <span className="font-medium">{h.action}</span>
                    <span className={theme.textLight}>— {h.date}</span>
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
            className="w-full py-3 bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
function ModalForm3D({ depense, onClose, onSave, isDark }) {
  const [form, setForm] = useState(
    depense || {
=======
function ModalForm3D({ depense, onClose, onSave, isDark, depenses }) {
  const depenseNorm = depense
    ? {
        ...depense,
        prixUnitaire: depense.prixUnitaire ?? depense.prix_unitaire ?? 0,
        logement: depense.logement ?? depense.logement_ref ?? "",
      }
    : null;

  const [form, setForm] = useState(
    depenseNorm || {
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      description: "",
      quantite: 1,
      prixUnitaire: 0,
      montant: 0,
      categorie: "Matériaux",
      fournisseur: "TRANO MORA",
      date: new Date().toLocaleDateString("fr-FR"),
      statut: "En attente",
      unite: "unités",
    },
  );

<<<<<<< HEAD
=======
  const [modeManuel, setModeManuel] = useState(false);
  const [besoinsMaintenance, setBesoinsMaintenance] = useState([]);
  useEffect(() => {
    if (!depense) {
      api
        .getBesoinsMaintenanceDepense()
        .then((data) => {
          setBesoinsMaintenance(
            (data || [])
              .map((b) => ({
                nom: b.materiau_nom,
                quantiteTotale: b.quantite,
                quantiteRestante: b.quantite_restante,
                unite: b.unite,
                logementId: b.logement_ref,
                logementType: b.logement_type,
                quantiteSortie: b.quantite - b.quantite_restante,
                label: b.label,
              }))
              
              .filter(
                (b) =>
                  !depenses.some(
                    (d) =>
                      d.description === b.nom &&
                      (d.statut === "Validé" || d.statut === "Réceptionné"),
                  ),
              ),
          );
        })
        .catch(console.error);
    }
  }, [depense, depenses]); 

  const handleDescriptionChange = (val) => {
    if (val === "__nouveau__") {
      setModeManuel(true);
      setForm((prev) => ({
        ...prev,
        description: "",
        quantite: 1,
        unite: "unités",
        logement_ref: "",
      }));
    } else {
      const besoin = besoinsMaintenance.find((b) => b.nom === val);
      if (besoin) {
        setModeManuel(false);
        setForm((prev) => ({
          ...prev,
          description: besoin.nom,
          quantite: besoin.quantiteRestante,
          unite: besoin.unite,
        }));
      }
    }
  };

  const handleQuantiteChange = (e) => {
    const val = Number(e.target.value);
    const besoin = besoinsMaintenance.find((b) => b.nom === form.description);
    if (!modeManuel && besoin) {
      setForm((prev) => ({
        ...prev,
        quantite: Math.max(besoin.quantiteRestante, val),
      }));
    } else {
      setForm((prev) => ({ ...prev, quantite: Math.max(1, val) }));
    }
  };

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  useEffect(() => {
    const total = form.quantite * form.prixUnitaire;
    setForm((prev) => ({ ...prev, montant: total }));
  }, [form.quantite, form.prixUnitaire]);

  const theme = isDark ? THEMES.dark : THEMES.light;

<<<<<<< HEAD
  // Animation d'entrée
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    return () => setMounted(false);
  }, []);

<<<<<<< HEAD
=======
  const besoinActuel = besoinsMaintenance.find(
    (b) => b.nom === form.description,
  );
  const estVerrouille = !modeManuel && !!besoinActuel;
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isDark ? "bg-black/80" : "bg-gray-900/60"
      } backdrop-blur-sm`}
    >
      <div
        className={`relative w-full max-w-md transform transition-all duration-500 ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
<<<<<<< HEAD
        {/* Glow effect */}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div
          className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 ${
            isDark
              ? "bg-gradient-to-r from-[#C9A84C] via-blue-500 to-[#C9A84C]"
              : "bg-gradient-to-r from-[#C9A84C] via-amber-400 to-[#C9A84C]"
          }`}
        />

        <div
          className={`relative rounded-3xl border overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-white/20"
              : "bg-gradient-to-br from-white via-gray-50 to-white border-gray-200"
          } shadow-2xl`}
        >
<<<<<<< HEAD
          {/* Header avec gradient */}
=======
          {/* Header */}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          <div
            className={`relative px-6 py-5 ${
              isDark
                ? "bg-gradient-to-r from-[#C9A84C]/20 via-[#C9A84C]/10 to-transparent border-b border-white/10"
                : "bg-gradient-to-r from-[#C9A84C]/30 via-amber-100/50 to-transparent border-b border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDark ? "bg-[#C9A84C]/20" : "bg-[#C9A84C]/30"
                  }`}
                >
                  <DollarSign className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.text}`}>
                    {depense ? "Modifier" : "Nouvelle dépense"}
                  </h2>
                  <p className={`text-xs ${theme.textSubtle}`}>
                    {depense
                      ? "Mettre à jour la dépense"
                      : "Ajouter un nouveau matériau"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white hover:rotate-90"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 hover:rotate-90"
                }`}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
<<<<<<< HEAD
            {/* Description - Full width */}
=======
            {/*  DESCRIPTION : Select avec matériaux de maintenance (quantité RESTANTE) */}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div className="relative">
              <label
                className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                  isDark ? "text-[#C9A84C]" : "text-amber-700"
                }`}
              >
                Description (Nom du matériau) *
              </label>
<<<<<<< HEAD
              <div className="relative">
                <Package
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textSubtle}`}
                />
                <input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                    isDark
                      ? "bg-white/5 border-white/10 focus:border-[#C9A84C] focus:bg-white/10 text-white placeholder-white/30"
                      : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] focus:bg-white text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="Ex: tôle ondulée, ciment Portland, fer à béton..."
                />
              </div>
=======

             
              {!depense && besoinsMaintenance.length > 0 ? (
                <div className="space-y-3">
                  {/* Menu déroulant des matériaux requis (quantité RESTANTE) */}
                  <div className="relative">
                    <Package
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textSubtle}`}
                    />
                    <select
                      value={
                        besoinsMaintenance.some(
                          (b) => b.nom === form.description,
                        )
                          ? form.description
                          : "__nouveau__"
                      }
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                      className={`w-full pl-12 pr-10 py-4 rounded-xl border-2 focus:outline-none transition-all duration-300 appearance-none ${
                        isDark
                          ? "bg-white/5 border-white/10 focus:border-[#C9A84C] focus:bg-white/10 text-white"
                          : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] focus:bg-white text-gray-900"
                      }`}
                    >
                      <option
                        value="__nouveau__"
                        className={isDark ? "bg-gray-800" : "bg-white"}
                      >
                        <Pencil className="h-4 w-4"/> Nouvelle dépense manuelle...
                      </option>
                      <option
                        disabled
                        className={
                          isDark
                            ? "bg-gray-800 text-gray-500"
                            : "bg-gray-100 text-gray-400"
                        }
                      >
                        ─── Matériaux requis (reste à acheter) ───
                      </option>
                      {besoinsMaintenance.map((b, i) => (
                        <option
                          key={`${b.logementId}-${b.nom}-${i}`}
                          value={b.nom}
                          className={isDark ? "bg-gray-800" : "bg-white"}
                        >
                          {b.label}
                        </option>
                      ))}
                    </select>
                    {/* Icône flèche du select */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className={`w-4 h-4 ${theme.textSubtle}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Input manuel si "Nouvelle dépense" est choisi */}
                  {modeManuel && (
                    <div className="relative mt-3 animate-in slide-in-from-top-2 duration-300">
                      <input
                        value={form.description}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Ex: tôle ondulée, ciment Portland, fer à béton..."
                        className={`w-full pl-4 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                          isDark
                            ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white placeholder-white/30"
                            : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900 placeholder-gray-400"
                        }`}
                      />
                    </div>
                  )}

                  {/* Badge info si matériau de maintenance choisi */}
                  {estVerrouille && besoinActuel && (
                    <div
                      className={`mt-3 p-3 rounded-xl border flex items-center gap-2 ${
                        isDark
                          ? "bg-amber-500/10 border-amber-500/30"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <Wrench
                        className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`}
                      />
                      <div className="flex-1">
                        <span
                          className={`text-xs font-bold ${isDark ? "text-amber-300" : "text-amber-700"}`}
                        >
                          Besoin maintenance — {besoinActuel.logementId}
                        </span>
                        <span
                          className={`text-xs ml-2 ${isDark ? "text-amber-200/60" : "text-amber-600"}`}
                        >
                          (Total: {besoinActuel.quantiteTotale}, Déjà sorti:{" "}
                          {besoinActuel.quantiteSortie}, Reste:{" "}
                          {besoinActuel.quantiteRestante})
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Mode édition ou aucun besoin de maintenance : input classique */
                <div className="relative">
                  <Package
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textSubtle}`}
                  />
                  <input
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none transition-all duration-300 ${
                      isDark
                        ? "bg-white/5 border-white/10 focus:border-[#C9A84C] focus:bg-white/10 text-white placeholder-white/30"
                        : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] focus:bg-white text-gray-900 placeholder-gray-400"
                    }`}
                    placeholder="Ex: tôle ondulée, ciment Portland, fer à béton..."
                  />
                </div>
              )}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            </div>

            {/* Quantité et Unité côte à côte */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Quantité *
<<<<<<< HEAD
=======
                  {estVerrouille && besoinActuel && (
                    <span
                      className={`ml-2 text-[10px] font-normal ${isDark ? "text-amber-400" : "text-amber-600"}`}
                    >
                      (min: {besoinActuel.quantiteRestante})
                    </span>
                  )}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                </label>
                <div className="relative">
                  <Layers
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSubtle}`}
                  />
                  <input
                    type="number"
<<<<<<< HEAD
                    min="1"
                    value={form.quantite}
                    onChange={(e) =>
                      setForm({ ...form, quantite: Number(e.target.value) })
                    }
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                        : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                    }`}
                  />
                </div>
=======
                    min={
                      estVerrouille && besoinActuel
                        ? besoinActuel.quantiteRestante
                        : 1
                    }
                    value={form.quantite}
                    onChange={handleQuantiteChange} // ← NOUVEAU handler avec minimum
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                      estVerrouille
                        ? isDark
                          ? "bg-[#C9A84C]/5 border-[#C9A84C]/30 text-white cursor-default"
                          : "bg-amber-50 border-amber-200 text-gray-900 cursor-default"
                        : isDark
                          ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                          : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                    }`}
                  />
                </div>
                {/* Message si quantité verrouillée */}
                {estVerrouille && besoinActuel && (
                  <p
                    className={`text-[10px] mt-1 ${isDark ? "text-amber-400/60" : "text-amber-600/60"}`}
                  >
                    Quantité minimum: {besoinActuel.quantiteRestante}{" "}
                    {besoinActuel.unite} (reste du besoin)
                  </p>
                )}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              </div>
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Unité
                </label>
<<<<<<< HEAD
                <select
                  value={form.unite}
                  onChange={(e) => setForm({ ...form, unite: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                    isDark
                      ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                      : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                  }`}
                >
                  {[
                    "unités",
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
                      className={isDark ? "bg-gray-800" : "bg-white"}
                    >
                      {u}
                    </option>
                  ))}
                </select>
=======
                {estVerrouille && besoinActuel ? (
                  // UNITÉ VERROUILLÉE : affichage en lecture seule
                  <div
                    className={`w-full px-4 py-3 rounded-xl border-2 font-semibold flex items-center justify-between ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white/70"
                        : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                  >
                    <span>{form.unite}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isDark
                          ? "bg-white/10 text-white/40"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Lock className="w-4 h-4 text-yellow-400"/> Verrouillé
                    </span>
                  </div>
                ) : (
                  
                  <select
                    value={form.unite}
                    onChange={(e) =>
                      setForm({ ...form, unite: e.target.value })
                    }
                    className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                      isDark
                        ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                        : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                    }`}
                  >
                    {[
                      "unités",
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
                        className={isDark ? "bg-gray-800" : "bg-white"}
                      >
                        {u}
                      </option>
                    ))}
                  </select>
                )}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              </div>
            </div>

            {/* Prix et Montant */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Prix unitaire (Ar) *
                </label>
                <div className="relative">
                  <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 font-bold ${theme.textSubtle}`}
                  >
                    Ar
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={form.prixUnitaire}
                    onChange={(e) =>
                      setForm({ ...form, prixUnitaire: Number(e.target.value) })
                    }
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                        : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                    }`}
                  />
                </div>
              </div>
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Montant total
                </label>
                <div
                  className={`w-full px-4 py-3 rounded-xl border-2 font-bold text-lg ${
                    isDark
                      ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 text-[#C9A84C]"
                      : "bg-amber-50 border-amber-200 text-amber-700"
                  }`}
                >
                  {fmt(form.montant)}
                </div>
              </div>
            </div>

            {/* Catégorie et Fournisseur */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Catégorie *
                </label>
                <select
                  value={form.categorie}
                  onChange={(e) =>
                    setForm({ ...form, categorie: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                    isDark
                      ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                      : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                  }`}
                >
                  {CATEGORIES.filter((c) => c !== "Tous").map((c) => (
                    <option
                      key={c}
                      className={isDark ? "bg-gray-800" : "bg-white"}
                    >
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-[#C9A84C]" : "text-amber-700"
                  }`}
                >
                  Fournisseur *
                </label>
                <select
                  value={form.fournisseur}
                  onChange={(e) =>
                    setForm({ ...form, fournisseur: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                    isDark
                      ? "bg-white/5 border-white/10 focus:border-[#C9A84C] text-white"
                      : "bg-gray-50 border-gray-200 focus:border-[#C9A84C] text-gray-900"
                  }`}
                >
                  {FOURNISSEURS.map((f) => (
                    <option
                      key={f}
                      className={isDark ? "bg-gray-800" : "bg-white"}
                    >
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
<<<<<<< HEAD
           

            {/* Statut avec boutons style toggle */}
=======

            {/* Statut */}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div>
              <label
                className={`text-xs font-bold uppercase tracking-wider mb-3 block ${
                  isDark ? "text-[#C9A84C]" : "text-amber-700"
                }`}
              >
                Statut
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-opacity-50 bg-gray-500/10">
                {["En attente"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, statut: s })}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all duration-300 transform ${
                      form.statut === s
<<<<<<< HEAD
                        ? s === "Validé"
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-105"
                          : s === "Rejeté"
                            ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105"
                            : "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105"
=======
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105"
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                        : isDark
                          ? "bg-transparent text-white/50 hover:text-white hover:bg-white/5"
                          : "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* Footer avec boutons */}
=======
          {/* Footer */}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          <div
            className={`px-6 py-5 border-t flex gap-3 ${
              isDark
                ? "border-white/10 bg-white/5"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <button
              onClick={onClose}
              className={`flex-1 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                isDark
                  ? "border border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              Annuler
            </button>
            <button
              onClick={() => {
                const formWithHistory = {
                  ...form,
                  historique: depense?.historique || [
                    {
                      action: "Création",
                      date: new Date().toLocaleDateString("fr-FR"),
                    },
                  ],
                };
                if (depense) {
                  formWithHistory.historique = [
                    ...(depense.historique || []),
                    {
                      action: "Modification",
                      date: new Date().toLocaleDateString("fr-FR"),
                    },
                  ];
                }
                onSave(formWithHistory);
                onClose();
              }}
              className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl bg-gradient-to-r from-[#C9A84C] via-[#b8963f] to-[#C9A84C] hover:from-[#d4b55a] hover:via-[#c9a84c] hover:to-[#d4b55a]"
            >
<<<<<<< HEAD
              {depense ? "💾 Enregistrer" : "✨ Ajouter"}
=======
              {depense ? " Enregistrer" : " Ajouter"}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// PAGE PRINCIPALE

export default function Depenses() {
  const {
    depenses,
    //logements,
    //tousLesDepartements,
=======
export default function Depenses() {
  const {
    depenses,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    ajouterDepense,
    modifierDepense,
    supprimerDepense,
    validerDepense,
    rejeterDepense,
    budgetGlobal,
    modifierBudgetGlobal,
<<<<<<< HEAD
    // ajouterMouvement,
  } = useApp();
  const [filtreCat, setFiltreCat] = useState("Tous");
=======
  } = useApp();
  const [filtreCat] = useState("Tous");
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [newBudget, setNewBudget] = useState(budgetGlobal);

  const isDark = useDarkMode();
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const valides = depenses.filter((d) => d.statut === "Validé");
  const totalValide = valides.reduce((s, d) => s + d.montant, 0);
  const totalAttente = depenses
    .filter((d) => d.statut === "En attente")
    .reduce((s, d) => s + d.montant, 0);
  const totalRejete = depenses
    .filter((d) => d.statut === "Rejeté")
    .reduce((s, d) => s + d.montant, 0);
  const totalGeneral = depenses.reduce((s, d) => s + d.montant, 0);

  const nbDepenses = depenses.length;
  const moyenneDepense =
    nbDepenses > 0 ? Math.round(totalGeneral / nbDepenses) : 0;
  const tauxValidation =
    nbDepenses > 0 ? Math.round((valides.length / nbDepenses) * 100) : 0;
  const attenteReception = valides.filter((d) => !d.receptionne).length;

  const filtered = depenses.filter(
    (d) =>
      (filtreCat === "Tous" || d.categorie === filtreCat) &&
      (filtreStatut === "Tous" || d.statut === filtreStatut) &&
<<<<<<< HEAD
      (d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
        d.logement.toLowerCase().includes(search.toLowerCase())),
  );

  const handleSave = (form) => {
    const now = new Date().toLocaleDateString("fr-FR");

    let formWithHistory;

    if (formData) {
      formWithHistory = {
        ...form,
        historique: [
          ...(formData.historique || []),
          { action: "Modification", date: now },
        ],
      };
      modifierDepense(formWithHistory);
    } else {
      formWithHistory = {
        ...form,
        historique: [{ action: "Création", date: now }],
      };
      ajouterDepense(formWithHistory);
      triggerSuccess();
    }

    setFormData(null);
    setIsAdding(false);
  };

  // const handleValider = (depense) => {
  //   validerDepense(depense.id);
  //   triggerSuccess();
  // };

=======
      ((d.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (d.fournisseur || "").toLowerCase().includes(search.toLowerCase()) ||
        (d.logement_ref || d.logement || "")
          .toLowerCase()
          .includes(search.toLowerCase())),
  );

  const handleSave = async (form) => {
    if (!form.description || form.description.trim() === "") {
      alert("Veuillez saisir une description.");
      return;
    }
    if (formData) {
      await modifierDepense({ ...form, id: formData.id });
    } else {
      await ajouterDepense(form);
      triggerSuccess();
    }
    setFormData(null);
    setIsAdding(false);
  };
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const handleExport = () => {
    const lignes = [
      [
        "ID",
        "Description",
        "Quantité",
        "Unité",
        "Prix Unitaire",
        "Montant",
        "Logement",
        "Département",
        "Catégorie",
        "Fournisseur",
        "Date",
        "Statut",
        "Réceptionné",
      ],
      ...filtered.map((d) => [
        d.id,
        d.description,
        d.quantite || 1,
        d.unite || "unités",
        d.prixUnitaire || 0,
        d.montant,
        d.logement,
        d.departement,
        d.categorie,
        d.fournisseur,
        d.date,
        d.statut,
        d.receptionne ? "Oui" : "Non",
      ]),
    ];
    const csv = lignes.map((l) => l.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "depenses_spat.csv";
    a.click();
  };

  // Dernières transactions validées (5 plus récentes)
  const dernieresTransactions = depenses
    .filter((d) => d.statut === "Validé")
    .sort((a, b) => {
      const dateA = a.date.split("/").reverse().join("-");
      const dateB = b.date.split("/").reverse().join("-");
      return new Date(dateB) - new Date(dateA);
    })
    .slice(0, 5);

  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div
<<<<<<< HEAD
      className={`min-h-screen bg-gradient-to-br p-6 space-y-6 transition-colors duration-500 ${theme.bg}`}
=======
      className={`min-h-screen bg-gradient-to-br p-3 sm:p-4 md:p-6 space-y-4 md:space-y-6 transition-colors duration-500 ${theme.bg}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    >
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      <MessageEnvoye actif={successActif} />

      {showBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`rounded-3xl shadow-2xl w-full max-w-sm border overflow-hidden ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
          >
            <div
              className={`px-6 py-5 border-b flex items-center justify-between ${isDark ? "border-white/10 bg-[#C9A84C]/10" : "border-gray-200 bg-amber-50"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-[#C9A84C]/20" : "bg-amber-100"}`}
                >
                  <Target className="w-5 h-5 text-[#C9A84C]" />
                </div>
                <div>
                  <p className={`font-bold ${theme.text}`}>Budget global</p>
                  <p className={`text-xs ${theme.textSubtle}`}>
                    Modifier le plafond annuel
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBudget(false)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? "bg-white/10 hover:bg-white/20 text-white/60" : "bg-gray-100 hover:bg-gray-200 text-gray-500"}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-[#C9A84C]" : "text-amber-700"}`}
                >
                  Budget actuel
                </p>
                <p className={`text-2xl font-black text-[#C9A84C]`}>
                  {fmt(budgetGlobal)}
                </p>
              </div>
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? "text-[#C9A84C]" : "text-amber-700"}`}
                >
                  Nouveau budget (Ar)
                </p>
                <input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#C9A84C] transition text-lg font-bold ${isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"}`}
                />
              </div>
            </div>
            <div
              className={`px-6 py-4 border-t flex gap-3 ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"}`}
            >
              <button
                onClick={() => setShowBudget(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${isDark ? "border border-white/20 text-white/70 hover:bg-white/10" : "border border-gray-300 text-gray-600 hover:bg-gray-100"}`}
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  modifierBudgetGlobal(newBudget);
                  setShowBudget(false);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] hover:shadow-lg hover:shadow-amber-500/25 transition hover:scale-105"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
      {detail && (
        <ModalDetail3D
          depense={detail}
          onClose={() => setDetail(null)}
<<<<<<< HEAD
          isDark={isDark}
        />
      )}
      {(formData || isAdding) && (
        <ModalForm3D
          depense={formData}
          //logements={logements}
          //tousLesDepartements={tousLesDepartements}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          isDark={isDark}
        />
      )}
      {(formData || isAdding) && (
       
        <ModalForm3D
          depense={formData}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
          isDark={isDark}
          depenses={depenses}
        />
      )}

<<<<<<< HEAD
      <div className="flex items-center justify-between">
=======
      <div className="flex items-center justify-between max-[860px]:flex-col max-[860px]:items-start max-[860px]:gap-4">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div>
          <h1 className={`text-3xl font-black ${theme.text}`}>
            Gestion des Dépenses
          </h1>
          <p className={theme.textSubtle}>
            Suivi budgétaire et validation des achats de matériaux
          </p>
<<<<<<< HEAD
        </div>
       <div className="flex gap-3">
  <button
    onClick={() => { setNewBudget(budgetGlobal); setShowBudget(true); }}
    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition hover:scale-105 ${isDark ? "border border-white/20 text-white/70 hover:bg-white/10" : "border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"}`}>
    <Target className="w-5 h-5 text-[#C9A84C]" />
    Budget
  </button>
  <button
    onClick={() => setIsAdding(true)}
    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105">
    <Plus className="w-5 h-5" />
    Nouvelle dépense
  </button>
</div>
=======
        </div>
        <div className="flex gap-3 max-[860px]:w-full max-[860px]:justify-start">
          <button
            onClick={() => {
              setNewBudget(budgetGlobal);
              setShowBudget(true);
            }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition hover:scale-105 max-[860px]:flex-1 max-[860px]:justify-center ${isDark ? "border border-white/20 text-white/70 hover:bg-white/10" : "border border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"}`}
          >
            <Target className="w-5 h-5 text-[#C9A84C]" />
            <span className="max-[352px]:hidden">Budget</span>
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105 max-[860px]:flex-1 max-[860px]:justify-center"
          >
            <Plus className="w-5 h-5" />
            <span className="max-[352px]:hidden">Nouvelle dépense</span>
          </button>
        </div>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      </div>

      {attenteReception > 0 && (
        <div
          className={`relative overflow-hidden border rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500 ${
            isDark
              ? "bg-gradient-to-r from-amber-500/20 to-blue-500/20 border-amber-500/30"
              : "bg-gradient-to-r from-amber-100 to-blue-100 border-amber-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-amber-500/20" : "bg-amber-200"}`}
            >
              <Truck
                className={`w-5 h-5 ${isDark ? "text-amber-400" : "text-amber-600"}`}
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${isDark ? "text-amber-200" : "text-amber-700"}`}
              >
<<<<<<< HEAD
                📦 {attenteReception} matériau{attenteReception > 1 ? "x" : ""}{" "}
                en attente de réception
              </p>
              <p className={`text-xs ${theme.textSubtle}`}>
                Les dépenses validées doivent être réceptionnées dans la section
                Matériaux pour mettre à jour le stock.
              </p>
=======
                {attenteReception} matériau{attenteReception > 1 ? "x" : ""} en
                attente de réception
              </p>
              <p className={`text-xs ${theme.textSubtle}`}></p>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
=======
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <StatCard3D
          icon={Wallet}
          label="Total général"
          value={totalGeneral}
          color="blue"
          delay={0}
          subValue={`${nbDepenses} dépenses`}
          isDark={isDark}
        />
        <StatCard3D
          icon={Check}
          label="Dépenses validées"
          value={totalValide}
          color="emerald"
          delay={100}
          trend="up"
          trendValue={tauxValidation}
          subValue={`${valides.length} validées`}
          isDark={isDark}
        />
        <StatCard3D
          icon={Clock}
          label="En attente"
          value={totalAttente}
          color="amber"
          delay={200}
          subValue={`${depenses.filter((d) => d.statut === "En attente").length} en attente`}
          isDark={isDark}
        />
        <StatCard3D
          icon={X}
          label="Rejetées"
          value={totalRejete}
          color="rose"
          delay={300}
          subValue={`${depenses.filter((d) => d.statut === "Rejeté").length} rejetées`}
          isDark={isDark}
        />
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
=======
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 dark:text-white">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        {[
          { label: "Moyenne/dépense", value: moyenneDepense, icon: PieChart },
          {
            label: "Taux validation",
            value: `${tauxValidation}%`,
            icon: Activity,
            isText: true,
          },
          {
            label: "Attente réception",
            value: attenteReception,
            icon: Package,
          },
          { label: "Catégories", value: CATEGORIES.length - 1, icon: Layers },
        ].map((stat) => (
          <div
            key={stat.label}
<<<<<<< HEAD
            className={`relative rounded-xl border backdrop-blur-sm p-4 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10" : "bg-gray-100"}`}
              >
                <stat.icon className={`w-5 h-5 ${theme.textSubtle}`} />
              </div>
              <div>
                <p className="text-lg font-bold">
=======
            className={`relative rounded-xl border backdrop-blur-sm p-3 md:p-4 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${isDark ? "bg-white/10" : "bg-gray-100"}`}
              >
                <stat.icon
                  className={`w-4 h-4 md:w-5 md:h-5 ${theme.textSubtle}`}
                />
              </div>
              <div className="min-w-0">
                <p className="text-base md:text-lg font-bold truncate">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  {stat.isText
                    ? stat.value
                    : stat.label === "Attente réception" ||
                        stat.label === "Catégories"
                      ? stat.value
                      : fmt(stat.value)}
                </p>
<<<<<<< HEAD
                <p className={`text-xs ${theme.textSubtle}`}>{stat.label}</p>
=======
                <p className={`text-[10px] md:text-xs ${theme.textSubtle}`}>
                  {stat.label}
                </p>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              </div>
            </div>
          </div>
        ))}
      </div>

<<<<<<< HEAD
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
=======
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <Graphique3D depenses={depenses} isDark={isDark} />
        <SuiviBudget3D
          depenses={depenses}
          isDark={isDark}
          budgetGlobal={budgetGlobal}
<<<<<<< HEAD
          // onEditBudget={() => {
          //   setTempBudget(budgetGlobal);
          //   setEditBudget(true);
          // }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
        >
          {STATUTS.map((s) => (
            <button
              key={s}
              onClick={() => setFiltreStatut(s)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                filtreStatut === s
                  ? s === "Validé"
                    ? "bg-emerald-500 text-white shadow-lg"
                    : s === "Rejeté"
                      ? "bg-rose-500 text-white shadow-lg"
                      : s === "En attente"
                        ? "bg-amber-500 text-white shadow-lg"
                        : "bg-[#0F2D56] text-white shadow-lg"
                  : `${theme.textSubtle} hover:${theme.text} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
=======
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div
            className={`hidden min-[401px]:flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm overflow-x-auto ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
          >
            {STATUTS.map((s) => (
              <button
                key={s}
                onClick={() => setFiltreStatut(s)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  filtreStatut === s
                    ? s === "Validé"
                      ? "bg-emerald-500 text-white shadow-lg"
                      : s === "Rejeté"
                        ? "bg-rose-500 text-white shadow-lg"
                        : s === "En attente"
                          ? "bg-amber-500 text-white shadow-lg"
                          : "bg-[#0F2D56] text-white shadow-lg"
                    : `${theme.textSubtle} hover:${theme.text} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="min-[401px]:hidden relative flex-1">
            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:border-[#C9A84C] transition-all appearance-none cursor-pointer text-sm font-semibold ${
                isDark
                  ? "bg-gray-800/80 border-white/10 text-white"
                  : "bg-white border-gray-200 text-gray-900"
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              }`}
            >
              {STATUTS.map((s) => (
                <option
                  key={s}
                  value={s}
                  className={isDark ? "bg-gray-800" : "bg-white"}
                >
                  {s === "Tous"
                    ? " Tous "
                    : s === "Validé"
                      ? " Validé"
                      : s === "Rejeté"
                        ? " Rejeté"
                        : "En attente"}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div
          className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
        >
          {CATEGORIES.slice(0, 5).map((c) => (
            <button
              key={c}
              onClick={() => setFiltreCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                filtreCat === c
                  ? "bg-[#0F2D56] text-white shadow-lg"
                  : `${theme.textSubtle} hover:${theme.text} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <div className="relative">
=======
        {/* Ligne 2: Recherche + Export */}
        <div className="flex items-center gap-3">
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
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            />
          </div>
          <button
            onClick={handleExport}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span className="max-[352px]:hidden">Export CSV</span>
          </button>
        </div>
      </div>

      <p className={theme.textLight}>
        {filtered.length} dépense{filtered.length > 1 ? "s" : ""} trouvée
        {filtered.length > 1 ? "s" : ""}
      </p>

<<<<<<< HEAD
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((d, index) => (
          <DepenseCard3D
            key={d.id}
=======
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((d, index) => (
          <DepenseCard3D
            key={d.id || `depense-${index}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            depense={d}
            onDetail={() => setDetail(d)}
            onEdit={() => setFormData(d)}
            onDelete={() => supprimerDepense(d.id)}
<<<<<<< HEAD
            onValider={() => {
              validerDepense(d.id);
              triggerSuccess();
            }}
            onRejeter={() => {
              rejeterDepense(d.id);
=======
            onValider={async () => {
              await validerDepense(d.id);
              triggerSuccess();
            }}
            onRejeter={async () => {
              await rejeterDepense(d.id);
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              triggerSuccess();
            }}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>

      {dernieresTransactions.length > 0 && (
        <div
<<<<<<< HEAD
          className={`backdrop-blur-sm border rounded-3xl p-6 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
        >
          <h3
            className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.text}`}
=======
          className={`backdrop-blur-sm border rounded-3xl p-4 md:p-6 overflow-hidden ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
        >
          <h3
            className={`text-base md:text-lg font-bold mb-4 flex items-center gap-2 ${theme.text}`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          >
            <Activity className="w-5 h-5 text-[#C9A84C]" />
            Dernières transactions validées ({dernieresTransactions.length})
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className={`border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
                >
                  {[
<<<<<<< HEAD
                    "Réf",
                    "Description",
                    "Qté",
                    "Montant",
                    "Fournisseur",
                    "Réception",
                    "Date",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}
                    >
                      {h}
=======
                    { label: "Réf", hideMobile: true },
                    { label: "Description", hideMobile: false },
                    { label: "Qté", hideMobile: false },
                    { label: "Montant", hideMobile: false },
                    { label: "Fournisseur", hideMobile: true },
                    { label: "Réception", hideMobile: false },
                    { label: "Date", hideMobile: true },
                  ].map((h) => (
                    <th
                      key={h.label}
                      className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight} ${h.hideMobile ? "hidden sm:table-cell" : ""}`}
                    >
                      {h.label}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dernieresTransactions.map((d) => (
                  <tr
                    key={d.id}
                    className={`border-b transition group ${isDark ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"}`}
                  >
                    <td
<<<<<<< HEAD
                      className={`py-3 px-4 font-mono text-xs ${theme.textLight}`}
=======
                      className={`py-3 px-4 font-mono text-xs ${theme.textLight} hidden sm:table-cell`}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                    >
                      {d.id}
                    </td>
                    <td className={`py-3 px-4 font-semibold ${theme.text}`}>
                      {d.description}
                    </td>
                    <td className={`py-3 px-4 ${theme.textMuted}`}>
                      {d.quantite || 1} {d.unite || "unités"}
                    </td>
                    <td className="py-3 px-4 font-black text-[#C9A84C]">
                      {fmt(d.montant)}
                    </td>
<<<<<<< HEAD
                    <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>
=======
                    <td
                      className={`py-3 px-4 text-xs ${theme.textSubtle} hidden sm:table-cell`}
                    >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                      {d.fournisseur}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                          d.receptionne
                            ? isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-600"
                            : isDark
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {d.receptionne ? (
                          <>
<<<<<<< HEAD
                            <CheckCircle2 className="w-3 h-3" /> Reçu
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Attente
=======
                            <CheckCircle2 className="w-3 h-3" />{" "}
                            <span className="max-[352px]:hidden">Reçu</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />{" "}
                            <span className="max-[352px]:hidden">Attente</span>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                          </>
                        )}
                      </span>
                    </td>
<<<<<<< HEAD
                    <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>
=======
                    <td
                      className={`py-3 px-4 text-xs ${theme.textSubtle} hidden sm:table-cell`}
                    >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                      {d.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
