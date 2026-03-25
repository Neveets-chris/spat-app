import StatutBadge from "../components/StatutBadge";

const STATS = [
  { label: "Logements disponibles", value: 14, total: 42, couleur: "border-l-emerald-500", texte: "text-emerald-400", icon: "🏠" },
  { label: "Logements occupés",     value: 24, total: 42, couleur: "border-l-blue-400",    texte: "text-blue-400",    icon: "👥" },
  { label: "En maintenance",        value: 4,  total: 42, couleur: "border-l-amber-400",   texte: "text-amber-400",   icon: "🔧" },
  { label: "Demandes en attente",   value: 7,  total: 7,  couleur: "border-l-rose-400",    texte: "text-rose-400",    icon: "📋" },
];

const DEPENSES = [
  { mois: "Oct", montant: 1200 },
  { mois: "Nov", montant: 850000  },
  { mois: "Déc", montant: 1600000 },
  { mois: "Jan", montant: 950000  },
  { mois: "Fév", montant: 1100000 },
];

const MATERIAUX = [
  { nom: "Tôle",     stock: 45,  seuil: 20, unite: "feuilles" },
  { nom: "Carreaux", stock: 12,  seuil: 30, unite: "m²" },
  { nom: "Ciment",   stock: 80,  seuil: 25, unite: "sacs" },
  { nom: "Peinture", stock: 18,  seuil: 15, unite: "litres" },
  { nom: "Câbles",   stock: 200, seuil: 50, unite: "ml" },
];

const DEMANDES = [
  { id: "DEM-012", employe: "RAKOTO Herizo",  categorie: "Cadre moyen",     type: "F3",    date: "20/02/2025" },
  { id: "DEM-013", employe: "SOLO Nirina",    categorie: "Agent maîtrise",  type: "F2",    date: "21/02/2025" },
  { id: "DEM-014", employe: "VOLA Tantely",   categorie: "Cadre supérieur", type: "Villa", date: "22/02/2025" },
  { id: "DEM-015", employe: "HARY Fenitra",   categorie: "Agent exécution", type: "F2",    date: "23/02/2025" },
];

export default function Dashboard() {
  const maxDepense = Math.max(...DEPENSES.map(d => d.montant));

  return (
    <div className="space-y-6">

      {/* Cartes stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label}
            className={`bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 border-l-4 ${s.couleur} shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {s.total !== s.value ? `/ ${s.total}` : "total"}
              </span>
            </div>
            <p className={`text-3xl font-black ${s.texte}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">{s.label}</p>
            {s.total !== s.value && (
              <div className="mt-3 h-1 rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={`h-1 rounded-full ${s.couleur.replace("border-l-", "bg-")}`}
                  style={{ width: `${(s.value / s.total) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Graphe dépenses */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-[#0F2D56] dark:text-white">Dépenses mensuelles</h3>
              <p className="text-xs text-gray-400 mt-0.5">5 derniers mois — en Ariary</p>
            </div>
            <span className="text-xs bg-[#0F2D56] dark:bg-gray-700 text-white px-3 py-1 rounded-full font-semibold">
              2024 – 2025
            </span>
          </div>
          <div className="flex items-end gap-4 h-40">
            {DEPENSES.map((d) => (
              <div key={d.mois} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400 font-medium">
                  {(d.montant / 1000000).toFixed(1)}M
                </span>
                <div
                  className="w-full rounded-t bg-[#0F2D56] dark:bg-[#C9A84C] opacity-80 hover:opacity-100 transition-all cursor-pointer"
                  style={{ height: `${(d.montant / maxDepense) * 120}px` }}
                />
                <span className="text-xs text-gray-400 font-medium">{d.mois}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock matériaux */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold text-[#0F2D56] dark:text-white mb-1">Stock matériaux</h3>
          <p className="text-xs text-gray-400 mb-5">Niveaux actuels</p>
          <div className="space-y-4">
            {MATERIAUX.map((m) => {
              const pct = Math.min((m.stock / (m.seuil * 3)) * 100, 100);
              const alerte = m.stock <= m.seuil;
              return (
                <div key={m.nom}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className={`font-semibold ${alerte ? "text-rose-500" : "text-gray-700 dark:text-gray-300"}`}>
                      {alerte && "⚠ "}{m.nom}
                    </span>
                    <span className="text-gray-400">{m.stock} {m.unite}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className={`h-1.5 rounded-full transition-all ${alerte ? "bg-rose-400" : "bg-[#C9A84C]"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demandes en attente */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-[#0F2D56] dark:text-white">Demandes en attente</h3>
            <p className="text-xs text-gray-400 mt-0.5">{DEMANDES.length} demandes à traiter</p>
          </div>
          <button className="text-xs bg-[#0F2D56] dark:bg-gray-700 text-white px-4 py-1.5 rounded-lg hover:bg-[#1a3f75] transition font-semibold">
            Voir tout
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Réf</th>
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Employé</th>
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Catégorie</th>
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Type</th>
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Date</th>
                <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">Statut</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody>
              {DEMANDES.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <td className="py-3 font-mono text-xs text-gray-400">{d.id}</td>
                  <td className="py-3 font-semibold text-gray-800 dark:text-gray-200">{d.employe}</td>
                  <td className="py-3 text-xs text-gray-500 dark:text-gray-400">{d.categorie}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 text-xs font-bold">
                      {d.type}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-gray-400">{d.date}</td>
                  <td className="py-3">
                    <StatutBadge statut="En attente" />
                  </td>
                  <td className="py-3">
                    <div className="flex gap-1">
                      <button className="px-3 py-1 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded hover:bg-emerald-100 transition font-semibold">
                        ✓ Valider
                      </button>
                      <button className="px-3 py-1 text-xs bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 rounded hover:bg-rose-100 transition font-semibold">
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}