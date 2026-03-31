import { createContext, useContext, useState } from "react";

// ── Données initiales ─────────────────────────────────────────────────────────

const LOGEMENTS_INIT = [
  { id: "LOG-001", type: "F3",     localisation: "Résidence A – Bât. 1", statut: "Occupé",     capacite: 3, superficie: 65,  nb_occupants_max: 3 },
  { id: "LOG-002", type: "F4",     localisation: "Résidence A – Bât. 2", statut: "Disponible", capacite: 4, superficie: 80,  nb_occupants_max: 4 },
  { id: "LOG-003", type: "Villa",  localisation: "Zone B – Villa 5",      statut: "Occupé",     capacite: 4, superficie: 120, nb_occupants_max: 4 },
  { id: "LOG-004", type: "F2",     localisation: "Résidence C – Bât. 3", statut: "Maintenance",capacite: 2, superficie: 45,  nb_occupants_max: 2 },
  { id: "LOG-005", type: "F3",     localisation: "Résidence B – Bât. 1", statut: "Disponible", capacite: 3, superficie: 60,  nb_occupants_max: 3 },
  { id: "LOG-006", type: "Studio", localisation: "Résidence D – N°2",    statut: "Occupé",     capacite: 2, superficie: 30,  nb_occupants_max: 2 },
];

const DEPARTEMENTS_INIT = [
  {
    id: "DEP-001", nom: "Informatique", chef: "RAKOTO Herizo", logement: "LOG-001",
    employes: [
      { id: "EMP-001", matricule: "MAT-001", nom: "RAKOTO", prenom: "Herizo",  categorie: "Cadre moyen",     anciennete: 5,  situation: "Marié",       nb_enfants: 2 },
      { id: "EMP-002", matricule: "MAT-002", nom: "SOLO",   prenom: "Nirina",  categorie: "Agent maîtrise",  anciennete: 3,  situation: "Célibataire", nb_enfants: 0 },
      { id: "EMP-003", matricule: "MAT-003", nom: "FARA",   prenom: "Tiana",   categorie: "Agent exécution", anciennete: 2,  situation: "Marié",       nb_enfants: 1 },
    ],
  },
  {
    id: "DEP-002", nom: "Finance", chef: "VOLA Tantely", logement: "LOG-003",
    employes: [
      { id: "EMP-004", matricule: "MAT-004", nom: "VOLA",   prenom: "Tantely", categorie: "Cadre supérieur", anciennete: 10, situation: "Marié",       nb_enfants: 3 },
      { id: "EMP-005", matricule: "MAT-005", nom: "HARY",   prenom: "Fenitra", categorie: "Agent exécution", anciennete: 1,  situation: "Célibataire", nb_enfants: 0 },
    ],
  },
  {
    id: "DEP-003", nom: "RH", chef: "RABE Jean", logement: "LOG-001",
    employes: [
      { id: "EMP-006", matricule: "MAT-006", nom: "RABE",   prenom: "Jean",    categorie: "Cadre moyen",     anciennete: 7,  situation: "Marié",       nb_enfants: 1 },
      { id: "EMP-007", matricule: "MAT-007", nom: "NIRY",   prenom: "Zo",      categorie: "Agent maîtrise",  anciennete: 4,  situation: "Marié",       nb_enfants: 2 },
    ],
  },
  {
    id: "DEP-004", nom: "Technique", chef: "ANDO Paul", logement: "LOG-006",
    employes: [
      { id: "EMP-008", matricule: "MAT-008", nom: "ANDO",   prenom: "Paul",    categorie: "Cadre supérieur", anciennete: 8,  situation: "Marié",       nb_enfants: 2 },
      { id: "EMP-009", matricule: "MAT-009", nom: "RAVA",   prenom: "Luc",     categorie: "Agent maîtrise",  anciennete: 3,  situation: "Célibataire", nb_enfants: 0 },
      { id: "EMP-010", matricule: "MAT-010", nom: "TINA",   prenom: "Rosa",    categorie: "Agent exécution", anciennete: 2,  situation: "Marié",       nb_enfants: 1 },
    ],
  },
  {
    id: "DEP-005", nom: "Logistique", chef: "SOLA Marie", logement: null,
    employes: [
      { id: "EMP-011", matricule: "MAT-011", nom: "SOLA",   prenom: "Marie",   categorie: "Cadre moyen",     anciennete: 6,  situation: "Marié",       nb_enfants: 2 },
      { id: "EMP-012", matricule: "MAT-012", nom: "KOTO",   prenom: "Brice",   categorie: "Agent exécution", anciennete: 1,  situation: "Célibataire", nb_enfants: 0 },
    ],
  },
  {
    id: "DEP-006", nom: "Administration", chef: "ZARA Mamy", logement: "LOG-002",
    employes: [
      { id: "EMP-013", matricule: "MAT-013", nom: "ZARA",   prenom: "Mamy",    categorie: "Cadre supérieur", anciennete: 12, situation: "Marié",       nb_enfants: 4 },
      { id: "EMP-014", matricule: "MAT-014", nom: "DINA",   prenom: "Lova",    categorie: "Agent maîtrise",  anciennete: 5,  situation: "Célibataire", nb_enfants: 0 },
    ],
  },
  {
    id: "DEP-007", nom: "Sécurité", chef: "MIKA Tsiry", logement: null,
    employes: [
      { id: "EMP-015", matricule: "MAT-015", nom: "MIKA",   prenom: "Tsiry",   categorie: "Cadre moyen",     anciennete: 4,  situation: "Marié",       nb_enfants: 1 },
      { id: "EMP-016", matricule: "MAT-016", nom: "FIDY",   prenom: "Aina",    categorie: "Agent exécution", anciennete: 2,  situation: "Célibataire", nb_enfants: 0 },
      { id: "EMP-017", matricule: "MAT-017", nom: "LAZA",   prenom: "Haja",    categorie: "Agent exécution", anciennete: 1,  situation: "Marié",       nb_enfants: 1 },
    ],
  },
];

