import { useState, useEffect } from "react";

import { useApp } from "../context/AppContext";
import {
  BarChart2,
  User,
  Scale,
  Anchor,
  Wrench,
  Landmark,
  Wallet,
<<<<<<< HEAD
  ChevronDown,
  Pencil,
=======
  ArrowLeftRight,
  ChevronDown,
  Pencil,
  SquareMenu,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  Plus,
  Trash2,
  Search,
  Layers,
  X,
  Check,
  Eye,
  Shield,
  Laptop,
  HandCoins,
  Globe,
  Truck,
  FlaskConical,
  BookOpen,
  Headphones,
  Megaphone,
  Leaf,
  Cpu,
  Database,
  FileText,
  Star,
  Zap,
  Package,
  Settings,
  Map,
  Phone,
  Camera,
  Music,
  Heart,
  TrendingUp,
  TrendingDown,
  Users,
<<<<<<< HEAD
  
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  Briefcase,
  Mail,
  MapPin,
  Clock,
  BarChart3,
  Building,
  Home,
  Sparkles,
<<<<<<< HEAD
  
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  AlertTriangle,
  Building2,
  UserPlus,
  UserX,
  ChevronUp,
} from "lucide-react";

// Icon options
const ICON_OPTIONS = [
  { label: "BarChart2", Icon: BarChart2 },
  { label: "Users", Icon: User },
  { label: "HandCoins", Icon: HandCoins },
  { label: "Scale", Icon: Scale },
  { label: "Anchor", Icon: Anchor },
  { label: "Wrench", Icon: Wrench },
  { label: "Landmark", Icon: Landmark },
  { label: "Shield", Icon: Shield },
  { label: "Laptop", Icon: Laptop },
  { label: "Wallet", Icon: Wallet },
  { label: "Globe", Icon: Globe },
  { label: "Truck", Icon: Truck },
  { label: "FlaskConical", Icon: FlaskConical },
  { label: "BookOpen", Icon: BookOpen },
  { label: "Headphones", Icon: Headphones },
  { label: "Megaphone", Icon: Megaphone },
  { label: "Leaf", Icon: Leaf },
  { label: "Cpu", Icon: Cpu },
  { label: "Database", Icon: Database },
  { label: "FileText", Icon: FileText },
  { label: "Star", Icon: Star },
  { label: "Zap", Icon: Zap },
  { label: "Package", Icon: Package },
  { label: "Settings", Icon: Settings },
  { label: "Map", Icon: Map },
  { label: "Phone", Icon: Phone },
  { label: "Camera", Icon: Camera },
  { label: "Music", Icon: Music },
  { label: "Heart", Icon: Heart },
];

//Color teintes 
const COLOR_TEINTES = [
  {
    label: "Bleu",
    bgLight: "#dbeafe",
    bgDark: "#1e3a5f",
    iconLight: "#1e40af",
    iconDark: "#93c5fd",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    label: "Violet",
    bgLight: "#ede9fe",
    bgDark: "#3b1f6e",
    iconLight: "#5b21b6",
    iconDark: "#c4b5fd",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    label: "Vert",
    bgLight: "#d1fae5",
    bgDark: "#064e3b",
    iconLight: "#065f46",
    iconDark: "#6ee7b7",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Ambre",
    bgLight: "#fef3c7",
    bgDark: "#451a03",
    iconLight: "#92400e",
    iconDark: "#fcd34d",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    label: "Cyan",
    bgLight: "#cffafe",
    bgDark: "#083344",
    iconLight: "#0e7490",
    iconDark: "#67e8f9",
    gradient: "from-cyan-500 to-cyan-600",
  },
  {
    label: "Rouge",
    bgLight: "#fee2e2",
    bgDark: "#450a0a",
    iconLight: "#991b1b",
    iconDark: "#fca5a5",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    label: "Rose",
    bgLight: "#fce7f3",
    bgDark: "#500724",
    iconLight: "#9d174d",
    iconDark: "#f9a8d4",
    gradient: "from-pink-500 to-pink-600",
  },
  {
    label: "Indigo",
    bgLight: "#e0e7ff",
    bgDark: "#1e1b4b",
    iconLight: "#3730a3",
    iconDark: "#a5b4fc",
    gradient: "from-indigo-500 to-indigo-600",
  },
  {
    label: "Teal",
    bgLight: "#ccfbf1",
    bgDark: "#042f2e",
    iconLight: "#0f766e",
    iconDark: "#5eead4",
    gradient: "from-teal-500 to-teal-600",
  },
  {
    label: "Orange",
    bgLight: "#ffedd5",
    bgDark: "#431407",
    iconLight: "#c2410c",
    iconDark: "#fdba74",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    label: "Lime",
    bgLight: "#ecfccb",
    bgDark: "#1a2e05",
    iconLight: "#3f6212",
    iconDark: "#bef264",
    gradient: "from-lime-500 to-lime-600",
  },
  {
    label: "Gris",
    bgLight: "#f3f4f6",
    bgDark: "#1f2937",
    iconLight: "#374151",
    iconDark: "#d1d5db",
    gradient: "from-gray-500 to-gray-600",
  },
];

const CATEGORIES = [
  "Cadre supérieur",
  "Cadre moyen",
  "Agent maîtrise",
  "Agent exécution",
];
const SITUATIONS = ["Célibataire", "Marié", "Divorcé", "Veuf"];
<<<<<<< HEAD
// ─── Motifs de désactivation ─────────────────────────────────────────────────
=======
//  Motifs de désactivation 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
const MOTIFS_DEFINITIFS = [
  { label: "Retraite", type: "definitif" },
  { label: "Démission", type: "definitif" },
  { label: "Décès", type: "definitif" },
  { label: "Renvoi", type: "definitif" },
  { label: "Autre (définitif)", type: "definitif" },
];
<<<<<<< HEAD

const MOTIFS_TEMPORAIRES = [
  { label: "Congé maladie", type: "temporaire" },
  { label: "Congé parental", type: "temporaire" },
  { label: "Congé sans solde", type: "temporaire" },
  { label: "Mise à pied disciplinaire", type: "temporaire" },
  { label: "Formation prolongée", type: "temporaire" },
  { label: "Autre (temporaire)", type: "temporaire" },
];

const AVATAR_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#0e7490",
];

// ============================================
// THÈME CLAIR/SOMBRE - Détection automatique
// ============================================
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

// ─── Hooks d'animation ───────────────────────────────────────────────────────
=======

const MOTIFS_TEMPORAIRES = [
  { label: "Congé maladie", type: "temporaire" },
  { label: "Congé parental", type: "temporaire" },
  { label: "Congé sans solde", type: "temporaire" },
  { label: "Mise à pied disciplinaire", type: "temporaire" },
  { label: "Formation prolongée", type: "temporaire" },
  { label: "Autre (temporaire)", type: "temporaire" },
];

const AVATAR_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#0e7490",
];


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

//Hooks d'animation
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
// ─── Composant Carte Stat 3D (style materiaux) ───────────────────────────────
=======
//Composant Carte Stat 3D ─
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


