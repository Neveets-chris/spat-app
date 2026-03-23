export default function StatutBadge({ statut }) {
  const styles = {
    "Disponible":  "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "Occupé":      "bg-blue-100 text-blue-700 border border-blue-200",
    "Maintenance": "bg-amber-100 text-amber-700 border border-amber-200",
    "En attente":  "bg-rose-100 text-rose-700 border border-rose-500",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[statut] || "bg-gray-100 text-gray-600"}`}>
      {statut}
    </span>
  );
}