const ATTRIBUTIONS_INIT = [
  { id: "ATT-001", departement: "Informatique", logement: "LOG-001", date_debut: "2024-01-01", date_fin: "2024-12-31", statut: "Occupé",     occupants: ["RAKOTO Herizo", "SOLO Nirina", "FARA Tiana"],    observations: "Attribution normale" },
  { id: "ATT-002", departement: "Finance",      logement: "LOG-003", date_debut: "2024-03-15", date_fin: "2025-03-14", statut: "Occupé",     occupants: ["VOLA Tantely", "HARY Fenitra"],                   observations: "Logement villa" },
  { id: "ATT-003", departement: "Technique",    logement: "LOG-006", date_debut: "2024-06-01", date_fin: "2025-05-31", statut: "Occupé",     occupants: ["ANDO Paul", "RAVA Luc", "TINA Rosa"],             observations: "Équipe terrain" },
  { id: "ATT-004", departement: "Administration",logement: "LOG-002",date_debut: "2024-09-01", date_fin: "2025-08-31", statut: "Disponible", occupants: ["ZARA Mamy", "DINA Lova"],                         observations: "En attente" },
  { id: "ATT-005", departement: "RH",           logement: "LOG-005", date_debut: "2023-01-01", date_fin: "2023-12-31", statut: "Maintenance",occupants: [],                                                  observations: "Logement en rénovation" },
];

const MATERIAUX_INIT = [
  { id: "MAT-TOL", nom: "Tôle",       categorie: "Couverture",  stock: 45,  seuil: 20, unite: "feuilles", prix: 15000 },
  { id: "MAT-CAR", nom: "Carreaux",   categorie: "Revêtement",  stock: 12,  seuil: 30, unite: "m²",       prix: 8000  },
  { id: "MAT-CIM", nom: "Ciment",     categorie: "Maçonnerie",  stock: 80,  seuil: 25, unite: "sacs",     prix: 12000 },
  { id: "MAT-PEI", nom: "Peinture",   categorie: "Finition",    stock: 18,  seuil: 15, unite: "litres",   prix: 5000  },
  { id: "MAT-CAB", nom: "Câbles",     categorie: "Électricité", stock: 200, seuil: 50, unite: "ml",       prix: 2000  },
  { id: "MAT-TUY", nom: "Tuyaux PVC", categorie: "Plomberie",   stock: 35,  seuil: 20, unite: "ml",       prix: 3500  },
  { id: "MAT-POR", nom: "Portes",     categorie: "Menuiserie",  stock: 8,   seuil: 5,  unite: "unités",   prix: 85000 },
];

const MOUVEMENTS_INIT = [
  { id: "MOV-001", materiau: "Tôle",     type: "Entrée", quantite: 20, date: "10/01/2025", logement: "LOG-001", fournisseur: "TRANO MORA" },
  { id: "MOV-002", materiau: "Carreaux", type: "Sortie", quantite: 15, date: "12/01/2025", logement: "LOG-003", fournisseur: null },
  { id: "MOV-003", materiau: "Ciment",   type: "Entrée", quantite: 50, date: "15/01/2025", logement: "LOG-002", fournisseur: "BATIMA" },
  { id: "MOV-004", materiau: "Peinture", type: "Sortie", quantite: 8,  date: "18/01/2025", logement: "LOG-001", fournisseur: null },
  { id: "MOV-005", materiau: "Câbles",   type: "Entrée", quantite: 100,date: "20/01/2025", logement: "LOG-006", fournisseur: "SOCOBAT" },
];

