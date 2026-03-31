import { useState } from "react";
import { useApp } from "../context/AppContext";
import StatutBadge from "../components/StatutBadge";
import { BoutonSupprimer, BoutonModifier, BoutonDetail, MessageEnvoye, useSuccessMessage } from "../components/BoutonsAction";

const FILTRES = ["Tous","Occupé","Disponible","Maintenance"];

function ModalDetail({ attribution, onClose }) {
  if (!attribution) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-xs text-gray-400">{attribution.id}</p>
            <h2 className="text-xl font-black text-[#0F2D56] dark:text-white">{attribution.departement}</h2>
            <StatutBadge statut={attribution.statut} />
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <div className="space-y-0 text-sm">
          {[
            ["Logement",    attribution.logement],
            ["Date début",  attribution.date_debut],
            ["Date fin",    attribution.date_fin],
            ["Observations",attribution.observations],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between py-2.5 border-b border-[#E0DDD7] dark:border-gray-700">
              <span className="text-gray-400">{label}</span>
              <span className="font-semibold text-[#0F2D56] dark:text-gray-200">{val}</span>
            </div>
          ))}
          <div className="py-2.5">
            <p className="text-gray-400 mb-2">Occupants ({attribution.occupants.length})</p>
            {attribution.occupants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {attribution.occupants.map(o => (
                  <span key={o} className="px-2 py-1 bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 rounded-lg text-xs font-semibold">{o}</span>
                ))}
              </div>
            ) : <span className="text-rose-400 text-xs">Aucun occupant</span>}
          </div>
        </div>
        <button onClick={onClose} className="mt-6 w-full py-2 bg-[#0F2D56] dark:bg-gray-700 text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition">Fermer</button>
      </div>
    </div>
  );
}

