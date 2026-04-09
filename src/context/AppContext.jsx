import { createContext, useContext, useState } from "react";

// ── Données initiales ─────────────────────────────────────────────────────────

const LOGEMENTS_INIT = [
  {
    id: "LOG-001",
    type: "F3",
    localisation: "Résidence A – Bât. 1",
    statut: "Occupé",
    capacite: 3,
    superficie: 65,
    nb_occupants_max: 3,
  },
  {
    id: "LOG-002",
    type: "F4",
    localisation: "Résidence A – Bât. 2",
    statut: "Disponible",
    capacite: 4,
    superficie: 80,
    nb_occupants_max: 4,
  },
  {
    id: "LOG-003",
    type: "Villa",
    localisation: "Zone B – Villa 5",
    statut: "Occupé",
    capacite: 4,
    superficie: 120,
    nb_occupants_max: 4,
  },
  {
    id: "LOG-004",
    type: "F2",
    localisation: "Résidence C – Bât. 3",
    statut: "Maintenance",
    capacite: 2,
    superficie: 45,
    nb_occupants_max: 2,
  },
  {
    id: "LOG-005",
    type: "F3",
    localisation: "Résidence B – Bât. 1",
    statut: "Disponible",
    capacite: 3,
    superficie: 60,
    nb_occupants_max: 3,
  },
  {
    id: "LOG-006",
    type: "Studio",
    localisation: "Résidence D – N°2",
    statut: "Occupé",
    capacite: 2,
    superficie: 30,
    nb_occupants_max: 2,
  },
];

const DEPARTEMENTS_INIT = [
  {
    id: "DEP-001",
    code: "DSIA",
    nom: "DSIA",
    fullName: "Direction Système d'Information et Audit",
    iconIdx: 0,
    colorIdx: 0,
    services: [
      {
        id: "SRV-001",
        name: "Contrôle de gestion",
        chef: "Marie Dupont",
        employes: [
          {
            id: "EMP-001",
            prenom: "Jean",
            nom: "Randria",
            matricule: "MAT-001",
            categorie: "Cadre moyen",
            anciennete: 5,
            situation: "Marié",
            nb_enfants: 2,
          },
        ],
      },
      { id: "SRV-002", name: "Audit", chef: "Paul Rabe", employes: [] },
      { id: "SRV-003", name: "Organisation", chef: "Sara Mbola", employes: [] },
      {
        id: "SRV-004",
        name: "Informatique et télécom",
        chef: "Luc Andria",
        employes: [
          {
            id: "EMP-002",
            prenom: "Alice",
            nom: "Ratovo",
            matricule: "MAT-002",
            categorie: "Cadre supérieur",
            anciennete: 8,
            situation: "Célibataire",
            nb_enfants: 0,
          },
        ],
      },
    ],
  },
  {
    id: "DEP-002",
    code: "DRH",
    nom: "DRH",
    fullName: "Direction des Ressources Humaines",
    iconIdx: 1,
    colorIdx: 1,
    services: [
      {
        id: "SRV-005",
        name: "Développement des RH",
        chef: "Emma Razaf",
        employes: [],
      },
      {
        id: "SRV-006",
        name: "Administration et Paie",
        chef: "Noël Ravelo",
        employes: [],
      },
      {
        id: "SRV-007",
        name: "Centre de perfectionnement",
        chef: "Haja Tsirim",
        employes: [],
      },
      {
        id: "SRV-008",
        name: "Médecine et pharmacie",
        chef: "Dr. Koto",
        employes: [],
      },
    ],
  },
  {
    id: "DEP-003",
    code: "DAF",
    nom: "DAF",
    fullName: "Direction Administrative et Financière",
    iconIdx: 2,
    colorIdx: 2,
    services: [
      { id: "SRV-009", name: "Finances", chef: "René Raham", employes: [] },
      { id: "SRV-010", name: "Recouvrement", chef: "Nivo Andr", employes: [] },
      { id: "SRV-011", name: "Comptabilité", chef: "Aina Rado", employes: [] },
      { id: "SRV-012", name: "Fiscalité", chef: "Fara Toto", employes: [] },
    ],
  },
  {
    id: "DEP-004",
    code: "DT",
    nom: "DT",
    fullName: "Direction Technique",
    iconIdx: 5,
    colorIdx: 5,
    services: [
      { id: "SRV-013", name: "Maintenances", chef: "Ing. Fara", employes: [] },
      {
        id: "SRV-014",
        name: "Travaux neufs",
        chef: "Arch. Rado",
        employes: [],
      },
      {
        id: "SRV-015",
        name: "Études et planification",
        chef: "Ing. Meva",
        employes: [],
      },
      {
        id: "SRV-016",
        name: "Installations spécialisées",
        chef: "Tech. Bodo",
        employes: [],
      },
    ],
  },
];

