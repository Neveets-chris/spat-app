import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { estEnLigne, texteActivite, grouperMessagesParJour, heureMessage } from "../utils/presence";
import { api } from "../api";
import {
  LayoutDashboard,
  Home,
  FileText,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  User,
  MapPin,
  Ruler,
  CalendarClock,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Users,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Loader2,
  AlertTriangle,
  Camera,
  Upload,
  UserCircle,
  Search,
  Mail,
  Phone,
  BookUser,
  Eye,
  MessageCircle,
  ArrowLeft,
  Send,
} from "lucide-react";

const TYPES_LOGEMENT = ["Studio", "F1", "F2", "F3", "F4", "Villa"];

// SVG Avatar homme / femme — repris à l'identique de components/Sidebar.jsx
function AvatarHomme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      <defs>
        <linearGradient id="gradHommeEE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gradHommeEE)" />
      <circle cx="50" cy="38" r="18" fill="#dbeafe" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#dbeafe" />
    </svg>
  );
}

function AvatarFemme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      <defs>
        <linearGradient id="gradFemmeEE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="gradCheveuxEE" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gradFemmeEE)" />
      <circle cx="50" cy="38" r="18" fill="#fce7f3" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#fce7f3" />
      <ellipse cx="50" cy="24" rx="20" ry="10" fill="url(#gradCheveuxEE)" />
      <ellipse cx="32" cy="36" rx="6" ry="14" fill="url(#gradCheveuxEE)" />
      <ellipse cx="68" cy="36" rx="6" ry="14" fill="url(#gradCheveuxEE)" />
    </svg>
  );
}

const THEMES = {
  dark: {
    text: "text-white",
    textMuted: "text-white/70",
    textSubtle: "text-white/50",
    textLight: "text-white/40",
    card: "bg-gray-900 border-white/10",
    input: "bg-white/5 border-white/10 text-white",
    buttonSecondary: "border-white/20 text-white/70 hover:bg-white/5",
    statBlue: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
    statEmerald: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
    statAmber: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    statViolet: "from-violet-500/20 to-violet-600/5 border-violet-500/30",
  },
  light: {
    text: "text-gray-900",
    textMuted: "text-gray-700",
    textSubtle: "text-gray-500",
    textLight: "text-gray-400",
    card: "bg-gradient-to-br from-slate-100 to-slate-200/80 border-gray-300/70",
    input: "bg-white border-gray-300 text-gray-800",
    buttonSecondary: "border-gray-300 text-gray-600 hover:bg-gray-100",
    statBlue: "from-blue-200/90 to-blue-100/70 border-blue-300/60",
    statEmerald: "from-emerald-200/90 to-emerald-100/70 border-emerald-300/60",
    statAmber: "from-amber-200/90 to-amber-100/70 border-amber-300/60",
    statViolet: "from-violet-200/90 to-violet-100/70 border-violet-300/60",
  },
};

const ICON_COLORS = {
  blue: "bg-blue-500 text-white",
  emerald: "bg-emerald-500 text-white",
  amber: "bg-amber-500 text-white",
  violet: "bg-violet-500 text-white",
};

function useCountUp(end, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const start = Date.now();
    let raf;
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      if (current !== ref.current) {
        ref.current = current;
        setCount(current);
      }
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [end, duration]);
  return count;
}

function useReveal(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  };
}

function StatCard3D({ icon: Icon, label, value, subValue, color, delay = 0, isDark, isNumber = true }) {
  const animated = useCountUp(isNumber ? value : 0);
  const style = useReveal(delay);
  const theme = isDark ? THEMES.dark : THEMES.light;
  const gradients = {
    blue: theme.statBlue,
    emerald: theme.statEmerald,
    amber: theme.statAmber,
    violet: theme.statViolet,
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
              className={`w-12 h-12 rounded-xl ${ICON_COLORS[color]} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
            >
              <Icon className="w-6 h-6" />
            </div>
          </div>
          <div className="space-y-1">
            <p className={`text-2xl font-black tracking-tight drop-shadow-lg ${theme.text}`}>
              {isNumber ? animated.toLocaleString() : value}
            </p>
            <p className={`text-sm font-medium ${theme.textMuted}`}>{label}</p>
            {subValue && <p className={`text-xs ${theme.textLight}`}>{subValue}</p>}
          </div>
        </div>
        <div
          className={`absolute inset-0 rounded-2xl border transition-colors duration-300 pointer-events-none ${isDark ? "border-white/0 group-hover:border-white/20" : "border-gray-200/0 group-hover:border-gray-300"}`}
        />
      </div>
    </div>
  );
}

function Card({ children, className = "", isDark }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  return (
    <div className={`${theme.card} border rounded-2xl shadow-sm dark:shadow-none ${className}`}>
      {children}
    </div>
  );
}

function StatutBadge({ statut }) {
  const styles = {
    "En attente": "bg-amber-100 text-amber-700 border border-amber-200",
    "Résolue": "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "Annulée": "bg-rose-100 text-rose-700 border border-rose-200",
  };
  const icons = { "En attente": Clock, "Résolue": CheckCircle2, "Annulée": XCircle };
  const Icon = icons[statut] || Clock;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[statut] || "bg-gray-100 text-gray-600"}`}>
      <Icon size={12} />
      {statut}
    </span>
  );
}

