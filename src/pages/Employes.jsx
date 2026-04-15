import { useState, useEffect } from "react";
import {
  BarChart2, User, Scale, Anchor, Wrench, Landmark, Wallet,
  ChevronDown, Pencil, Plus, Trash2, Search, Layers, X, Check, Eye,
  Shield, Laptop, HandCoins, Globe, Truck, FlaskConical, BookOpen,
  Headphones, Megaphone, Leaf, Cpu, Database, FileText, Star,
  Zap, Package, Settings, Map, Phone, Camera, Music, Heart,
  TrendingUp, TrendingDown, Users, Award,
  Briefcase, Mail, MapPin, Clock,  BarChart3,Building,Home,
    Sparkles
} from "lucide-react";

// ─── Icon options (Lucide) ────────────────────────────────────────────────────
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

// ─── Color teintes ────────────────────────────────────────────────────────────
const COLOR_TEINTES = [
  { label: "Bleu", bgLight: "#dbeafe", bgDark: "#1e3a5f", iconLight: "#1e40af", iconDark: "#93c5fd", gradient: "from-blue-500 to-blue-600" },
  { label: "Violet", bgLight: "#ede9fe", bgDark: "#3b1f6e", iconLight: "#5b21b6", iconDark: "#c4b5fd", gradient: "from-violet-500 to-violet-600" },
  { label: "Vert", bgLight: "#d1fae5", bgDark: "#064e3b", iconLight: "#065f46", iconDark: "#6ee7b7", gradient: "from-emerald-500 to-emerald-600" },
  { label: "Ambre", bgLight: "#fef3c7", bgDark: "#451a03", iconLight: "#92400e", iconDark: "#fcd34d", gradient: "from-amber-500 to-amber-600" },
  { label: "Cyan", bgLight: "#cffafe", bgDark: "#083344", iconLight: "#0e7490", iconDark: "#67e8f9", gradient: "from-cyan-500 to-cyan-600" },
  { label: "Rouge", bgLight: "#fee2e2", bgDark: "#450a0a", iconLight: "#991b1b", iconDark: "#fca5a5", gradient: "from-rose-500 to-rose-600" },
  { label: "Rose", bgLight: "#fce7f3", bgDark: "#500724", iconLight: "#9d174d", iconDark: "#f9a8d4", gradient: "from-pink-500 to-pink-600" },
  { label: "Indigo", bgLight: "#e0e7ff", bgDark: "#1e1b4b", iconLight: "#3730a3", iconDark: "#a5b4fc", gradient: "from-indigo-500 to-indigo-600" },
  { label: "Teal", bgLight: "#ccfbf1", bgDark: "#042f2e", iconLight: "#0f766e", iconDark: "#5eead4", gradient: "from-teal-500 to-teal-600" },
  { label: "Orange", bgLight: "#ffedd5", bgDark: "#431407", iconLight: "#c2410c", iconDark: "#fdba74", gradient: "from-orange-500 to-orange-600" },
  { label: "Lime", bgLight: "#ecfccb", bgDark: "#1a2e05", iconLight: "#3f6212", iconDark: "#bef264", gradient: "from-lime-500 to-lime-600" },
  { label: "Gris", bgLight: "#f3f4f6", bgDark: "#1f2937", iconLight: "#374151", iconDark: "#d1d5db", gradient: "from-gray-500 to-gray-600" },
];

const CATEGORIES = ["Cadre supérieur", "Cadre moyen", "Agent maîtrise", "Agent exécution"];
const SITUATIONS = ["Célibataire", "Marié", "Divorcé", "Veuf"];
const AVATAR_COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#0e7490"];

// ─── Hooks d'animation ───────────────────────────────────────────────────────
function useCountUp(end, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
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
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
    }
  };
}

// ─── Composants de statistiques ───────────────────────────────────────────────
function StatCard({ label, value, trend, trendValue, icon: Icon, color, delay = 0 }) {
  const animatedValue = useCountUp(value);
  const { style } = useReveal(delay);
  
  return (
    <div style={style} className="group relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/30'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{animatedValue}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
      </div>
    </div>
  );
}