const ATTRIBUTIONS_INIT = [
  {
    id: "ATT-001", departement: "DSIA", logement: "LOG-001",
    date_debut: "2024-01-01", date_fin: "2024-12-31", statut: "Occupé",
    occupants: ["Jean Randria", "Alice Ratovo"],
    observations: "Attribution normale",
  },
  {
    id: "ATT-002", departement: "DRH", logement: "LOG-003",
    date_debut: "2024-03-15", date_fin: "2025-03-14", statut: "Occupé",
    occupants: ["Emma Razaf", "Noël Ravelo"],
    observations: "Direction RH",
  },
  {
    id: "ATT-003", departement: "DT", logement: "LOG-006",
    date_debut: "2024-06-01", date_fin: "2025-05-31", statut: "Occupé",
    occupants: ["Ing. Fara", "Arch. Rado"],
    observations: "Équipe technique",
  },
  {
    id: "ATT-004", departement: "DAF", logement: "LOG-002",
    date_debut: "2024-09-01", date_fin: "2025-08-31", statut: "Disponible",
    occupants: [],
    observations: "En attente d'occupation",
  },
  {
    id: "ATT-005", departement: "DAJPP", logement: "LOG-005",
    date_debut: "2023-01-01", date_fin: "2023-12-31", statut: "Maintenance",
    occupants: [],
    observations: "Logement en rénovation",
  },
];

const MATERIAUX_INIT = [
  {
    id: "MAT-TOL",
    nom: "Tôle",
    categorie: "Couverture",
    stock: 45,
    seuil: 20,
    unite: "feuilles",
    prix: 15000,
  },
  {
    id: "MAT-CAR",
    nom: "Carreaux",
    categorie: "Revêtement",
    stock: 12,
    seuil: 30,
    unite: "m²",
    prix: 8000,
  },
  {
    id: "MAT-CIM",
    nom: "Ciment",
    categorie: "Maçonnerie",
    stock: 80,
    seuil: 25,
    unite: "sacs",
    prix: 12000,
  },
  {
    id: "MAT-PEI",
    nom: "Peinture",
    categorie: "Finition",
    stock: 18,
    seuil: 15,
    unite: "litres",
    prix: 5000,
  },
  {
    id: "MAT-CAB",
    nom: "Câbles",
    categorie: "Électricité",
    stock: 200,
    seuil: 50,
    unite: "ml",
    prix: 2000,
  },
  {
    id: "MAT-TUY",
    nom: "Tuyaux PVC",
    categorie: "Plomberie",
    stock: 35,
    seuil: 20,
    unite: "ml",
    prix: 3500,
  },
  {
    id: "MAT-POR",
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
    fournisseur: "TRANO MORA",
  },
  {
    id: "MOV-002",
    materiau: "Carreaux",
    type: "Sortie",
    quantite: 15,
    date: "12/01/2025",
    logement: "LOG-003",
    fournisseur: null,
  },
  {
    id: "MOV-003",
    materiau: "Ciment",
    type: "Entrée",
    quantite: 50,
    date: "15/01/2025",
    logement: "LOG-002",
    fournisseur: "BATIMA",
  },
  {
    id: "MOV-004",
    materiau: "Peinture",
    type: "Sortie",
    quantite: 8,
    date: "18/01/2025",
    logement: "LOG-001",
    fournisseur: null,
  },
  {
    id: "MOV-005",
    materiau: "Câbles",
    type: "Entrée",
    quantite: 100,
    date: "20/01/2025",
    logement: "LOG-006",
    fournisseur: "SOCOBAT",
  },
];

