import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import {useAuth} from "./AuthContext";

//API Django 
const API = "http://localhost:8000/api";


function authHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const LOGEMENTS_INIT = [
  { id: "LOG-001-F3",     type: "F3",     localisation: "Résidence A – Bât. 1", statut: "Occupé",      capacite: 3, superficie: 65,  nb_occupants_max: 3 },
  { id: "LOG-002-F4",     type: "F4",     localisation: "Résidence A – Bât. 2", statut: "Disponible",  capacite: 4, superficie: 80,  nb_occupants_max: 4 },
  { id: "LOG-003-Villa",  type: "Villa",  localisation: "Zone B – Villa 5",     statut: "Occupé",      capacite: 4, superficie: 120, nb_occupants_max: 4 },
  { id: "LOG-004-F2",     type: "F2",     localisation: "Résidence C – Bât. 3", statut: "Maintenance", capacite: 2, superficie: 45,  nb_occupants_max: 2 },
  { id: "LOG-005-F3",     type: "F3",     localisation: "Résidence B – Bât. 1", statut: "Disponible",  capacite: 3, superficie: 60,  nb_occupants_max: 3 },
  { id: "LOG-006-Studio", type: "Studio", localisation: "Résidence D – N°2",    statut: "Occupé",      capacite: 2, superficie: 30,  nb_occupants_max: 2 },
];

// Contexte 
const AppContext = createContext(null);

