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
  Activity,
  Search,
  Plus,
  Warehouse,
  ChevronRight,
  Eye,      
  Pencil,   
  Trash2,        
} from "lucide-react";

const CATEGORIES = ["Tous","Couverture","Revêtement","Maçonnerie","Finition","Électricité","Plomberie","Menuiserie"];
const FOURNISSEURS = [
  { id: "FOU-001", nom: "TRANO MORA" },
  { id: "FOU-002", nom: "BATIMA" },
  { id: "FOU-003", nom: "SOCOBAT" },
  { id: "FOU-004", nom: "MATÉRIAUX PLUS" },
];

// Format en Ariary (Ar)
function fmt(n) { 
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n).replace("MGA", "Ar");
}

// Hook animation compteur
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

// Hook reveal animation
function useReveal(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return {
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }
  };
}

// ============================================
// THÈME CLAIR/SOMBRE - Détection automatique
// ============================================
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Observer les changements de classe sur <html>
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Écouter aussi l'événement custom si tu en dispatch un
    const handleThemeChange = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('themechange', handleThemeChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  return isDark;
}

// Toggle manuel du thème (optionnel - pour debug ou override)

// ============================================
// CONFIGURATION DES COULEURS PAR THÈME
// ============================================
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
  }
};

// Composant Carte Stat 3D avec thème auto
function StatCard3D({ icon: Icon, label, value, subValue, trend, trendValue, color, delay = 0, isDark }) {
  const animatedValue = useCountUp(value);
  const { style } = useReveal(delay);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const gradients = {
    blue: theme.statBlue,
    emerald: theme.statEmerald,
    rose: theme.statRose,
    amber: theme.statAmber,
    violet: isDark ? "from-violet-500/20 to-violet-600/5 border-violet-500/30" : "from-violet-100 to-violet-50 border-violet-200"
  };
  
  const iconColors = {
    blue: isDark ? "bg-blue-500 text-white" : "bg-blue-500 text-white",
    emerald: isDark ? "bg-emerald-500 text-white" : "bg-emerald-500 text-white",
    rose: isDark ? "bg-rose-500 text-white" : "bg-rose-500 text-white",
    amber: isDark ? "bg-amber-500 text-white" : "bg-amber-500 text-white",
    violet: isDark ? "bg-violet-500 text-white" : "bg-violet-500 text-white"
  };

  return (
    <div style={style} className="group relative">
      <div className={`absolute inset-0 rounded-2xl transform translate-y-2 blur-sm group-hover:translate-y-3 transition-transform duration-300 ${isDark ? 'bg-black/20' : 'bg-gray-400/20'}`} />
      <div className={`relative bg-gradient-to-br ${gradients[color]} backdrop-blur-sm border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02] ${isDark ? 'border-opacity-30' : 'shadow-lg'}`}>
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl group-hover:opacity-100 transition-all duration-500 ${isDark ? 'bg-white/10' : 'bg-white/50'}`} />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${iconColors[color]} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
              <Icon className="w-6 h-6" />
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' 
                ? (isDark ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500 text-white') 
                : (isDark ? 'bg-rose-100 text-rose-600' : 'bg-rose-500 text-white')}`}>
                {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {trendValue}%
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className={`text-3xl font-black tracking-tight drop-shadow-lg ${theme.text}`}>
              {animatedValue.toLocaleString()}
            </p>
            <p className={`text-sm font-medium ${theme.textSubtle}`}>{label}</p>
            {subValue && <p className={`text-xs ${theme.textLight}`}>{subValue}</p>}
          </div>
        </div>
        <div className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${isDark ? 'border-white/0 group-hover:border-white/20' : 'border-gray-200/0 group-hover:border-gray-300'}`} />
      </div>
    </div>
  );
}

// Jauge circulaire 3D avec thème
function CircularGauge({ value, max, size = 120, color = "#10b981", label, isDark }) {
  const circumference = 2 * Math.PI * (size / 2 - 10);
  const offset = circumference - (Math.min(value / max, 1) * circumference);
  const percentage = Math.round((value / max) * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div className={`absolute inset-2 rounded-full blur-md transform translate-y-2 ${isDark ? 'bg-black/20' : 'bg-gray-300/30'}`} />
        <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
          <circle cx={size/2} cy={size/2} r={size/2 - 10} fill="none" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="8" />
          <defs>
            <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle cx={size/2} cy={size/2} r={size/2 - 10} fill="none" stroke={`url(#grad-${color})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 10px ${color}50)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-black drop-shadow-lg ${theme.text}`}>{percentage}%</span>
        </div>
      </div>
      <p className={`mt-2 text-xs font-semibold uppercase tracking-wider ${theme.textSubtle}`}>{label}</p>
    </div>
  );
}

// Barre de progression animée avec thème
function AnimatedProgress({ value, max, color = "emerald", showValue = true, isDark }) {
  const percentage = Math.min((value / max) * 100, 100);
  const isLow = percentage < 30;
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  return (
    <div className="space-y-2">
      <div className={`h-3 rounded-full overflow-hidden backdrop-blur-sm border ${isDark ? 'bg-gray-700/50 border-white/10' : 'bg-gray-200 border-gray-300'}`}>
        <div className={`h-full rounded-full transition-all duration-1000 ease-out relative ${isLow ? 'bg-rose-500' : `bg-${color}-500`}`} style={{ width: `${percentage}%`, boxShadow: `0 0 20px ${isLow ? '#f43f5e' : '#10b981'}80` }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      {showValue && (
        <div className="flex justify-between text-xs">
          <span className={theme.textLight}>{value} unités</span>
          <span className={`font-semibold ${theme.textMuted}`}>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

// Carte matériau 3D avec thème auto
function MateriauCard({ materiau, onDetail, onEdit, onDelete, index, isDark }) {
  const valeurStock = materiau.stock * materiau.prix;
  const alerte = materiau.stock <= materiau.seuil;
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  return (
    <div style={style} className="group relative">
      <div className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${alerte 
        ? (isDark ? 'bg-rose-500/20' : 'bg-rose-400/30') 
        : (isDark ? 'bg-emerald-500/10' : 'bg-emerald-400/20')} group-hover:translate-y-4 group-hover:blur-xl`} />
      <div className={`relative bg-gradient-to-br ${alerte 
        ? (isDark ? 'from-rose-500/10 to-rose-600/5 border-rose-500/30' : 'from-rose-100 to-rose-50 border-rose-300') 
        : theme.card} backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${isDark ? '' : 'shadow-lg'}`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${alerte 
            ? (isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600') 
            : (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}`}>
            <Box className="w-7 h-7" />
          </div>
          {/* ============================================
              BOUTONS D'ACTION - APPARAISSENT AU SURVOL
              👁️ Eye    = Voir détails (ModalDetail)
              ✏️ Pencil = Modifier (ModalFormMateriau)  
              🗑️ Trash2 = Supprimer (supprimerMateriau)
              ============================================ */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={onDetail} 
              title="Voir détails 👁️"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark 
                ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700'}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={onEdit} 
              title="Modifier ✏️"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark 
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700'}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={onDelete} 
              title="Supprimer 🗑️"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark 
                ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 hover:text-rose-300' 
                : 'bg-rose-100 hover:bg-rose-200 text-rose-600 hover:text-rose-700'}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>{materiau.id}</p>
            <h3 className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors line-clamp-1 ${theme.text}`}>{materiau.nom}</h3>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-600'}`}>
              {materiau.categorie}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200/20">
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Stock</p>
              <p className={`text-2xl font-black ${alerte 
                ? (isDark ? 'text-rose-400' : 'text-rose-600') 
                : (isDark ? 'text-emerald-400' : 'text-emerald-600')}`}>
                {materiau.stock}<span className={`text-sm font-normal ml-1 ${theme.textLight}`}>{materiau.unite}</span>
              </p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Valeur</p>
              <p className="text-lg font-bold text-[#C9A84C]">{fmt(valeurStock)}</p>
            </div>
          </div>
          <AnimatedProgress value={materiau.stock} max={materiau.seuil * 3} color={alerte ? "rose" : "emerald"} isDark={isDark} />
          <div className="flex items-center justify-between text-xs">
            <span className={theme.textLight}>Seuil: {materiau.seuil} {materiau.unite}</span>
            {alerte && (
              <span className={`flex items-center gap-1 font-semibold animate-pulse ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                <AlertTriangle className="w-3 h-3" />
                Stock critique
              </span>
            )}
          </div>
          <div className="flex items-end gap-1 h-8 mt-2">
            {[...Array(5)].map((_, i) => {
              const height = Math.random() * 60 + 20;
              return <div key={i} className={`flex-1 rounded-t-sm hover:bg-[#C9A84C]/60 transition-colors ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} style={{ height: `${height}%` }} />;
            })}
          </div>
        </div>
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </div>
  );
}

// Modal Détail amélioré avec thème auto
function ModalDetail({ materiau, mouvements, onClose, isDark }) {
  if (!materiau) return null;
  const mvts = mouvements.filter(m => m.materiau === materiau.nom);
  const totalEntrees = mvts.filter(m => m.type === "Entrée").reduce((s, m) => s + m.quantite, 0);
  const totalSorties = mvts.filter(m => m.type === "Sortie").reduce((s, m) => s + m.quantite, 0);
  const valeurStock = materiau.stock * materiau.prix;
  const alerte = materiau.stock <= materiau.seuil;
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-2xl border overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        <div className={`relative px-6 py-6 border-b ${alerte 
          ? (isDark ? 'bg-gradient-to-r from-rose-600/20 to-rose-500/10 border-rose-500/30' : 'bg-gradient-to-r from-rose-100 to-rose-50 border-rose-200') 
          : (isDark ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border-white/10' : 'bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-200')}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-white/5' : 'bg-gray-200/50'}`} />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${alerte 
                ? (isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600') 
                : (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600')}`}>
                <Box className="w-8 h-8" />
              </div>
              <div>
                <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>{materiau.id}</p>
                <h2 className={`text-2xl font-black ${theme.text}`}>{materiau.nom}</h2>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-white/10 text-white/80' : 'bg-gray-200 text-gray-700'}`}>
                  {materiau.categorie}
                </span>
              </div>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className={`border rounded-2xl p-4 text-center ${isDark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                <ArrowUpRight className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              </div>
              <p className={`text-2xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+{totalEntrees}</p>
              <p className={theme.textSubtle}>Entrées</p>
            </div>
            <div className={`border rounded-2xl p-4 text-center ${isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${isDark ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                <ArrowDownRight className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
              </div>
              <p className={`text-2xl font-black ${isDark ? 'text-rose-500' : 'text-rose-600'}`}>-{totalSorties}</p>
              <p className={theme.textSubtle}>Sorties</p>
            </div>
            <div className={`border rounded-2xl p-4 text-center ${alerte 
              ? (isDark ? 'bg-rose-500/10 border-rose-500/20' : 'bg-rose-50 border-rose-200') 
              : (isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200')}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${alerte 
                ? (isDark ? 'bg-rose-500/20' : 'bg-rose-100') 
                : (isDark ? 'bg-blue-500/20' : 'bg-blue-100')}`}>
                <Layers className={`w-5 h-5 ${alerte 
                  ? (isDark ? 'text-rose-400' : 'text-rose-600') 
                  : (isDark ? 'text-blue-400' : 'text-blue-600')}`} />
              </div>
              <p className={`text-2xl font-black ${alerte 
                ? (isDark ? 'text-rose-400' : 'text-rose-600') 
                : (isDark ? 'text-blue-400' : 'text-blue-600')}`}>{materiau.stock}</p>
              <p className={theme.textSubtle}>Stock actuel</p>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <CircularGauge value={materiau.stock} max={materiau.seuil * 3} size={140} color={alerte ? "#f43f5e" : "#10b981"} label="Niveau de stock" isDark={isDark} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[ ["Unité", materiau.unite], ["Seuil d'alerte", `${materiau.seuil} ${materiau.unite}`], ["Prix unitaire", fmt(materiau.prix)], ["Valeur stock", fmt(valeurStock)], ].map(([label, val]) => (
              <div key={label} className={`rounded-xl p-4 border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                <p className={`text-xs mb-1 ${theme.textLight}`}>{label}</p>
                <p className={`text-lg font-bold ${theme.text}`}>{val}</p>
              </div>
            ))}
          </div>

          <div>
            <p className={`text-sm font-bold mb-3 flex items-center gap-2 ${theme.text}`}>
              <Activity className="w-4 h-4 text-[#C9A84C]" />
              Historique des mouvements
            </p>
            {mvts.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mvts.map(m => (
                  <div key={m.id} className={`flex items-center justify-between rounded-xl px-4 py-3 border hover:opacity-80 transition ${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.type === "Entrée" 
                        ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') 
                        : (isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600')}`}>
                        {m.type === "Entrée" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${theme.text}`}>{m.type}</p>
                        <p className={`text-xs ${theme.textSubtle}`}>{m.logement}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${m.type === "Entrée" 
                        ? (isDark ? 'text-emerald-400' : 'text-emerald-600') 
                        : (isDark ? 'text-rose-400' : 'text-rose-600')}`}>
                        {m.type === "Entrée" ? '+' : '-'}{m.quantite}
                      </p>
                      <p className={`text-xs ${theme.textLight}`}>{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-sm text-center py-8 ${theme.textSubtle}`}>Aucun mouvement enregistré</p>
            )}
          </div>
        </div>

        <div className={`px-6 py-4 border-t ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
          <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// Modaux formulaires avec thème auto
function ModalFormMateriau({ materiau, onClose, onSave, isDark }) {
  const [form, setForm] = useState(materiau || { nom: "", categorie: "Couverture", stock: 0, seuil: 10, unite: "unités", prix: 0 });
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-md border p-6 animate-in zoom-in-95 duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-xl font-bold ${theme.text}`}>{materiau ? "Modifier" : "Ajouter un matériau"}</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>✕</button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Nom</label>
              <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Catégorie</label>
              <select value={form.categorie} onChange={e => setForm({ ...form, categorie: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}>
                {CATEGORIES.filter(c => c !== "Tous").map(c => <option key={c} className={isDark ? "bg-gray-900" : "bg-white"}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Stock</label>
              <input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: Number(e.target.value) })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Seuil</label>
              <input type="number" value={form.seuil} onChange={e => setForm({ ...form, seuil: Number(e.target.value) })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Unité</label>
              <input value={form.unite} onChange={e => setForm({ ...form, unite: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Prix (Ar)</label>
              <input type="number" value={form.prix} onChange={e => setForm({ ...form, prix: Number(e.target.value) })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className={`flex-1 py-2.5 rounded-xl transition ${theme.buttonSecondary}`}>Annuler</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition">
            {materiau ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalMouvement({ onClose, onSave, materiaux, logements, isDark }) {
  const [form, setForm] = useState({
    materiau: materiaux[0]?.nom || "",
    type: "Entrée",
    quantite: 1,
    date: new Date().toLocaleDateString("fr-FR"),
    logement: logements[0]?.id || "LOG-001",
    fournisseur: "TRANO MORA",
  });
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-md border p-6 animate-in zoom-in-95 duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-xl font-bold ${theme.text}`}>Nouveau mouvement</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>✕</button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Matériau</label>
            <select value={form.materiau} onChange={e => setForm({ ...form, materiau: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}>
              {materiaux.map(m => <option key={m.id} className={isDark ? "bg-gray-900" : "bg-white"}>{m.nom}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}>
                <option className={isDark ? "bg-gray-900" : "bg-white"}>Entrée</option>
                <option className={isDark ? "bg-gray-900" : "bg-white"}>Sortie</option>
              </select>
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Quantité</label>
              <input type="number" min="1" value={form.quantite} onChange={e => setForm({ ...form, quantite: Number(e.target.value) })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`} />
            </div>
          </div>
          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Logement</label>
            <select value={form.logement} onChange={e => setForm({ ...form, logement: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}>
              {logements.map(l => <option key={l.id} className={isDark ? "bg-gray-900" : "bg-white"} value={l.id}>{l.id} — {l.type}</option>)}
            </select>
          </div>
          {form.type === "Entrée" && (
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Fournisseur</label>
              <select value={form.fournisseur} onChange={e => setForm({ ...form, fournisseur: e.target.value })} className={`w-full mt-1 px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}>
                {FOURNISSEURS.map(f => <option key={f.id} className={isDark ? "bg-gray-900" : "bg-white"}>{f.nom}</option>)}
              </select>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className={`flex-1 py-2.5 rounded-xl transition ${theme.buttonSecondary}`}>Annuler</button>
          <button onClick={() => { onSave(form); onClose(); }} className={`flex-1 py-2.5 text-white rounded-xl font-semibold transition hover:shadow-lg ${form.type === "Entrée" ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/25' : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-rose-500/25'}`}>
            Enregistrer {form.type === "Entrée" ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Page principale avec thème auto-détecté
export default function Materiaux() {
  const { materiaux, mouvements, logements, ajouterMateriau, modifierMateriau, supprimerMateriau, ajouterMouvement } = useApp();
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showMvt, setShowMvt] = useState(false);
  
  // 🌓 Détection automatique du thème via classe 'dark' sur <html>
  const isDark = useDarkMode();
  
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const alertes = materiaux.filter(m => m.stock <= m.seuil);
  const valeurTotale = materiaux.reduce((s, m) => s + m.stock * m.prix, 0);
  
  const totalMouvements = mouvements.length;
  const totalEntreesGlobal = mouvements.filter(m => m.type === "Entrée").reduce((s, m) => s + m.quantite, 0);
  const totalSortiesGlobal = mouvements.filter(m => m.type === "Sortie").reduce((s, m) => s + m.quantite, 0);

  const filtered = materiaux.filter(m =>
    (filtre === "Tous" || m.categorie === filtre) &&
    m.nom.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (formData) modifierMateriau(form);
    else { ajouterMateriau(form); triggerSuccess(); }
    setFormData(null); setIsAdding(false);
  };

  const handleMouvement = (mvt) => { ajouterMouvement(mvt); triggerSuccess(); };

  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`min-h-screen bg-gradient-to-br p-6 space-y-6 transition-colors duration-500 ${theme.bg}`}>
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

      {detail && <ModalDetail materiau={detail} mouvements={mouvements} onClose={() => setDetail(null)} isDark={isDark} />}
      {showMvt && <ModalMouvement materiaux={materiaux} logements={logements} onClose={() => setShowMvt(false)} onSave={handleMouvement} isDark={isDark} />}
      {(formData || isAdding) && (
        <ModalFormMateriau materiau={formData}
          onClose={() => { setFormData(null); setIsAdding(false); }}
          onSave={handleSave} 
          isDark={isDark} />
      )}

      {/* Header avec toggle manuel optionnel */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-black ${theme.text}`}>Gestion des Matériaux</h1>
          <p className={theme.textSubtle}>Suivi des stocks et mouvements</p>
        </div>
        
      </div>

      {/* Stats 3D */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* Alertes */}
      {alertes.length > 0 && (
        <div className={`relative overflow-hidden border rounded-2xl p-4 backdrop-blur-sm animate-in slide-in-from-top-4 duration-500 ${isDark 
          ? 'bg-gradient-to-r from-rose-500/20 to-amber-500/20 border-rose-500/30' 
          : 'bg-gradient-to-r from-rose-100 to-amber-100 border-rose-300'}`}>
          <div className={`absolute inset-0 animate-pulse ${isDark ? 'bg-gradient-to-r from-rose-500/10 to-transparent' : 'bg-gradient-to-r from-rose-200/50 to-transparent'}`} />
          <div className="relative flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center animate-bounce ${isDark ? 'bg-rose-500/20' : 'bg-rose-200'}`}>
              <AlertTriangle className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${isDark ? 'text-rose-200' : 'text-rose-700'}`}>⚠ Stock bas — réapprovisionnement nécessaire</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {alertes.map(m => (
                  <span key={m.id} className={`px-3 py-1 rounded-lg text-xs font-semibold ${isDark 
                    ? 'bg-rose-500/20 border border-rose-500/30 text-rose-200' 
                    : 'bg-rose-200 border border-rose-300 text-rose-700'}`}>
                    {m.nom} — {m.stock} {m.unite}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFiltre(c)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${filtre === c 
                ? "bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white shadow-lg shadow-amber-500/20" 
                : `${theme.textSubtle} hover:${theme.text} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}`}>
              {c}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme.textLight}`} />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Rechercher..." 
              className={`pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-[#C9A84C] transition w-56 ${theme.input} ${theme.text}`}
            />
          </div>
          <button onClick={() => setShowMvt(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition hover:scale-105">
            <TrendingUp className="w-4 h-4" />
            Mouvement
          </button>
          <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition hover:scale-105">
            <Plus className="w-4 h-4" />
            Matériau
          </button>
        </div>
      </div>

      <p className={theme.textLight}>{filtered.length} matériau{filtered.length > 1 ? "x" : ""} trouvé{filtered.length > 1 ? "s" : ""}</p>

      {/* Grille de cartes 3D */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((m, index) => (
          <MateriauCard 
            key={m.id} 
            materiau={m} 
            onDetail={() => setDetail(m)}
            onEdit={() => setFormData(m)}
            onDelete={() => supprimerMateriau(m.id)}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Historique des mouvements */}
      <div className={`backdrop-blur-sm border rounded-3xl p-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center">
              <Warehouse className="w-5 h-5 text-[#C9A84C]" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${theme.text}`}>Historique des mouvements</h3>
              <p className={theme.textSubtle}>{mouvements.length} mouvements enregistrés</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <span className={`flex items-center gap-2 font-semibold px-3 py-1.5 rounded-lg ${isDark ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-100'}`}>
              <ArrowUpRight className="w-4 h-4" />
              {totalEntreesGlobal} entrées
            </span>
            <span className={`flex items-center gap-2 font-semibold px-3 py-1.5 rounded-lg ${isDark ? 'text-rose-400 bg-rose-500/10' : 'text-rose-600 bg-rose-100'}`}>
              <ArrowDownRight className="w-4 h-4" />
              {totalSortiesGlobal} sorties
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                {["Réf", "Matériau", "Type", "Quantité", "Logement", "Date"].map(h => (
                  <th key={h} className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mouvements.slice(0, 10).map((m) => (
                <tr key={m.id} className={`border-b transition group ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <td className={`py-3 px-4 font-mono text-xs ${theme.textLight}`}>{m.id}</td>
                  <td className={`py-3 px-4 font-semibold group-hover:text-[#C9A84C] transition ${theme.text}`}>{m.materiau}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${m.type === "Entrée" 
                      ? (isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600') 
                      : (isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600')}`}>
                      {m.type === "Entrée" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {m.type}
                    </span>
                  </td>
                  <td className={`py-3 px-4 font-black ${theme.text}`}>{m.quantite}</td>
                  <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>{m.logement}</td>
                  <td className={`py-3 px-4 text-xs ${theme.textLight}`}>{m.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {mouvements.length > 10 && (
          <button className={`w-full mt-4 py-3 text-sm rounded-xl transition flex items-center justify-center gap-2 ${isDark ? 'text-white/50 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
            Voir tous les mouvements
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}