function AvatarPicker() {
  const { user, updateProfil } = useAuth();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const ref = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initiales = user?.username ? user.username.slice(0, 2).toUpperCase() : "??";

  const choisirType = async (type) => {
    setUploading(true);
    try {
      await updateProfil({ avatarType: type });
    } finally {
      setUploading(false);
      setOpen(false);
    }
  };

  const importerPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await updateProfil({ file });
    } finally {
      setUploading(false);
      setOpen(false);
    }
  };

  const renderAvatar = (size = 36) => {
    if (user?.avatar_type === "photo" && user?.avatar_url) {
      return <img src={user.avatar_url} alt="profil" className="rounded-full object-cover" style={{ width: size, height: size }} />;
    }
    if (user?.avatar_type === "homme") return <AvatarHomme size={size} />;
    if (user?.avatar_type === "femme") return <AvatarFemme size={size} />;
    return (
      <div
        className="rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center text-white font-black"
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initiales}
      </div>
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className="relative group" title="Changer l'avatar">
        {renderAvatar(36)}
        <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 p-4">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
            <UserCircle className="w-3 h-3" /> Choisir un avatar
          </p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={() => choisirType("initiales")}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${user?.avatar_type === "initiales" || !user?.avatar_type ? "border-[#C9A84C] bg-amber-50 dark:bg-amber-500/10" : "border-gray-200 dark:border-white/10"}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center text-white font-black text-xs">
                {initiales}
              </div>
              <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">Initiales</span>
            </button>
            <button
              onClick={() => choisirType("homme")}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${user?.avatar_type === "homme" ? "border-blue-400 bg-blue-50 dark:bg-blue-500/10" : "border-gray-200 dark:border-white/10"}`}
            >
              <AvatarHomme size={40} />
              <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">Homme</span>
            </button>
            <button
              onClick={() => choisirType("femme")}
              className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all ${user?.avatar_type === "femme" ? "border-pink-400 bg-pink-50 dark:bg-pink-500/10" : "border-gray-200 dark:border-white/10"}`}
            >
              <AvatarFemme size={40} />
              <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">Femme</span>
            </button>
          </div>
          <button
            onClick={() => fileRef.current.click()}
            disabled={uploading}
            className="w-full flex items-center justify-center gap-1.5 bg-[#0F2D56] hover:bg-[#1a4a7a] text-white text-xs py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            Importer une photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={importerPhoto} />
        </div>
      )}
    </div>
  );
}