// ─── Barre de progression animée 3D ───────────────────────────────────────────
=======
// Barre de progression animée 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function AnimatedProgress({ value, max, color = "emerald", isDark }) {
  const percentage = Math.min((value / max) * 100, 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className="space-y-1">
      <div
        className={`h-2.5 rounded-full overflow-hidden backdrop-blur-sm border ${isDark ? "bg-gray-700/50 border-white/10" : "bg-gray-200 border-gray-300"}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out relative bg-${color}-500`}
          style={{
            width: `${percentage}%`,
            boxShadow: `0 0 15px ${color === "emerald" ? "#10b981" : color === "blue" ? "#3b82f6" : color === "violet" ? "#8b5cf6" : "#f59e0b"}60`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex justify-between text-xs">
        <span className={theme.textLight}>{value}</span>
        <span className={`font-semibold ${theme.textMuted}`}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}

<<<<<<< HEAD


// ─── Helpers ──────────────────────────────────────────────────────────────────
=======
//  Helpers
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function avatarColor(nom) {
  let h = 0;
  for (const c of nom) h += c.charCodeAt(0);
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
<<<<<<< HEAD
function genId() {
  return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function catBadge(cat, isDark) {
  const map = {
    "Cadre supérieur": isDark
      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
      : "bg-purple-100 text-purple-700 border border-purple-200",
    "Cadre moyen": isDark
      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
      : "bg-blue-100 text-blue-700 border border-blue-200",
    "Agent maîtrise": isDark
      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
      : "bg-amber-100 text-amber-700 border border-amber-200",
    "Agent exécution": isDark
      ? "bg-gray-500/20 text-gray-300 border border-gray-500/30"
      : "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    map[cat] ||
    (isDark
      ? "bg-gray-500/20 text-gray-300 border border-gray-500/30"
      : "bg-gray-100 text-gray-600 border border-gray-200")
  );
}

<<<<<<< HEAD
// ─── Avatar 3D ────────────────────────────────────────────────────────────────
function Avatar({ prenom = "", nom = "", size = "md", className = "" }) {
  const initials =
    ((prenom || "")[0] || "").toUpperCase() + ((nom || "")[0] || "").toUpperCase();
=======
// Avatar 3D 
function Avatar({ prenom, nom, size = "md", className = "" }) {
  const initials =
    (prenom[0] || "").toUpperCase() + (nom[0] || "").toUpperCase();
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const sz =
    size === "lg"
      ? "w-16 h-16 text-xl"
      : size === "xl"
        ? "w-24 h-24 text-3xl"
        : size === "sm"
          ? "w-8 h-8 text-xs"
          : "w-10 h-10 text-sm";
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg transform hover:scale-110 transition-transform duration-300 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${avatarColor(nom)}, ${avatarColor(nom)}aa)`,
        boxShadow: `0 4px 15px ${avatarColor(nom)}40`,
      }}
    >
      {initials}
    </div>
  );
}

<<<<<<< HEAD
// ─── Modal wrapper 3D ─────────────────────────────────────────────────────────
=======
//Modal wrapper 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function Modal({
  title,
  onClose,
  onConfirm,
  confirmLabel = "Ajouter",
  confirmDisabled = false,
  children,
  size = "md",
  isDark,
}) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
      onClick={onClose}
    >
      <div
        className={`rounded-3xl shadow-2xl w-full ${sizeClasses[size]} border overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between px-6 py-4 border-b shrink-0 ${isDark ? "border-white/10 bg-gradient-to-r from-gray-800 to-gray-900" : "border-gray-200 bg-gradient-to-r from-gray-50 to-white"}`}
        >
          <span
            className={`text-base font-bold flex items-center gap-2 ${theme.text}`}
          >
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            {title}
          </span>
          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:rotate-90 duration-300 ${isDark ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700"}`}
          >
            <X size={14} />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {children}
        </div>
        <div
          className={`flex gap-3 px-6 py-4 border-t justify-end shrink-0 ${isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50/50"}`}
        >
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 ${theme.buttonSecondary}`}
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmDisabled}
            className={`px-5 py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 ${confirmDisabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] hover:shadow-lg hover:shadow-blue-500/25"}`}
          >
            <Check size={13} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Field helpers ────────────────────────────────────────────────────────────
=======
// Field helpers
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function Field({ label, children, isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className={`text-xs font-semibold uppercase tracking-wide ${theme.textSubtle}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isDark,
}) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  return (
    <Field label={label} isDark={isDark}>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(type === "number" ? Number(e.target.value) : e.target.value)
        }
        className={`w-full px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition-all ${theme.input} ${theme.text}`}
      />
    </Field>
  );
}

<<<<<<< HEAD
// ─── Icon Picker 3D ───────────────────────────────────────────────────────────
=======
//Icon Picker 3D
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function IconPicker({ selected, onChange, isDark }) {
  return (
    <Field label="Icône (Lucide)" isDark={isDark}>
      <div
        className={`grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
      >
        {ICON_OPTIONS.map(({ label, Icon }, i) => (
          <button
            key={label}
            onClick={() => onChange(i)}
            title={label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${
              selected === i
                ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/30"
                : `${isDark ? "bg-white/5 text-white/50 hover:bg-white/10 border border-white/10" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"}`
            }`}
          >
            <Icon size={16} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </Field>
  );
}

<<<<<<< HEAD
// ─── Color Picker 3D ─────────────────────────────────────────────────────────
=======
// Color Picker 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function ColorPicker({ selected, onChange, isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  return (
    <Field label="Teinte de couleur" isDark={isDark}>
      <div
        className={`flex flex-wrap gap-2.5 p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
      >
        {COLOR_TEINTES.map((t, i) => (
          <button
            key={t.label}
            onClick={() => onChange(i)}
            title={t.label}
            className="relative w-8 h-8 rounded-full transition-all hover:scale-110 focus:outline-none shrink-0"
            style={{
              background: isDark ? t.bgDark : t.bgLight,
              border:
                selected === i
                  ? `3px solid ${isDark ? t.iconDark : t.iconLight}`
                  : "2px solid transparent",
              boxShadow:
                selected === i
                  ? `0 0 0 2px ${isDark ? "#1f2937" : "white"}, 0 0 0 4px ${isDark ? t.iconDark : t.iconLight}`
                  : "none",
            }}
          >
            {selected === i && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check
                  size={13}
                  color={isDark ? t.iconDark : t.iconLight}
                  strokeWidth={3}
                />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className={`text-xs mt-1 ${theme.textLight}`}>
        Sélectionné :{" "}
        <span className={`font-semibold ${theme.textMuted}`}>
          {COLOR_TEINTES[selected]?.label}
        </span>
      </p>
    </Field>
  );
}

<<<<<<< HEAD
// ─── Modal Détail Employé ERP Style 3D ────────────────────────────────────────


 function ModalDetailEmployeERP({
=======
// Modal Détail Employé ERP Style 3D 

function ModalDetailEmployeERP({
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  employe,
  dept,
  service,
  onClose,
  onEdit,
  onDelete,
  isDark,
}) {
  const { style } = useReveal();
  const theme = isDark ? THEMES.dark : THEMES.light;

  const ancienneteAnnees = employe.anciennete || 0;
  const estEligibleLogement = ancienneteAnnees >= 2;
<<<<<<< HEAD
const { attributions } = useApp();

// Statut logement de cet employé
const attEmploye = attributions?.find(
  (a) => a.occupants?.includes(`${employe.prenom} ${employe.nom}`) && a.statut !== "Terminé"
);
const statutLogement = attEmploye ? "Logé" : "Non logé";
const attEnMaintenance = attributions?.find(
  (a) => a._serviceId === service.id && a.statut === "Maintenance"
);

const [simulationReemmenagement, setSimulationReemmenagement] = useState(null);

const lancerSimulationReemmenagement = (dureeSecondes = 10) => {
  const fin = Date.now() + dureeSecondes * 1000;
  setSimulationReemmenagement({ debut: Date.now(), fin });
};

useEffect(() => {
  if (!simulationReemmenagement) return;
  const t = setInterval(() => {
    if (Date.now() >= simulationReemmenagement.fin) {
      setSimulationReemmenagement(null);
      clearInterval(t);
    } else {
      setSimulationReemmenagement(prev => ({ ...prev, _tick: Date.now() }));
    }
  }, 1000);
  return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [simulationReemmenagement?.fin]);
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-300 ${isDark ? "bg-black/60" : "bg-gray-900/40"}`}
      onClick={onClose}
    >
      <div
        style={style}
        className={`rounded-3xl shadow-2xl w-full max-w-lg border overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300 ${isDark ? "bg-gradient-to-br from-gray-900 to-gray-800 border-white/10" : "bg-white border-gray-200"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec gradient */}
        <div className="relative h-28 bg-gradient-to-r from-[#0F2D56] via-[#1a4a7a] to-[#0F2D56] overflow-hidden shrink-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C9A84C]/20 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90 duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Contenu unique centré */}
<<<<<<< HEAD
        <div className={`flex-1 overflow-y-auto p-6 flex flex-col gap-6 ${isDark ? "bg-white/5" : "bg-gray-50/80"}`}>
=======
        <div
          className={`flex-1 overflow-y-auto p-6 flex flex-col gap-6 ${isDark ? "bg-white/5" : "bg-gray-50/80"}`}
        >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          {/* Avatar + Nom */}
          <div className="text-center">
            <div className="relative inline-block -mt-20 mb-4">
              <Avatar
                prenom={employe.prenom}
                nom={employe.nom}
                size="xl"
                className="ring-4 ring-white dark:ring-gray-800 shadow-2xl"
              />
              <div
                className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 ${isDark ? "border-gray-800" : "border-white"} ${estEligibleLogement ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{
                  boxShadow: `0 0 10px ${estEligibleLogement ? "#10b981" : "#f59e0b"}60`,
                }}
              />
            </div>
            <h2 className={`text-xl font-bold ${theme.text}`}>
              {employe.prenom} {employe.nom}
            </h2>
<<<<<<< HEAD
            <p className={`text-sm ${theme.textSubtle}`}>
              {employe.categorie}
            </p>
=======
            <p className={`text-sm ${theme.textSubtle}`}>{employe.categorie}</p>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div className="mt-3 flex justify-center gap-2 flex-wrap">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${catBadge(employe.categorie, isDark)}`}
              >
                {employe.matricule}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  estEligibleLogement
                    ? isDark
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : isDark
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-amber-100 text-amber-700 border border-amber-200"
                }`}
              >
                {estEligibleLogement ? "✓ Éligible" : "⏳ En attente"}
              </span>
            </div>
          </div>

          {/* Info rapide */}
          <div className="space-y-3">
            {[
              {
                icon: Building,
                label: "Département",
                value: dept.name,
                color: isDark
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-blue-100 text-blue-600",
              },
              {
                icon: Layers,
                label: "Service",
                value: service.name,
                color: isDark
                  ? "bg-violet-500/20 text-violet-400"
                  : "bg-violet-100 text-violet-600",
              },
              {
                icon: User,
                label: "Chef de service",
                value: service.chef,
                color: isDark
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-amber-100 text-amber-600",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-md ${isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:shadow-lg"}`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs ${theme.textLight}`}>{item.label}</p>
                  <p className={`text-sm font-semibold truncate ${theme.text}`}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-2">
<<<<<<< HEAD
            <h4 className={`text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}>
=======
            <h4
              className={`text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}
            >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              Contact
            </h4>
            <div className="space-y-2">
              {[
                {
                  icon: Mail,
<<<<<<< HEAD
                  value: employe.email || `${(employe.prenom || "").toLowerCase()}.${(employe.nom || "").toLowerCase()}@spat.mg`,
=======
                  value:
                    employe.email ||
                    `${(employe.prenom || "").toLowerCase()}.${(employe.nom || "").toLowerCase()}@spat.mg`,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                },
                { icon: Phone, value: employe.telephone || "Non renseigné" },
                { icon: MapPin, value: employe.adresse || "Non renseigné" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-sm ${theme.textSubtle}`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Situation familiale */}
<<<<<<< HEAD
          <div className={`border rounded-2xl p-5 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}>
            <h4 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${theme.text}`}>
=======
          <div
            className={`border rounded-2xl p-5 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}
          >
            <h4
              className={`text-sm font-semibold mb-4 flex items-center gap-2 ${theme.text}`}
            >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              <Heart className="w-4 h-4 text-rose-500" />
              Situation familiale
            </h4>
            <div className="space-y-3">
              {[
                { label: "Statut", value: employe.situation },
                { label: "Enfants à charge", value: employe.nb_enfants },
                { label: "Ancienneté", value: `${employe.anciennete} ans` },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center justify-between p-3 rounded-xl ${isDark ? "bg-white/5" : "bg-gray-50"}`}
                >
                  <span className={`text-sm ${theme.textSubtle}`}>
                    {item.label}
                  </span>
                  <span className={`font-semibold ${theme.text}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
<<<<<<< HEAD
{/* Statut logement + simulation réemménagement */}
{estEligibleLogement && (
  <div className={`border rounded-2xl p-4 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}>
    <h4 className={`text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-2 ${theme.textLight}`}>
      <Home className="w-3.5 h-3.5" /> Statut logement
    </h4>
    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
      statutLogement === "Logé"
        ? isDark ? "bg-emerald-500/20 text-emerald-300" : "bg-emerald-100 text-emerald-700"
        : isDark ? "bg-gray-500/20 text-gray-400" : "bg-gray-100 text-gray-500"
    }`}>
      {statutLogement === "Logé" ? "🏠 Logé" : "Non logé"}
    </span>

    {statutLogement === "Non logé" && attEnMaintenance && (
      <p className={`text-xs mt-2 ${isDark ? "text-amber-300" : "text-amber-700"}`}>
        ⚠️ Logement en maintenance — réemménagement possible
      </p>
    )}

    {statutLogement === "Non logé" && (
      !simulationReemmenagement ? (
        <button
          onClick={() => lancerSimulationReemmenagement(10)}
          className="mt-3 w-full py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white flex items-center justify-center gap-2 hover:shadow-lg transition"
        >
          <Home className="w-3.5 h-3.5" /> Simuler le réemménagement
        </button>
      ) : (
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-xs">
            <span className={isDark ? "text-white/60" : "text-gray-500"}>Réemménagement en cours...</span>
            <span className={`font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
              {Math.max(0, Math.ceil((simulationReemmenagement.fin - Date.now()) / 1000))}s restantes
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
              style={{ width: `${Math.min(100, ((Date.now() - simulationReemmenagement.debut) / (simulationReemmenagement.fin - simulationReemmenagement.debut)) * 100)}%` }}
            />
          </div>
          <p className={`text-[10px] text-center ${isDark ? "text-white/40" : "text-gray-400"}`}>
            Les employés seront réintégrés dans leur logement d'origine
          </p>
        </div>
      )
    )}
  </div>
)}

=======

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          {/* Actions */}
          <div className="flex gap-2 mt-auto pt-2">
            <button
              onClick={onEdit}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Pencil className="w-4 h-4" />
              Modifier
            </button>
            <button
              onClick={onDelete}
              className={`px-4 py-2.5 rounded-xl transition-all hover:scale-105 ${isDark ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" : "bg-rose-100 text-rose-600 hover:bg-rose-200"}`}
            >
              <UserX className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD


// ─── Service Row 3D ───────────────────────────────────────────────────────────
=======
//Service Row 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function ServiceRow({
  service,
  bg,
  ic,
  dept,
  deptCode,
<<<<<<< HEAD
  onAddEmploye,
  onEditService,
  onDeleteService,
  onDeleteEmploye, // 🔥 Ajouté
  onDesactiverEmploye, // 🔥 Ajouté
  onDetailEmploye,
  onBesoinLogement,
  isDark,
}) {
  const [open, setOpen] = useState(false);
  const [voirDesactives, setVoirDesactives] = useState(false);
  const theme = isDark ? THEMES.dark : THEMES.light;
// LIGNE 925 — remplacer par :
const { reactiverEmploye, attributions , logements, demenagementTemporaire,confirmerReemmenagement} = useApp();

// AJOUTER juste après (ligne 926, avant le return) :
const [simulationReemmenagement, setSimulationReemmenagement] = useState(null);

const lancerSimulationReemmenagement = (dureeSecondes = 10) => {
  const fin = Date.now() + dureeSecondes * 1000;
  setSimulationReemmenagement({ debut: Date.now(), fin });
};

useEffect(() => {
  if (!simulationReemmenagement) return;
  const t = setInterval(() => {
    if (Date.now() >= simulationReemmenagement.fin) {
      setSimulationReemmenagement(null);
      clearInterval(t);
    } else {
      setSimulationReemmenagement(prev => ({ ...prev, _tick: Date.now() }));
    }
  }, 1000);
  return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [simulationReemmenagement?.fin]);

const attMaintenance = attributions?.find(
  (a) => a._serviceId === service.id && a.statut === "Maintenance"
);

// Logement disponible pour déménagement temporaire
const logementDisponible = attMaintenance
  ? logements?.find((l) => l.statut === "Disponible")
  : null;

// Attribution temporaire déjà créée pour ce service
const attTemporaire = attributions?.find(
  (a) => a._serviceId === service.id && a._temporaire === true
);

// Logement en cours de réparation terminée (prêt au réemménagement)
const logementRepare = attMaintenance
  ? logements?.find(
      (l) => l.id === attMaintenance.logement && l.statut === "Maintenance" && l._reparationTerminee
    )
  : null;
  return (
    
=======
  departements,
  onAddEmploye,
  onEditService,
  onDeleteService,
  onDeleteEmploye,
  onDesactiverEmploye,
  onDetailEmploye,
  onBesoinLogement,

  isDark,
}) {
  const [open, setOpen] = useState(false);

  const [voirDesactives, setVoirDesactives] = useState(false);

  const theme = isDark ? THEMES.dark : THEMES.light;

  const { reactiverEmploye, attributions, logements, choisirReemménagement } =
    useApp();

 
  const attMaintenance = attributions?.find(
    (a) =>
      String(a.service_id) === String(service.id) &&
      (a.statut === "Maintenance" ||
        a.statut === "REPARÉ" ||
        a._reparationTerminee === true),
  );

  const attTemporaire = attributions?.find(
    (a) => a._serviceId === service.id && a._temporaire === true,
  );

  const logementOrigine = attMaintenance
    ? logements?.find((l) => l.id === attMaintenance.logement)
    : null;

  const logementRepare = attMaintenance
    ? logements?.find(
        (l) => l.id === attMaintenance.logement && l._reparationTerminee,
      )
    : null;

  return (
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    <div
      className={`border-b last:border-0 animate-in slide-in-from-left-2 duration-300 ${isDark ? "border-white/5" : "border-gray-100"}`}
    >
      <div
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 py-3 pl-8 pr-4 cursor-pointer select-none transition-all ${
          open
            ? isDark
              ? "bg-white/5"
              : "bg-gray-50"
            : isDark
              ? "hover:bg-white/5"
              : "hover:bg-gray-50/70"
        }`}
      >
        <div
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ background: ic, boxShadow: `0 0 8px ${ic}40` }}
        />
        <div className="flex-1 min-w-0">
          <span className={`text-sm font-semibold ${theme.text}`}>
            {service.name}
          </span>
          <span className={`text-xs ml-2 ${theme.textLight}`}>
            Chef : {service.chef}
          </span>
        </div>
<<<<<<< HEAD
  <span
  className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
  style={{ background: bg, color: ic }}
>
  {(() => {
    // 🔥 Compter seulement les employés actifs + les temporairement désactivés
    const actifs = service.employes.filter((e) => !e.desactive).length;
    const temporaires = service.employes.filter((e) => e.desactive && e.typeDesactivation === "temporaire").length;
    const totalCompte = actifs + temporaires;
    return `${totalCompte} emp.`;
  })()}
</span>
{/* Badge statut logement */}
{service.logementAttribue && !attMaintenance ? (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
    isDark 
      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
      : "bg-emerald-100 text-emerald-600 border border-emerald-200"
  }`}>
    🏠 Logé
  </span>
) : attMaintenance ? (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
    isDark 
      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" 
      : "bg-rose-100 text-rose-600 border border-rose-200"
  }`}>
    <Wrench className="w-2.5 h-2.5 animate-spin" />
    Non logé (maintenance)
  </span>
) : service.besoinLogementExprime ? (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
    isDark 
      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
      : "bg-amber-100 text-amber-600 border border-amber-200"
  }`}>
    ⏳ En attente
  </span>
) : (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
    isDark 
      ? "bg-gray-500/20 text-gray-400 border border-gray-500/30" 
      : "bg-gray-100 text-gray-500 border border-gray-200"
  }`}>
    Non logé
  </span>
)}

{/* 🔥 APRÈS la ligne 992 — badge maintenance + simulation réemménagement */}
{attMaintenance && !service.logementAttribue && (
  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
    isDark 
      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
      : "bg-amber-100 text-amber-700 border border-amber-200"
  }`}>
    <Wrench className="w-2.5 h-2.5 animate-spin" />
    En réparation
  </span>
)}

{/* 🔥 Alerte maintenance — juste APRÈS le bloc des badges Logé/Non logé */}
{!service.logementAttribue && !service.besoinLogementExprime && (() => {
  // Chercher si ce service avait un logement en maintenance
  const attMaintenance = attributions?.find(
    (a) => a._serviceId === service.id && a.statut === "Maintenance"
  );
  return attMaintenance ? (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
      isDark 
        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" 
        : "bg-amber-100 text-amber-700 border border-amber-200"
    }`}>
      <Wrench className="w-2.5 h-2.5 animate-spin" />
      Logement en réparation
    </span>
  ) : null;
})()}


=======
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
          style={{ background: bg, color: ic }}
        >
          {(() => {
            const actifs = service.employes.filter((e) => !e.desactive).length;
            const temporaires = service.employes.filter(
              (e) => e.desactive && e.typeDesactivation === "temporaire",
            ).length;
            const totalCompte = actifs + temporaires;
            return `${totalCompte} emp.`;
          })()}
        </span>

        {(() => {
          const logementOrigineAtt = attMaintenance
            ? logements?.find((l) => l.id === attMaintenance.logement)
            : null;
          const reparationTerminee =
            logementOrigineAtt?._reparationTerminee === true;
        
          const aLogementTemp =
            service.logementAttribue &&
            attMaintenance &&
            service.logementAttribue !== attMaintenance.logement;

          if (
            attMaintenance &&
            reparationTerminee &&
            service.logementAttribue &&
            service.logementAttribue !== attMaintenance.logement
          ) {
            return (
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  title={`Réemménager dans ${attMaintenance.logement}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        ` RÉEMMÉNAGEMENT\n\nRetourner dans : ${attMaintenance.logement}\nLibérer : ${service.logementAttribue}\n\nLes occupants seront déplacés vers le logement réparé.\nConfirmer ?`,
                      )
                    ) {
                      choisirReemménagement(
                        attMaintenance.logement,
                        service.logementAttribue,
                        String(service.id),
                        "reemmener",
                      );
                    }
                  }}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all hover:scale-105 ${
                    isDark
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/35"
                      : "bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200"
                  }`}
                >
                  <Home className="w-2.5 h-2.5" />
                  Réemménager
                </button>

                <span className={`text-[10px] ${theme.textLight}`}>ou</span>

                <button
                  title={`Rester dans ${service.logementAttribue}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (
                      window.confirm(
                        ` RESTER DANS LE LOGEMENT ACTUEL\n\nConserver : ${service.logementAttribue}\nLibérer : ${attMaintenance.logement}\n\nL'ancien logement sera remis à disposition.\nConfirmer ?`,
                      )
                    ) {
                      choisirReemménagement(
                        attMaintenance.logement,
                        service.logementAttribue,
                        String(service.id),
                        "rester",
                      );
                    }
                  }}
                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all hover:scale-105 ${
                    isDark
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/35"
                      : "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                  }`}
                >
                  <Check className="w-2.5 h-2.5" />
                  Rester
                </button>
              </div>
            );
          }

          /* 3 Logé normalement (y compris temporaire) */
          if (service.logementAttribue) {
            const estTemporaire = aLogementTemp;
            return (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  estTemporaire
                    ? isDark
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-blue-100 text-blue-600 border border-blue-200"
                    : isDark
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-emerald-100 text-emerald-600 border border-emerald-200"
                }`}
              >
                {estTemporaire ? "🏠 Logé (temp.)" : "🏠 Logé"}
              </span>
            );
          }

          /* 4 En maintenance / réparation */
          if (attMaintenance) {
            if (logementOrigineAtt?.statut === "EN_REPARATION") {
              return (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    isDark
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-blue-100 text-blue-600 border border-blue-200"
                  }`}
                >
                  <Wrench className="w-2.5 h-2.5 animate-spin" />
                  En réparation
                </span>
              );
            }
            return (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                  isDark
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    : "bg-rose-100 text-rose-600 border border-rose-200"
                }`}
              >
                <Wrench className="w-2.5 h-2.5 animate-spin" />
                Non logé (maintenance)
              </span>
            );
          }

          /*  5 Besoin exprimé */
          if (service.besoinLogementExprime) {
            return (
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-amber-100 text-amber-600 border border-amber-200"
                }`}
              >
                ⏳ En attente
              </span>
            );
          }

          /* 6️⃣ Non logé */
          return (
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDark
                  ? "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              Non logé
            </span>
          );
        })()}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

        <div
          className="flex gap-1.5 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            title="Ajouter un employé"
            onClick={() => onAddEmploye(deptCode, service.id)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
          >
            <Plus size={13} strokeWidth={2.5} />
          </button>
<<<<<<< HEAD
<button
  title={
    service.logementAttribue
      ? "✓ Ce service dispose déjà d'un logement"
      : service.besoinLogementExprime
        ? "⏳ Demande de logement déjà envoyée"
        : "Exprimer un besoin de logement"
  }
  onClick={() => {
    // 🔥 Bloquer si déjà logé OU si besoin déjà exprimé
    if (!service.logementAttribue && !service.besoinLogementExprime) {
      onBesoinLogement(deptCode, service);
    }
  }}
  disabled={!!service.logementAttribue || !!service.besoinLogementExprime}
  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
    service.logementAttribue
      ? isDark
        ? "bg-emerald-500/30 text-emerald-300 cursor-not-allowed opacity-80"
        : "bg-emerald-100 text-emerald-600 cursor-not-allowed opacity-80"
      : service.besoinLogementExprime
        ? isDark
          ? "bg-amber-500/20 text-amber-300 cursor-not-allowed opacity-60"
          : "bg-amber-100 text-amber-500 cursor-not-allowed opacity-60"
        : isDark
          ? "bg-amber-500/30 text-amber-300 hover:scale-110"
          : "bg-amber-100 text-amber-600 hover:scale-110"
  }`}
>
  <Home size={13} strokeWidth={2} />
</button>

=======
          <button
            title={
              service.logementAttribue
                ? "✓ Ce service dispose déjà d'un logement"
                : service.besoinLogementExprime
                  ? "⏳ Demande de logement déjà envoyée"
                  : "Exprimer un besoin de logement"
            }
            onClick={() => {
              if (!service.logementAttribue && !service.besoinLogementExprime) {
                onBesoinLogement(deptCode, service);
              }
            }}
            disabled={
              !!service.logementAttribue || !!service.besoinLogementExprime
            }
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              service.logementAttribue
                ? isDark
                  ? "bg-emerald-500/30 text-emerald-300 cursor-not-allowed opacity-80"
                  : "bg-emerald-100 text-emerald-600 cursor-not-allowed opacity-80"
                : service.besoinLogementExprime
                  ? isDark
                    ? "bg-amber-500/20 text-amber-300 cursor-not-allowed opacity-60"
                    : "bg-amber-100 text-amber-500 cursor-not-allowed opacity-60"
                  : isDark
                    ? "bg-amber-500/30 text-amber-300 hover:scale-110"
                    : "bg-amber-100 text-amber-600 hover:scale-110"
            }`}
          >
            <Home size={13} strokeWidth={2} />
          </button>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

          <button
            title="Modifier"
            onClick={() => onEditService(deptCode, service)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
          >
            <Pencil size={12} strokeWidth={2} />
          </button>
          <button
            title="Supprimer le service"
            onClick={() => onDeleteService(deptCode, service.id)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" : "bg-rose-100 text-rose-600 hover:bg-rose-200"}`}
          >
            <Trash2 size={12} strokeWidth={2} />
          </button>
        </div>
        <div
          className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={14} className={theme.textLight} />
        </div>
      </div>

<<<<<<< HEAD
{open && (
=======
      {open && (
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
        <div
          className={`border-t animate-in slide-in-from-top-2 duration-300 ${isDark ? "border-white/5" : "border-gray-100"}`}
        >
          {service.employes.length === 0 ? (
            <p className={`text-xs pl-10 py-3 italic ${theme.textLight}`}>
              Aucun employé dans ce service.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className={isDark ? "bg-white/5" : "bg-[#0F2D56]/5"}>
                    {[
                      "Employé",
                      "Matricule",
                      "Catégorie",
                      "Ancienneté",
                      "Situation",
                      "",
                    ].map((h) => (
                      <th
                        key={h}
                        className={`text-left py-2.5 text-xs font-semibold uppercase tracking-wide ${h === "Employé" ? "pl-10 pr-3" : "px-3"} ${theme.textLight}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {service.employes
                    .filter((emp) => !emp.desactive)
                    .map((emp, i) => (
                      <tr
                        key={emp.id}
                        className={`border-t transition-all cursor-pointer group ${isDark ? "border-white/5 hover:bg-white/5" : "border-gray-200/50 hover:bg-[#0F2D56]/5"}`}
<<<<<<< HEAD
                        onClick={(e) => { e.stopPropagation(); onDetailEmploye(dept, service, emp); }}
=======
                        onClick={(e) => {
                          e.stopPropagation();
                          onDetailEmploye(dept, service, emp);
                        }}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <td className="pl-10 pr-3 py-2.5">
                          <div className="flex items-center gap-2">
<<<<<<< HEAD
                            <Avatar prenom={emp.prenom} nom={emp.nom} size="sm" />
                            <span className={`font-semibold text-xs group-hover:text-[#C9A84C] transition-colors ${isDark ? "text-white" : "text-[#0F2D56]"}`}>
=======
                            <Avatar
                              prenom={emp.prenom}
                              nom={emp.nom}
                              size="sm"
                            />
                            <span
                              className={`font-semibold text-xs group-hover:text-[#C9A84C] transition-colors ${isDark ? "text-white" : "text-[#0F2D56]"}`}
                            >
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                              {emp.prenom} {emp.nom}
                            </span>
                          </div>
                        </td>
<<<<<<< HEAD
                        <td className={`px-3 py-2.5 font-mono text-xs ${theme.textLight}`}>{emp.matricule}</td>
                        <td className="px-3 py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${catBadge(emp.categorie, isDark)}`}>
                            {emp.categorie}
                          </span>
                        </td>
                        <td className={`px-3 py-2.5 text-xs ${theme.textSubtle}`}>{emp.anciennete} ans</td>
                        <td className={`px-3 py-2.5 text-xs ${theme.textSubtle}`}>{emp.situation}</td>
=======
                        <td
                          className={`px-3 py-2.5 font-mono text-xs ${theme.textLight}`}
                        >
                          {emp.matricule}
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${catBadge(emp.categorie, isDark)}`}
                          >
                            {emp.categorie}
                          </span>
                        </td>
                        <td
                          className={`px-3 py-2.5 text-xs ${theme.textSubtle}`}
                        >
                          {emp.anciennete} ans
                        </td>
                        <td
                          className={`px-3 py-2.5 text-xs ${theme.textSubtle}`}
                        >
                          {emp.situation}
                        </td>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                        <td className="px-3 py-2.5">
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              title="Voir détails"
<<<<<<< HEAD
                              onClick={(e) => { e.stopPropagation(); onDetailEmploye(dept, service, emp); }}
=======
                              onClick={(e) => {
                                e.stopPropagation();
                                onDetailEmploye(dept, service, emp);
                              }}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-[#0F2D56]/10 text-[#0F2D56] hover:bg-[#0F2D56] hover:text-white"}`}
                            >
                              <Eye size={12} strokeWidth={2} />
                            </button>
                            <button
                              title="Désactiver"
                              onClick={(e) => {
                                e.stopPropagation();
<<<<<<< HEAD
                                console.log("CLICK DÉSACTIVER:", { deptCode, serviceId: service.id, emp });
=======
                                console.log("CLICK DÉSACTIVER:", {
                                  deptCode,
                                  serviceId: service.id,
                                  emp,
                                });
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                                onDesactiverEmploye(deptCode, service.id, emp);
                              }}
                              className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" : "bg-red-50 text-red-500 hover:bg-red-100"}`}
                            >
                              <UserX size={12} strokeWidth={2} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
                {service.employes.some((e) => e.desactive) && (
                  <div className="mt-2">
                    <button
                      onClick={() => setVoirDesactives(!voirDesactives)}
                      className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${isDark ? "text-white/40 hover:text-white/60 hover:bg-white/5" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                    >
                      {voirDesactives ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      {service.employes.filter((e) => e.desactive).length}{" "}
                      employé(s) désactivé(s)
                    </button>
                    {voirDesactives && (
                      <div className={`mt-2 p-3 rounded-xl border ${isDark ? "bg-rose-500/5 border-rose-500/10" : "bg-rose-50 border-rose-100"}`}>
                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? "text-rose-300/60" : "text-rose-600"}`}>
                          Comptes inactifs
                        </p>
                        {service.employes
                          .filter((e) => e.desactive)
                          .map((emp) => {
                            const estDefinitif = emp.typeDesactivation === "definitif" || emp.reactivationPossible === false;
                            return (
                              <div key={emp.id} className={`flex items-center gap-2 py-2 opacity-50 ${isDark ? "border-b border-white/5" : "border-b border-gray-100"}`}>
                                <Avatar prenom={emp.prenom} nom={emp.nom} size="sm" />
                                <div className="flex-1">
                                  <p className={`text-xs ${theme.textMuted}`}>{emp.prenom} {emp.nom}</p>
                                  <p className={`text-[10px] ${theme.textLight}`}>
                                    {emp.motifDesactivation} — {emp.dateDesactivation}
                                    {emp.typeDesactivation && (
                                      <span className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${estDefinitif ? (isDark ? "bg-rose-500/30 text-rose-300" : "bg-rose-100 text-rose-600") : (isDark ? "bg-amber-500/30 text-amber-300" : "bg-amber-100 text-amber-600")}`}>
                                        {emp.typeDesactivation === "definitif" ? "DÉFINITIF" : "TEMPORAIRE"}
                                      </span>
                                    )}
                                  </p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${estDefinitif ? "bg-rose-500/20 text-rose-400" : "bg-gray-500/20 text-gray-400"}`}>
                                    {estDefinitif ? "Inactif (déf.)" : "Inactif"}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (estDefinitif) {
                                        alert(`❌ Réactivation impossible.\n\n${emp.prenom} ${emp.nom} a été désactivé définitivement (${emp.motifDesactivation}).`);
                                        return;
                                      }
                                      reactiverEmploye(deptCode, service.id, emp.id);
                                    }}
                                    disabled={estDefinitif}
                                    title={estDefinitif ? `Désactivation définitive — ${emp.motifDesactivation}` : "Réactiver l'employé"}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${estDefinitif ? (isDark ? "bg-gray-700/50 text-gray-600 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed") : (isDark ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200")}`}
                                  >
                                    <UserPlus size={12} strokeWidth={2} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
              </table>

              {service.employes.some((e) => e.desactive) && (
                <div className="mt-2">
                  <button
                    onClick={() => setVoirDesactives(!voirDesactives)}
                    className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${isDark ? "text-white/40 hover:text-white/60 hover:bg-white/5" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
                  >
                    {voirDesactives ? (
                      <ChevronUp size={12} />
                    ) : (
                      <ChevronDown size={12} />
                    )}
                    {service.employes.filter((e) => e.desactive).length}{" "}
                    employé(s) désactivé(s)
                  </button>
                  {voirDesactives && (
                    <div
                      className={`mt-2 p-3 rounded-xl border ${isDark ? "bg-rose-500/5 border-rose-500/10" : "bg-rose-50 border-rose-100"}`}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDark ? "text-rose-300/60" : "text-rose-600"}`}
                      >
                        Comptes inactifs
                      </p>
                      {service.employes
                        .filter((e) => e.desactive)
                        .map((emp) => {
                          const estDefinitif =
                            emp.typeDesactivation === "definitif" ||
                            emp.reactivationPossible === false;
                          return (
                            <div
                              key={emp.id}
                              className={`flex items-center gap-2 py-2 opacity-50 ${isDark ? "border-b border-white/5" : "border-b border-gray-100"}`}
                            >
                              <Avatar
                                prenom={emp.prenom}
                                nom={emp.nom}
                                size="sm"
                              />
                              <div className="flex-1">
                                <p className={`text-xs ${theme.textMuted}`}>
                                  {emp.prenom} {emp.nom}
                                </p>
                                <p className={`text-[10px] ${theme.textLight}`}>
                                  {emp.motifDesactivation} —{" "}
                                  {emp.dateDesactivation}
                                  {emp.typeDesactivation && (
                                    <span
                                      className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${estDefinitif ? (isDark ? "bg-rose-500/30 text-rose-300" : "bg-rose-100 text-rose-600") : isDark ? "bg-amber-500/30 text-amber-300" : "bg-amber-100 text-amber-600"}`}
                                    >
                                      {emp.typeDesactivation === "definitif"
                                        ? "DÉFINITIF"
                                        : "TEMPORAIRE"}
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full ${estDefinitif ? "bg-rose-500/20 text-rose-400" : "bg-gray-500/20 text-gray-400"}`}
                                >
                                  {estDefinitif ? "Inactif (déf.)" : "Inactif"}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (estDefinitif) {
                                      alert(
                                        `❌ Réactivation impossible.\n\n${emp.prenom} ${emp.nom} a été désactivé définitivement (${emp.motifDesactivation}).`,
                                      );
                                      return;
                                    }
                                    const dep = departements?.find(
                                      (d) => d.code === deptCode,
                                    );
                                    reactiverEmploye(
                                      dep?.id,
                                      service.id,
                                      emp.id,
                                    );
                                  }}
                                  disabled={estDefinitif}
                                  title={
                                    estDefinitif
                                      ? `Désactivation définitive — ${emp.motifDesactivation}`
                                      : "Réactiver l'employé"
                                  }
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${estDefinitif ? (isDark ? "bg-gray-700/50 text-gray-600 cursor-not-allowed" : "bg-gray-200 text-gray-400 cursor-not-allowed") : isDark ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`}
                                >
                                  <UserPlus size={12} strokeWidth={2} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {attMaintenance && (
            <div
              className={`px-10 py-3 border-t ${isDark ? "border-white/5" : "border-gray-100"}`}
            >
              {/* ── CAS 1 : Service a déjà un autre logement (déménagement temporaire fait) ── */}
              {service.logementAttribue &&
              service.logementAttribue !== attMaintenance.logement ? (
                <>
                  {logementRepare ? (
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark
                          ? "bg-gradient-to-r from-emerald-500/15 to-blue-500/10 border-emerald-500/30"
                          : "bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isDark
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          <Home className="w-4 h-4" />
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
                          >
                            Logement {attMaintenance.logement} réparé
                          </p>
                          <p className={`text-[10px] ${theme.textLight}`}>
                            Votre service est actuellement dans{" "}
                            {service.logementAttribue}.
                            <span className="font-semibold text-[#C9A84C]">
                              {" "}
                              Utilisez les boutons dans la ligne du service pour
                              choisir.
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Logement d'origine PAS encore réparé */
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark
                          ? "bg-blue-500/10 border-blue-500/20"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-semibold ${isDark ? "text-blue-300" : "text-blue-700"}`}
                      >
                        <Home className="w-3.5 h-3.5 inline mr-1" />
                        Service temporairement dans {service.logementAttribue}
                      </p>
                      <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                        En attente de réparation de {attMaintenance.logement}...
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* ── CAS 2 : Pas encore de déménagement temporaire ── */
                <>
                  {!attTemporaire && !logementRepare && (
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark
                          ? "bg-amber-500/10 border-amber-500/20"
                          : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-semibold ${isDark ? "text-amber-300" : "text-amber-700"}`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5 inline mr-1" />
                        Logement en maintenance
                      </p>
                      <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                        Ce service nécessite un logement de type{" "}
                        <strong
                          className={
                            isDark ? "text-amber-300" : "text-amber-700"
                          }
                        >
                          {logementOrigine?.type || "F2"}
                        </strong>{" "}
                        (même genre que le logement actuellement en
                        maintenance).
                      </p>
                    </div>
                  )}
                  {/* ── CAS 3 : Déménagement temporaire fait, en attente réparation ── */}
                  {attTemporaire && !logementRepare && (
                    <div
                      className={`p-3 rounded-xl border ${
                        isDark
                          ? "bg-blue-500/10 border-blue-500/20"
                          : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <p
                        className={`text-xs font-semibold ${isDark ? "text-blue-300" : "text-blue-700"}`}
                      >
                        <Home className="w-3.5 h-3.5 inline mr-1" />
                        Service temporairement dans {attTemporaire.logement}
                      </p>
                      <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                        En attente de réparation de {attMaintenance.logement}...
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}


{attMaintenance && (
  <div className={`px-10 py-3 border-t ${isDark ? "border-white/5" : "border-gray-100"}`}>

    {/* Pas encore de déménagement temporaire → proposer */}
    {!attTemporaire && !logementRepare && (
      !simulationReemmenagement ? (
        <div className="space-y-2">
          <p className={`text-xs ${isDark ? "text-amber-300" : "text-amber-700"}`}>
            ⚠️ Ce service est sans logement (en maintenance).
            {logementDisponible
              ? ` Logement disponible : ${logementDisponible.id}`
              : " Aucun logement disponible actuellement."}
          </p>
          {logementDisponible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                lancerSimulationReemmenagement(10);
              }}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition hover:scale-[1.02] bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-lg"
            >
              <Home className="w-3.5 h-3.5" />
              Déménagement temporaire → {logementDisponible.id}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className={isDark ? "text-white/60" : "text-gray-500"}>
              Déménagement en cours...
            </span>
            <span className={`font-bold ${isDark ? "text-amber-400" : "text-amber-600"}`}>
              {Math.max(0, Math.ceil((simulationReemmenagement.fin - Date.now()) / 1000))}s restantes
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000"
              style={{
                width: `${Math.min(100, ((Date.now() - simulationReemmenagement.debut) / (simulationReemmenagement.fin - simulationReemmenagement.debut)) * 100)}%`
              }}
            />
          </div>
          {simulationReemmenagement && Date.now() >= simulationReemmenagement.fin && logementDisponible && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                demenagementTemporaire(
                  attMaintenance.logement,
                  logementDisponible.id,
                  attMaintenance._occupantsAvant || attMaintenance.occupants || []
                );
                setSimulationReemmenagement(null);
              }}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition"
            >
              <Home className="w-3.5 h-3.5" />
              Confirmer le déménagement temporaire
            </button>
          )}
        </div>
      )
    )}

    {/* Déménagement temporaire effectué + logement réparé → proposer réemménagement */}
    {attTemporaire && logementRepare && (
      !simulationReemmenagement ? (
        <div className="space-y-2">
          <p className={`text-xs font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}>
            ✅ Logement {attMaintenance.logement} réparé — réemménagement possible
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              lancerSimulationReemmenagement(10);
            }}
            className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition hover:scale-[1.02] bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white hover:shadow-lg"
          >
            <Home className="w-3.5 h-3.5" />
            Simuler le réemménagement initial
          </button>
        </div>
      ) : (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className={isDark ? "text-white/60" : "text-gray-500"}>
              Réemménagement en cours...
            </span>
            <span className={`font-bold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
              {Math.max(0, Math.ceil((simulationReemmenagement.fin - Date.now()) / 1000))}s restantes
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
              style={{
                width: `${Math.min(100, ((Date.now() - simulationReemmenagement.debut) / (simulationReemmenagement.fin - simulationReemmenagement.debut)) * 100)}%`
              }}
            />
          </div>
          {simulationReemmenagement && Date.now() >= simulationReemmenagement.fin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // terminerReparation remet le logement à Occupé avec les occupants initiaux
                confirmerReemmenagement(attMaintenance.logement);
                setSimulationReemmenagement(null);
              }}
              className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg transition"
            >
              <Home className="w-3.5 h-3.5" />
              Confirmer le réemménagement
            </button>
          )}
          <p className={`text-[10px] text-center ${isDark ? "text-white/40" : "text-gray-400"}`}>
            Les employés seront réintégrés dans leur logement d'origine
          </p>
        </div>
      )
    )}

  </div>
)}
        </div>
      )}
    </div>
  );
}

<<<<<<< HEAD
// ─── Department Card 3D ───────────────────────────────────────────────────────
=======
//Department Card 3D 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
function DepartmentCard({
  dept,
  isDark,
  onAddService,
  onEditService,
  onDeleteService,
  onAddEmploye,
<<<<<<< HEAD
  onDeleteEmploye, // 🔥 Ajouté
  onDesactiverEmploye, // 🔥 Ajouté
=======
  onDeleteEmploye,
  onDesactiverEmploye,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  onDetailEmploye,
  onBesoinLogement,
  onDeleteDept,
  index = 0,
<<<<<<< HEAD
=======
  departements,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
}) {
  const [open, setOpen] = useState(false);
  const { Icon } = ICON_OPTIONS[dept.iconIdx] || ICON_OPTIONS[0];
  const teinte = COLOR_TEINTES[dept.colorIdx] || COLOR_TEINTES[0];
  const bg = isDark ? teinte.bgDark : teinte.bgLight;
  const ic = isDark ? teinte.iconDark : teinte.iconLight;
<<<<<<< HEAD
const totalEmps = dept.services.reduce((a, s) => {
  // 🔥 Compter seulement actifs + temporairement désactivés (pas les définitifs)
  const actifs = (s.employes || []).filter((e) => !e.desactive).length;
  const temporaires = (s.employes || []).filter((e) => e.desactive && e.typeDesactivation === "temporaire").length;
  return a + actifs + temporaires;
}, 0);
=======
  const totalEmps = dept.services.reduce((a, s) => {
    const actifs = (s.employes || []).filter((e) => !e.desactive).length;
    const temporaires = (s.employes || []).filter(
      (e) => e.desactive && e.typeDesactivation === "temporaire",
    ).length;
    return a + actifs + temporaires;
  }, 0);
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const { style } = useReveal(index * 80);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div style={style} className="group relative">
      {/* Ombre 3D */}
      <div
        className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 group-hover:translate-y-4 group-hover:blur-xl`}
        style={{ background: `${ic}15` }}
      />

      <div
        className={`relative backdrop-blur-xl border rounded-2xl overflow-hidden transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ${open ? (isDark ? "ring-1 ring-white/20" : "ring-2 ring-[#0F2D56]/20") : ""} ${isDark ? "bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-white/10" : "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-lg"}`}
      >
        <div
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center gap-4 px-5 py-4 cursor-pointer select-none transition-all ${
            open
              ? isDark
                ? "bg-white/5"
                : "bg-white/60"
              : isDark
                ? "hover:bg-white/5"
                : "hover:bg-white/40"
          }`}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-lg"
            style={{ background: bg, boxShadow: `0 4px 15px ${ic}30` }}
          >
            <Icon size={24} color={ic} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-black text-base group-hover:text-[#C9A84C] transition-colors ${isDark ? "text-white" : "text-[#0F2D56]"}`}
              >
                {dept.name}
              </span>
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                style={{ background: bg, color: ic }}
              >
                {dept.services.length} services · {totalEmps} emp.
              </span>
            </div>
            <p className={`text-xs mt-0.5 truncate ${theme.textLight}`}>
              {dept.fullName}
            </p>
          </div>
          <div
            className="flex items-center gap-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              title="Ajouter un service"
<<<<<<< HEAD
              onClick={() => onAddService(dept.code || dept.id)}
=======
              onClick={() => onAddService(dept.code)}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 ${isDark ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
            >
              <Plus size={15} strokeWidth={2.5} />
            </button>
            <button
              title="Supprimer le département"
              onClick={() => onDeleteDept(dept.code)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${isDark ? "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30" : "bg-red-50 text-red-500 hover:bg-red-100"}`}
            >
              <Trash2 size={13} strokeWidth={2} />
            </button>
          </div>
          <div
            className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown size={15} className={theme.textLight} />
          </div>
        </div>

        {open && (
          <div
            className={`border-t animate-in slide-in-from-top-4 duration-300 ${isDark ? "border-white/10" : "border-gray-200"}`}
          >
            <div className="flex items-center gap-2 px-5 py-2.5">
              <Layers size={11} className={theme.textLight} />
              <span
                className={`text-xs font-bold uppercase tracking-widest ${theme.textLight}`}
              >
                Services rattachés
              </span>
            </div>
            {dept.services.length === 0 ? (
              <p className={`text-xs px-8 pb-4 italic ${theme.textLight}`}>
                Aucun service. Cliquez sur + pour en ajouter un.
              </p>
            ) : (
              dept.services.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  bg={bg}
                  ic={ic}
<<<<<<< HEAD
                  dept={dept} 
=======
                  dept={dept}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  deptCode={dept.code}
                  onAddEmploye={onAddEmploye}
                  onEditService={onEditService}
                  onDeleteService={onDeleteService}
                  onDeleteEmploye={onDeleteEmploye}
<<<<<<< HEAD
                  onDesactiverEmploye={onDesactiverEmploye} // 🔥 AJOUTÉ
                  onDetailEmploye={onDetailEmploye}
                  onBesoinLogement={onBesoinLogement}
=======
                  onDesactiverEmploye={onDesactiverEmploye}
                  onDetailEmploye={onDetailEmploye}
                  onBesoinLogement={onBesoinLogement}
                  departements={departements}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  isDark={isDark}
                />
              ))
            )}
          </div>
        )}

        {/* Overlay brillance au survol */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

<<<<<<< HEAD
// ─── Main ─────────────────────────────────────────────────────────────────────
// ─── Main ─────────────────────────────────────────────────────────────────────
=======
// Main 
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
export default function DepartementsSPAT() {
  const isDark = useDarkMode();
  const theme = isDark ? THEMES.dark : THEMES.light;

<<<<<<< HEAD
const {
=======
  const {
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    departements: contextDepts,
    setDepartements: setDepartments,
    creerAlerteBesoin,
    attributions,
    getCapaciteLogement,
    logements,
<<<<<<< HEAD
    historiqueRH,       
    desactiverEmploye, 
    ajouterHistorique,       
    synchroniserOccupantsAttribution,  
    ajouterDepartement,   
    modifierDepartement,    // si besoin
    supprimerDepartement, 
    ajouterService,      
    modifierService,        // 🔥 ajouter
    supprimerService,     
    ajouterEmployeService,
    modifierEmploye,          
    supprimerEmployeService,
} = useApp();

// 🔥 Normaliser les départements : le contexte utilise "nom" mais le reste du code attend "name"
const departments = contextDepts.map(d => ({
  ...d,
  name: d.name || d.nom,   // compatibilité : contexte = nom, local = name
  code: d.code || d.id,
}));
=======
    historiqueRH,
    desactiverEmploye,
    synchroniserOccupantsAttribution,
    ajouterDepartement,
    supprimerDepartement,
    ajouterService,
    modifierService,
    supprimerService,
    ajouterEmployeService,
    modifierEmploye,
  } = useApp();

  // Normaliser les départements : le contexte utilise "nom" mais le reste du code attend "name"
  const departments = contextDepts.map((d) => ({
    ...d,
    name: d.name || d.nom,
    code: d.code || d.id,
  }));
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [viewMode, setViewMode] = useState("departments");

  const [deptForm, setDeptForm] = useState({
    code: "",
    name: "",
    fullName: "",
    iconIdx: 0,
    colorIdx: 0,
  });
  const [serviceForm, setServiceForm] = useState({ name: "", chef: "" });
  const [serviceTarget, setServiceTarget] = useState(null);
<<<<<<< HEAD
const [empTarget, setEmpTarget] = useState(null);
const [empForm, setEmpForm] = useState({
  prenom: "",
  nom: "",
  categorie: CATEGORIES[3],
  anciennete: 0,
  situation: SITUATIONS[0],
  nb_enfants: 0,
  email: "",
  telephone: "",
  adresse: "",
  salaire: 0,
});
  const [desactiverModal, setDesactiverModal] = useState(null); // { employe, deptCode, serviceId }
const [motifDesactivation, setMotifDesactivation] = useState(null); // { label, type } ou null
const [typeMotifActif, setTypeMotifActif] = useState("definitif"); // "definitif" | "temporaire"  
  const [detailData, setDetailData] = useState(null);

  const [besoinModal, setBesoinModal] = useState(null); // { deptCode, serviceId, serviceName, deptName }
  const [typeLogementRequis, setTypeLogementRequis] = useState("F2");
  const [serviceLoge, setServiceLoge] = useState(false); 
const [showHistorique, setShowHistorique] = useState(false);
const [filtreHistorique, setFiltreHistorique] = useState("tous");
  const closeModal = () => setModal(null);

const totalEmps = departments.reduce((a, d) => {
  return a + (d.services || []).reduce((b, s) => {
    const actifs = (s.employes || []).filter((e) => !e.desactive).length;
    const temporaires = (s.employes || []).filter((e) => e.desactive && e.typeDesactivation === "temporaire").length;
    return b + actifs + temporaires;
  }, 0);
}, 0);
  const totalServices = departments.reduce((a, d) => a + d.services.length, 0);
const eligibleCount = departments.reduce((a, d) => {
  return a + (d.services || []).reduce((b, s) => {
    // 🔥 Ne compter que les actifs + temporaires pour l'éligibilité
    const eligibles = (s.employes || []).filter((e) => {
      if (e.desactive && e.typeDesactivation === "definitif") return false;
      return e.anciennete >= 2;
    }).length;
    return b + eligibles;
  }, 0);
}, 0);
const avgAnciennete =
  totalEmps > 0
    ? Math.round(
        departments.reduce((a, d) => {
          return a + (d.services || []).reduce((b, s) => {
            const ancienneteTotale = (s.employes || []).reduce((c, e) => {
              // 🔥 Exclure les définitivement désactivés du calcul
              if (e.desactive && e.typeDesactivation === "definitif") return c;
              return c + (e.anciennete || 0);
            }, 0);
            return b + ancienneteTotale;
          }, 0);
        }, 0) / totalEmps,
      )
    : 0;

const repartitionCategories = CATEGORIES.map((cat) => ({
  categorie: cat,
  count: departments.reduce((a, d) => {
    return a + (d.services || []).reduce((b, s) => {
      const countCat = (s.employes || []).filter((e) => {
        if (e.desactive && e.typeDesactivation === "definitif") return false;
        return e.categorie === cat;
      }).length;
      return b + countCat;
    }, 0);
  }, 0),
}));
=======
  const [empTarget, setEmpTarget] = useState(null);
  const [empForm, setEmpForm] = useState({
    prenom: "",
    nom: "",
    categorie: CATEGORIES[3],
    anciennete: 0,
    situation: SITUATIONS[0],
    nb_enfants: 0,
    email: "",
    telephone: "",
    adresse: "",
    salaire: 400000,
  });
  const [desactiverModal, setDesactiverModal] = useState(null);
  const [motifDesactivation, setMotifDesactivation] = useState(null);
  const [typeMotifActif, setTypeMotifActif] = useState("definitif");
  const [detailData, setDetailData] = useState(null);

  const [besoinModal, setBesoinModal] = useState(null);
  const [typeLogementRequis, setTypeLogementRequis] = useState("F2");
  const [serviceLoge, setServiceLoge] = useState(false);
  const [showHistorique, setShowHistorique] = useState(false);
  const [filtreHistorique, setFiltreHistorique] = useState("tous");
  const [menuHistoriqueOuvert, setMenuHistoriqueOuvert] = useState(false);
  const closeModal = () => setModal(null);

  const totalEmps = departments.reduce((a, d) => {
    return (
      a +
      (d.services || []).reduce((b, s) => {
        const actifs = (s.employes || []).filter((e) => !e.desactive).length;
        const temporaires = (s.employes || []).filter(
          (e) => e.desactive && e.typeDesactivation === "temporaire",
        ).length;
        return b + actifs + temporaires;
      }, 0)
    );
  }, 0);
  const totalServices = departments.reduce((a, d) => a + d.services.length, 0);
  const eligibleCount = departments.reduce((a, d) => {
    return (
      a +
      (d.services || []).reduce((b, s) => {
        const eligibles = (s.employes || []).filter((e) => {
          if (e.desactive && e.typeDesactivation === "definitif") return false;
          return e.anciennete >= 2;
        }).length;
        return b + eligibles;
      }, 0)
    );
  }, 0);
  const avgAnciennete =
    totalEmps > 0
      ? Math.round(
          departments.reduce((a, d) => {
            return (
              a +
              (d.services || []).reduce((b, s) => {
                const ancienneteTotale = (s.employes || []).reduce((c, e) => {
                  if (e.desactive && e.typeDesactivation === "definitif")
                    return c;
                  return c + (e.anciennete || 0);
                }, 0);
                return b + ancienneteTotale;
              }, 0)
            );
          }, 0) / totalEmps,
        )
      : 0;

  const repartitionCategories = CATEGORIES.map((cat) => ({
    categorie: cat,
    count: departments.reduce((a, d) => {
      return (
        a +
        (d.services || []).reduce((b, s) => {
          const countCat = (s.employes || []).filter((e) => {
            if (e.desactive && e.typeDesactivation === "definitif")
              return false;
            return e.categorie === cat;
          }).length;
          return b + countCat;
        }, 0)
      );
    }, 0),
  }));
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

  // Dept
  const openAddDept = () => {
    setDeptForm({ code: "", name: "", fullName: "", iconIdx: 0, colorIdx: 0 });
    setModal("add-dept");
<<<<<<< HEAD
  };


const confirmAddDept = async () => {
  if (!deptForm.code.trim() || !deptForm.name.trim()) return;

  const newDept = await ajouterDepartement({
    nom:      deptForm.name.trim(),
    code:     deptForm.code.trim(),
    fullName: deptForm.fullName.trim() || deptForm.name.trim(),
  });

  if (newDept) {
    // Ajouter iconIdx et colorIdx localement après retour Django
    setDepartments(prev => prev.map(d =>
      d.id === newDept.id
        ? { ...d, iconIdx: deptForm.iconIdx, colorIdx: deptForm.colorIdx, name: d.nom, code: d.code }
        : d
    ));
  }

  closeModal();
};
const deleteDept = async (code) => {
  if (!window.confirm("Supprimer ce département et tous ses services ?")) return;
  const dept = departments.find((d) => d.code === code);
  if (!dept?.id) return;
  await supprimerDepartement(dept.id); // l'historique est géré dans le contexte
};
  

  // Service
const openAddService = (deptCode) => {
  setServiceForm({ name: "", chef: "" });
  
  // ✅ Chercher par code OU par id
  const dept = departments.find(
    (d) => String(d.code) === String(deptCode) || 
           String(d.id)   === String(deptCode)
  );
  
  console.log("dept trouvé:", dept);  // ← vérifier que dept.id est un nombre
  
  setServiceTarget({ deptCode, deptId: dept?.id });
  setModal("add-service");
};
const confirmAddService = async () => {
  if (!serviceForm.name.trim()) return;
  
  // ✅ Chercher l'id directement dans contextDepts (pas departments)
  // car departments est une copie normalisée qui peut être décalée
  const deptId = serviceTarget.deptId;
  
  console.log("=== confirmAddService ===");
  console.log("serviceTarget:", serviceTarget);
  console.log("deptId:", deptId, typeof deptId);
  
  if (!deptId) {
    alert("❌ Ce département n'existe pas encore en base. Sauvegardez-le d'abord.");
    return;
  }
  
  // ✅ S'assurer que deptId est un nombre
  const deptIdNum = Number(deptId);
  if (isNaN(deptIdNum)) {
    alert(`❌ ID département invalide : ${deptId}`);
    return;
  }
  
  await ajouterService(deptIdNum, {
    name: serviceForm.name.trim(),
    chef: serviceForm.chef.trim() || "À définir",
  });
  closeModal();
};
=======
  };
  const confirmAddDept = async () => {
    if (!deptForm.code.trim() || !deptForm.name.trim()) return;
    try {
      await ajouterDepartement({
        nom: deptForm.name.trim(),
        code: deptForm.code.trim(),
        full_name: deptForm.fullName.trim() || deptForm.name.trim(),
        icone: ICON_OPTIONS[deptForm.iconIdx]?.label || "BarChart2",
        couleur: COLOR_TEINTES[deptForm.colorIdx]?.label || "Bleu",
      });
      closeModal();
    } catch (err) {
      console.error("Erreur ajout département", err);
    }
  };
  const deleteDept = async (code) => {
    if (window.confirm("Supprimer ce département et tous ses services ?")) {
      const dep = departments.find((d) => d.code === code);
      if (dep) await supprimerDepartement(dep.id);
    }
  };
  // Service
  const openAddService = (deptCode) => {
    setServiceForm({ name: "", chef: "" });
    setServiceTarget({ deptCode });
    setModal("add-service");
  };
  const confirmAddService = async () => {
    if (!serviceForm.name.trim()) return;
    const dep = departments.find((d) => d.code === serviceTarget.deptCode);
    if (!dep) return;
    try {
      await ajouterService(dep.id, {
        name: serviceForm.name.trim(),
        chef: serviceForm.chef.trim() || "À définir",
      });
      closeModal();
    } catch (err) {
      console.error("Erreur ajout service", err);
    }
  };
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  const openEditService = (deptCode, service) => {
    setServiceForm({ name: service.name, chef: service.chef });
    setServiceTarget({ deptCode, serviceId: service.id });
    setModal("edit-service");
<<<<<<< HEAD
  };
  
const deleteService = async (deptCode, serviceId) => {
  if (!window.confirm("Supprimer ce service et ses employés ?")) return;
  const dept = departments.find((d) => d.code === deptCode);
  if (!dept?.id) return;
  await supprimerService(dept.id, serviceId); // l'historique est géré dans le contexte
};
  

=======
  };
  const confirmEditService = async () => {
    if (!serviceForm.name.trim()) return;
    const dep = departments.find((d) => d.code === serviceTarget.deptCode);
    if (!dep) return;
    try {
      await modifierService(dep.id, {
        id: serviceTarget.serviceId,
        name: serviceForm.name.trim(),
        chef: serviceForm.chef.trim() || "À définir",
      });
      closeModal();
    } catch (err) {
      console.error("Erreur modification service", err);
    }
  };
  const deleteService = async (deptCode, serviceId) => {
    if (window.confirm("Supprimer ce service et ses employés ?")) {
      const dep = departments.find((d) => d.code === deptCode);
      if (!dep) return;
      await supprimerService(dep.id, serviceId);
    }
  };
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  // Employé
  const openAddEmploye = (deptCode, serviceId) => {
    setEmpForm({
      prenom: "",
      nom: "",
      categorie: CATEGORIES[3],
      anciennete: 0,
      situation: SITUATIONS[0],
      nb_enfants: 0,
      email: "",
      telephone: "",
      adresse: "",
<<<<<<< HEAD
      salaire: 0,
=======
      salaire: 400000,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    });
    setEmpTarget({ deptCode, serviceId });
    setModal("add-employe");
  };
<<<<<<< HEAD
// 🔥 Ouvrir le modal d'édition d'un employé
const openEditEmploye = (deptCode, serviceId, employe) => {
  setEmpForm({
    id: employe.id,
    prenom: employe.prenom || "",
    nom: employe.nom || "",
    categorie: employe.categorie || CATEGORIES[3],
    anciennete: employe.anciennete || 0,
    situation: employe.situation || SITUATIONS[0],
    nb_enfants: employe.nb_enfants || 0,
    email: employe.email || "",
    telephone: employe.telephone || "",
    adresse: employe.adresse || "",
    salaire: employe.salaire || 0,
    matricule: employe.matricule || "",
  });
  setEmpTarget({ deptCode, serviceId, empId: employe.id });
  setModal("edit-employe");
};

const confirmAddEmploye = async () => {
  if (!empForm.prenom.trim() || !empForm.nom.trim()) return;

  const dept = departments.find((d) => d.code === empTarget.deptCode);

  // 🔥 Vérifications préalables
  if (!dept?.id) {
    alert("❌ Département non synchronisé avec Django. Recréez-le.");
    return;
  }

  // Vérifier que le serviceId est un id Django (nombre) et pas un id local (string "id_...")
  const serviceId = empTarget.serviceId;
  if (typeof serviceId === "string" && serviceId.startsWith("id_")) {
    alert("❌ Ce service n'existe pas encore en base Django. Recréez-le.");
    return;
  }

  const result = await ajouterEmployeService(dept.id, serviceId, {
    prenom:     empForm.prenom.trim(),
    nom:        empForm.nom.trim(),
    categorie:  empForm.categorie,
    anciennete: empForm.anciennete,
    situation:  empForm.situation,
    nb_enfants: empForm.nb_enfants,
    email:      empForm.email,
    adresse:    empForm.adresse,
    salaire:    empForm.salaire,
  });

  if (result?.success) closeModal();
};
const confirmEditEmploye = async () => {
  if (!empForm.prenom.trim() || !empForm.nom.trim()) return;

  const dept = departments.find((d) => d.code === empTarget.deptCode);
  if (!dept?.id) return;

  await modifierEmploye(
    dept.id,
    empTarget.serviceId,
    empTarget.empId,
    {
      prenom:     empForm.prenom.trim(),
      nom:        empForm.nom.trim(),
      categorie:  empForm.categorie,
      anciennete: empForm.anciennete,
      situation:  empForm.situation,
      nb_enfants: empForm.nb_enfants,
      email:      empForm.email,
      adresse:    empForm.adresse,
      salaire:    empForm.salaire,
    }
  );
=======
  const openEditEmploye = (deptCode, serviceId, employe) => {
    setEmpForm({
      id: employe.id,
      prenom: employe.prenom || "",
      nom: employe.nom || "",
      categorie: employe.categorie || CATEGORIES[3],
      anciennete: employe.anciennete || 0,
      situation: employe.situation || SITUATIONS[0],
      nb_enfants: employe.nb_enfants || 0,
      email: employe.email || "",
      telephone: employe.telephone || "",
      adresse: employe.adresse || "",
      salaire: employe.salaire || 0,
      matricule: employe.matricule || "",
    });
    setEmpTarget({ deptCode, serviceId, empId: employe.id });
    setModal("edit-employe");
  };

  const confirmAddEmploye = async () => {
    const erreurs = [];
    if (!empForm.prenom.trim()) erreurs.push("Prénom requis");
    if (!empForm.nom.trim()) erreurs.push("Nom requis");
    if (!empForm.email.trim()) erreurs.push("Email requis");
    if (!empForm.telephone.trim()) erreurs.push("Téléphone requis");
    if (!empForm.adresse.trim()) erreurs.push("Adresse requise");
    if (empForm.anciennete < 0 || empForm.anciennete > 35)
      erreurs.push("Ancienneté invalide (0-35 ans)");
    if (empForm.nb_enfants < 0 || empForm.nb_enfants > 5)
      erreurs.push("Nb enfants invalide (0-5)");
    if (empForm.salaire < 400000) erreurs.push("Salaire minimum : 400 000 Ar");

    if (erreurs.length > 0) {
      alert("❌ Champs obligatoires manquants :\n\n• " + erreurs.join("\n• "));
      return;
    }

    const dept = departments.find((d) => d.code === empTarget.deptCode);
    const service = dept?.services.find((s) => s.id === empTarget.serviceId);

    // Vérif capacité logement
    const attLiee = attributions.find(
      (a) =>
        a.logement &&
        a.statut !== "Terminé" &&
        a.statut !== "Maintenance" &&
        String(a.service_id) === String(empTarget.serviceId),
    );
    if (attLiee) {
      const logement = logements.find((l) => l.id === attLiee.logement);
      if (logement) {
        const capaciteMax =
          logement.capacite ||
          logement.capaciteMax ||
          getCapaciteLogement(logement.type);
        const employesActifsCount = (service?.employes || []).filter(
          (e) => !e.desactive,
        ).length;
        if (employesActifsCount + 1 > capaciteMax) {
          alert(`❌ Capacité maximale atteinte (${capaciteMax} occupants).`);
          return;
        }
      }
    }

    const result = await ajouterEmployeService(dept.id, empTarget.serviceId, {
      ...empForm,
      prenom: empForm.prenom.trim(),
      nom: empForm.nom.trim(),
    });

    if (result?.success) {
      if (attLiee) {
        const nomComplet = `${empForm.prenom} ${empForm.nom}`.trim();
        const nouveauxOccupants = [...(attLiee.occupants || []), nomComplet];
        synchroniserOccupantsAttribution(
          empTarget.serviceId,
          nouveauxOccupants,
        );
      }
      closeModal();
    } else if (result?.error) {
      alert(result.error);
    }
  };

  const confirmEditEmploye = async () => {
    if (!empForm.prenom.trim() || !empForm.nom.trim()) return;
    const dep = departments.find((d) => d.code === empTarget.deptCode);
    if (!dep) return;
    try {
      await modifierEmploye(dep.id, empTarget.serviceId, empTarget.empId, {
        prenom: empForm.prenom.trim(),
        nom: empForm.nom.trim(),
        categorie: empForm.categorie,
        anciennete: empForm.anciennete,
        situation: empForm.situation,
        nb_enfants: empForm.nb_enfants,
        email: empForm.email,
        telephone: empForm.telephone,
        adresse: empForm.adresse,
        salaire: empForm.salaire,
      });
      closeModal();
    } catch (err) {
      console.error("Erreur modification employé", err);
    }
  };
  const supprimerPhysiquementEmploye = (deptCode, serviceId, empId) => {
    if (
      window.confirm(
        "⚠️ SUPPRESSION DÉFINITIVE — Cette action est irréversible. Continuer ?",
      )
    ) {
      setDepartments((p) =>
        p.map((d) =>
          d.code === deptCode
            ? {
                ...d,
                services: d.services.map((s) =>
                  s.id === serviceId
                    ? {
                        ...s,
                        employes: s.employes.filter((e) => e.id !== empId),
                      }
                    : s,
                ),
              }
            : d,
        ),
      );
    }
  };

  const ouvrirModalBesoin = (deptCode, service) => {
    if (service.logementAttribue || service.besoinLogementExprime) {
      return;
    }

    setServiceLoge(false);
    setBesoinModal({
      deptCode,
      serviceId: service.id,
      serviceName: service.name,
      deptName: departments.find((d) => d.code === deptCode)?.name || deptCode,
    });
    setTypeLogementRequis(service.typeLogementDemande || "F2");
  };

  const confirmerBesoin = () => {
    if (!besoinModal) {
      setBesoinModal(null);
      return;
    }
    const dept = departments.find((d) => d.code === besoinModal.deptCode);
    const service = dept?.services.find((s) => s.id === besoinModal.serviceId);
    if (service?.logementAttribue || service?.besoinLogementExprime) {
      setBesoinModal(null);
      return;
    }

    const employesActifs =
      service?.employes
        ?.filter((e) => e && !e.desactive)
        ?.map((e) => `${e.prenom || ""} ${e.nom || ""}`.trim()) || [];

    if (creerAlerteBesoin) {
      creerAlerteBesoin(
        besoinModal.deptName,
        besoinModal.serviceName,
        typeLogementRequis,
        employesActifs,
        besoinModal.serviceId, // ← passer serviceId pour liaison précise
      );
    }

    setDepartments((prev) =>
      prev.map((d) =>
        d.code === besoinModal.deptCode
          ? {
              ...d,
              services: d.services.map((s) =>
                s.id === besoinModal.serviceId
                  ? {
                      ...s,
                      besoinLogementExprime: true,
                      typeLogementDemande: typeLogementRequis,
                    }
                  : s,
              ),
            }
          : d,
      ),
    );

    setBesoinModal(null);
  };

  const annulerBesoin = () => {
    setBesoinModal(null);
    setTypeLogementRequis("F2");
    setServiceLoge(false);
  };
  const openDetail = (dept, service, emp) => {
    setDetailData({ dept, service, emp });
    setModal("detail-employe");
  };

  const filtered = departments.filter((d) => {
    if (!d) return false;
    const deptMatch =
      (d.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.fullName || "").toLowerCase().includes(search.toLowerCase());

    const serviceMatch = (d.services || []).some((s) => {
      if (!s) return false;
      const serviceNameMatch = (s.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const employeMatch = (s.employes || []).some((e) => {
        if (!e) return false;
        const prenom = e.prenom || "";
        const nom = e.nom || "";
        return `${prenom} ${nom}`.toLowerCase().includes(search.toLowerCase());
      });
      return serviceNameMatch || employeMatch;
    });

    return deptMatch || serviceMatch;
  });
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553

  closeModal();
};

// 🔥 Confirmer la modification d'un employé
const confirmEditService = async () => {
  if (!serviceForm.name.trim()) return;
  const dept = departments.find((d) => d.code === serviceTarget.deptCode);
  if (!dept?.id) return;

  await modifierService(dept.id, {
    id:   serviceTarget.serviceId,
    name: serviceForm.name.trim(),
    chef: serviceForm.chef.trim(),
  });

  closeModal();
};


  // Fonction legacy pour compatibilité (suppression physique si vraiment nécessaire)
 const supprimerPhysiquementEmploye = async (deptCode, serviceId, empId) => {
  if (!window.confirm("⚠️ SUPPRESSION DÉFINITIVE — Continuer ?")) return;

  const dept = departments.find((d) => d.code === deptCode);
  if (!dept) return;

  await supprimerEmployeService(dept.id, serviceId, empId);
};
  // ── Gestion des besoins de logement ─────────────────────────────────────────

const ouvrirModalBesoin = (deptCode, service) => {
    // 🔥 Se fier UNIQUEMENT à service.logementAttribue (source de vérité du service)
    if (service.logementAttribue || service.besoinLogementExprime) {
      return;
    }
    
    setServiceLoge(false); // Le service n'a pas de logement
    setBesoinModal({
      deptCode,
      serviceId: service.id,
      serviceName: service.name,
      deptName: departments.find((d) => d.code === deptCode)?.name || deptCode,
    });
    setTypeLogementRequis(service.typeLogementDemande || "F2");
  

  };


  // LIGNE ~1320 — VÉRIFIER QUE CECI EXISTE :

const confirmerBesoin = () => {
    if (!besoinModal) {
      setBesoinModal(null);
      return;
    }
    // Vérifier au moment de la confirmation que le service n'a pas reçu de logement entre-temps
    const dept = departments.find((d) => d.code === besoinModal.deptCode);
    const service = dept?.services.find((s) => s.id === besoinModal.serviceId);
    if (service?.logementAttribue || service?.besoinLogementExprime) {
      setBesoinModal(null);
      return;
    }

    // Compter les employés actifs du service


    const employesActifs =
      service?.employes
        ?.filter((e) => e && !e.desactive)
        ?.map((e) => `${e.prenom || ""} ${e.nom || ""}`.trim()) || [];

    // Créer l'alerte via le contexte
    if (creerAlerteBesoin) {
      creerAlerteBesoin(
        besoinModal.deptName,
        besoinModal.serviceName,
        typeLogementRequis,
        employesActifs,
      );
    }

    // 🔥 MARQUER LE SERVICE COMME AYANT BESOIN
    setDepartments((prev) =>
      prev.map((d) =>
        d.code === besoinModal.deptCode
          ? {
              ...d,
              services: d.services.map((s) =>
                s.id === besoinModal.serviceId
                  ? {
                      ...s,
                      besoinLogementExprime: true, // 🔥 CECI EST CRUCIAL
                      typeLogementDemande: typeLogementRequis,
                    }
                  : s,
              ),
            }
          : d,
      ),
    );

    setBesoinModal(null);
  };

  const annulerBesoin = () => {
    setBesoinModal(null);
    setTypeLogementRequis("F2");
    setServiceLoge(false);
  };
  const openDetail = (dept, service, emp) => {
    setDetailData({ dept, service, emp });
    setModal("detail-employe");
  };

  const filtered = departments.filter((d) => {
    if (!d) return false; // 🔥 Protection contre département null
    const deptMatch =
      (d.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.fullName || "").toLowerCase().includes(search.toLowerCase());

    const serviceMatch = (d.services || []).some((s) => {
      if (!s) return false; // 🔥 Protection contre service null
      const serviceNameMatch = (s.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const employeMatch = (s.employes || []).some((e) => {
        if (!e) return false; // 🔥 Protection contre employé null
        const prenom = e.prenom || "";
        const nom = e.nom || "";
        return `${prenom} ${nom}`.toLowerCase().includes(search.toLowerCase());
      });
      return serviceNameMatch || employeMatch;
    });

    return deptMatch || serviceMatch;
  });

  const prevTeinte = COLOR_TEINTES[deptForm.colorIdx] || COLOR_TEINTES[0];
  const prevIcon = ICON_OPTIONS[deptForm.iconIdx] || ICON_OPTIONS[0];

<<<<<<< HEAD
  // ─── Helpers Historique ─────────────────────────────────────────────────────
function getHistoriqueIcon(action) {
  const icons = {
    desactivation_definitive: UserX,
    desactivation_temporaire: Clock,
    reactivation: UserPlus,
    ajout_employe: UserPlus,
    modification_employe: Pencil,
    ajout_departement: Building,
    suppression_departement: Trash2,
    ajout_service: Layers,
    suppression_service: Trash2,
  };
  return icons[action] || FileText;
}

function getHistoriqueColor(action, isDark) {
  const colors = {
    desactivation_definitif: isDark ? "text-rose-400 bg-rose-500/20" : "text-rose-600 bg-rose-100",
    desactivation_temporaire: isDark ? "text-amber-400 bg-amber-500/20" : "text-amber-600 bg-amber-100",
    reactivation: isDark ? "text-emerald-400 bg-emerald-500/20" : "text-emerald-600 bg-emerald-100",
    ajout_employe: isDark ? "text-blue-400 bg-blue-500/20" : "text-blue-600 bg-blue-100",
    modification_employe: isDark ? "text-violet-400 bg-violet-500/20" : "text-violet-600 bg-violet-100",
    ajout_departement: isDark ? "text-cyan-400 bg-cyan-500/20" : "text-cyan-600 bg-cyan-100",
    suppression_departement: isDark ? "text-rose-400 bg-rose-500/20" : "text-rose-600 bg-rose-100",
    ajout_service: isDark ? "text-indigo-400 bg-indigo-500/20" : "text-indigo-600 bg-indigo-100",
    suppression_service: isDark ? "text-rose-400 bg-rose-500/20" : "text-rose-600 bg-rose-100",
  };
  return colors[action] || (isDark ? "text-gray-400 bg-gray-500/20" : "text-gray-600 bg-gray-100");
}

function getHistoriqueLabel(action) {
  const labels = {
    desactivation_definitive: "Désactivation définitive",
    desactivation_temporaire: "Désactivation temporaire",
    reactivation: "Réactivation",
    ajout_employe: "Ajout d'employé",
    modification_employe: "Modification employé",
    ajout_departement: "Ajout de département",
    suppression_departement: "Suppression de département",
    ajout_service: "Ajout de service",
    suppression_service: "Suppression de service",
  };
  return labels[action] || action;
}
=======
  // Helpers Historique 
  function getHistoriqueIcon(action) {
    const icons = {
      desactivation_definitive: UserX,
      desactivation_temporaire: Clock,
      reactivation: UserPlus,
      ajout_employe: UserPlus,
      modification_employe: Pencil,
      ajout_departement: Building,
      suppression_departement: Trash2,
      ajout_service: Layers,
      reemménagement: Home,
      demande_echange: ArrowLeftRight,
      suppression_service: Trash2,
    };
    return icons[action] || FileText;
  }

  function getHistoriqueColor(action, isDark) {
    const colors = {
      desactivation_definitive: isDark
        ? "text-rose-400 bg-rose-500/20"
        : "text-rose-600 bg-rose-100",
      desactivation_temporaire: isDark
        ? "text-amber-400 bg-amber-500/20"
        : "text-amber-600 bg-amber-100",
      reactivation: isDark
        ? "text-emerald-400 bg-emerald-500/20"
        : "text-emerald-600 bg-emerald-100",
      ajout_employe: isDark
        ? "text-blue-400 bg-blue-500/20"
        : "text-blue-600 bg-blue-100",
      modification_employe: isDark
        ? "text-violet-400 bg-violet-500/20"
        : "text-violet-600 bg-violet-100",
      ajout_departement: isDark
        ? "text-cyan-400 bg-cyan-500/20"
        : "text-cyan-600 bg-cyan-100",
      suppression_departement: isDark
        ? "text-rose-400 bg-rose-500/20"
        : "text-rose-600 bg-rose-100",
      ajout_service: isDark
        ? "text-indigo-400 bg-indigo-500/20"
        : "text-indigo-600 bg-indigo-100",
      suppression_service: isDark
        ? "text-rose-400 bg-rose-500/20"
        : "text-rose-600 bg-rose-100",
      reemménagement: isDark
        ? "text-emerald-400 bg-emerald-500/20"
        : "text-emerald-600 bg-emerald-100",
      demande_echange: isDark
        ? "text-amber-400 bg-amber-500/20"
        : "text-amber-600 bg-amber-100",
    };
    return (
      colors[action] ||
      (isDark ? "text-gray-400 bg-gray-500/20" : "text-gray-600 bg-gray-100")
    );
  }

  function getHistoriqueLabel(action) {
    const labels = {
      desactivation_definitive: "Désactivation définitive",
      desactivation_temporaire: "Désactivation temporaire",
      reactivation: "Réactivation",
      ajout_employe: "Ajout d'employé",
      modification_employe: "Modification employé",
      ajout_departement: "Ajout de département",
      suppression_departement: "Suppression de département",
      ajout_service: "Ajout de service",
      suppression_service: "Suppression de service",
      reemménagement: "Réemménagement",
      demande_echange: "Demande d'échange",
    };
    return labels[action] || action;
  }
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  return (
    <div
      className={`min-h-screen bg-gradient-to-br p-6 transition-colors duration-500 ${theme.bg}`}
    >
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header avec navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-black flex items-center gap-3 ${theme.text}`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Users className="w-5 h-5 text-white" />
              </div>
              Gestion RH
            </h1>
            <p className={`text-sm mt-1 ${theme.textSubtle}`}>
              {departments.length} directions · {totalServices} services ·{" "}
              {totalEmps} employés
            </p>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <div
              className={`flex p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm"}`}
            >
              <button
                onClick={() => setViewMode("departments")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  viewMode === "departments"
                    ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/20"
                    : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                }`}
              >
                Départements
              </button>
              <button
                onClick={() => setViewMode("stats")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  viewMode === "stats"
                    ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-lg shadow-blue-500/20"
                    : `${theme.textSubtle} ${isDark ? "hover:bg-white/5" : "hover:bg-gray-100"}`
                }`}
              >
                Statistiques
              </button>
            </div>

            <div className="relative">
              <Search
                size={14}
                className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${theme.textLight}`}
              />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] w-56 transition-all ${theme.input} ${theme.text}`}
              />
            </div>

            <button
              onClick={openAddDept}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] hover:shadow-lg hover:shadow-amber-500/25 text-white text-sm font-semibold transition-all hover:scale-105"
            >
              <Plus size={15} strokeWidth={2.5} /> Nouveau département
            </button>
          </div>
        </div>

        {/* Vue Statistiques */}
        {viewMode === "stats" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <StatCard3D
                label="Total Employés"
                value={totalEmps}
                trend="up"
                trendValue={12}
                icon={Users}
                color="blue"
                delay={0}
                isDark={isDark}
              />
              <StatCard3D
                label="Éligibles Logement"
                value={eligibleCount}
                trend="up"
                trendValue={8}
                icon={Home}
                color="emerald"
                delay={100}
                isDark={isDark}
              />
              <StatCard3D
                label="Services Actifs"
                value={totalServices}
                trend="up"
                trendValue={5}
                icon={Briefcase}
                color="violet"
                delay={200}
                isDark={isDark}
              />
              <StatCard3D
                label="Ancienneté Moy."
                value={avgAnciennete}
                trend="down"
                trendValue={3}
                icon={Clock}
                color="amber"
                delay={300}
                isDark={isDark}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Répartition par catégorie */}
              <div className="group relative">
                <div
                  className={`absolute inset-0 rounded-2xl transform translate-y-2 blur-sm group-hover:translate-y-3 transition-transform duration-300 ${isDark ? "bg-black/20" : "bg-gray-400/20"}`}
                />
                <div
                  className={`relative backdrop-blur-sm border rounded-2xl p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.text}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    Répartition par catégorie
                  </h3>
                  <div className="space-y-4">
                    {repartitionCategories.map((cat, i) => (
                      <div
                        key={cat.categorie}
                        className="flex items-center gap-3"
                      >
                        <span className={`text-sm w-32 ${theme.textSubtle}`}>
                          {cat.categorie}
                        </span>
                        <div className="flex-1">
                          <AnimatedProgress
                            value={cat.count}
                            max={Math.max(totalEmps, 1)}
                            color="emerald"
                            isDark={isDark}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold w-8 text-right ${theme.text}`}
                        >
                          {cat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top départements */}
              <div className="group relative">
                <div
                  className={`absolute inset-0 rounded-2xl transform translate-y-2 blur-sm group-hover:translate-y-3 transition-transform duration-300 ${isDark ? "bg-black/20" : "bg-gray-400/20"}`}
                />
                <div
                  className={`relative backdrop-blur-sm border rounded-2xl p-6 ${isDark ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"}`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.text}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center">
                      <Building className="w-4 h-4 text-white" />
                    </div>
                    Effectifs par direction
                  </h3>
                  <div className="space-y-3">
                    {departments.map((dept) => {
                      const empCount = dept.services.reduce(
                        (a, s) => a + s.employes.length,
                        0,
                      );
<<<<<<< HEAD
                      const DeptIcon = ICON_OPTIONS[dept.iconIdx].Icon;
                      const teinte = COLOR_TEINTES[dept.colorIdx];
=======
                      const DeptIcon = (
                        ICON_OPTIONS[dept.iconIdx] ?? ICON_OPTIONS[0]
                      ).Icon;
                      const teinte =
                        COLOR_TEINTES[dept.colorIdx] ?? COLOR_TEINTES[0];
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                      return (
                        <div
                          key={dept.code}
                          className={`flex items-center gap-3 p-2.5 rounded-xl transition-all hover:scale-[1.02] ${isDark ? "hover:bg-white/5" : "hover:bg-gray-50"}`}
                        >
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md"
                            style={{
                              background: isDark
                                ? teinte.bgDark
                                : teinte.bgLight,
                              boxShadow: `0 2px 8px ${isDark ? teinte.iconDark : teinte.iconLight}20`,
                            }}
                          >
                            <DeptIcon
                              size={16}
                              color={
                                isDark ? teinte.iconDark : teinte.iconLight
                              }
                            />
                          </div>
                          <span className={`text-sm flex-1 ${theme.textMuted}`}>
                            {dept.name}
                          </span>
                          <div
                            className={`w-24 h-2 rounded-full overflow-hidden ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                          >
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#0F2D56] to-[#C9A84C] transition-all duration-1000"
                              style={{
                                width: `${totalEmps > 0 ? (empCount / totalEmps) * 100 : 0}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-sm font-semibold ${theme.text}`}
                          >
                            {empCount}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vue Départements */}
        {viewMode === "departments" && (
          <div className="flex flex-col gap-5 animate-in slide-in-from-bottom-4 duration-500">
            {filtered.length === 0 ? (
              <div
                className={`text-center py-16 backdrop-blur-sm border rounded-2xl ${isDark ? "bg-white/5 border-white/10 text-white/40" : "bg-white border-gray-200 text-gray-400 shadow-lg"}`}
              >
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                Aucun résultat pour « {search} »
              </div>
            ) : (
              filtered.map((dept, i) => (
                <DepartmentCard
                  key={dept.code}
                  dept={dept}
                  isDark={isDark}
                  index={i}
<<<<<<< HEAD
=======
                  departements={departments}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  onAddService={openAddService}
                  onEditService={openEditService}
                  onDeleteService={deleteService}
                  onAddEmploye={openAddEmploye}
<<<<<<< HEAD
                  onDeleteEmploye={supprimerPhysiquementEmploye} // 🔥 Ajouté
                  onDesactiverEmploye={(deptCode, serviceId, emp) => {
                    console.log("DepartmentCard reçoit désactivation:", emp);
                    setDesactiverModal({ deptCode, serviceId, employe: emp });
=======
                  onDeleteEmploye={supprimerPhysiquementEmploye}
                  onDesactiverEmploye={(deptCode, serviceId, emp) => {
                    const dep = departments.find((d) => d.code === deptCode);
                    setDesactiverModal({
                      deptCode,
                      deptId: dep?.id,
                      serviceId,
                      employe: emp,
                    });
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  }}
                  onDetailEmploye={openDetail}
                  onBesoinLogement={ouvrirModalBesoin}
                  onDeleteDept={deleteDept}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === "add-dept" && (
        <Modal
          title="Nouveau département"
          onClose={closeModal}
          onConfirm={confirmAddDept}
          confirmDisabled={!deptForm.code.trim() || !deptForm.name.trim()}
          isDark={isDark}
        >
<<<<<<< HEAD
          {/* Header visuel */}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
          <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 border-white/10" : "bg-gradient-to-r from-blue-50 to-violet-50 border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C9A84C] to-amber-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.text}`}>
                  Créer une direction
                </p>
                <p className={`text-xs ${theme.textLight}`}>
                  Remplissez les informations ci-dessous
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
<<<<<<< HEAD
            {/* Code + Nom sur 2 colonnes */}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div className="grid grid-cols-1 gap-3">
              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <label
                  className={`text-[10px] font-bold uppercase tracking-wider ${theme.textLight}`}
                >
                  Code
                </label>
                <input
                  value={deptForm.code}
                  onChange={(e) =>
                    setDeptForm((p) => ({
                      ...p,
                      code: e.target.value.toUpperCase(),
                    }))
                  }
                  placeholder="Ex: DG"
                  maxLength={10}
                  className={`w-full mt-1 px-3 py-2.5 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                />
                <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                  3-10 caractères, unique
                </p>
              </div>

              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <label
                  className={`text-[10px] font-bold uppercase tracking-wider ${theme.textLight}`}
                >
                  Nom affiché
                </label>
                <input
                  value={deptForm.name}
                  onChange={(e) =>
                    setDeptForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Ex: Direction Générale"
                  className={`w-full mt-1 px-3 py-2.5 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                />
              </div>
            </div>

<<<<<<< HEAD
            {/* Nom complet */}
=======
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            <div
              className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <label
                className={`text-[10px] font-bold uppercase tracking-wider ${theme.textLight}`}
              >
                Nom complet (optionnel)
              </label>
              <input
                value={deptForm.fullName}
                onChange={(e) =>
                  setDeptForm((p) => ({ ...p, fullName: e.target.value }))
                }
                placeholder="Ex: Direction Générale et Stratégie"
                className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
              />
            </div>

<<<<<<< HEAD
            {/* Icône + Couleur côte à côte */}
            <div className="grid grid-cols-2 gap-3">
              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <label
                  className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}
                >
                  Icône
                </label>
                <IconPicker
                  selected={deptForm.iconIdx}
                  onChange={(i) => setDeptForm((p) => ({ ...p, iconIdx: i }))}
                  isDark={isDark}
                />
              </div>

              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
              >
                <label
                  className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}
                >
                  Couleur
                </label>
                <ColorPicker
                  selected={deptForm.colorIdx}
                  onChange={(i) => setDeptForm((p) => ({ ...p, colorIdx: i }))}
                  isDark={isDark}
                />
              </div>
            </div>

            {/* Prévisualisation */}
=======
            <div
              className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <label
                className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}
              >
                Icône
              </label>
              <IconPicker
                selected={deptForm.iconIdx}
                onChange={(i) => setDeptForm((p) => ({ ...p, iconIdx: i }))}
                isDark={isDark}
              />
            </div>

            <div
              className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <label
                className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}
              >
                Couleur
              </label>
              <ColorPicker
                selected={deptForm.colorIdx}
                onChange={(i) => setDeptForm((p) => ({ ...p, colorIdx: i }))}
                isDark={isDark}
              />
            </div>

>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
            {(deptForm.name || deptForm.code) && (
              <div
                className={`p-4 rounded-2xl border ${isDark ? "bg-gradient-to-r from-white/5 to-white/[0.02] border-white/10" : "bg-gradient-to-r from-gray-50 to-white border-gray-200"}`}
              >
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider mb-3 ${theme.textLight}`}
                >
                  Prévisualisation
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{
                      background: isDark
                        ? prevTeinte.bgDark
                        : prevTeinte.bgLight,
                      boxShadow: `0 4px 15px ${isDark ? prevTeinte.iconDark : prevTeinte.iconLight}30`,
                    }}
                  >
<<<<<<< HEAD
                    <prevIcon.Icon
                      size={24}
                      color={
                        isDark ? prevTeinte.iconDark : prevTeinte.iconLight
                      }
                      strokeWidth={1.8}
                    />
=======
                    {prevIcon?.Icon && (
                      <prevIcon.Icon
                        size={24}
                        color={
                          isDark ? prevTeinte.iconDark : prevTeinte.iconLight
                        }
                        strokeWidth={1.8}
                      />
                    )}
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
                  </div>
                  <div>
                    <p className={`text-base font-bold ${theme.text}`}>
                      {deptForm.name || "—"}
                    </p>
                    <p className={`text-xs ${theme.textLight}`}>
                      {deptForm.fullName || deptForm.code || "—"}
                    </p>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{
                        background: isDark
                          ? prevTeinte.bgDark
                          : prevTeinte.bgLight,
                        color: isDark
                          ? prevTeinte.iconDark
                          : prevTeinte.iconLight,
                      }}
                    >
                      {COLOR_TEINTES[deptForm.colorIdx]?.label}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
<<<<<<< HEAD
        </Modal>
      )}

      {modal === "add-service" && (
        <Modal
          title={`Ajouter un service — ${departments.find((d) => d.code === serviceTarget?.deptCode)?.name}`}
          onClose={closeModal}
          onConfirm={confirmAddService}
          confirmDisabled={!serviceForm.name.trim()}
          isDark={isDark}
        >
          <InputField
            label="Nom du service"
            value={serviceForm.name}
            onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))}
            placeholder="Ex : Contrôle qualité"
            isDark={isDark}
          />
          <InputField
            label="Chef de service"
            value={serviceForm.chef}
            onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))}
            placeholder="Ex : Marie Dupont"
            isDark={isDark}
          />
        </Modal>
      )}

      {modal === "edit-service" && (
        <Modal
          title="Modifier le service"
          onClose={closeModal}
          onConfirm={confirmEditService}
          confirmLabel="Enregistrer"
          confirmDisabled={!serviceForm.name.trim()}
          isDark={isDark}
        >
          <InputField
            label="Nom du service"
            value={serviceForm.name}
            onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))}
            placeholder="Nom du service"
            isDark={isDark}
          />
          <InputField
            label="Chef de service"
            value={serviceForm.chef}
            onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))}
            placeholder="Chef de service"
            isDark={isDark}
          />
        </Modal>
      )}

      {modal === "add-employe" && (
        <Modal
          title="Ajouter un employé"
          onClose={closeModal}
          onConfirm={confirmAddEmploye}
          confirmDisabled={!empForm.prenom.trim() || !empForm.nom.trim()}
          isDark={isDark}
          size="lg"
        >
          {/* Header */}
          <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-white/10" : "bg-gradient-to-r from-emerald-50 to-blue-50 border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.text}`}>
                  Nouvel employé
                </p>
                <p className={`text-xs ${theme.textLight}`}>
                  Tous les champs * sont obligatoires
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Identité */}
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <User className="w-3 h-3" /> Identité *
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Prénom
                  </label>
                  <input
                    value={empForm.prenom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, prenom: e.target.value }))
                    }
                    placeholder="Jean"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nom
                  </label>
                  <input
                    value={empForm.nom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, nom: e.target.value }))
                    }
                    placeholder="Rakoto"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            {/* Catégorie + Ancienneté + Enfants */}
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Briefcase className="w-3 h-3" /> Informations professionnelles
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Catégorie
                  </label>
                  <select
                    value={empForm.categorie}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, categorie: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {CATEGORIES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Ancienneté (ans)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={empForm.anciennete}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        anciennete: Math.max(0, Number(e.target.value)),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nb enfants
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={empForm.nb_enfants}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        nb_enfants: Math.max(0, Number(e.target.value)),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            {/* Situation familiale */}
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Heart className="w-3 h-3" /> Situation familiale
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Situation
                  </label>
                  <select
                    value={empForm.situation}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, situation: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {SITUATIONS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Salaire (Ar)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={empForm.salaire}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        salaire: Math.max(0, Number(e.target.value)),
                      }))
                    }
                    placeholder="2500000"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            {/* Contact */}

            
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Mail className="w-3 h-3" /> Contact
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Email
                  </label>
                  <input
                    value={empForm.email}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@spat.mg"
                    type="email"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Téléphone
                  </label>
                  <input
                    value={empForm.telephone}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, telephone: e.target.value }))
                    }
                    placeholder="034 12 345 67"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  className={`text-[10px] font-semibold ${theme.textLight}`}
                >
                  Adresse
                </label>
                <input
                  value={empForm.adresse}
                  onChange={(e) =>
                    setEmpForm((p) => ({ ...p, adresse: e.target.value }))
                  }
                  placeholder="Antananarivo"
                  className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

{modal === "edit-employe" && (
    <Modal
        title="Modifier un employé"
        onClose={closeModal}
        onConfirm={confirmEditEmploye}
        confirmDisabled={!empForm.prenom.trim() || !empForm.nom.trim()}
        confirmLabel="Enregistrer les modifications"
        isDark={isDark}
        size="lg"
    >
        {/* Header */}
        <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 border-white/10" : "bg-gradient-to-r from-blue-50 to-violet-50 border-gray-200"}`}
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center shadow-lg">
                    <Pencil className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className={`text-sm font-bold ${theme.text}`}>
                        Modifier {empForm.prenom} {empForm.nom}
                    </p>
                    <p className={`text-xs ${theme.textLight}`}>
                        Matricule : {empForm.matricule}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            {/* Identité */}
            <div
                className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
                <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
                >
                    <User className="w-3 h-3" /> Identité *
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Prénom
                        </label>
                        <input
                            value={empForm.prenom}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, prenom: e.target.value }))
                            }
                            placeholder="Jean"
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Nom
                        </label>
                        <input
                            value={empForm.nom}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, nom: e.target.value }))
                            }
                            placeholder="Rakoto"
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                </div>
            </div>

            {/* Professionnel */}
            <div
                className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
                <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
                >
                    <Briefcase className="w-3 h-3" /> Informations professionnelles
                </p>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Catégorie
                        </label>
                        <select
                            value={empForm.categorie}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, categorie: e.target.value }))
                            }
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        >
                            {CATEGORIES.map((c) => (
                                <option
                                    key={c}
                                    value={c}
                                    className={isDark ? "bg-gray-900" : "bg-white"}
                                >
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Ancienneté (ans)
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={empForm.anciennete}
                            onChange={(e) =>
                                setEmpForm((p) => ({
                                    ...p,
                                    anciennete: Math.max(0, Number(e.target.value)),
                                }))
                            }
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Nb enfants
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={empForm.nb_enfants}
                            onChange={(e) =>
                                setEmpForm((p) => ({
                                    ...p,
                                    nb_enfants: Math.max(0, Number(e.target.value)),
                                }))
                            }
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                </div>
            </div>

            {/* Familiale */}
            <div
                className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
                <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
                >
                    <Heart className="w-3 h-3" /> Situation familiale
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Situation
                        </label>
                        <select
                            value={empForm.situation}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, situation: e.target.value }))
                            }
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        >
                            {SITUATIONS.map((s) => (
                                <option
                                    key={s}
                                    value={s}
                                    className={isDark ? "bg-gray-900" : "bg-white"}
                                >
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Salaire (Ar)
                        </label>
                        <input
                            type="number"
                            min={0}
                            value={empForm.salaire}
                            onChange={(e) =>
                                setEmpForm((p) => ({
                                    ...p,
                                    salaire: Math.max(0, Number(e.target.value)),
                                }))
                            }
                            placeholder="2500000"
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div
                className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
                <p
                    className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
                >
                    <Mail className="w-3 h-3" /> Contact
                </p>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Email
                        </label>
                        <input
                            value={empForm.email}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, email: e.target.value }))
                            }
                            placeholder="email@spat.mg"
                            type="email"
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                    <div>
                        <label
                            className={`text-[10px] font-semibold ${theme.textLight}`}
                        >
                            Téléphone
                        </label>
                        <input
                            value={empForm.telephone}
                            onChange={(e) =>
                                setEmpForm((p) => ({ ...p, telephone: e.target.value }))
                            }
                            placeholder="034 12 345 67"
                            className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                        />
                    </div>
                </div>
                <div className="mt-3">
                    <label
                        className={`text-[10px] font-semibold ${theme.textLight}`}
                    >
                        Adresse
                    </label>
                    <input
                        value={empForm.adresse}
                        onChange={(e) =>
                            setEmpForm((p) => ({ ...p, adresse: e.target.value }))
                        }
                        placeholder="Antananarivo"
                        className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                    />
                </div>
            </div>
        </div>
    </Modal>
)}