const DEPENSES_INIT = [
  {
    id: "DEP-001",
    description: "Rénovation toiture",
    montant: 1200000,
    logement: "LOG-001",
    categorie: "Travaux",
    fournisseur: "BATIMA",
    date: "10/01/2025",
    statut: "Validé",
    departement: "Technique",
  },
  {
    id: "DEP-002",
    description: "Achat carreaux x50m²",
    montant: 400000,
    logement: "LOG-003",
    categorie: "Matériaux",
    fournisseur: "TRANO MORA",
    date: "12/01/2025",
    statut: "En attente",
    departement: "Logistique",
  },
  {
    id: "DEP-003",
    description: "Peinture intérieure",
    montant: 150000,
    logement: "LOG-002",
    categorie: "Finition",
    fournisseur: "MATÉRIAUX PLUS",
    date: "15/01/2025",
    statut: "Validé",
    departement: "Technique",
  },
  {
    id: "DEP-004",
    description: "Plomberie salle de bain",
    montant: 850000,
    logement: "LOG-006",
    categorie: "Travaux",
    fournisseur: "SOCOBAT",
    date: "18/01/2025",
    statut: "Rejeté",
    departement: "Technique",
  },
  {
    id: "DEP-005",
    description: "Installation électrique",
    montant: 600000,
    logement: "LOG-001",
    categorie: "Électricité",
    fournisseur: "BATIMA",
    date: "20/01/2025",
    statut: "Validé",
    departement: "Technique",
  },
];

// ── Contexte ──────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [logements, setLogements] = useState(LOGEMENTS_INIT);
  const [departements, setDepartements] = useState(DEPARTEMENTS_INIT);
  const [attributions, setAttributions] = useState(ATTRIBUTIONS_INIT);
  const [materiaux, setMateriaux] = useState(MATERIAUX_INIT);
  const [mouvements, setMouvements] = useState(MOUVEMENTS_INIT);
  const [depenses, setDepenses] = useState(DEPENSES_INIT);

  // ── Générateur d'ID propres ───────────────────────────────────────────────
  const genId = (prefix, liste) => {
    const nums = liste.map((i) => parseInt(i.id.split("-")[1])).filter(Boolean);
    const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    return `${prefix}-${String(next).padStart(3, "0")}`;
  };

  // ── Actions Logements ─────────────────────────────────────────────────────
  const ajouterLogement = (l) =>
    setLogements((prev) => [...prev, { ...l, id: genId("LOG", prev) }]);
  const modifierLogement = (l) =>
    setLogements((prev) => prev.map((x) => (x.id === l.id ? l : x)));
  const supprimerLogement = (id) =>
    setLogements((prev) => prev.filter((x) => x.id !== id));

  // ── Actions Départements ──────────────────────────────────────────────────────
  const ajouterDepartement = (d) => {
    const newDep = {
      ...d,
      id: genId("DEP", departements),
      services: [],
    };
    setDepartements((prev) => [...prev, newDep]);
    // Crée automatiquement une attribution pour ce nouveau département
    const newAtt = {
      id: genId("ATT", attributions),
      departement: d.nom,
      logement: null,
      date_debut: new Date().toISOString().split("T")[0],
      date_fin: null,
      statut: "Disponible",
      occupants: [],
      observations: "Attribution automatique à la création",
    };
    setAttributions((prev) => [...prev, newAtt]);
  };

  const modifierDepartement = (d) => {
    setDepartements((prev) =>
      prev.map((x) => (x.id === d.id ? { ...x, ...d } : x)),
    );
    // Met à jour le nom dans les attributions
    setAttributions((prev) =>
      prev.map((a) =>
        a.departement === departements.find((x) => x.id === d.id)?.nom
          ? { ...a, departement: d.nom }
          : a,
      ),
    );
  };

  const supprimerDepartement = (id) => {
    const dep = departements.find((d) => d.id === id);
    setDepartements((prev) => prev.filter((x) => x.id !== id));
    if (dep)
      setAttributions((prev) => prev.filter((a) => a.departement !== dep.nom));
  };

  const ajouterService = (depId, service) => {
    setDepartements((prev) =>
      prev.map((d) => {
        if (d.id !== depId) return d;
        const newSrv = { ...service, id: `SRV-${Date.now()}`, employes: [] };
        return { ...d, services: [...d.services, newSrv] };
      }),
    );
  };

  const modifierService = (depId, service) => {
    setDepartements((prev) =>
      prev.map((d) =>
        d.id !== depId
          ? d
          : {
              ...d,
              services: d.services.map((s) =>
                s.id === service.id ? { ...s, ...service } : s,
              ),
            },
      ),
    );
  };

  const supprimerService = (depId, serviceId) => {
    setDepartements((prev) =>
      prev.map((d) =>
        d.id !== depId
          ? d
          : { ...d, services: d.services.filter((s) => s.id !== serviceId) },
      ),
    );
  };

