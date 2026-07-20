import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { MessageEnvoye, useSuccessMessage } from "../components/BoutonsAction";
import {
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Layers,
  Box,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Search,
  Home,
  Warehouse,
  ChevronRight,
  Eye,
  Trash2,
  CheckCircle2,
  Clock,
  Ban,
  History,
  Truck,
  Wrench,
  SquareMenu,
  Check,
  ChevronDown,
  AlertWaiting
} from "lucide-react";
const CATEGORIES = [
  "Tous",
  "Couverture",
  "Revêtement",
  "Maçonnerie",
  "Finition",
  "Électricité",
  "Plomberie",
  "Menuiserie",
];

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
    return () => observer.disconnect();
  }, []);

  return isDark;
}

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
    violet: isDark
      ? "from-violet-500/20 to-violet-600/5 border-violet-500/30"
      : "from-violet-100 to-violet-50 border-violet-200",
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
        className={`relative bg-gradient-to-br ${gradients[color]} backdrop-blur-sm border rounded-2xl p-3 sm:p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] ${isDark ? "border-opacity-30" : "shadow-lg"}`}
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
              className={`text-2xl sm:text-3xl font-black tracking-tight drop-shadow-lg ${theme.text}`}
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
          <span
            className={`text-xl sm:text-2xl font-black drop-shadow-lg ${theme.text}`}
          >
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
          <span className={theme.textLight}>{value} unités</span>
          <span className={`font-semibold ${theme.textMuted}`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

function MateriauCard({ materiau, onDetail, onDelete, index, isDark }) {
  const valeurStock = materiau.stock * materiau.prix;
  const alerte = materiau.stock <= materiau.seuil;
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div style={style} className="group relative">
      <div
        className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${
          alerte
            ? isDark
              ? "bg-rose-500/20"
              : "bg-rose-400/30"
            : isDark
              ? "bg-emerald-500/10"
              : "bg-emerald-400/20"
        } group-hover:translate-y-4 group-hover:blur-xl`}
      />
      <div
        className={`relative bg-gradient-to-br ${
          alerte
            ? isDark
              ? "from-rose-500/10 to-rose-600/5 border-rose-500/30"
              : "from-rose-100 to-rose-50 border-rose-300"
            : theme.card
        } backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${isDark ? "" : "shadow-lg"}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
              alerte
                ? isDark
                  ? "bg-rose-500/20 text-rose-400"
                  : "bg-rose-100 text-rose-600"
                : isDark
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-emerald-100 text-emerald-600"
            }`}
          >
            <Box className="w-7 h-7" />
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={onDetail}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                isDark
                  ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300"
                  : "bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700"
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                isDark
                  ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300"
                  : "bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700"
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>
              {materiau.id}
            </p>
            <h3
              className={`text-base sm:text-lg font-bold group-hover:text-[#C9A84C] transition-colors line-clamp-1 ${theme.text}`}
            >
              {materiau.nom}
            </h3>
            <span
              className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? "bg-white/10 text-white/70" : "bg-gray-200 text-gray-600"}`}
            >
              {materiau.categorie}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200/20">
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Stock</p>
              <p
                className={`text-xl sm:text-2xl font-black ${
                  alerte
                    ? isDark
                      ? "text-rose-400"
                      : "text-rose-600"
                    : isDark
                      ? "text-emerald-400"
                      : "text-emerald-600"
                }`}
              >
                {materiau.stock}
                <span className={`text-sm font-normal ml-1 ${theme.textLight}`}>
                  {materiau.unite}
                </span>
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Valeur</p>
              <p className="text-lg font-bold text-[#C9A84C]">
                {fmt(valeurStock)}
              </p>
            </div>
          </div>
          <AnimatedProgress
            value={materiau.stock}
            max={materiau.seuil * 3}
            color={alerte ? "rose" : "emerald"}
            isDark={isDark}
          />
          <div className="flex items-center justify-between text-xs">
            <span className={theme.textLight}>
              Seuil: {materiau.seuil} {materiau.unite}
            </span>
            {alerte && (
              <span
                className={`flex items-center gap-1 font-semibold animate-pulse ${isDark ? "text-rose-400" : "text-rose-600"}`}
              >
                <AlertTriangle className="w-3 h-3" />
                Stock critique
              </span>
            )}
          </div>
          <div className="flex items-end gap-1 h-8 mt-2">
            {[...Array(5)].map((_, i) => {
              const height = Math.random() * 60 + 20;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm hover:bg-[#C9A84C]/60 transition-colors ${isDark ? "bg-white/20" : "bg-gray-300"}`}
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </div>
  );
}

