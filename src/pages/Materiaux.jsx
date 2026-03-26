import { useState } from "react";
import {
  BoutonSupprimer,
  BoutonModifier,
  BoutonDetail,
  MessageEnvoye,
  useSuccessMessage,
} from "../components/BoutonsAction";

const MATERIAUX_INIT = [
  {
    id: "MAT-001",
    nom: "Tôle",
    categorie: "Couverture",
    stock: 45,
    seuil: 20,
    unite: "feuilles",
    prix: 15000,
  },
  {
    id: "MAT-002",
    nom: "Carreaux",
    categorie: "Revêtement",
    stock: 12,
    seuil: 30,
    unite: "m²",
    prix: 8000,
  },
  {
    id: "MAT-003",
    nom: "Ciment",
    categorie: "Maçonnerie",
    stock: 80,
    seuil: 25,
    unite: "sacs",
    prix: 12000,
  },
  {
    id: "MAT-004",
    nom: "Peinture",
    categorie: "Finition",
    stock: 18,
    seuil: 15,
    unite: "litres",
    prix: 5000,
  },
  {
    id: "MAT-005",
    nom: "Câbles",
    categorie: "Électricité",
    stock: 200,
    seuil: 50,
    unite: "ml",
    prix: 2000,
  },
  {
    id: "MAT-006",
    nom: "Tuyaux PVC",
    categorie: "Plomberie",
    stock: 35,
    seuil: 20,
    unite: "ml",
    prix: 3500,
  },
  {
    id: "MAT-007",
    nom: "Portes",
    categorie: "Menuiserie",
    stock: 8,
    seuil: 5,
    unite: "unités",
    prix: 85000,
  },
];

const MOUVEMENTS_INIT = [
  {
    id: "MOV-001",
    materiau: "Tôle",
    type: "Entrée",
    quantite: 20,
    date: "10/01/2025",
    logement: "LOG-001",
  },
  {
    id: "MOV-002",
    materiau: "Carreaux",
    type: "Sortie",
    quantite: 15,
    date: "12/01/2025",
    logement: "LOG-003",
  },
  {
    id: "MOV-003",
    materiau: "Ciment",
    type: "Entrée",
    quantite: 50,
    date: "15/01/2025",
    logement: "LOG-002",
  },
  {
    id: "MOV-004",
    materiau: "Peinture",
    type: "Sortie",
    quantite: 8,
    date: "18/01/2025",
    logement: "LOG-001",
  },
  {
    id: "MOV-005",
    materiau: "Câbles",
    type: "Entrée",
    quantite: 100,
    date: "20/01/2025",
    logement: "LOG-006",
  },
];

const FOURNISSEURS = [
  { id: "FOU-001", nom: "TRANO MORA", contact: "034 00 000 01" },
  { id: "FOU-002", nom: "BATIMA", contact: "034 00 000 02" },
  { id: "FOU-003", nom: "SOCOBAT", contact: "034 00 000 03" },
  { id: "FOU-004", nom: "MATÉRIAUX PLUS", contact: "034 00 000 04" },
];
const CATEGORIES = [
  "Tous",
  "Couverture",
  "Revêtement",
  "Maçonnerie",
  "Finition",
  "Électricité",
  "Plomberie",
  "Menuiserie",
];
const LOGEMENTS = [
  "LOG-001",
  "LOG-002",
  "LOG-003",
  "LOG-004",
  "LOG-005",
  "LOG-006",
];

function fmt(n) {
  return new Intl.NumberFormat("fr-MG").format(n) + " Ar";
}