const ajouterEmployeService = (depId, serviceId, emp) => {
  const dep = departements.find(d => d.id === depId);
  const matricule = `MAT-${String(Date.now()).slice(-5)}`;
  setDepartements(prev => prev.map(d =>
    d.id !== depId ? d : {
      ...d,
      services: d.services.map(s =>
        s.id !== serviceId ? s : {
          ...s,
          employes: [...s.employes, { ...emp, id: `EMP-${Date.now()}`, matricule }]
        }
      )
    }
  ));
  // Ajoute l'employé dans l'attribution du département
  if (dep) {
    setAttributions(prev => prev.map(a =>
      a.departement === dep.nom
        ? { ...a, statut: "Occupé", occupants: [...a.occupants, `${emp.prenom} ${emp.nom}`] }
        : a
    ));
  }
};
  const supprimerEmployeService = (depId, serviceId, empId) => {
    setDepartements((prev) =>
      prev.map((d) =>
        d.id !== depId
          ? d
          : {
              ...d,
              services: d.services.map((s) =>
                s.id !== serviceId
                  ? s
                  : {
                      ...s,
                      employes: s.employes.filter((e) => e.id !== empId),
                    },
              ),
            },
      ),
    );
  };
  // ── Actions Attributions ──────────────────────────────────────────────────
  const ajouterAttribution = (a) => {
    const newId = genId("ATT", attributions);
    setAttributions((prev) => [...prev, { ...a, id: newId }]);
    // Met à jour le statut du logement
    setLogements((prev) =>
      prev.map((l) => (l.id === a.logement ? { ...l, statut: "Occupé" } : l)),
    );
    // Met à jour le logement du département
    setDepartements((prev) =>
      prev.map((d) =>
        d.nom === a.departement ? { ...d, logement: a.logement } : d,
      ),
    );
  };

  const modifierAttribution = (a) => {
    setAttributions((prev) => prev.map((x) => (x.id === a.id ? a : x)));
    setLogements((prev) =>
      prev.map((l) => (l.id === a.logement ? { ...l, statut: a.statut } : l)),
    );
  };

  const terminerAttribution = (id) => {
    const att = attributions.find((a) => a.id === id);
    if (!att) return;
    setAttributions((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, statut: "Disponible", occupants: [] } : a,
      ),
    );
    // Remet le logement disponible
    setLogements((prev) =>
      prev.map((l) =>
        l.id === att.logement ? { ...l, statut: "Disponible" } : l,
      ),
    );
    // Retire le logement du département
    setDepartements((prev) =>
      prev.map((d) =>
        d.nom === att.departement ? { ...d, logement: null } : d,
      ),
    );
  };

  const supprimerAttribution = (id) => {
    const att = attributions.find((a) => a.id === id);
    if (att) {
      setLogements((prev) =>
        prev.map((l) =>
          l.id === att.logement ? { ...l, statut: "Disponible" } : l,
        ),
      );
    }
    setAttributions((prev) => prev.filter((a) => a.id !== id));
  };

  // ── Actions Matériaux ─────────────────────────────────────────────────────
  const ajouterMateriau = (m) =>
    setMateriaux((prev) => [...prev, { ...m, id: genId("MAT", prev) }]);
  const modifierMateriau = (m) =>
    setMateriaux((prev) => prev.map((x) => (x.id === m.id ? m : x)));
  const supprimerMateriau = (id) =>
    setMateriaux((prev) => prev.filter((x) => x.id !== id));

  const ajouterMouvement = (mvt) => {
    const newId = genId("MOV", mouvements);
    const mov = { ...mvt, id: newId };
    setMouvements((prev) => [mov, ...prev]);

    // Met à jour le stock
    const mat = materiaux.find((m) => m.nom === mvt.materiau);
    setMateriaux((prev) =>
      prev.map((m) => {
        if (m.nom !== mvt.materiau) return m;
        const newStock =
          mvt.type === "Entrée"
            ? m.stock + mvt.quantite
            : Math.max(0, m.stock - mvt.quantite);
        return { ...m, stock: newStock };
      }),
    );

    // Crée automatiquement une dépense si entrée
    if (mvt.type === "Entrée" && mat) {
      const montant = mvt.quantite * mat.prix;
      const newDep = {
        id: genId("DEP", depenses),
        description: `Achat ${mvt.materiau} x${mvt.quantite} ${mat.unite}`,
        montant,
        logement: mvt.logement,
        categorie: "Matériaux",
        fournisseur: mvt.fournisseur || "Non précisé",
        date: mvt.date,
        statut: "En attente",
        departement: "Logistique",
      };
      setDepenses((prev) => [newDep, ...prev]);
    }
  };

  // ── Actions Dépenses ──────────────────────────────────────────────────────
  const ajouterDepense = (d) =>
    setDepenses((prev) => [...prev, { ...d, id: genId("DEP", prev) }]);
  const modifierDepense = (d) =>
    setDepenses((prev) => prev.map((x) => (x.id === d.id ? d : x)));
  const supprimerDepense = (id) =>
    setDepenses((prev) => prev.filter((x) => x.id !== id));
  const validerDepense = (id) =>
    setDepenses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "Validé" } : d)),
    );
  const rejeterDepense = (id) =>
    setDepenses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, statut: "Rejeté" } : d)),
    );

  // ── Stats pour le dashboard ───────────────────────────────────────────────
