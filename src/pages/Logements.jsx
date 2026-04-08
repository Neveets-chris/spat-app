import { useState } from "react";
import { useApp } from "../context/AppContext";
import StatutBadge from "../components/StatutBadge";
import {
  BoutonSupprimer,
  BoutonModifier,
  BoutonDetail,
} from "../components/BoutonsAction";
import {
  Info,
  CircleCheck,
  PencilRuler,
  MapPin,
  Blocks,
  CirclePlus ,
  SquareMenu,
} from "lucide-react";

const FILTRES = ["Tous", "Disponible", "Occupé", "Maintenance"];

function ModalDetail({ logement, attributions, onClose }) {
  if (!logement) return null;
  const attLogement = attributions.filter((a) => a.logement === logement.id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-xs text-gray-400">{logement.id}</p>
            <h2 className="text-xl font-black text-[#0F2D56] dark:text-white">
              {logement.type}
            </h2>
            <StatutBadge statut={logement.statut} />
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
            ["Localisation", logement.localisation],
            ["Superficie", `${logement.superficie} m²`],
            ["Capacité max", `${logement.nb_occupants_max} occupants`],
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

        {/* Attributions liées */}
        {attLogement.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Attributions
            </p>
            {attLogement.map((a) => (
              <div
                key={a.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-3 mb-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#0F2D56] dark:text-white text-sm">
                    {a.departement}
                  </span>
                  <StatutBadge statut={a.statut} />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {a.date_debut} → {a.date_fin}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {a.occupants.map((o) => (
                    <span
                      key={o}
                      className="text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 px-2 py-0.5 rounded-full"
                    >
                      {o}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-[#0F2D56] dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

function ModalForm({ logement, onClose, onSave }) {
  const [form, setForm] = useState(
    logement || {
      type: "F2",
      localisation: "",
      statut: "Disponible",
      capacite: 2,
      superficie: 40,
      nb_occupants_max: 2,
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
            className="text-gray-400 hover:text-gray-600 text-xl"
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
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Superficie
              </label>
              <input
                type="number"
                value={form.superficie}
                onChange={(e) =>
                  setForm({ ...form, superficie: Number(e.target.value) })
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
                onChange={(e) =>
                  setForm({ ...form, capacite: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Max occupants
              </label>
              <input
                type="number"
                value={form.nb_occupants_max}
                onChange={(e) =>
                  setForm({ ...form, nb_occupants_max: Number(e.target.value) })
                }
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

export default function Logements() {
  const {
    logements,
    attributions,
    ajouterLogement,
    modifierLogement,
    supprimerLogement,
  } = useApp();
  const [vue, setVue] = useState("carte");
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const filtered = logements.filter(
    (l) =>
      (filtre === "Tous" || l.statut === filtre) &&
      (l.id.toLowerCase().includes(search.toLowerCase()) ||
        l.localisation.toLowerCase().includes(search.toLowerCase()) ||
        l.type.toLowerCase().includes(search.toLowerCase())),
  );

  // Occupants réels depuis les attributions
  const getOccupants = (logId) => {
    const att = attributions.find(
      (a) => a.logement === logId && a.statut === "Occupé",
    );
    return att ? att.occupants : [];
  };

  const handleSave = (form) => {
    if (formData) modifierLogement(form);
    else ajouterLogement(form);
    setFormData(null);
    setIsAdding(false);
  };

  return (
    <div className="space-y-5">
      {detail && (
        <ModalDetail
          logement={detail}
          attributions={attributions}
          onClose={() => setDetail(null)}
        />
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
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            {FILTRES.map((f) => (
              <button
                key={f}
                onClick={() => setFiltre(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filtre === f ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            <button
              onClick={() => setVue("carte")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2  ${vue === "carte" ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 hover:text-[#0F2D56]"}`}
            >
              <Blocks className="w-4 h-4" /> Cartes
            </button>
            <button
              onClick={() => setVue("tableau")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${vue === "tableau" ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 hover:text-[#0F2D56]"}`}
            >
              <SquareMenu className="w-4 h-4" /> Tableau
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
            className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition flex items-center gap-2"
          >
            <CirclePlus  className="w-4 h-4"/> Ajouter
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        {filtered.length} logement{filtered.length > 1 ? "s" : ""}
      </p>

      {/* Vue carte */}
      {vue === "carte" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((l) => {
            const occupants = getOccupants(l.id);
            return (
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
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 ">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {l.localisation}
                </p>
                <p className="text-xs text-gray-400 mb-3 flex items-center">
                  {" "}
                  <PencilRuler className="w-4 h-4 text-yellow-500" />
                  {l.superficie} m²
                </p>
                <div className="border-t border-[#E0DDD7] dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>Occupants</span>
                    <span>
                      {occupants.length} / {l.nb_occupants_max}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E0DDD7] dark:bg-gray-700 mb-2">
                    <div
                      className={`h-1.5 rounded-full transition-all ${occupants.length >= l.nb_occupants_max ? "bg-rose-400" : occupants.length > 0 ? "bg-[#C9A84C]" : "bg-gray-300"}`}
                      style={{
                        width: `${(occupants.length / l.nb_occupants_max) * 100}%`,
                      }}
                    />
                  </div>
                  {occupants.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {occupants.map((o) => (
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
                    className="flex-1 text-xs border border-[#E0DDD7] dark:border-gray-700 text-gray-500 py-1.5 rounded-lg hover:bg-blue-200 transition flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4 " /> Detail
                  </button>
                  <button
                    onClick={() => setFormData(l)}
                    className="flex-1 text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 py-1.5 rounded-lg hover:bg-green-200 transition flex items-center justify-center gap-2"
                  >
                    <CircleCheck className="w-4 h-4" /> Modification
                  </button>
                  <BoutonSupprimer onClick={() => supprimerLogement(l.id)} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vue tableau */}
      {vue === "tableau" && (
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E0DDD7] dark:border-gray-700 bg-[#0F2D56]/5 dark:bg-gray-800">
                {[
                  "Réf",
                  "Type",
                  "Localisation",
                  "Superficie",
                  "Occupants",
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
              {filtered.map((l) => {
                const occupants = getOccupants(l.id);
                return (
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
                    <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {l.localisation}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {l.superficie} m²
                    </td>
                    <td className="px-5 py-3 text-xs">
                      <span
                        className={`font-semibold ${occupants.length >= l.nb_occupants_max ? "text-rose-500" : "text-gray-600 dark:text-gray-400"}`}
                      >
                        {occupants.length} / {l.nb_occupants_max}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <StatutBadge statut={l.statut} />
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1">
                        <BoutonDetail onClick={() => setDetail(l)} />
                        <BoutonModifier onClick={() => setFormData(l)} />
                        <BoutonSupprimer
                          onClick={() => supprimerLogement(l.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