const DEPENSES_INIT = [
  { id: "DEP-001", description: "Rénovation toiture",     montant: 1200000, logement: "LOG-001", categorie: "Travaux",    fournisseur: "BATIMA",        date: "10/01/2025", statut: "Validé",     departement: "Technique"  },
  { id: "DEP-002", description: "Achat carreaux x50m²",   montant: 400000,  logement: "LOG-003", categorie: "Matériaux",  fournisseur: "TRANO MORA",    date: "12/01/2025", statut: "En attente", departement: "Logistique" },
  { id: "DEP-003", description: "Peinture intérieure",    montant: 150000,  logement: "LOG-002", categorie: "Finition",   fournisseur: "MATÉRIAUX PLUS",date: "15/01/2025", statut: "Validé",     departement: "Technique"  },
  { id: "DEP-004", description: "Plomberie salle de bain",montant: 850000,  logement: "LOG-006", categorie: "Travaux",    fournisseur: "SOCOBAT",       date: "18/01/2025", statut: "Rejeté",     departement: "Technique"  },
  { id: "DEP-005", description: "Installation électrique",montant: 600000,  logement: "LOG-001", categorie: "Électricité",fournisseur: "BATIMA",        date: "20/01/2025", statut: "Validé",     departement: "Technique"  },
];