const stats = {
  logDisponibles: logements.filter(l => l.statut === "Disponible").length,
  logOccupes:     logements.filter(l => l.statut === "Occupé").length,
  logMaintenance: logements.filter(l => l.statut === "Maintenance").length,
  logTotal:       logements.length,
  attEnAttente:   attributions.filter(a => a.statut === "En attente").length,
  empTotal:       departements.reduce((s, d) =>
    s + (d.services || []).reduce((ss, srv) =>
      ss + (srv.employes || []).length, 0), 0),
  alertesStock:   materiaux.filter(m => m.stock <= m.seuil).length,
  depEnAttente:   depenses.filter(d => d.statut === "En attente"),
  depTotal:       depenses.filter(d => d.statut === "Validé").reduce((s, d) => s + d.montant, 0),
};

  return (
    <AppContext.Provider
      value={{
        // Données
        logements,
        departements,
        attributions,
        materiaux,
        mouvements,
        depenses,
        // Actions logements
        ajouterLogement,
        modifierLogement,
        supprimerLogement,

        // Actions départements
        ajouterDepartement,
        modifierDepartement,
        supprimerDepartement,
        ajouterService,
        modifierService,
        supprimerService,
        ajouterEmployeService,
        supprimerEmployeService,
        // Actions attributions
        ajouterAttribution,
        modifierAttribution,
        terminerAttribution,
        supprimerAttribution,
        // Actions matériaux
        ajouterMateriau,
        modifierMateriau,
        supprimerMateriau,
        ajouterMouvement,
        // Actions dépenses
        ajouterDepense,
        modifierDepense,
        supprimerDepense,
        validerDepense,
        rejeterDepense,
        // Stats
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
