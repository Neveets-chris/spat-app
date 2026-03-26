import { useState } from "react";
import StatutBadge from "../components/StatutBadge";
import { SquarePen } from "lucide-react";

const LOGEMENTS = [
  {
    id: "LOG-001",
    type: "F3",
    localisation: "Résidence A – Bât. 1",
    statut: "Occupé",
    occupants: ["RABE Jean", "SOLA Marie"],
    capacite: 3,
    superficie: 65,
  },
  {
    id: "LOG-002",
    type: "F4",
    localisation: "Résidence A – Bât. 2",
    statut: "Disponible",
    occupants: [],
    capacite: 4,
    superficie: 80,
  },
  {
    id: "LOG-003",
    type: "Villa",
    localisation: "Zone B – Villa 5",
    statut: "Occupé",
    occupants: ["ANDO Paul"],
    capacite: 4,
    superficie: 120,
  },
  {
    id: "LOG-004",
    type: "F2",
    localisation: "Résidence C – Bât. 3",
    statut: "Maintenance",
    occupants: [],
    capacite: 2,
    superficie: 45,
  },
  {
    id: "LOG-005",
    type: "F3",
    localisation: "Résidence B – Bât. 1",
    statut: "Disponible",
    occupants: [],
    capacite: 3,
    superficie: 60,
  },
  {
    id: "LOG-006",
    type: "Studio",
    localisation: "Résidence D – N°2",
    statut: "Occupé",
    occupants: ["RAVA Luc", "NIRY Zo"],
    capacite: 2,
    superficie: 30,
  },
];

const FILTRES = ["Tous", "Disponible", "Occupé", "Maintenance"];

