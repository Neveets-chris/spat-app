import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
//import ToggleTheme from "./ToggleTheme";
import { 
  Bell, 
  TriangleAlert, 
  Coins, 
  Axe, 
  Warehouse,
  CheckCheck,
  X,
  Sun,
  Moon
} from "lucide-react";

function timeAgo() {
  const mins = Math.floor(Math.random() * 59) + 1;
  return mins < 60 ? `il y a ${mins} min` : `il y a ${Math.floor(mins / 60)}h`;
}

export default function Header({
  titre,
  setSidebarOpen,
  sidebarOpen,
  darkMode,
  setDarkMode,
}) {
  const { depenses, materiaux, attributions, logements } = useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [lues, setLues] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const notifications = [
    ...depenses
      .filter((d) => d.statut === "En attente")
      .map((d) => ({
        id: `dep-${d.id}`,
        type: "warning",
        icon: Coins,
        titre: "Dépense en attente",
        message: `${d.description} — ${new Intl.NumberFormat("fr-MG").format(d.montant)} Ar`,
        temps: timeAgo(),
      })),
    ...materiaux
      .filter((m) => m.stock <= m.seuil)
      .map((m) => ({
        id: `mat-${m.id}`,
        type: "danger",
        icon: TriangleAlert,
        titre: "Stock bas",
        message: `${m.nom} — ${m.stock} ${m.unite} restants (seuil : ${m.seuil})`,
        temps: timeAgo(),
      })),
    ...logements
      .filter((l) => l.statut === "Maintenance")
      .map((l) => ({
        id: `log-${l.id}`,
        type: "info",
        icon: Axe,
        titre: "Logement en maintenance",
        message: `${l.id} — ${l.type} — ${l.localisation}`,
        temps: timeAgo(),
      })),
    ...attributions
      .filter((a) => a.statut === "Occupé")
      .slice(0, 2)
      .map((a) => ({
        id: `att-${a.id}`,
        type: "success",
        icon: Warehouse,
        titre: "Logement occupé",
        message: `${a.departement} occupe ${a.logement} — ${a.occupants.length} occupant(s)`,
        temps: timeAgo(),
      })),
  ];

  const nonLues = notifications.filter((n) => !lues[n.id]).length;

  const marquerToutLu = () => {
    const all = {};
    notifications.forEach((n) => { all[n.id] = true; });
    setLues(all);
  };

  const marquerLu = (id) => setLues((prev) => ({ ...prev, [id]: true }));

  const typeStyles = {
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-l-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400"
    },
    danger: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-l-rose-400",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400"
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-l-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-l-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400"
    },
  };

  const initiales = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="bg-[#0F2D56] dark:bg-gray-900 border-b border-[#1a3f75] dark:border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between shrink-0">

      {/* Gauche */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/60 hover:text-white transition text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
        >
          ☰
        </button>
        <h1 className="font-bold text-white tracking-wide text-sm md:text-base truncate max-w-[150px] md:max-w-none">
          {titre}
        </h1>
      </div>

      {/* Droite */}
      <div className="flex items-center gap-2 md:gap-3">

        {/* Date */}
        <span className="text-xs text-white/50 hidden lg:block">
          {new Date().toLocaleDateString("fr-MG", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>

        {/* Toggle thème amélioré */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none"
          style={{
            background: darkMode 
              ? "linear-gradient(90deg, #1e293b 0%, #334155 100%)" 
              : "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)"
          }}
        >
          <div 
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 flex items-center justify-center"
            style={{
              left: darkMode ? "calc(100% - 22px)" : "2px",
            }}
          >
            {darkMode ? (
              <Moon className="w-3 h-3 text-indigo-600" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </div>
        </button>

        {/* Cloche + Dropdown - FONCTIONNEL */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition relative"
          >
            <Bell className="w-5 h-5 text-yellow-400" />
          </button>
          {nonLues > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A84C] text-white text-xs rounded-full flex items-center justify-center font-bold">
              {nonLues > 9 ? "9+" : nonLues}
            </span>
          )}

          {open && (
            <div className="absolute right-0 top-11 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
              {/* Header style Untitled UI */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#0F2D56] dark:text-[#C9A84C]" />
                  <div>
                    <p className="font-bold text-[#0F2D56] dark:text-white text-sm">Notifications</p>
                    <p className="text-xs text-gray-400">{nonLues} non lue{nonLues > 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {nonLues > 0 && (
                    <button 
                      onClick={marquerToutLu}
                      className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition"
                      title="Tout marquer lu"
                    >
                      <CheckCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-sm text-gray-400">Aucune notification</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const styles = typeStyles[n.type];
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        onClick={() => marquerLu(n.id)}
                        className={`px-4 py-3 cursor-pointer hover:brightness-95 transition border-b border-gray-100 dark:border-gray-800 last:border-0 ${styles.bg} ${styles.border} border-l-4 ${lues[n.id] ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`shrink-0 w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-bold text-gray-800 dark:text-white">{n.titre}</p>
                              {!lues[n.id] && <span className="w-2 h-2 rounded-full bg-[#C9A84C] shrink-0" />}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{n.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{n.temps}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <p className="text-xs text-center text-gray-400">
                  {notifications.length} notification{notifications.length > 1 ? "s" : ""} au total
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Avatar simple (comme avant) */}
        <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-xs font-black select-none">
          {initiales}
        </div>

      </div>
    </header>
  );
}