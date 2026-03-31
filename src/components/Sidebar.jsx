//import { LayoutDashboard , Building2,UsersRound,KeyRound,BrickWall,Wallet} from "lucide-react";

import { useState } from "react";

const NAV_ITEMS = [
  { id: "dashboard",    label: "Tableau de bord", icon: "⊞" },
  { id: "logements",    label: "Logements",        icon: "🏠" },
  { id: "employes",     label: "Employés",          icon: "👤" },
  { id: "attributions", label: "Attributions",      icon: "🔑" },
  { id: "materiaux",    label: "Matériaux",         icon: "📦" },
  { id: "depenses",     label: "Dépenses",          icon: "💰" },
];

export default function Sidebar({ page, setPage, open, onClose }) {
  return (
    <>
      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed md:relative z-30 md:z-auto
        h-full
        ${open ? "w-60 translate-x-0" : "w-60 -translate-x-full md:translate-x-0 md:w-16"}
        bg-[#0F2D56] dark:bg-gray-900
        border-r border-[#E0DDD7] dark:border-gray-800
        flex flex-col
        transition-all duration-300
        shrink-0
      `}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#E0DDD7] dark:border-gray-800">
          <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-white font-black text-sm shrink-0">S</div>
          <div className={`overflow-hidden transition-all duration-300 ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
            <p className="font-black text-white dark:text-white text-sm whitespace-nowrap">SPAT</p>
            <p className="text-white dark:text-gray-400 text-xs whitespace-nowrap">Gestion Logements</p>
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
                  : "text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white inline-block transition-transform duration-300 hover:scale-125 hover:translate-y-1"
              }`}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              <span className={`truncate transition-all duration-300 ${open ? "opacity-100" : "opacity-0 w-0 md:hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Séparateur */}
        <div className="mx-4 border-t border-[#E0DDD7] dark:border-gray-800" />

        {/* Profil */}
        <div className="p-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-xs font-black shrink-0">AD</div>
          <div className={`overflow-hidden transition-all duration-300 ${open ? "opacity-100 w-auto" : "opacity-0 w-0 md:hidden"}`}>
            <p className="text-xs font-semibold text-white dark:text-white truncate whitespace-nowrap">Administrateur</p>
            <p className="text-xs text-white dark:text-gray-400 truncate whitespace-nowrap">admin@spat.mg</p>
          </div>
        </div>
      </aside>
    </>
  );
}