import { useRef, useState, useEffect } from "react";
import {
  BrickWall, Building2, KeyRound, LayoutDashboard,
  UsersRound, Wallet, LogOut, Mail, BadgeCheck,
  Camera, Upload, UserCircle, ChevronRight, Sparkles,
   Settings, 
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Tableau de bord", icon: LayoutDashboard, color: "from-blue-500 to-blue-600" },
  { id: "logements",    label: "Logements",        icon: Building2, color: "from-emerald-500 to-emerald-600" },
  { id: "employes",     label: "Employés",         icon: UsersRound, color: "from-violet-500 to-violet-600" },
  { id: "attributions", label: "Attributions",     icon: KeyRound, color: "from-amber-500 to-amber-600" },
  { id: "materiaux",    label: "Matériaux",        icon: BrickWall, color: "from-rose-500 to-rose-600" },
  { id: "depenses",     label: "Dépenses",         icon: Wallet, color: "from-cyan-500 to-cyan-600" },
];

// SVG Avatar homme
function AvatarHomme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      <defs>
        <linearGradient id="gradHomme" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gradHomme)" />
      <circle cx="50" cy="38" r="18" fill="#dbeafe" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#dbeafe" />
    </svg>
  );
}

// SVG Avatar femme
function AvatarFemme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
      <defs>
        <linearGradient id="gradFemme" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="gradCheveux" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#gradFemme)" />
      <circle cx="50" cy="38" r="18" fill="#fce7f3" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#fce7f3" />
      <ellipse cx="50" cy="24" rx="20" ry="10" fill="url(#gradCheveux)" />
      <ellipse cx="32" cy="36" rx="6" ry="14" fill="url(#gradCheveux)" />
      <ellipse cx="68" cy="36" rx="6" ry="14" fill="url(#gradCheveux)" />
    </svg>
  );
}

