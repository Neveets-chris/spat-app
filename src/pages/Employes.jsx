import { useState } from "react";
import StatutBadge from "../components/StatutBadge";
import { BoutonSupprimer, BoutonAjouter, BoutonModifier, BoutonDetail, useSuccessMessage, MessageEnvoye } from "../components/BoutonsAction";

const DEPARTEMENTS = [
  {
    id: "DEP-001",
    nom: "Informatique",
    chef: "RAKOTO Herizo",
    logement: "LOG-001",
    employes: [
      {
        id: "EMP-001",
        matricule: "MAT-001",
        nom: "RAKOTO",
        prenom: "Herizo",
        categorie: "Cadre moyen",
        anciennete: 5,
        situation: "Marié",
        nb_enfants: 2,
      },
      {
        id: "EMP-002",
        matricule: "MAT-002",
        nom: "SOLO",
        prenom: "Nirina",
        categorie: "Agent maîtrise",
        anciennete: 3,
        situation: "Célibataire",
        nb_enfants: 0,
      },
      {
        id: "EMP-007",
        matricule: "MAT-007",
        nom: "FARA",
        prenom: "Tiana",
        categorie: "Agent exécution",
        anciennete: 2,
        situation: "Marié",
        nb_enfants: 1,
      },
    ],
  },
  {
    id: "DEP-002",
    nom: "Finance",
    chef: "VOLA Tantely",
    logement: "LOG-003",
    employes: [
      {
        id: "EMP-003",
        matricule: "MAT-003",
        nom: "VOLA",
        prenom: "Tantely",
        categorie: "Cadre supérieur",
        anciennete: 10,
        situation: "Marié",
        nb_enfants: 3,
      },
      {
        id: "EMP-004",
        matricule: "MAT-004",
        nom: "HARY",
        prenom: "Fenitra",
        categorie: "Agent exécution",
        anciennete: 1,
        situation: "Célibataire",
        nb_enfants: 0,
      },
    ],
  },
  {
    id: "DEP-003",
    nom: "RH",
    chef: "RABE Jean",
    logement: "LOG-001",
    employes: [
      {
        id: "EMP-005",
        matricule: "MAT-005",
        nom: "RABE",
        prenom: "Jean",
        categorie: "Cadre moyen",
        anciennete: 7,
        situation: "Marié",
        nb_enfants: 1,
      },
      {
        id: "EMP-006",
        matricule: "MAT-006",
        nom: "NIRY",
        prenom: "Zo",
        categorie: "Agent maîtrise",
        anciennete: 4,
        situation: "Marié",
        nb_enfants: 2,
      },
    ],
  },
  {
    id: "DEP-004",
    nom: "Technique",
    chef: "ANDO Paul",
    logement: "LOG-006",
    employes: [
      {
        id: "EMP-008",
        matricule: "MAT-008",
        nom: "ANDO",
        prenom: "Paul",
        categorie: "Cadre supérieur",
        anciennete: 8,
        situation: "Marié",
        nb_enfants: 2,
      },
      {
        id: "EMP-009",
        matricule: "MAT-009",
        nom: "RAVA",
        prenom: "Luc",
        categorie: "Agent maîtrise",
        anciennete: 3,
        situation: "Célibataire",
        nb_enfants: 0,
      },
      {
        id: "EMP-010",
        matricule: "MAT-010",
        nom: "TINA",
        prenom: "Rosa",
        categorie: "Agent exécution",
        anciennete: 2,
        situation: "Marié",
        nb_enfants: 1,
      },
    ],
  },
  {
    id: "DEP-005",
    nom: "Logistique",
    chef: "SOLA Marie",
    logement: null,
    employes: [
      {
        id: "EMP-011",
        matricule: "MAT-011",
        nom: "SOLA",
        prenom: "Marie",
        categorie: "Cadre moyen",
        anciennete: 6,
        situation: "Marié",
        nb_enfants: 2,
      },
      {
        id: "EMP-012",
        matricule: "MAT-012",
        nom: "KOTO",
        prenom: "Brice",
        categorie: "Agent exécution",
        anciennete: 1,
        situation: "Célibataire",
        nb_enfants: 0,
      },
    ],
  },
  {
    id: "DEP-006",
    nom: "Administration",
    chef: "ZARA Mamy",
    logement: "LOG-002",
    employes: [
      {
        id: "EMP-013",
        matricule: "MAT-013",
        nom: "ZARA",
        prenom: "Mamy",
        categorie: "Cadre supérieur",
        anciennete: 12,
        situation: "Marié",
        nb_enfants: 4,
      },
      {
        id: "EMP-014",
        matricule: "MAT-014",
        nom: "DINA",
        prenom: "Lova",
        categorie: "Agent maîtrise",
        anciennete: 5,
        situation: "Célibataire",
        nb_enfants: 0,
      },
    ],
  },
  {
    id: "DEP-007",
    nom: "Sécurité",
    chef: "MIKA Tsiry",
    logement: null,
    employes: [
      {
        id: "EMP-015",
        matricule: "MAT-015",
        nom: "MIKA",
        prenom: "Tsiry",
        categorie: "Cadre moyen",
        anciennete: 4,
        situation: "Marié",
        nb_enfants: 1,
      },
      {
        id: "EMP-016",
        matricule: "MAT-016",
        nom: "FIDY",
        prenom: "Aina",
        categorie: "Agent exécution",
        anciennete: 2,
        situation: "Célibataire",
        nb_enfants: 0,
      },
      {
        id: "EMP-017",
        matricule: "MAT-017",
        nom: "LAZA",
        prenom: "Haja",
        categorie: "Agent exécution",
        anciennete: 1,
        situation: "Marié",
        nb_enfants: 1,
      },
    ],
  },
];

