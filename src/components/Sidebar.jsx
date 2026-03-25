import { LayoutDashboard , Building2,UsersRound,KeyRound,BrickWall,Wallet} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard},
  { id: "logements", label: "Logements", icon: Building2},
  { id: "employes", label: "Employés", icon: UsersRound},
  { id: "attributions", label: "Attributions", icon: KeyRound },
  { id: "materiaux", label: "Matériaux", icon: BrickWall},
  { id: "depenses", label: "Dépenses", icon:Wallet },
];

export default function Sidebar({ page, setPage, open }) {
  return (
    <aside
      className={`${open ? "w-60" : "w-16"} bg-[#0F2D56] dark:bg-gray-900 flex flex-col transition-all duration-300 shrink-0 border-r border-[#1a3f75] dark:border-gray-800`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1a3f75] dark:border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-white font-black text-sm shrink-0">
          S
        </div>
        {open && (
          <div>
            <p className="font-black text-white text-sm">SPAT</p>
            <p className="text-white/40 text-xs">Gestion Logements</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
              page === item.id
                ? "bg-[#C9A84C] text-white font-semibold shadow-md"
                : "text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-base shrink-0">
              <item.icon className={`w-4 h-4`}/>
            </span>
            {open && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Séparateur */}
      <div className="mx-4 border-t border-[#1a3f75] dark:border-gray-800" />

      {/* Profil */}
      <div className="p-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center text-white text-xs font-black shrink-0">
          AD
        </div>
        {open && (
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              Administrateur
            </p>
            <p className="text-xs text-white/40 truncate">admin@spat.mg</p>
          </div>
        )}
      </div>
    </aside>
  );
}
