import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
// ❌ 'useSuccessMessage' supprimé - non utilisé directement, on garde juste MessageEnvoye
import { MessageEnvoye } from "../components/BoutonsAction";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  // ❌ 'AlertTriangle' supprimé - non utilisé
  DollarSign, 
  Layers,
  Receipt,
  // ❌ 'ArrowUpRight' supprimé - non utilisé
  // ❌ 'ArrowDownRight' supprimé - non utilisé
  Activity,
  Search,
  Plus,
  Building2,
  // ❌ 'ChevronRight' supprimé - non utilisé
  Eye,      
  Pencil,   
  Trash2,   
  Check,
  X,
  FileText,
  Calendar,
  User,
  Package,
  BarChart3,
  PieChart,
  Target,
  Clock // ✅ Ajouté - manquant ligne 841
} from "lucide-react";

const CATEGORIES  = ["Tous","Travaux","Matériaux","Finition","Électricité","Plomberie","Menuiserie","Autre"];
const STATUTS     = ["Tous","En attente","Validé","Rejeté"];
const FOURNISSEURS = ["TRANO MORA","BATIMA","SOCOBAT","MATÉRIAUX PLUS"];
const BUDGET_GLOBAL = 20000000;

function fmt(n) { 
  return new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(n).replace("MGA", "Ar");
}

// ============================================
// HOOKS D'ANIMATION (même style que Materiaux)
// ============================================
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
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }
  };
}

// ============================================
// DÉTECTION DU THÈME (même système que Materiaux)
// ============================================
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

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
  }
};