const LOGEMENTS_DISPO = ["LOG-001", "LOG-002", "LOG-003", "LOG-005", "LOG-006"];

const DEP_ICONS = {
  Informatique: "💻",
  Finance: "💰",
  RH: "👥",
  Technique: "🔧",
  Logistique: "📦",
  Administration: "🏛",
  Sécurité: "🔒",
};

const DEP_COLORS = {
  Informatique: "bg-blue-500",
  Finance: "bg-emerald-500",
  RH: "bg-purple-500",
  Technique: "bg-amber-500",
  Logistique: "bg-teal-500",
  Administration: "bg-rose-500",
  Sécurité: "bg-gray-600",
};

// ── Composants utilitaires ────────────────────────────────────────────────────
function Avatar({ nom, prenom, size = "md" }) {
  const initiales = `${prenom[0]}${nom[0]}`;
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-purple-500",
    "bg-teal-500",
  ];
  const color =
    colors[(nom.charCodeAt(0) + prenom.charCodeAt(0)) % colors.length];
  const sz =
    size === "lg"
      ? "w-12 h-12 text-base"
      : size === "sm"
        ? "w-7 h-7 text-xs"
        : "w-9 h-9 text-sm";
  return (
    <div
      className={`${sz} ${color} rounded-full flex items-center justify-center text-white font-black shrink-0`}
    >
      {initiales}
    </div>
  );
}

