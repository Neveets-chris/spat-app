import { useState } from "react";
import {
  BarChart2, User, Scale, Anchor, Wrench, Landmark,Wallet,
  ChevronDown, Pencil, Plus, Trash2, Search, Layers, X, Check, Eye,
  Shield, Laptop, HandCoins, Globe, Truck, FlaskConical, BookOpen,
  Headphones, Megaphone, Leaf, Cpu, Database, FileText, Star,
  Zap, Package, Settings, Map, Phone, Camera, Music, Heart,
} from "lucide-react";

// ─── Icon options (Lucide) ────────────────────────────────────────────────────
const ICON_OPTIONS = [
  { label: "BarChart2",    Icon: BarChart2 },
  { label: "Users",        Icon: User },
  { label: "HandCoins",       Icon: HandCoins },
  { label: "Scale",        Icon: Scale },
  { label: "Anchor",       Icon: Anchor },
  { label: "Wrench",       Icon: Wrench },
  { label: "Landmark",    Icon: Landmark},
  { label: "Shield",       Icon: Shield },
  { label: "Laptop",       Icon: Laptop },
  { label: "Wallet",    Icon: Wallet },
  { label: "Globe",        Icon: Globe },
  { label: "Truck",        Icon: Truck },
  { label: "FlaskConical", Icon: FlaskConical },
  { label: "BookOpen",     Icon: BookOpen },
  { label: "Headphones",   Icon: Headphones },
  { label: "Megaphone",    Icon: Megaphone },
  { label: "Leaf",         Icon: Leaf },
  { label: "Cpu",          Icon: Cpu },
  { label: "Database",     Icon: Database },
  { label: "FileText",     Icon: FileText },
  { label: "Star",         Icon: Star },
  { label: "Zap",          Icon: Zap },
  { label: "Package",      Icon: Package },
  { label: "Settings",     Icon: Settings },
  { label: "Map",          Icon: Map },
  { label: "Phone",        Icon: Phone },
  { label: "Camera",       Icon: Camera },
  { label: "Music",        Icon: Music },
  { label: "Heart",        Icon: Heart },
];

// ─── Color teintes : bg light / bg dark / icon light / icon dark ──────────────
const COLOR_TEINTES = [
  { label: "Bleu",    bgLight: "#dbeafe", bgDark: "#1e3a5f", iconLight: "#1e40af", iconDark: "#93c5fd" },
  { label: "Violet",  bgLight: "#ede9fe", bgDark: "#3b1f6e", iconLight: "#5b21b6", iconDark: "#c4b5fd" },
  { label: "Vert",    bgLight: "#d1fae5", bgDark: "#064e3b", iconLight: "#065f46", iconDark: "#6ee7b7" },
  { label: "Ambre",   bgLight: "#fef3c7", bgDark: "#451a03", iconLight: "#92400e", iconDark: "#fcd34d" },
  { label: "Cyan",    bgLight: "#cffafe", bgDark: "#083344", iconLight: "#0e7490", iconDark: "#67e8f9" },
  { label: "Rouge",   bgLight: "#fee2e2", bgDark: "#450a0a", iconLight: "#991b1b", iconDark: "#fca5a5" },
  { label: "Rose",    bgLight: "#fce7f3", bgDark: "#500724", iconLight: "#9d174d", iconDark: "#f9a8d4" },
  { label: "Indigo",  bgLight: "#e0e7ff", bgDark: "#1e1b4b", iconLight: "#3730a3", iconDark: "#a5b4fc" },
  { label: "Teal",    bgLight: "#ccfbf1", bgDark: "#042f2e", iconLight: "#0f766e", iconDark: "#5eead4" },
  { label: "Orange",  bgLight: "#ffedd5", bgDark: "#431407", iconLight: "#c2410c", iconDark: "#fdba74" },
  { label: "Lime",    bgLight: "#ecfccb", bgDark: "#1a2e05", iconLight: "#3f6212", iconDark: "#bef264" },
  { label: "Gris",    bgLight: "#f3f4f6", bgDark: "#1f2937", iconLight: "#374151", iconDark: "#d1d5db" },
];