export function AppProvider({ children }) {


  //State logements (localStorage) 
  const [logements, setLogements] = useState(() =>
    LOGEMENTS_INIT.map(l => ({
      ...l,
      historique: l.historique || [{
        id: `HIST-INIT-${l.id}`,
        ref: l.id,
        statut: l.statut,
        date: "2024-01-01",
        heure: "00:00",
        commentaire: "Statut initial"
      }]
    }))
  );

  //State Django (chargés via API) 
  const [departements, setDepartements] = useState([]);
  const [attributions, setAttributions] = useState([]);
  const [materiaux, setMateriaux]       = useState([]);
  const [mouvements, setMouvements]     = useState([]);
  const [depenses, setDepenses]         = useState([]);

  // State local uniquement 
  const [besoinsMaintenanceLog, setBesoinsMaintenanceLog] = useState({});
  const [alertesMaintenanceLog, setAlertesMaintenance]    = useState({});
  const [travauxEnCours, setTravauxEnCours]               = useState({});
  const [alertesBesoins, setAlertesBesoins]               = useState([]);
const [historiqueRH, setHistoriqueRH] = useState([]);
  const [budgetGlobal, setBudgetGlobal] = useState(() => {
    const saved = localStorage.getItem("spat_budget_global");
    return saved ? Number(saved) : 20000000;
  });

  //Chargement initial Django 
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      clearInterval(interval);
      _chargerTout();
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const _chargerTout = async () => {
    try {
      const [resDep, resAtt, resMat, resMov, resDep2, resHist] = await Promise.allSettled([
        axios.get(`${API}/departements/`,          { headers: authHeaders() }),
        axios.get(`${API}/attributions/`,          { headers: authHeaders() }),
        axios.get(`${API}/materiaux/`,             { headers: authHeaders() }),
        axios.get(`${API}/materiaux/mouvements/`,  { headers: authHeaders() }),
        axios.get(`${API}/depenses/`,              { headers: authHeaders() }),
        axios.get(`${API}/historique-rh/`,        { headers: authHeaders() }),
      ]);

      if (resDep.status  === "fulfilled") setDepartements(_normalizeDepartements(resDep.value.data));
      if (resAtt.status  === "fulfilled") setAttributions(resAtt.value.data);
      if (resMat.status  === "fulfilled") setMateriaux(resMat.value.data);
      if (resMov.status  === "fulfilled") setMouvements(resMov.value.data);
      if (resDep2.status === "fulfilled") setDepenses(resDep2.value.data.map(d => ({ ...d, prixUnitaire: d.prix_unitaire })));
      if (resHist.status === "fulfilled") setHistoriqueRH(resHist.value.data);
    } catch (e) {
      console.warn("Erreur chargement initial :", e);
    }
  };

  // Normalise la réponse Django 
  const _normalizeDepartements = (data) =>
    data.map(dep => ({
      ...dep,
      id:       dep.id,          
      name:     dep.name || dep.nom,
      code:     dep.code,
      services: (dep.services || []).map(srv => ({
        ...srv,
        name:     srv.name || srv.nom,
        employes: (srv.employes || []).map(e => ({
          ...e,
          desactive:           e.desactive          ?? false,
          motifDesactivation:  e.motif_desactivation ?? null,
          typeDesactivation:   e.type_desactivation  ?? null,
          reactivationPossible: e.reactivation_possible ?? true,
          dateDesactivation:   e.date_desactivation  ?? null,
        })),
      })),
    }));

  //  Historique RH 
  const ajouterHistorique = async (action, details = {}) => {
    const now = new Date();
    const payload = {
      action,
      date:             now.toLocaleDateString("fr-FR"),
      heure:            now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      employe:          details.employe          || "",
      employe_id:       details.employeId        ?? null,
      matricule:        details.matricule         || "",
      departement:      details.departement       || "",
      departement_code: details.departementCode   || "",
      departement_id:   details.departementId     ?? null,
      service:          details.service           || "",
      service_id:       details.serviceId         ?? null,
      chef:             details.chef              || "",
      motif:            details.motif             || "",
      champs_modifies:  details.champsModifies    || "",
      logement_id:      details.logementId        || "",
      nb_employes:      details.nbEmployes        ?? null,
      nb_services:      details.nbServices        ?? null,
    };

    try {
      const res = await axios.post(
        `${API}/historique-rh/`,
        payload,
        { headers: authHeaders() }
      );
      setHistoriqueRH(prev => [res.data, ...prev].slice(0, 500));
    } catch (e) {
      console.warn("Erreur sauvegarde historique RH :", e);
      // Fallback local si Django injoignable
      setHistoriqueRH(prev => [
        { id: `LOCAL-${Date.now()}`, ...payload },
        ...prev
      ].slice(0, 500));
    }
  };

  //Générateur d'ID propres 
  const genId = (prefix, liste, type = null) => {
    const nums = liste.map(i => parseInt(i.id?.split("-")[1])).filter(Boolean);
    const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    const baseId = `${prefix}-${String(next).padStart(3, "0")}`;
    return type ? `${baseId}-${type}` : baseId;
  };

  //Helpers logement 
  const getCapaciteLogement = (typeLogement) => {
    const capacites = { "Studio": 1, "F1": 1, "F2": 2, "F3": 3, "F4": 4, "Villa": 6 };
    return capacites[typeLogement] || 2;
  };

  const getStatutLogementService = (depNomOuCode, serviceId) => {
    const att = attributions.find(a =>
      a.logement &&
      a.statut !== "Maintenance" &&
      a.statut !== "Terminé" &&
      (a.departement === depNomOuCode ||
       a.departement?.startsWith(`${depNomOuCode} —`) ||
       a.service_id === serviceId)
    );
    return att ? "Logé" : "Non logé";
  };

  // ACTIONS LOGEMENTS (localStorage uniquement)
  const ajouterLogement = (l) => {
    const newId = genId("LOG", logements, l.type);
    const now = new Date();
    const newLogement = {
      ...l, id: newId,
      historique: [{
        id: `HIST-${Date.now()}`, ref: newId,
        statut: l.statut || "Disponible",
        date: now.toLocaleDateString("fr-FR"),
        heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        commentaire: "Création du logement"
      }]
    };
    setLogements(prev => [...prev, newLogement]);
    return newLogement;
  };

  const modifierLogement = (l) => {
    setLogements(prev => prev.map(x => {
      if (x.id !== l.id) return x;
      if (x.statut === "Maintenance" && !x._reparationTerminee && l.statut !== "Disponible") return x;
      if (x.statut === "Occupé" && l.statut === "Disponible") return x;
      if (l.statut === "Maintenance" && (!l.besoinsMaintenance || l.besoinsMaintenance.length === 0)) return x;
      const attActive = attributions.find(a => a.logement === l.id && a.statut === "Occupé");
      const nbOccupants = attActive ? (attActive.occupants || []).length : 0;
      if (l.nb_occupants_max !== undefined && l.nb_occupants_max < nbOccupants) return x;

      const ancienStatut = x.statut;
      const nouveauStatut = l.statut;
      let historique = x.historique || [];
      if (nouveauStatut && ancienStatut !== nouveauStatut) {
        const now = new Date();
        historique = [...historique, {
          id: `HIST-${Date.now()}`, ref: l.id, statut: nouveauStatut,
          date: now.toLocaleDateString("fr-FR"),
          heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          commentaire: `Changement de statut : ${ancienStatut} → ${nouveauStatut}`
        }];
      }
      if (nouveauStatut === "Maintenance" && ancienStatut !== "Maintenance") {
        return { ...x, ...l, statutAvantMaintenance: ancienStatut, historique };
      }
      return { ...x, ...l, historique };
    }));
  };

  const supprimerLogement = (id) => {
    const logement = logements.find(l => l.id === id);
    if (logement?.statut === "Occupé") {
      alert("❌ Impossible de supprimer un logement occupé. Libérez-le d'abord.");
      return false;
    }
    setLogements(prev => prev.filter(x => x.id !== id));
    return true;
  };

  const modifierStatutHistorique = (logId, historiqueId, nouveauStatut) => {
    setLogements(prev => prev.map(l => {
      if (l.id !== logId) return l;
      const ancienStatut = l.statut;
      const now = new Date();
      const historique = (l.historique || []).map(h =>
        h.id === historiqueId ? { ...h, statut: nouveauStatut } : h
      );
      if (ancienStatut !== nouveauStatut) {
        historique.push({
          id: `HIST-${Date.now()}`, ref: logId, statut: nouveauStatut,
          date: now.toLocaleDateString("fr-FR"),
          heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          commentaire: `Statut modifié depuis l'historique : ${ancienStatut} → ${nouveauStatut}`
        });
      }
      return { ...l, statut: nouveauStatut, historique };
    }));
  };

  // MAINTENANCE (localStorage)
  const demarrerMaintenance = (logId, besoins, logementData = null) => {
    if (!besoins || besoins.length === 0) return { success: false, error: "Pas de besoins" };
    const besoinsValides = besoins.filter(b => b.nom && b.nom.trim() !== "" && b.quantite > 0);
    if (besoinsValides.length === 0) return { success: false, error: "Besoins invalides" };
    const logement = logementData || logements.find(l => l.id === logId);
    if (!logement) return { success: false, error: "Logement non trouvé" };
    const statutAvantMaintenance = logement.statutAvantMaintenance || logement.statut;

    setLogements(prev => prev.map(l => {
      if (l.id !== logId) return l;
      const now = new Date();
      return {
        ...l, statut: "Maintenance", statutAvantMaintenance, besoinsMaintenance: besoinsValides,
        historique: [...(l.historique || []), {
          id: `HIST-${Date.now()}`, ref: logId, statut: "Maintenance",
          date: now.toLocaleDateString("fr-FR"),
          heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
          commentaire: `Passage en maintenance — ${besoinsValides.length} matériau(x) requis`
        }]
      };
    }));

    // Passer les attributions liées en Maintenance via Django
    const attLiee = attributions.find(a => a.logement === logId && a.statut === "Occupé");
    if (attLiee) {
      axios.post(`${API}/attributions/${attLiee.id}/passer_maintenance/`, {}, { headers: authHeaders() })
        .then(res => setAttributions(prev => prev.map(a => a.id === attLiee.id ? res.data : a)))
        .catch(e => console.warn("Erreur passage maintenance attribution :", e));
    }

    const alertes = besoinsValides.map(b => {
      const mat = materiaux.find(m => m.nom.toLowerCase() === b.nom.toLowerCase());
      const unite = b.unite || mat?.unite || "unités";
      let statut, message;
      if (!mat)                      { statut = "achat";  message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — À acheter`; }
      else if (mat.stock >= b.quantite) { statut = "ok";  message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — Stock suffisant (${mat.stock})`; }
      else                           { statut = "manque"; message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — Insuffisant (${mat.stock} dispo)`; }
      return { nom: b.nom, quantite: b.quantite, unite, logementId: logId, logementType: logement.type, logementLocalisation: logement.localisation, statut, message, stockDisponible: mat?.stock || 0 };
    });

    setBesoinsMaintenanceLog(prev => ({ ...prev, [logId]: besoinsValides }));
    setAlertesMaintenance(prev => ({ ...prev, [logId]: alertes }));
    return { success: true, alertes };
  };

  const commencerReparation = (logId, dureeMinutes = 10) => {
    const maintenant = Date.now();
    setTravauxEnCours(prev => ({
      ...prev,
      [logId]: { debut: maintenant, dureeMin: dureeMinutes, fin: maintenant + dureeMinutes * 60000 }
    }));
  };

  const terminerReparation = (logId) => {
    setLogements(prev => {
      const logement = prev.find(l => l.id === logId);
      if (!logement) return prev;
      const statutRetour = logement.statutAvantMaintenance || "Disponible";
      const nowFin = new Date();
      return prev.map(l =>
        l.id === logId ? {
          ...l, statut: statutRetour, _reparationTerminee: true,
          statutAvantMaintenance: undefined, besoinsMaintenance: undefined,
          materiauxSortis: undefined, _demenagementTemp: undefined,
          historique: [...(l.historique || []), {
            id: `HIST-${Date.now()}`, ref: logId, statut: statutRetour,
            date: nowFin.toLocaleDateString("fr-FR"),
            heure: nowFin.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            commentaire: `Fin de réparation — Retour au statut : ${statutRetour}`
          }]
        } : l
      );
    });

    // Restaurer l'attribution via Django
    const attLiee = attributions.find(a => a.logement === logId && a.statut === "Maintenance");
    if (attLiee && !attLiee.temporaire) {
      axios.post(`${API}/attributions/${attLiee.id}/restaurer/`, {}, { headers: authHeaders() })
        .then(res => setAttributions(prev => prev.map(a => a.id === attLiee.id ? res.data : a)))
        .catch(e => console.warn("Erreur restauration attribution :", e));
    }

    setTravauxEnCours(prev => { const n = { ...prev }; delete n[logId]; return n; });
    setBesoinsMaintenanceLog(prev => { const n = { ...prev }; delete n[logId]; return n; });
    setAlertesMaintenance(prev => { const n = { ...prev }; delete n[logId]; return n; });
  };

  const confirmerReemmenagement = (logId) => {
    terminerReparation(logId);
    setAttributions(prev => prev.filter(a => !(a.temporaire && a.logement_origine === logId)));
  };

  const demenagementTemporaire = async (logIdSource, logIdCible, occupants) => {
    try {
      const payload = {
        departement: "Déménagement temporaire",
        logement: logIdCible,
        date_debut: new Date().toISOString().split("T")[0],
        statut: "Occupé",
        occupants_input: occupants,
        observations: `Déménagement temporaire depuis ${logIdSource} (en maintenance)`,
        temporaire: true,
        logement_origine: logIdSource,
        verrouille: false,
      };
      const res = await axios.post(`${API}/attributions/`, payload, { headers: authHeaders() });
      setAttributions(prev => [...prev, res.data]);
      setLogements(prev => prev.map(l => l.id === logIdCible ? { ...l, statut: "Occupé" } : l));
    } catch (e) {
      console.error("Erreur déménagement temporaire :", e.response?.data || e.message);
    }
  };

  const retournerStock = (logId, materiauNom, quantiteRetour, unite = "unités") => {
    if (!quantiteRetour || quantiteRetour <= 0) return;
    setMateriaux(prev => {
      const mat = prev.find(m => m.nom.toLowerCase() === materiauNom.toLowerCase());
      if (mat) return prev.map(m => m.id === mat.id ? { ...m, stock: m.stock + quantiteRetour } : m);
      return [...prev, { id: genId("MAT", prev), nom: materiauNom, categorie: "Autre", stock: quantiteRetour, seuil: 10, unite, prix: 1000 }];
    });
    setMouvements(prev => [{
      id: genId("MOV", prev), materiau: materiauNom, type: "Entrée",
      quantite: quantiteRetour, unite, date: new Date().toLocaleDateString("fr-FR"),
      source: `Retour surplus — ${logId}`, logement: logId, receptionne: true,
    }, ...prev]);
    setLogements(prev => prev.map(l =>
      l.id === logId ? {
        ...l, materiauxSortis: l.materiauxSortis?.map(ms =>
          ms.nom.toLowerCase() === materiauNom.toLowerCase()
            ? { ...ms, quantiteSortie: Math.max(0, ms.quantiteSortie - quantiteRetour), retourne: true }
            : ms
        ).filter(ms => ms.quantiteSortie > 0)
      } : l
    ));
  };

  const effacerAlerteLogement = (logId, materiauNomSorti = null) => {
    setAlertesMaintenance(prev => {
      const alertesLog = prev[logId];
      if (!alertesLog) return prev;
      if (!materiauNomSorti) { const n = { ...prev }; delete n[logId]; return n; }
      const alertesRestantes = alertesLog.filter(a => a.nom.toLowerCase() !== materiauNomSorti.toLowerCase());
      if (alertesRestantes.length === 0) { const n = { ...prev }; delete n[logId]; return n; }
      return { ...prev, [logId]: alertesRestantes };
    });
    setBesoinsMaintenanceLog(prev => {
      const besoins = prev[logId];
      if (!besoins) return prev;
      if (!materiauNomSorti) { const n = { ...prev }; delete n[logId]; return n; }
      const besoinsRestants = besoins.filter(b => b.nom.toLowerCase() !== materiauNomSorti.toLowerCase());
      if (besoinsRestants.length === 0) { const n = { ...prev }; delete n[logId]; return n; }
      return { ...prev, [logId]: besoinsRestants };
    });
  };

  // ACTIONS DÉPARTEMENTS 
  const ajouterDepartement = async (d) => {
    try {
      const res = await axios.post(`${API}/departements/`, {
        nom:      d.nom || d.name,
        code:     d.code,
        fullName: d.fullName,
      }, { headers: authHeaders() });

      const newDep = { ...res.data, services: res.data.services || [] };
      setDepartements(prev => [...prev, newDep]);
      ajouterHistorique("ajout_departement", {
        departement:     newDep.nom,
        departementId:   newDep.id,
        departementCode: newDep.code,
        fullName:        newDep.fullName,
      });
      return newDep;
    } catch (e) {
      console.error("Erreur ajout département :", e.response?.data || e.message);
    }
  };

  const modifierDepartement = async (d) => {
    try {
      const res = await axios.patch(`${API}/departements/${d.id}/`, {
        nom:      d.nom || d.name,
        code:     d.code,
        fullName: d.fullName,
      }, { headers: authHeaders() });

      setDepartements(prev => prev.map(x => x.id === d.id ? { ...x, ...res.data } : x));

      // Synchroniser le nom dans les attributions
      const ancienNom = departements.find(x => x.id === d.id)?.nom;
      if (ancienNom && ancienNom !== d.nom) {
        setAttributions(prev => prev.map(a =>
          a.departement === ancienNom ? { ...a, departement: d.nom } : a
        ));
      }
    } catch (e) {
      console.error("Erreur modification département :", e.response?.data || e.message);
    }
  };

  const supprimerDepartement = async (id) => {
    const dep = departements.find(d => d.id === id);
    try {
      await axios.delete(`${API}/departements/${id}/`, { headers: authHeaders() });
      setDepartements(prev => prev.filter(x => x.id !== id));
      if (dep) {
        setAttributions(prev => prev.filter(a => a.departement !== dep.nom));
        ajouterHistorique("suppression_departement", {
          departement:     dep.nom,
          departementId:   dep.id,
          departementCode: dep.code,
          fullName:        dep.fullName,
          nbServices:      (dep.services || []).length,
          nbEmployes:      (dep.services || []).reduce((a, s) => a + (s.employes || []).length, 0),
        });
      }
    } catch (e) {
      console.error("Erreur suppression département :", e.response?.data || e.message);
    }
  };

  //Services 
  const ajouterService = async (depId, service) => {
    console.log("ajouterService — depId:", depId, "type:", typeof depId);
    const depIdNum = Number(depId);
    if (!depIdNum || isNaN(depIdNum)) {
      console.error("depId invalide:", depId);
      return null;
    }
    
    const url = `${API}/departements/${depIdNum}/services/`;
    console.log("URL:", url);
    
    try {
      const res = await axios.post(url,
        { name: service.name, chef: service.chef || "" },
        { headers: authHeaders() }
      );
   
      const newSrv = { ...res.data, employes: res.data.employes || [] };
      const depFound = departements.find(d => d.id === depId);
      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : { ...d, services: [...d.services, newSrv] }
      ));
      ajouterHistorique("ajout_service", {
        service:         newSrv.name,
        serviceId:       newSrv.id,
        chef:            newSrv.chef || "À définir",
        departement:     depFound?.nom,
        departementId:   depId,
        departementCode: depFound?.code,
      });
      return newSrv;
    } catch (e) {
      console.error("Erreur ajout service :", e.response?.data || e.message);
    }
  };

  const modifierService = async (depId, service) => {
    try {
      const res = await axios.patch(
        `${API}/departements/${depId}/services/${service.id}/`,
        { name: service.name, chef: service.chef },
        { headers: authHeaders() }
      );
      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : {
          ...d, services: d.services.map(s => s.id === service.id ? { ...s, ...res.data } : s)
        }
      ));
    } catch (e) {
      console.error("Erreur modification service :", e.response?.data || e.message);
    }
  };

  const supprimerService = async (depId, serviceId) => {
    const dep = departements.find(d => d.id === depId);
    const srv = dep?.services.find(s => s.id === serviceId);
    try {
      await axios.delete(`${API}/departements/${depId}/services/${serviceId}/`, { headers: authHeaders() });
      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : { ...d, services: d.services.filter(s => s.id !== serviceId) }
      ));
      if (srv) {
        ajouterHistorique("suppression_service", {
          service:         srv.name,
          serviceId:       serviceId,
          chef:            srv.chef,
          departement:     dep?.nom,
          departementId:   depId,
          departementCode: dep?.code,
          nbEmployes:      (srv.employes || []).length,
        });
      }
    } catch (e) {
      console.error("Erreur suppression service :", e.response?.data || e.message);
    }
  };

  //Employés 
  const ajouterEmployeService = async (depId, serviceId, emp) => {
    const dep     = departements.find(d => d.id === depId);
    const service = dep?.services.find(s => s.id === serviceId);
    if (!dep || !service) return { success: false, error: "Département ou service introuvable" };

    try {
      const res = await axios.post(
        `${API}/departements/${depId}/services/${serviceId}/employes/`,
        {
          prenom:    emp.prenom,
          nom:       emp.nom,
          categorie: emp.categorie,
          anciennete:emp.anciennete || 0,
          situation: emp.situation  || "",
          nb_enfants:emp.nb_enfants || 0,
          email:     emp.email      || "",
          adresse:   emp.adresse    || "",
          salaire:   emp.salaire    || 0,
        },
        { headers: authHeaders() }
      );

      const nouvelEmp = {
        ...res.data,
        desactive:          false,
        motifDesactivation: null,
        typeDesactivation:  null,
        reactivationPossible: true,
      };

      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : {
          ...d, services: d.services.map(s =>
            s.id !== serviceId ? s : { ...s, employes: [...s.employes, nouvelEmp] }
          )
        }
      ));

      // Synchroniser les occupants de l'attribution liée
      const attLiee = attributions.find(a =>
        a.logement && a.statut !== "Terminé" && a.statut !== "Maintenance" &&
        a.service_id === serviceId
      );
      if (attLiee) {
        const nomComplet       = `${emp.prenom} ${emp.nom}`;
        const nouveauxOccupants = [...(attLiee.occupants?.map(o => o.nom_complet || o) || []), nomComplet];
        await _synchroniserOccupants(attLiee.id, nouveauxOccupants);
        setLogements(prev => prev.map(l =>
          l.id === attLiee.logement ? { ...l, statut: "Occupé", nbOccupants: nouveauxOccupants.length } : l
        ));
      }

      ajouterHistorique("ajout_employe", {
        employe:         `${nouvelEmp.prenom} ${nouvelEmp.nom}`,
        employeId:       nouvelEmp.id,
        matricule:       nouvelEmp.matricule,
        categorie:       nouvelEmp.categorie,
        departement:     dep.nom,
        departementCode: dep.code,
        service:         service.name,
        serviceId:       service.id,
        logementId:      attLiee?.logement || null,
      });

      return { success: true, employe: nouvelEmp };
    } catch (e) {
      const msg = e.response?.data?.detail || e.message;
      console.error("Erreur ajout employé :", msg);
      if (e.response?.status === 400) alert(`❌ ${msg}`);
      return { success: false, error: msg };
    }
  };

  const supprimerEmployeService = async (depId, serviceId, empId) => {
    try {
      await axios.delete(
        `${API}/departements/${depId}/services/${serviceId}/employes/${empId}/`,
        { headers: authHeaders() }
      );
      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : {
          ...d, services: d.services.map(s =>
            s.id !== serviceId ? s : { ...s, employes: s.employes.filter(e => e.id !== empId) }
          )
        }
      ));
    } catch (e) {
      console.error("Erreur suppression employé :", e.response?.data || e.message);
    }
  };

  const modifierEmploye = async (depId, serviceId, empId, updates) => {
    const dep = departements.find(d => d.id === depId);
    const srv = dep?.services.find(s => s.id === serviceId);
    const emp = srv?.employes.find(e => e.id === empId);
    try {
      const res = await axios.patch(
        `${API}/departements/${depId}/services/${serviceId}/employes/${empId}/`,
        updates,
        { headers: authHeaders() }
      );
      setDepartements(prev => prev.map(d =>
        d.id !== depId ? d : {
          ...d, services: d.services.map(s =>
            s.id !== serviceId ? s : {
              ...s, employes: s.employes.map(e => e.id === empId ? { ...e, ...res.data } : e)
            }
          )
        }
      ));
      if (emp) {
        ajouterHistorique("modification_employe", {
          employe:         `${emp.prenom} ${emp.nom}`,
          employeId:       empId,
          matricule:       emp.matricule,
          departement:     dep?.nom,
          departementCode: dep?.code,
          service:         srv?.name,
          serviceId:       serviceId,
          champsModifies:  Object.keys(updates).join(", "),
        });
      }
    } catch (e) {
      console.error("Erreur modification employé :", e.response?.data || e.message);
    }
  };

  const desactiverEmploye = async (depId, serviceId, employeOuId, motifObj) => {
    let motifLabel, motifType;
    if (typeof motifObj === "string") { motifLabel = motifObj; motifType = "definitif"; }
    else                              { motifLabel = motifObj.label; motifType = motifObj.type; }

    const empId  = typeof employeOuId === "object" ? employeOuId.id : employeOuId;
    const empObj = typeof employeOuId === "object" ? employeOuId : null;

    if (!motifLabel?.trim()) { alert("Le motif de désactivation est obligatoire."); return false; }

    const dep     = departements.find(d => d.id === depId || d.code === depId);
    const service = dep?.services.find(s => s.id === serviceId);
    const employe = empObj || service?.employes.find(e => e.id === empId);
    if (!employe || !dep) { console.error("Employé ou département non trouvé"); return false; }

    try {
      const res = await axios.post(
        `${API}/departements/${dep.id}/services/${serviceId}/employes/${empId}/desactiver/`,
        { motif: motifLabel, type_desactivation: motifType },
        { headers: authHeaders() }
      );

      const updatedEmp = {
        ...res.data,
        desactive:          true,
        motifDesactivation: motifLabel,
        typeDesactivation:  motifType,
        reactivationPossible: motifType === "temporaire",
        dateDesactivation:  new Date().toLocaleDateString("fr-FR"),
      };

      setDepartements(prev => prev.map(d => {
        if (d.id !== dep.id && d.code !== depId) return d;
        return {
          ...d, services: d.services.map(s =>
            s.id !== serviceId ? s : {
              ...s, employes: s.employes.map(e => e.id === empId ? updatedEmp : e)
            }
          )
        };
      }));

      // Retirer l'employé des occupants de l'attribution liée
      const nomComplet = `${employe.prenom} ${employe.nom}`.trim();
      const attLiee = attributions.find(a =>
        a.logement && a.statut !== "Terminé" && a.statut !== "Maintenance" &&
        (a.service_id === serviceId ||
         (a.departement?.includes(dep.nom) && a.departement?.includes(service?.name)))
      );
      if (attLiee) {
        const occupantsActuels  = attLiee.occupants?.map(o => o.nom_complet || o) || [];
        const nouveauxOccupants = occupantsActuels.filter(o => o !== nomComplet);
        await _synchroniserOccupants(attLiee.id, nouveauxOccupants);
        setLogements(prev => prev.map(l =>
          l.id === attLiee.logement ? {
            ...l,
            statut:      nouveauxOccupants.length > 0 ? "Occupé" : "Disponible",
            nbOccupants: nouveauxOccupants.length,
          } : l
        ));
        if (nouveauxOccupants.length === 0) {
          setDepartements(prev => prev.map(d => ({
            ...d, services: (d.services || []).map(s =>
              s.id === serviceId ? { ...s, logementAttribue: null, besoinLogementExprime: false } : s
            )
          })));
        }
      }

      ajouterHistorique(
        motifType === "definitif" ? "desactivation_definitive" : "desactivation_temporaire",
        {
          employe:          nomComplet,
          employeId:        empId,
          matricule:        employe.matricule,
          motif:            motifLabel,
          departement:      dep.nom || dep.name,
          departementCode:  dep.code || dep.id,
          service:          service?.name,
          serviceId:        service?.id,
          logementId:       attLiee?.logement || null,
        }
      );
      return true;
    } catch (e) {
      const msg = e.response?.data?.detail || e.message;
      console.error("Erreur désactivation employé :", msg);
      alert(`❌ ${msg}`);
      return false;
    }
  };

  const reactiverEmploye = async (depId, serviceId, empId) => {
    const dep     = departements.find(d => d.id === depId || d.code === depId);
    const service = dep?.services.find(s => s.id === serviceId);
    const employe = service?.employes.find(e => e.id === empId);
    if (!employe) { console.error("Employé non trouvé pour réactivation"); return false; }

    if (employe.typeDesactivation === "definitif" || employe.reactivationPossible === false) {
      alert(`Impossible de réactiver ${employe.prenom} ${employe.nom}.\n\nMotif : "${employe.motifDesactivation}" (définitif).`);
      return false;
    }

    try {
      const res = await axios.post(
        `${API}/departements/${dep.id}/services/${serviceId}/employes/${empId}/reactiver/`,
        {},
        { headers: authHeaders() }
      );

      const updatedEmp = {
        ...res.data,
        desactive:          false,
        motifDesactivation: null,
        typeDesactivation:  null,
        reactivationPossible: true,
        dateDesactivation:  null,
      };

      setDepartements(prev => prev.map(d => {
        if (d.id !== dep.id && d.code !== depId) return d;
        return {
          ...d, services: d.services.map(s =>
            s.id !== serviceId ? s : {
              ...s, employes: s.employes.map(e => e.id === empId ? updatedEmp : e)
            }
          )
        };
      }));

      // Réintégrer l'employé dans les occupants
      const nomComplet = `${employe.prenom} ${employe.nom}`.trim();
      const attLiee = attributions.find(a =>
        a.logement && a.statut !== "Terminé" && a.statut !== "Maintenance" &&
        (a.service_id === serviceId ||
         (a.departement?.includes(dep.nom) && a.departement?.includes(service?.name)))
      );
      if (attLiee) {
        const logement    = logements.find(l => l.id === attLiee.logement);
        const capaciteMax = logement ? getCapaciteLogement(logement.type) : 999;
        const occupantsActuels = attLiee.occupants?.map(o => o.nom_complet || o) || [];
        if (occupantsActuels.length >= capaciteMax) {
          alert(`Capacité maximale atteinte (${capaciteMax}). Libérez d'abord une place.`);
          return false;
        }
        const nouveauxOccupants = [...occupantsActuels, nomComplet];
        await _synchroniserOccupants(attLiee.id, nouveauxOccupants);
        setLogements(prev => prev.map(l =>
          l.id === attLiee.logement ? { ...l, statut: "Occupé", nbOccupants: nouveauxOccupants.length } : l
        ));
      }

      ajouterHistorique("reactivation", {
        employe:         nomComplet,
        employeId:       empId,
        matricule:       employe.matricule,
        departement:     dep.nom || dep.name,
        departementCode: dep.code || dep.id,
        service:         service?.name,
        serviceId:       service?.id,
        logementId:      attLiee?.logement || null,
      });
      return true;
    } catch (e) {
      const msg = e.response?.data?.detail || e.message;
      console.error("Erreur réactivation employé :", msg);
      alert(`❌ ${msg}`);
      return false;
    }
  };

  // ACTIONS ATTRIBUTIONS → Django

  // synchronise les occupants via Django
  const _synchroniserOccupants = async (attId, occupantsListe) => {
    try {
      const res = await axios.post(
        `${API}/attributions/${attId}/synchroniser/`,
        { occupants: occupantsListe },
        { headers: authHeaders() }
      );
      setAttributions(prev => prev.map(a => a.id === attId ? res.data : a));
      return res.data;
    } catch (e) {
      console.error("Erreur synchronisation occupants :", e.response?.data || e.message);
    }
  };

  const ajouterAttribution = async (a) => {
    // Récupérer les employés actifs du service pour les occupants initiaux
    let occupantsInitiaux = [];
    if (a._serviceId) {
      for (const d of departements) {
        const srv = (d.services || []).find(s => s.id === a._serviceId);
        if (srv) {
          occupantsInitiaux = (srv.employes || [])
            .filter(e => e && !e.desactive)
            .map(e => `${e.prenom || ""} ${e.nom || ""}`.trim())
            .filter(Boolean);
          break;
        }
      }
    }
    if (a.occupants?.length > 0 && occupantsInitiaux.length === 0) {
      occupantsInitiaux = a.occupants.filter(o => o?.trim());
    }

    try {
      const payload = {
        departement:   a.departement,
        logement:      a.logement,
        date_debut:    a.date_debut || new Date().toISOString().split("T")[0],
        date_fin:      a.date_fin   || "",
        observations:  a.observations || "",
        service_id:    a._serviceId   || null,
        alerte_id:     a._alerteId    || null,
        verrouille:    true,
        occupants_input: occupantsInitiaux,
      };
      const res = await axios.post(`${API}/attributions/`, payload, { headers: authHeaders() });
      setAttributions(prev => [...prev, res.data]);

      // Mettre à jour le logement si occupé
      if (occupantsInitiaux.length > 0 && a.logement) {
        setLogements(prev => prev.map(l =>
          l.id === a.logement ? { ...l, statut: "Occupé", nbOccupants: occupantsInitiaux.length } : l
        ));
      }

      // Marquer le service comme logé
      if (a._serviceId) {
        setDepartements(prev => prev.map(d => ({
          ...d, services: (d.services || []).map(s =>
            s.id === a._serviceId ? { ...s, logementAttribue: a.logement, besoinLogementExprime: false } : s
          )
        })));
        // Notifier Django
        const dep = departements.find(d => (d.services || []).some(s => s.id === a._serviceId));
        if (dep) {
          axios.post(
            `${API}/departements/${dep.id}/services/${a._serviceId}/attribuer_logement/`,
            { logement_id: a.logement, type_logement: logements.find(l => l.id === a.logement)?.type },
            { headers: authHeaders() }
          ).catch(e => console.warn("Erreur mise à jour service logement :", e));
        }
      }

      // Résoudre l'alerte
      if (a._alerteId) {
        setAlertesBesoins(prev => prev.map(al =>
          al.id === a._alerteId ? { ...al, statut: "Résolue", logementAttribue: a.logement, dateResolution: new Date().toLocaleDateString("fr-FR") } : al
        ));
      }
      return res.data;
    } catch (e) {
      console.error("Erreur ajout attribution :", e.response?.data || e.message);
    }
  };

  const modifierAttribution = async (a) => {
    const existante = attributions.find(x => x.id === a.id);
    try {
      // Si verrouillée, seuls date_fin et observations sont modifiables
      const payload = existante?.verrouille
        ? { date_fin: a.date_fin, observations: a.observations }
        : a;
      const res = await axios.patch(`${API}/attributions/${a.id}/`, payload, { headers: authHeaders() });
      setAttributions(prev => prev.map(x => x.id === a.id ? res.data : x));
    } catch (e) {
      console.error("Erreur modification attribution :", e.response?.data || e.message);
    }
  };

  const synchroniserOccupantsAttribution = async (serviceId, nouveauxOccupants) => {
    const attLiee = attributions.find(a =>
      a.logement && a.statut !== "Terminé" && a.statut !== "Maintenance" &&
      a.service_id === serviceId
    );
    if (!attLiee) return false;
    await _synchroniserOccupants(attLiee.id, nouveauxOccupants);
    setLogements(prev => prev.map(l =>
      l.id === attLiee.logement ? {
        ...l,
        statut:      nouveauxOccupants.length > 0 ? "Occupé" : "Disponible",
        nbOccupants: nouveauxOccupants.length,
      } : l
    ));
    return true;
  };

  const terminerAttribution = async (id) => {
    const att = attributions.find(a => a.id === id);
    if (!att) return;
    try {
      const res = await axios.post(`${API}/attributions/${id}/terminer/`, {}, { headers: authHeaders() });
      setAttributions(prev => prev.map(a => a.id === id ? res.data : a));
      setLogements(prev => prev.map(l => {
        if (l.id !== att.logement) return l;
        const now = new Date();
        return {
          ...l, statut: "Disponible", nbOccupants: 0,
          historique: [...(l.historique || []), {
            id: `HIST-${Date.now()}`, ref: l.id, statut: "Disponible",
            date: now.toLocaleDateString("fr-FR"),
            heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            commentaire: `Fin d'attribution — ${att.departement} — Logement libéré`
          }]
        };
      }));
      setDepartements(prev => prev.map(d => ({
        ...d, services: (d.services || []).map(s =>
          s.logementAttribue === att.logement
            ? { ...s, logementAttribue: null, dateAttribution: null, besoinLogementExprime: false }
            : s
        )
      })));
      // Libérer côté service Django
      if (att.service_id) {
        const dep = departements.find(d => (d.services || []).some(s => s.id === att.service_id));
        if (dep) {
          axios.post(
            `${API}/departements/${dep.id}/services/${att.service_id}/liberer_logement/`,
            {},
            { headers: authHeaders() }
          ).catch(e => console.warn("Erreur libération logement service :", e));
        }
      }
    } catch (e) {
      console.error("Erreur terminaison attribution :", e.response?.data || e.message);
    }
  };

  const supprimerAttribution = async (id) => {
    const att = attributions.find(a => a.id === id);
    if (att?.verrouille) {
      alert("Cette attribution est verrouillée. Terminez-la d'abord.");
      return;
    }
    try {
      await axios.delete(`${API}/attributions/${id}/`, { headers: authHeaders() });
      if (att) {
        setLogements(prev => prev.map(l => {
          if (l.id !== att.logement) return l;
          const now = new Date();
          return {
            ...l, statut: "Disponible", attributionId: null,
            historique: [...(l.historique || []), {
              id: `HIST-${Date.now()}`, ref: l.id, statut: "Disponible",
              date: now.toLocaleDateString("fr-FR"),
              heure: now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
              commentaire: `Suppression attribution — ${att.departement} — Logement libéré`
            }]
          };
        }));
        setDepartements(prev => prev.map(d => ({
          ...d, services: (d.services || []).map(s =>
            s.logementAttribue === att.logement
              ? { ...s, logementAttribue: null, dateAttribution: null, besoinLogementExprime: false }
              : s
          )
        })));
      }
      setAttributions(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      console.error("Erreur suppression attribution :", e.response?.data || e.message);
    }
  };

  // ACTIONS MATÉRIAUX → Django
  const ajouterMateriau = async (m) => {
    try {
      const res = await axios.post(`${API}/materiaux/`, m, { headers: authHeaders() });
      setMateriaux(prev => [...prev, res.data]);
    } catch (e) { console.error("Erreur ajout matériau :", e.response?.data || e.message); }
  };

  const modifierMateriau = async (m) => {
    try {
      const res = await axios.patch(`${API}/materiaux/${m.id}/`, m, { headers: authHeaders() });
      setMateriaux(prev => prev.map(x => x.id === m.id ? res.data : x));
    } catch (e) { console.error("Erreur modification matériau :", e.response?.data || e.message); }
  };

  const supprimerMateriau = async (id) => {
    try {
      await axios.delete(`${API}/materiaux/${id}/`, { headers: authHeaders() });
      setMateriaux(prev => prev.filter(x => x.id !== id));
    } catch (e) { console.error("Erreur suppression matériau :", e.response?.data || e.message); }
  };

  const rafraichirMateriaux = async () => {
    try {
      const res = await axios.get(`${API}/materiaux/`, { headers: authHeaders() });
      setMateriaux(res.data);
    } catch (e) { console.error("Impossible de rafraîchir les matériaux", e); }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTIONS MOUVEMENTS → Django
  // ═══════════════════════════════════════════════════════════════════════════
  const ajouterMouvement = async (mvt) => {
    try {
      const payload = {
        materiau:      mvt.materiau,
        type:          mvt.type,
        quantite:      mvt.quantite,
        unite:         mvt.unite        || "unités",
        logement:      mvt.logement     || "",
        source:        mvt.source       || "",
        fournisseur:   mvt.fournisseur  || "",
        date:          mvt.date,
        receptionne:   mvt.type === "Entrée" ? false : true,
        prix_unitaire: mvt.prixUnitaire || 0,     // ✅ snake_case cohérent
        // depense_id omis si null — Django le traitera comme optionnel
        ...(mvt.depenseId != null && { depense_id: mvt.depenseId }),
      };
      const res = await axios.post(`${API}/materiaux/mouvements/`, payload, { headers: authHeaders() });
      setMouvements(prev => [res.data, ...prev]);

      if (mvt.type === "Sortie") {
        rafraichirMateriaux();
        if (mvt.source) {
          const logId = mvt.source;
          setLogements(prev => prev.map(l => {
            if (l.id !== logId) return l;
            if (l.statut !== "Maintenance" && l.statut !== "EN_REPARATION") return l;
            const materiauxSortis = l.materiauxSortis || [];
            const existant = materiauxSortis.find(ms => ms.nom === mvt.materiau);
            const nouveaux = existant
              ? materiauxSortis.map(ms => ms.nom === mvt.materiau ? { ...ms, quantiteSortie: ms.quantiteSortie + mvt.quantite } : ms)
              : [...materiauxSortis, { nom: mvt.materiau, quantiteSortie: mvt.quantite, unite: mvt.unite || "unités" }];
            const besoins = l.besoinsMaintenance || [];
            const tousSortis = besoins.every(b => {
              const sorti = nouveaux.find(ms => ms.nom === b.nom);
              return sorti && sorti.quantiteSortie >= b.quantite;
            });
            return { ...l, statut: tousSortis ? "EN_REPARATION" : l.statut, materiauxSortis: nouveaux };
          }));
        }
      }
    } catch (e) { console.error("Erreur ajout mouvement :", e.response?.data || e.message); }
  };

  const receptionnerMouvement = async (mouvementId) => {
    const pk = typeof mouvementId === "string" ? parseInt(mouvementId.split("-")[1]) : mouvementId;
    const mouvement = mouvements.find(m => m.id === mouvementId || m.id === `MOV-${String(pk).padStart(4, "0")}`);
    if (!mouvement || mouvement.type !== "Entrée" || mouvement.receptionne) return;
    try {
      const res = await axios.post(`${API}/materiaux/mouvements/${pk}/receptionner/`, {}, { headers: authHeaders() });
      setMouvements(prev => prev.map(m => m.id === mouvement.id ? res.data : m));
      rafraichirMateriaux();
      if (mouvement.depenseId) {
        setDepenses(prev => prev.map(d =>
          d.id === mouvement.depenseId
            ? { ...d, receptionne: true, historique: [...(d.historique || []), { action: "Réception", date: new Date().toLocaleString("fr-FR"), utilisateur: "Système" }] }
            : d
        ));
      }
    } catch (e) { console.error("Erreur réception mouvement :", e.response?.data || e.message); }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ACTIONS DÉPENSES → Django
  // ═══════════════════════════════════════════════════════════════════════════
  const ajouterDepense = async (d) => {
    try {
      const res = await axios.post(`${API}/depenses/`, {
        description: d.description, quantite: d.quantite || 1,
        unite: d.unite || "unités", prix_unitaire: d.prixUnitaire || 0,
        categorie: d.categorie, fournisseur: d.fournisseur,
        logement: d.logement || "", departement: d.departement || "",
        statut: d.statut || "En attente", receptionne: false, date: d.date,
      }, { headers: authHeaders() });
      setDepenses(prev => [...prev, { ...res.data, prixUnitaire: res.data.prix_unitaire }]);
    } catch (e) { console.error("Erreur ajout dépense :", e.response?.data || e.message); }
  };

  const modifierDepense = async (d) => {
    const pk = parseInt(d.id.split("-")[1]);
    try {
      const res = await axios.patch(`${API}/depenses/${pk}/`, {
        description: d.description, quantite: d.quantite || 1,
        unite: d.unite || "unités", prix_unitaire: d.prixUnitaire || 0,
        categorie: d.categorie, fournisseur: d.fournisseur,
        logement: d.logement || "", departement: d.departement || "",
        statut: d.statut, date: d.date,
      }, { headers: authHeaders() });
      setDepenses(prev => prev.map(x => x.id === d.id ? { ...res.data, prixUnitaire: res.data.prix_unitaire } : x));
    } catch (e) { console.error("Erreur modification dépense :", e.response?.data || e.message); }
  };

  const supprimerDepense = async (id) => {
    const pk = parseInt(id.split("-")[1]);
    try {
      await axios.delete(`${API}/depenses/${pk}/`, { headers: authHeaders() });
      setDepenses(prev => prev.filter(x => x.id !== id));
    } catch (e) { console.error("Erreur suppression dépense :", e.response?.data || e.message); }
  };

  const validerDepense = async (id) => {
    const pk = parseInt(id.split("-")[1]);
    const depense = depenses.find(d => d.id === id);
    if (!depense || depense.statut !== "En attente") return;
    try {
      const res = await axios.post(`${API}/depenses/${pk}/valider/`, {}, { headers: authHeaders() });
      setDepenses(prev => prev.map(d => d.id === id ? { ...res.data, prixUnitaire: res.data.prix_unitaire } : d));
      await ajouterMouvement({
        materiau: depense.description, type: "Entrée",
        quantite: depense.quantite || 1, unite: depense.unite || "unités",
        prixUnitaire: depense.prixUnitaire || 0,
        date: new Date().toLocaleDateString("fr-FR"),
        logement: depense.logement || "", depenseId: depense.id,
        receptionne: false, fournisseur: depense.fournisseur || "",
        source: depense.fournisseur || "",
      });
    } catch (e) { console.error("Erreur validation dépense :", e.response?.data || e.message); }
  };

  const rejeterDepense = async (id) => {
    const pk = parseInt(id.split("-")[1]);
    try {
      const res = await axios.post(`${API}/depenses/${pk}/rejeter/`, {}, { headers: authHeaders() });
      setDepenses(prev => prev.map(d => d.id === id ? { ...res.data, prixUnitaire: res.data.prix_unitaire } : d));
    } catch (e) { console.error("Erreur rejet dépense :", e.response?.data || e.message); }
  };

  const receptionnerDepense = async (depenseId) => {
    const pk = parseInt(depenseId.split("-")[1]);
    const depense = depenses.find(d => d.id === depenseId);
    if (!depense || depense.statut !== "Validé" || depense.receptionne) return;
    try {
      const res = await axios.post(`${API}/depenses/${pk}/receptionner/`, {}, { headers: authHeaders() });
      setDepenses(prev => prev.map(d => d.id === depenseId ? { ...res.data, prixUnitaire: res.data.prix_unitaire } : d));
      const mouvement = mouvements.find(m => m.depenseId === depenseId && m.type === "Entrée" && !m.receptionne);
      if (mouvement) receptionnerMouvement(mouvement.id);
    } catch (e) { console.error("Erreur réception dépense :", e.response?.data || e.message); }
  };

  // ── Budget global (localStorage) ─────────────────────────────────────────
  const modifierBudgetGlobal = (nouveauBudget) => {
    const budget = Number(nouveauBudget);
    if (budget > 0) {
      setBudgetGlobal(budget);
      localStorage.setItem("spat_budget_global", budget.toString());
    }
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ALERTES DE BESOINS (local)
  // ═══════════════════════════════════════════════════════════════════════════
  const creerAlerteBesoin = (departement, service, typeLogementRequis, employesActifs = []) => {
    const nouvelleAlerte = {
      id: `ALERTE-${Date.now()}`,
      departement, service, typeLogementRequis, employesActifs,
      dateDemande: new Date().toLocaleDateString("fr-FR"),
      statut: "En attente",
      priorite: employesActifs.length > 2 ? "haute" : "normale"
    };
    setAlertesBesoins(prev => [...prev, nouvelleAlerte]);
    return nouvelleAlerte;
  };

  const resoudreAlerte = (alerteId, logementId) => {
    if (!alerteId) return;
    setAlertesBesoins(prev => prev.map(a =>
      a.id === alerteId ? { ...a, statut: "Résolue", logementAttribue: logementId, dateResolution: new Date().toLocaleDateString("fr-FR") } : a
    ));
  };

  const supprimerAlerte = (alerteId) => {
    setAlertesBesoins(prev => prev.filter(a => a.id !== alerteId));
  };

  const mettreAJourAlerte = (alerteId, nouveauxEmployes) => {
    setAlertesBesoins(prev => prev.map(a =>
      a.id === alerteId ? { ...a, employesActifs: nouveauxEmployes } : a
    ));
  };

  // ── Stats dashboard ───────────────────────────────────────────────────────
  const stats = {
    logDisponibles:  logements.filter(l => l.statut === "Disponible").length,
    logOccupes:      logements.filter(l => l.statut === "Occupé").length,
    logMaintenance:  logements.filter(l => l.statut === "Maintenance").length,
    logEnReparation: logements.filter(l => l.statut === "EN_REPARATION").length,
    logTotal:        logements.length,
    attEnAttente:    attributions.filter(a => a.statut === "En attente").length,
    empTotal: departements.reduce(
      (s, d) => s + (d.services || []).reduce((ss, srv) => ss + (srv.employes || []).length, 0), 0
    ),
    alertesStock:    materiaux.filter(m => m.stock <= m.seuil).length,
    depEnAttente:    depenses.filter(d => d.statut === "En attente"),
    depTotal:        depenses.filter(d => d.statut === "Validé").reduce((s, d) => s + d.montant, 0),
    alertesEnAttente: alertesBesoins.filter(a => a.statut === "En attente").length,
    alertesResolues:  alertesBesoins.filter(a => a.statut === "Résolue").length,
  };

  // Liste plate départements + services pour les <select>
  const tousLesDepartements = departements.reduce((acc, dep) => {
    acc.push({ id: dep.id, nom: dep.nom, fullName: dep.fullName, type: "departement" });
    (dep.services || []).forEach(srv => {
      acc.push({ id: srv.id, nom: `${dep.nom} — ${srv.name}`, fullName: srv.name, type: "service", depNom: dep.nom });
    });
    return acc;
  }, []);

  return (
    <AppContext.Provider value={{
      // Données
      logements, departements, attributions, materiaux, mouvements, depenses,
      setDepartements, setLogements,
      getCapaciteLogement, getStatutLogementService,

      // Actions logements
      ajouterLogement, modifierLogement, supprimerLogement,
      modifierStatutHistorique, demenagementTemporaire,

      // Maintenance
      besoinsMaintenanceLog, alertesMaintenanceLog, travauxEnCours,
      demarrerMaintenance, commencerReparation, terminerReparation,
      confirmerReemmenagement, effacerAlerteLogement, retournerStock,

      // Actions départements → Django
      ajouterDepartement, modifierDepartement, supprimerDepartement,
      ajouterService, modifierService, supprimerService,
      ajouterEmployeService, supprimerEmployeService, modifierEmploye,
      desactiverEmploye, reactiverEmploye,
      tousLesDepartements,

      // Historique RH
      historiqueRH, ajouterHistorique,

      // Actions attributions → Django
      ajouterAttribution, modifierAttribution, terminerAttribution,
      supprimerAttribution, synchroniserOccupantsAttribution,

      // Actions matériaux → Django
      ajouterMateriau, modifierMateriau, supprimerMateriau,
      ajouterMouvement, receptionnerMouvement, rafraichirMateriaux,

      // Actions dépenses → Django
      ajouterDepense, modifierDepense, supprimerDepense,
      validerDepense, rejeterDepense, receptionnerDepense,

      // Budget
      budgetGlobal, modifierBudgetGlobal,

      // Alertes de besoins
      alertesBesoins, creerAlerteBesoin, resoudreAlerte,
      supprimerAlerte, mettreAJourAlerte,

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