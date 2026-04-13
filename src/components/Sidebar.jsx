import { useRef, useState, useEffect } from "react";
import {
  BrickWall, Building2, KeyRound, LayoutDashboard,
  UsersRound, Wallet, LogOut, Mail, BadgeCheck,
  Camera, Upload, UserCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Tableau de bord", icon: LayoutDashboard },
  { id: "logements",    label: "Logements",        icon: Building2 },
  { id: "employes",     label: "Employés",         icon: UsersRound },
  { id: "attributions", label: "Attributions",     icon: KeyRound },
  { id: "materiaux",    label: "Matériaux",        icon: BrickWall },
  { id: "depenses",     label: "Dépenses",         icon: Wallet },
];

// SVG Avatar homme
function AvatarHomme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#3B82F6" />
      <circle cx="50" cy="38" r="18" fill="#BFDBFE" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#BFDBFE" />
    </svg>
  );
}

// SVG Avatar femme
function AvatarFemme({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#EC4899" />
      <circle cx="50" cy="38" r="18" fill="#FCE7F3" />
      <ellipse cx="50" cy="85" rx="26" ry="20" fill="#FCE7F3" />
      {/* Cheveux */}
      <ellipse cx="50" cy="24" rx="20" ry="10" fill="#92400E" />
      <ellipse cx="32" cy="36" rx="6" ry="14" fill="#92400E" />
      <ellipse cx="68" cy="36" rx="6" ry="14" fill="#92400E" />
    </svg>
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

  // Choisir un avatar prédéfini
  const choisirType = async (type) => {
    setUploading(true);
    try { await updateProfil({ avatarType: type }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  // Importer une photo depuis l'ordinateur ou galerie
  const importerPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { await updateProfil({ file }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  // Prendre une photo via la caméra (mobile)
  const prendrePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { await updateProfil({ file }); }
    finally { setUploading(false); setAvatarOpen(false); }
  };

  // Rendu de l'avatar selon le type
  const renderAvatar = (size = 32, className = "") => {
    if (user?.avatar_type === "photo" && user?.avatar_url) {
      return (
        <img
          src={user.avatar_url}
          alt="profil"
          className={`rounded-full object-cover ${className}`}
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
    // Initiales par défaut
    return (
      <div
        className={`rounded-full bg-[#C9A84C] flex items-center justify-center text-white font-black ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.3 }}
      >
        {initiales}
      </div>
    );
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed md:relative z-30 md:z-auto h-full
        ${open ? "w-60 translate-x-0" : "w-60 -translate-x-full md:translate-x-0 md:w-16"}
        bg-[#0F2D56] dark:bg-gray-900
        border-r border-[#1a3f75] dark:border-gray-800
        flex flex-col transition-all duration-300 shrink-0
      `}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1a3f75] dark:border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-white font-black text-sm shrink-0">S</div>
          <div className={`overflow-hidden transition-all duration-300 ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
            <p className="font-black text-white text-sm whitespace-nowrap">SPAT</p>
            <p className="text-white/60 text-xs whitespace-nowrap">Gestion Logements</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); if (window.innerWidth < 768) onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                page === item.id
                  ? "bg-[#C9A84C] text-white font-semibold shadow"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="shrink-0"><item.icon className="w-4 h-4" /></span>
              <span className={`truncate transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0 md:hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="mx-4 border-t border-[#1a3f75] dark:border-gray-800" />

        {/* Zone profil */}
        <div className="p-3 relative" ref={profilRef}>

          {/* ── Bulle principale profil ── */}
          {profilOpen && (
            <div className="absolute bottom-16 left-2 right-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50">

              {/* En-tête avec avatar cliquable */}
              <div className="bg-[#0F2D56] px-4 py-4 flex items-center gap-3">
                <button
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="relative group shrink-0"
                  title="Changer l'avatar"
                >
                  {renderAvatar(48)}
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </button>
                <div>
                  <p className="text-white font-bold text-sm">{user?.username || "—"}</p>
                  <p className="text-white/60 text-xs">{user?.email || "—"}</p>
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="text-[#C9A84C] text-xs hover:underline mt-0.5"
                  >
                    Changer l'avatar
                  </button>
                </div>
              </div>

              {/* ── Sélecteur d'avatar (s'ouvre dans la bulle) ── */}
              {avatarOpen && (
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">Choisir un avatar</p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {/* Initiales */}
                    <button
                      onClick={() => choisirType("initiales")}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition ${
                        user?.avatar_type === "initiales"
                          ? "border-[#C9A84C] bg-amber-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-white font-black text-sm">
                        {initiales}
                      </div>
                      <span className="text-xs text-gray-500">Initiales</span>
                    </button>

                    {/* Avatar homme */}
                    <button
                      onClick={() => choisirType("homme")}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition ${
                        user?.avatar_type === "homme"
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <AvatarHomme size={40} />
                      <span className="text-xs text-gray-500">Homme</span>
                    </button>

                    {/* Avatar femme */}
                    <button
                      onClick={() => choisirType("femme")}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition ${
                        user?.avatar_type === "femme"
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <AvatarFemme size={40} />
                      <span className="text-xs text-gray-500">Femme</span>
                    </button>
                  </div>

                  {/* Importer / Caméra */}
                  <div className="flex gap-2">
                    {/* Depuis galerie / ordinateur */}
                    <button
                      onClick={() => fileRef.current.click()}
                      className="flex-1 flex items-center justify-center gap-1 bg-[#0F2D56] text-white text-xs py-2 rounded-xl hover:bg-[#1a3f75] transition"
                    >
                      <Upload className="w-3 h-3" />
                      Galerie / PC
                    </button>

                    {/* Depuis caméra (mobile) */}
                    <button
                      onClick={() => cameraRef.current.click()}
                      className="flex-1 flex items-center justify-center gap-1 bg-gray-600 text-white text-xs py-2 rounded-xl hover:bg-gray-700 transition"
                    >
                      <Camera className="w-3 h-3" />
                      Caméra
                    </button>
                  </div>

                  {uploading && (
                    <p className="text-xs text-center text-gray-400 mt-2">Envoi en cours...</p>
                  )}

                  {/* Inputs fichier cachés */}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={importerPhoto}
                  />
                  <input
                    ref={cameraRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={prendrePhoto}
                  />
                </div>
              )}

              {/* Infos */}
              <div className="px-4 py-3 space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <UserCircle className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="font-medium">Utilisateur :</span>
                  <span>{user?.username || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                  <span className="font-medium">Email :</span>
                  <span className="truncate">{user?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <BadgeCheck className="w-4 h-4 text-green-500 shrink-0" />
                  <span className="font-medium">Statut :</span>
                  <span className="text-green-600 font-semibold">Connecté</span>
                </div>
              </div>

              {/* Déconnexion */}
              <div className="px-4 pb-4">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              </div>
            </div>
          )}

          {/* Bouton profil en bas */}
          <button
            onClick={() => { setProfilOpen(!profilOpen); setAvatarOpen(false); }}
            className="w-full flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-white/10 transition"
          >
            <div className="shrink-0">{renderAvatar(32)}</div>
            <div className={`overflow-hidden transition-all duration-300 text-left ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
              <p className="text-xs font-semibold text-white truncate whitespace-nowrap">
                {user?.username || "Utilisateur"}
              </p>
              <p className="text-xs text-white/50 truncate whitespace-nowrap">
                {user?.email || "—"}
              </p>
            </div>
          </button>

        </div>
      </aside>
    </>
  );
}