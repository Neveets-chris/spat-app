//import StatutBadge from "../components/StatutBadge";
import { House,Building,Hammer,Hourglass } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { stats, logements, depenses, materiaux, attributions } = useApp();

  const depEnAttente = depenses.filter(d => d.statut === "En attente");
  const alertesStock = materiaux.filter(m => m.stock <= m.seuil);

  const STATS = [
    { label: "Logements disponibles", value: stats.logDisponibles, total: stats.logTotal, couleur: "border-l-emerald-500", texte: "text-emerald-400", icon: House },
    { label: "Logements occupés",     value: stats.logOccupes,     total: stats.logTotal, couleur: "border-l-blue-400",    texte: "text-blue-400",    icon: Building },
    { label: "En maintenance",        value: stats.logMaintenance, total: stats.logTotal, couleur: "border-l-amber-400",   texte: "text-amber-400",   icon: Hammer },
    { label: "Employés total",        value: stats.empTotal,       total: stats.empTotal, couleur: "border-l-rose-400",    texte: "text-rose-400",    icon: Hourglass },
  ];

  // Dépenses par mois
  const parMois = {};
  depenses.forEach(d => {
    const mois = d.date.split("/").slice(1).join("/");
    parMois[mois] = (parMois[mois] || 0) + d.montant;
  });
  const depMois = Object.entries(parMois).slice(-5).map(([mois, montant]) => ({ mois, montant }));
  const maxDep  = Math.max(...depMois.map(d => d.montant), 1);

  function fmt(n) { return new Intl.NumberFormat("fr-MG").format(n) + " Ar"; }

  return (
    <div className="space-y-6">

      {/* Cartes stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label}
            className={`bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 border-l-4 ${s.couleur} shadow-sm`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl"><s.icon className={`w-6 h-6 ${s.texte}`}/></span>
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
              <p className="text-xs text-gray-400 mt-0.5">Validées — en Ariary</p>
            </div>
            <span className="text-xs bg-[#0F2D56] dark:bg-gray-700 text-white px-3 py-1 rounded-full font-semibold">
              Total : {fmt(stats.depTotal)}
            </span>
          </div>
          <div className="flex items-end gap-4 h-40">
            {depMois.length > 0 ? depMois.map((d) => (
              <div key={d.mois} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-400 font-medium">
                  {(d.montant / 1000000).toFixed(1)}M
                </span>
                <div
                  className="w-full rounded-t bg-[#0F2D56] dark:bg-[#C9A84C] opacity-80 hover:opacity-100 transition-all cursor-pointer"
                  style={{ height: `${(d.montant / maxDep) * 120}px` }}
                />
                <span className="text-xs text-gray-400 font-medium">{d.mois}</span>
              </div>
            )) : (
              <p className="text-xs text-gray-400 m-auto">Aucune dépense</p>
            )}
          </div>
        </div>

        {/* Stock matériaux */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="font-bold text-[#0F2D56] dark:text-white mb-1">Stock matériaux</h3>
          <p className="text-xs text-gray-400 mb-5">
            {alertesStock.length > 0
              ? <span className="text-rose-500 font-semibold">⚠ {alertesStock.length} alerte{alertesStock.length > 1 ? "s" : ""}</span>
              : "Niveaux OK"}
          </p>
          <div className="space-y-4">
            {materiaux.map((m) => {
              const pct    = Math.min((m.stock / (m.seuil * 3)) * 100, 100);
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
            <h3 className="font-bold text-[#0F2D56] dark:text-white">Dépenses en attente de validation</h3>
            <p className="text-xs text-gray-400 mt-0.5">{depEnAttente.length} dépense{depEnAttente.length > 1 ? "s" : ""} à valider</p>
          </div>
        </div>
        {depEnAttente.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {["Réf","Description","Montant","Logement","Fournisseur","Date"].map(h => (
                    <th key={h} className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {depEnAttente.map((d) => (
                  <tr key={d.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                    <td className="py-3 font-mono text-xs text-gray-400">{d.id}</td>
                    <td className="py-3 font-semibold text-gray-800 dark:text-gray-200 text-xs">{d.description}</td>
                    <td className="py-3 font-black text-[#C9A84C] text-xs">{fmt(d.montant)}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 text-xs font-bold">{d.logement}</span>
                    </td>
                    <td className="py-3 text-xs text-gray-500 dark:text-gray-400">{d.fournisseur}</td>
                    <td className="py-3 text-xs text-gray-400">{d.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-6">✅ Aucune dépense en attente</p>
        )}
      </div>
    </div>
  );
}