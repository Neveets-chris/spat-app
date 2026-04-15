import { House, Building, Hammer, Hourglass, TrendingUp, TrendingDown, Wallet, AlertTriangle, Package, Activity } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useEffect, useState, useRef } from "react";

// Hook personnalisé pour les animations de comptage
function useCountUp(end, duration = 2000) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef();

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * end);
      
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  return count;
}

// Hook pour l'animation d'entrée
function useReveal(delay = 0) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return { ref, isVisible, style: {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  }};
}

// Composant Sparkline pour les mini-graphiques
function Sparkline({ data, color = "#0F2D56", positive = true }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-10 overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M0,100 ${points.split(' ').map((p, i) => `${i === 0 ? 'L' : 'L'}${p}`).join(' ')} L100,100 Z`}
        fill={`url(#grad-${color})`}
        className="animate-pulse"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
        style={{
          strokeDasharray: 200,
          strokeDashoffset: 200,
          animation: 'draw 1.5s ease-out forwards'
        }}
      />
    </svg>
  );
}

// Composant CircularProgress pour le Greed Index
function CircularProgress({ value, label, sublabel }) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;
  const { ref, style } = useReveal();

  return (
    <div ref={ref} style={style} className="relative flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-100 dark:text-gray-800"
          />
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="#C9A84C"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(201, 168, 76, 0.5))'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0F2D56] dark:text-white">{value}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="text-xs text-gray-400">{sublabel}</p>
    </div>
  );
}