// ── Modal Détail ──────────────────────────────────────────────────────────────
function ModalDetail({ materiau, mouvements, onClose }) {
  if (!materiau) return null;
  const mvts = mouvements.filter((m) => m.materiau === materiau.nom);
  const totalEntrees = mvts
    .filter((m) => m.type === "Entrée")
    .reduce((s, m) => s + m.quantite, 0);
  const totalSorties = mvts
    .filter((m) => m.type === "Sortie")
    .reduce((s, m) => s + m.quantite, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-5">
          <div>
            <p className="font-mono text-xs text-gray-400">{materiau.id}</p>
            <h2 className="text-xl font-black text-[#0F2D56] dark:text-white">
              {materiau.nom}
            </h2>
            <span className="text-xs bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300 px-2 py-0.5 rounded-full font-semibold">
              {materiau.categorie}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-emerald-600">
              +{totalEntrees}
            </p>
            <p className="text-xs text-gray-400">Entrées</p>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-3 text-center">
            <p className="text-lg font-black text-rose-500">-{totalSorties}</p>
            <p className="text-xs text-gray-400">Sorties</p>
          </div>
          <div
            className={`${materiau.stock <= materiau.seuil ? "bg-amber-50 dark:bg-amber-900/20" : "bg-blue-50 dark:bg-blue-900/20"} rounded-xl p-3 text-center`}
          >
            <p
              className={`text-lg font-black ${materiau.stock <= materiau.seuil ? "text-amber-500" : "text-blue-500"}`}
            >
              {materiau.stock}
            </p>
            <p className="text-xs text-gray-400">Stock</p>
          </div>
        </div>

        {/* Infos */}
        <div className="space-y-0 text-sm mb-5">
          {[
            ["Unité", materiau.unite],
            ["Seuil d'alerte", `${materiau.seuil} ${materiau.unite}`],
            ["Prix unitaire", fmt(materiau.prix)],
            ["Valeur stock", fmt(materiau.stock * materiau.prix)],
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

        {/* Historique mouvements */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Historique mouvements
        </p>
        {mvts.length > 0 ? (
          <div className="space-y-1.5">
            {mvts.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.type === "Entrée" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"}`}
                  >
                    {m.type === "Entrée" ? "+" : "-"}
                    {m.quantite}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {m.logement}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{m.date}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 text-center py-3">
            Aucun mouvement
          </p>
        )}

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

// ── Modal Formulaire Matériau ─────────────────────────────────────────────────
function ModalFormMateriau({ materiau, onClose, onSave }) {
  const [form, setForm] = useState(
    materiau || {
      id: `MAT-${Date.now()}`,
      nom: "",
      categorie: "Couverture",
      stock: 0,
      seuil: 10,
      unite: "unités",
      prix: 0,
    },
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
            {materiau ? "Modifier le matériau" : "Ajouter un matériau"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Nom
              </label>
              <input
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
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
                Stock actuel
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Seuil alerte
              </label>
              <input
                type="number"
                value={form.seuil}
                onChange={(e) =>
                  setForm({ ...form, seuil: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Unité
              </label>
              <input
                value={form.unite}
                onChange={(e) => setForm({ ...form, unite: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Prix unitaire (Ar)
              </label>
              <input
                type="number"
                value={form.prix}
                onChange={(e) =>
                  setForm({ ...form, prix: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
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
            {materiau ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal Mouvement ───────────────────────────────────────────────────────────
function ModalMouvement({ onClose, onSave, materiaux }) {
  const [form, setForm] = useState({
    id: `MOV-${Date.now()}`,
    materiau: materiaux[0]?.nom || "",
    type: "Entrée",
    quantite: 1,
    date: new Date().toLocaleDateString("fr-FR"),
    logement: "LOG-001",
    fournisseur: "TRANO MORA",
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
            Nouveau mouvement
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
              Matériau
            </label>
            <select
              value={form.materiau}
              onChange={(e) => setForm({ ...form, materiau: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {materiaux.map((m) => (
                <option key={m.id}>{m.nom}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              >
                <option>Entrée</option>
                <option>Sortie</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Quantité
              </label>
              <input
                type="number"
                min="1"
                value={form.quantite}
                onChange={(e) =>
                  setForm({ ...form, quantite: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Logement concerné
            </label>
            <select
              value={form.logement}
              onChange={(e) => setForm({ ...form, logement: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {LOGEMENTS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        {form.type === "Entrée" && (
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
                <option key={f.id}>{f.nom}</option>
              ))}
            </select>
          </div>
        )}
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
            className={`flex-1 py-2 text-white rounded-xl font-semibold transition text-sm ${form.type === "Entrée" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-rose-500 hover:bg-rose-600"}`}
          >
            Enregistrer {form.type === "Entrée" ? "↑" : "↓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────────────
export default function Materiaux() {
  const [materiaux, setMateriaux] = useState(MATERIAUX_INIT);
  const [mouvements, setMouvements] = useState(MOUVEMENTS_INIT);
  const [filtre, setFiltre] = useState("Tous");
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showMvt, setShowMvt] = useState(false);
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const alertes = materiaux.filter((m) => m.stock <= m.seuil);
  const valeurTotale = materiaux.reduce((s, m) => s + m.stock * m.prix, 0);
  const totalEntrees = mouvements
    .filter((m) => m.type === "Entrée")
    .reduce((s, m) => s + m.quantite, 0);
  const totalSorties = mouvements
    .filter((m) => m.type === "Sortie")
    .reduce((s, m) => s + m.quantite, 0);

  const filtered = materiaux.filter(
    (m) =>
      (filtre === "Tous" || m.categorie === filtre) &&
      m.nom.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = (form) => {
    if (formData) {
      setMateriaux(materiaux.map((m) => (m.id === form.id ? form : m)));
    } else {
      setMateriaux([...materiaux, form]);
      triggerSuccess();
    }
  };

  const handleDelete = (id) => {
    setMateriaux(materiaux.filter((m) => m.id !== id));
  };

const handleMouvement = (mvt) => {
  setMouvements([mvt, ...mouvements]);

  // Met à jour le stock
  const materiau = materiaux.find(m => m.nom === mvt.materiau);
  setMateriaux(materiaux.map(m => {
    if (m.nom !== mvt.materiau) return m;
    const newStock = mvt.type === "Entrée"
      ? m.stock + mvt.quantite
      : Math.max(0, m.stock - mvt.quantite);
    return { ...m, stock: newStock };
  }));

  // Crée automatiquement une dépense si c'est une entrée
  if (mvt.type === "Entrée" && materiau) {
    const montant = mvt.quantite * materiau.prix;
    const depense = {
      id: `DEP-${Date.now()}`,
      description: `Achat ${mvt.materiau} x${mvt.quantite} ${materiau.unite}`,
      montant,
      logement: mvt.logement,
      categorie: "Matériaux",
      fournisseur: mvt.fournisseur || "Non précisé",
      date: mvt.date,
      statut: "En attente",
      departement: "Logistique",
    };
    // Stocke dans localStorage pour que Dépenses puisse lire
    const existing = JSON.parse(localStorage.getItem("depenses_auto") || "[]");
    localStorage.setItem("depenses_auto", JSON.stringify([depense, ...existing]));
  }

  triggerSuccess();
};

  return (
    <div className="space-y-5">
      <MessageEnvoye actif={successActif} />

      {/* Modals */}
      {detail && (
        <ModalDetail
          materiau={detail}
          mouvements={mouvements}
          onClose={() => setDetail(null)}
        />
      )}
      {showMvt && (
        <ModalMouvement
          materiaux={materiaux}
          onClose={() => setShowMvt(false)}
          onSave={handleMouvement}
        />
      )}
      {(formData || isAdding) && (
        <ModalFormMateriau
          materiau={formData}
          onClose={() => {
            setFormData(null);
            setIsAdding(false);
          }}
          onSave={handleSave}
        />
      )}

      {/* Statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-blue-500 shadow-sm">
          <p className="text-2xl font-black text-blue-500">
            {materiaux.length}
          </p>
          <p className="text-xs text-gray-400 mt-1">Types de matériaux</p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-rose-500 shadow-sm">
          <p className="text-2xl font-black text-rose-500">{alertes.length}</p>
          <p className="text-xs text-gray-400 mt-1">Alertes stock bas</p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-emerald-500 shadow-sm">
          <p className="text-2xl font-black text-emerald-500">{totalEntrees}</p>
          <p className="text-xs text-gray-400 mt-1">Total entrées</p>
        </div>
        <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-xl p-4 border border-[#E0DDD7] dark:border-gray-700 border-l-4 border-l-amber-500 shadow-sm">
          <p className="text-xs font-black text-amber-500">
            {fmt(valeurTotale)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Valeur totale stock</p>
        </div>
      </div>

      {/* Alertes */}
      {alertes.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
          <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mb-2">
            ⚠ Stock bas — réapprovisionnement nécessaire
          </p>
          <div className="flex flex-wrap gap-2">
            {alertes.map((m) => (
              <span
                key={m.id}
                className="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-lg text-xs font-semibold"
              >
                {m.nom} — {m.stock} {m.unite} (seuil : {m.seuil})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Barre outils */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex gap-1 bg-[#F7F5F0] dark:bg-gray-800 p-1 rounded-xl border border-[#E0DDD7] dark:border-gray-700">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFiltre(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  filtre === c
                    ? "bg-[#0F2D56] text-white shadow"
                    : "text-gray-500 dark:text-gray-400 hover:text-[#0F2D56] dark:hover:text-white"
                }`}
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
            onClick={() => setShowMvt(true)}
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition"
          >
            ↕ Mouvement
          </button>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition"
          >
            + Matériau
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        {filtered.length} matériau{filtered.length > 1 ? "x" : ""}
      </p>

      {/* Tableau */}
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E0DDD7] dark:border-gray-700 bg-[#0F2D56]/5 dark:bg-gray-800">
              {[
                "Matériau",
                "Catégorie",
                "Stock actuel",
                "Seuil",
                "Prix unitaire",
                "Valeur stock",
                "Niveau",
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
            {filtered.map((m) => {
              const pct = Math.min((m.stock / (m.seuil * 3)) * 100, 100);
              const alerte = m.stock <= m.seuil;
              return (
                <tr
                  key={m.id}
                  className="border-b border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-bold text-[#0F2D56] dark:text-white">
                        {m.nom}
                      </p>
                      <p className="font-mono text-xs text-gray-400">{m.id}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#0F2D56]/10 dark:bg-gray-700 text-[#0F2D56] dark:text-gray-300">
                      {m.categorie}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`font-black text-base ${alerte ? "text-rose-500" : "text-emerald-500"}`}
                    >
                      {alerte && "⚠ "}
                      {m.stock}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">
                      {m.unite}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {m.seuil} {m.unite}
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {fmt(m.prix)}
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-[#C9A84C]">
                    {fmt(m.stock * m.prix)}
                  </td>
                  <td className="px-5 py-3 w-32">
                    <div className="h-2 rounded-full bg-gray-100 dark:bg-gray-700">
                      <div
                        className={`h-2 rounded-full transition-all ${alerte ? "bg-rose-400" : "bg-emerald-400"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <BoutonDetail onClick={() => setDetail(m)} />
                      <BoutonModifier onClick={() => setFormData(m)} />
                      <BoutonSupprimer onClick={() => handleDelete(m.id)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Historique mouvements */}
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-[#0F2D56] dark:text-white">
              Historique des mouvements
            </h3>
            <p className="text-xs text-gray-400">
              {mouvements.length} mouvements enregistrés
            </p>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-500 font-semibold">
              ↑ {totalEntrees} entrées
            </span>
            <span className="flex items-center gap-1 text-rose-500 font-semibold">
              ↓ {totalSorties} sorties
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E0DDD7] dark:border-gray-700">
                {[
                  "Réf",
                  "Matériau",
                  "Type",
                  "Quantité",
                  "Logement",
                  "Date",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mouvements.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition"
                >
                  <td className="py-2.5 font-mono text-xs text-gray-400">
                    {m.id}
                  </td>
                  <td className="py-2.5 font-semibold text-[#0F2D56] dark:text-white">
                    {m.materiau}
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${m.type === "Entrée" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"}`}
                    >
                      {m.type === "Entrée" ? "↑" : "↓"} {m.type}
                    </span>
                  </td>
                  <td className="py-2.5 font-black text-[#0F2D56] dark:text-white">
                    {m.quantite}
                  </td>
                  <td className="py-2.5 text-xs text-gray-500 dark:text-gray-400">
                    {m.logement}
                  </td>
                  <td className="py-2.5 text-xs text-gray-400">{m.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