function CircularProgress({ value, size = 120, strokeWidth = 8, color = "#C9A84C" }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle cx={size/2} cy={size/2} r={radius} stroke="currentColor" strokeWidth={strokeWidth} fill="none" className="text-gray-100 dark:text-gray-800" />
        <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out"
          style={{ filter: `drop-shadow(0 0 6px ${color}50)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}%</span>
      </div>
    </div>
  );
}

// ─── Données initiales ────────────────────────────────────────────────────────
const INITIAL_DEPARTMENTS = [
  {
    code: "DSIA", name: "DSIA",
    fullName: "Direction Système d'Information et Audit",
    iconIdx: 0, colorIdx: 0,
    services: [
      { id: "s1", name: "Contrôle de gestion", chef: "Marie Dupont",
        employes: [{ id: "e1", prenom: "Jean", nom: "Randria", matricule: "MAT001", categorie: "Cadre moyen", anciennete: 5, situation: "Marié", nb_enfants: 2, email: "jean.randria@spat.mg", telephone: "034 12 345 67", adresse: "Antananarivo", dateEmbauche: "2019-03-15", salaire: 2500000 }] },
      { id: "s2", name: "Audit", chef: "Paul Rabe", employes: [] },
      { id: "s3", name: "Organisation", chef: "Sara Mbola", employes: [] },
      { id: "s4", name: "Informatique et télécom", chef: "Luc Andria",
        employes: [{ id: "e2", prenom: "Alice", nom: "Ratovo", matricule: "MAT002", categorie: "Cadre supérieur", anciennete: 8, situation: "Célibataire", nb_enfants: 0, email: "alice.ratovo@spat.mg", telephone: "033 45 678 90", adresse: "Toamasina", dateEmbauche: "2016-07-20", salaire: 4500000 }] },
    ],
  },
  {
    code: "DRH", name: "DRH",
    fullName: "Direction des Ressources Humaines",
    iconIdx: 1, colorIdx: 1,
    services: [
      { id: "s5", name: "Développement des RH", chef: "Emma Razaf", employes: [] },
      { id: "s6", name: "Administration et Paie", chef: "Noël Ravelo", employes: [] },
      { id: "s7", name: "Centre de perfectionnement", chef: "Haja Tsirim", employes: [] },
      { id: "s8", name: "Médecine et pharmacie", chef: "Dr. Koto", employes: [] },
    ],
  },
  {
    code: "DAF", name: "DAF",
    fullName: "Direction Administrative et Financière",
    iconIdx: 2, colorIdx: 2,
    services: [
      { id: "s9", name: "Finances", chef: "René Raham", employes: [] },
      { id: "s10", name: "Recouvrement", chef: "Nivo Andr", employes: [] },
      { id: "s11", name: "Comptabilité", chef: "Aina Rado", employes: [] },
      { id: "s12", name: "Fiscalité", chef: "Fara Toto", employes: [] },
    ],
  },
  {
    code: "DAJPP", name: "DAJPP",
    fullName: "Direction des Affaires Juridiques et du Patrimoine Portuaire",
    iconIdx: 3, colorIdx: 3,
    services: [
      { id: "s13", name: "Contrats et Patrimoine Portuaire", chef: "Meva Rabem", employes: [] },
      { id: "s14", name: "Analyse économique et expansion", chef: "Tojo Rakot", employes: [] },
      { id: "s15", name: "Contentieux", chef: "Lydia Raz", employes: [] },
      { id: "s16", name: "Facturation", chef: "Bodo Randr", employes: [] },
    ],
  },
  {
    code: "CAP", name: "Direction CAP",
    fullName: "Direction Capitainerie et Affaires Portuaires",
    iconIdx: 4, colorIdx: 4,
    services: [
      { id: "s17", name: "Trafic maritime", chef: "Capitaine Solo", employes: [] },
      { id: "s18", name: "Police portuaire", chef: "Cdt Rabe", employes: [] },
      { id: "s19", name: "Sécurité et secours", chef: "Off. Aina", employes: [] },
      { id: "s20", name: "Armement", chef: "Ing. Dago", employes: [] },
    ],
  },
  {
    code: "DT", name: "DT",
    fullName: "Direction Technique",
    iconIdx: 5, colorIdx: 5,
    services: [
      { id: "s21", name: "Maintenances", chef: "Ing. Fara", employes: [] },
      { id: "s22", name: "Travaux neufs", chef: "Arch. Rado", employes: [] },
      { id: "s23", name: "Études et planification", chef: "Ing. Meva", employes: [] },
      { id: "s24", name: "Installations spécialisées", chef: "Tech. Bodo", employes: [] },
    ],
  },
  {
    code: "DAGE", name: "DAGE",
    fullName: "Direction Administration Générale et Engagement",
    iconIdx: 6, colorIdx: 6,
    services: [
      { id: "s25", name: "Marketing et Développement", chef: "Noro Rabem", employes: [] },
      { id: "s26", name: "HST E", chef: "Tiana Rak", employes: [] },
      { id: "s27", name: "Engagement social (RSE)", chef: "Lala Rand", employes: [] },
      { id: "s28", name: "Communication interne", chef: "Zo Ratov", employes: [] },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function avatarColor(nom) {
  let h = 0;
  for (const c of nom) h += c.charCodeAt(0);
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function genId() {
  return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
}
function catBadge(cat) {
  const map = {
    "Cadre supérieur": "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    "Cadre moyen": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    "Agent maîtrise": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    "Agent exécution": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  };
  return map[cat] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

// ─── Hook : détection du dark mode ────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return dark;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ prenom, nom, size = "md", className = "" }) {
  const initials = (prenom[0] || "").toUpperCase() + (nom[0] || "").toUpperCase();
  const sz = size === "lg" ? "w-16 h-16 text-xl" : size === "xl" ? "w-24 h-24 text-3xl" : size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-lg ${className}`}
      style={{ background: `linear-gradient(135deg, ${avatarColor(nom)}, ${avatarColor(nom)}aa)` }}>
      {initials}
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, onConfirm, confirmLabel = "Ajouter", confirmDisabled = false, children, size = "md" }) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}>
      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full ${sizeClasses[size]} border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <span className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A84C]" />
            {title}
          </span>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:rotate-90 duration-300">
            <X size={14} />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {children}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 justify-end shrink-0 bg-gray-50/50 dark:bg-gray-800/50">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={confirmDisabled}
            className={`px-5 py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:scale-105 ${confirmDisabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] hover:shadow-lg hover:shadow-blue-500/25"}`}>
            <Check size={13} />
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2D56]/20 focus:border-[#0F2D56] dark:focus:border-blue-400 transition-all hover:border-gray-300 dark:hover:border-gray-600";

function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <Field label={label}>
      <input type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        className={inputCls} />
    </Field>
  );
}
function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  );
}