// Composant StatCard amélioré avec animations
function StatCard({ label, value, total, couleur, texte, icon: Icon, trend, trendValue, delay = 0, sparklineData, sparklineColor }) {
  const animatedValue = useCountUp(value);
  const { ref, style } = useReveal(delay);
  
  return (
    <div 
      ref={ref}
      style={style}
      className="group bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${couleur} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col items-end gap-2">
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'}`}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {trendValue}%
            </div>
          )}
          {sparklineData && (
            <Sparkline data={sparklineData} color={sparklineColor || "#0F2D56"} />
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-black text-[#0F2D56] dark:text-white tracking-tight">
          {animatedValue}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      </div>

      {total !== value && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-400">{Math.round((value / total) * 100)}%</span>
            <span className="text-gray-400">sur {total}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${couleur} transition-all duration-1000 ease-out`}
              style={{ 
                width: `${(value / total) * 100}%`,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { stats, depenses, materiaux } = useApp();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const depEnAttente = depenses.filter(d => d.statut === "En attente");
  const alertesStock = materiaux.filter(m => m.stock <= m.seuil);

  // Calculs pour les nouvelles statistiques
  const tauxOccupation = stats.logTotal > 0 ? Math.round((stats.logOccupes / stats.logTotal) * 100) : 0;
  const tauxMaintenance = stats.logTotal > 0 ? Math.round((stats.logMaintenance / stats.logTotal) * 100) : 0;
  
  // Dépenses du mois dernier vs ce mois pour le trend
  const parMois = {};
  depenses.forEach(d => {
    const mois = d.date.split("/").slice(1).join("/");
    parMois[mois] = (parMois[mois] || 0) + d.montant;
  });
  const moisKeys = Object.keys(parMois).sort();
  const dernierMois = moisKeys[moisKeys.length - 1] || '';
  const avantDernierMois = moisKeys[moisKeys.length - 2] || '';
  const depensesTrend = avantDernierMois && parMois[avantDernierMois] > 0 
    ? Math.round(((parMois[dernierMois] - parMois[avantDernierMois]) / parMois[avantDernierMois]) * 100)
    : 0;

  // Valeur totale du stock
  const valeurStock = materiaux.reduce((acc, m) => acc + (m.stock * (m.prixUnitaire || 0)), 0);
  
  // Greed Index (indice santé du parc) basé sur occupation et maintenance
  const greedIndex = Math.max(0, Math.min(100, Math.round(tauxOccupation - (tauxMaintenance * 2))));

  // Données pour sparklines
  const sparkDataOccupation = [60, 65, 62, 70, 75, tauxOccupation];
  const sparkDataDepenses = moisKeys.slice(-6).map(m => parMois[m] / 1000000);

  const STATS = [
    { 
      label: "Logements disponibles", 
      value: stats.logDisponibles, 
      total: stats.logTotal, 
      couleur: "from-emerald-400 to-emerald-600", 
      texte: "text-emerald-400", 
      icon: House,
      trend: stats.logDisponibles > stats.logTotal * 0.2 ? 'up' : 'down',
      trendValue: Math.abs(Math.round(((stats.logDisponibles - stats.logTotal * 0.3) / (stats.logTotal * 0.3)) * 100))
    },
    { 
      label: "Logements occupés",     
      value: stats.logOccupes,     
      total: stats.logTotal, 
      couleur: "from-blue-400 to-blue-600",    
      texte: "text-blue-400",    
      icon: Building,
      trend: 'up',
      trendValue: tauxOccupation,
      sparklineData: sparkDataOccupation,
      sparklineColor: "#3B82F6"
    },
    { 
      label: "En maintenance",        
      value: stats.logMaintenance, 
      total: stats.logTotal, 
      couleur: "from-amber-400 to-amber-600",   
      texte: "text-amber-400",   
      icon: Hammer,
      trend: stats.logMaintenance > 2 ? 'down' : 'up',
      trendValue: tauxMaintenance
    },
    { 
      label: "Employés total",        
      value: stats.empTotal,       
      total: stats.empTotal, 
      couleur: "from-rose-400 to-rose-600",    
      texte: "text-rose-400",    
      icon: Hourglass,
      trend: 'up',
      trendValue: 100
    },
  ];

  // Dépenses par mois pour le graphique
  const depMois = Object.entries(parMois).slice(-6).map(([mois, montant]) => ({ mois, montant }));
  const maxDep = Math.max(...depMois.map(d => d.montant), 1);

  function fmt(n) { return new Intl.NumberFormat("fr-MG").format(n) + " Ar"; }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      {/* CSS pour les animations */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(201, 168, 76, 0.2); }
          50% { box-shadow: 0 0 30px rgba(201, 168, 76, 0.4); }
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* Cartes stats principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 100} />
        ))}
      </div>

      {/* Nouvelle rangée de statistiques avancées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Carte Revenus/Wallet */}
        <div 
          className="bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] rounded-2xl p-6 text-white relative overflow-hidden group"
          style={{ animation: 'slideIn 0.6s ease-out 0.4s both' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Wallet className="w-5 h-5" />
              </div>
              <Sparkline data={sparkDataDepenses.length > 1 ? sparkDataDepenses : [1,1.2,1.1,1.3,1.5,1.8]} color="#C9A84C" />
            </div>
            <p className="text-sm text-white/70 mb-1">Total Dépenses</p>
            <p className="text-3xl font-bold mb-2">{fmt(stats.depTotal)}</p>
            <div className="flex items-center gap-2 text-xs">
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${depensesTrend >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
                {depensesTrend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(depensesTrend)}%
              </span>
              <span className="text-white/50">vs mois dernier</span>
            </div>
          </div>
        </div>

        {/* Carte Valeur Stock */}
        <div 
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden"
          style={{ animation: 'slideIn 0.6s ease-out 0.5s both' }}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Package className="w-16 h-16 text-[#C9A84C]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-[#C9A84C]/10 rounded-lg">
                <Package className="w-5 h-5 text-[#C9A84C]" />
              </div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Valeur Stock</span>
            </div>
            <p className="text-3xl font-bold text-[#0F2D56] dark:text-white mb-1">
              {fmt(valeurStock)}
            </p>
            <p className="text-xs text-gray-500 mb-4">Valeur estimée des matériaux</p>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">Alertes</span>
                  <span className="font-semibold text-rose-500">{alertesStock.length}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div 
                    className="h-1.5 rounded-full bg-rose-400 transition-all duration-500"
                    style={{ width: `${Math.min((alertesStock.length / materiaux.length) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carte Greed Index / Santé du Parc */}
        <div 
          className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center"
          style={{ animation: 'slideIn 0.6s ease-out 0.6s both' }}
        >
          <CircularProgress 
            value={greedIndex} 
            label="Santé du Parc" 
            sublabel={greedIndex > 70 ? "Excellent" : greedIndex > 40 ? "Bon" : "À surveiller"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphe dépenses amélioré */}
        <div 
          className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          style={{ animation: 'slideIn 0.6s ease-out 0.7s both' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-[#0F2D56] dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C9A84C]" />
                Dépenses mensuelles
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Évolution sur les 6 derniers mois</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-[#0F2D56] dark:bg-gray-700 text-white px-3 py-1.5 rounded-full font-semibold shadow-lg">
                {fmt(stats.depTotal)}
              </span>
            </div>
          </div>
          
          <div className="relative h-48 flex items-end gap-3">
            {/* Ligne de grille */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="border-t border-gray-100 dark:border-gray-800 w-full h-0" />
              ))}
            </div>
            
            {depMois.length > 0 ? depMois.map((d, i) => {
              const height = (d.montant / maxDep) * 100;
              const isMax = d.montant === maxDep;
              
              return (
                <div key={d.mois} className="flex-1 flex flex-col items-center gap-2 relative group">
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0F2D56] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {fmt(d.montant)}
                  </div>
                  
                  <div className="relative w-full flex justify-center">
                    <div
                      className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 cursor-pointer relative overflow-hidden ${isMax ? 'bg-[#C9A84C]' : 'bg-[#0F2D56]/80 hover:bg-[#0F2D56]'}`}
                      style={{ 
                        height: `${height}%`,
                        animation: `slideIn 0.6s ease-out ${0.8 + i * 0.1}s both`,
                        minHeight: '4px'
                      }}
                    >
                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{d.mois}</span>
                </div>
              );
            }) : (
              <p className="text-xs text-gray-400 m-auto">Aucune dépense</p>
            )}
          </div>
        </div>

        {/* Stock matériaux amélioré */}
        <div 
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
          style={{ animation: 'slideIn 0.6s ease-out 0.8s both' }}
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-[#0F2D56] dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C9A84C]" />
                Stock matériaux
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {alertesStock.length > 0 ? (
                  <span className="text-rose-500 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    {alertesStock.length} alerte{alertesStock.length > 1 ? "s" : ""}
                  </span>
                ) : "Niveaux OK"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Articles</p>
              <p className="text-lg font-bold text-[#0F2D56] dark:text-white">{materiaux.length}</p>
            </div>
          </div>
          
          <div className="space-y-4 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {materiaux.map((m, i) => {
              const pct = Math.min((m.stock / (m.seuil * 3)) * 100, 100);
              const alerte = m.stock <= m.seuil;
              
              return (
                <div key={m.nom} style={{ animation: `slideIn 0.4s ease-out ${0.9 + i * 0.05}s both` }}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={`font-semibold flex items-center gap-1 ${alerte ? "text-rose-500" : "text-gray-700 dark:text-gray-300"}`}>
                      {alerte && <AlertTriangle className="w-3 h-3" />}
                      {m.nom}
                    </span>
                    <span className="text-gray-400">{m.stock} {m.unite}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 relative ${alerte ? "bg-rose-400" : "bg-gradient-to-r from-[#C9A84C] to-[#0F2D56]"}`}
                      style={{ width: `${pct}%` }}
                    >
                      {alerte && (
                        <div className="absolute inset-0 bg-white/30 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demandes en attente amélioré */}
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6"
        style={{ animation: 'slideIn 0.6s ease-out 0.9s both' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-[#0F2D56] dark:text-white flex items-center gap-2">
              <Hourglass className="w-4 h-4 text-[#C9A84C]" />
              Dépenses en attente
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{depEnAttente.length} dépense{depEnAttente.length > 1 ? "s" : ""} à valider</p>
          </div>
          {depEnAttente.length > 0 && (
            <span className="px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold rounded-full animate-pulse">
              Action requise
            </span>
          )}
        </div>
        
        {depEnAttente.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {["Réf", "Description", "Montant", "Logement", "Fournisseur", "Date"].map(h => (
                    <th key={h} className="text-left py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {depEnAttente.map((d, i) => (
                  <tr 
                    key={d.id} 
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    style={{ animation: `slideIn 0.4s ease-out ${1 + i * 0.05}s both` }}
                  >
                    <td className="py-3 font-mono text-xs text-gray-400">#{d.id}</td>
                    <td className="py-3 font-semibold text-gray-800 dark:text-gray-200 text-xs group-hover:text-[#0F2D56] dark:group-hover:text-[#C9A84C] transition-colors">{d.description}</td>
                    <td className="py-3 font-black text-[#C9A84C] text-xs">{fmt(d.montant)}</td>
                    <td className="py-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 text-xs font-bold">
                        {d.logement}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-gray-500 dark:text-gray-400">{d.fournisseur}</td>
                    <td className="py-3 text-xs text-gray-400">{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-sm">✅ Toutes les dépenses sont validées</p>
          </div>
        )}
      </div>
    </div>
  );
}