function ModalDetail({ materiau, mouvements, onClose, isDark }) {
  if (!materiau) return null;
  const mvts = mouvements.filter(
    (m) => m.materiau_nom === materiau.nom || m.materiau === materiau.nom,
  );
  const totalEntrees = mvts
    .filter((m) => m.type === "Entrée")
    .reduce((s, m) => s + m.quantite, 0);
  const totalSorties = mvts
    .filter((m) => m.type === "Sortie")
    .reduce((s, m) => s + m.quantite, 0);
  const valeurStock = materiau.stock * materiau.prix;
  const alerte = materiau.stock <= materiau.seuil;
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full max-w-2xl border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
      >
        <div
          className={`relative px-6 py-6 border-b ${
            alerte
              ? isDark
                ? "bg-gradient-to-r from-rose-600/20 to-rose-500/10 border-rose-500/30"
                : "bg-gradient-to-r from-rose-100 to-rose-50 border-rose-200"
              : isDark
                ? "bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border-white/10"
                : "bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-200"
          }`}
        >
          <div
            className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? "bg-white/5" : "bg-gray-200/50"}`}
          />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                  alerte
                    ? isDark
                      ? "bg-rose-500/20 text-rose-400"
                      : "bg-rose-100 text-rose-600"
                    : isDark
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-emerald-100 text-emerald-600"
                }`}
              >
                <Box className="w-8 h-8" />
              </div>
              <div>
                <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>
                  {materiau.id}
                </p>
                <h2 className={`text-xl sm:text-2xl font-black ${theme.text}`}>
                  {materiau.nom}
                </h2>
                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${isDark ? "bg-white/10 text-white/80" : "bg-gray-200 text-gray-700"}`}
                >
                  {materiau.categorie}
                </span>
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

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div
              className={`border rounded-2xl p-4 text-center ${isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${isDark ? "bg-emerald-500/20" : "bg-emerald-100"}`}
              >
                <ArrowUpRight
                  className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                />
              </div>
              <p
                className={`text-xl sm:text-2xl font-black ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
              >
                +{totalEntrees}
              </p>
              <p className={theme.textSubtle}>Entrées</p>
            </div>
            <div
              className={`border rounded-2xl p-4 text-center ${isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-200"}`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${isDark ? "bg-rose-500/20" : "bg-rose-100"}`}
              >
                <ArrowDownRight
                  className={`w-5 h-5 ${isDark ? "text-rose-400" : "text-rose-600"}`}
                />
              </div>
              <p
                className={`text-xl sm:text-2xl font-black ${isDark ? "text-rose-500" : "text-rose-600"}`}
              >
                -{totalSorties}
              </p>
              <p className={theme.textSubtle}>Sorties</p>
            </div>
            <div
              className={`border rounded-2xl p-4 text-center ${
                alerte
                  ? isDark
                    ? "bg-rose-500/10 border-rose-500/20"
                    : "bg-rose-50 border-rose-200"
                  : isDark
                    ? "bg-blue-500/10 border-blue-500/20"
                    : "bg-blue-50 border-blue-200"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                  alerte
                    ? isDark
                      ? "bg-rose-500/20"
                      : "bg-rose-100"
                    : isDark
                      ? "bg-blue-500/20"
                      : "bg-blue-100"
                }`}
              >
                <Layers
                  className={`w-5 h-5 ${
                    alerte
                      ? isDark
                        ? "text-rose-400"
                        : "text-rose-600"
                      : isDark
                        ? "text-blue-400"
                        : "text-blue-600"
                  }`}
                />
              </div>
              <p
                className={`text-xl sm:text-2xl font-black ${
                  alerte
                    ? isDark
                      ? "text-rose-400"
                      : "text-rose-600"
                    : isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                }`}
              >
                {materiau.stock}
              </p>
              <p className={theme.textSubtle}>Stock actuel</p>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <CircularGauge
              value={materiau.stock}
              max={materiau.seuil * 3}
              size={120}
              color={alerte ? "#f43f5e" : "#10b981"}
              label="Niveau de stock"
              isDark={isDark}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              ["Unité", materiau.unite],
              ["Seuil d'alerte", `${materiau.seuil} ${materiau.unite}`],
              ["Prix unitaire", fmt(materiau.prix)],
              ["Valeur stock", fmt(valeurStock)],
            ].map(([label, val]) => (
              <div
                key={label}
                className={`rounded-xl p-4 border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-200"}`}
              >
                <p className={`text-xs mb-1 ${theme.textLight}`}>{label}</p>
                <p className={`text-lg font-bold ${theme.text}`}>{val}</p>
              </div>
            ))}
          </div>

          <div>
            <p
              className={`text-sm font-bold mb-3 flex items-center gap-2 ${theme.text}`}
            >
              <History className="w-4 h-4 text-[#C9A84C]" />
              Historique des mouvements
            </p>
            {mvts.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mvts.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 border hover:opacity-80 transition ${isDark ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-gray-50 border-gray-200 hover:bg-gray-100"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          m.type === "Entrée"
                            ? isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-600"
                            : isDark
                              ? "bg-rose-500/20 text-rose-400"
                              : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {m.type === "Entrée" ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${theme.text}`}>
                          {m.type}
                        </p>
                        <p className={`text-xs ${theme.textSubtle}`}>
                          {m.source || m.logement}
                        </p>
                        {m.depenseId && (
                          <p className={`text-xs ${theme.textLight}`}>
                            Ref: {m.depenseId}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          m.type === "Entrée"
                            ? isDark
                              ? "text-emerald-400"
                              : "text-emerald-600"
                            : isDark
                              ? "text-rose-400"
                              : "text-rose-600"
                        }`}
                      >
                        {m.type === "Entrée" ? "+" : "-"}
                        {m.quantite}
                      </p>
                      <p className={`text-xs ${theme.textLight}`}>{m.date}</p>
                      {m.type === "Entrée" && (
                        <span
                          className={`text-xs ${m.receptionne ? "text-emerald-500" : "text-amber-500"}`}
                        >
                          {m.receptionne ? "✓ Reçu" : "⏳ En attente"}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm text-center py-8 ${theme.textSubtle}`}>
                Aucun mouvement enregistré
              </p>
            )}
          </div>
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

function ModalSortie({
  materiaux,
  logements,
  initialLogement,
  initialMateriau,
  onClose,
  onSave,
  isDark,
}) {
  //  FILTRER uniquement les logements en maintenance
  const logementsMaintenance = logements.filter((l) => {
    const enMaintenance =
      l.statut === "Maintenance" || l.statut === "EN_REPARATION";
    if (!enMaintenance) return false;

   
    const besoins = l.besoinsMaintenance || [];

    if (l.statut === "EN_REPARATION") {
      const sortis = l.materiauxSortis || [];
      const besoinsRestants = besoins.filter((b) => {
        const s = sortis.find((ms) => ms.nom === b.nom);
        return !s || s.quantiteSortie < b.quantite;
      });
      return besoinsRestants.length > 0;
    }

   
    return true;
  });
  const [form, setForm] = useState({
    materiau: initialMateriau || materiaux[0]?.nom || "",
    quantite: 1,
    date: new Date().toLocaleDateString("fr-FR"),
    logement: String(logementsMaintenance[0]?.id || ""),
    motif: "",
  });

  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    return () => setMounted(false);
  }, []);

  const theme = isDark ? THEMES.dark : THEMES.light;
  const materiauSelected = materiaux.find((m) => m.nom === form.materiau);
  const logementSelected = logements.find(
    (l) => String(l.id) === String(form.logement),
  );

  // Sécurité : toujours vérifier que c'est un tableau
  const besoinsArr = Array.isArray(logementSelected?.besoinsMaintenance)
    ? logementSelected.besoinsMaintenance
    : [];
  const materiauxSortisArr = Array.isArray(logementSelected?.materiauxSortis)
    ? logementSelected.materiauxSortis
    : [];

  const besoinReel = besoinsArr.find((b) => b.nom === form.materiau);
  const dejaSorti =
    materiauxSortisArr.find((ms) => ms.nom === form.materiau)?.quantiteSortie ||
    0;

  //  Surplus autorisé : la limite est le stock disponible, pas le besoin
  const quantiteBesoinRestant = besoinReel
    ? Math.max(0, besoinReel.quantite - dejaSorti)
    : 0;

  const stockDisponible = materiauSelected?.stock || 0;
  const isSurplus = besoinReel && form.quantite > quantiteBesoinRestant;
  const isHorsBesoin = !besoinReel;
  const quantiteSaisie = Number(form.quantite) || 0;
  const quantiteDemandee = Math.min(
    Math.max(quantiteSaisie, 0),
    stockDisponible,
  );
  const pourcentage =
    stockDisponible > 0 ? (quantiteDemandee / stockDisponible) * 100 : 0;

  const canSubmit =
    logementsMaintenance.length > 0 &&
    quantiteDemandee > 0 &&
    quantiteDemandee <= stockDisponible &&
    !isHorsBesoin &&
    quantiteDemandee >= quantiteBesoinRestant;
  const handleSubmit = () => {
    if (isHorsBesoin) {
      setError(
        "Sortie impossible : ce matériau n'est demandé par aucun logement en maintenance",
      );
      return;
    }
    if (quantiteDemandee > stockDisponible) {
      setError(
        `Stock insuffisant. Disponible: ${stockDisponible} ${materiauSelected?.unite || "unités"}`,
      );
      return;
    }
    if (quantiteDemandee <= 0) {
      setError("La quantité doit être supérieure à 0");
      return;
    }

    
    onSave({
      ...form,
      quantite: quantiteDemandee,
      _materiauNom: form.materiau,
      _isSurplus: isSurplus,
      _isHorsBesoin: isHorsBesoin,
    });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-300 ${
        isDark ? "bg-black/80" : "bg-gray-900/60"
      } backdrop-blur-sm`}
    >
      <div
        className={`relative w-full sm:max-w-md transform transition-all duration-500 max-h-[95vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl ${
          mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        
        <div
          className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 ${
            isDark
              ? "bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500"
              : "bg-gradient-to-r from-rose-400 via-orange-400 to-rose-400"
          }`}
        />

        <div
          className={`relative rounded-3xl border overflow-hidden ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-white/20"
              : "bg-gradient-to-br from-white via-gray-50 to-white border-gray-200"
          } shadow-2xl`}
        >
          
          <div
            className={`relative px-6 py-5 ${
              isDark
                ? "bg-gradient-to-r from-rose-500/20 via-orange-500/10 to-transparent border-b border-white/10"
                : "bg-gradient-to-r from-rose-100 via-orange-50 to-transparent border-b border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isDark ? "bg-rose-500/20" : "bg-rose-100"
                  }`}
                >
                  <TrendingDown className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${theme.text}`}>
                    Sortie de stock
                  </h2>
                  <p className={`text-xs ${theme.textSubtle}`}>
                    Retrait de matériau
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                }`}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {/* Sélection Matériau */}
            <div>
              <label
                className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                  isDark ? "text-rose-400" : "text-rose-600"
                }`}
              >
                Matériau à retirer
              </label>
              <div className="relative">
                <Package
                  className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.textSubtle}`}
                />
                <select
                  value={form.materiau}
                  onChange={(e) => {
                    setForm({ ...form, materiau: e.target.value });
                    setError("");
                  }}
                  className={`w-full pl-12 pr-10 py-4 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                    isDark
                      ? "bg-white/5 border-white/10 focus:border-rose-500 text-white"
                      : "bg-gray-50 border-gray-200 focus:border-rose-500 text-gray-900"
                  }`}
                >
                  {materiaux.map((m) => (
                    <option
                      key={m.id}
                      value={m.nom}
                      className={isDark ? "bg-gray-800" : "bg-white"}
                    >
                      {m.nom} (Stock: {m.stock} {m.unite})
                    </option>
                  ))}
                </select>
                <ChevronRight
                  className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rotate-90 ${theme.textSubtle}`}
                />
              </div>
            </div>

            {/* Quantité et Logement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-rose-400" : "text-rose-600"
                  }`}
                >
                  Quantité
                </label>
                <div className="relative">
                  <Layers
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSubtle}`}
                  />
                  <input
                    type="number"
                    min="1"
                    max={stockDisponible}
                    value={form.quantite}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setForm({ ...form, quantite: val > 0 ? val : 0 });
                      setError("");
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 focus:border-rose-500 text-white"
                        : "bg-gray-50 border-gray-200 focus:border-rose-500 text-gray-900"
                    }`}
                  />
                </div>
              </div>
              <div>
                <label
                  className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                    isDark ? "text-rose-400" : "text-rose-600"
                  }`}
                >
                  Destination (Logement)
                </label>
                <div className="relative">
                  <div className="relative">
                    <Warehouse
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textSubtle}`}
                    />
                    <select
                      value={form.logement}
                      onChange={(e) =>
                        setForm({ ...form, logement: e.target.value })
                      }
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all appearance-none ${
                        isDark
                          ? "bg-white/5 border-white/10 focus:border-rose-500 text-white"
                          : "bg-gray-50 border-gray-200 focus:border-rose-500 text-gray-900"
                      }`}
                    >
                      {logementsMaintenance.length === 0 ? (
                        <option value="">Aucun logement en maintenance</option>
                      ) : (
                        logementsMaintenance.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.id} — {l.type} (Maintenance)
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  {logementsMaintenance.length === 0 && (
                    <p
                      className={`text-xs mt-2 ${isDark ? "text-rose-400" : "text-rose-600"}`}
                    >
                      <AlertWaiting className="w-4 h-4 text-yellow-500"/>Aucun logement en maintenance. Passez d'abord un
                      logement en maintenance.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Visualisation du stock - Jauge */}
            <div
              className={`p-4 rounded-2xl border ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className={`font-semibold ${theme.textSubtle}`}>
                  Stock disponible
                </span>
                <span
                  className={`font-bold ${
                    pourcentage > 80
                      ? "text-rose-500"
                      : pourcentage > 50
                        ? "text-amber-500"
                        : "text-emerald-500"
                  }`}
                >
                  {stockDisponible} {materiauSelected?.unite || "unités"}
                </span>
              </div>

              {/* Barre de progression stylisée */}
              <div
                className={`h-4 rounded-full overflow-hidden ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 relative ${
                    quantiteDemandee > stockDisponible
                      ? "bg-rose-500"
                      : quantiteDemandee > stockDisponible * 0.8
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(pourcentage, 100)}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                </div>
              </div>

              <div className="flex justify-between text-xs mt-2">
                <span className={theme.textLight}>0</span>
                <span
                  className={`font-semibold ${
                    quantiteDemandee > stockDisponible
                      ? "text-rose-500"
                      : theme.textMuted
                  }`}
                >
                  {quantiteDemandee} demandé{quantiteDemandee > 1 ? "s" : ""}
                </span>
                <span className={theme.textLight}>{stockDisponible}</span>
              </div>

              {quantiteDemandee > stockDisponible && (
                <div
                  className={`mt-3 p-3 rounded-xl flex items-center gap-2 animate-pulse ${
                    isDark
                      ? "bg-rose-500/20 text-rose-400"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  <Ban className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    Stock insuffisant !
                  </span>
                </div>
              )}
            </div>

            {/*  Alerte surplus */}
            {isHorsBesoin && quantiteDemandee > 0 && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  isDark
                    ? "bg-rose-500/15 text-rose-300 border border-rose-500/30"
                    : "bg-rose-100 text-rose-700 border border-rose-300"
                }`}
              >
                <Ban className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold">
                    <Ban className="w-4 h-4 text-red-500"/> Sortie impossible — Ce matériau n'est demandé par aucun
                    logement en maintenance
                  </p>
                  <p
                    className={`text-xs mt-1 ${isDark ? "text-rose-200/60" : "text-rose-600"}`}
                  >
                    Seuls les matériaux nécessaires aux logements en maintenance
                    peuvent être sortis
                  </p>
                </div>
              </div>
            )}
            {isSurplus && !isHorsBesoin && quantiteDemandee > 0 && (
              <div
                className={`p-4 rounded-xl flex items-center gap-3 ${
                  isDark
                    ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    : "bg-amber-100 text-amber-700 border border-amber-300"
                }`}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold">
                    <AlertTriangle className="w-4 h-4 text-yellow-500"/> Surplus : vous sortez {quantiteDemandee} alors que le
                    besoin restant est de {quantiteBesoinRestant}
                  </p>
                  <p
                    className={`text-xs mt-1 ${isDark ? "text-amber-200/60" : "text-amber-600"}`}
                  >
                    L'excédent sera retourné automatiquement au stock à la fin
                    de la réparation
                  </p>
                </div>
              </div>
            )}

            {/* Info besoin restant */}
            {besoinReel && !isSurplus && quantiteBesoinRestant > 0 && (
              <div
                className={`p-3 rounded-xl flex items-center gap-2 ${
                  isDark
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                <Package className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-semibold">
                  Besoin restant : {quantiteBesoinRestant}{" "}
                  {materiauSelected?.unite || "unités"} — Déjà sorti :{" "}
                  {dejaSorti}
                </span>
              </div>
            )}

            {/* Motif */}
            <div>
              <label
                className={`text-xs font-bold uppercase tracking-wider mb-2 block ${
                  isDark ? "text-rose-400" : "text-rose-600"
                }`}
              >
                Motif (optionnel)
              </label>
              <textarea
                value={form.motif}
                onChange={(e) => setForm({ ...form, motif: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none transition-all resize-none ${
                  isDark
                    ? "bg-white/5 border-white/10 focus:border-rose-500 text-white placeholder-white/30"
                    : "bg-gray-50 border-gray-200 focus:border-rose-500 text-gray-900 placeholder-gray-400"
                }`}
                rows="2"
                placeholder="Raison de la sortie de stock..."
              />
            </div>

            {error && (
              <div
                className={`p-4 rounded-xl text-sm flex items-center gap-3 ${
                  isDark
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    : "bg-rose-100 text-rose-600 border border-rose-300"
                }`}
              >
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
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
                  ? "border border-white/20 text-white/70 hover:bg-white/10"
                  : "border border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 transform ${
                canSubmit
                  ? "bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 hover:from-rose-600 hover:via-orange-600 hover:to-rose-600 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <Box className="w-4 h-4 text-amber-600"/> Confirmer la sortie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CarteReception3D({ depense, onReception, index, isDark }) {
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div style={style} className="group relative">
      <div
        className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${
          isDark ? "bg-blue-500/20" : "bg-blue-400/30"
        } group-hover:translate-y-4 group-hover:blur-xl`}
      />

      <div
        className={`relative bg-gradient-to-br ${
          isDark
            ? "from-blue-500/15 to-blue-600/5 border-blue-500/30"
            : "from-blue-100 to-blue-50 border-blue-300"
        } backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${
          isDark ? "" : "shadow-lg"
        }`}
      >
        {/* Icône camion animée */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 ${
              isDark
                ? "bg-blue-500/20 text-blue-400"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            <Truck className="w-7 h-7 group-hover:animate-bounce" />
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${
              isDark
                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                : "bg-amber-100 text-amber-600 border-amber-300"
            }`}
          >
            <Clock className="w-3 h-3 inline mr-1" />
            En transit
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>
              {depense.id}
            </p>
            <h3
              className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors ${theme.text}`}
            >
              {depense.description}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-sm ${theme.textMuted}`}>
                {depense.quantite || 1} {depense.unite || "unités"}
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-white/10 text-white/60"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {depense.categorie}
              </span>
            </div>
          </div>

          <div
            className={`p-3 rounded-xl border ${
              isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xs ${theme.textSubtle}`}>Fournisseur</span>
              <span className={`text-sm font-semibold ${theme.text}`}>
                {depense.fournisseur}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs ${theme.textSubtle}`}>Montant</span>
              <span className="text-lg font-black text-[#C9A84C]">
                {fmt(
                  depense.montant ||
                    depense.prixUnitaire * (depense.quantite || 1) ||
                    0,
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Calendar className={`w-4 h-4 ${theme.textSubtle}`} />
            <span className={theme.textSubtle}>Acheté le {depense.date}</span>
          </div>

          <button
            onClick={() => onReception(depense)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-500 to-teal-500 hover:from-emerald-600 hover:via-emerald-600 hover:to-teal-600 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transform group-hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-5 h-5" />✅ Marquer comme reçu
          </button>

          <p className={`text-xs text-center ${theme.textLight}`}>
            Cela créera automatiquement une entrée en stock
          </p>
        </div>

        {/* Effet hover */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
        />
      </div>
    </div>
  );
}

export default function Materiaux() {
  const {
    materiaux,
    mouvements,
    logements,
    depenses,
    supprimerMateriau,
    ajouterMouvement,
    receptionnerDepense,
    effacerAlerteLogement,
    alertesMaintenanceLog,
  } = useApp();

  const depensesEnAttente = depenses.filter(
    (d) => d.statut === "Validé" && !d.receptionne,
  );

  const handleReceptionComplete = (depense) => {
    receptionnerDepense(depense.id);

    triggerSuccess();
  };
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false);
  const [detail, setDetail] = useState(null);
  const [showSortie, setShowSortie] = useState(false);

  const isDark = useDarkMode();
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const alertes = materiaux.filter((m) => m.stock <= m.seuil);
  const valeurTotale = materiaux.reduce((s, m) => s + m.stock * m.prix, 0);

  const totalMouvements = mouvements.length;
  const totalEntreesGlobal = mouvements
    .filter((m) => m.type === "Entrée")
    .reduce((s, m) => s + m.quantite, 0);
  const totalSortiesGlobal = mouvements
    .filter((m) => m.type === "Sortie")
    .reduce((s, m) => s + m.quantite, 0);

  //filtre ny materiaux

  const filtered = materiaux.filter(
    (m) =>
      (filtre === "Tous" || m.categorie === filtre) &&
      m.nom.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSortie = (form) => {
    //  Récupérer l'unité du matériau pour traçabilité
    const materiauSelected = materiaux.find((m) => m.nom === form.materiau);
    ajouterMouvement({
      ...form,
      type: "Sortie",
      source: form.logement,
      unite: materiauSelected?.unite || "unités",
    });

    // SUPPRESSION CIBLÉE de l'alerte (uniquement le matériau sorti)
    if (form.logement && form._materiauNom) {
      effacerAlerteLogement(form.logement, form._materiauNom, form.quantite);
    }

    triggerSuccess();
  };

  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br p-6 space-y-6 transition-colors duration-500 ${theme.bg}`}
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

      {detail && (
        <ModalDetail
          materiau={detail}
          mouvements={mouvements}
          onClose={() => setDetail(null)}
          isDark={isDark}
        />
      )}
      {showSortie && (
        <ModalSortie
          materiaux={materiaux}
          logements={logements}
          initialLogement={
            typeof showSortie === "object" ? showSortie.logementId : null
          }
          initialMateriau={
            typeof showSortie === "object" ? showSortie.materiauNom : null
          }
          onClose={() => setShowSortie(false)}
          onSave={handleSortie}
          isDark={isDark}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-black ${theme.text}`}>
            Gestion des Matériaux
          </h1>
          <p className={theme.textSubtle}>Suivi des stocks et mouvements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard3D
          icon={Package}
          label="Types de matériaux"
          value={materiaux.length}
          color="blue"
          delay={0}
          trend="up"
          trendValue={12}
          isDark={isDark}
        />
        <StatCard3D
          icon={AlertTriangle}
          label="Alertes stock bas"
          value={alertes.length}
          color="rose"
          delay={100}
          subValue={`sur ${materiaux.length} références`}
          isDark={isDark}
        />
        <StatCard3D
          icon={TrendingUp}
          label="Total mouvements"
          value={totalMouvements}
          color="emerald"
          delay={200}
          trend="up"
          trendValue={8}
          isDark={isDark}
        />
        <StatCard3D
          icon={DollarSign}
          label="Valeur totale stock"
          value={valeurTotale}
          color="amber"
          delay={300}
          subValue={fmt(valeurTotale)}
          isDark={isDark}
        />
      </div>

      {Object.keys(alertesMaintenanceLog).length > 0 && (
        <div
          className={`border rounded-2xl p-5 backdrop-blur-sm mb-6 ${
            isDark
              ? "bg-gradient-to-r from-amber-500/10 to-rose-500/10 border-amber-500/30"
              : "bg-gradient-to-r from-amber-50 to-rose-50 border-amber-300"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isDark ? "bg-amber-500/20" : "bg-amber-200"
              }`}
            >
              <Wrench
                className={`w-6 h-6 ${isDark ? "text-amber-400" : "text-amber-600"}`}
              />
            </div>
            <div>
              <p
                className={`text-base font-bold ${isDark ? "text-amber-200" : "text-amber-800"}`}
              >
                🔧 Besoins matériaux — Maintenance
              </p>
              <p
                className={`text-xs ${isDark ? "text-white/50" : "text-gray-500"}`}
              >
                {Object.keys(alertesMaintenanceLog).length} logement(s) en
                attente
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(alertesMaintenanceLog).map(([logId, alertes]) => {
              const logement = logements.find((l) => l.id === logId);
              const sortis = logement?.materiauxSortis || [];

              return (
                <div
                  key={logId}
                  className={`p-4 rounded-xl border ${
                    isDark
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Home
                        className={`w-4 h-4 ${isDark ? "text-amber-400" : "text-amber-600"}`}
                      />
                      <span className={`text-sm font-bold ${theme.text}`}>
                        {logId} — {logement?.type || "Logement"}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        isDark
                          ? "bg-rose-500/20 text-rose-400"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      En attente
                    </span>
                  </div>

                  {/* Liste des matériaux avec statut DYNAMIQUE */}
                  <div className="space-y-2">
                    {alertes.map((a, i) => {
                      const mat = materiaux.find(
                        (m) => m.nom.toLowerCase() === a.nom.toLowerCase(),
                      );
                      const stockActuel = mat?.stock || 0;

                      // Vérifier si déjà sorti
                      const sorti = sortis.find((s) => s.nom === a.nom);
                      const quantiteDejaSortie = sorti?.quantiteSortie || 0;
                      const quantiteRestante = Math.max(
                        0,
                        a.quantite - quantiteDejaSortie,
                      );
                      const estComplet = quantiteRestante === 0;

                      //  NOUVEAU : Déterminer le statut DYNAMIQUEMENT
                      let statutDynamique = a.statut; // fallback sur le statut initial

                      if (estComplet) {
                        statutDynamique = "complet"; // Tout est sorti
                      } else if (stockActuel >= quantiteRestante) {
                        statutDynamique = "ok"; // Stock suffisant pour le reste
                      } else if (stockActuel > 0) {
                        statutDynamique = "manque"; // Stock partiel
                      } else {
                        statutDynamique = "achat"; // Rien en stock
                      }

                      //  Configuration visuelle selon le statut DYNAMIQUE
                      const statutConfig = {
                        complet: {
                          label: "✓ Satisfait",
                          tooltip: "Quantité complète sortie du stock",
                          bg: isDark
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-emerald-100 text-emerald-700 border-emerald-300",
                          dot: "bg-emerald-500",
                        },
                        ok: {
                          label: "✓ OK",
                          tooltip: `Stock suffisant (${stockActuel} dispo / ${quantiteRestante} requis)`,
                          bg: isDark
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-emerald-100 text-emerald-700 border-emerald-300",
                          dot: "bg-emerald-500",
                        },
                        manque: {
                          label: "⚠ Insuffisant",
                          tooltip: `Stock partiel (${stockActuel} dispo / ${quantiteRestante} requis)`,
                          bg: isDark
                            ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                            : "bg-amber-100 text-amber-700 border-amber-300",
                          dot: "bg-amber-500",
                        },
                        achat: {
                          label: " À acheter",
                          tooltip:
                            "Matériau absent du stock — commande requise",
                          bg: isDark
                            ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                            : "bg-rose-100 text-rose-700 border-rose-300",
                          dot: "bg-rose-500",
                        },
                      };
                      const cfg =
                        statutConfig[statutDynamique] || statutConfig.achat;

                      return (
                        <div
                          key={i}
                          className={`flex items-start sm:items-center gap-2 sm:gap-3 py-2 px-3 rounded-lg flex-wrap transition ${
                            estComplet
                              ? isDark
                                ? "bg-emerald-500/10"
                                : "bg-emerald-50"
                              : "hover:bg-white/5"
                          }`}
                        >
                          {/* Pastille statut dynamique */}
                          <div
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              estComplet
                                ? "bg-emerald-500"
                                : `${cfg.dot} animate-pulse`
                            }`}
                          />

                          <Package
                            className={`w-4 h-4 shrink-0 ${
                              isDark ? "text-amber-400/60" : "text-amber-600/60"
                            }`}
                          />

                          <span
                            className={`text-sm flex-1 min-w-0 ${
                              estComplet
                                ? isDark
                                  ? "text-white/40 line-through"
                                  : "text-gray-400 line-through"
                                : isDark
                                  ? "text-white/80"
                                  : "text-gray-700"
                            }`}
                          >
                            <span className="font-semibold">{a.nom}</span>
                            {sorti && (
                              <span
                                className={`text-xs ml-2 ${
                                  isDark
                                    ? "text-emerald-400"
                                    : "text-emerald-600"
                                }`}
                              >
                                ({quantiteDejaSortie}/{a.quantite} sortis)
                              </span>
                            )}
                          </span>

                          {/*  Badge statut DYNAMIQUE */}
                          {!estComplet && (
                            <span
                              title={cfg.tooltip}
                              className={`text-xs font-bold px-2 py-1 rounded-md border ${cfg.bg}`}
                            >
                              {cfg.label}
                            </span>
                          )}

                          {/* Badge quantité restante */}
                          {!estComplet && (
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                                isDark
                                  ? "bg-white/5 text-white/70 border border-white/10"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }`}
                            >
                              {quantiteRestante} {a.unite}
                            </span>
                          )}

                          {/* Badge complété */}
                          {estComplet && (
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                                isDark
                                  ? "bg-emerald-500/20 text-emerald-400"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              <Check className="w-4 h-4 text-green-500"/>Satisfait
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Footer action */}
                  <div
                    className="mt-3 pt-3 border-t border-dashed flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 justify-between"
                    style={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span className={`text-xs ${theme.textLight}`}>
                      Cliquez sur "Sortie" pour réserver les matériaux
                    </span>
                    <button
                      onClick={() => {
                        setShowSortie({
                          logementId: logId,
                          materiauNom: alertes[0]?.nom,
                        });
                      }}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition hover:scale-105 ${
                        isDark
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-300"
                      }`}
                    >
                      Sortie →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {depensesEnAttente.length > 0 && (
        <div
          className={`relative overflow-hidden border rounded-3xl p-6 backdrop-blur-xl ${
            isDark
              ? "bg-gradient-to-br from-blue-500/10 via-blue-600/5 to-amber-500/10 border-blue-500/30"
              : "bg-gradient-to-br from-blue-50 via-blue-100/50 to-amber-50 border-blue-300"
          }`}
        >
          {/* Background misy animation kely */}
          <div
            className={`absolute inset-0 ${
              isDark ? "bg-blue-500/5" : "bg-blue-200/20"
            } animate-pulse`}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isDark ? "bg-blue-500/20" : "bg-blue-200"
                }`}
              >
                <Truck
                  className={`w-7 h-7 ${isDark ? "text-blue-400" : "text-blue-600"}`}
                />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${theme.text}`}>
                  <Box className="w-4 h-4 text-amber-100"/> Réceptions en attente
                </h3>
                <p className={`text-sm ${theme.textSubtle}`}>
                  {depensesEnAttente.length} matériau
                  {depensesEnAttente.length > 1 ? "x" : ""} à réceptionner
                </p>
              </div>
              <div
                className={`ml-auto sm:ml-0 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold ${
                  isDark
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-blue-200 text-blue-700 border border-blue-300"
                }`}
              >
                Action requise
              </div>
            </div>

            {/* Grille des cartes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {depensesEnAttente.map((depense, index) => (
                <CarteReception3D
                  key={depense.id}
                  depense={depense}
                  onReception={handleReceptionComplete}
                  index={index}
                  isDark={isDark}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {alertes.length > 0 && (
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
                Stock bas — réapprovisionnement nécessaire
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {alertes.map((m) => (
                  <span
                    key={m.id}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      isDark
                        ? "bg-rose-500/20 border border-rose-500/30 text-rose-200"
                        : "bg-rose-200 border border-rose-300 text-rose-700"
                    }`}
                  >
                    {m.nom} — {m.stock} {m.unite}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    
      <div className="flex flex-col gap-3">
        
        <div className="flex items-center gap-2 flex-wrap">
          
          <div className="hidden 1112:block">
            <div
              className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFiltre(c)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    filtre === c
                      ? "bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white shadow-lg shadow-amber-500/20"
                      : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* ── Filtres : mobile (dropdown) ── */}
          <div className="1112:hidden relative flex-1 min-w-0">
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
                Filtre : <span className="text-[#C9A84C]">{filtre}</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${menuMobileOuvert ? "rotate-180" : ""}`}
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
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setFiltre(c);
                      setMenuMobileOuvert(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-3 ${
                      filtre === c
                        ? isDark
                          ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                          : "bg-amber-50 text-amber-700"
                        : isDark
                          ? "text-white/70 hover:bg-white/5"
                          : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {filtre === c && <Check className="w-4 h-4" />}
                    <span className={filtre === c ? "font-bold" : ""}>{c}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recherche + Sortie */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 min-w-0">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textLight}`}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition text-sm ${theme.input} ${theme.text}`}
            />
          </div>
          <button
            onClick={() => setShowSortie(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all hover:scale-105"
          >
            <TrendingDown className="w-4 h-4" />
            <span className="hidden sm:inline">Sortie</span>
          </button>
        </div>
      </div>

      {/* Fermer le dropdown quand on clique ailleurs */}
      {menuMobileOuvert && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setMenuMobileOuvert(false)}
        />
      )}

      <p className={theme.textLight}>
        {filtered.length} matériau{filtered.length > 1 ? "x" : ""} trouvé
        {filtered.length > 1 ? "s" : ""}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((m, index) => (
          <MateriauCard
            key={m.id}
            materiau={m}
            onDetail={() => setDetail(m)}
            onDelete={() => supprimerMateriau(m.id)}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>

      <div
        className={`backdrop-blur-sm border rounded-3xl p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
      >
        <div className="flex items-center justify-between mb-6 max-[524px]:flex-col max-[524px]:items-start max-[524px]:gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text}`}>
                Historique des mouvements
              </h3>
              <p className={theme.textSubtle}>
                {mouvements.length} mouvements enregistrés
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 text-sm max-[524px]:w-full max-[524px]:justify-start flex-wrap">
            <span
              className={`flex items-center gap-2 font-semibold px-3 py-1.5 rounded-lg ${isDark ? "text-emerald-400 bg-emerald-500/10" : "text-emerald-600 bg-emerald-100"}`}
            >
              <ArrowUpRight className="w-4 h-4" />
              {totalEntreesGlobal} entrées
            </span>
            <span
              className={`flex items-center gap-2 font-semibold px-3 py-1.5 rounded-lg ${isDark ? "text-rose-400 bg-rose-500/10" : "text-rose-600 bg-rose-100"}`}
            >
              <ArrowDownRight className="w-4 h-4" />
              {totalSortiesGlobal} sorties
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                className={`border-b ${isDark ? "border-white/10" : "border-gray-200"}`}
              >
                {[
                  { label: "Réf", hideMobile: true },
                  { label: "Matériau", hideMobile: false },
                  { label: "Type", hideMobile: false },
                  { label: "Quantité", hideMobile: false },
                  { label: "Source/Dest.", hideMobile: true },
                  { label: "Statut", hideMobile: true },
                  { label: "Date", hideMobile: false },
                ].map((h) => (
                  <th
                    key={h.label}
                    className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight} ${h.hideMobile ? "hidden sm:table-cell" : ""}`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mouvements.slice(0, 10).map((m) => (
                <tr
                  key={m.id}
                  className={`border-b transition group ${isDark ? "border-white/5 hover:bg-white/5" : "border-gray-100 hover:bg-gray-50"}`}
                >
                  <td
                    className={`py-3 px-4 font-mono text-xs ${theme.textLight} hidden sm:table-cell`}
                  >
                    {m.id}
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold group-hover:text-[#C9A84C] transition ${theme.text}`}
                  >
                    {m.materiau}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                        m.type === "Entrée"
                          ? isDark
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-emerald-100 text-emerald-600"
                          : isDark
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {m.type === "Entrée" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {m.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-black ${theme.text}`}>
                    {m.quantite}
                  </td>
                  <td
                    className={`py-3 px-4 text-xs ${theme.textSubtle} hidden sm:table-cell`}
                  >
                    {m.source || m.logement}
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {m.type === "Entrée" && m.depenseId && (
                      <span
                        className={`text-xs ${m.receptionne ? "text-emerald-500" : "text-amber-500"}`}
                      >
                        {m.receptionne ? "✓ Reçu" : "⏳ Attente"}
                      </span>
                    )}
                    {m.type === "Sortie" && (
                      <span className="text-xs text-rose-500">✓ Validé</span>
                    )}
                  </td>
                  <td className={`py-3 px-4 text-xs ${theme.textLight}`}>
                    {m.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {mouvements.length > 10 && (
          <button
            className={`w-full mt-4 py-3 text-sm rounded-xl transition flex items-center justify-center gap-2 ${isDark ? "text-white/50 hover:text-white hover:bg-white/5" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
          >
            Voir tous les mouvements
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