function ModalForm({ attribution, logements, departements, onClose, onSave }) {
  const [form, setForm] = useState(attribution || {
    departement: departements[0]?.nom || "",
    logement: logements[0]?.id || "",
    date_debut: "", date_fin: "",
    statut: "Disponible", occupants: [], observations: "",
  });
  const [occupant, setOccupant] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">{attribution ? "Modifier" : "Nouvelle attribution"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Département</label>
            <select value={form.departement} onChange={e => setForm({ ...form, departement: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]">
              {departements.map(d => <option key={d.id}>{d.nom}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Logement</label>
            <select value={form.logement} onChange={e => setForm({ ...form, logement: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]">
              {logements.map(l => <option key={l.id} value={l.id}>{l.id} — {l.type} ({l.statut})</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Date début</label>
              <input type="date" value={form.date_debut} onChange={e => setForm({ ...form, date_debut: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Date fin</label>
              <input type="date" value={form.date_fin} onChange={e => setForm({ ...form, date_fin: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Statut</label>
            <select value={form.statut} onChange={e => setForm({ ...form, statut: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]">
              {["Disponible","Occupé","Maintenance"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Occupants</label>
            <div className="flex gap-2 mt-1">
              <input value={occupant} onChange={e => setOccupant(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && occupant.trim()) { setForm({ ...form, occupants: [...form.occupants, occupant.trim()] }); setOccupant(""); }}}
                placeholder="Nom Prénom"
                className="flex-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]" />
              <button onClick={() => { if (occupant.trim()) { setForm({ ...form, occupants: [...form.occupants, occupant.trim()] }); setOccupant(""); }}}
                className="px-3 py-2 bg-[#0F2D56] text-white rounded-lg text-sm hover:bg-[#1a3f75] transition font-bold">+</button>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {form.occupants.map(o => (
                <span key={o} className="flex items-center gap-1 px-2 py-1 bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 rounded-lg text-xs font-semibold">
                  {o}
                  <button onClick={() => setForm({ ...form, occupants: form.occupants.filter(x => x !== o) })} className="text-rose-400 hover:text-rose-600 font-bold">✕</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Observations</label>
            <textarea value={form.observations} onChange={e => setForm({ ...form, observations: e.target.value })} rows={2}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56] resize-none" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 border border-[#E0DDD7] dark:border-gray-700 text-gray-500 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm">Annuler</button>
          <button onClick={() => { onSave(form); onClose(); }} className="flex-1 py-2 bg-[#0F2D56] text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition text-sm">
            {attribution ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalFin({ attribution, onClose, onConfirm }) {
  if (!attribution) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="text-center mb-5">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">⚠</div>
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">Mettre fin à l'attribution</h2>
          <p className="text-sm text-gray-400 mt-1">
            <span className="font-semibold text-[#0F2D56] dark:text-white">{attribution.departement}</span> — <span className="font-semibold text-[#0F2D56] dark:text-white">{attribution.logement}</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">Le logement sera remis en <span className="text-emerald-500 font-semibold">Disponible</span></p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 border border-[#E0DDD7] dark:border-gray-700 text-gray-500 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm">Annuler</button>
          <button onClick={() => { onConfirm(attribution.id); onClose(); }} className="flex-1 py-2 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition text-sm">Confirmer</button>
        </div>
      </div>
    </div>
  );
}

export default function Attributions() {
  const { attributions, logements, departements, ajouterAttribution, modifierAttribution, terminerAttribution, supprimerAttribution } = useApp();
  const [filtre, setFiltre]     = useState("Tous");
  const [search, setSearch]     = useState("");
  const [detail, setDetail]     = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [finData, setFinData]   = useState(null);
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const filtered = attributions.filter(a =>
    (filtre === "Tous" || a.statut === filtre) &&
    (a.departement.toLowerCase().includes(search.toLowerCase()) ||
     a.logement.toLowerCase().includes(search.toLowerCase()) ||
     a.id.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (form) => {
    if (formData) modifierAttribution(form);
    else { ajouterAttribution(form); triggerSuccess(); }
  };

  return (
    <div className="space-y-5">
      <MessageEnvoye actif={successActif} />

      {detail   && <ModalDetail attribution={detail} onClose={() => setDetail(null)} />}
      {finData  && <ModalFin attribution={finData} onClose={() => setFinData(null)} onConfirm={terminerAttribution} />}
      {(formData || isAdding) && (
        <ModalForm
          attribution={formData}
          logements={logements}
          departements={departements}
          onClose={() => { setFormData(null); setIsAdding(false); }}
          onSave={handleSave} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
          {FILTRES.map(f => (
            <button key={f} onClick={() => setFiltre(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filtre === f ? "bg-[#0F2D56] text-white shadow" : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
            className="border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#0F2D56]" />
          <button onClick={() => setIsAdding(true)} className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition">
            + Nouvelle attribution
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">{filtered.length} attribution{filtered.length > 1 ? "s" : ""}</p>

      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E0DDD7] dark:border-gray-700 bg-[#0F2D56]/5 dark:bg-gray-800">
              {["Réf","Département","Logement","Période","Occupants","Statut",""].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs text-gray-400 font-semibold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-b border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition">
                <td className="px-5 py-3 font-mono text-xs text-gray-400">{a.id}</td>
                <td className="px-5 py-3 font-bold text-[#0F2D56] dark:text-white">{a.departement}</td>
                <td className="px-5 py-3">
                  <span className="px-2 py-0.5 rounded bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 text-xs font-bold">{a.logement}</span>
                </td>
                <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">{a.date_debut} → {a.date_fin}</td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {a.occupants.length > 0 ? (
                      <>
                        {a.occupants.slice(0, 2).map(o => (
                          <span key={o} className="text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 px-1.5 py-0.5 rounded-full">{o.split(" ")[0]}</span>
                        ))}
                        {a.occupants.length > 2 && <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded-full">+{a.occupants.length - 2}</span>}
                      </>
                    ) : <span className="text-xs text-rose-400">Aucun</span>}
                  </div>
                </td>
                <td className="px-5 py-3"><StatutBadge statut={a.statut} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <BoutonDetail onClick={() => setDetail(a)} />
                    <BoutonModifier onClick={() => setFormData(a)} />
                    {a.statut === "Occupé" && (
                      <button onClick={() => setFinData(a)}
                        className="group flex items-center justify-center w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-500 transition-all duration-200 hover:scale-110" title="Mettre fin">
                        <svg className="w-4 h-4 text-amber-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                      </button>
                    )}
                    <BoutonSupprimer onClick={() => supprimerAttribution(a.id)} />
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