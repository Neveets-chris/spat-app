import { useState, useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
<<<<<<< HEAD
import { 
  Bell, 
  TriangleAlert, 
  Coins, 
  Axe, 
  Warehouse,
=======
import {
  Bell,
  TriangleAlert,
  Coins,
  Axe,
  Wrench,
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
  CheckCheck,
  X,
  Sun,
  Moon,
  Menu,
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
  const {
    depenses,
    materiaux,
    notifications,
    marquerNotificationLue,
    marquerToutesNotificationsLues,
  } = useApp();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Notifications du contexte (maintenance, réparation, etc.)
  const notificationsAffichage = notifications.map((n) => {
    const typeMap = {
      maintenance: { type: "danger", icon: Axe, label: "Maintenance" },
      reparation: { type: "warning", icon: Wrench, label: "Réparation" },
      success: { type: "success", icon: CheckCheck, label: "Terminé" },
      stock: { type: "danger", icon: TriangleAlert, label: "Stock bas" },
      depense: { type: "warning", icon: Coins, label: "Dépense" },
    };

    const config = typeMap[n.type] || typeMap.stock;

    return {
      id: n.id,
      type: config.type,
      icon: config.icon,
      titre: n.titre,
      message: n.message,
      details: n.details,
      temps: `${n.date} ${n.heure}`,
      lue: n.lue,
      priorite: n.priorite,
    };
  });

  // Notifications dynamiques (stock bas, dépenses)
  const anciennesNotifications = [
    ...depenses
      .filter((d) => d.statut === "En attente")
      .map((d) => ({
        id: `dep-${d.id}`,
        type: "warning",
        icon: Coins,
        titre: "Dépense en attente",
        message: `${d.description} — ${new Intl.NumberFormat("fr-MG").format(d.montant)} Ar`,
        temps: timeAgo(),
        lue: false,
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
        lue: false,
      })),
  ];

  const toutesNotifications = [
    ...notificationsAffichage,
    ...anciennesNotifications,
  ];
  const nonLues = toutesNotifications.filter((n) => !n.lue).length;

  const marquerToutLu = () => {
    marquerToutesNotificationsLues();
  };

  const marquerLu = (id) => {
    marquerNotificationLue(id);
  };

  const typeStyles = {
    warning: {
      bg: "bg-amber-50 dark:bg-amber-900/20",
      border: "border-l-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    danger: {
      bg: "bg-rose-50 dark:bg-rose-900/20",
      border: "border-l-rose-400",
      iconBg: "bg-rose-100 dark:bg-rose-900/30",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      border: "border-l-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      border: "border-l-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  };

  

  return (
    <header className="bg-[#0F2D56] dark:bg-gray-900 border-b border-[#1a3f75] dark:border-gray-800 px-4 md:px-6 py-3 flex items-center justify-between shrink-0">
      {/* Gauche */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white/60 hover:text-white transition text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10"
        >
        <Menu className="w-6 h-6"/>
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

        <button
          onClick={setDarkMode}
          className="w-12 h-6 rounded-full relative transition-all duration-300 focus:outline-none"
          style={{
            background: darkMode
              ? "linear-gradient(90deg, #1e293b 0%, #334155 100%)"
              : "linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
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
                    <p className="font-bold text-[#0F2D56] dark:text-white text-sm">
                      Notifications
                    </p>
                    <p className="text-xs text-gray-400">
                      {nonLues} non lue{nonLues > 1 ? "s" : ""}
                    </p>
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
                {/* Dans le map des notifications */}
                {toutesNotifications.map((n) => {
                  const styles = typeStyles[n.type];
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      onClick={() => marquerLu(n.id)}
                      className={`px-4 py-3 cursor-pointer hover:brightness-95 transition border-b border-gray-100 dark:border-gray-800 last:border-0 ${styles.bg} ${styles.border} border-l-4 ${n.lue ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center`}
                        >
                          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-bold text-gray-800 dark:text-white">
                              {n.titre}
                            </p>
                            {!n.lue && (
                              <span className="w-2 h-2 rounded-full bg-[#C9A84C] shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                            {n.message}
                          </p>

                          {/* 🔥 DÉTAILS DES MATÉRIAUX AVEC BADGES */}
                          {n.details && n.details.includes("•") && (
                            <div className="mt-2 space-y-1">
                              {n.details.split("\n").map(
                                (line, i) =>
                                  line.startsWith("•") && (
                                    <span
                                      key={i}
                                      className={`inline-block text-[10px] px-2 py-0.5 rounded-full mr-1 mb-1 ${
                                        darkMode // ← utilisez darkMode ici, pas isDark
                                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                          : "bg-rose-100 text-rose-700 border border-rose-200"
                                      }`}
                                    >
                                      {line.replace("• ", "")}
                                    </span>
                                  ),
                              )}
                            </div>
                          )}

                          {/* Si details sans puces, affichage simple */}
                          {n.details && !n.details.includes("•") && (
                            <p className="text-[10px] text-gray-400 mt-1">
                              {n.details}
                            </p>
                          )}

                          <p className="text-xs text-gray-400 mt-1">
                            {n.temps}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <p className="text-xs text-center text-gray-400">
                  {notifications.length} notification
                  {notifications.length > 1 ? "s" : ""} au total
                </p>
              </div>
            </div>
          )}
        </div>

<<<<<<< HEAD
        
=======
        {/* Avatar simple  */}
        <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-xs font-black select-none">
          {initiales}
        </div>
>>>>>>> 670e4d0787ab6a11494c74c41e809c5f1aa4d553
      </div>
    </header>
  );
}