// ── Modal Détail ──────────────────────────────────────────────────────────────
function ModalDetail({ logement, onClose }) {
  if (!logement) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-xs text-gray-400">{logement.id}</p>
            <h2 className="text-xl font-black text-[#0F2D56] dark:text-white">
              {logement.type}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl transition"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b border-[#E0DDD7] dark:border-gray-700">
            <span className="text-gray-400">Statut</span>
            <StatutBadge statut={logement.statut} />
          </div>
          <div className="flex justify-between py-2 border-b border-[#E0DDD7] dark:border-gray-700">
            <span className="text-gray-400">Localisation</span>
            <span className="font-semibold text-[#0F2D56] dark:text-gray-200">
              {logement.localisation}
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#E0DDD7] dark:border-gray-700">
            <span className="text-gray-400">Superficie</span>
            <span className="font-semibold text-[#0F2D56] dark:text-gray-200">
              {logement.superficie} m²
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#E0DDD7] dark:border-gray-700">
            <span className="text-gray-400">Capacité</span>
            <span className="font-semibold text-[#0F2D56] dark:text-gray-200">
              {logement.occupants.length} / {logement.capacite} occupants
            </span>
          </div>
          {logement.occupants.length > 0 && (
            <div className="py-2">
              <p className="text-gray-400 mb-2">Occupants</p>
              <div className="flex flex-wrap gap-2">
                {logement.occupants.map((o) => (
                  <span
                    key={o}
                    className="px-2 py-1 bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 rounded-lg text-xs font-semibold"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
          )}
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

// ── Modal Formulaire ──────────────────────────────────────────────────────────
function ModalForm({ logement, onClose, onSave }) {
  const [form, setForm] = useState(
    logement || {
      id: `LOG-00${Math.floor(Math.random() * 99)}`,
      type: "F2",
      localisation: "",
      statut: "Disponible",
      capacite: 2,
      superficie: 40,
      occupants: [],
    },
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
            {logement ? "Modifier le logement" : "Ajouter un logement"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl transition"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Type
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {["Studio", "F2", "F3", "F4", "Villa"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Localisation
            </label>
            <input
              value={form.localisation}
              onChange={(e) =>
                setForm({ ...form, localisation: e.target.value })
              }
              placeholder="Ex: Résidence A – Bât. 1"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Superficie (m²)
              </label>
              <input
                type="number"
                value={form.superficie}
                onChange={(e) =>
                  setForm({ ...form, superficie: e.target.value })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Capacité
              </label>
              <input
                type="number"
                value={form.capacite}
                onChange={(e) => setForm({ ...form, capacite: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
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
              {["Disponible", "Occupé", "Maintenance"].map((s) => (
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
            {logement ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────────────
export default function Logements() {
  const [data, setData] = useState(LOGEMENTS);
  const [vue, setVue] = useState("carte");
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const filtered = data.filter(
    (l) =>
      (filtre === "Tous" || l.statut === filtre) &&
      (l.id.toLowerCase().includes(search.toLowerCase()) ||
        l.localisation.toLowerCase().includes(search.toLowerCase()) ||
        l.type.toLowerCase().includes(search.toLowerCase())),
  );

  const handleSave = (form) => {
    if (formData) {
      setData(data.map((l) => (l.id === form.id ? form : l)));
    } else {
      setData([...data, form]);
    }
    setFormData(null);
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce logement ?")) {
      setData(data.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="space-y-5">
      {/* Modals */}
      {detail && (
        <ModalDetail logement={detail} onClose={() => setDetail(null)} />
      )}
      {(formData || isAdding) && (
        <ModalForm
          logement={formData}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
        />
      )}

      {/* Barre outils */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filtres statut */}
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filtre === f
                    ? "bg-[#0F2D56] text-white shadow"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Switch vue */}
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            <button
              onClick={() => setVue("carte")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${vue === "carte" ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 hover:text-[#0F2D56] dark:hover:text-white"}`}
            >
              ⊞ Cartes
            </button>
            <button
              onClick={() => setVue("tableau")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${vue === "tableau" ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 hover:text-[#0F2D56] dark:hover:text-white"}`}
            >
              ☰ Tableau
            </button>
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
            onClick={() => setIsAdding(true)}
            className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition"
          >
            + Ajouter
          </button>
        </div>
      </div>

      {/* Compteur */}
      <p className="text-xs text-gray-400">
        {filtered.length} logement{filtered.length > 1 ? "s" : ""} trouvé
        {filtered.length > 1 ? "s" : ""}
      </p>

      {/* ── VUE CARTE ── */}
      {vue === "carte" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((l) => (
            <div
              key={l.id}
              className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-mono text-xs text-gray-400">{l.id}</p>
                  <p className="font-black text-[#0F2D56] dark:text-white text-lg">
                    {l.type}
                  </p>
                </div>
                <StatutBadge statut={l.statut} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                📍 {l.localisation}
              </p>
              <p className="text-xs text-gray-400 mb-3">📐 {l.superficie} m²</p>
              <div className="border-t border-[#E0DDD7] dark:border-gray-700 pt-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Occupants</span>
                  <span>
                    {l.occupants.length} / {l.capacite}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#E0DDD7] dark:bg-gray-700 mb-2">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      l.occupants.length >= l.capacite
                        ? "bg-rose-400"
                        : l.occupants.length > 0
                          ? "bg-[#C9A84C]"
                          : "bg-gray-300"
                    }`}
                    style={{
                      width: `${(l.occupants.length / l.capacite) * 100}%`,
                    }}
                  />
                </div>
                {l.occupants.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {l.occupants.map((o) => (
                      <span
                        key={o}
                        className="text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 px-2 py-0.5 rounded-full"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setDetail(l)}
                  className="flex-1 text-xs border border-[#E0DDD7] dark:border-gray-700 text-gray-500 dark:text-gray-400 py-1.5 rounded-lg hover:bg-[#E0DDD7]/50 dark:hover:bg-gray-700 transition"
                >
                  👁 Détail
                </button>
                <button
                  onClick={() => setFormData(l)}
                  className="flex-1 text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 py-1.5 rounded-lg hover:bg-[#0F2D56]/20 transition"
                >
                  <SquarePen className=" w-4 h-4 flex"  />Modifier
                </button>
                <button
                  onClick={() => handleDelete(l.id)}
                  className="text-xs bg-rose-50 dark:bg-rose-900/20 text-rose-500 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── VUE TABLEAU ── */}
      {vue === "tableau" && (
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E0DDD7] dark:border-gray-700 bg-[#0F2D56]/5 dark:bg-gray-800">
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Réf
                </th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Type
                </th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Localisation
                </th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Superficie
                </th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Occupants
                </th>
                <th className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  Statut
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr
                  key={l.id}
                  className="border-b border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-5 py-3 font-mono text-xs text-gray-400">
                    {l.id}
                  </td>
                  <td className="px-5 py-3 font-bold text-[#0F2D56] dark:text-white">
                    {l.type}
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 text-xs">
                    {l.localisation}
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 text-xs">
                    {l.superficie} m²
                  </td>
                  <td className="px-5 py-3 text-xs">
                    <span
                      className={`font-semibold ${l.occupants.length >= l.capacite ? "text-rose-500" : "text-gray-600 dark:text-gray-400"}`}
                    >
                      {l.occupants.length} / {l.capacite}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <StatutBadge statut={l.statut} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => setDetail(l)}
                        className="px-2 py-1 text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 rounded hover:bg-[#0F2D56]/20 transition"
                      >
                        👁
                      </button>
                      <button
                        onClick={() => setFormData(l)}
                        className="px-2 py-1 text-xs bg-[#C9A84C]/20 text-[#C9A84C] rounded hover:bg-[#C9A84C]/30 transition"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="px-2 py-1 text-xs bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded hover:bg-rose-100 transition"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