// ─── Icon Picker ──────────────────────────────────────────────────────────────
function IconPicker({ selected, onChange }) {
  return (
    <Field label="Icône (Lucide)">
      <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        {ICON_OPTIONS.map(({ label, Icon }, i) => (
          <button key={label} onClick={() => onChange(i)} title={label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 ${selected === i ? "bg-[#0F2D56] text-white shadow-lg shadow-blue-500/30" : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"}`}>
            <Icon size={16} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </Field>
  );
}

// ─── Color Picker ────────────────────────────────────────────────────────────
function ColorPicker({ selected, onChange }) {
  return (
    <Field label="Teinte de couleur">
      <div className="flex flex-wrap gap-2.5 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        {COLOR_TEINTES.map((t, i) => (
          <button key={t.label} onClick={() => onChange(i)} title={t.label}
            className="relative w-8 h-8 rounded-full transition-all hover:scale-110 focus:outline-none shrink-0"
            style={{
              background: t.bgLight,
              border: selected === i ? `3px solid ${t.iconLight}` : "2px solid transparent",
              boxShadow: selected === i ? `0 0 0 2px white, 0 0 0 4px ${t.iconLight}` : "none",
            }}>
            {selected === i && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check size={13} color={t.iconLight} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-1">
        Sélectionné : <span className="font-semibold text-gray-700 dark:text-gray-300">{COLOR_TEINTES[selected]?.label}</span>
      </p>
    </Field>
  );
}

// ─── NOUVEAU : Modal Détail Employé ERP Style ─────────────────────────────────
function ModalDetailEmployeERP({ employe, dept, service, onClose, onEdit, onDelete }) {
  const { style } = useReveal();
  
  // Calculs métier
  const ancienneteAnnees = employe.anciennete || 0;
  const estEligibleLogement = ancienneteAnnees >= 2;
  const performanceScore = Math.min(100, 70 + (ancienneteAnnees * 3) + (employe.nb_enfants * 2));
  const tauxPresence = 95 + Math.random() * 5; // Simulé
  
  const statsEmploye = [
    { label: "Projets", value: 12, icon: Briefcase, color: "from-blue-500 to-blue-600" },
    { label: "Tâches", value: 48, icon: Check, color: "from-emerald-500 to-emerald-600" },
    { label: "Formation", value: 24, icon: BookOpen, color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div style={style} className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
        
        {/* Header avec gradient */}
        <div className="relative h-32 bg-gradient-to-r from-[#0F2D56] via-[#1a4a7a] to-[#0F2D56] overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C9A84C]/20 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Sidebar info employé */}
          <div className="lg:w-80 bg-gray-50/80 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* Avatar et nom */}
            <div className="text-center">
              <div className="relative inline-block -mt-20 mb-4">
                <Avatar prenom={employe.prenom} nom={employe.nom} size="xl" className="ring-4 ring-white dark:ring-gray-800 shadow-2xl" />
                <div className={`absolute bottom-1 right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${estEligibleLogement ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{employe.prenom} {employe.nom}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{employe.categorie}</p>
              <div className="mt-3 flex justify-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${catBadge(employe.categorie)}`}>
                  {employe.matricule}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${estEligibleLogement ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40'}`}>
                  {estEligibleLogement ? '✓ Éligible' : '⏳ En attente'}
                </span>
              </div>
            </div>

            {/* Info rapide */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Département</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{dept.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Service</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{service.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Chef de service</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{service.chef}</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employe.email || `${employe.prenom.toLowerCase()}.${employe.nom.toLowerCase()}@spat.mg`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{employe.telephone || "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{employe.adresse || "Non renseigné"}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-auto">
              <button onClick={onEdit} className="flex-1 py-2.5 rounded-xl bg-[#0F2D56] text-white text-sm font-semibold hover:bg-[#1a4a7a] transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Pencil className="w-4 h-4" />
                Modifier
              </button>
              <button onClick={onDelete} className="px-4 py-2.5 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 hover:bg-rose-200 transition-all hover:scale-105">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {statsEmploye.map((stat, i) => (
                <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 group" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Performance et métriques */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Score de performance */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C9A84C]" />
                  Score de performance
                </h4>
                <div className="flex items-center gap-4">
                  <CircularProgress value={Math.round(performanceScore)} size={100} strokeWidth={10} color="#C9A84C" />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Productivité</span>
                      <span className="font-semibold text-emerald-600">92%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div className="h-full rounded-full bg-emerald-500 w-[92%]" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Assiduité</span>
                      <span className="font-semibold text-blue-600">{Math.round(tauxPresence)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div className="h-full rounded-full bg-blue-500" style={{ width: `${tauxPresence}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Info famille */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Situation familiale
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-sm text-gray-500">Statut</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{employe.situation}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-sm text-gray-500">Enfants à charge</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{employe.nb_enfants}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-sm text-gray-500">Ancienneté</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{employe.anciennete} ans</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline / Activité récente */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Activité récente
              </h4>
              <div className="space-y-4">
                {[
                  { date: "Aujourd'hui", action: "Mise à jour des informations personnelles", type: "update" },
                  { date: "Il y a 3 jours", action: "Validation formation sécurité portuaire", type: "success" },
                  { date: "Il y a 1 semaine", action: "Demande de congés approuvée", type: "success" },
                  { date: "Il y a 2 semaines", action: "Évaluation annuelle de performance", type: "review" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 ${item.type === 'success' ? 'bg-emerald-500' : item.type === 'update' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">{item.action}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Service Row ──────────────────────────────────────────────────────────────
function ServiceRow({ service, bg, ic, deptCode, onAddEmploye, onEditService, onDeleteService, onDeleteEmploye, onDetailEmploye }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0 animate-in slide-in-from-left-2 duration-300">
      <div onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 py-3 pl-8 pr-4 cursor-pointer select-none transition-all ${open ? "bg-gray-50 dark:bg-gray-800/60" : "hover:bg-gray-50/70 dark:hover:bg-gray-800/30"}`}>
        <div className="w-2 h-2 rounded-full shrink-0 opacity-60" style={{ background: ic }} />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{service.name}</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">Chef : {service.chef}</span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0"
          style={{ background: bg, color: ic }}>
          {service.employes.length} emp.
        </span>
        <div className="flex gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button title="Ajouter un employé" onClick={() => onAddEmploye(deptCode, service.id)}
            className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all hover:scale-110">
            <Plus size={13} strokeWidth={2.5} />
          </button>
          <button title="Modifier" onClick={() => onEditService(deptCode, service)}
            className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition-all hover:scale-110">
            <Pencil size={12} strokeWidth={2} />
          </button>
          <button title="Supprimer" onClick={() => onDeleteService(deptCode, service.id)}
            className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-all hover:scale-110">
            <Trash2 size={12} strokeWidth={2} />
          </button>
        </div>
        <div className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2 duration-300">
          {service.employes.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-600 pl-10 py-3 italic">Aucun employé dans ce service.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F2D56]/5 dark:bg-gray-800">
                    {["Employé", "Matricule", "Catégorie", "Ancienneté", "Situation", ""].map((h) => (
                      <th key={h} className={`text-left py-2.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide ${h === "Employé" ? "pl-10 pr-3" : "px-3"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {service.employes.map((emp, i) => (
                    <tr key={emp.id}
                      className="border-t border-gray-200/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition-all cursor-pointer group"
                      onClick={() => onDetailEmploye(emp)}
                      style={{ animationDelay: `${i * 50}ms` }}>
                      <td className="pl-10 pr-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar prenom={emp.prenom} nom={emp.nom} size="sm" />
                          <span className="font-semibold text-[#0F2D56] dark:text-white text-xs group-hover:text-[#C9A84C] transition-colors">{emp.prenom} {emp.nom}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 font-mono text-xs text-gray-400 dark:text-gray-500">{emp.matricule}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${catBadge(emp.categorie)}`}>
                          {emp.categorie}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-gray-500 dark:text-gray-400">{emp.anciennete} ans</td>
                      <td className="px-3 py-2.5 text-xs text-gray-500 dark:text-gray-400">{emp.situation}</td>
                      <td className="px-3 py-2.5">
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button title="Voir détails" onClick={(e) => { e.stopPropagation(); onDetailEmploye(emp); }}
                            className="w-7 h-7 rounded-lg bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 flex items-center justify-center hover:bg-[#0F2D56] hover:text-white transition-all">
                            <Eye size={12} strokeWidth={2} />
                          </button>
                          <button title="Supprimer" onClick={(e) => { e.stopPropagation(); onDeleteEmploye(deptCode, service.id, emp.id); }}
                            className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-all">
                            <Trash2 size={12} strokeWidth={2} />
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
      )}
    </div>
  );
}

// ─── Department Card ──────────────────────────────────────────────────────────
function DepartmentCard({ dept, isDark, onAddService, onEditService, onDeleteService, onAddEmploye, onDeleteEmploye, onDetailEmploye, onDeleteDept }) {
  const [open, setOpen] = useState(false);
  const { Icon } = ICON_OPTIONS[dept.iconIdx] || ICON_OPTIONS[0];
  const teinte = COLOR_TEINTES[dept.colorIdx] || COLOR_TEINTES[0];
  const bg = isDark ? teinte.bgDark : teinte.bgLight;
  const ic = isDark ? teinte.iconDark : teinte.iconLight;
  const totalEmps = dept.services.reduce((a, s) => a + s.employes.length, 0);

  return (
    <div className={`group bg-[#F7F5F0] dark:bg-gray-900 border border-[#E0DDD7] dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${open ? "ring-2 ring-[#0F2D56]/20" : ""}`}>
      <div onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-4 px-5 py-4 cursor-pointer select-none transition-all ${open ? "bg-white/60 dark:bg-gray-800/60" : "hover:bg-white/40 dark:hover:bg-gray-800/30"}`}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300" style={{ background: bg }}>
          <Icon size={22} color={ic} strokeWidth={1.8} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-[#0F2D56] dark:text-white text-base">{dept.name}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: bg, color: ic }}>
              {dept.services.length} services · {totalEmps} emp.
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 truncate">{dept.fullName}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button title="Ajouter un service" onClick={() => onAddService(dept.code)}
            className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-all hover:scale-110 hover:rotate-90">
            <Plus size={15} strokeWidth={2.5} />
          </button>
          <button title="Supprimer le département" onClick={() => onDeleteDept(dept.code)}
            className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-all hover:scale-110">
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
        <div className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={15} className="text-gray-400" />
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E0DDD7] dark:border-gray-700 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 px-5 py-2.5">
            <Layers size={11} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Services rattachés</span>
          </div>
          {dept.services.length === 0 ? (
            <p className="text-xs text-gray-400 px-8 pb-4 italic">Aucun service. Cliquez sur + pour en ajouter un.</p>
          ) : (
            dept.services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                bg={bg} ic={ic}
                deptCode={dept.code}
                onAddEmploye={onAddEmploye}
                onEditService={onEditService}
                onDeleteService={onDeleteService}
                onDeleteEmploye={onDeleteEmploye}
                onDetailEmploye={(emp) => onDetailEmploye(dept, service, emp)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DepartementsSPAT() {
  const isDark = useDarkMode();

  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [viewMode, setViewMode] = useState("departments"); // "departments" | "stats"

  const [deptForm, setDeptForm] = useState({ code: "", name: "", fullName: "", iconIdx: 0, colorIdx: 0 });
  const [serviceForm, setServiceForm] = useState({ name: "", chef: "" });
  const [serviceTarget, setServiceTarget] = useState(null);
  const [empForm, setEmpForm] = useState({ prenom: "", nom: "", categorie: CATEGORIES[3], anciennete: 0, situation: SITUATIONS[0], nb_enfants: 0, email: "", telephone: "", adresse: "", salaire: 0 });
  const [empTarget, setEmpTarget] = useState(null);
  const [detailData, setDetailData] = useState(null);

  const closeModal = () => setModal(null);

  // Calculs statistiques
  const totalEmps = departments.reduce((a, d) => a + d.services.reduce((b, s) => b + s.employes.length, 0), 0);
  const totalServices = departments.reduce((a, d) => a + d.services.length, 0);
  const eligibleCount = departments.reduce((a, d) => a + d.services.reduce((b, s) => b + s.employes.filter(e => e.anciennete >= 2).length, 0), 0);
  const avgAnciennete = totalEmps > 0 ? Math.round(departments.reduce((a, d) => a + d.services.reduce((b, s) => b + s.employes.reduce((c, e) => c + e.anciennete, 0), 0), 0) / totalEmps) : 0;
  
  // Répartition par catégorie
  const repartitionCategories = CATEGORIES.map(cat => ({
    categorie: cat,
    count: departments.reduce((a, d) => a + d.services.reduce((b, s) => b + s.employes.filter(e => e.categorie === cat).length, 0), 0)
  }));

  // Dept
  const openAddDept = () => { setDeptForm({ code: "", name: "", fullName: "", iconIdx: 0, colorIdx: 0 }); setModal("add-dept"); };
  const confirmAddDept = () => {
    if (!deptForm.code.trim() || !deptForm.name.trim()) return;
    setDepartments((p) => [...p, { code: deptForm.code.trim(), name: deptForm.name.trim(), fullName: deptForm.fullName.trim() || deptForm.name.trim(), iconIdx: deptForm.iconIdx, colorIdx: deptForm.colorIdx, services: [] }]);
    closeModal();
  };
  const deleteDept = (code) => {
    if (window.confirm("Supprimer ce département et tous ses services ?"))
      setDepartments((p) => p.filter((d) => d.code !== code));
  };

  // Service
  const openAddService = (deptCode) => { setServiceForm({ name: "", chef: "" }); setServiceTarget({ deptCode }); setModal("add-service"); };
  const confirmAddService = () => {
    if (!serviceForm.name.trim()) return;
    setDepartments((p) => p.map((d) => d.code === serviceTarget.deptCode
      ? { ...d, services: [...d.services, { id: genId(), name: serviceForm.name.trim(), chef: serviceForm.chef.trim() || "À définir", employes: [] }] }
      : d));
    closeModal();
  };
  const openEditService = (deptCode, service) => { setServiceForm({ name: service.name, chef: service.chef }); setServiceTarget({ deptCode, serviceId: service.id }); setModal("edit-service"); };
  const confirmEditService = () => {
    if (!serviceForm.name.trim()) return;
    setDepartments((p) => p.map((d) => d.code === serviceTarget.deptCode
      ? { ...d, services: d.services.map((s) => s.id === serviceTarget.serviceId ? { ...s, name: serviceForm.name.trim(), chef: serviceForm.chef.trim() || s.chef } : s) }
      : d));
    closeModal();
  };
  const deleteService = (deptCode, serviceId) => {
    if (window.confirm("Supprimer ce service et ses employés ?"))
      setDepartments((p) => p.map((d) => d.code === deptCode ? { ...d, services: d.services.filter((s) => s.id !== serviceId) } : d));
  };

  // Employé
  const openAddEmploye = (deptCode, serviceId) => { 
    setEmpForm({ prenom: "", nom: "", categorie: CATEGORIES[3], anciennete: 0, situation: SITUATIONS[0], nb_enfants: 0, email: "", telephone: "", adresse: "", salaire: 0 }); 
    setEmpTarget({ deptCode, serviceId }); 
    setModal("add-employe"); 
  };
  const confirmAddEmploye = () => {
    if (!empForm.prenom.trim() || !empForm.nom.trim()) return;
    const matricule = "MAT" + String(Date.now()).slice(-5);
    setDepartments((p) => p.map((d) => d.code === empTarget.deptCode
      ? { ...d, services: d.services.map((s) => s.id === empTarget.serviceId ? { ...s, employes: [...s.employes, { id: genId(), ...empForm, matricule }] } : s) }
      : d));
    closeModal();
  };
  const deleteEmploye = (deptCode, serviceId, empId) => {
    setDepartments((p) => p.map((d) => d.code === deptCode
      ? { ...d, services: d.services.map((s) => s.id === serviceId ? { ...s, employes: s.employes.filter((e) => e.id !== empId) } : s) }
      : d));
  };
  const openDetail = (dept, service, emp) => { setDetailData({ dept, service, emp }); setModal("detail-employe"); };

  const filtered = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.services.some((s) => s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.employes.some((e) => `${e.prenom} ${e.nom}`.toLowerCase().includes(search.toLowerCase())))
  );

  const prevTeinte = COLOR_TEINTES[deptForm.colorIdx] || COLOR_TEINTES[0];
  const prevIcon = ICON_OPTIONS[deptForm.iconIdx] || ICON_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-gray-950 p-6">
      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header avec navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#0F2D56] dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-[#C9A84C]" />
              Gestion RH
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {departments.length} directions · {totalServices} services · {totalEmps} employés
            </p>
          </div>
          
          <div className="flex gap-2 items-center flex-wrap">
            <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
              <button onClick={() => setViewMode("departments")} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "departments" ? "bg-[#0F2D56] text-white shadow-lg" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                Départements
              </button>
              <button onClick={() => setViewMode("stats")} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === "stats" ? "bg-[#0F2D56] text-white shadow-lg" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
                Statistiques
              </button>
            </div>
            
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" placeholder="Rechercher..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2D56]/20 focus:border-[#0F2D56] w-56 transition-all" />
            </div>
            
            <button onClick={openAddDept}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] hover:shadow-lg hover:shadow-blue-500/25 text-white text-sm font-semibold transition-all hover:scale-105">
              <Plus size={15} strokeWidth={2.5} /> Nouveau département
            </button>
          </div>
        </div>

        {/* Vue Statistiques */}
        {viewMode === "stats" && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Employés" value={totalEmps} trend="up" trendValue={12} icon={Users} color="from-blue-500 to-blue-600" delay={0} />
              <StatCard label="Éligibles Logement" value={eligibleCount} trend="up" trendValue={8} icon={Home} color="from-emerald-500 to-emerald-600" delay={100} />
              <StatCard label="Services Actifs" value={totalServices} trend="up" trendValue={5} icon={Briefcase} color="from-violet-500 to-violet-600" delay={200} />
              <StatCard label="Ancienneté Moy." value={avgAnciennete} trend="down" trendValue={3} icon={Clock} color="from-amber-500 to-amber-600" delay={300} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Répartition par catégorie */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#C9A84C]" />
                  Répartition par catégorie
                </h3>
                <div className="space-y-3">
                  {repartitionCategories.map((cat, i) => (
                    <div key={cat.categorie} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-32">{cat.categorie}</span>
                      <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#0F2D56] to-[#C9A84C] transition-all duration-1000" 
                          style={{ width: `${totalEmps > 0 ? (cat.count / totalEmps) * 100 : 0}%`, animationDelay: `${i * 100}ms` }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white w-8">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top départements */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#C9A84C]" />
                  Effectifs par direction
                </h3>
                <div className="space-y-3">
                  {departments.map((dept, i) => {
                    const empCount = dept.services.reduce((a, s) => a + s.employes.length, 0);
                    return (
                      <div key={dept.code} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: isDark ? COLOR_TEINTES[dept.colorIdx].bgDark : COLOR_TEINTES[dept.colorIdx].bgLight }}>
                          {(() => { const Icon = ICON_OPTIONS[dept.iconIdx].Icon; return <Icon size={14} color={isDark ? COLOR_TEINTES[dept.colorIdx].iconDark : COLOR_TEINTES[dept.colorIdx].iconLight} />; })()}
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{dept.name}</span>
                        <div className="w-24 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                          <div className="h-full rounded-full bg-[#0F2D56]" style={{ width: `${totalEmps > 0 ? (empCount / totalEmps) * 100 : 0}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{empCount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vue Départements */}
        {viewMode === "departments" && (
          <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                Aucun résultat pour « {search} »
              </div>
            ) : (
              filtered.map((dept, i) => (
                <div key={dept.code} style={{ animationDelay: `${i * 50}ms` }} className="animate-in slide-in-from-left-2 duration-300">
                  <DepartmentCard dept={dept} isDark={isDark}
                    onAddService={openAddService}
                    onEditService={openEditService}
                    onDeleteService={deleteService}
                    onAddEmploye={openAddEmploye}
                    onDeleteEmploye={deleteEmploye}
                    onDetailEmploye={openDetail}
                    onDeleteDept={deleteDept}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Modals existants... */}
      {modal === "add-dept" && (
        <Modal title="Nouveau département" onClose={closeModal} onConfirm={confirmAddDept}
          confirmDisabled={!deptForm.code.trim() || !deptForm.name.trim()}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Code" value={deptForm.code} onChange={(v) => setDeptForm((p) => ({ ...p, code: v }))} placeholder="Ex : DG" />
            <InputField label="Nom affiché" value={deptForm.name} onChange={(v) => setDeptForm((p) => ({ ...p, name: v }))} placeholder="Ex : Direction Générale" />
          </div>
          <InputField label="Nom complet (optionnel)" value={deptForm.fullName} onChange={(v) => setDeptForm((p) => ({ ...p, fullName: v }))} placeholder="Ex : Direction Générale et Stratégie" />
          <IconPicker selected={deptForm.iconIdx} onChange={(i) => setDeptForm((p) => ({ ...p, iconIdx: i }))} />
          <ColorPicker selected={deptForm.colorIdx} onChange={(i) => setDeptForm((p) => ({ ...p, colorIdx: i }))} />
          {(deptForm.name || deptForm.code) && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: prevTeinte.bgLight }}>
                <prevIcon.Icon size={18} color={prevTeinte.iconLight} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{deptForm.name || "—"}</p>
                <p className="text-xs text-gray-400">{deptForm.fullName || deptForm.code || "—"}</p>
              </div>
            </div>
          )}
        </Modal>
      )}

      {modal === "add-service" && (
        <Modal title={`Ajouter un service — ${departments.find((d) => d.code === serviceTarget?.deptCode)?.name}`}
          onClose={closeModal} onConfirm={confirmAddService} confirmDisabled={!serviceForm.name.trim()}>
          <InputField label="Nom du service" value={serviceForm.name} onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))} placeholder="Ex : Contrôle qualité" />
          <InputField label="Chef de service" value={serviceForm.chef} onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))} placeholder="Ex : Marie Dupont" />
        </Modal>
      )}

      {modal === "edit-service" && (
        <Modal title="Modifier le service" onClose={closeModal} onConfirm={confirmEditService}
          confirmLabel="Enregistrer" confirmDisabled={!serviceForm.name.trim()}>
          <InputField label="Nom du service" value={serviceForm.name} onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))} placeholder="Nom du service" />
          <InputField label="Chef de service" value={serviceForm.chef} onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))} placeholder="Chef de service" />
        </Modal>
      )}

      {modal === "add-employe" && (
        <Modal title="Ajouter un employé" onClose={closeModal} onConfirm={confirmAddEmploye}
          confirmDisabled={!empForm.prenom.trim() || !empForm.nom.trim()}>
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Prénom" value={empForm.prenom} onChange={(v) => setEmpForm((p) => ({ ...p, prenom: v }))} placeholder="Ex : Jean" />
            <InputField label="Nom" value={empForm.nom} onChange={(v) => setEmpForm((p) => ({ ...p, nom: v }))} placeholder="Ex : Rakoto" />
          </div>
          <SelectField label="Catégorie" value={empForm.categorie} onChange={(v) => setEmpForm((p) => ({ ...p, categorie: v }))} options={CATEGORIES} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Ancienneté (ans)" type="number" value={empForm.anciennete} onChange={(v) => setEmpForm((p) => ({ ...p, anciennete: v }))} />
            <InputField label="Nb enfants" type="number" value={empForm.nb_enfants} onChange={(v) => setEmpForm((p) => ({ ...p, nb_enfants: v }))} />
          </div>
          <SelectField label="Situation familiale" value={empForm.situation} onChange={(v) => setEmpForm((p) => ({ ...p, situation: v }))} options={SITUATIONS} />
          <InputField label="Email" value={empForm.email} onChange={(v) => setEmpForm((p) => ({ ...p, email: v }))} placeholder="email@spat.mg" />
          <InputField label="Téléphone" value={empForm.telephone} onChange={(v) => setEmpForm((p) => ({ ...p, telephone: v }))} placeholder="034 12 345 67" />
          <InputField label="Adresse" value={empForm.adresse} onChange={(v) => setEmpForm((p) => ({ ...p, adresse: v }))} placeholder="Antananarivo" />
          <InputField label="Salaire (Ar)" type="number" value={empForm.salaire} onChange={(v) => setEmpForm((p) => ({ ...p, salaire: v }))} placeholder="2500000" />
        </Modal>
      )}

      {/* NOUVEAU : Modal Détail Employé ERP */}
      {modal === "detail-employe" && detailData && (
        <ModalDetailEmployeERP
          employe={detailData.emp}
          dept={detailData.dept}
          service={detailData.service}
          onClose={closeModal}
          onEdit={() => { /* TODO: Edit mode */ }}
          onDelete={() => { deleteEmploye(detailData.dept.code, detailData.service.id, detailData.emp.id); closeModal(); }}
        />
      )}
    </div>
  );
}