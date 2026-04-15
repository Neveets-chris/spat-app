import { useState, useEffect, useMemo } from "react";
import { useApp } from "../context/AppContext";
//import StatutBadge from "../components/StatutBadge";
import { 
  MessageEnvoye, 
  useSuccessMessage 
} from "../components/BoutonsAction";
import { 
  Home, 
  Users, 
  Building2, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  MapPin,
  
  PieChart,
  Activity,

  BedDouble,

  MoreHorizontal,
  Sparkles
} from "lucide-react";

const FILTRES = ["Tous", "Occupé", "Disponible", "Maintenance"];

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
// DÉTECTION DU THÈME
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
    cardOccupied: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/30",
    cardAvailable: "from-blue-500/10 to-blue-600/5 border-blue-500/30",
    cardMaintenance: "from-amber-500/10 to-amber-600/5 border-amber-500/30",
    text: "text-white",
    textMuted: "text-white/70",
    textSubtle: "text-white/50",
    textLight: "text-white/40",
    border: "border-white/10",
    input: "bg-white/5 border-white/10",
    buttonSecondary: "border-white/20 text-white/70 hover:bg-white/5",
    statBlue: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    statEmerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
    statAmber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    statViolet: "from-violet-500/20 to-violet-600/5 border-violet-500/30",
  },
  light: {
    bg: "from-gray-50 via-gray-100 to-blue-50",
    card: "from-white to-gray-50",
    cardOccupied: "from-emerald-100 to-emerald-50 border-emerald-300",
    cardAvailable: "from-blue-100 to-blue-50 border-blue-300",
    cardMaintenance: "from-amber-100 to-amber-50 border-amber-300",
    text: "text-gray-900",
    textMuted: "text-gray-700",
    textSubtle: "text-gray-500",
    textLight: "text-gray-400",
    border: "border-gray-200",
    input: "bg-white border-gray-300",
    buttonSecondary: "border-gray-300 text-gray-600 hover:bg-gray-100",
    statBlue: "from-blue-100 to-blue-50 border-blue-200",
    statEmerald: "from-emerald-100 to-emerald-50 border-emerald-200",
    statAmber: "from-amber-100 to-amber-50 border-amber-200",
    statViolet: "from-violet-100 to-violet-50 border-violet-200",
  }
};