const CATEGORIES = ["Cadre supérieur", "Cadre moyen", "Agent maîtrise", "Agent exécution"];
const SITUATIONS = ["Célibataire", "Marié", "Divorcé", "Veuf"];
const AVATAR_COLORS = ["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ef4444","#ec4899","#0e7490"];

// ─── Données initiales ────────────────────────────────────────────────────────
const INITIAL_DEPARTMENTS = [
  {
    code: "DSIA", name: "DSIA",
    fullName: "Direction Système d'Information et Audit",
    iconIdx: 0, colorIdx: 0,
    services: [
      { id: "s1", name: "Contrôle de gestion", chef: "Marie Dupont",
        employes: [{ id:"e1",prenom:"Jean",nom:"Randria",matricule:"MAT001",categorie:"Cadre moyen",anciennete:5,situation:"Marié",nb_enfants:2 }] },
      { id: "s2", name: "Audit",                    chef: "Paul Rabe",  employes: [] },
      { id: "s3", name: "Organisation",             chef: "Sara Mbola", employes: [] },
      { id: "s4", name: "Informatique et télécom",  chef: "Luc Andria",
        employes: [{ id:"e2",prenom:"Alice",nom:"Ratovo",matricule:"MAT002",categorie:"Cadre supérieur",anciennete:8,situation:"Célibataire",nb_enfants:0 }] },
    ],
  },
  {
    code: "DRH", name: "DRH",
    fullName: "Direction des Ressources Humaines",
    iconIdx: 1, colorIdx: 1,
    services: [
      { id: "s5", name: "Développement des RH",       chef: "Emma Razaf",  employes: [] },
      { id: "s6", name: "Administration et Paie",     chef: "Noël Ravelo", employes: [] },
      { id: "s7", name: "Centre de perfectionnement", chef: "Haja Tsirim", employes: [] },
      { id: "s8", name: "Médecine et pharmacie",      chef: "Dr. Koto",    employes: [] },
    ],
  },
  {
    code: "DAF", name: "DAF",
    fullName: "Direction Administrative et Financière",
    iconIdx: 2, colorIdx: 2,
    services: [
      { id: "s9",  name: "Finances",     chef: "René Raham", employes: [] },
      { id: "s10", name: "Recouvrement", chef: "Nivo Andr",  employes: [] },
      { id: "s11", name: "Comptabilité", chef: "Aina Rado",  employes: [] },
      { id: "s12", name: "Fiscalité",    chef: "Fara Toto",  employes: [] },
    ],
  },
  {
    code: "DAJPP", name: "DAJPP",
    fullName: "Direction des Affaires Juridiques et du Patrimoine Portuaire",
    iconIdx: 3, colorIdx: 3,
    services: [
      { id: "s13", name: "Contrats et Patrimoine Portuaire",  chef: "Meva Rabem", employes: [] },
      { id: "s14", name: "Analyse économique et expansion",   chef: "Tojo Rakot", employes: [] },
      { id: "s15", name: "Contentieux",                       chef: "Lydia Raz",  employes: [] },
      { id: "s16", name: "Facturation",                       chef: "Bodo Randr", employes: [] },
    ],
  },
  {
    code: "CAP", name: "Direction CAP",
    fullName: "Direction Capitainerie et Affaires Portuaires",
    iconIdx: 4, colorIdx: 4,
    services: [
      { id: "s17", name: "Trafic maritime",     chef: "Capitaine Solo", employes: [] },
      { id: "s18", name: "Police portuaire",    chef: "Cdt Rabe",       employes: [] },
      { id: "s19", name: "Sécurité et secours", chef: "Off. Aina",      employes: [] },
      { id: "s20", name: "Armement",            chef: "Ing. Dago",      employes: [] },
    ],
  },
  {
    code: "DT", name: "DT",
    fullName: "Direction Technique",
    iconIdx: 5, colorIdx: 5,
    services: [
      { id: "s21", name: "Maintenances",               chef: "Ing. Fara",  employes: [] },
      { id: "s22", name: "Travaux neufs",               chef: "Arch. Rado", employes: [] },
      { id: "s23", name: "Études et planification",     chef: "Ing. Meva",  employes: [] },
      { id: "s24", name: "Installations spécialisées",  chef: "Tech. Bodo", employes: [] },
    ],
  },
  {
    code: "DAGE", name: "DAGE",
    fullName: "Direction Administration Générale et Engagement",
    iconIdx: 6, colorIdx: 6,
    services: [
      { id: "s25", name: "Marketing et Développement",  chef: "Noro Rabem", employes: [] },
      { id: "s26", name: "HST E",                        chef: "Tiana Rak",  employes: [] },
      { id: "s27", name: "Engagement social (RSE)",      chef: "Lala Rand",  employes: [] },
      { id: "s28", name: "Communication interne",        chef: "Zo Ratov",   employes: [] },
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
    "Cadre moyen":     "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    "Agent maîtrise":  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    "Agent exécution": "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
  };
  return map[cat] || "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
}

// ─── Hook : détection du dark mode (réactif) ─────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof window !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useState(() => {
    if (typeof window === "undefined") return;
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  });
  return dark;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ prenom, nom, size = "md" }) {
  const initials = (prenom[0] || "").toUpperCase() + (nom[0] || "").toUpperCase();
  const sz = size === "lg" ? "w-11 h-11 text-base" : size === "sm" ? "w-7 h-7 text-xs" : "w-8 h-8 text-sm";
  return (
    <div className={`${sz} rounded-full flex items-center justify-center text-white font-bold shrink-0`}
      style={{ background: avatarColor(nom) }}>
      {initials}
    </div>
  );
}