// ── Contexte ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [logements,    setLogements]    = useState(LOGEMENTS_INIT);
  const [departements, setDepartements] = useState(DEPARTEMENTS_INIT);
  const [attributions, setAttributions] = useState(ATTRIBUTIONS_INIT);
  const [materiaux,    setMateriaux]    = useState(MATERIAUX_INIT);
  const [mouvements,   setMouvements]   = useState(MOUVEMENTS_INIT);
  const [depenses,     setDepenses]     = useState(DEPENSES_INIT);

  // ── Générateur d'ID propres ───────────────────────────────────────────────
  const genId = (prefix, liste) => {
    const nums = liste.map(i => parseInt(i.id.split("-")[1])).filter(Boolean);
    const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    return `${prefix}-${String(next).padStart(3, "0")}`;
  };

  // ── Actions Logements ─────────────────────────────────────────────────────
  const ajouterLogement    = (l) => setLogements(prev => [...prev, { ...l, id: genId("LOG", prev) }]);
  const modifierLogement   = (l) => setLogements(prev => prev.map(x => x.id === l.id ? l : x));
  const supprimerLogement  = (id) => setLogements(prev => prev.filter(x => x.id !== id));

  // ── Actions Départements ──────────────────────────────────────────────────
  const ajouterDepartement   = (d) => setDepartements(prev => [...prev, { ...d, id: genId("DEP", prev), employes: [] }]);
  const modifierDepartement  = (d) => setDepartements(prev => prev.map(x => x.id === d.id ? { ...x, ...d } : x));
  const supprimerDepartement = (id) => setDepartements(prev => prev.filter(x => x.id !== id));
  const ajouterEmploye       = (depId, emp) => {
    setDepartements(prev => prev.map(d => {
      if (d.id !== depId) return d;
      const newId = genId("EMP", d.employes.map(e => ({ id: e.id })));
      const mat   = `MAT-${String(d.employes.length + 1).padStart(3, "0")}`;
      return { ...d, employes: [...d.employes, { ...emp, id: newId, matricule: mat }] };
    }));
  };
  const supprimerEmploye = (depId, empId) => {
    setDepartements(prev => prev.map(d =>
      d.id === depId ? { ...d, employes: d.employes.filter(e => e.id !== empId) } : d
    ));
  };

  // ── Actions Attributions ──────────────────────────────────────────────────
  const ajouterAttribution = (a) => {
    const newId = genId("ATT", attributions);
    setAttributions(prev => [...prev, { ...a, id: newId }]);
    // Met à jour le statut du logement
    setLogements(prev => prev.map(l =>
      l.id === a.logement ? { ...l, statut: "Occupé" } : l
    ));
    // Met à jour le logement du département
    setDepartements(prev => prev.map(d =>
      d.nom === a.departement ? { ...d, logement: a.logement } : d
    ));
  };

  const modifierAttribution = (a) => {
    setAttributions(prev => prev.map(x => x.id === a.id ? a : x));
    setLogements(prev => prev.map(l =>
      l.id === a.logement ? { ...l, statut: a.statut } : l
    ));
  };

  const terminerAttribution = (id) => {
    const att = attributions.find(a => a.id === id);
    if (!att) return;
    setAttributions(prev => prev.map(a =>
      a.id === id ? { ...a, statut: "Disponible", occupants: [] } : a
    ));
    // Remet le logement disponible
    setLogements(prev => prev.map(l =>
      l.id === att.logement ? { ...l, statut: "Disponible" } : l
    ));
    // Retire le logement du département
    setDepartements(prev => prev.map(d =>
      d.nom === att.departement ? { ...d, logement: null } : d
    ));
  };

  const supprimerAttribution = (id) => {
    const att = attributions.find(a => a.id === id);
    if (att) {
      setLogements(prev => prev.map(l =>
        l.id === att.logement ? { ...l, statut: "Disponible" } : l
      ));
    }
    setAttributions(prev => prev.filter(a => a.id !== id));
  };

  // ── Actions Matériaux ─────────────────────────────────────────────────────
  const ajouterMateriau   = (m) => setMateriaux(prev => [...prev, { ...m, id: genId("MAT", prev) }]);
  const modifierMateriau  = (m) => setMateriaux(prev => prev.map(x => x.id === m.id ? m : x));
  const supprimerMateriau = (id) => setMateriaux(prev => prev.filter(x => x.id !== id));

  const ajouterMouvement = (mvt) => {
    const newId = genId("MOV", mouvements);
    const mov   = { ...mvt, id: newId };
    setMouvements(prev => [mov, ...prev]);

    // Met à jour le stock
    const mat = materiaux.find(m => m.nom === mvt.materiau);
    setMateriaux(prev => prev.map(m => {
      if (m.nom !== mvt.materiau) return m;
      const newStock = mvt.type === "Entrée"
        ? m.stock + mvt.quantite
        : Math.max(0, m.stock - mvt.quantite);
      return { ...m, stock: newStock };
    }));

    // Crée automatiquement une dépense si entrée
    if (mvt.type === "Entrée" && mat) {
      const montant = mvt.quantite * mat.prix;
      const newDep  = {
        id:          genId("DEP", depenses),
        description: `Achat ${mvt.materiau} x${mvt.quantite} ${mat.unite}`,
        montant,
        logement:    mvt.logement,
        categorie:   "Matériaux",
        fournisseur: mvt.fournisseur || "Non précisé",
        date:        mvt.date,
        statut:      "En attente",
        departement: "Logistique",
      };
      setDepenses(prev => [newDep, ...prev]);
    }
  };

  // ── Actions Dépenses ──────────────────────────────────────────────────────
  const ajouterDepense   = (d) => setDepenses(prev => [...prev, { ...d, id: genId("DEP", prev) }]);
  const modifierDepense  = (d) => setDepenses(prev => prev.map(x => x.id === d.id ? d : x));
  const supprimerDepense = (id) => setDepenses(prev => prev.filter(x => x.id !== id));
  const validerDepense   = (id) => setDepenses(prev => prev.map(d => d.id === id ? { ...d, statut: "Validé"     } : d));
  const rejeterDepense   = (id) => setDepenses(prev => prev.map(d => d.id === id ? { ...d, statut: "Rejeté"     } : d));

  // ── Stats pour le dashboard ───────────────────────────────────────────────
  const stats = {
    logDisponibles: logements.filter(l => l.statut === "Disponible").length,
    logOccupes:     logements.filter(l => l.statut === "Occupé").length,
    logMaintenance: logements.filter(l => l.statut === "Maintenance").length,
    logTotal:       logements.length,
    attEnAttente:   attributions.filter(a => a.statut === "En attente").length,
    empTotal:       departements.reduce((s, d) => s + d.employes.length, 0),
    alertesStock:   materiaux.filter(m => m.stock <= m.seuil).length,
    depEnAttente:   depenses.filter(d => d.statut === "En attente"),
    depTotal:       depenses.filter(d => d.statut === "Validé").reduce((s, d) => s + d.montant, 0),
  };

  return (
    <AppContext.Provider value={{
      // Données
      logements, departements, attributions, materiaux, mouvements, depenses,
      // Actions logements
      ajouterLogement, modifierLogement, supprimerLogement,
      // Actions départements
      ajouterDepartement, modifierDepartement, supprimerDepartement, ajouterEmploye, supprimerEmploye,
      // Actions attributions
      ajouterAttribution, modifierAttribution, terminerAttribution, supprimerAttribution,
      // Actions matériaux
      ajouterMateriau, modifierMateriau, supprimerMateriau, ajouterMouvement,
      // Actions dépenses
      ajouterDepense, modifierDepense, supprimerDepense, validerDepense, rejeterDepense,
      // Stats
      stats,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}