// ============================================
// CARTE STATISTIQUE 3D
// ============================================
function StatCard3D({ icon: Icon, label, value, subValue, trend, trendValue, color, delay = 0, isDark, onClick }) {
  const animatedValue = useCountUp(value);
  const { style } = useReveal(delay);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const gradients = {
    blue: theme.statBlue,
    emerald: theme.statEmerald,
    amber: theme.statAmber,
    violet: theme.statViolet
  };
  
  const iconColors = {
    blue: isDark ? "bg-blue-500 text-white" : "bg-blue-500 text-white",
    emerald: isDark ? "bg-emerald-500 text-white" : "bg-emerald-500 text-white",
    amber: isDark ? "bg-amber-500 text-white" : "bg-amber-500 text-white",
    violet: isDark ? "bg-violet-500 text-white" : "bg-violet-500 text-white"
  };

  return (
    <div 
      style={style} 
      onClick={onClick}
      className={`group relative ${onClick ? 'cursor-pointer' : ''}`}
    >
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
              {typeof value === 'number' ? animatedValue.toLocaleString() : value}
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
function CircularGauge({ value, max, size = 100, color = "#10b981", label, isDark }) {
  const circumference = 2 * Math.PI * (size / 2 - 8);
  const offset = circumference - (Math.min(value / max, 1) * circumference);
  const percentage = Math.round((value / max) * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <div className={`absolute inset-2 rounded-full blur-md transform translate-y-2 ${isDark ? 'bg-black/20' : 'bg-gray-300/30'}`} />
        <svg className="transform -rotate-90 w-full h-full drop-shadow-xl">
          <circle cx={size/2} cy={size/2} r={size/2 - 8} fill="none" stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} strokeWidth="6" />
          <defs>
            <linearGradient id={`grad-gauge-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <circle cx={size/2} cy={size/2} r={size/2 - 8} fill="none" stroke={`url(#grad-gauge-${color})`} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 8px ${color}50)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-black drop-shadow-lg ${theme.text}`}>{percentage}%</span>
        </div>
      </div>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${theme.textSubtle}`}>{label}</p>
    </div>
  );
}

// ============================================
// CARTE ATTRIBUTION 3D
// ============================================
function AttributionCard3D({ attribution, onDetail, onEdit, onDelete, onTerminer, index, isDark }) {
  const { style } = useReveal(index * 100);
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const statutConfig = {
    "Occupé": { 
      bg: theme.cardOccupied,
      icon: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600',
      badge: isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 border-emerald-300',
      iconType: BedDouble
    },
    "Disponible": { 
      bg: theme.cardAvailable,
      icon: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600',
      badge: isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-600 border-blue-300',
      iconType: Home
    },
    "Maintenance": { 
      bg: theme.cardMaintenance,
      icon: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600',
      badge: isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-600 border-amber-300',
      iconType: AlertTriangle
    }
  };

  const config = statutConfig[attribution.statut] || statutConfig["Disponible"];
  const IconType = config.iconType;

  // Calculer la durée restante
  const joursRestants = useMemo(() => {
    if (!attribution.date_fin) return null;
    const fin = new Date(attribution.date_fin.split('/').reverse().join('-'));
    const aujourdhui = new Date();
    const diff = Math.ceil((fin - aujourdhui) / (1000 * 60 * 60 * 24));
    return diff;
  }, [attribution.date_fin]);

  return (
    <div style={style} className="group relative">
      <div className={`absolute inset-0 rounded-2xl transform translate-y-3 blur-lg transition-all duration-300 ${isDark ? 'bg-blue-500/10' : 'bg-blue-400/20'} group-hover:translate-y-4 group-hover:blur-xl`} />
      <div className={`relative bg-gradient-to-br ${config.bg} backdrop-blur-xl border rounded-2xl p-5 overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02] ${isDark ? '' : 'shadow-lg'}`}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${config.icon}`}>
            <IconType className="w-7 h-7" />
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={onDetail} 
              title="Voir détails"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark 
                ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300' 
                : 'bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-700'}`}
            >
              <Eye className="w-4 h-4" />
            </button>
            <button 
              onClick={onEdit} 
              title="Modifier"
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark 
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 hover:text-amber-300' 
                : 'bg-amber-100 hover:bg-amber-200 text-amber-600 hover:text-amber-700'}`}
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button 
              onClick={onDelete} 
              title="Supprimer"
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
            <p className={`text-xs font-mono mb-1 ${theme.textLight}`}>{attribution.id}</p>
            <h3 className={`text-lg font-bold group-hover:text-[#C9A84C] transition-colors line-clamp-1 ${theme.text}`}>
              {attribution.departement}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}>
                {attribution.statut}
              </span>
              {joursRestants !== null && joursRestants <= 30 && joursRestants > 0 && attribution.statut === "Occupé" && (
                <span className={`text-xs ${joursRestants <= 7 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`}>
                  {joursRestants}j restants
                </span>
              )}
            </div>
          </div>

          {/* Logement */}
          <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
            <MapPin className={`w-5 h-5 ${theme.textSubtle}`} />
            <div>
              <p className={`text-xs ${theme.textLight}`}>Logement</p>
              <p className={`font-semibold ${theme.text}`}>{attribution.logement}</p>
            </div>
          </div>

          {/* Période */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
              <p className={`text-xs ${theme.textLight}`}>Début</p>
              <p className={`text-sm font-semibold ${theme.text}`}>{attribution.date_debut}</p>
            </div>
            <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5' : 'bg-gray-100'}`}>
              <p className={`text-xs ${theme.textLight}`}>Fin</p>
              <p className={`text-sm font-semibold ${theme.text}`}>{attribution.date_fin}</p>
            </div>
          </div>

          {/* Occupants */}
          <div>
            <p className={`text-xs ${theme.textSubtle} mb-2`}>Occupants ({attribution.occupants.length})</p>
            <div className="flex flex-wrap gap-1">
              {attribution.occupants.length > 0 ? (
                <>
                  {attribution.occupants.slice(0, 3).map((o, i) => (
                    <span key={i} className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-white/10 text-white/80' : 'bg-gray-200 text-gray-700'}`}>
                      {o.split(' ')[0]}
                    </span>
                  ))}
                  {attribution.occupants.length > 3 && (
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${isDark ? 'bg-white/5 text-white/60' : 'bg-gray-100 text-gray-500'}`}>
                      +{attribution.occupants.length - 3}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-rose-400">Aucun occupant</span>
              )}
            </div>
          </div>

          {/* Actions rapides */}
          {attribution.statut === "Occupé" && (
            <button 
              onClick={onTerminer}
              className="w-full py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <X className="w-3 h-3" />
              Mettre fin à l'attribution
            </button>
          )}
        </div>

        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </div>
  );
}

// ============================================
// GRAPHIQUE D'OCCUPATION
// ============================================
function GraphiqueOccupation({ attributions, isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const data = useMemo(() => {
    const parMois = {};
    const moisLabels = [];
    const aujourdhui = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(aujourdhui.getFullYear(), aujourdhui.getMonth() - i, 1);
      const key = d.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
      moisLabels.push(key);
      parMois[key] = { entrants: 0, sortants: 0 };
    }

    attributions.forEach(a => {
      const dateDebut = new Date(a.date_debut.split('/').reverse().join('-'));
      const dateFin = a.date_fin ? new Date(a.date_fin.split('/').reverse().join('-')) : null;
      
      moisLabels.forEach(mois => {
        const [monthStr, yearStr] = mois.split(' ');
        const monthIndex = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'].indexOf(monthStr);
        const year = 2000 + parseInt(yearStr);
        
        if (monthIndex !== -1) {
          const moisDate = new Date(year, monthIndex, 15);
          if (dateDebut.getMonth() === moisDate.getMonth() && dateDebut.getFullYear() === moisDate.getFullYear()) {
            parMois[mois].entrants++;
          }
          if (dateFin && dateFin.getMonth() === moisDate.getMonth() && dateFin.getFullYear() === moisDate.getFullYear()) {
            parMois[mois].sortants++;
          }
        }
      });
    });

    return moisLabels.map(mois => ({ mois, ...parMois[mois] }));
  }, [attributions]);

  const max = Math.max(...data.map(d => Math.max(d.entrants, d.sortants)), 1);

  return (
    <div className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-violet-500/5 to-transparent' : 'from-violet-50 to-transparent'} opacity-50`} />
      
      <div className="relative z-10">
        <h3 className={`font-bold mb-1 flex items-center gap-2 ${theme.text}`}>
          <Activity className="w-5 h-5 text-[#C9A84C]" />
          Flux d'occupation
        </h3>
        <p className={`text-xs mb-5 ${theme.textSubtle}`}>Entrées et sorties par mois</p>
        
        <div className="flex items-end gap-2 h-40">
          {data.map((item, i) => (
            <div key={item.mois} className="flex-1 flex flex-col items-center gap-1">
              <div className="relative w-full flex items-end justify-center gap-1 h-32">
                {/* Barre entrants */}
                <div className="w-3 rounded-t bg-emerald-500 transition-all duration-1000" style={{ height: `${(item.entrants/max)*100}%` }} />
                {/* Barre sortants */}
                <div className="w-3 rounded-t bg-rose-500 transition-all duration-1000" style={{ height: `${(item.sortants/max)*100}%` }} />
              </div>
              <span className={`text-xs ${theme.textLight}`}>{item.mois}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className={`text-xs ${theme.textSubtle}`}>Entrées</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-rose-500" />
            <span className={`text-xs ${theme.textSubtle}`}>Sorties</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// RÉPARTITION PAR DÉPARTEMENT
// ============================================
function RepartitionDepartements({ attributions, departements, isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  
  const data = useMemo(() => {
    const counts = {};
    attributions.filter(a => a.statut === "Occupé").forEach(a => {
      counts[a.departement] = (counts[a.departement] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6);
  }, [attributions]);

  const max = Math.max(...data.map(([,count]) => count), 1);

  return (
    <div className={`relative rounded-2xl border backdrop-blur-sm p-6 overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500/5 to-transparent' : 'from-blue-50 to-transparent'} opacity-50`} />
      
      <div className="relative z-10">
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${theme.text}`}>
          <PieChart className="w-5 h-5 text-[#C9A84C]" />
          Occupation par département
        </h3>
        
        <div className="space-y-3">
          {data.map(([dept, count], i) => {
            const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500'];
            const pct = (count / max) * 100;
            return (
              <div key={dept} className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${colors[i % colors.length]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`font-medium truncate ${theme.text}`}>{dept}</span>
                    <span className={theme.textMuted}>{count} logement{count > 1 ? 's' : ''}</span>
                  </div>
                  <div className={`h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-1.5 rounded-full ${colors[i % colors.length]} transition-all duration-1000`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
          {data.length === 0 && (
            <p className={`text-sm text-center py-4 ${theme.textSubtle}`}>Aucune occupation active</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MODAL DÉTAIL 3D
// ============================================
function ModalDetail3D({ attribution, onClose, isDark }) {
  if (!attribution) return null;
  const theme = isDark ? THEMES.dark : THEMES.light;

  const statutStyles = {
    "Occupé": isDark ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-emerald-100 text-emerald-700 border-emerald-300",
    "Disponible": isDark ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-blue-100 text-blue-700 border-blue-300",
    "Maintenance": isDark ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-amber-100 text-amber-700 border-amber-300"
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-md border overflow-hidden animate-in zoom-in-95 duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        
        <div className={`relative px-6 py-6 border-b ${isDark ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border-white/10' : 'bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-200'}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl ${isDark ? 'bg-white/5' : 'bg-emerald-200/50'}`} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className={`font-mono text-xs mb-1 ${theme.textLight}`}>{attribution.id}</p>
              <h2 className={`text-2xl font-black ${theme.text}`}>{attribution.departement}</h2>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${statutStyles[attribution.statut]}`}>
                {attribution.statut}
              </span>
            </div>
            <button onClick={onClose} className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>
              <span className="text-xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[ 
            ["Logement", attribution.logement, Home],
            ["Date début", attribution.date_debut, Calendar],
            ["Date fin", attribution.date_fin, Clock],
            ["Observations", attribution.observations || "Aucune", Building2]
          ].map(([label, value, Icon]) => (
            <div key={label} className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                  <Icon className={`w-5 h-5 ${theme.textSubtle}`} />
                </div>
                <span className={`text-sm ${theme.textSubtle}`}>{label}</span>
              </div>
              <span className={`font-semibold ${theme.text} text-right max-w-[50%] truncate`}>{value}</span>
            </div>
          ))}

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`text-sm font-semibold mb-3 ${theme.text}`}>Occupants ({attribution.occupants.length})</p>
            {attribution.occupants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {attribution.occupants.map((o, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                    {o}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-400">Aucun occupant enregistré</p>
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

// ============================================
// MODAL FORMULAIRE 3D
// ============================================
function ModalForm3D({ attribution, logements, departements, onClose, onSave, isDark }) {
  const [form, setForm] = useState(attribution || {
    departement: departements[0]?.nom || "",
    logement: logements[0]?.id || "",
    date_debut: "", 
    date_fin: "",
    statut: "Disponible", 
    occupants: [], 
    observations: "",
  });
  const [occupant, setOccupant] = useState("");
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-lg border p-6 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-xl font-bold ${theme.text}`}>{attribution ? "Modifier l'attribution" : "Nouvelle attribution"}</h2>
          <button onClick={onClose} className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${isDark ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Département</label>
            <select 
              value={form.departement} 
              onChange={e => setForm({ ...form, departement: e.target.value })}
              className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
            >
              {departements.map(d => <option key={d.id} className={isDark ? "bg-gray-900" : "bg-white"}>{d.nom}</option>)}
            </select>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Logement</label>
            <select 
              value={form.logement} 
              onChange={e => setForm({ ...form, logement: e.target.value })}
              className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
            >
              {logements.map(l => <option key={l.id} value={l.id} className={isDark ? "bg-gray-900" : "bg-white"}>{l.id} — {l.type} ({l.statut})</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Date début</label>
              <input 
                type="date" 
                value={form.date_debut} 
                onChange={e => setForm({ ...form, date_debut: e.target.value })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              />
            </div>
            <div>
              <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Date fin</label>
              <input 
                type="date" 
                value={form.date_fin} 
                onChange={e => setForm({ ...form, date_fin: e.target.value })}
                className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              />
            </div>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Statut</label>
            <div className="flex gap-2 mt-1">
              {["Disponible", "Occupé", "Maintenance"].map(s => (
                <button
                  key={s}
                  onClick={() => setForm({ ...form, statut: s })}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                    form.statut === s 
                      ? s === "Occupé" ? "bg-emerald-500 text-white" : s === "Maintenance" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                      : isDark ? "bg-white/5 text-white/50 hover:bg-white/10" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Occupants</label>
            <div className="flex gap-2 mt-1">
              <input 
                value={occupant} 
                onChange={e => setOccupant(e.target.value)}
                onKeyDown={e => { 
                  if (e.key === "Enter" && occupant.trim()) { 
                    setForm({ ...form, occupants: [...form.occupants, occupant.trim()] }); 
                    setOccupant(""); 
                  }
                }}
                placeholder="Nom Prénom"
                className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition ${theme.input} ${theme.text}`}
              />
              <button 
                onClick={() => { 
                  if (occupant.trim()) { 
                    setForm({ ...form, occupants: [...form.occupants, occupant.trim()] }); 
                    setOccupant(""); 
                  }
                }}
                className="px-4 py-2 bg-[#0F2D56] text-white rounded-xl font-bold hover:bg-[#1a4a7a] transition"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.occupants.map((o, i) => (
                <span key={i} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold ${isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  {o}
                  <button 
                    onClick={() => setForm({ ...form, occupants: form.occupants.filter((_, idx) => idx !== i) })} 
                    className="text-rose-400 hover:text-rose-600 font-bold ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className={`text-xs font-semibold uppercase ${theme.textSubtle}`}>Observations</label>
            <textarea 
              value={form.observations} 
              onChange={e => setForm({ ...form, observations: e.target.value })} 
              rows={3}
              className={`w-full mt-1 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C9A84C] transition resize-none ${theme.input} ${theme.text}`}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className={`flex-1 py-3 rounded-xl transition ${theme.buttonSecondary}`}>Annuler</button>
          <button 
            onClick={() => { onSave(form); onClose(); }}
            className="flex-1 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition"
          >
            {attribution ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MODAL FIN 3D
// ============================================
function ModalFin3D({ attribution, onClose, onConfirm, isDark }) {
  if (!attribution) return null;
  const theme = isDark ? THEMES.dark : THEMES.light;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 animate-in fade-in duration-200 ${isDark ? 'bg-black/60' : 'bg-gray-900/40'}`}>
      <div className={`rounded-3xl shadow-2xl w-full max-w-sm border p-6 animate-in zoom-in-95 duration-300 ${isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-white/10' : 'bg-white border-gray-200'}`}>
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
            <AlertTriangle className={`w-8 h-8 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          </div>
          <h2 className={`text-xl font-bold ${theme.text}`}>Mettre fin à l'attribution</h2>
          <p className={`text-sm mt-2 ${theme.textSubtle}`}>
            <span className={`font-semibold ${theme.text}`}>{attribution.departement}</span> — <span className={`font-semibold ${theme.text}`}>{attribution.logement}</span>
          </p>
          <p className={`text-xs mt-3 ${theme.textLight}`}>Le logement sera remis en <span className="text-emerald-500 font-semibold">Disponible</span></p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className={`flex-1 py-3 rounded-xl transition ${theme.buttonSecondary}`}>Annuler</button>
          <button 
            onClick={() => { onConfirm(attribution.id); onClose(); }}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PAGE PRINCIPALE
// ============================================
export default function Attributions() {
  const { 
    attributions, 
    logements,
    tousLesDepartements: departements, 
    ajouterAttribution, 
    modifierAttribution, 
    terminerAttribution, 
    supprimerAttribution 
  } = useApp();
  
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [finData, setFinData] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "table"
  
  const isDark = useDarkMode();
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  // Calculs statistiques
  const stats = useMemo(() => {
    const total = attributions.length;
    const occupes = attributions.filter(a => a.statut === "Occupé").length;
    const disponibles = attributions.filter(a => a.statut === "Disponible").length;
    const maintenance = attributions.filter(a => a.statut === "Maintenance").length;
    const totalOccupants = attributions.reduce((sum, a) => sum + a.occupants.length, 0);
    const tauxOccupation = total > 0 ? Math.round((occupes / total) * 100) : 0;
    
    // Alertes : attributions qui expirent dans moins de 30 jours
    const alertes = attributions.filter(a => {
      if (a.statut !== "Occupé" || !a.date_fin) return false;
      const fin = new Date(a.date_fin.split('/').reverse().join('-'));
      const jours = Math.ceil((fin - new Date()) / (1000 * 60 * 60 * 24));
      return jours <= 30 && jours > 0;
    }).length;

    return { total, occupes, disponibles, maintenance, totalOccupants, tauxOccupation, alertes };
  }, [attributions]);

  const filtered = useMemo(() => {
    return attributions.filter(a =>
      (filtre === "Tous" || a.statut === filtre) &&
      (a.departement.toLowerCase().includes(search.toLowerCase()) ||
       a.logement.toLowerCase().includes(search.toLowerCase()) ||
       a.id.toLowerCase().includes(search.toLowerCase()))
    );
  }, [attributions, filtre, search]);

  const handleSave = (form) => {
    if (formData) modifierAttribution(form);
    else { 
      ajouterAttribution(form); 
      triggerSuccess(); 
    }
    setFormData(null); 
    setIsAdding(false);
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

      {detail && <ModalDetail3D attribution={detail} onClose={() => setDetail(null)} isDark={isDark} />}
      {finData && <ModalFin3D attribution={finData} onClose={() => setFinData(null)} onConfirm={terminerAttribution} isDark={isDark} />}
      {(formData || isAdding) && (
        <ModalForm3D
          attribution={formData}
          logements={logements}
          departements={departements}
          onClose={() => { setFormData(null); setIsAdding(false); }}
          onSave={handleSave}
          isDark={isDark}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-black ${theme.text}`}>Gestion des Attributions</h1>
          <p className={theme.textSubtle}>Attribution et suivi des logements</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#C9A84C] to-[#a88a3c] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Nouvelle attribution
        </button>
      </div>

      {/* Stats 3D Premium */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard3D 
          icon={Home} 
          label="Total attributions" 
          value={stats.total} 
          color="blue" 
          delay={0}
          subValue={`${stats.occupes} occupés`}
          isDark={isDark}
          onClick={() => setFiltre("Tous")}
        />
        <StatCard3D 
          icon={Users} 
          label="Taux d'occupation" 
          value={`${stats.tauxOccupation}%`} 
          color="emerald" 
          delay={100}
          trend={stats.tauxOccupation > 50 ? "up" : "down"}
          trendValue={stats.tauxOccupation}
          subValue={`${stats.totalOccupants} occupants`}
          isDark={isDark}
          onClick={() => setFiltre("Occupé")}
        />
        <StatCard3D 
          icon={CheckCircle2} 
          label="Disponibles" 
          value={stats.disponibles} 
          color="violet" 
          delay={200}
          subValue={`${stats.maintenance} en maintenance`}
          isDark={isDark}
          onClick={() => setFiltre("Disponible")}
        />
        <StatCard3D 
          icon={AlertTriangle} 
          label="Alertes" 
          value={stats.alertes} 
          color="amber" 
          delay={300}
          subValue="Expirent dans 30j"
          isDark={isDark}
        />
      </div>

      {/* Graphiques et répartition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraphiqueOccupation attributions={attributions} isDark={isDark} />
        <RepartitionDepartements attributions={attributions} departements={departements} isDark={isDark} />
      </div>

      {/* Jauge d'occupation */}
      <div className={`relative rounded-2xl border backdrop-blur-sm p-6 ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-lg'}`}>
        <div className="flex items-center gap-8">
          <CircularGauge 
            value={stats.occupes} 
            max={stats.total || 1} 
            size={120} 
            color={stats.tauxOccupation >= 80 ? "#f43f5e" : stats.tauxOccupation >= 50 ? "#f59e0b" : "#10b981"} 
            label="Taux global" 
            isDark={isDark} 
          />
          <div className="flex-1 space-y-4">
            <h3 className={`text-lg font-bold ${theme.text}`}>État des logements</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme.textMuted}>Occupés</span>
                  <span className={`font-semibold ${theme.text}`}>{stats.occupes} / {stats.total}</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(stats.occupes / (stats.total || 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme.textMuted}>Disponibles</span>
                  <span className={`font-semibold ${theme.text}`}>{stats.disponibles}</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-blue-500 transition-all duration-1000" style={{ width: `${(stats.disponibles / (stats.total || 1)) * 100}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className={theme.textMuted}>Maintenance</span>
                  <span className={`font-semibold ${theme.text}`}>{stats.maintenance}</span>
                </div>
                <div className={`h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-2 rounded-full bg-amber-500 transition-all duration-1000" style={{ width: `${(stats.maintenance / (stats.total || 1)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className={`flex gap-1 p-1.5 rounded-xl border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          {FILTRES.map(f => (
            <button 
              key={f} 
              onClick={() => setFiltre(f)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${filtre === f 
                ? f === "Occupé" ? "bg-emerald-500 text-white shadow-lg" : f === "Disponible" ? "bg-blue-500 text-white shadow-lg" : f === "Maintenance" ? "bg-amber-500 text-white shadow-lg" : "bg-[#0F2D56] text-white shadow-lg"
                : `${theme.textSubtle} hover:${theme.text} ${isDark ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}`}
            >
              {f}
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
          
          <div className={`flex rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
            <button 
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 transition ${viewMode === "grid" ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900') : theme.textSubtle}`}
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 transition ${viewMode === "table" ? (isDark ? 'bg-white/10 text-white' : 'bg-gray-200 text-gray-900') : theme.textSubtle}`}
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <p className={theme.textLight}>{filtered.length} attribution{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}</p>

      {/* Vue Grille 3D */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((a, index) => (
            <AttributionCard3D 
              key={a.id}
              attribution={a}
              onDetail={() => setDetail(a)}
              onEdit={() => setFormData(a)}
              onDelete={() => supprimerAttribution(a.id)}
              onTerminer={() => setFinData(a)}
              index={index}
              isDark={isDark}
            />
          ))}
        </div>
      )}

      {/* Vue Tableau */}
      {viewMode === "table" && (
        <div className={`backdrop-blur-sm border rounded-3xl overflow-hidden ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                {["Réf", "Département", "Logement", "Période", "Occupants", "Statut", ""].map(h => (
                  <th key={h} className={`text-left px-5 py-4 text-xs font-semibold uppercase tracking-wide ${theme.textLight}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className={`border-b transition group ${isDark ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'}`}>
                  <td className={`px-5 py-4 font-mono text-xs ${theme.textLight}`}>{a.id}</td>
                  <td className={`px-5 py-4 font-bold ${theme.text}`}>{a.departement}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${isDark ? 'bg-white/10 text-white/80' : 'bg-gray-200 text-gray-700'}`}>
                      {a.logement}
                    </span>
                  </td>
                  <td className={`px-5 py-4 text-xs ${theme.textSubtle}`}>{a.date_debut} → {a.date_fin}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {a.occupants.slice(0, 2).map((o, i) => (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600'}`}>
                          {o.split(' ')[0]}
                        </span>
                      ))}
                      {a.occupants.length > 2 && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isDark ? 'bg-white/5 text-white/50' : 'bg-gray-50 text-gray-400'}`}>
                          +{a.occupants.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                      a.statut === "Occupé" ? (isDark ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-emerald-100 text-emerald-600 border-emerald-300') :
                      a.statut === "Disponible" ? (isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-blue-100 text-blue-600 border-blue-300') :
                      (isDark ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-amber-100 text-amber-600 border-amber-300')
                    }`}>
                      {a.statut}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => setDetail(a)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}>
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => setFormData(a)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-white/10 text-white/60' : 'hover:bg-gray-100 text-gray-400'}`}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      {a.statut === "Occupé" && (
                        <button onClick={() => setFinData(a)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-amber-500/20 text-amber-400' : 'hover:bg-amber-100 text-amber-600'}`}>
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => supprimerAttribution(a.id)} className={`p-1.5 rounded-lg transition ${isDark ? 'hover:bg-rose-500/20 text-rose-400' : 'hover:bg-rose-100 text-rose-600'}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}