function PageAnnuaire({ isDark, onVoirProfil, onMessagerEmploye }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const [annuaire, setAnnuaire] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [chargement, setChargement] = useState(true);
  // Messages non lus PAR personne (façon Facebook), pour la pastille sur
  // chaque carte de l'annuaire — indépendant du compteur global du header.
  const [nonLusParPersonne, setNonLusParPersonne] = useState({});
  // Force un re-render chaque seconde pour que "Actif il y a Xs" avance
  // en direct, sans devoir refaire une requête réseau à chaque tick.
  const [, setTick] = useState(0);

  useEffect(() => {
    let actif = true;
    setChargement(true);
    const t = setTimeout(() => {
      api.getAnnuaireEmployes(recherche).then((res) => {
        if (actif) {
          setAnnuaire(res);
          setChargement(false);
        }
      });
    }, 250);
    return () => {
      actif = false;
      clearTimeout(t);
    };
  }, [recherche]);

  // Rafraîchit périodiquement les statuts de présence des autres employés
  // (pas de websocket : simple polling léger toutes les 15s).
  useEffect(() => {
    const interval = setInterval(() => {
      api.getAnnuaireEmployes(recherche).then(setAnnuaire).catch(() => {});
    }, 15000);
    return () => clearInterval(interval);
  }, [recherche]);

  // Charge le nombre de messages non lus par expéditeur, pour afficher un
  // petit badge (1, 2, ... 9+) directement sur la carte de la personne
  // concernée dans l'annuaire — comme les notifications Facebook.
  useEffect(() => {
    const chargerNonLus = () => {
      api.getConversations()
        .then((res) => {
          const map = {};
          (res || []).forEach((c) => {
            if (c.non_lus > 0) map[c.user_id] = c.non_lus;
          });
          setNonLusParPersonne(map);
        })
        .catch(() => {});
    };
    chargerNonLus();
    const interval = setInterval(chargerNonLus, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Regroupement par département pour une lecture plus claire
  const parDepartement = annuaire.reduce((acc, e) => {
    const key = e.departement_nom || "Autre";
    (acc[key] = acc[key] || []).push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="relative">
        <Search size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${theme.textLight}`} />
        <input
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher un employé par nom..."
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#C9A84C] ${theme.input}`}
        />
      </div>

      {chargement ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-[#0F2D56]" size={24} />
        </div>
      ) : annuaire.length === 0 ? (
        <Card isDark={isDark} className="p-8 text-center">
          <BookUser size={32} className="mx-auto text-gray-300 mb-2" />
          <p className={`text-sm ${theme.textLight}`}>Aucun employé trouvé.</p>
        </Card>
      ) : (
        Object.entries(parDepartement).map(([dep, employes]) => (
          <div key={dep} className="space-y-2">
            <h3 className={`text-xs font-bold uppercase tracking-wide ${theme.textSubtle} px-1`}>
              {dep} · {employes.length}
            </h3>
            {/* overflow-visible + padding : les cartes qui grandissent au
                survol (façon Netflix) ne doivent pas être coupées par le
                conteneur ni pousser les voisines. */}
            <div className="flex flex-wrap gap-3 py-2 overflow-visible">
              {employes.map((e) => {
                const enLigne = estEnLigne(e.derniere_activite);
                const nbNonLus = e.user_id ? (nonLusParPersonne[e.user_id] || 0) : 0;
                return (
                  <div
                    key={e.id}
                    className="group relative w-[168px] shrink-0"
                    style={{ isolation: "isolate" }}
                  >
                    <div
                      className={`relative rounded-xl border p-3 cursor-default transition-all duration-300 ease-out
                        group-hover:scale-[1.35] group-hover:z-30 group-hover:shadow-2xl group-hover:-translate-y-1
                        ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-gray-200"}`}
                    >
                      {/* Minimum visible en permanence */}
                      <div className="flex flex-col items-center text-center gap-1.5">
                        <div className="relative">
                          {e.avatar_type === "photo" && e.avatar_url ? (
                            <img src={e.avatar_url} alt="" className="w-12 h-12 rounded-full object-cover" />
                          ) : e.avatar_type === "homme" ? (
                            <AvatarHomme size={48} />
                          ) : e.avatar_type === "femme" ? (
                            <AvatarFemme size={48} />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center text-white text-sm font-bold">
                              {e.prenom[0]}{e.nom[0]}
                            </div>
                          )}
                          <span
                            title={enLigne ? "En ligne" : texteActivite(e.derniere_activite)}
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 ${
                              isDark ? "border-gray-900" : "border-white"
                            } ${enLigne ? "bg-emerald-500" : "bg-gray-400"}`}
                          />
                          {nbNonLus > 0 && (
                            <span
                              title={`${nbNonLus} message${nbNonLus > 1 ? "s" : ""} non lu${nbNonLus > 1 ? "s" : ""}`}
                              className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-900 z-10"
                            >
                              {nbNonLus > 9 ? "9+" : nbNonLus}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-semibold truncate w-full ${theme.text}`}>
                          {e.prenom} {e.nom}
                        </p>
                        <p className={`text-[10px] truncate w-full ${theme.textSubtle}`}>
                          {e.service_nom}
                        </p>
                      </div>

                      {/* Détails + icônes révélés uniquement au survol */}
                      <div className="hidden group-hover:block mt-2.5 pt-2.5 border-t border-dashed border-gray-200 dark:border-white/10 animate-fadeIn">
                        <p className={`text-[10px] ${theme.textSubtle}`}>{e.categorie || "—"}</p>
                        <p className={`text-[10px] font-medium mt-0.5 ${enLigne ? "text-emerald-500" : theme.textLight}`}>
                          {texteActivite(e.derniere_activite)}
                        </p>
                        <div className="flex items-center justify-center gap-1.5 mt-2.5">
                          <button
                            title="Envoyer un message"
                            onClick={() => onMessagerEmploye?.(e)}
                            className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0F2D56] text-white hover:bg-[#1a4a7a] transition-colors"
                          >
                            <MessageCircle size={13} />
                          </button>
                          <button
                            title="Visiter le profil"
                            onClick={() => onVoirProfil?.(e)}
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                              isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <Eye size={13} />
                          </button>
                          {e.email && (
                            <a
                              title="Email"
                              href={`mailto:${e.email}`}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              <Mail size={13} />
                            </a>
                          )}
                          {e.telephone && (
                            <a
                              title="Téléphone"
                              href={`tel:${e.telephone}`}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              <Phone size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function PageProfilEmploye({ isDark, employeId, onRetour, chatInitialementOuvert }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const [profil, setProfil] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [chatOuvert, setChatOuvert] = useState(!!chatInitialementOuvert);
  const [, setTick] = useState(0);

  // Chat
  const [messages, setMessages] = useState([]);
  const [texteMessage, setTexteMessage] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const zoneMessagesRef = useRef(null);

  useEffect(() => {
    setChargement(true);
    setErreur("");
    api
      .getProfilEmploye(employeId)
      .then(setProfil)
      .catch(() => setErreur("Impossible de charger ce profil."))
      .finally(() => setChargement(false));
  }, [employeId]);

  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Charge le fil de discussion à l'ouverture, puis le rafraîchit par
  // polling toutes les 3s tant que la fenêtre est ouverte (pas de
  // websocket, cohérent avec le choix fait pour le statut en ligne).
  useEffect(() => {
    if (!chatOuvert || !profil?.user_id) return;
    let actif = true;
    const charger = () => {
      api.getMessagesAvec(profil.user_id).then((res) => {
        if (actif) setMessages(res);
      }).catch(() => {});
    };
    charger();
    const interval = setInterval(charger, 3000);
    return () => {
      actif = false;
      clearInterval(interval);
    };
  }, [chatOuvert, profil?.user_id]);

  useEffect(() => {
    zoneMessagesRef.current?.scrollTo({ top: zoneMessagesRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const envoyerMessage = async () => {
    const contenu = texteMessage.trim();
    if (!contenu || !profil?.user_id || envoiEnCours) return;
    setEnvoiEnCours(true);
    setTexteMessage("");
    try {
      const nouveau = await api.envoyerMessage(profil.user_id, contenu);
      setMessages((prev) => [...prev, nouveau]);
    } catch {
      setTexteMessage(contenu); // on remet le texte si l'envoi a échoué
    } finally {
      setEnvoiEnCours(false);
    }
  };

  if (chargement) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-[#0F2D56]" size={28} />
      </div>
    );
  }

  if (erreur || !profil) {
    return (
      <Card isDark={isDark} className="p-8 text-center">
        <AlertTriangle size={28} className="mx-auto text-amber-500 mb-2" />
        <p className={`text-sm ${theme.textLight}`}>{erreur}</p>
        <button onClick={onRetour} className="mt-3 text-sm text-[#0F2D56] dark:text-blue-300 font-semibold hover:underline">
          ← Retour à l'annuaire
        </button>
      </Card>
    );
  }

  const enLigne = estEnLigne(profil.derniere_activite);

  const champs = [
    { label: "Matricule", value: profil.matricule },
    { label: "Catégorie", value: profil.categorie },
    { label: "Ancienneté", value: `${profil.anciennete} an${profil.anciennete > 1 ? "s" : ""}` },
    { label: "Situation familiale", value: `${profil.situation}${profil.nb_enfants ? ` · ${profil.nb_enfants} enfant(s)` : ""}` },
    { label: "Service", value: profil.service_nom },
    { label: "Département", value: profil.departement_nom },
  ];

  const collegues = profil.collegues || [];
  const nombreCollegues = profil.nombre_collegues ?? collegues.length;

  return (
    <div className="space-y-4 animate-fadeIn">
      <button onClick={onRetour} className={`flex items-center gap-1.5 text-sm font-medium ${theme.textLight} hover:text-[#0F2D56] dark:hover:text-blue-300`}>
        <ArrowLeft size={15} /> Retour à l'annuaire
      </button>

      <div className="p-6 rounded-2xl shadow-sm bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a]">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative">
            {profil.avatar_type === "photo" && profil.avatar_url ? (
              <img src={profil.avatar_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/30" />
            ) : profil.avatar_type === "homme" ? (
              <AvatarHomme size={64} />
            ) : profil.avatar_type === "femme" ? (
              <AvatarFemme size={64} />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white text-xl font-bold">
                {profil.prenom[0]}{profil.nom[0]}
              </div>
            )}
            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0F2D56] ${enLigne ? "bg-emerald-400" : "bg-gray-400"}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{profil.prenom} {profil.nom}</h2>
            <p className="text-white/70 text-sm mt-0.5">{profil.categorie} · {profil.service_nom}</p>
            <p className={`text-xs mt-1 font-medium ${enLigne ? "text-emerald-300" : "text-white/50"}`}>
              {texteActivite(profil.derniere_activite)}
            </p>
          </div>
          {profil.est_chef_service && (
            <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              <ShieldCheck size={13} /> Chef de service
            </span>
          )}
        </div>
      </div>

      <Card isDark={isDark} className="p-5">
        <h3 className={`text-xs font-bold uppercase tracking-wide ${theme.textSubtle} mb-3`}>Informations</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {champs.map((c) => (
            <div key={c.label} className="flex justify-between text-sm border-b border-dashed border-gray-200 dark:border-white/10 pb-2">
              <span className={theme.textLight}>{c.label}</span>
              <span className={`font-medium ${theme.text}`}>{c.value || "—"}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card isDark={isDark} className="p-5">
        <h3 className={`text-xs font-bold uppercase tracking-wide ${theme.textSubtle} mb-3`}>Contact</h3>
        <div className="flex flex-wrap gap-3">
          {profil.email && (
            <a href={`mailto:${profil.email}`} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isDark ? "bg-white/5 text-gray-200 hover:bg-white/10" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
              <Mail size={15} /> {profil.email}
            </a>
          )}
          {profil.telephone && (
            <a href={`tel:${profil.telephone}`} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${isDark ? "bg-white/5 text-gray-200 hover:bg-white/10" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}>
              <Phone size={15} /> {profil.telephone}
            </a>
          )}
          {!profil.email && !profil.telephone && (
            <p className={`text-sm ${theme.textLight}`}>Aucune coordonnée renseignée.</p>
          )}
        </div>
      </Card>

      {/* Collègues du même service — donnees reelles issues du serializer */}
      <Card isDark={isDark} className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-xs font-bold uppercase tracking-wide ${theme.textSubtle}`}>
            Collègues de service
          </h3>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isDark ? "bg-white/10 text-gray-200" : "bg-gray-100 text-gray-600"}`}>
            {nombreCollegues}
          </span>
        </div>
        {collegues.length === 0 ? (
          <p className={`text-sm ${theme.textLight}`}>
            {profil.prenom} est actuellement seul(e) dans ce service.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {collegues.map((c) => (
              <span
                key={c.id}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isDark ? "bg-white/5 text-gray-200" : "bg-gray-50 text-gray-700"}`}
              >
                <span className="w-5 h-5 rounded-full bg-[#0F2D56]/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#0F2D56] dark:text-blue-200">
                  {c.prenom[0]}{c.nom[0]}
                </span>
                {c.prenom} {c.nom}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Bouton message flottant, fixé — même emplacement/style que Logi */}
      <button
        onClick={() => setChatOuvert((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #0F2D56 0%, #1a4a7a 50%, #C9A84C 100%)" }}
        title={`Envoyer un message à ${profil.prenom}`}
      >
        <div className="text-white">{chatOuvert ? <X size={22} /> : <MessageCircle size={22} />}</div>
      </button>

      {chatOuvert && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: "min(420px, calc(100vh - 12rem))",
            background: "linear-gradient(180deg, #0a1929 0%, #0F2D56 100%)",
            border: "1px solid rgba(26,74,122,0.6)",
          }}
        >
            <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid rgba(26,74,122,0.4)", background: "rgba(15,45,86,0.8)" }}>
              <div className="relative w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {profil.prenom[0]}{profil.nom[0]}
                <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0F2D56] ${enLigne ? "bg-emerald-400" : "bg-gray-400"}`} />
              </div>
              <div className="min-w-0">
                <div className="text-white font-bold text-sm truncate">{profil.prenom} {profil.nom}</div>
                <div className="text-blue-300 text-xs flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full inline-block ${enLigne ? "bg-emerald-400" : "bg-gray-400"}`} />
                  {texteActivite(profil.derniere_activite)}
                </div>
              </div>
              <button onClick={() => setChatOuvert(false)} className="ml-auto text-blue-300 hover:text-white transition-colors shrink-0">
                <X size={18} />
              </button>
            </div>
            <div ref={zoneMessagesRef} className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
              {messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
                  <MessageCircle size={28} className="text-blue-300/40" />
                  <p className="text-blue-300/60 text-xs px-6">
                    Aucun message pour l'instant. Écris quelque chose à {profil.prenom} !
                  </p>
                </div>
              ) : (
                grouperMessagesParJour(messages).map((item) =>
                  item.type === "separateur" ? (
                    <div key={item.key} className="flex items-center justify-center my-1">
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide text-blue-300/70 bg-white/5">
                        {item.label}
                      </span>
                    </div>
                  ) : (
                    <div key={item.key} className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                      item.message.moi
                        ? "self-end text-white rounded-br-sm"
                        : "self-start text-blue-100 rounded-bl-sm"
                    }`}
                      style={{
                        background: item.message.moi
                          ? "linear-gradient(135deg, #0F2D56, #1a4a7a)"
                          : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {item.message.contenu}
                      <div className={`text-[10px] mt-1 ${item.message.moi ? "text-blue-200/70" : "text-blue-300/50"}`}>
                        {heureMessage(item.message.date_envoi)}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
            <div className="p-3 flex items-center gap-2" style={{ borderTop: "1px solid rgba(26,74,122,0.4)" }}>
              <input
                value={texteMessage}
                onChange={(e) => setTexteMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    envoyerMessage();
                  }
                }}
                placeholder="Écrire un message..."
                className="flex-1 min-w-0 px-3 py-2 rounded-xl text-sm bg-white/5 text-white placeholder:text-blue-300/40 outline-none focus:bg-white/10 transition-colors"
              />
              <button
                onClick={envoyerMessage}
                disabled={!texteMessage.trim() || envoiEnCours}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                  texteMessage.trim() && !envoiEnCours
                    ? "text-white"
                    : "bg-white/5 text-blue-300/40 cursor-not-allowed"
                }`}
                style={texteMessage.trim() && !envoiEnCours ? { background: "linear-gradient(135deg, #0F2D56, #1a4a7a)" } : {}}
              >
                <Send size={15} />
              </button>
            </div>
        </div>
      )}
    </div>
  );
}

function PageAccueil({ setPage, isDark, data, demandeEnAttente }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const { employe, service, departement, collegues, logement_actuel, est_chef_service } = data;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-6 rounded-2xl shadow-sm bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a]">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <p className="text-white/70 text-sm font-medium">Bonjour,</p>
            <h2 className="text-2xl font-bold text-white mt-0.5">
              {employe.prenom} {employe.nom}
            </h2>
            <p className="text-white/60 text-sm mt-2">
              {departement.nom} · {service.nom}
            </p>
          </div>
          {est_chef_service && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/20">
              <ShieldCheck size={13} /> Habilité à soumettre une demande
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard3D icon={Briefcase} label="Mon service" value={service.nom} subValue={departement.nom} color="blue" delay={0} isDark={isDark} isNumber={false} />
        <StatCard3D icon={Users} label="Collègues du service" value={collegues.length} subValue="dans mon service" color="violet" delay={80} isDark={isDark} />
        <StatCard3D
          icon={Building2}
          label={logement_actuel ? "Logement du service" : "Aucun logement"}
          value={logement_actuel ? logement_actuel.logement_reference || "—" : "—"}
          subValue={logement_actuel?.logement_detail?.type || "Non attribué"}
          color={logement_actuel ? "emerald" : "amber"}
          delay={160}
          isDark={isDark}
          isNumber={false}
        />
        <StatCard3D
          icon={TrendingUp}
          label="Demande active"
          value={demandeEnAttente ? "En attente" : "Aucune"}
          subValue="statut du service"
          color={demandeEnAttente ? "amber" : "emerald"}
          delay={240}
          isDark={isDark}
          isNumber={false}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card isDark={isDark} className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
              <User size={18} className="text-[#0F2D56] dark:text-blue-300" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Mon profil</h3>
          </div>
          <dl className={`text-sm space-y-1.5 ${theme.textMuted}`}>
            <div className="flex justify-between">
              <dt>Matricule</dt>
              <dd className={`font-medium ${theme.text}`}>{employe.matricule}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Catégorie</dt>
              <dd className={`font-medium ${theme.text}`}>{employe.categorie || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Ancienneté</dt>
              <dd className={`font-medium ${theme.text}`}>{employe.anciennete ?? 0} ans</dd>
            </div>
            <div className="flex justify-between">
              <dt>Situation familiale</dt>
              <dd className={`font-medium ${theme.text}`}>
                {employe.situation || "—"} · {employe.nb_enfants ?? 0} enfant(s)
              </dd>
            </div>
          </dl>
        </Card>

        <Card isDark={isDark} className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
              <Users size={18} className="text-violet-700 dark:text-violet-300" />
            </div>
            <h3 className={`font-semibold ${theme.text}`}>Mon service — {service.nom}</h3>
          </div>
          <p className={`text-xs ${theme.textSubtle} mb-3`}>
            Chef de service : <span className={`font-medium ${theme.textMuted}`}>{service.chef || "—"}</span>
          </p>
          {collegues.length === 0 ? (
            <p className={`text-sm ${theme.textLight}`}>Aucun autre employé dans ce service.</p>
          ) : (
            <ul className="space-y-1.5">
              {collegues.map((c) => (
                <li key={c.id} className={`flex items-center justify-between text-sm ${theme.textMuted}`}>
                  <span>{c.prenom} {c.nom}</span>
                  <span className={`text-xs ${theme.textLight}`}>{c.categorie || ""}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card isDark={isDark} className="p-5 flex items-start gap-3">
        <ShieldCheck size={18} className="text-[#0F2D56] dark:text-blue-300 mt-0.5 shrink-0" />
        <p className={`text-sm ${theme.textMuted}`}>
          Le logement est attribué au niveau du <strong>service</strong>, pas individuellement. La demande de
          logement se fait donc au nom de tout le service{" "}
          <button onClick={() => setPage("demandes")} className="text-[#0F2D56] dark:text-blue-300 font-semibold hover:underline">
            (voir « Demande du service »)
          </button>
          .
        </p>
      </Card>
    </div>
  );
}

function PageLogement({ isDark, data }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const { logement_actuel, service } = data;

  if (!logement_actuel) {
    return (
      <Card isDark={isDark} className="p-10 text-center animate-fadeIn">
        <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
        <h3 className={`font-semibold ${theme.text}`}>Aucun logement attribué au service</h3>
        <p className={`text-sm ${theme.textSubtle} mt-1`}>
          Le service {service.nom} n'a pas de logement actif pour le moment.
        </p>
      </Card>
    );
  }

  const detail = logement_actuel.logement_detail || {};
  const infos = [
    { icon: MapPin, label: "Localisation", value: detail.localisation || "—" },
    { icon: Ruler, label: "Capacité", value: detail.nb_occupants_max ? `${detail.nb_occupants_max} pers. max` : "—" },
    { icon: Building2, label: "Type", value: detail.type || "—" },
    { icon: CalendarClock, label: "Occupé depuis", value: logement_actuel.date_debut || "—" },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <Card isDark={isDark} className="p-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className={`text-lg font-bold ${theme.text}`}>{logement_actuel.logement_reference || detail.reference || "—"}</h2>
            <p className={`text-sm ${theme.textSubtle}`}>
              Attribué au service {service.nom} — {logement_actuel.statut}
            </p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 shrink-0">
            {logement_actuel.statut}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {infos.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-white/5">
              <Icon size={16} className="text-[#0F2D56] dark:text-blue-300 mt-0.5" />
              <div>
                <p className={`text-xs ${theme.textSubtle}`}>{label}</p>
                <p className={`text-sm font-medium ${theme.text}`}>{value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card isDark={isDark} className="p-5">
        <h3 className={`font-semibold ${theme.text} mb-3 flex items-center gap-2`}>
          <Users size={16} /> Occupants actuels ({(logement_actuel.occupants || []).length})
        </h3>
        {(logement_actuel.occupants || []).length === 0 ? (
          <p className={`text-sm ${theme.textLight}`}>Aucun occupant renseigné.</p>
        ) : (
          <ul className="space-y-2">
            {logement_actuel.occupants.map((nom) => (
              <li key={nom} className={`flex items-center gap-2.5 text-sm ${theme.textMuted}`}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center text-white text-[10px] font-bold">
                  {nom.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                {nom}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function PageDemandes({ isDark, data, demandes, demandeEnAttente, onDemandeCreee }) {
  const theme = isDark ? THEMES.dark : THEMES.light;
  const { service, est_chef_service, logement_actuel } = data;
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState("F2");
  const [motif, setMotif] = useState("");
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [erreur, setErreur] = useState("");

  // logement_actuel n'est renvoyé par le backend que s'il existe une
  // attribution "Occupé" pour ce service : une attribution en Maintenance
  // (ou Terminée) ne compte pas, le service est alors considéré "non logé"
  // et redevient éligible à une nouvelle demande.
  const serviceDejaLoge = !!logement_actuel;
  const peutSoumettre = est_chef_service && !demandeEnAttente && !serviceDejaLoge;

  const handleSubmit = async () => {
    if (!motif.trim() || !peutSoumettre) return;
    setEnvoiEnCours(true);
    setErreur("");
    try {
      await api.creerDemandeLogementService({
        type_logement_requis: type,
        motif,
      });
      setMotif("");
      setShowForm(false);
      onDemandeCreee();
    } catch (err) {
      const detail =
        err.response?.data?.detail ||
        (Array.isArray(err.response?.data) ? err.response.data[0] : null) ||
        "Erreur lors de l'envoi de la demande.";
      setErreur(detail);
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className={`font-semibold ${theme.text}`}>Demande de logement — {service.nom}</h2>
          <p className={`text-xs ${theme.textSubtle} mt-0.5`}>
            Une seule demande active à la fois, soumise par le chef de service.
          </p>
        </div>
        {est_chef_service && (
          <button
            onClick={() => setShowForm((s) => !s)}
            disabled={!peutSoumettre}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all ${
              !peutSoumettre
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
            }`}
          >
            <Plus size={16} />
            Nouvelle demande du service
          </button>
        )}
      </div>

      {!est_chef_service && (
        <Card isDark={isDark} className="p-4 flex items-start gap-3 bg-gray-50 dark:bg-white/5">
          <ShieldCheck size={16} className={`${theme.textSubtle} mt-0.5 shrink-0`} />
          <p className={`text-sm ${theme.textMuted}`}>
            Seul le chef de service (<strong>{service.chef || "non défini"}</strong>) peut soumettre une demande de
            logement au nom du service. Vous pouvez consulter l'historique ci-dessous en lecture seule.
          </p>
        </Card>
      )}

      {est_chef_service && demandeEnAttente && (
        <Card isDark={isDark} className="p-4 flex items-start gap-3 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30">
          <Clock size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Une demande (#{demandeEnAttente.id}) est déjà en attente pour le service. Une nouvelle demande ne peut
            être soumise qu'une fois celle-ci résolue.
          </p>
        </Card>
      )}

      {est_chef_service && !demandeEnAttente && serviceDejaLoge && (
        <Card isDark={isDark} className="p-4 flex items-start gap-3 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30">
          <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300">
            Le service est déjà logé — aucune nouvelle demande n'est possible tant qu'il l'est. Vous pourrez en
            soumettre une si le service redevient non logé (par exemple si le logement passe en maintenance).
          </p>
        </Card>
      )}

      {showForm && peutSoumettre && (
        <Card isDark={isDark} className="p-5 space-y-4">
          {erreur && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300 text-sm">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              {erreur}
            </div>
          )}
          <div>
            <label className={`text-xs font-semibold ${theme.textSubtle} block mb-1.5`}>
              Type de logement souhaité
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#C9A84C] ${theme.input}`}
            >
              {TYPES_LOGEMENT.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`text-xs font-semibold ${theme.textSubtle} block mb-1.5`}>
              Motif de la demande (au nom du service)
            </label>
            <textarea
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
              rows={3}
              placeholder="Ex : service à l'étroit, nouvelles affectations, rapprochement du lieu de travail..."
              className={`w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:border-[#C9A84C] resize-none ${theme.input}`}
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowForm(false)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border ${theme.buttonSecondary}`}
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              disabled={!motif.trim() || envoiEnCours}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              {envoiEnCours && <Loader2 size={14} className="animate-spin" />}
              Envoyer au nom du service
            </button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {demandes.length === 0 ? (
          <Card isDark={isDark} className="p-8 text-center">
            <FileText size={32} className="mx-auto text-gray-300 mb-2" />
            <p className={`text-sm ${theme.textLight}`}>Aucune demande pour ce service pour le moment.</p>
          </Card>
        ) : (
          demandes.map((d) => (
            <Card key={d.id} isDark={isDark} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-gray-500 dark:text-gray-300" />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${theme.text}`}>
                    Logement {d.type_logement_requis} — #{d.id}
                  </p>
                  <p className={`text-xs ${theme.textSubtle} truncate`}>{d.motif || "—"}</p>
                  <p className={`text-xs ${theme.textLight} mt-0.5`}>
                    Demandé le {d.date_demande} {d.demande_par_nom ? `par ${d.demande_par_nom}` : ""}
                  </p>
                </div>
              </div>
              <StatutBadge statut={d.statut} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { id: "accueil", label: "Accueil", icon: LayoutDashboard },
  { id: "logement", label: "Logement du service", icon: Home },
  { id: "demandes", label: "Demande du service", icon: FileText },
  { id: "annuaire", label: "Annuaire", icon: BookUser },
];

const TITRES = {
  accueil: "Tableau de bord",
  logement: "Logement du service",
  demandes: "Demande de logement du service",
  annuaire: "Annuaire des employés",
  profil: "Profil de l'employé",
};

export default function EspaceEmploye() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [page, setPage] = useState("accueil");
  const [profilCible, setProfilCible] = useState(null); // { id, ouvrirChat }
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [personnesNonLues, setPersonnesNonLues] = useState(0);

  const [data, setData] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");

  const chargerTout = useCallback(async () => {
    setErreur("");
    try {
      const [monService, mesDemandes] = await Promise.all([
        api.getMonService(),
        api.getMesDemandesLogement(),
      ]);
      setData(monService);
      setDemandes(Array.isArray(mesDemandes) ? mesDemandes : mesDemandes.results || []);
    } catch (err) {
      setErreur(
        err.response?.data?.detail ||
          "Impossible de charger votre espace employé. Réessayez plus tard."
      );
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    chargerTout();
  }, [chargerTout]);

  // Pastille façon Facebook : nombre de PERSONNES distinctes qui ont un
  // message non lu en attente (pas le nombre total de messages). On
  // rafraîchit par polling toutes les 10s, et immédiatement en revenant
  // sur la page profil/annuaire (les messages y sont marqués comme lus).
  const chargerNonLus = useCallback(() => {
    api.getNonLusCount()
      .then((res) => setPersonnesNonLues(res.personnes_non_lues ?? 0))
      .catch(() => {});
  }, []);

  useEffect(() => {
    chargerNonLus();
    const interval = setInterval(chargerNonLus, 10000);
    return () => clearInterval(interval);
  }, [chargerNonLus, page]);

  const demandeEnAttente = demandes.find((d) => d.statut === "En attente");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (chargement) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-blue-200/60 dark:bg-gray-950 dark:bg-none">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-[#0F2D56]" size={32} />
          <p className="text-sm text-gray-500">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  if (erreur || !data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-blue-200/60 dark:bg-gray-950 dark:bg-none p-6">
        <div className="max-w-sm text-center space-y-3">
          <AlertTriangle className="mx-auto text-amber-500" size={32} />
          <p className="text-sm text-gray-600 dark:text-gray-300">{erreur}</p>
          <button
            onClick={chargerTout}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a]"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen bg-gradient-to-br from-slate-300 via-slate-200 to-blue-200/60 dark:bg-gray-950 dark:bg-none font-['Inter'] overflow-hidden">
        <aside
          className={`fixed lg:static z-20 h-full w-64 bg-gradient-to-b from-slate-200 to-slate-300/70 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900 border-r border-gray-200/70 dark:border-white/10 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 dark:border-white/10">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#0F2D56] to-[#1a4a7a] flex items-center justify-center text-white font-bold text-sm">
              SL
            </div>
            <div>
              <p className="font-bold text-sm text-gray-800 dark:text-gray-100 leading-tight">SpatLoge</p>
              <p className="text-xs text-gray-400">Espace employé</p>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setPage(id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  page === id
                    ? "bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>

          <div className="px-3 py-4 border-t border-gray-100 dark:border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
            >
              <LogOut size={17} />
              Se déconnecter
            </button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-200 via-slate-200 to-blue-200/50 dark:bg-gray-900 dark:from-gray-900 dark:to-gray-900 border-b border-gray-200/70 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen((s) => !s)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
              <h1 className="font-bold text-gray-800 dark:text-gray-100">{TITRES[page]}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setPage("annuaire");
                  setProfilCible(null);
                }}
                className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-300"
                title="Messages"
              >
                <MessageCircle size={17} />
                {personnesNonLues > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-900">
                    {personnesNonLues > 9 ? "9+" : personnesNonLues}
                  </span>
                )}
              </button>
              <button
                onClick={() => setDarkMode((d) => !d)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-300"
              >
                {darkMode ? <Sun size={17} /> : <Moon size={17} />}
              </button>
              <AvatarPicker />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            {page === "accueil" && (
              <PageAccueil setPage={setPage} isDark={darkMode} data={data} demandeEnAttente={demandeEnAttente} />
            )}
            {page === "logement" && <PageLogement isDark={darkMode} data={data} />}
            {page === "demandes" && (
              <PageDemandes
                isDark={darkMode}
                data={data}
                demandes={demandes}
                demandeEnAttente={demandeEnAttente}
                onDemandeCreee={chargerTout}
              />
            )}
            {page === "annuaire" && (
              <PageAnnuaire
                isDark={darkMode}
                onVoirProfil={(e) => {
                  setProfilCible({ id: e.id, ouvrirChat: false });
                  setPage("profil");
                }}
                onMessagerEmploye={(e) => {
                  setProfilCible({ id: e.id, ouvrirChat: true });
                  setPage("profil");
                }}
              />
            )}
            {page === "profil" && profilCible && (
              <PageProfilEmploye
                isDark={darkMode}
                employeId={profilCible.id}
                chatInitialementOuvert={profilCible.ouvrirChat}
                onRetour={() => setPage("annuaire")}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}