function CategorieBadge({ categorie }) {
  const styles = {
    "Cadre supérieur": "bg-purple-100 text-purple-700 border border-purple-200",
    "Cadre moyen": "bg-blue-100 text-blue-700 border border-blue-200",
    "Agent maîtrise": "bg-amber-100 text-amber-700 border border-amber-200",
    "Agent exécution": "bg-gray-100 text-gray-600 border border-gray-200",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${styles[categorie] || "bg-gray-100 text-gray-600"}`}
    >
      {categorie}
    </span>
  );
}

// ── Modal Détail Employé ──────────────────────────────────────────────────────
function ModalDetailEmploye({ employe, depNom, logement, onClose }) {
  if (!employe) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-4">
            <Avatar nom={employe.nom} prenom={employe.prenom} size="lg" />
            <div>
              <p className="font-mono text-xs text-gray-400">
                {employe.matricule}
              </p>
              <h2 className="text-xl font-black text-[#0F2D56] dark:text-white">
                {employe.prenom} {employe.nom}
              </h2>
              <CategorieBadge categorie={employe.categorie} />
            </div>
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
            ["Département", depNom],
            ["Ancienneté", `${employe.anciennete} ans`],
            ["Situation", employe.situation],
            ["Enfants", employe.nb_enfants],
            ["Logement équipe", logement || "Non attribué"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex justify-between py-2.5 border-b border-[#E0DDD7] dark:border-gray-700"
            >
              <span className="text-gray-400">{label}</span>
              <span
                className={`font-semibold ${val === "Non attribué" ? "text-rose-400" : "text-[#0F2D56] dark:text-gray-200"}`}
              >
                {val}
              </span>
            </div>
          ))}
          <div className="flex justify-between py-2.5">
            <span className="text-gray-400">Éligibilité</span>
            <StatutBadge
              statut={employe.anciennete >= 2 ? "Disponible" : "En attente"}
            />
          </div>
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

// ── Modal Formulaire Département ──────────────────────────────────────────────
function ModalFormDep({ dep, onClose, onSave }) {
  const [form, setForm] = useState(
    dep || {
      id: `DEP-00${Math.floor(Math.random() * 99)}`,
      nom: "",
      chef: "",
      logement: null,
      employes: [],
    },
  );
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
            {dep ? "Modifier le département" : "Ajouter un département"}
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
              Nom du département
            </label>
            <input
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Chef de département
            </label>
            <input
              value={form.chef}
              onChange={(e) => setForm({ ...form, chef: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Logement attribué
            </label>
            <select
              value={form.logement || ""}
              onChange={(e) =>
                setForm({ ...form, logement: e.target.value || null })
              }
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              <option value="">Aucun</option>
              {LOGEMENTS_DISPO.map((l) => (
                <option key={l}>{l}</option>
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
            {dep ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalFormEmploye({ depNom, onClose, onSave }) {
  const [form, setForm] = useState({
    id: `EMP-${Date.now()}`,
    matricule: `MAT-${Date.now()}`,
    nom: "",
    prenom: "",
    categorie: "Agent exécution",
    anciennete: 0,
    situation: "Célibataire",
    nb_enfants: 0,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#E0DDD7] dark:border-gray-700 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-black text-[#0F2D56] dark:text-white">
              Ajouter un employé
            </h2>
            <p className="text-xs text-gray-400">Département : {depNom}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>
        <div className="space-y-3 mt-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Prénom
              </label>
              <input
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                placeholder="Herizo"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Nom
              </label>
              <input
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                placeholder="RAKOTO"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Catégorie
            </label>
            <select
              value={form.categorie}
              onChange={(e) => setForm({ ...form, categorie: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {[
                "Cadre supérieur",
                "Cadre moyen",
                "Agent maîtrise",
                "Agent exécution",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Ancienneté (ans)
              </label>
              <input
                type="number"
                value={form.anciennete}
                onChange={(e) =>
                  setForm({ ...form, anciennete: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Nb enfants
              </label>
              <input
                type="number"
                value={form.nb_enfants}
                onChange={(e) =>
                  setForm({ ...form, nb_enfants: Number(e.target.value) })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Situation familiale
            </label>
            <select
              value={form.situation}
              onChange={(e) => setForm({ ...form, situation: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white text-sm focus:outline-none focus:border-[#0F2D56]"
            >
              {["Célibataire", "Marié", "Divorcé", "Veuf"].map((s) => (
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
              if (!form.nom || !form.prenom)
                return alert("Nom et prénom requis");
              onSave(form);
              onClose();
            }}
            className="flex-1 py-2 bg-[#0F2D56] text-white rounded-xl font-semibold hover:bg-[#1a3f75] transition text-sm"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PAGE PRINCIPALE ───────────────────────────────────────────────────────────
export default function Employes() {
  const [data, setData] = useState(DEPARTEMENTS);
  const [search, setSearch] = useState("");
  const [ouverts, setOuverts] = useState({});
  const [detail, setDetail] = useState(null);
  const [formDep, setFormDep] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [addingEmpDep, setAddingEmpDep] = useState(null); // id du dep concerné
  const { actif: successActif, trigger: triggerSuccess } = useSuccessMessage();

  const toggle = (id) => setOuverts((o) => ({ ...o, [id]: !o[id] }));

  const filtered = data.filter(
    (d) =>
      d.nom.toLowerCase().includes(search.toLowerCase()) ||
      d.chef.toLowerCase().includes(search.toLowerCase()) ||
      d.employes.some((e) =>
        `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase()),
      ),
  );

  const handleSaveDep = (form) => {
    if (formDep) {
      setData(data.map((d) => (d.id === form.id ? { ...d, ...form } : d)));
    } else {
      setData([...data, form]);
    }
  };

  const handleDeleteDep = (id) => {
    if (window.confirm("Supprimer ce département et tous ses employés ?")) {
      setData(data.filter((d) => d.id !== id));
    }
  };

  const handleDeleteEmploye = (depId, empId) => {
    if (window.confirm("Supprimer cet employé ?")) {
      setData(
        data.map((d) =>
          d.id === depId
            ? { ...d, employes: d.employes.filter((e) => e.id !== empId) }
            : d,
        ),
      );
    }
  };