// ─── Modal wrapper ────────────────────────────────────────────────────────────
function Modal({ title, onClose, onConfirm, confirmLabel = "Ajouter", confirmDisabled = false, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 shrink-0">
          <span className="text-base font-bold text-gray-900 dark:text-white">{title}</span>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {children}
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 justify-end shrink-0">
          <button onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={confirmDisabled}
            className={`px-5 py-2 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-colors ${confirmDisabled ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-400 dark:text-gray-500" : "bg-[#0F2D56] hover:bg-[#1a3f75] cursor-pointer"}`}>
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
      <label className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full px-3 py-2 rounded-xl border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#0F2D56] dark:focus:border-blue-400 transition-colors";

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
      <div className="grid grid-cols-8 gap-1.5 max-h-40 overflow-y-auto p-2 rounded-xl border border-[#E0DDD7] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        {ICON_OPTIONS.map(({ label, Icon }, i) => (
          <button key={label} onClick={() => onChange(i)} title={label}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${selected === i ? "bg-[#0F2D56] text-white" : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"}`}>
            <Icon size={16} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </Field>
  );
}

// ─── Color Picker (teintes rondes) ────────────────────────────────────────────
function ColorPicker({ selected, onChange }) {
  return (
    <Field label="Teinte de couleur">
      <div className="flex flex-wrap gap-2.5 p-3 rounded-xl border border-[#E0DDD7] dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        {COLOR_TEINTES.map((t, i) => (
          <button key={t.label} onClick={() => onChange(i)} title={t.label}
            className="relative w-8 h-8 rounded-full transition-transform hover:scale-110 focus:outline-none shrink-0"
            style={{
              background: t.bgLight,
              border: selected === i ? `3px solid ${t.iconLight}` : "2px solid transparent",
              boxShadow: selected === i ? `0 0 0 1px ${t.iconLight}` : "none",
            }}>
            {selected === i && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check size={13} color={t.iconLight} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500">
        Sélectionné : <span className="font-semibold text-gray-700 dark:text-gray-300">{COLOR_TEINTES[selected]?.label}</span>
      </p>
    </Field>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function ModalDetailEmploye({ employe, deptName, service, onClose }) {
  const rows = [
    ["Département", deptName],
    ["Service", service.name],
    ["Chef de service", service.chef],
    ["Catégorie", employe.categorie],
    ["Ancienneté", `${employe.anciennete} ans`],
    ["Situation", employe.situation],
    ["Nb enfants", employe.nb_enfants],
    ["Matricule", employe.matricule],
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar prenom={employe.prenom} nom={employe.nom} size="lg" />
            <div>
              <p className="font-black text-[#0F2D56] dark:text-white">{employe.prenom} {employe.nom}</p>
              <p className="text-xs font-mono text-gray-400">{employe.matricule}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <X size={14} />
          </button>
        </div>
        <div className="px-6 py-4">
          {rows.map(([label, val]) => (
            <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-400 dark:text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-[#0F2D56] dark:text-gray-200">{val}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2.5">
            <span className="text-sm text-gray-400 dark:text-gray-500">Éligibilité logement</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${employe.anciennete >= 2 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}>
              {employe.anciennete >= 2 ? "Éligible" : "En attente"}
            </span>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-[#0F2D56] hover:bg-[#1a3f75] text-white text-sm font-semibold transition-colors">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Service Row ──────────────────────────────────────────────────────────────
function ServiceRow({ service, bg, ic, deptCode, onAddEmploye, onEditService, onDeleteService, onDeleteEmploye, onDetailEmploye }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-3 py-3 pl-8 pr-4 cursor-pointer select-none transition-colors ${open ? "bg-gray-50 dark:bg-gray-800/60" : "hover:bg-gray-50/70 dark:hover:bg-gray-800/30"}`}>
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
            className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
            <Plus size={13} strokeWidth={2.5} />
          </button>
          <button title="Modifier" onClick={() => onEditService(deptCode, service)}
            className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition-colors">
            <Pencil size={12} strokeWidth={2} />
          </button>
          <button title="Supprimer" onClick={() => onDeleteService(deptCode, service.id)}
            className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors">
            <Trash2 size={12} strokeWidth={2} />
          </button>
        </div>
        <div className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800">
          {service.employes.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-600 pl-10 py-3 italic">Aucun employé dans ce service.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0F2D56]/5 dark:bg-gray-800">
                    {["Employé","Matricule","Catégorie","Ancienneté","Situation",""].map((h) => (
                      <th key={h} className={`text-left py-2.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide ${h==="Employé" ? "pl-10 pr-3" : "px-3"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {service.employes.map((emp) => (
                    <tr key={emp.id}
                      className="border-t border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition-colors">
                      <td className="pl-10 pr-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar prenom={emp.prenom} nom={emp.nom} size="sm" />
                          <span className="font-semibold text-[#0F2D56] dark:text-white text-xs">{emp.prenom} {emp.nom}</span>
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
                        <div className="flex gap-1.5">
                          <button title="Détail" onClick={() => onDetailEmploye(service, emp)}
                            className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <Eye size={12} strokeWidth={2} />
                          </button>
                          <button title="Supprimer" onClick={() => onDeleteEmploye(deptCode, service.id, emp.id)}
                            className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors">
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
    <div className={`bg-[#F7F5F0] dark:bg-gray-900 border border-[#E0DDD7] dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-shadow ${open ? "shadow-md" : ""}`}>
      <div onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-4 px-5 py-4 cursor-pointer select-none transition-colors ${open ? "bg-white/60 dark:bg-gray-800/60" : "hover:bg-white/40 dark:hover:bg-gray-800/30"}`}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
          <Icon size={20} color={ic} strokeWidth={1.8} />
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
            className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors">
            <Plus size={15} strokeWidth={2.5} />
          </button>
          <button title="Supprimer le département" onClick={() => onDeleteDept(dept.code)}
            className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-800/50 transition-colors">
            <Trash2 size={13} strokeWidth={2} />
          </button>
        </div>
        <div className={`transition-transform duration-300 shrink-0 ${open ? "rotate-180" : ""}`}>
          <ChevronDown size={15} className="text-gray-400" />
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E0DDD7] dark:border-gray-700">
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
                onDetailEmploye={(s, emp) => onDetailEmploye(dept, s, emp)}
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

  const [deptForm, setDeptForm]       = useState({ code: "", name: "", fullName: "", iconIdx: 0, colorIdx: 0 });
  const [serviceForm, setServiceForm] = useState({ name: "", chef: "" });
  const [serviceTarget, setServiceTarget] = useState(null);
  const [empForm, setEmpForm]         = useState({ prenom: "", nom: "", categorie: CATEGORIES[3], anciennete: 0, situation: SITUATIONS[0], nb_enfants: 0 });
  const [empTarget, setEmpTarget]     = useState(null);
  const [detailData, setDetailData]   = useState(null);

  const closeModal = () => setModal(null);

  // Dept
  const openAddDept = () => { setDeptForm({ code:"", name:"", fullName:"", iconIdx:0, colorIdx:0 }); setModal("add-dept"); };
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
  const openAddService = (deptCode) => { setServiceForm({ name:"", chef:"" }); setServiceTarget({ deptCode }); setModal("add-service"); };
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
  const openAddEmploye = (deptCode, serviceId) => { setEmpForm({ prenom:"", nom:"", categorie: CATEGORIES[3], anciennete:0, situation: SITUATIONS[0], nb_enfants:0 }); setEmpTarget({ deptCode, serviceId }); setModal("add-employe"); };
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
  const totalServices = departments.reduce((a, d) => a + d.services.length, 0);
  const totalEmps = departments.reduce((a, d) => a + d.services.reduce((b, s) => b + s.employes.length, 0), 0);

  const prevTeinte = COLOR_TEINTES[deptForm.colorIdx] || COLOR_TEINTES[0];
  const prevIcon = ICON_OPTIONS[deptForm.iconIdx] || ICON_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-black text-[#0F2D56] dark:text-white">Gestion des départements</h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              {departments.length} directions · {totalServices} services · {totalEmps} employés
            </p>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input type="text" placeholder="Rechercher..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-2 rounded-xl border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#0F2D56] dark:focus:border-blue-400 w-56 transition-colors" />
            </div>
            <button onClick={openAddDept}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F2D56] hover:bg-[#1a3f75] text-white text-sm font-semibold transition-colors">
              <Plus size={15} strokeWidth={2.5} /> Nouveau département
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 dark:text-gray-600 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
              Aucun résultat pour « {search} »
            </div>
          ) : (
            filtered.map((dept) => (
              <DepartmentCard key={dept.code} dept={dept} isDark={isDark}
                onAddService={openAddService}
                onEditService={openEditService}
                onDeleteService={deleteService}
                onAddEmploye={openAddEmploye}
                onDeleteEmploye={deleteEmploye}
                onDetailEmploye={openDetail}
                onDeleteDept={deleteDept}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal: Add Dept */}
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

      {/* Modal: Add Service */}
      {modal === "add-service" && (
        <Modal title={`Ajouter un service — ${departments.find((d) => d.code === serviceTarget?.deptCode)?.name}`}
          onClose={closeModal} onConfirm={confirmAddService} confirmDisabled={!serviceForm.name.trim()}>
          <InputField label="Nom du service" value={serviceForm.name} onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))} placeholder="Ex : Contrôle qualité" />
          <InputField label="Chef de service" value={serviceForm.chef} onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))} placeholder="Ex : Marie Dupont" />
        </Modal>
      )}

      {/* Modal: Edit Service */}
      {modal === "edit-service" && (
        <Modal title="Modifier le service" onClose={closeModal} onConfirm={confirmEditService}
          confirmLabel="Enregistrer" confirmDisabled={!serviceForm.name.trim()}>
          <InputField label="Nom du service" value={serviceForm.name} onChange={(v) => setServiceForm((p) => ({ ...p, name: v }))} placeholder="Nom du service" />
          <InputField label="Chef de service" value={serviceForm.chef} onChange={(v) => setServiceForm((p) => ({ ...p, chef: v }))} placeholder="Chef de service" />
        </Modal>
      )}

      {/* Modal: Add Employé */}
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
        </Modal>
      )}

      {/* Modal: Détail Employé */}
      {modal === "detail-employe" && detailData && (
        <ModalDetailEmploye
          employe={detailData.emp}
          deptName={detailData.dept.name}
          service={detailData.service}
          onClose={closeModal}
        />
      )}
    </div>
  );
}