{modal === "detail-employe" && detailData && (
    <ModalDetailEmployeERP
        employe={detailData.emp}
        dept={detailData.dept}
        service={detailData.service}
        onClose={closeModal}
        onEdit={() => {
            // 🔥 Fermer le modal de détail puis ouvrir l'édition
            closeModal();
            // Petit délai pour la transition visuelle
            setTimeout(() => {
                openEditEmploye(detailData.dept.code, detailData.service.id, detailData.emp);
            }, 150);
        }}
        onDelete={() => {
            setDesactiverModal({
                deptCode: detailData.dept.code,
                serviceId: detailData.service.id,
                employe: detailData.emp
            });
            closeModal();
        }}
        isDark={isDark}
    />
)}

      {/* 🔥 Modal Besoin Logement */}
      {besoinModal && (
        <Modal
          title={`Besoin logement — ${besoinModal.serviceName}`}
          onClose={annulerBesoin}
          onConfirm={confirmerBesoin}
          confirmLabel={serviceLoge ? "Fermer" : "Envoyer la demande"}
          confirmDisabled={serviceLoge}
          isDark={isDark}
        >
          {serviceLoge ? (
            <div
              className={`p-4 rounded-xl border ${isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}
            >
              <div className="flex items-center gap-3">
                <Home
                  className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
                  >
                    Ce service dispose déjà d'un logement
                  </p>
                  <p
                    className={`text-xs ${isDark ? "text-emerald-200/60" : "text-emerald-600"}`}
                  >
                    Aucune action requise.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}
              >
                <p
                  className={`text-sm ${isDark ? "text-amber-300" : "text-amber-700"}`}
                >
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Département : <strong>{besoinModal.deptName}</strong>
                </p>
                <p
                  className={`text-xs mt-1 ${isDark ? "text-amber-200/60" : "text-amber-600"}`}
                >
                  Service : {besoinModal.serviceName}
                </p>
              </div>

              <div>
                <label
                  className={`text-xs font-semibold uppercase tracking-wide ${theme.textSubtle}`}
                >
                  Type de logement requis
                </label>
                <select
                  value={typeLogementRequis}
                  onChange={(e) => setTypeLogementRequis(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl mt-1 focus:outline-none focus:border-[#C9A84C] transition-all ${theme.input} ${theme.text}`}
                >
                  {["Studio", "F1", "F2", "F3", "F4", "Villa"].map((t) => (
                    <option
                      key={t}
                      value={t}
                      className={isDark ? "bg-gray-900" : "bg-white"}
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <p className={`text-xs ${theme.textLight}`}>
                Une alerte sera envoyée au module Attributions pour traitement.
              </p>
            </div>
          )}
        </Modal>
      )}

{/* 🔥 MODAL DÉSACTIVATION — TEMPORAIRE vs DÉFINITIF */}
{desactiverModal && desactiverModal.employe && (
    <Modal
        title="Désactiver l'employé"
        onClose={() => {
            setDesactiverModal(null);
            setMotifDesactivation(null);
            setTypeMotifActif("definitif");
        }}
        onConfirm={async () => {
          if (!motifDesactivation) {
              alert("Veuillez sélectionner un motif de désactivation.");
              return;
          }

          const dept = departments.find((d) => d.code === desactiverModal.deptCode);
          const success = await desactiverEmploye(
              dept?.id,
              desactiverModal.serviceId,
              desactiverModal.employe,
              motifDesactivation,
          );

          if (success) {
              setDesactiverModal(null);
              setMotifDesactivation(null);
              setTypeMotifActif("definitif");
          }
      }}
        confirmDisabled={!motifDesactivation}
        confirmLabel={
            motifDesactivation?.type === "definitif" 
                ? "Confirmer la désactivation définitive" 
                : "Confirmer la désactivation temporaire"
        }
        isDark={isDark}
    >
        <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-200"}`}
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
                    <UserX className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className={`text-sm font-bold ${isDark ? "text-rose-300" : "text-rose-700"}`}>
                        {desactiverModal.employe.prenom} {desactiverModal.employe.nom}
                    </p>
                    <p className={`text-xs ${theme.textLight}`}>
                        Matricule: {desactiverModal.employe.matricule}
                    </p>
                </div>
            </div>
        </div>

        <div className="space-y-4">
            {/* 🔥 Sélection du type de désactivation */}
            <div className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
                <label className={`text-[10px] font-bold uppercase tracking-wider mb-3 block ${theme.textLight}`}>
                    Type de désactivation *
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => {
                            setTypeMotifActif("definitif");
                            setMotifDesactivation(null);
                        }}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            typeMotifActif === "definitif"
                                ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg"
                                : isDark
                                    ? "bg-white/5 text-white/60 hover:bg-white/10"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                        <AlertTriangle className="w-4 h-4" />
                        Définitive
                    </button>
                    <button
                        onClick={() => {
                            setTypeMotifActif("temporaire");
                            setMotifDesactivation(null);
                        }}
                        className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                            typeMotifActif === "temporaire"
                                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                                : isDark
                                    ? "bg-white/5 text-white/60 hover:bg-white/10"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                    >
                        <Clock className="w-4 h-4" />
                        Temporaire
                    </button>
                </div>
            </div>

            {/* 🔥 Motifs selon le type sélectionné */}
            <div className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}>
                <label className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}>
                    {typeMotifActif === "definitif" ? "Motif définitif *" : "Motif temporaire *"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {(typeMotifActif === "definitif" ? MOTIFS_DEFINITIFS : MOTIFS_TEMPORAIRES).map((motif) => (
                        <button
                            key={motif.label}
                            onClick={() => setMotifDesactivation(motif)}
                            className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                                motifDesactivation?.label === motif.label
                                    ? typeMotifActif === "definitif"
                                        ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg"
                                        : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                                    : isDark
                                        ? "bg-white/5 text-white/60 hover:bg-white/10"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            {motif.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 🔥 Prévisualisation du choix */}
            {motifDesactivation && (
                <div className={`p-3 rounded-xl border ${
                    motifDesactivation.type === "definitif"
                        ? (isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-200")
                        : (isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200")
                }`}>
                    <p className={`text-xs flex items-start gap-2 ${
                        motifDesactivation.type === "definitif"
                            ? (isDark ? "text-rose-300" : "text-rose-700")
                            : (isDark ? "text-amber-300" : "text-amber-700")
                    }`}>
                        {motifDesactivation.type === "definitif" ? (
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        ) : (
                            <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                        )}
                        <span>
                            <strong>{motifDesactivation.label}</strong> — {" "}
                            {motifDesactivation.type === "definitif" 
                                ? "Cette désactivation est irréversible. L'employé ne pourra pas être réactivé."
                                : "Cette désactivation est réversible. L'employé pourra être réactivé ultérieurement."
                            }
                        </span>
                    </p>
                </div>
            )}
        </div>
    </Modal>
)}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* 🔥 SECTION HISTORIQUE RH                                          */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <div className="mt-8">
          <div
            onClick={() => setShowHistorique((v) => !v)}
            className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
              isDark
                ? "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-white/10 hover:bg-white/5"
                : "bg-gradient-to-r from-white to-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? "bg-[#C9A84C]/20" : "bg-[#C9A84C]/10"
                }`}
              >
                <FileText className={`w-5 h-5 ${isDark ? "text-[#C9A84C]" : "text-[#a88a3c]"}`} />
              </div>
              <div>
                <h3 className={`text-base font-bold ${theme.text}`}>
                  Historique des actions RH
                </h3>
                <p className={`text-xs ${theme.textLight}`}>
                  {historiqueRH.length} événement{historiqueRH.length > 1 ? "s" : ""} enregistré
                  {historiqueRH.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showHistorique && (
                <div className={`flex gap-1.5 mr-3`}>
                  {[
                    { key: "tous", label: "Tous" },
                    { key: "desactivation", label: "Désactivations" },
                    { key: "reactivation", label: "Réactivations" },
                    { key: "ajout", label: "Ajouts" },
                    { key: "suppression", label: "Suppressions" },
                    { key: "modification", label: "Modifications" },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiltreHistorique(f.key);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        filtreHistorique === f.key
                          ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white"
                          : isDark
                            ? "bg-white/5 text-white/50 hover:bg-white/10"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
              <div
                className={`transition-transform duration-300 ${showHistorique ? "rotate-180" : ""}`}
              >
                <ChevronDown size={16} className={theme.textLight} />
              </div>
            </div>
          </div>

          {showHistorique && (
            <div
              className={`mt-3 rounded-2xl border overflow-hidden max-h-[500px] overflow-y-auto ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10"
                  : "bg-white border-gray-200 shadow-lg"
              }`}
            >
              {historiqueRH.length === 0 ? (
                <div className={`p-8 text-center ${theme.textLight}`}>
                  <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Aucun événement enregistré</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  {historiqueRH
                    .filter((h) => {
                      if (filtreHistorique === "tous") return true;
                      if (filtreHistorique === "desactivation")
                        return h.action.includes("desactivation");
                      if (filtreHistorique === "reactivation")
                        return h.action === "reactivation";
                      if (filtreHistorique === "ajout")
                        return h.action.includes("ajout");
                      if (filtreHistorique === "suppression")
                        return h.action.includes("suppression");
                      if (filtreHistorique === "modification")
                        return h.action.includes("modification");
                      return true;
                    })
                    .map((h) => {
                      const Icon = getHistoriqueIcon(h.action);
                      const colorClass = getHistoriqueColor(h.action, isDark);
                      return (
                        <div
                          key={h.id}
                          className={`flex items-start gap-3 p-4 transition-all hover:bg-white/5 ${
                            isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                          >
                            <Icon size={16} strokeWidth={2} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-sm font-bold ${theme.text}`}>
                                {getHistoriqueLabel(h.action)}
                              </span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${colorClass}`}>
                                {h.heure}
                              </span>
                            </div>
                            
                            {/* Détails selon le type d'action */}
                            <div className={`mt-1 text-xs ${theme.textSubtle}`}>
                              {h.action.includes("employe") && h.employe && (
                                <p>
                                  <span className={theme.textMuted}>Employé : </span>
                                  <strong className={theme.text}>{h.employe}</strong>
                                  {h.matricule && <span className={theme.textLight}> ({h.matricule})</span>}
                                </p>
                              )}
                              
                              {h.action.includes("departement") && h.departement && (
                                <p>
                                  <span className={theme.textMuted}>Département : </span>
                                  <strong className={theme.text}>{h.departement}</strong>
                                  {h.departementCode && <span className={theme.textLight}> ({h.departementCode})</span>}
                                </p>
                              )}
                              
                              {h.action.includes("service") && h.service && (
                                <p>
                                  <span className={theme.textMuted}>Service : </span>
                                  <strong className={theme.text}>{h.service}</strong>
                                  {h.chef && <span className={theme.textLight}> — Chef : {h.chef}</span>}
                                </p>
                              )}
                              
                              {h.motif && (
                                <p>
                                  <span className={theme.textMuted}>Motif : </span>
                                  <span className={
                                    h.action.includes("definitive")
                                      ? "text-rose-500 font-semibold"
                                      : "text-amber-500 font-semibold"
                                  }>
                                    {h.motif}
                                  </span>
                                </p>
                              )}
                              
                              {h.champsModifies && (
                                <p>
                                  <span className={theme.textMuted}>Champs modifiés : </span>
                                  <span className="text-violet-500">{h.champsModifies}</span>
                                </p>
                              )}
                              
                              {h.nbEmployes !== undefined && h.nbEmployes !== null && (
                                <p>
                                  <span className={theme.textMuted}>Employés concernés : </span>
                                  <span>{h.nbEmployes}</span>
                                </p>
                              )}
                              
                              {h.nbServices !== undefined && h.nbServices !== null && (
                                <p>
                                  <span className={theme.textMuted}>Services : </span>
                                  <span>{h.nbServices}</span>
                                </p>
                              )}
                              
                              {h.occupantsRestants !== undefined && h.occupantsRestants !== null && (
                                <p>
                                  <span className={theme.textMuted}>Occupants restants : </span>
                                  <span>{h.occupantsRestants}</span>
                                </p>
                              )}
                              
                              {h.occupantsApres !== undefined && h.occupantsApres !== null && (
                                <p>
                                  <span className={theme.textMuted}>Occupants après : </span>
                                  <span className="text-emerald-500">{h.occupantsApres}</span>
                                </p>
                              )}
                              
                              {h.logementId && (
                                <p>
                                  <span className={theme.textMuted}>Logement : </span>
                                  <span className={theme.textLight}>{h.logementId}</span>
                                </p>
                              )}
                              
                              <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                                {h.date} à {h.heure}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
        {/* ═══════════════════════════════════════════════════════════════════ */}
=======
        </Modal>
      )}

      {modal === "add-service" && (
        <Modal
          title={`Ajouter un service — ${departments.find((d) => d.code === serviceTarget?.deptCode)?.name}`}
          onClose={closeModal}
          onConfirm={confirmAddService}
          confirmDisabled={!serviceForm.name.trim()}
          isDark={isDark}
        >
          <InputField
            label="Nom du service"
            value={serviceForm.name}
            onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))}
            placeholder="Ex : Contrôle qualité"
            isDark={isDark}
          />
          <InputField
            label="Chef de service"
            value={serviceForm.chef}
            onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))}
            placeholder="Ex : Marie Dupont"
            isDark={isDark}
          />
        </Modal>
      )}

      {modal === "edit-service" && (
        <Modal
          title="Modifier le service"
          onClose={closeModal}
          onConfirm={confirmEditService}
          confirmLabel="Enregistrer"
          confirmDisabled={!serviceForm.name.trim()}
          isDark={isDark}
        >
          <InputField
            label="Nom du service"
            value={serviceForm.name}
            onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))}
            placeholder="Nom du service"
            isDark={isDark}
          />
          <InputField
            label="Chef de service"
            value={serviceForm.chef}
            onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))}
            placeholder="Chef de service"
            isDark={isDark}
          />
        </Modal>
      )}

      {modal === "add-employe" && (
        <Modal
          title="Ajouter un employé"
          onClose={closeModal}
          onConfirm={confirmAddEmploye}
          confirmDisabled={!empForm.prenom.trim() || !empForm.nom.trim()}
          isDark={isDark}
          size="lg"
        >
          <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-white/10" : "bg-gradient-to-r from-emerald-50 to-blue-50 border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.text}`}>
                  Nouvel employé
                </p>
                <p className={`text-xs ${theme.textLight}`}>
                  Tous les champs * sont obligatoires
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <User className="w-3 h-3" /> Identité *
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Prénom
                  </label>
                  <input
                    value={empForm.prenom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, prenom: e.target.value }))
                    }
                    placeholder="Jean"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nom
                  </label>
                  <input
                    value={empForm.nom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, nom: e.target.value }))
                    }
                    placeholder="Rakoto"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Briefcase className="w-3 h-3" /> Informations professionnelles
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Catégorie
                  </label>
                  <select
                    value={empForm.categorie}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, categorie: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {CATEGORIES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Ancienneté (ans) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={empForm.anciennete === 0 ? "" : empForm.anciennete}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        anciennete:
                          e.target.value === ""
                            ? 0
                            : Math.min(35, Math.max(0, Number(e.target.value))),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                  <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                    Plafond : 35 ans (retraite d'ancienneté)
                  </p>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nb enfants <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={empForm.nb_enfants === 0 ? "" : empForm.nb_enfants}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        nb_enfants:
                          e.target.value === ""
                            ? 0
                            : Math.min(5, Math.max(0, Number(e.target.value))),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                  <p className={`text-[10px] mt-1 ${theme.textLight}`}>
                    Plafond : 5 enfants (allocations familiales)
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Heart className="w-3 h-3" /> Situation familiale
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Situation
                  </label>
                  <select
                    value={empForm.situation}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, situation: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {SITUATIONS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Salaire (Ar) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={empForm.salaire === 0 ? "" : empForm.salaire}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        salaire:
                          e.target.value === ""
                            ? 0
                            : Math.max(0, Number(e.target.value)),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${
                      empForm.salaire > 0 && empForm.salaire < 400000
                        ? "ring-2 ring-rose-500 border-rose-500"
                        : ""
                    } ${theme.input} ${theme.text}`}
                  />
                  <p
                    className={`text-[10px] mt-1 ${
                      empForm.salaire > 0 && empForm.salaire < 400000
                        ? "text-rose-500 font-semibold"
                        : theme.textLight
                    }`}
                  >
                    {empForm.salaire > 0 && empForm.salaire < 400000
                      ? `⚠️ Minimum 400 000 Ar — manque ${(400000 - empForm.salaire).toLocaleString()} Ar`
                      : "Minimum : 400 000 Ar (SMIG)"}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Mail className="w-3 h-3" /> Contact
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Email
                  </label>
                  <input
                    value={empForm.email}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@spat.mg"
                    type="email"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Téléphone
                  </label>
                  <input
                    value={empForm.telephone}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, telephone: e.target.value }))
                    }
                    placeholder="034 12 345 67"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  className={`text-[10px] font-semibold ${theme.textLight}`}
                >
                  Adresse
                </label>
                <input
                  value={empForm.adresse}
                  onChange={(e) =>
                    setEmpForm((p) => ({ ...p, adresse: e.target.value }))
                  }
                  placeholder="Antananarivo"
                  className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal === "edit-employe" && (
        <Modal
          title="Modifier un employé"
          onClose={closeModal}
          onConfirm={confirmEditEmploye}
          confirmDisabled={!empForm.prenom.trim() || !empForm.nom.trim()}
          confirmLabel="Enregistrer les modifications"
          isDark={isDark}
          size="lg"
        >
          <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 border-white/10" : "bg-gradient-to-r from-blue-50 to-violet-50 border-gray-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center shadow-lg">
                <Pencil className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme.text}`}>
                  Modifier {empForm.prenom} {empForm.nom}
                </p>
                <p className={`text-xs ${theme.textLight}`}>
                  Matricule : {empForm.matricule}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <User className="w-3 h-3" /> Identité *
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Prénom
                  </label>
                  <input
                    value={empForm.prenom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, prenom: e.target.value }))
                    }
                    placeholder="Jean"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nom
                  </label>
                  <input
                    value={empForm.nom}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, nom: e.target.value }))
                    }
                    placeholder="Rakoto"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Briefcase className="w-3 h-3" /> Informations professionnelles
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Catégorie
                  </label>
                  <select
                    value={empForm.categorie}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, categorie: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {CATEGORIES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Ancienneté (ans)
                  </label>
                  <input
                    type="number"
                    value={empForm.anciennete === 0 ? "" : empForm.anciennete}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        anciennete:
                          e.target.value === ""
                            ? 0
                            : Math.min(35, Math.max(0, Number(e.target.value))),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Nb enfants
                  </label>
                  <input
                    type="number"
                    value={empForm.nb_enfants === 0 ? "" : empForm.nb_enfants}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        nb_enfants:
                          e.target.value === ""
                            ? 0
                            : Math.min(5, Math.max(0, Number(e.target.value))),
                      }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Heart className="w-3 h-3" /> Situation familiale
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Situation
                  </label>
                  <select
                    value={empForm.situation}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, situation: e.target.value }))
                    }
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  >
                    {SITUATIONS.map((s) => (
                      <option
                        key={s}
                        value={s}
                        className={isDark ? "bg-gray-900" : "bg-white"}
                      >
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Salaire (Ar)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={empForm.salaire}
                    onChange={(e) =>
                      setEmpForm((p) => ({
                        ...p,
                        salaire: Math.max(0, Number(e.target.value)),
                      }))
                    }
                    placeholder="400000"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${theme.textLight}`}
              >
                <Mail className="w-3 h-3" /> Contact
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Email
                  </label>
                  <input
                    value={empForm.email}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@spat.mg"
                    type="email"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
                <div>
                  <label
                    className={`text-[10px] font-semibold ${theme.textLight}`}
                  >
                    Téléphone
                  </label>
                  <input
                    value={empForm.telephone}
                    onChange={(e) =>
                      setEmpForm((p) => ({ ...p, telephone: e.target.value }))
                    }
                    placeholder="034 12 345 67"
                    className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label
                  className={`text-[10px] font-semibold ${theme.textLight}`}
                >
                  Adresse
                </label>
                <input
                  value={empForm.adresse}
                  onChange={(e) =>
                    setEmpForm((p) => ({ ...p, adresse: e.target.value }))
                  }
                  placeholder="Antananarivo"
                  className={`w-full mt-1 px-3 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/50 transition-all ${theme.input} ${theme.text}`}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}

      {modal === "detail-employe" && detailData && (
        <ModalDetailEmployeERP
          employe={detailData.emp}
          dept={detailData.dept}
          service={detailData.service}
          onClose={closeModal}
          onEdit={() => {
            closeModal();
            setTimeout(() => {
              openEditEmploye(
                detailData.dept.code,
                detailData.service.id,
                detailData.emp,
              );
            }, 150);
          }}
          onDelete={() => {
            setDesactiverModal({
              deptCode: detailData.dept.code,
              serviceId: detailData.service.id,
              employe: detailData.emp,
            });
            closeModal();
          }}
          isDark={isDark}
        />
      )}

      {besoinModal && (
        <Modal
          title={`Besoin logement — ${besoinModal.serviceName}`}
          onClose={annulerBesoin}
          onConfirm={confirmerBesoin}
          confirmLabel={serviceLoge ? "Fermer" : "Envoyer la demande"}
          confirmDisabled={serviceLoge}
          isDark={isDark}
        >
          {serviceLoge ? (
            <div
              className={`p-4 rounded-xl border ${isDark ? "bg-emerald-500/10 border-emerald-500/20" : "bg-emerald-50 border-emerald-200"}`}
            >
              <div className="flex items-center gap-3">
                <Home
                  className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`}
                />
                <div>
                  <p
                    className={`text-sm font-semibold ${isDark ? "text-emerald-300" : "text-emerald-700"}`}
                  >
                    Ce service dispose déjà d'un logement
                  </p>
                  <p
                    className={`text-xs ${isDark ? "text-emerald-200/60" : "text-emerald-600"}`}
                  >
                    Aucune action requise.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-3 rounded-xl border ${isDark ? "bg-amber-500/10 border-amber-500/20" : "bg-amber-50 border-amber-200"}`}
              >
                <p
                  className={`text-sm ${isDark ? "text-amber-300" : "text-amber-700"}`}
                >
                  <AlertTriangle className="w-4 h-4 inline mr-1" />
                  Département : <strong>{besoinModal.deptName}</strong>
                </p>
                <p
                  className={`text-xs mt-1 ${isDark ? "text-amber-200/60" : "text-amber-600"}`}
                >
                  Service : {besoinModal.serviceName}
                </p>
              </div>

              <div>
                <label
                  className={`text-xs font-semibold uppercase tracking-wide ${theme.textSubtle}`}
                >
                  Type de logement requis
                </label>
                <select
                  value={typeLogementRequis}
                  onChange={(e) => setTypeLogementRequis(e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-xl mt-1 focus:outline-none focus:border-[#C9A84C] transition-all ${theme.input} ${theme.text}`}
                >
                  {["Studio", "F2", "F3", "F4"].map((t) => (
                    <option
                      key={t}
                      value={t}
                      className={isDark ? "bg-gray-900" : "bg-white"}
                    >
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <p className={`text-xs ${theme.textLight}`}>
                Une alerte sera envoyée au module Attributions pour traitement.
              </p>
            </div>
          )}
        </Modal>
      )}

      {desactiverModal && desactiverModal.employe && (
        <Modal
          title="Désactiver l'employé"
          onClose={() => {
            setDesactiverModal(null);
            setMotifDesactivation(null);
            setTypeMotifActif("definitif");
          }}
          onConfirm={async () => {
            if (!motifDesactivation) {
              alert("Veuillez sélectionner un motif de désactivation.");
              return;
            }

            const emp = desactiverModal.employe;

            await desactiverEmploye(
              desactiverModal.deptId,
              desactiverModal.serviceId,
              emp?.id ?? emp,
              motifDesactivation?.label,
              motifDesactivation?.type,
            );

            // Retire l'employé des occupants du logement
            const attLiee = attributions.find(
              (a) =>
                String(a.service_id) === String(desactiverModal.serviceId) &&
                a.statut !== "Terminé" &&
                a.statut !== "Maintenance",
            );
            if (attLiee) {
              const nomComplet = `${emp?.prenom} ${emp?.nom}`.trim();
              const nouveauxOccupants = (attLiee.occupants || []).filter(
                (o) => o !== nomComplet,
              );
              await synchroniserOccupantsAttribution(
                desactiverModal.serviceId,
                nouveauxOccupants,
              );
            }

            setDesactiverModal(null);
            setMotifDesactivation(null);
            setTypeMotifActif("definitif");
          }}
          confirmDisabled={!motifDesactivation}
          confirmLabel={
            motifDesactivation?.type === "definitif"
              ? "Confirmer la désactivation définitive"
              : "Confirmer la désactivation temporaire"
          }
          isDark={isDark}
        >
          <div
            className={`p-4 rounded-2xl border mb-4 ${isDark ? "bg-rose-500/10 border-rose-500/20" : "bg-rose-50 border-rose-200"}`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg">
                <UserX className="w-6 h-6 text-white" />
              </div>
              <div>
                <p
                  className={`text-sm font-bold ${isDark ? "text-rose-300" : "text-rose-700"}`}
                >
                  {desactiverModal.employe.prenom} {desactiverModal.employe.nom}
                </p>
                <p className={`text-xs ${theme.textLight}`}>
                  Matricule: {desactiverModal.employe.matricule}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div
              className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <label
                className={`text-[10px] font-bold uppercase tracking-wider mb-3 block ${theme.textLight}`}
              >
                Type de désactivation *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setTypeMotifActif("definitif");
                    setMotifDesactivation(null);
                  }}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    typeMotifActif === "definitif"
                      ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg"
                      : isDark
                        ? "bg-white/5 text-white/60 hover:bg-white/10"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Définitive
                </button>
                <button
                  onClick={() => {
                    setTypeMotifActif("temporaire");
                    setMotifDesactivation(null);
                  }}
                  className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    typeMotifActif === "temporaire"
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                      : isDark
                        ? "bg-white/5 text-white/60 hover:bg-white/10"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Temporaire
                </button>
              </div>
            </div>

            <div
              className={`p-3 rounded-xl border ${isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"}`}
            >
              <label
                className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${theme.textLight}`}
              >
                {typeMotifActif === "definitif"
                  ? "Motif définitif *"
                  : "Motif temporaire *"}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(typeMotifActif === "definitif"
                  ? MOTIFS_DEFINITIFS
                  : MOTIFS_TEMPORAIRES
                ).map((motif) => (
                  <button
                    key={motif.label}
                    onClick={() => setMotifDesactivation(motif)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                      motifDesactivation?.label === motif.label
                        ? typeMotifActif === "definitif"
                          ? "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg"
                          : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                        : isDark
                          ? "bg-white/5 text-white/60 hover:bg-white/10"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {motif.label}
                  </button>
                ))}
              </div>
            </div>

            {motifDesactivation && (
              <div
                className={`p-3 rounded-xl border ${
                  motifDesactivation.type === "definitif"
                    ? isDark
                      ? "bg-rose-500/10 border-rose-500/20"
                      : "bg-rose-50 border-rose-200"
                    : isDark
                      ? "bg-amber-500/10 border-amber-500/20"
                      : "bg-amber-50 border-amber-200"
                }`}
              >
                <p
                  className={`text-xs flex items-start gap-2 ${
                    motifDesactivation.type === "definitif"
                      ? isDark
                        ? "text-rose-300"
                        : "text-rose-700"
                      : isDark
                        ? "text-amber-300"
                        : "text-amber-700"
                  }`}
                >
                  {motifDesactivation.type === "definitif" ? (
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>
                    <strong>{motifDesactivation.label}</strong> —{" "}
                    {motifDesactivation.type === "definitif"
                      ? "Cette désactivation est irréversible. L'employé ne pourra pas être réactivé."
                      : "Cette désactivation est réversible. L'employé pourra être réactivé ultérieurement."}
                  </span>
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}

      
      {/* SECTION HISTORIQUE RH */}
     
      <div className="mt-8">
        <div
          onClick={() => setShowHistorique((v) => !v)}
          className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] ${
            isDark
              ? "bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-white/10 hover:bg-white/5"
              : "bg-gradient-to-r from-white to-gray-50 border-gray-200 shadow-lg hover:shadow-xl"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isDark ? "bg-[#C9A84C]/20" : "bg-[#C9A84C]/10"
              }`}
            >
              <FileText
                className={`w-5 h-5 ${isDark ? "text-[#C9A84C]" : "text-[#a88a3c]"}`}
              />
            </div>
            <div>
              <h3 className={`text-base font-bold ${theme.text}`}>
                Historique des actions RH
              </h3>
              <p className={`text-xs ${theme.textLight}`}>
                {historiqueRH.length} événement
                {historiqueRH.length > 1 ? "s" : ""} enregistré
                {historiqueRH.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showHistorique && (
              <>
                <div className="hidden md:flex gap-1.5 mr-3">
                  {[
                    { key: "tous", label: "Tous" },
                    { key: "desactivation", label: "Désactivations" },
                    { key: "reactivation", label: "Réactivations" },
                    { key: "ajout", label: "Ajouts" },
                    { key: "suppression", label: "Suppressions" },
                    { key: "modification", label: "Modifications" },
                  ].map((f) => (
                    <button
                      key={f.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFiltreHistorique(f.key);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        filtreHistorique === f.key
                          ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white"
                          : isDark
                            ? "bg-white/5 text-white/50 hover:bg-white/10"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="md:hidden relative mr-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuHistoriqueOuvert(!menuHistoriqueOuvert);
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                      isDark
                        ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <SquareMenu className="w-3 h-3" />
                    {(() => {
                      const labels = {
                        tous: "Tous",
                        desactivation: "Désactivations",
                        reactivation: "Réactivations",
                        ajout: "Ajouts",
                        suppression: "Suppressions",
                        modification: "Modifications",
                      };
                      return labels[filtreHistorique];
                    })()}
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${menuHistoriqueOuvert ? "rotate-180" : ""}`}
                    />
                  </button>

                  {menuHistoriqueOuvert && (
                    <div
                      className={`absolute top-full right-0 mt-1.5 w-44 rounded-xl border shadow-xl z-30 overflow-hidden ${
                        isDark
                          ? "bg-gray-900 border-white/10"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {[
                        { key: "tous", label: "Tous" },
                        { key: "desactivation", label: "Désactivations" },
                        { key: "reactivation", label: "Réactivations" },
                        { key: "ajout", label: "Ajouts" },
                        { key: "suppression", label: "Suppressions" },
                        { key: "modification", label: "Modifications" },
                      ].map((f) => (
                        <button
                          key={f.key}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFiltreHistorique(f.key);
                            setMenuHistoriqueOuvert(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2 ${
                            filtreHistorique === f.key
                              ? isDark
                                ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                                : "bg-amber-50 text-amber-700"
                              : isDark
                                ? "text-white/70 hover:bg-white/5"
                                : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {filtreHistorique === f.key && (
                            <Check className="w-3 h-3" />
                          )}
                          <span
                            className={
                              filtreHistorique === f.key ? "font-bold" : ""
                            }
                          >
                            {f.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <div
              className={`transition-transform duration-300 ${showHistorique ? "rotate-180" : ""}`}
            >
              <ChevronDown size={16} className={theme.textLight} />
            </div>
          </div>
        </div>

        {menuHistoriqueOuvert && (
          <div
            className="fixed inset-0 z-20"
            onClick={() => setMenuHistoriqueOuvert(false)}
          />
        )}

        {showHistorique && (
          <div
            className={`mt-3 rounded-2xl border overflow-hidden max-h-[500px] overflow-y-auto ${
              isDark
                ? "bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-white/10"
                : "bg-white border-gray-200 shadow-lg"
            }`}
          >
            {historiqueRH.length === 0 ? (
              <div className={`p-8 text-center ${theme.textLight}`}>
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucun événement enregistré</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {historiqueRH
                  .filter((h) => {
                    if (filtreHistorique === "tous") return true;
                    if (filtreHistorique === "desactivation")
                      return h.action.includes("desactivation");
                    if (filtreHistorique === "reactivation")
                      return h.action === "reactivation";
                    if (filtreHistorique === "ajout")
                      return h.action.includes("ajout");
                    if (filtreHistorique === "suppression")
                      return h.action.includes("suppression");
                    if (filtreHistorique === "modification")
                      return h.action.includes("modification");
                    return true;
                  })
                  .map((h) => {
                    const Icon = getHistoriqueIcon(h.action);
                    const colorClass = getHistoriqueColor(h.action, isDark);
                    return (
                      <div
                        key={h.id}
                        className={`flex items-start gap-3 p-4 transition-all hover:bg-white/5 ${
                          isDark ? "hover:bg-white/5" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                        >
                          <Icon size={16} strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-bold ${theme.text}`}>
                              {getHistoriqueLabel(h.action)}
                            </span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full ${colorClass}`}
                            >
                              {h.heure}
                            </span>
                          </div>

                          <div className={`mt-1 text-xs ${theme.textSubtle}`}>
                            {h.action.includes("employe") && h.employe && (
                              <p>
                                <span className={theme.textMuted}>
                                  Employé :{" "}
                                </span>
                                <strong className={theme.text}>
                                  {h.employe}
                                </strong>
                                {h.matricule && (
                                  <span className={theme.textLight}>
                                    {" "}
                                    ({h.matricule})
                                  </span>
                                )}
                              </p>
                            )}

                            {h.action.includes("departement") &&
                              h.departement && (
                                <p>
                                  <span className={theme.textMuted}>
                                    Département :{" "}
                                  </span>
                                  <strong className={theme.text}>
                                    {h.departement}
                                  </strong>
                                  {h.departementCode && (
                                    <span className={theme.textLight}>
                                      {" "}
                                      ({h.departementCode})
                                    </span>
                                  )}
                                </p>
                              )}

                            {h.action.includes("service") && h.service && (
                              <p>
                                <span className={theme.textMuted}>
                                  Service :{" "}
                                </span>
                                <strong className={theme.text}>
                                  {h.service}
                                </strong>
                                {h.chef && (
                                  <span className={theme.textLight}>
                                    {" "}
                                    — Chef : {h.chef}
                                  </span>
                                )}
                              </p>
                            )}

                            {h.motif && (
                              <p>
                                <span className={theme.textMuted}>
                                  Motif :{" "}
                                </span>
                                <span
                                  className={
                                    h.action.includes("definitive")
                                      ? "text-rose-500 font-semibold"
                                      : "text-amber-500 font-semibold"
                                  }
                                >
                                  {h.motif}
                                </span>
                              </p>
                            )}

                            {h.champsModifies && (
                              <p>
                                <span className={theme.textMuted}>
                                  Champs modifiés :{" "}
                                </span>
                                <span className="text-violet-500">
                                  {h.champsModifies}
                                </span>
                              </p>
                            )}

                            {h.nbEmployes !== undefined &&
                              h.nbEmployes !== null && (
                                <p>
                                  <span className={theme.textMuted}>
                                    Employés concernés :{" "}
                                  </span>
                                  <span>{h.nbEmployes}</span>
                                </p>
                              )}

                            {h.nbServices !== undefined &&
                              h.nbServices !== null && (
                                <p>
                                  <span className={theme.textMuted}>
                                    Services :{" "}
                                  </span>
                                  <span>{h.nbServices}</span>
                                </p>
                              )}

                            {h.occupantsRestants !== undefined &&
                              h.occupantsRestants !== null && (
                                <p>
                                  <span className={theme.textMuted}>
                                    Occupants restants :{" "}
                                  </span>
                                  <span>{h.occupantsRestants}</span>
                                </p>
                              )}

                            {h.occupantsApres !== undefined &&
                              h.occupantsApres !== null && (
                                <p>
                                  <span className={theme.textMuted}>
                                    Occupants après :{" "}
                                  </span>
                                  <span className="text-emerald-500">
                                    {h.occupantsApres}
                                  </span>
                                </p>
                              )}

                            {h.logementId && (
                              <p>
                                <span className={theme.textMuted}>
                                  Logement :{" "}
                                </span>
                                <span className={theme.textLight}>
                                  {h.logementId}
                                </span>
                              </p>
                            )}

                            <p
                              className={`text-[10px] mt-1 ${theme.textLight}`}
                            >
                              {h.date} à {h.heure}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
    </div>
  );
}
