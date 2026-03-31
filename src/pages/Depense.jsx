import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BoutonSupprimer,
  BoutonModifier,
  BoutonDetail,
  MessageEnvoye,
  useSuccessMessage,
} from "../components/BoutonsAction";

const CATEGORIES = [
  "Tous",
  "Travaux",
  "Matériaux",
  "Finition",
  "Électricité",
  "Plomberie",
  "Menuiserie",
  "Autre",
];
const STATUTS = ["Tous", "En attente", "Validé", "Rejeté"];
const DEPARTEMENTS = [
  "Technique",
  "Logistique",
  "Administration",
  "Finance",
  "RH",
  "Informatique",
  "Sécurité",
];
const FOURNISSEURS = ["TRANO MORA", "BATIMA", "SOCOBAT", "MATÉRIAUX PLUS"];

const BUDGETS = {
  global: 20000000,
  logements: {
    "LOG-001": 5000000,
    "LOG-002": 3000000,
    "LOG-003": 4000000,
    "LOG-004": 2000000,
    "LOG-005": 3000000,
    "LOG-006": 3000000,
  },
  departements: {
    Technique: 8000000,
    Logistique: 5000000,
    Administration: 4000000,
    Finance: 3000000,
  },
};

function fmt(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

function StatutDepBadge({ statut }) {
  const styles = {
    Validé: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    "En attente": "bg-amber-100 text-amber-700 border border-amber-200",
    Rejeté: "bg-rose-100 text-rose-700 border border-rose-200",
  };
  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[statut] || "bg-gray-100 text-gray-600"}`}
    >
      {statut}
    </span>
  );
}

function Graphique({ depenses }) {
  const parMois = {};
  depenses.forEach((d) => {
    const mois = d.date.split("/").slice(1).join("/");
    parMois[mois] = (parMois[mois] || 0) + d.montant;
  });
  const data = Object.entries(parMois).slice(-6);
  const max = Math.max(...data.map((d) => d[1]), 1);
  return (
    <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm p-6">
      <h3 className="font-bold text-[#0F2D56] dark:text-white mb-1">
        Évolution des dépenses
      </h3>
      <p className="text-xs text-gray-400 mb-5">Par mois — en Ariary</p>
      {data.length > 0 ? (
        <div className="flex items-end gap-4 h-36">
          {data.map(([mois, montant]) => (
            <div key={mois} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400 font-medium">
                {(montant / 1000000).toFixed(1)}M
              </span>
              <div
                className="w-full rounded-t bg-[#0F2D56] dark:bg-[#C9A84C] opacity-80 hover:opacity-100 transition-all"
                style={{ height: `${(montant / max) * 120}px` }}
              />
              <span className="text-xs text-gray-400">{mois}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 text-center py-8">Aucune donnée</p>
      )}
    </div>
  );
}

function SuiviBudget({ depenses, logements }) {
  const valides = depenses.filter((d) => d.statut === "Validé");
  const total = valides.reduce((s, d) => s + d.montant, 0);
  const pctGlobal = Math.min((total / BUDGETS.global) * 100, 100);
  return (
    <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm p-6">
      <h3 className="font-bold text-[#0F2D56] dark:text-white mb-4">
        Suivi budgétaire
      </h3>
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="font-semibold text-[#0F2D56] dark:text-white">
            Budget global annuel
          </span>
          <span className="text-gray-400">
            {fmt(total)} / {fmt(BUDGETS.global)}
          </span>
        </div>
        <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-700">
          <div
            className={`h-3 rounded-full transition-all ${pctGlobal >= 90 ? "bg-rose-500" : pctGlobal >= 70 ? "bg-amber-400" : "bg-emerald-400"}`}
            style={{ width: `${pctGlobal}%` }}
          />
        </div>
        <p
          className={`text-xs mt-1 font-semibold ${pctGlobal >= 90 ? "text-rose-500" : pctGlobal >= 70 ? "text-amber-500" : "text-emerald-500"}`}
        >
          {pctGlobal.toFixed(1)}% utilisé
        </p>
      </div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Par logement
      </p>
      <div className="space-y-2.5 mb-5">
        {logements.map((l) => {
          const dep = valides
            .filter((d) => d.logement === l.id)
            .reduce((s, d) => s + d.montant, 0);
          const budget = BUDGETS.logements[l.id] || 2000000;
          const pct = Math.min((dep / budget) * 100, 100);
          return (
            <div key={l.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  {l.id} — {l.type}
                </span>
                <span className="text-gray-400">
                  {fmt(dep)} / {fmt(budget)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className={`h-1.5 rounded-full transition-all ${pct >= 90 ? "bg-rose-400" : pct >= 70 ? "bg-amber-400" : "bg-[#C9A84C]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        Par département
      </p>
      <div className="space-y-2.5">
        {Object.entries(BUDGETS.departements).map(([dep, budget]) => {
          const depDep = valides
            .filter((d) => d.departement === dep)
            .reduce((s, d) => s + d.montant, 0);
          const pct = Math.min((depDep / budget) * 100, 100);
          return (
            <div key={dep}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  {dep}
                </span>
                <span className="text-gray-400">
                  {fmt(depDep)} / {fmt(budget)}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-700">
                <div
                  className={`h-1.5 rounded-full transition-all ${pct >= 90 ? "bg-rose-400" : pct >= 70 ? "bg-amber-400" : "bg-blue-400"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ModalDetail({ depense, onClose }) {
  if (!depense) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-xs text-gray-400">{depense.id}</p>
            <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
              {depense.description}
            </h2>
            <StatutDepBadge statut={depense.statut} />
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-0 text-sm">
          {[
            ["Montant", fmt(depense.montant)],
            ["Logement", depense.logement],
            ["Département", depense.departement],
            ["Catégorie", depense.categorie],
            ["Fournisseur", depense.fournisseur],
            ["Date", depense.date],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex justify-between py-2.5 border-b border-[#E0DDD7] dark:border-gray-700"
            >
              <span className="text-gray-400">{label}</span>
              <span className="font-semibold text-[#0F2D56] dark:text-gray-200">
                {val}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-[#0F2D56] dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

function ModalForm({ depense, logements, onClose, onSave }) {
  const [form, setForm] = useState(
    depense || {
      description: "",
      montant: 0,
      logement: logements[0]?.id || "LOG-001",
      categorie: "Travaux",
      fournisseur: "TRANO MORA",
      date: new Date().toLocaleDateString("fr-FR"),
      statut: "En attente",
      departement: "Technique",
    },
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
            {depense ? "Modifier" : "Ajouter une dépense"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Description
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Montant (Ar)
              </label>
              <input
                type="number"
                value={form.montant}
                onChange={(e) =>
                  setForm({ ...form, montant: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Catégorie
              </label>
              <select
                value={form.categorie}
                onChange={(e) =>
                  setForm({ ...form, categorie: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              >
                {CATEGORIES.filter((c) => c !== "Tous").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Logement
              </label>
              <select
                value={form.logement}
                onChange={(e) => setForm({ ...form, logement: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              >
                {logements.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.id} — {l.type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Département
              </label>
              <select
                value={form.departement}
                onChange={(e) =>
                  setForm({ ...form, departement: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              >
                {DEPARTEMENTS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Fournisseur
            </label>
            <select
              value={form.fournisseur}
              onChange={(e) =>
                setForm({ ...form, fournisseur: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {FOURNISSEURS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Statut
            </label>
            <select
              value={form.statut}
              onChange={(e) => setForm({ ...form, statut: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {["En attente", "Validé", "Rejeté"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-[#E0DDD7] dark:border-gray-700 text-gray-500 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onSave(form);
              onClose();
            }}
            className="flex-1 py-2 bg-[#0F2D56] text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition text-sm"
          >
            {depense ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Depenses() {
  const {
    depenses,
    logements,
    ajouterDepense,
    modifierDepense,
    supprimerDepense,
    validerDepense,
    rejeterDepense,
  } = useApp();
  const [filtreCat, setFiltreCat] = useState("Tous");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const filtered = depenses.filter(
    (d) =>
      (filtreCat === "Tous" || d.categorie === filtreCat) &&
      (filtreStatut === "Tous" || d.statut === filtreStatut) &&
      (d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.fournisseur.toLowerCase().includes(search.toLowerCase()) ||
        d.logement.toLowerCase().includes(search.toLowerCase())),
  );

  const totalValide = depenses
    .filter((d) => d.statut === "Validé")
    .reduce((s, d) => s + d.montant, 0);
  const totalAttente = depenses
    .filter((d) => d.statut === "En attente")
    .reduce((s, d) => s + d.montant, 0);
  const totalRejete = depenses
    .filter((d) => d.statut === "Rejeté")
    .reduce((s, d) => s + d.montant, 0);
  const totalGeneral = depenses.reduce((s, d) => s + d.montant, 0);

  const handleSave = (form) => {
    if (formData) modifierDepense(form);
    else {
      ajouterDepense(form);
      triggerSuccess();
    }
    setFormData(null);
    setIsAdding(false);
  };

  const handleExport = () => {
    const lignes = [
      [
        "ID",
        "Description",
        "Montant",
        "Logement",
        "Département",
        "Catégorie",
        "Fournisseur",
        "Date",
        "Statut",
      ],
      ...filtered.map((d) => [
        d.id,
        d.description,
        d.montant,
        d.logement,
        d.departement,
        d.categorie,
        d.fournisseur,
        d.date,
        d.statut,
      ]),
    ];
    const csv = lignes.map((l) => l.join(";")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "depenses_spat.csv";
    a.click();
  };

  return (
    <div className="space-y-5">
      <MessageEnvoye actif={successActif} />

      {detail && (
        <ModalDetail depense={detail} onClose={() => setDetail(null)} />
      )}
      {(formData || isAdding) && (
        <ModalForm
          depense={formData}
          logements={logements}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
        />
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-[#0F2D56] shadow-sm">
          <p className="text-xs text-gray-400">Total général</p>
          <p className="text-sm font-black text-[#0F2D56] dark:text-white mt-1">
            {fmt(totalGeneral)}
          </p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-emerald-500 shadow-sm">
          <p className="text-xs text-gray-400">Validées</p>
          <p className="text-sm font-black text-emerald-500 mt-1">
            {fmt(totalValide)}
          </p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-amber-500 shadow-sm">
          <p className="text-xs text-gray-400">En attente</p>
          <p className="text-sm font-black text-amber-500 mt-1">
            {fmt(totalAttente)}
          </p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-rose-500 shadow-sm">
          <p className="text-xs text-gray-400">Rejetées</p>
          <p className="text-sm font-black text-rose-500 mt-1">
            {fmt(totalRejete)}
          </p>
        </div>
      </div>

      {/* Graphique + Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Graphique depenses={depenses} />
        <SuiviBudget depenses={depenses} logements={logements} />
      </div>

      {/* Barre outils */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            {STATUTS.map((s) => (
              <button
                key={s}
                onClick={() => setFiltreStatut(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filtreStatut === s ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"}`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            {CATEGORIES.slice(0, 5).map((c) => (
              <button
                key={c}
                onClick={() => setFiltreCat(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filtreCat === c ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher..."
            className="border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#0F2D56]"
          />
          <button
            onClick={handleExport}
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition"
          >
            ↓ CSV
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition"
          >
            + Dépense
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        {filtered.length} dépense{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Tableau */}
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E0DDD7] dark:border-gray-700 bg-[#0F2D56]/5 dark:bg-gray-800">
              {[
                "Réf",
                "Description",
                "Montant",
                "Logement",
                "Fournisseur",
                "Date",
                "Statut",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr
                key={d.id}
                className="border-b border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition"
              >
                <td className="px-5 py-3 font-mono text-xs text-gray-400">
                  {d.id}
                </td>
                <td className="px-5 py-3">
                  <p className="font-semibold text-[#0F2D56] dark:text-white text-xs">
                    {d.description}
                  </p>
                  <p className="text-xs text-gray-400">
                    {d.categorie} — {d.departement}
                  </p>
                </td>
                <td className="px-5 py-3 font-black text-[#C9A84C] text-sm">
                  {fmt(d.montant)}
                </td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 text-xs font-bold">
                    {d.logement}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                  {d.fournisseur}
                </td>
                <td className="px-5 py-3 text-xs text-gray-400">{d.date}</td>
                <td className="px-5 py-3">
                  <StatutDepBadge statut={d.statut} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <BoutonDetail onClick={() => setDetail(d)} />
                    <BoutonModifier onClick={() => setFormData(d)} />
                    {d.statut === "En attente" && (
                      <>
                        <button
                          onClick={() => validerDepense(d.id)}
                          className="group w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-500 flex items-center justify-center transition-all hover:scale-110"
                          title="Valider"
                        >
                          <svg
                            className="w-4 h-4 text-emerald-500 group-hover:text-white transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => rejeterDepense(d.id)}
                          className="group w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-500 flex items-center justify-center transition-all hover:scale-110"
                          title="Rejeter"
                        >
                          <svg
                            className="w-4 h-4 text-rose-500 group-hover:text-white transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                    <BoutonSupprimer onClick={() => supprimerDepense(d.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
