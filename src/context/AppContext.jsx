import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";
import { useAuth } from "./AuthContext";
const ALERTES_BESOONS_INIT = [];

const MATERIAUX_INIT = [];

const MOUVEMENTS_INIT = [];

const DEPENSES_INIT = [];

//context
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [logements, setLogements] = useState([]);

  const [departements, setDepartements] = useState([]);

  const [attributions, setAttributions] = useState([]);



  useEffect(() => {
    // Ne rien charger tant qu'on ne sait pas si l'utilisateur est authentifié,
    // et ne rien charger du tout s'il ne l'est pas (évite les 401 au montage,
    // sur "/", "/login", etc., avant même que PrivateRoute n'intervienne).
    if (authLoading || !user) return;

    Promise.all([
      api.getLogements(),
      api.getAttributions(),
      api.getDepartements(),
      api.getAlertes(),
      api.getHistorique(),
      api.getMateriaux(),
      api.getMouvements(),
      api.getDepenses(),
      api.getBesoins(), // ← AJOUT
    ])
      .then(
        ([
          logementsData,
          attributionsData,
          departementsData,
          alertesData,
          historiqueData,
          materiauxData,
          mouvementsData,
          depensesData,
          besoinsData, 
        ]) => {
          // ── NOUVEAU : rattacher les besoins à chaque logement en maintenance ──
          const besoinsParLogement = {};
          (besoinsData || []).forEach((b) => {
            if (!besoinsParLogement[String(b.logement_ref)]) {
              besoinsParLogement[String(b.logement_ref)] = [];
            }
            besoinsParLogement[String(b.logement_ref)].push({
              nom: b.materiau_nom,
              quantite: b.quantite,
              unite: b.unite,
              statut: b.statut,
            });
          });

          console.log(
            " besoinsParLogement:",
            Object.keys(besoinsParLogement),
          );
          console.log(
            " IDs logements:",
            logementsData.map((l) => `${typeof l.id}:${l.id}`),
          );

          //  NOUVEAU : Reconstruire materiauxSortis depuis les mouvements
          const materiauxSortisParLogement = {};
          (mouvementsData || []).forEach((m) => {
            if (m.type !== "Sortie") return;
            const logRef = String(m.source || m.logement || "");
            if (!logRef) return;
            if (!materiauxSortisParLogement[logRef]) {
              materiauxSortisParLogement[logRef] = [];
            }
            const existant = materiauxSortisParLogement[logRef].find(
              (ms) => ms.nom === (m.materiau_nom || m.materiau),
            );
            if (existant) {
              existant.quantiteSortie += m.quantite;
            } else {
              materiauxSortisParLogement[logRef].push({
                nom: m.materiau_nom || m.materiau,
                quantiteSortie: m.quantite,
                unite: m.unite || "unités",
              });
            }
          });

         
          const logementsAvecBesoins = logementsData.map((l) => ({
            ...l,
            besoinsMaintenance:
              besoinsParLogement[String(l.id)] || l.besoinsMaintenance || [],
            materiauxSortis: materiauxSortisParLogement[String(l.id)] || [], 
          }));
          setLogements(logementsAvecBesoins); 
          setAttributions(attributionsData);
          setAlertesBesoins(alertesData);
          setHistoriqueRH(historiqueData || []);
          setMateriaux(materiauxData || []);
          setMouvements(mouvementsData || []);
          const depensesArray = Array.isArray(depensesData)
            ? depensesData
            : (depensesData?.results ?? []);
          setDepenses(
            depensesArray.map((d) => ({
              ...d,
              id: d.id ?? d.pk ?? d.ID,
              prixUnitaire: d.prix_unitaire ?? d.prixUnitaire ?? 0,
              montant: d.montant ?? (d.prix_unitaire ?? 0) * (d.quantite ?? 1),
            })),
          );
          
          console.log(
            "🔍 depensesData type:",
            Array.isArray(depensesData),
            depensesData,
          );
          // Synchroniser logementAttribue dans les services
          const departementsSync = departementsData.map((dep) => ({
            ...dep,
            services: (dep.services || []).map((service) => {
              const attActive = attributionsData.find(
                (a) =>
                  String(a.service_id) === String(service.id) &&
                  a.statut !== "Terminé" &&
                  a.statut !== "Maintenance" &&
                  a.logement,
              );
              return {
                ...service,
                logementAttribue: attActive ? attActive.logement : null,
                besoinLogementExprime: alertesData.some(
                  (al) =>
                    String(al.service_id) === String(service.id) &&
                    al.statut === "En attente",
                ),
              };
            }),
          }));

          setDepartements(departementsSync);
        },
      )
      .catch(console.error);
  }, [authLoading, user]);

  const [materiaux, setMateriaux] = useState(MATERIAUX_INIT);
  const [mouvements, setMouvements] = useState(MOUVEMENTS_INIT);
  const [depenses, setDepenses] = useState(DEPENSES_INIT);
  const [besoinsMaintenanceLog, setBesoinsMaintenanceLog] = useState({});
  const [alertesMaintenanceLog, setAlertesMaintenance] = useState({});
  const [travauxEnCours, setTravauxEnCours] = useState({});
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("spat_notifications");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [budgetGlobal, setBudgetGlobal] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("spat_budget_global");
      return saved ? Number(saved) : 20000000;
    }
    return 20000000;
  });
  const [alertesBesoins, setAlertesBesoins] = useState(ALERTES_BESOONS_INIT);
  const [historiqueRH, setHistoriqueRH] = useState(() => {
    if (typeof window !== "undefined") {
    }
    return [];
  });

  const ajouterNotification = (notif) => {
    const nouvelle = {
      id: `NOTIF-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      date: new Date().toLocaleDateString("fr-FR"),
      heure: new Date().toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      lue: false,
      ...notif,
    };

    setNotifications((prev) => {
      const updated = [nouvelle, ...prev].slice(0, 100); // max 100 notifications
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_notifications", JSON.stringify(updated));
      }
      return updated;
    });

    return nouvelle;
  };

  const marquerNotificationLue = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, lue: true } : n));
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_notifications", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const marquerToutesNotificationsLues = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, lue: true }));
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_notifications", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const supprimerNotification = (id) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_notifications", JSON.stringify(updated));
      }
      return updated;
    });
  };

  //Helper Historique RH 
  const ajouterHistorique = (action, details = {}) => {
    const now = new Date();
    const date = now.toLocaleDateString("fr-FR");
    const heure = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const entry = {
      id: `HIST-RH-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      action,
      date,
      heure,
      timestamp: now.toISOString(),
      ...details,
    };
   
    api.ajouterHistorique({ action, date, heure, ...details }).catch(() => {});
    // State local
    setHistoriqueRH((prev) => {
      const nouveau = [entry, ...prev].slice(0, 500);
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_historique_rh", JSON.stringify(nouveau));
      }
      return nouveau;
    });
  };

  // Générateur d'ID propres 
  const genId = (prefix, liste, type = null) => {
    const nums = liste.map((i) => parseInt(i.id.split("-")[1])).filter(Boolean);
    const next = nums.length > 0 ? Math.max(...nums) + 1 : 1;
    const baseId = `${prefix}-${String(next).padStart(3, "0")}`;
    return type ? `${baseId}-${type}` : baseId;
  };

  const ajouterLogement = async (data) => {
    try {
      const nouveau = await api.creerLogement(data);
      setLogements((prev) => [...prev, nouveau]);
      return nouveau;
    } catch (err) {
      console.error("Erreur création logement", err);
      throw err;
    }
  };
  const modifierLogement = async (data) => {
    try {
      const maj = await api.modifierLogement(data.id, data);
      setLogements((prev) => prev.map((l) => (l.id === maj.id ? maj : l)));
      return maj;
    } catch (err) {
      console.error("Erreur modification logement", err);
      throw err;
    }
  };

  const supprimerLogement = async (id) => {
    const logement = logements.find((l) => l.id === id);
    if (logement?.statut === "Occupé") {
      alert(
        "❌ Impossible de supprimer un logement occupé. Libérez-le d'abord.",
      );
      return false;
    }
    try {
      await api.supprimerLogement(id);
      setLogements((prev) => prev.filter((l) => l.id !== id));
      return true;
    } catch (err) {
      console.error("Erreur suppression logement", err);
      return false;
    }
  };
  // Modifier le statut depuis l'historique → synchronise le logement
  const modifierStatutHistorique = (logId, historiqueId, nouveauStatut) => {
    setLogements((prev) =>
      prev.map((l) => {
        if (l.id !== logId) return l;
        const ancienStatut = l.statut;
        const now = new Date();
        const historique = (l.historique || []).map((h) =>
          h.id === historiqueId ? { ...h, statut: nouveauStatut } : h,
        );
        if (ancienStatut !== nouveauStatut) {
          historique.push({
            id: `HIST-${Date.now()}`,
            ref: logId,
            statut: nouveauStatut,
            date: now.toLocaleDateString("fr-FR"),
            heure: now.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            commentaire: `Statut modifié depuis l'historique : ${ancienStatut} → ${nouveauStatut}`,
          });
        }
        return { ...l, statut: nouveauStatut, historique };
      }),
    );
  };


  const demarrerMaintenance = async (logId, besoins, logementData = null) => {
    if (!besoins || besoins.length === 0)
      return { success: false, error: "Pas de besoins" };
    const besoinsValides = besoins.filter(
      (b) => b.nom && b.nom.trim() !== "" && b.quantite > 0,
    );
    if (besoinsValides.length === 0)
      return { success: false, error: "Besoins invalides" };

    const logement = logementData || logements.find((l) => l.id === logId);
    if (!logement) return { success: false, error: "Logement non trouvé" };

    //  Synchroniser avec le backend (logement)
    try {
      
      await api.demarrerMaintenance(logId, {
        besoinsMaintenance: besoinsValides,
        motif: "Maintenance programmée",
      });
    } catch (err) {
      console.error(
        "Erreur backend demarrerMaintenance",
        JSON.stringify(err.response?.data),
      );
      return {
        success: false,
        error: err.response?.data?.detail || "Erreur backend",
      };
    }

    //  NOUVEAU : Créer les besoins de maintenance côté stock
    try {
      await api.creerBesoinsParLogement({
        logement_ref: logId,
        logement_type: logement.type,
        logement_localisation: logement.localisation,
        besoins: besoinsValides,
      });
    } catch (err) {
      console.error("Erreur backend creerBesoinsParLogement", err);
    }

    const statutAvantMaintenance =
      logement.statutAvantMaintenance || logement.statut;

    setLogements((prev) =>
      prev.map((l) => {
        if (l.id !== logId) return l;
        const now = new Date();
        return {
          ...l,
          statut: "Maintenance",
          statutAvantMaintenance,
          besoinsMaintenance: besoinsValides,
          historique: [
            ...(l.historique || []),
            {
              id: `HIST-${Date.now()}`,
              ref: logId,
              statut: "Maintenance",
              date: now.toLocaleDateString("fr-FR"),
              heure: now.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              commentaire: `Passage en maintenance — ${besoinsValides.length} matériau(x) requis`,
            },
          ],
        };
      }),
    );

    setAttributions((prev) =>
      prev.map((a) =>
        a.logement === logId && a.statut === "Occupé"
          ? {
              ...a,
              statut: "Maintenance",
              _statutAvant: "Occupé",
              _occupantsAvant: a.occupants,
              occupants: [],
              _serviceId: a.serviceId,
            }
          : a,
      ),
    );
    //  Créer automatiquement une alerte de besoin pour le service délogé
    const attActive = attributions.find(
      (a) => a.logement === logId && a.statut === "Occupé",
    );
    //  AJOUTER — forcer besoinLogementExprime=true pour le service concerné
    if (attActive && attActive.service_id) {
      setDepartements((prev) =>
        prev.map((d) => ({
          ...d,
          services: (d.services || []).map((s) =>
            String(s.id) === String(attActive.service_id)
              ? {
                  ...s,
                  logementAttribue: null, // ← plus de logement
                  besoinLogementExprime: true, // ← alerte réactivée
                }
              : s,
          ),
        })),
      );
    }

    //  NOTIFICATION AVEC DÉTAILS DES MATÉRIAUX
    const detailsMateriaux = besoinsValides
      .map((b) => `• ${b.nom}: ${b.quantite} ${b.unite || "unités"}`)
      .join("\n");

    ajouterNotification({
      type: "maintenance",
      categorie: "logement",
      priorite: "haute",
      titre: "Logement en maintenance",
      message: `${logId} — ${logement.type} — ${logement.localisation}`,
      details: `${besoinsValides.length} matériau(x) requis:\n${detailsMateriaux}`,
      logementId: logId,
      logementType: logement.type,
      logementLocalisation: logement.localisation,
      besoins: besoinsValides,
    });

    const alertes = besoinsValides.map((b) => {
      const mat = materiaux.find(
        (m) => m.nom.toLowerCase() === b.nom.toLowerCase(),
      );
      const unite = b.unite || mat?.unite || "unités";
      let statut, message;
      if (!mat) {
        statut = "achat";
        message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — À acheter`;
      } else if (mat.stock >= b.quantite) {
        statut = "ok";
        message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — Stock suffisant (${mat.stock})`;
      } else {
        statut = "manque";
        message = `${logId} a besoin de ${b.quantite} ${unite} de ${b.nom} — Insuffisant (${mat.stock} dispo)`;
      }
      return {
        nom: b.nom,
        quantite: b.quantite,
        unite,
        logementId: logId,
        logementType: logement.type,
        logementLocalisation: logement.localisation,
        statut,
        message,
        stockDisponible: mat?.stock || 0,
      };
    });

    setBesoinsMaintenanceLog((prev) => ({ ...prev, [logId]: besoinsValides }));
    setAlertesMaintenance((prev) => ({ ...prev, [logId]: alertes }));

    if (attActive && attActive._serviceId) {
      const dep = departements.find((d) =>
        (d.services || []).some((s) => s.id === attActive._serviceId),
      );
      const service = dep?.services?.find((s) => s.id === attActive._serviceId);

      if (dep && service) {
        //  RÉINITIALISER le choix de réemménagement précédent
        setDepartements((prev) =>
          prev.map((d) => ({
            ...d,
            services: d.services.map((s) => {
              if (s.logementAttribue === logId) {
                return {
                  ...s,
                  logementAttribue: null,
                  besoinLogementExprime: true,
                  _choixReemmenagement: null,
                };
              }
              return s;
            }),
          })),
        );

        // Créer l'alerte si pas déjà existante
        const alerteExistante = alertesBesoins.find(
          (a) =>
            a.serviceId === attActive._serviceId && a.statut === "En attente",
        );

        if (!alerteExistante) {
          creerAlerteBesoin(
            dep.nom || dep.name,
            service.name || service.nom,
            logement.type,
            attActive.occupants || [],
            attActive._serviceId,
          );
        }
      }
    }

    return { success: true, alertes };
  };

  const commencerReparation = async (logId, dureeMinutes = 2) => {
    const logement = logements.find((l) => String(l.id) === String(logId));
    if (!logement) return false;

    const besoins = logement.besoinsMaintenance || [];
    const materiauxSortis = logement.materiauxSortis || [];

    const besoinsNonSortis = besoins.filter((b) => {
      const sorti = materiauxSortis.find(
        (ms) => ms.nom.toLowerCase() === b.nom.toLowerCase(),
      );
      return !sorti || sorti.quantiteSortie < b.quantite;
    });

    if (besoinsNonSortis.length > 0) {
      alert(
        `❌ Matériaux manquants : ${besoinsNonSortis.map((b) => b.nom).join(", ")}`,
      );
      return false;
    }

    //  1. Appel backend — passe EN_REPARATION côté serveur
    try {
      await api.commencerReparation(logId, {});
    } catch (err) {
      console.error(
        "Erreur commencerReparation backend",
        JSON.stringify(err.response?.data),
      );
    }

    //  2. Statut local EN_REPARATION immédiatement
    setLogements((prev) =>
      prev.map((l) => (l.id === logId ? { ...l, statut: "EN_REPARATION" } : l)),
    );

    //  3. Timer local
    const maintenant = Date.now();
    setTravauxEnCours((prev) => ({
      ...prev,
      [logId]: {
        debut: maintenant,
        dureeMin: dureeMinutes,
        fin: maintenant + dureeMinutes * 60000,
      },
    }));

    return true;
  };

  const terminerReparation = async (logId) => {
    //  Vider IMMÉDIATEMENT pour bloquer les appels répétés
    setTravauxEnCours((prev) => {
      const n = { ...prev };
      delete n[logId];
      return n;
    });

    try {
      await api.terminerReparation(logId);
    } catch (err) {
      console.warn(
        "terminerReparation backend:",
        JSON.stringify(err.response?.data),
      );
    }

    try {
      await api.effacerBesoinsLogement(logId);
    } catch (err) {
      console.error("Erreur effacerBesoinsLogement", err);
    }

    const logement = logements.find((l) => String(l.id) === String(logId));
    if (!logement) return;

    const attMaintenance = attributions.find(
      (a) => a.logement === logId && a.statut === "Maintenance",
    );

    let serviceAAutreLogement = false;
    let serviceId = null;

    if (attMaintenance && attMaintenance._serviceId) {
      serviceId = attMaintenance._serviceId;
      serviceAAutreLogement = attributions.some(
        (a) =>
          a.serviceId === serviceId &&
          a.logement !== logId &&
          a.statut === "Occupé",
      );
    }

    const nowFin = new Date();

    ajouterNotification({
      type: "success",
      categorie: "logement",
      priorite: "normale",
      titre: "Réparation terminée",
      message: `${logId} — ${logement.type} est de nouveau disponible`,
      details: serviceAAutreLogement
        ? "Le service concerné dispose déjà d'un autre logement"
        : "Les occupants peuvent réemménager",
      logementId: logId,
    });

    const besoins = logement.besoinsMaintenance || [];
    const sortis = logement.materiauxSortis || [];
    for (const ms of sortis) {
      const besoin = besoins.find(
        (b) => b.nom.toLowerCase() === ms.nom.toLowerCase(),
      );
      const surplus = ms.quantiteSortie - (besoin?.quantite || 0);
      if (surplus > 0) {
        await retournerStock(logId, ms.nom, surplus, ms.unite); // ← await fonctionne
      }
    }

    setLogements((prev) =>
      prev.map((l) =>
        String(l.id) === String(logId)
          ? {
              ...l,
              statut: "Disponible",
              _reparationTerminee: true,
              _serviceId: serviceId,
              statutAvantMaintenance: undefined,
              besoinsMaintenance: undefined,
              materiauxSortis: [],
              historique: [
                ...(l.historique || []),
                {
                  id: `HIST-${Date.now()}`,
                  ref: logId,
                  statut: "Disponible",
                  date: nowFin.toLocaleDateString("fr-FR"),
                  heure: nowFin.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  commentaire: `Fin de réparation — Logement disponible`,
                },
              ],
            }
          : l,
      ),
    );

    setAttributions((prev) =>
      prev.map((a) => {
        if (String(a.logement) !== String(logId) || a.statut !== "Maintenance")
          return a;
        return {
          ...a,
          statut: "REPARÉ",
          occupants: [],
          _reparationTerminee: true,
          _serviceAAutreLogement: serviceAAutreLogement,
          date_fin: nowFin.toISOString().split("T")[0],
        };
      }),
    );

    setBesoinsMaintenanceLog((prev) => {
      const n = { ...prev };
      delete n[logId];
      return n;
    });
    setAlertesMaintenance((prev) => {
      const n = { ...prev };
      delete n[logId];
      return n;
    });
    setTravauxEnCours((prev) => {
      const n = { ...prev };
      delete n[logId];
      return n;
    });

    rafraichirMateriaux();
  };

  const confirmerReemmenagement = (logId) => {
    const logement = logements.find((l) => l.id === logId);
    if (!logement) return;

    const attExistante = attributions.find(
      (a) => a.logement === logId && a.statut === "Occupé" && !a._temporaire,
    );

    if (attExistante) {
      alert(
        `❌ Ce logement (${logId}) est déjà attribué au service ${attExistante.departement}.\n\nUn échange de logements doit être négocié entre les deux services et approuvé par la direction.`,
      );
      return false;
    }

    const attMaintenance = attributions.find(
      (a) => a.logement === logId && a.statut === "Maintenance",
    );

    if (attMaintenance && attMaintenance._serviceId) {
      const serviceAAutreLogement = attributions.find(
        (a) =>
          a.serviceId === attMaintenance._serviceId &&
          a.logement !== logId &&
          a.statut === "Occupé",
      );

      if (serviceAAutreLogement) {
        setAttributions((prev) =>
          prev.filter((a) => a.id !== attMaintenance.id),
        );
      }
    }

    terminerReparation(logId);
    return true;
  };

  //  Réemménager un service dans son logement d'origine
  const reemmenerService = (logId, serviceId) => {
    const logement = logements.find((l) => l.id === logId);
    const attMaintenance = attributions.find(
      (a) =>
        a.logement === logId &&
        a.statut === "Disponible" &&
        a._reparationTerminee,
    );

    if (!logement || !attMaintenance) {
      alert("Logement non disponible pour réemménagement");
      return false;
    }

    if (logement.statut !== "Disponible") {
      alert("Ce logement n'est pas disponible");
      return false;
    }

    setAttributions((prev) =>
      prev.map((a) =>
        a.id === attMaintenance.id
          ? {
              ...a,
              statut: "Occupé",
              occupants: a._occupantsAvant || [],
              observations: "Réemménagement effectué",
              _reparationTerminee: false,
            }
          : a,
      ),
    );

    setLogements((prev) =>
      prev.map((l) =>
        l.id === logId
          ? {
              ...l,
              statut: "Occupé",
              _serviceId: serviceId,
            }
          : l,
      ),
    );

    setDepartements((prev) =>
      prev.map((d) => ({
        ...d,
        services: (d.services || []).map((s) =>
          s.id === serviceId
            ? {
                ...s,
                logementAttribue: logId,
                besoinLogementExprime: false,
              }
            : s,
        ),
      })),
    );

    ajouterHistorique("reemménagement", {
      logementId: logId,
      serviceId: serviceId,
      departement: attMaintenance.departement,
      occupants: attMaintenance._occupantsAvant || [],
    });

    ajouterNotification({
      type: "success",
      categorie: "logement",
      priorite: "normale",
      titre: "Réemménagement effectué",
      message: `${attMaintenance.departement} réinstallé dans ${logId}`,
      logementId: logId,
    });

    return true;
  };

  //  Échanger deux logements entre services
  const echangerLogements = (logId1, serviceId1, logId2, serviceId2) => {
    const att1 = attributions.find(
      (a) => a.logement === logId1 && a.statut === "Disponible",
    );
    const att2 = attributions.find(
      (a) => a.logement === logId2 && a.statut === "Occupé",
    );

    if (!att1 || !att2) {
      alert("Échange impossible — vérifiez les logements");
      return false;
    }

    setAttributions((prev) =>
      prev.map((a) => {
        if (a.id === att1.id) {
          return {
            ...a,
            statut: "Occupé",
            occupants: att2.occupants,
            _serviceId: serviceId2,
            departement: att2.departement,
            observations: `Échange avec ${logId2}`,
          };
        }
        if (a.id === att2.id) {
          return {
            ...a,
            statut: "Occupé",
            occupants: att1._occupantsAvant || [],
            _serviceId: serviceId1,
            departement: att1.departement,
            observations: `Échange avec ${logId1}`,
          };
        }
        return a;
      }),
    );

    setDepartements((prev) =>
      prev.map((d) => ({
        ...d,
        services: (d.services || []).map((s) => {
          if (s.id === serviceId1) {
            return { ...s, logementAttribue: logId2 };
          }
          if (s.id === serviceId2) {
            return { ...s, logementAttribue: logId1 };
          }
          return s;
        }),
      })),
    );

    ajouterHistorique("échange_logements", {
      logement1: logId1,
      service1: serviceId1,
      logement2: logId2,
      service2: serviceId2,
    });

    ajouterNotification({
      type: "success",
      categorie: "logement",
      priorite: "normale",
      titre: "Échange de logements effectué",
      message: `${logId1} ↔ ${logId2}`,
    });

    return true;
  };

  // Retourner le surplus au stock
  const retournerStock = async (
    logId,
    materiauNom,
    quantiteRetour,
    unite = "unités",
  ) => {
    if (!quantiteRetour || quantiteRetour <= 0) return;

    
    try {
      const mvtData = await api.creerMouvement({
        materiau_nom: materiauNom,
        materiau: materiaux.find(
          (m) => m.nom.toLowerCase() === materiauNom.toLowerCase(),
        )?.id, // ← FK manquante
        type: "Entrée",
        quantite: quantiteRetour,
        unite,
        source: `Retour surplus — ${logId}`,
        logement_ref: String(logId),
      });
      console.log(" mvt créé:", mvtData);

      // ← récupère l'id peu importe le format de réponse
      const mvtId = mvtData?.id ?? mvtData?.pk ?? mvtData?.data?.id;
      console.log(" mvtId:", mvtId);

      if (!mvtId) {
        console.error("❌ creerMouvement n'a pas retourné d'id:", mvtData);
        return;
      }

      // 2. Réceptionne via l'endpoint → incrémente le stock en base
      await api.receptionnerMouvement(mvtId);
      console.log("✅ receptionnerMouvement appelé avec id:", mvtId);

      const [materiauxData, mouvementsData] = await Promise.all([
        api.getMateriaux(`?t=${Date.now()}`),
        api.getMouvements(`?t=${Date.now()}`),
      ]);
      console.log(
        "🔍 materiauxData après retour:",
        materiauxData.map((m) => `${m.nom}:${m.stock}`),
      );
      setMateriaux(materiauxData || []);
      setMouvements(mouvementsData || []);
    } catch (err) {
      console.error("Erreur retour stock:", err.response?.data || err);
    }

    // 4. Met à jour le logement localement
    setLogements((prev) =>
      prev.map((l) =>
        String(l.id) === String(logId)
          ? {
              ...l,
              materiauxSortis: l.materiauxSortis
                ?.map((ms) =>
                  ms.nom.toLowerCase() === materiauNom.toLowerCase()
                    ? {
                        ...ms,
                        quantiteSortie: Math.max(
                          0,
                          ms.quantiteSortie - quantiteRetour,
                        ),
                        retourne: true,
                      }
                    : ms,
                )
                .filter((ms) => ms.quantiteSortie > 0),
            }
          : l,
      ),
    );
  };

  const effacerAlerteLogement = (
    logId,
    materiauNomSorti = null,
    quantiteSortie = null,
  ) => {
    setAlertesMaintenance((prev) => {
      const alertesLog = prev[logId];
      if (!alertesLog) return prev;

      if (!materiauNomSorti) {
        const n = { ...prev };
        delete n[logId];
        return n;
      }

      const alertesRestantes = alertesLog.filter(
        (a) => a.nom.toLowerCase() !== materiauNomSorti.toLowerCase(),
      );

      if (alertesRestantes.length === 0) {
        const n = { ...prev };
        delete n[logId];
        return n;
      }

      return { ...prev, [logId]: alertesRestantes };
    });

    setBesoinsMaintenanceLog((prev) => {
      const besoins = prev[logId];
      if (!besoins) return prev;

      const besoinsRestants = besoins.filter(
        (b) => b.nom.toLowerCase() !== materiauNomSorti.toLowerCase(),
      );

      if (besoinsRestants.length === 0) {
        const n = { ...prev };
        delete n[logId];
        return n;
      }

      return { ...prev, [logId]: besoinsRestants };
    });
  };


  const ajouterMouvement = async (mvt) => {
    //  Sortie : appel API + mise à jour locale 
    if (mvt.type === "Sortie") {
      const materiauSelected = materiaux.find((m) => m.nom === mvt.materiau);
      if (!materiauSelected) {
        console.error("Matériau introuvable :", mvt.materiau);
        return;
      }

      try {
        const mouvementCree = await api.sortieStock(materiauSelected.id, {
          quantite: mvt.quantite,
          logement_ref: mvt.source || "",
        });

        // Mettre à jour le stock local immédiatement
        setMateriaux((prev) =>
          prev.map((m) =>
            m.id === materiauSelected.id
              ? { ...m, stock: Math.max(0, m.stock - mvt.quantite) }
              : m,
          ),
        );

        // Ajouter le mouvement à la liste locale
        setMouvements((prev) => [
          {
            id: mouvementCree.id || genId("MOV", prev),
            materiau: mvt.materiau,
            materiau_nom: mvt.materiau,
            type: "Sortie",
            quantite: mvt.quantite,
            unite: mvt.unite || materiauSelected.unite || "unités",
            date: new Date().toLocaleDateString("fr-FR"),
            source: mvt.source || "",
            logement: mvt.source || "",
            receptionne: true,
          },
          ...prev,
        ]);
      } catch (err) {
        console.error("Erreur sortieStock", err);
        return;
      }

      // Mettre à jour materiauxSortis du logement 
      if (mvt.source) {
        const logId = mvt.source;
        setLogements((prev) =>
          prev.map((l) => {
            if (String(l.id) !== String(logId)) return l;
            if (l.statut !== "Maintenance" && l.statut !== "EN_REPARATION")
              return l;

            const materiauxSortis = l.materiauxSortis || [];
            const existant = materiauxSortis.find(
              (ms) => ms.nom === mvt.materiau,
            );
            const nouveaux = existant
              ? materiauxSortis.map((ms) =>
                  ms.nom === mvt.materiau
                    ? {
                        ...ms,
                        quantiteSortie: ms.quantiteSortie + mvt.quantite,
                      }
                    : ms,
                )
              : [
                  ...materiauxSortis,
                  {
                    nom: mvt.materiau,
                    quantiteSortie: mvt.quantite,
                    unite: mvt.unite || "unités",
                  },
                ];

            const besoins = l.besoinsMaintenance || [];
            const tousSortis = besoins.every((b) => {
              const sorti = nouveaux.find((ms) => ms.nom === b.nom);
              return sorti && sorti.quantiteSortie >= b.quantite;
            });
            if (tousSortis && l.statut === "Maintenance") {
              ajouterNotification({
                type: "reparation",
                categorie: "logement",
                priorite: "normale",
                titre: "Logement prêt à réparer",
                message: `${logId} — Tous les matériaux sont disponibles`,
                details: "Vous pouvez commencer la réparation",
                logementId: logId,
              });

              // Appel backend automatique 
              api.commencerReparation(Number(logId), {}).catch((err) => {
                console.error(
                  "Erreur auto commencerReparation",
                  JSON.stringify(err.response?.data),
                );
              });
            }

            return {
              ...l,
              statut: tousSortis ? "EN_REPARATION" : l.statut,
              materiauxSortis: nouveaux,
            };
          }),
        );
      }
      return;
    }

    //  Entrée manuelle 
    const newId = genId("MOV", mouvements);
    const mov = {
      ...mvt,
      id: newId,
      receptionne: false,
      depenseId: mvt.depenseId || null,
    };
    setMouvements((prev) => [mov, ...prev]);
  };

  //Actions Départements 
  const ajouterDepartement = async (d) => {
    try {
      const nouveau = await api.creerDepartement(d);
      setDepartements((prev) => [...prev, { ...nouveau, services: [] }]);
      ajouterHistorique("ajout_departement", {
        departement: nouveau.nom,
        departementId: nouveau.id,
        departementCode: nouveau.code,
        fullName: nouveau.full_name,
      });
    } catch (err) {
      console.error("Erreur création département", err.response?.data);
    }
  };

  const modifierDepartement = async (d) => {
    try {
      const maj = await api.modifierDepartement(d.id, d);
      setDepartements((prev) =>
        prev.map((x) =>
          x.id === maj.id ? { ...maj, services: x.services } : x,
        ),
      );
    } catch (err) {
      console.error("Erreur modification département", err.response?.data);
    }
  };
  const supprimerDepartement = async (id) => {
    const dep = departements.find((d) => d.id === id);
    try {
      await api.supprimerDepartement(id);
      setDepartements((prev) => prev.filter((x) => x.id !== id));
      if (dep) {
        ajouterHistorique("suppression_departement", {
          departement: dep.nom,
          departementId: dep.id,
          departementCode: dep.code,
          nbServices: (dep.services || []).length,
        });
      }
    } catch (err) {
      console.error("Erreur suppression département", err.response?.data);
    }
  };

  const ajouterService = async (depId, service) => {
    try {
      console.log(
        " Service envoyé:",
        JSON.stringify({ ...service, departement: depId }, null, 2),
      );
      const nouveau = await api.creerService({
        ...service,
        departement: depId,
      });
      setDepartements((prev) =>
        prev.map((d) =>
          d.id !== depId
            ? d
            : {
                ...d,
                services: [...(d.services || []), { ...nouveau, employes: [] }],
              },
        ),
      );
      const dep = departements.find((d) => d.id === depId);
      ajouterHistorique("ajout_service", {
        service: nouveau.name,
        serviceId: nouveau.id,
        chef: nouveau.chef || "À définir",
        departement: dep?.nom,
        departementId: depId,
        departementCode: dep?.code,
      });
    } catch (err) {
      console.error("Erreur création service", err.response?.data);
    }
  };

  const modifierService = async (depId, service) => {
    try {
      const maj = await api.modifierService(service.id, service);
      setDepartements((prev) =>
        prev.map((d) =>
          d.id !== depId
            ? d
            : {
                ...d,
                services: d.services.map((s) =>
                  s.id === maj.id ? { ...maj, employes: s.employes } : s,
                ),
              },
        ),
      );
    } catch (err) {
      console.error("Erreur modification service", err.response?.data);
    }
  };

  const supprimerService = async (depId, serviceId) => {
    const dep = departements.find((d) => d.id === depId);
    const srv = dep?.services.find((s) => s.id === serviceId);
    try {
      await api.supprimerService(serviceId);
      setDepartements((prev) =>
        prev.map((d) =>
          d.id !== depId
            ? d
            : {
                ...d,
                services: d.services.filter((s) => s.id !== serviceId),
              },
        ),
      );
      if (srv) {
        ajouterHistorique("suppression_service", {
          service: srv.name,
          serviceId,
          chef: srv.chef,
          departement: dep?.nom,
          departementId: depId,
          departementCode: dep?.code,
          nbEmployes: (srv.employes || []).length,
        });
      }
    } catch (err) {
      console.error("Erreur suppression service", err.response?.data);
    }
  };

  const ajouterEmployeService = async (depId, serviceId, emp) => {
    const dep = departements.find((d) => d.id === depId);
    if (!dep) return { success: false, error: "Département introuvable" };
    const service = dep.services.find((s) => s.id === serviceId);
    if (!service) return { success: false, error: "Service introuvable" };

    const attLiee = attributions.find(
      (a) =>
        String(a.service_id) === String(serviceId) &&
        a.statut !== "Terminé" &&
        a.statut !== "Maintenance",
    );

    try {
      const nouvelEmp = await api.creerEmploye({ ...emp, service: serviceId });
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
                        employes: [...(s.employes || []), nouvelEmp],
                      },
                ),
              },
        ),
      );

      if (attLiee) {
        const nomComplet = `${emp.prenom} ${emp.nom}`;
        const nouveauxOccupants = [...(attLiee.occupants || []), nomComplet];
        setAttributions((prev) =>
          prev.map((a) =>
            a.id === attLiee.id
              ? { ...a, occupants: nouveauxOccupants, statut: "Occupé" }
              : a,
          ),
        );
        setLogements((prev) =>
          prev.map((l) =>
            l.id === attLiee.logement ? { ...l, statut: "Occupé" } : l,
          ),
        );
      }

      ajouterHistorique("ajout_employe", {
        employe: `${nouvelEmp.prenom} ${nouvelEmp.nom}`,
        employeId: nouvelEmp.id,
        matricule: nouvelEmp.matricule,
        categorie: nouvelEmp.categorie,
        departement: dep.nom,
        departementCode: dep.code,
        service: service?.name,
        serviceId: service?.id,
        logementId: attLiee?.logement || null,
      });

      return { success: true, employe: nouvelEmp };
    } catch (err) {
      console.error("Erreur création employé", err.response?.data);
      return { success: false, error: err.response?.data };
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
                      employes: (s.employes || []).filter(
                        (e) => e.id !== empId,
                      ),
                    },
              ),
            },
      ),
    );
  };

  const modifierEmploye = async (depId, serviceId, emp) => {
    try {
      const maj = await api.modifierEmploye(emp.id, emp);
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
                        employes: (s.employes || []).map((e) =>
                          e.id === maj.id ? maj : e,
                        ),
                      },
                ),
              },
        ),
      );
    } catch (err) {
      console.error("Erreur modification employé", err.response?.data);
    }
  };

  const desactiverEmploye = async (
    depId,
    serviceId,
    empId,
    motifLabel,
    motifType,
  ) => {
    try {
      const id = typeof empId === "object" ? empId?.id : empId;
      const maj = await api.desactiverEmploye(id, motifLabel, motifType);
      setDepartements((prev) =>
        prev.map((d) =>
          String(d.id) !== String(depId)
            ? d
            : {
                ...d,
                services: d.services.map((s) =>
                  String(s.id) !== String(serviceId)
                    ? s
                    : {
                        ...s,
                        employes: (s.employes || []).map((e) =>
                          String(e.id) === String(maj.id) ? maj : e,
                        ),
                      },
                ),
              },
        ),
      );
    } catch (err) {
      console.error("Erreur désactivation employé", err.response?.data);
    }
  };

  const reactiverEmploye = async (depId, serviceId, empId) => {
    try {
      const maj = await api.reactiverEmploye(empId);
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
                        employes: (s.employes || []).map((e) =>
                          e.id === maj.id ? maj : e,
                        ),
                      },
                ),
              },
        ),
      );
    } catch (err) {
      console.error("Erreur réactivation employé", err.response?.data);
    }
  };

  const ajouterAttribution = async (a) => {
    try {
      let occupants = a.occupants || [];
      const serviceId = a.service_id || a.serviceId || a._serviceId;

      if (occupants.length === 0 && serviceId) {
        for (const d of departements) {
          const srv = (d.services || []).find((s) => s.id === serviceId);
          if (srv) {
            occupants = (srv.employes || [])
              .filter((e) => !e.desactive)
              .map((e) => `${e.prenom} ${e.nom}`.trim())
              .filter(Boolean);
            break;
          }
        }
      }

      const dataClean = {
        ...a,
        logement: a.logement ? parseInt(a.logement) : null,
        date_fin:
          a.date_fin && a.date_fin !== "—" && a.date_fin !== ""
            ? a.date_fin
            : null,
        date_debut:
          a.date_debut && a.date_debut !== "—" && a.date_debut !== ""
            ? a.date_debut
            : null,
        occupants,
        service_id: serviceId ? parseInt(serviceId) : null,
        statut: occupants.length > 0 ? "Occupé" : "Disponible",
        alerte_id: a._alerteId ? String(a._alerteId) : null,
        _serviceId: undefined,
        _alerteId: undefined,
        _verrouille: undefined,
        _temporaire: undefined,
      };
      console.log("📤 DATA CLEAN:", JSON.stringify(dataClean, null, 2));
      const nouveau = await api.creerAttribution(dataClean);
      setAttributions((prev) => [...prev, nouveau]);

      
      if (dataClean.alerte_id) {
        try {
          await api.resoudreAlerte(dataClean.alerte_id, dataClean.logement);
          setAlertesBesoins((prev) =>
            prev.map((a) =>
              String(a.id) === String(dataClean.alerte_id)
                ? { ...a, statut: "Résolue" }
                : a,
            ),
          );
        } catch (err) {
          console.error("Erreur résolution alerte", err);
        }
      }

      if (dataClean.logement && occupants.length > 0) {
        setLogements((prev) =>
          prev.map((l) =>
            l.id === dataClean.logement ? { ...l, statut: "Occupé" } : l,
          ),
        );
      }

      if (serviceId) {
        setDepartements((prev) =>
          prev.map((d) => ({
            ...d,
            services: (d.services || []).map((s) =>
              s.id === serviceId
                ? {
                    ...s,
                    logementAttribue: dataClean.logement,
                    besoinLogementExprime: false,
                  }
                : s,
            ),
          })),
        );
      }

      return nouveau;
    } catch (err) {
      console.error("Erreur création attribution", err);
      console.error("Réponse backend:", err.response?.data);
    }
  };

  const modifierAttribution = async (a) => {
    try {
      const maj = await api.modifierAttribution(a.id, a);
      setAttributions((prev) => prev.map((x) => (x.id === maj.id ? maj : x)));
    } catch (err) {
      console.error("Erreur création attribution", err);
      console.error("Status:", err.response?.status);
    }
  };

  const synchroniserOccupantsAttribution = async (
    serviceId,
    nouveauxOccupants,
  ) => {
    const attLiee = attributions.find(
      (a) =>
        a.statut !== "Terminé" &&
        a.statut !== "Maintenance" &&
        String(a.service_id) === String(serviceId),
    );
    if (!attLiee) return false;

    try {
      const maj = await api.modifierOccupantsAttribution(
        attLiee.id,
        nouveauxOccupants,
      );
      setAttributions((prev) => prev.map((a) => (a.id === maj.id ? maj : a)));
      if (attLiee.logement) {
        setLogements((prev) =>
          prev.map((l) =>
            l.id === attLiee.logement
              ? {
                  ...l,
                  statut:
                    nouveauxOccupants.length > 0 ? "Occupé" : "Disponible",
                }
              : l,
          ),
        );
      }
      return true;
    } catch (err) {
      console.error("Erreur sync occupants", err);
      return false;
    }
  };

  const terminerAttribution = async (id) => {
    try {
      const maj = await api.terminerAttribution(id);
      setAttributions((prev) => prev.map((x) => (x.id === maj.id ? maj : x)));

      if (maj.logement) {
        setLogements((prev) =>
          prev.map((l) =>
            l.id === maj.logement ? { ...l, statut: "Disponible" } : l,
          ),
        );
      }

      setDepartements((prev) =>
        prev.map((d) => ({
          ...d,
          services: (d.services || []).map((s) =>
            s.logementAttribue === maj.logement
              ? { ...s, logementAttribue: null, besoinLogementExprime: false }
              : s,
          ),
        })),
      );
    } catch (err) {
      console.error("Erreur terminer attribution", err);
    }
  };

  const supprimerAttribution = async (id) => {
    const att = attributions.find((a) => a.id === id);
    if (att?.verrouille) {
      alert("Cette attribution est verrouillée. Terminez-la d'abord.");
      return;
    }
    try {
      await api.supprimerAttribution(id);
      setAttributions((prev) => prev.filter((a) => a.id !== id));

      if (att?.logement) {
        setLogements((prev) =>
          prev.map((l) =>
            l.id === att.logement ? { ...l, statut: "Disponible" } : l,
          ),
        );
      }
    } catch (err) {
      console.error("Erreur suppression attribution", err);
    }
  };

  // Actions Matériaux 
  const ajouterMateriau = (m) =>
    setMateriaux((prev) => [...prev, { ...m, id: genId("MAT", prev) }]);
  const modifierMateriau = (m) =>
    setMateriaux((prev) => prev.map((x) => (x.id === m.id ? m : x)));
  const supprimerMateriau = (id) =>
    setMateriaux((prev) => prev.filter((x) => x.id !== id));

  const rafraichirMateriaux = async () => {
    try {
      
      const data = await api.getMateriaux(`?t=${Date.now()}`);
      setMateriaux(
        (data || []).map((m) => ({
          id: m.id,
          nom: m.nom,
          categorie: m.categorie,
          stock: m.stock,
          seuil: m.seuil,
          unite: m.unite,
          prix: m.prix,
        })),
      );
    } catch (e) {
      console.error("Impossible de rafraîchir les matériaux", e);
    }
  };

  const receptionnerMouvement = (mouvementId) => {
    const mouvement = mouvements.find((m) => m.id === mouvementId);
    if (!mouvement || mouvement.type !== "Entrée" || mouvement.receptionne)
      return;

    setMouvements((prev) =>
      prev.map((m) => (m.id === mouvementId ? { ...m, receptionne: true } : m)),
    );

    setMateriaux((prev) => {
      const materiauExistant = prev.find(
        (m) => m.nom.toLowerCase() === mouvement.materiau.toLowerCase(),
      );

      if (materiauExistant) {
        return prev.map((m) =>
          m.id === materiauExistant.id
            ? { ...m, stock: m.stock + mouvement.quantite }
            : m,
        );
      } else {
        const nouveauMateriau = {
          id: genId("MAT", prev),
          nom: mouvement.materiau,
          categorie: "Autre",
          stock: mouvement.quantite,
          seuil: 10,
          unite: mouvement.unite || "unités",
          prix: mouvement.prixUnitaire || mouvement.prix || 1000,
        };
        return [...prev, nouveauMateriau];
      }
    });

    if (mouvement.depenseId) {
      setDepenses((prev) =>
        prev.map((d) =>
          d.id === mouvement.depenseId
            ? {
                ...d,
                receptionne: true,
                historique: [
                  ...(d.historique || []),
                  {
                    action: "Réception",
                    date: new Date().toLocaleString("fr-FR"),
                    utilisateur: "Système",
                  },
                ],
              }
            : d,
        ),
      );
    }
  };

  //  Actions Dépenses

  const ajouterDepense = async (d) => {
    try {
      // Convertir DD/MM/YYYY → YYYY-MM-DD
      const formatDate = (dateStr) => {
        if (!dateStr) return new Date().toISOString().split("T")[0];
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr; // déjà bon
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
      };

      const nouvelleDepense = await api.creerDepense({
        description: d.description,
        quantite: d.quantite || 1,
        prix_unitaire: d.prixUnitaire || 0,
        categorie: d.categorie || "Matériaux",
        fournisseur: d.fournisseur || "TRANO MORA",
        unite: d.unite || "unités",
        date: formatDate(d.date), // ← CORRIGÉ
        statut: "En attente",
        logement_ref: d.logement || d.logement_ref || "",
      });

      const depenseNormalisee = {
        ...nouvelleDepense,
        id: nouvelleDepense.id ?? nouvelleDepense.pk ?? nouvelleDepense.ID,
        prixUnitaire:
          nouvelleDepense.prix_unitaire ?? nouvelleDepense.prixUnitaire,
        montant:
          nouvelleDepense.montant ??
          nouvelleDepense.prix_unitaire * (nouvelleDepense.quantite || 1),
      };

      const depensesData = await api.getDepenses();
      const depensesArray = Array.isArray(depensesData)
        ? depensesData
        : (depensesData?.results ?? []);
      setDepenses(
        depensesArray.map((d) => ({
          ...d,
          id: d.id ?? d.pk,
          prixUnitaire: d.prix_unitaire ?? 0,
          montant: d.montant ?? 0,
        })),
      );
      return depenseNormalisee;
    } catch (err) {
      console.error("Erreur création dépense", err);
      console.error("Détail backend:", err.response?.data); // ← pour déboguer
      throw err;
    }
  };

  const modifierDepense = async (d) => {
    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return new Date().toISOString().split("T")[0];
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr; // déjà bon
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month}-${day}`;
      };
      const maj = await api.modifierDepense(d.id, {
        description: d.description,
        quantite: d.quantite || 1,
        prix_unitaire: d.prixUnitaire || 0,
        categorie: d.categorie,
        fournisseur: d.fournisseur,
        unite: d.unite || "unités",
        date: formatDate(d.date),
        statut: d.statut,
        logement_ref: d.logement || d.logement_ref || "",
      });
      setDepenses((prev) => prev.map((x) => (x.id === maj.id ? maj : x)));
    } catch (err) {
      console.error("Erreur modification dépense", err);
    }
  };


  const supprimerDepense = async (id) => {
    try {
      await api.supprimerDepense(id);
      setDepenses((prev) => prev.filter((x) => x.id !== id));
    } catch (err) {
      console.error("Erreur suppression dépense", err);
    }
  };


  const validerDepense = async (id) => {
    // Vérification de sécurité
    if (id === undefined || id === null || id === "undefined") {
      console.error("validerDepense : ID invalide →", id);
      return;
    }
    try {
      const maj = await api.validerDepense(id);
      setDepenses((prev) => prev.map((d) => (d.id === maj.id ? maj : d)));
      const mouvementsData = await api.getMouvements();
      setMouvements(mouvementsData || []);
    } catch (err) {
      console.error("Erreur validation dépense", err);
      console.error("ID utilisé :", id);
      console.error("Détail backend:", err.response?.data);
    }
  };


  const rejeterDepense = async (id) => {
    try {
      const maj = await api.rejeterDepense(id);
      setDepenses((prev) => prev.map((d) => (d.id === maj.id ? maj : d)));
    } catch (err) {
      console.error("Erreur rejet dépense", err);
    }
  };


  const receptionnerDepense = async (depenseId) => {
    try {
      const maj = await api.receptionnerDepense(depenseId);
      // Mettre à jour la dépense locale
      setDepenses((prev) => prev.map((d) => (d.id === maj.id ? maj : d)));
      // Rafraîchir le stock (besoins passent de "achat"/"manque" à "ok")
      await rafraichirMateriaux();
      // Rafraîchir les mouvements
      const mouvementsData = await api.getMouvements();
      setMouvements(mouvementsData || []);
    } catch (err) {
      console.error("Erreur réception dépense", err);
    }
  };

  const modifierBudgetGlobal = (nouveauBudget) => {
    const budget = Number(nouveauBudget);
    if (budget > 0) {
      setBudgetGlobal(budget);
      if (typeof window !== "undefined") {
        localStorage.setItem("spat_budget_global", budget.toString());
      }
    }
  };

  //Actions Alertes de Besoins 
  const creerAlerteBesoin = async (
    departement,
    service,
    typeLogementRequis,
    employesActifs = [],
    serviceId = null,
  ) => {
    try {
      const nouvelle = await api.creerAlerte({
        departement,
        service,
        typeLogementRequis,
        employesActifs,
        _serviceId: serviceId,
      });
      setAlertesBesoins((prev) => [...prev, nouvelle]);
      return nouvelle;
    } catch (err) {
      console.error("Erreur création alerte", err);
      throw err;
    }
  };
  const resoudreAlerte = async (alerteId, logementId) => {
    try {
      const maj = await api.resoudreAlerte(alerteId, logementId);
      setAlertesBesoins((prev) =>
        prev.map((a) => (a.id === alerteId ? maj : a)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const supprimerAlerte = async (alerteId) => {
    try {
      await api.supprimerAlerte(alerteId);
      setAlertesBesoins((prev) => prev.filter((a) => a.id !== alerteId));
    } catch (err) {
      console.error(err);
    }
  };

  const mettreAJourAlerte = async (alerteId, nouveauxEmployes) => {
    try {
      const maj = await api.mettreAJourEmployesAlerte(
        alerteId,
        nouveauxEmployes,
      );
      setAlertesBesoins((prev) =>
        prev.map((a) => (a.id === alerteId ? maj : a)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Stats pour le dashboard 
  const stats = {
    logDisponibles: logements.filter((l) => l.statut === "Disponible").length,
    logOccupes: logements.filter((l) => l.statut === "Occupé").length,
    logMaintenance: logements.filter((l) => l.statut === "Maintenance").length,
    logEnReparation: logements.filter((l) => l.statut === "EN_REPARATION")
      .length,

    logTotal: logements.length,
    attEnAttente: attributions.filter((a) => a.statut === "En attente").length,
    empTotal: departements.reduce(
      (s, d) =>
        s +
        (d.services || []).reduce(
          (ss, srv) => ss + (srv.employes || []).length,
          0,
        ),
      0,
    ),
    alertesStock: materiaux.filter((m) => m.stock <= m.seuil).length,
    depEnAttente: depenses.filter((d) => d.statut === "En attente"),
    depTotal: depenses
      .filter((d) => d.statut === "Validé")
      .reduce((s, d) => s + d.montant, 0),
    alertesEnAttente: alertesBesoins.filter((a) => a.statut === "En attente")
      .length,
    alertesResolues: alertesBesoins.filter((a) => a.statut === "Résolue")
      .length,
  };


  const tousLesDepartements = departements.reduce((acc, dep) => {
    acc.push({
      id: dep.id,
      nom: dep.nom,
      fullName: dep.fullName,
      type: "departement",
    });
    (dep.services || []).forEach((srv) => {
      acc.push({
        id: srv.id,
        nom: `${dep.nom} — ${srv.name}`,
        fullName: srv.name,
        type: "service",
        depNom: dep.nom,
      });
    });
    return acc;
  }, []);


  const choisirReemménagement = async (
    logementOrigineId,
    logementTemporaireId,
    serviceId,
    choix,
  ) => {
    const now = new Date();
    const nowStr = now.toLocaleDateString("fr-FR");
    const heureStr = now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const attMaintenance = attributions.find(
      (a) =>
        String(a.logement) === String(logementOrigineId) &&
        (a.statut === "REPARÉ" || a.statut === "Maintenance") &&
        String(a.service_id || a.serviceId) === String(serviceId),
    );

    const attTemporaire = attributions.find(
      (a) =>
        String(a.logement) === String(logementTemporaireId) &&
        String(a.service_id || a.serviceId) === String(serviceId) &&
        a.statut === "Occupé",
    );

    const occupantsADeplacer =
      attTemporaire?.occupants?.length > 0
        ? [...attTemporaire.occupants]
        : attMaintenance?._occupantsAvant || attMaintenance?.occupants || [];

    if (choix === "reemmener") {
      
      try {
        // Log1 reprend les occupants
        if (attMaintenance?.id) {
          await api.modifierOccupantsAttribution(
            attMaintenance.id,
            occupantsADeplacer,
          );
        }
        // Log2 libéré
        if (attTemporaire?.id) {
          await api.modifierOccupantsAttribution(attTemporaire.id, []);
          await api.terminerAttribution(attTemporaire.id);
        }
      } catch (err) {
        console.error("Erreur sync reemménagement backend", err);
      }

      
      setAttributions((prev) =>
        prev
          .map((a) => {
            if (
              String(a.logement) === String(logementOrigineId) &&
              String(a.service_id || a.serviceId) === String(serviceId)
            ) {
              return {
                ...a,
                statut: "Occupé",
                occupants: occupantsADeplacer,
                _reparationTerminee: false,
              };
            }
            return a;
          })
          .filter(
            (a) =>
              !(
                String(a.logement) === String(logementTemporaireId) &&
                String(a.service_id || a.serviceId) === String(serviceId) &&
                a.statut === "Occupé"
              ),
          ),
      );

      setLogements((prev) =>
        prev.map((l) => {
          if (String(l.id) === String(logementOrigineId))
            return { ...l, statut: "Occupé", _reparationTerminee: false };
          if (String(l.id) === String(logementTemporaireId))
            return { ...l, statut: "Disponible" };
          return l;
        }),
      );

      setDepartements((prev) =>
        prev.map((d) => ({
          ...d,
          services: d.services.map((s) =>
            String(s.id) === String(serviceId)
              ? {
                  ...s,
                  logementAttribue: logementOrigineId,
                  besoinLogementExprime: false,
                }
              : s,
          ),
        })),
      );
    } else if (choix === "rester") {
      
      try {
        // Log2 devient définitif avec ses occupants
        if (attTemporaire?.id) {
          await api.modifierOccupantsAttribution(
            attTemporaire.id,
            occupantsADeplacer,
          );
        }
      
        if (attMaintenance?.id) {
          await api.modifierOccupantsAttribution(attMaintenance.id, []);
          await api.terminerAttribution(attMaintenance.id);
        }
      } catch (err) {
        console.error("Erreur sync rester backend", err);
      }

     
      setAttributions((prev) =>
        prev
          .map((a) => {
            if (
              String(a.logement) === String(logementTemporaireId) &&
              String(a.service_id || a.serviceId) === String(serviceId)
            ) {
              return {
                ...a,
                _temporaire: false,
                statut: "Occupé",
                occupants: occupantsADeplacer,
              };
            }
            return a;
          })
          .filter(
            (a) =>
              !(
                String(a.logement) === String(logementOrigineId) &&
                String(a.service_id || a.serviceId) === String(serviceId)
              ),
          ),
      );

      setLogements((prev) =>
        prev.map((l) => {
          if (String(l.id) === String(logementOrigineId))
            return { ...l, statut: "Disponible" };
          if (String(l.id) === String(logementTemporaireId))
            return { ...l, statut: "Occupé" };
          return l;
        }),
      );

      setDepartements((prev) =>
        prev.map((d) => ({
          ...d,
          services: d.services.map((s) =>
            String(s.id) === String(serviceId)
              ? {
                  ...s,
                  logementAttribue: logementTemporaireId,
                  besoinLogementExprime: false,
                }
              : s,
          ),
        })),
      );
    }

    ajouterHistorique("reemménagement", {
      serviceId,
      choix,
      logementOrigine: logementOrigineId,
      logementTemporaire: logementTemporaireId,
      date: nowStr,
      heure: heureStr,
    });
  };
  //Helpers logement 
  const getCapaciteLogement = (typeLogement) => {
    const capacites = { Studio: 3, F2: 6, F3: 10, F4: 15 };
    return capacites[typeLogement] || 2;
  };

  const getStatutLogementService = (depNomOuCode, serviceId) => {
    const att = attributions.find(
      (a) =>
        a.logement &&
        a.statut !== "Maintenance" &&
        a.statut !== "Terminé" &&
        (a.departement === depNomOuCode ||
          a.departement?.startsWith(`${depNomOuCode} —`) ||
          String(a.service_id) === String(serviceId)),
    );
    return att ? "Logé" : "Non logé";
  };

  const demenagementTemporaire = async (data) => {
    try {
      const result = await api.demenagementTemporaire(data);
      return result;
    } catch (err) {
      console.error("Erreur déménagement temporaire", err);
      throw err;
    }
  };

  return (
    <AppContext.Provider
      value={{
        // Données
        logements,
        departements,
        attributions,
        materiaux,
        setDepartements,
        getCapaciteLogement,
        getStatutLogementService,
        mouvements,
        depenses,

        // Actions logements
        ajouterLogement,
        modifierLogement,
        supprimerLogement,
        modifierStatutHistorique,
        setLogements,
        demenagementTemporaire,
        // Maintenance
        besoinsMaintenanceLog,
        alertesMaintenanceLog,
        travauxEnCours,
        demarrerMaintenance,
        commencerReparation,
        terminerReparation,
        confirmerReemmenagement,
        choisirReemménagement,
        effacerAlerteLogement,
        reemmenerService,
        echangerLogements,
        // Notifications
        notifications,
        ajouterNotification,
        marquerNotificationLue,
        marquerToutesNotificationsLues,
        supprimerNotification,

        // Actions départements
        ajouterDepartement,
        modifierDepartement,
        supprimerDepartement,
        ajouterService,
        modifierService,
        supprimerService,
        ajouterEmployeService,
        supprimerEmployeService,
        modifierEmploye,
        desactiverEmploye,
        reactiverEmploye,
        tousLesDepartements,

        // Historique RH
        historiqueRH,
        ajouterHistorique,
        // Actions attributions
        setAttributions,
        ajouterAttribution,
        modifierAttribution,
        terminerAttribution,
        supprimerAttribution,
        synchroniserOccupantsAttribution,
        // Actions matériaux
        ajouterMateriau,
        modifierMateriau,
        supprimerMateriau,
        ajouterMouvement,
        receptionnerMouvement,
        rafraichirMateriaux,
        // Actions dépenses
        ajouterDepense,
        modifierDepense,
        supprimerDepense,
        validerDepense,
        rejeterDepense,
        retournerStock,
        receptionnerDepense,
        // Budget
        budgetGlobal,
        modifierBudgetGlobal,

        // Alertes de besoins
        alertesBesoins,
        creerAlerteBesoin,
        resoudreAlerte,
        supprimerAlerte,
        mettreAJourAlerte,

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