// ============================================
// CARTE STATISTIQUE 3D (même style que Materiaux)
// ============================================
function StatCard3D({ icon: Icon, label, value, subValue, trend, trendValue, color, delay = 0, isDark }) {
  const animatedValue = useCountUp(value);
  const { style } = useReveal(delay);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const gradients = {
    blue: theme.statBlue,
    emerald: theme.statEmerald,
    rose: theme.statRose,
    amber: theme.statAmber,
    violet: theme.statViolet
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

// ============================================
// JAUGE CIRCULAIRE 3D
// ============================================
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

// ============================================
// BARRE DE PROGRESSION ANIMÉE
// ============================================
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
          <span className={theme.textLight}>{fmt(value)}</span>
          <span className={`font-semibold ${theme.textMuted}`}>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
}

// ============================================
// CARTE DÉPENSE 3D (style MateriauCard)
// ============================================
function DepenseCard3D({ depense, onDetail, onEdit, onDelete, onValider, onRejeter, index, isDark }) {
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const statutConfig = {
    "Validé": { 
      bg: isDark ? 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/30' : 'from-emerald-100 to-emerald-50 border-emerald-300',
      icon: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
      badge: isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 border-emerald-300'
    },
    "En attente": { 
      bg: isDark ? 'from-amber-500/10 to-amber-600/5 border-amber-500/30' : 'from-amber-100 to-amber-50 border-amber-300',
      icon: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600',
      badge: isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-600 border-amber-300'
    },
    "Rejeté": { 
      bg: isDark ? 'from-rose-500/10 to-rose-600/5 border-rose-500/30' : 'from-rose-100 to-rose-50 border-rose-300',
      icon: isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600',
      badge: isDark ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-rose-100 text-rose-600 border-rose-300'
    }
  };

  const config = statutConfig[depense.statut] || statutConfig["En attente"];

  return (
    <div style={style} className="group relative">
      <div className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${isDark ? 'bg-amber-500/10' : 'bg-amber-400/20'} group-hover:translate-y-4 group-hover:blur-xl`} />
      <div className={`relative bg-gradient-to-br ${config.bg} backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${isDark ? '' : 'shadow-lg'}`}>
        
        {/* Header avec icône et actions */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${config.icon}`}>
            <Receipt className="w-7 h-7" />
          </div>
          
          {/* Actions au survol */}
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

        {/* Contenu */}
        <div className="space-y-3">
          <div>
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>{depense.id}</p>
            <h3 className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors line-clamp-1 ${theme.text}`}>
              {depense.description}
            </h3>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
              {depense.statut}
            </span>
          </div>

          {/* Montant et info */}
          <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-gray-200/20">
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Montant</p>
              <p className="text-2xl font-black text-[#C9A84C]">{fmt(depense.montant)}</p>
            </div>
            <div>
              <p className={`text-xs mb-1 ${theme.textSubtle}`}>Catégorie</p>
              <p className={`text-sm font-semibold ${theme.text}`}>{depense.categorie}</p>
            </div>
          </div>

          {/* Métadonnées */}
          <div className="flex items-center justify-between text-xs">
            <span className={theme.textLight}>{depense.date}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-200 text-gray-600'}`}>
              {depense.logement}
            </span>
          </div>

          {/* Fournisseur */}
          <div className={`flex items-center gap-2 p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            <Package className={`w-4 h-4 ${theme.textSubtle}`} />
            <span className={`text-xs ${theme.textMuted}`}>{depense.fournisseur}</span>
          </div>

          {/* Boutons d'action rapide pour En attente */}
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

        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </div>
  );
}

// ============================================
// GRAPHIQUE 3D AMÉLIORÉ
// ============================================
function Graphique3D({ depenses, isDark }) {
  const parMois = {};
  depenses.forEach(d => {
    if (d.statut === "Validé") {
      const mois = d.date.split("/").slice(1).join("/");
      parMois[mois] = (parMois[mois] || 0) + d.montant;
    }
  });
  
  const data = Object.entries(parMois).slice(-6);
  const max = Math.max(...data.map(d => d[1]), 1);
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500/5 to-transparent' : 'from-blue-50 to-transparent'} opacity-50`} />
      
      <div className="relative z-10">
        <h3 className={`font-bold mb-1 flex items-center gap-2 ${theme.text}`}>
          <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
          Évolution des dépenses
        </h3>
        <p className={`text-xs mb-5 ${theme.textSubtle}`}>Par mois — en Ariary (validées uniquement)</p>
        
        {data.length > 0 ? (
          <div className="flex items-end gap-3 h-40">
            {data.map(([mois, montant], i) => (
              <div key={mois} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full">
                  {/* Tooltip */}
                  <div className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${isDark ? 'bg-white/10 text-white' : 'bg-gray-800 text-white'}`}>
                    {fmt(montant)}
                  </div>
                  {/* Barre */}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out group-hover:brightness-110 ${isDark ? 'bg-gradient-to-t from-[#0F2D56] to-[#C9A84C]' : 'bg-gradient-to-t from-blue-600 to-blue-400'}`} 
                    style={{ 
                      height: `${(montant/max)*120}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                </div>
                <span className={`text-xs ${theme.textLight}`}>{mois}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={`flex flex-col items-center justify-center h-40 ${theme.textSubtle}`}>
            <BarChart3 className="w-12 h-12 mb-2 opacity-30" />
            <p className="text-sm">Aucune donnée validée</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SUIVI BUDGET 3D AMÉLIORÉ
// ============================================
function SuiviBudget3D({ depenses, isDark }) {
  const valides = depenses.filter(d => d.statut === "Validé");
  const total = valides.reduce((s, d) => s + d.montant, 0);
  const pctGlobal = Math.min((total / BUDGET_GLOBAL) * 100, 100);
  const theme = isDark ? THEMES.dark : THEMES.light;

  // Calcul par catégorie
  const parCategorie = {};
  valides.forEach(d => {
    parCategorie[d.categorie] = (parCategorie[d.categorie] || 0) + d.montant;
  });

  return (
    <div className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-emerald-500/5 to-transparent' : 'from-emerald-50 to-transparent'} opacity-50`} />
      
      <div className="relative z-10 space-y-6">
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${theme.text}`}>
          <Target className="w-5 h-5 text-[#C9A84C]" />
          Suivi budgétaire
        </h3>

        {/* Budget Global avec jauge circulaire */}
        <div className="flex items-center gap-6">
          <CircularGauge value={total} max={BUDGET_GLOBAL} size={100} color={pctGlobal >= 90 ? "#f43f5e" : pctGlobal >= 70 ? "#f59e0b" : "#10b981"} label="Budget global" isDark={isDark} />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-2">
              <span className={`font-semibold ${theme.text}`}>Budget global annuel</span>
              <span className={theme.textMuted}>{fmt(total)} / {fmt(BUDGET_GLOBAL)}</span>
            </div>
            <AnimatedProgress value={total} max={BUDGET_GLOBAL} color={pctGlobal >= 90 ? "rose" : pctGlobal >= 70 ? "amber" : "emerald"} isDark={isDark} />
            <p className={`text-xs mt-1 font-semibold ${pctGlobal >= 90 ? 'text-rose-500' : pctGlobal >= 70 ? 'text-amber-500' : 'text-emerald-500'}`}>
              {pctGlobal.toFixed(1)}% utilisé
            </p>
          </div>
        </div>

        {/* Répartition par catégorie */}
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wide mb-3 ${theme.textLight}`}>Par catégorie</p>
          <div className="space-y-3">
            {Object.entries(parCategorie)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 5)
              .map(([cat, montant], i) => {
                const pct = (montant / total) * 100 || 0;
                const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500'];
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <div className={`w-2 h-8 rounded-full ${colors[i % colors.length]}`} />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`font-medium ${theme.text}`}>{cat}</span>
                        <span className={theme.textMuted}>{fmt(montant)} ({pct.toFixed(0)}%)</span>
                      </div>
                      <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className={`h-1.5 rounded-full ${colors[i % colors.length]} transition-all duration-1000`} style={{ width: `${pct}%` }} />
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

// ============================================
// MODAL DÉTAIL 3D
// ============================================
function ModalDetail3D({ depense, onClose, isDark }) {
  if (!depense) return null;
  const theme = isDark ? THEMES.dark : THEMES.light;

  const statutStyles = {
    "Validé": isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-100 text-emerald-700 border-emerald-300",
    "En attente": isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-100 text-amber-700 border-amber-300",
    "Rejeté": isDark ? "bg-rose-500/20 text-rose-400 border-rose-500/30" : "bg-rose-100 text-rose-700 border-rose-300"
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-md border overflow-hidden animate-in zoom-in-95 duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        
        {/* Header */}
        <div className={`relative px-6 py-6 border-b ${isDark ? 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-white/10' : 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200'}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-white/5' : 'bg-blue-200/50'}`} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>{depense.id}</p>
              <h2 className={`text-xl font-black ${theme.text}`}>{depense.description}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${statutStyles[depense.statut]}`}>
                {depense.statut}
              </span>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-4">
          {[ 
            ["Montant", fmt(depense.montant), DollarSign],
            ["Logement", depense.logement, Building2],
            ["Catégorie", depense.categorie, Layers],
            ["Fournisseur", depense.fournisseur, Package],
            ["Date", depense.date, Calendar],
            ["Département", depense.departement, User]
          ].map(([label, value, Icon]) => (
            <div key={label} className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <Icon className={`w-5 h-5 ${theme.textSubtle}`} />
                </div>
                <span className={`text-sm ${theme.textSubtle}`}>{label}</span>
              </div>
              <span className={`font-semibold ${theme.text}`}>{value}</span>
            </div>
          ))}
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

// ============================================
// MODAL FORMULAIRE 3D
// ============================================
function ModalForm3D({ depense, logements, tousLesDepartements, onClose, onSave, isDark }) {
  const [form, setForm] = useState(depense || {
    description: "", montant: 0,
    logement: logements[0]?.id || "LOG-001",
    categorie: "Travaux",
    fournisseur: "TRANO MORA",
    date: new Date().toLocaleDateString("fr-FR"),
    statut: "En attente",
    departement: tousLesDepartements[0]?.nom || "",
  });
  
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-lg border p-6 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-xl font-bold ${theme.text}`}>{depense ? "Modifier la dépense" : "Nouvelle dépense"}</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Description</label>
            <input 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })}
              className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              placeholder="Description de la dépense..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Montant (Ar)</label>
              <input 
                type="number"
                value={form.montant} 
                onChange={e => setForm({ ...form, montant: Number(e.target.value) })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              />
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Catégorie</label>
              <select 
                value={form.categorie} 
                onChange={e => setForm({ ...form, categorie: e.target.value })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              >
                {CATEGORIES.filter(c => c !== "Tous").map(c => <option key={c} className={isDark ? "bg-gray-900" : "bg-white"}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Logement</label>
              <select 
                value={form.logement} 
                onChange={e => setForm({ ...form, logement: e.target.value })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              >
                {logements.map(l => <option key={l.id} value={l.id} className={isDark ? "bg-gray-900" : "bg-white"}>{l.id} — {l.type}</option>)}
              </select>
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Département</label>
              <select 
                value={form.departement} 
                onChange={e => setForm({ ...form, departement: e.target.value })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              >
                {tousLesDepartements.map(d => (
                  <option key={d.id} value={d.nom} className={isDark ? "bg-gray-900" : "bg-white"}>
                    {d.type === "service" ? `↳ ${d.nom}` : d.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Fournisseur</label>
            <select 
              value={form.fournisseur} 
              onChange={e => setForm({ ...form, fournisseur: e.target.value })}
              className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
            >
              {FOURNISSEURS.map(f => <option key={f} className={isDark ? "bg-gray-900" : "bg-white"}>{f}</option>)}
            </select>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Statut</label>
            <div className="flex gap-2 mt-1">
              {["En attente", "Validé", "Rejeté"].map(s => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, statut: s })}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    form.statut === s 
                      ? s === "Validé" ? "bg-emerald-500 text-white" : s === "Rejeté" ? "bg-rose-500 text-white" : "bg-amber-500 text-white"
                      : isDark ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className={`flex-1 py-3 rounded-xl transition ${theme.buttonSecondary}`}>Annuler</button>
          <button 
            onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition"
          >
            {depense ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function Depenses() {
  const { depenses, logements, tousLesDepartements, ajouterDepense, modifierDepense, supprimerDepense, validerDepense, rejeterDepense } = useApp();
  const [filtreCat, setFiltreCat] = useState("Tous");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const isDark = useDarkMode();
  // ✅ Correction ligne 735 : utiliser useSuccessMessage depuis AppContext ou créer un hook local
  // Si useSuccessMessage n'est pas exporté depuis BoutonsAction, on simule ici :
  const [successActif, setSuccessActif] = useState(false);
  const triggerSuccess = () => {
    setSuccessActif(true);
    setTimeout(() => setSuccessActif(false), 2000);
  };

  // Calculs statistiques
  const valides = depenses.filter(d => d.statut === "Validé");
  const totalValide = valides.reduce((s, d) => s + d.montant, 0);
  const totalAttente = depenses.filter(d => d.statut === "En attente").reduce((s, d) => s + d.montant, 0);
  const totalRejete = depenses.filter(d => d.statut === "Rejeté").reduce((s, d) => s + d.montant, 0);
  const totalGeneral = depenses.reduce((s, d) => s + d.montant, 0);
  
  // Nouvelles stats
  const nbDepenses = depenses.length;
  const moyenneDepense = nbDepenses > 0 ? Math.round(totalGeneral / nbDepenses) : 0;
  const tauxValidation = nbDepenses > 0 ? Math.round((valides.length / nbDepenses) * 100) : 0;

  const filtered = depenses.filter(d =>
    (filtreCat === "Tous" || d.categorie === filtreCat) &&
    (filtreStatut === "Tous" || d.statut === filtreStatut) &&
    (d.description.toLowerCase().includes(search.toLowerCase()) ||
     d.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
     d.logement.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (form) => {
    if (formData) modifierDepense(form);
    else { ajouterDepense(form); triggerSuccess(); }
    setFormData(null); setIsAdding(false);
  };

  const handleExport = () => {
    const lignes = [
      ["ID","Description","Montant","Logement","Département","Catégorie","Fournisseur","Date","Statut"],
      ...filtered.map(d => [d.id, d.description, d.montant, d.logement, d.departement, d.categorie, d.fournisseur, d.date, d.statut])
    ];
    const csv = lignes.map(l => l.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "depenses_spat.csv"; a.click();
  };

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

      {detail && <ModalDetail3D depense={detail} onClose={() => setDetail(null)} isDark={isDark} />}
      {(formData || isAdding) && (
        <ModalForm3D
          depense={formData}
          logements={logements}
          tousLesDepartements={tousLesDepartements}
          onClose={() => { setFormData(null); setIsAdding(false); }}
          onSave={handleSave}
          isDark={isDark}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-black ${theme.text}`}>Gestion des Dépenses</h1>
          <p className={theme.textSubtle}>Suivi budgétaire et validation des dépenses</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Nouvelle dépense
        </button>
      </div>

      {/* Stats 3D Premium */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
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
          subValue={`${depenses.filter(d => d.statut === "En attente").length} en attente`}
          isDark={isDark}
        />
        <StatCard3D 
          icon={X} 
          label="Rejetées" 
          value={totalRejete} 
          color="rose" 
          delay={300}
          subValue={`${depenses.filter(d => d.statut === "Rejeté").length} rejetées`}
          isDark={isDark}
        />
      </div>

      {/* Stats secondaires */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Moyenne/dépense", value: moyenneDepense, icon: PieChart },
          { label: "Taux validation", value: `${tauxValidation}%`, icon: Activity, isText: true },
          { label: "Fournisseurs", value: FOURNISSEURS.length, icon: Package },
          { label: "Catégories", value: CATEGORIES.length - 1, icon: Layers }
        ].map((stat) => (
          <div key={stat.label} className={`relative rounded-xl border backdrop-blur-sm p-4 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                <stat.icon className={`w-5 h-5 ${theme.textSubtle}`} />
              </div>
              <div>
                <p className={`text-lg font-bold ${theme.text}`}>{stat.isText ? stat.value : (typeof stat.value === 'number' ? fmt(stat.value) : stat.value)}</p>
                <p className={`text-xs ${theme.textSubtle}`}>{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Graphique3D depenses={depenses} isDark={isDark} />
        <SuiviBudget3D depenses={depenses} isDark={isDark} />
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          {STATUTS.map(s => (
            <button 
              key={s} 
              onClick={() => setFiltreStatut(s)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${filtreStatut === s 
                ? s === "Validé" ? "bg-emerald-500 text-white shadow-lg" : s === "Rejeté" ? "bg-rose-500 text-white shadow-lg" : s === "En attente" ? "bg-amber-500 text-white shadow-lg" : "bg-[#0F2D56] text-white shadow-lg"
                : `${theme.textSubtle} hover:${theme.text} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          {CATEGORIES.slice(0, 5).map(c => (
            <button 
              key={c} 
              onClick={() => setFiltreCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${filtreCat === c 
                ? "bg-[#0F2D56] text-white shadow-lg" 
                : `${theme.textSubtle} hover:${theme.text} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}`}
            >
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
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <p className={theme.textLight}>{filtered.length} dépense{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>

      {/* Grille de cartes 3D */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((d, index) => (
          <DepenseCard3D 
            key={d.id}
            depense={d}
            onDetail={() => setDetail(d)}
            onEdit={() => setFormData(d)}
            onDelete={() => supprimerDepense(d.id)}
            onValider={() => validerDepense(d.id)}
            onRejeter={() => rejeterDepense(d.id)}
            index={index}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Tableau récapitulatif */}
      {filtered.length > 0 && (
        <div className={`backdrop-blur-sm border rounded-3xl p-6 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h3 className={`text-lg font-bold mb-4 flex items-center gap-2 ${theme.text}`}>
            <Activity className="w-5 h-5 text-[#C9A84C]" />
            Dernières transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  {["Réf", "Description", "Montant", "Statut", "Date", ""].map(h => (
                    <th key={h} className={`text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 5).map((d) => (
                  <tr key={d.id} className={`border-b transition group ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                    <td className={`py-3 px-4 font-mono text-xs ${theme.textLight}`}>{d.id}</td>
                    <td className={`py-3 px-4 font-semibold ${theme.text}`}>{d.description}</td>
                    <td className="py-3 px-4 font-black text-[#C9A84C]">{fmt(d.montant)}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                        d.statut === "Validé" ? (isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 border-emerald-300') :
                        d.statut === "Rejeté" ? (isDark ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-rose-100 text-rose-600 border-rose-300') :
                        (isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-600 border-amber-300')
                      }`}>
                        {d.statut}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-xs ${theme.textSubtle}`}>{d.date}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button onClick={() => setDetail(d)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}>
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => setFormData(d)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}>
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
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