// Composant NavItem avec animations
function NavItem({ item, isActive, isOpen, onClick }) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-300 relative overflow-hidden ${
        isActive
          ? "text-white font-semibold shadow-lg shadow-blue-900/20"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {/* Background gradient actif */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-90`} />
      )}
      
      {/* Hover effect */}
      {!isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Icon container */}
      <span className={`relative z-10 shrink-0 p-2 rounded-lg transition-all duration-300 ${
        isActive 
          ? "bg-white/20" 
          : "bg-white/5 group-hover:bg-white/10"
      }`}>
        <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
      </span>
      
      {/* Label */}
      <span className={`relative z-10 truncate transition-all duration-300 ${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 md:hidden"
      }`}>
        {item.label}
      </span>
      
      {/* Active indicator dot */}
      {isActive && isOpen && (
        <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      )}
    </button>
  );
}

export default function Sidebar({ page, setPage, open, onClose }) {
  const { user, logout, updateProfil } = useAuth();
  const [profilOpen, setProfilOpen]   = useState(false);
  const [avatarOpen, setAvatarOpen]   = useState(false);
  const [uploading, setUploading]     = useState(false);
  const profilRef  = useRef(null);
  const fileRef    = useRef(null);
  const cameraRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profilRef.current && !profilRef.current.contains(e.target)) {
        setProfilOpen(false);
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initiales = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "??";

  const choisirType = async (type) => {
    setUploading(true);
    try { await updateProfil({ avatarType: type }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  const importerPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { await updateProfil({ file }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  const prendrePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { await updateProfil({ file }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  const renderAvatar = (size = 32, className = "") => {
    if (user?.avatar_type === "photo" && user?.avatar_url) {
      return (
        <img
          src={user.avatar_url}
          alt="profil"
          className={`rounded-full object-cover ring-2 ring-white/20 ${className}`}
          style={{ width: size, height: size }}
        />
      );
    }
    if (user?.avatar_type === "homme") {
      return <AvatarHomme size={size} />;
    }
    if (user?.avatar_type === "femme") {
      return <AvatarFemme size={size} />;
    }
    return (
      <div
        className={`rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center text-white font-black ring-2 ring-white/20 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.35 }}
      >
        {initiales}
      </div>
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 md:hidden animate-in fade-in duration-200" onClick={onClose} />
      )}

      <aside className={`
        fixed md:relative z-30 md:z-auto h-full
        ${open ? "w-64 translate-x-0" : "w-16 -translate-x-full md:translate-x-0"}
        bg-gradient-to-b from-[#0F2D56] via-[#0F2D56] to-[#0a1f3d] dark:from-gray-900 dark:via-gray-900 dark:to-gray-950
        border-r border-[#1a3f75]/50 dark:border-gray-800
        flex flex-col transition-all duration-300 ease-spring shrink-0
        shadow-2xl shadow-black/20
      `}>

        {/* Logo amélioré */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1a3f75]/30 dark:border-gray-800/50">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[#C9A84C]/20 shrink-0 ring-2 ring-white/10">
            S
          </div>
          <div className={`overflow-hidden transition-all duration-500 ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
            <p className="font-black text-white text-sm whitespace-nowrap tracking-wide">SPAT</p>
            <p className="text-white/50 text-xs whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A84C]" />
              Gestion Logements
            </p>
          </div>
        </div>

        {/* Navigation avec espacement amélioré */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {NAV_ITEMS.map((item, index) => (
            <div key={item.id} style={{ animationDelay: `${index * 50}ms` }} className={open ? "animate-in slide-in-from-left-4 duration-300" : ""}>
              <NavItem 
                item={item}
                isActive={page === item.id}
                isOpen={open}
                onClick={() => { setPage(item.id); if (window.innerWidth < 768) onClose(); }}
              />
            </div>
          ))}
        </nav>

        {/* Séparateur stylisé */}
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[#1a3f75]/50 to-transparent dark:via-gray-700/50" />

        {/* Zone profil améliorée */}
        <div className="p-3 relative" ref={profilRef}>

          {/* Bulle profil */}
          {profilOpen && (
            <div className="absolute bottom-20 left-2 right-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 animate-in zoom-in-95 duration-200">
              
              {/* Header gradient */}
              <div className="bg-gradient-to-r from-[#0F2D56] to-[#1a4a7a] px-4 py-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                
                <div className="flex items-center gap-3 relative z-10">
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="relative group shrink-0"
                    title="Changer l'avatar"
                  >
                    {renderAvatar(52)}
                    <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 ring-2 ring-white/30">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{user?.username || "—"}</p>
                    <p className="text-white/60 text-xs truncate">{user?.email || "—"}</p>
                    <button
                      onClick={() => setAvatarOpen(!avatarOpen)}
                      className="text-[#C9A84C] text-xs hover:text-[#e0c066] transition-colors mt-0.5 flex items-center gap-1"
                    >
                      <Settings className="w-3 h-3" />
                      Changer l'avatar
                    </button>
                  </div>
                </div>
              </div>

              {/* Sélecteur d'avatar */}
              {avatarOpen && (
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/80">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-1">
                    <UserCircle className="w-3 h-3" />
                    Choisir un avatar
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Initiales */}
                    <button
                      onClick={() => choisirType("initiales")}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        user?.avatar_type === "initiales" || !user?.avatar_type
                          ? "border-[#C9A84C] bg-gradient-to-b from-amber-50 to-amber-100/50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#a88a3c] flex items-center justify-center text-white font-black text-sm shadow-lg">
                        {initiales}
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Initiales</span>
                    </button>

                    {/* Avatar homme */}
                    <button
                      onClick={() => choisirType("homme")}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        user?.avatar_type === "homme"
                          ? "border-blue-400 bg-gradient-to-b from-blue-50 to-blue-100/50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12">
                        <AvatarHomme size={48} />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Homme</span>
                    </button>

                    {/* Avatar femme */}
                    <button
                      onClick={() => choisirType("femme")}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                        user?.avatar_type === "femme"
                          ? "border-pink-400 bg-gradient-to-b from-pink-50 to-pink-100/50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <div className="w-12 h-12">
                        <AvatarFemme size={48} />
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Femme</span>
                    </button>
                  </div>

                  {/* Actions import */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileRef.current.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#0F2D56] hover:bg-[#1a4a7a] text-white text-xs py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-900/20"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Importer
                    </button>
                    <button
                      onClick={() => cameraRef.current.click()}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs py-2.5 rounded-xl transition-all"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Photo
                    </button>
                  </div>

                  {uploading && (
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <div className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs text-gray-500">Envoi en cours...</p>
                    </div>
                  )}

                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={importerPhoto} />
                  <input ref={cameraRef} type="file" accept="image/*" capture="user" className="hidden" onChange={prendrePhoto} />
                </div>
              )}

              {/* Infos utilisateur */}
              <div className="px-4 py-3 space-y-3">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <UserCircle className="w-5 h-5 text-[#C9A84C]" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Utilisateur</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{user?.username || "—"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                  <Mail className="w-5 h-5 text-[#C9A84C]" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{user?.email || "—"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <BadgeCheck className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Statut</p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">En ligne</p>
                  </div>
                </div>
              </div>

              {/* Déconnexion */}
              <div className="px-4 pb-4 pt-2">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-rose-500/25 hover:scale-[1.02] active:scale-95"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}

          {/* Bouton profil compact */}
          <button
            onClick={() => { setProfilOpen(!profilOpen); setAvatarOpen(false); }}
            className={`w-full flex items-center gap-3 rounded-xl p-2 transition-all duration-300 ${
              profilOpen ? 'bg-white/15' : 'hover:bg-white/10'
            }`}
          >
            <div className="shrink-0 relative">
              {renderAvatar(36)}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0F2D56] dark:border-gray-900 rounded-full" />
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 flex-1 text-left ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
              <p className="text-xs font-semibold text-white truncate">
                {user?.username || "Utilisateur"}
              </p>
              <p className="text-[10px] text-white/50 truncate">
                {user?.email || "—"}
              </p>
            </div>
            
            {open && (
              <ChevronRight className={`w-4 h-4 text-white/40 transition-transform duration-300 ${profilOpen ? 'rotate-90' : ''}`} />
            )}
          </button>

        </div>
      </aside>
    </>
  );
}