const handleAddEmploye = (depId, employe) => {
  setData(
    data.map((d) =>
      d.id === depId ? { ...d, employes: [...d.employes, employe] } : d
    )
  );
  triggerSuccess();
};

  return (
    <div className="space-y-5">
      {/* Modals */}
      {detail && (
        <ModalDetailEmploye
          employe={detail.employe}
          depNom={detail.depNom}
          logement={detail.logement}
          onClose={() => setDetail(null)}
        />
      )}
      {(formDep || isAdding) && (
        <ModalFormDep
          dep={formDep}
          onClose={() => {
            setFormDep(null);
            setIsAdding(false);
          }}
          onSave={handleSaveDep}
        />
      )}
      {addingEmpDep && (
        <ModalFormEmploye
          depNom={data.find((d) => d.id === addingEmpDep)?.nom}
          onClose={() => setAddingEmpDep(null)}
          onSave={(emp) => handleAddEmploye(addingEmpDep, emp)}
        />
      )}
      <MessageEnvoye actif={successActif} />

      {/* Barre outils */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher département ou employé..."
            className="border border-[#E0DDD7] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#0F2D56] dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#0F2D56] w-72"
          />
          <span className="text-xs text-gray-400">
            {filtered.length} département{filtered.length > 1 ? "s" : ""}
          </span>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#0F2D56] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#1a3f75] transition"
        >
          + Département
        </button>
      </div>

      {/* Liste départements */}
      <div className="space-y-4">
        {filtered.map((dep) => {
          const ouvert = ouverts[dep.id];
          const couleur = DEP_COLORS[dep.nom] || "bg-gray-500";
          const icon = DEP_ICONS[dep.nom] || "🏢";

          return (
            <div
              key={dep.id}
              className="bg-[#F7F5F0] dark:bg-gray-900 rounded-2xl border border-[#E0DDD7] dark:border-gray-700 shadow-sm overflow-hidden"
            >
              {/* En-tête département */}
              <div className="flex items-center justify-between px-5 py-4">
                <div
                  className="flex items-center gap-4 cursor-pointer flex-1"
                  onClick={() => toggle(dep.id)}
                >
                  <div
                    className={`w-10 h-10 ${couleur} rounded-xl flex items-center justify-center text-xl shrink-0`}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="font-black text-[#0F2D56] dark:text-white text-base">
                      {dep.nom}
                    </p>
                    <p className="text-xs text-gray-400">
                      Chef : {dep.chef} — {dep.employes.length} employé
                      {dep.employes.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Logement attribué */}
                  <div
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${dep.logement ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" : "bg-rose-100 dark:bg-rose-900/30 text-rose-500"}`}
                  >
                    🏠 {dep.logement || "Non attribué"}
                  </div>

                  {/* Actions */}
                  <BoutonModifier onClick={() => setFormDep(dep)} />
                  <BoutonAjouter
                    texte="Ajouter un employé"
                    onClick={() => {
                      setOuverts((o) => ({ ...o, [dep.id]: true }));
                      setAddingEmpDep(dep.id);
                    }}
                  />
                  <BoutonSupprimer onClick={() => handleDeleteDep(dep.id)} />

                  {/* Toggle flèche */}
                  <button
                    onClick={() => toggle(dep.id)}
                    className="w-8 h-8 rounded-lg bg-[#0F2D56]/10 dark:bg-gray-700 flex items-center justify-center text-[#0F2D56] dark:text-gray-300 hover:bg-[#0F2D56]/20 transition text-xs font-bold"
                  >
                    {ouvert ? "▲" : "▼"}
                  </button>
                </div>
              </div>

              {/* Liste employés (dépliable) */}
              {ouvert && (
                <div className="border-t border-[#E0DDD7] dark:border-gray-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0F2D56]/5 dark:bg-gray-800">
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                          Employé
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                          Matricule
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                          Catégorie
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                          Ancienneté
                        </th>
                        <th className="text-left px-5 py-2.5 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                          Situation
                        </th>
                        <th className="px-5 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {dep.employes.map((e) => (
                        <tr
                          key={e.id}
                          className="border-t border-[#E0DDD7]/50 dark:border-gray-800 hover:bg-[#0F2D56]/5 dark:hover:bg-gray-800 transition"
                        >
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar nom={e.nom} prenom={e.prenom} size="sm" />
                              <span className="font-semibold text-[#0F2D56] dark:text-white">
                                {e.prenom} {e.nom}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 font-mono text-xs text-gray-400">
                            {e.matricule}
                          </td>
                          <td className="px-5 py-3">
                            <CategorieBadge categorie={e.categorie} />
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                            {e.anciennete} ans
                          </td>
                          <td className="px-5 py-3 text-xs text-gray-500 dark:text-gray-400">
                            {e.situation}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <BoutonDetail
                                onClick={() =>
                                  setDetail({
                                    employe: e,
                                    depNom: dep.nom,
                                    logement: dep.logement,
                                  })
                                }
                              />
                              <BoutonSupprimer
                                onClick={() =>
                                  handleDeleteEmploye(dep.id, e.id)
                                }
                              />
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
        })}
      </div>
    </div>
  );
}
