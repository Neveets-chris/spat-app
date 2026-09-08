import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { api } from "../api";

// ── Icônes ───────────────────────────────────────────────────────────────────
const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
    <rect x="3" y="11" width="18" height="10" rx="2"/>
    <path d="M12 3v4M8 11V7a4 4 0 018 0v4"/>
    <circle cx="9" cy="16" r="1" fill="currentColor"/>
    <circle cx="15" cy="16" r="1" fill="currentColor"/>
  </svg>
);
const SendIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
);
const SpinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 animate-spin">
    <path d="M21 12a9 9 0 11-6.219-8.56"/>
  </svg>
);

// ── Normalisation texte ───────────────────────────────────────────────────────
const norm = (s) =>
  (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

// ── Distance de Levenshtein ───────────────────────────────────────────────────
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

// ── Chercher un matériau par nom approché ─────────────────────────────────────
function trouverMateriau(nomBrut, materiaux) {
  const n = norm(nomBrut);
  let found = materiaux.find(m => norm(m.nom) === n);
  if (found) return found;
  found = materiaux.find(m => norm(m.nom).includes(n) || n.includes(norm(m.nom)));
  if (found) return found;
  found = materiaux
    .map(m => ({ m, d: levenshtein(norm(m.nom), n) }))
    .filter(x => x.d <= 3)
    .sort((a, b) => a.d - b.d)[0]?.m;
  return found || null;
}

// ── Chercher un logement par id ou ref ───────────────────────────────────────
function trouverLogement(ref, logements) {
  const r = norm(ref);
  return logements.find(l =>
    String(l.id) === r ||
    norm(l.ref || "") === r ||
    norm(String(l.id)) === r
  ) || null;
}

// ── Chercher un service par nom approché ─────────────────────────────────────
function trouverService(nom, departements) {
  const n = norm(nom);
  for (const d of departements) {
    for (const s of (d.services || [])) {
      const sn = norm(s.name || s.nom || "");
      if (sn === n || sn.includes(n) || n.includes(sn) || levenshtein(sn, n) <= 2)
        return { ...s, departement: d };
    }
  }
  return null;
}

// ── Employés : constantes ─────────────────────────────────────────────────────
const CATEGORIES_EMPLOYE = ["Cadre supérieur", "Cadre moyen", "Agent maîtrise", "Agent exécution"];
const SITUATIONS_EMPLOYE = ["Célibataire", "Marié", "Divorcé", "Veuf"];
const MOTIFS_EMPLOYE = [
  { label: "Retraite", type: "definitif" },
  { label: "Démission", type: "definitif" },
  { label: "Décès", type: "definitif" },
  { label: "Renvoi", type: "definitif" },
  { label: "Congé maladie", type: "temporaire" },
  { label: "Congé parental", type: "temporaire" },
  { label: "Congé sans solde", type: "temporaire" },
  { label: "Mise à pied disciplinaire", type: "temporaire" },
  { label: "Formation prolongée", type: "temporaire" },
];

const capitaliser = (s) => (s || "").split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

// ── Règles métier d'attribution de logement (répliquées d'Attributions.jsx) ─
const CAPACITE_TYPES = { Studio: 3, F2: 6, F3: 10, F4: 15 };

// Une alerte "besoin logement" en attente pour ce service
function trouverAlerteBesoin(serviceId, alertesBesoins) {
  return (alertesBesoins || []).find(
    a => String(a.service_id) === String(serviceId) && a.statut === "En attente"
  ) || null;
}

// Places restantes dans un logement (capacité du type − occupants actifs)
function placesRestantes(logement, attributions) {
  const capaciteMax = CAPACITE_TYPES[logement.type] || 1;
  const occupantsActuels = (attributions || [])
    .filter(a => a.logement === logement.id && a.statut === "Occupé")
    .reduce((sum, a) => sum + (a.occupants?.length || 0), 0);
  return Math.max(0, capaciteMax - occupantsActuels);
}

// Le logement satisfait-il le type de logement requis par le besoin ?
function logementConforme(logement, typeRequis) {
  if (!typeRequis) return true;
  return (CAPACITE_TYPES[logement.type] || 0) >= (CAPACITE_TYPES[typeRequis] || 0);
}

// ── Chercher un employé par nom approché, dans tous les départements ────────
function trouverEmploye(nomBrut, departements) {
  const n = norm(nomBrut);
  if (!n) return [];
  const tous = [];
  for (const d of departements) {
    for (const s of (d.services || [])) {
      for (const e of (s.employes || [])) {
        tous.push({ emp: e, service: s, departement: d });
      }
    }
  }
  const exact = tous.filter(x => norm(`${x.emp.prenom} ${x.emp.nom}`) === n || norm(`${x.emp.nom} ${x.emp.prenom}`) === n);
  if (exact.length > 0) return exact;
  const partiel = tous.filter(x => {
    const nc = norm(`${x.emp.prenom} ${x.emp.nom}`);
    return nc.includes(n) || n.includes(nc) || norm(x.emp.nom || "") === n || norm(x.emp.prenom || "") === n;
  });
  if (partiel.length > 0) return partiel;
  const approx = tous
    .map(x => ({ x, d: levenshtein(norm(`${x.emp.prenom} ${x.emp.nom}`), n) }))
    .filter(r => r.d <= 3)
    .sort((a, b) => a.d - b.d);
  return approx.length > 0 ? [approx[0].x] : [];
}

// ── Chercher une catégorie/situation par nom approché ────────────────────────

// ── Chercher un motif de désactivation dans un texte libre ───────────────────
function trouverMotif(texte) {
  const t = norm(texte);
  for (const m of MOTIFS_EMPLOYE) {
    const ml = norm(m.label);
    if (t.includes(ml)) return m;
  }
  // Mots-clés isolés
  if (/\bretraite\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Retraite");
  if (/\bdemission\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Démission");
  if (/\bdeces\b|\bmort\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Décès");
  if (/\brenvoi\b|\blicenci/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Renvoi");
  if (/\bmaladie\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Congé maladie");
  if (/\bparental\b|\bmaternite\b|\bpaternite\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Congé parental");
  if (/\bsans solde\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Congé sans solde");
  if (/\bmise a pied\b|\bdisciplinaire\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Mise à pied disciplinaire");
  if (/\bformation\b/.test(t)) return MOTIFS_EMPLOYE.find(m => m.label === "Formation prolongée");
  return null;
}

// ── Extraire les champs d'un employé depuis un texte libre (ordre libre) ────
function extraireChampsEmploye(texteOriginal, departements) {
  const t = norm(texteOriginal);
  const champs = {};

  const salaireM = t.match(/salaire\s*(?:de|:)?\s*(\d+)/);
  if (salaireM) champs.salaire = parseInt(salaireM[1]);

  const telM = t.match(/(?:telephone|tel|numero)\s*(?:de|:)?\s*(\+?\d[\d\s]{5,})/);
  if (telM) champs.telephone = telM[1].replace(/\s+/g, "");

  const emailM = texteOriginal.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailM) champs.email = emailM[1];

  const enfM = t.match(/(\d+)\s*enfants?/);
  if (enfM) champs.nb_enfants = parseInt(enfM[1]);

  const categorieTrouvee = CATEGORIES_EMPLOYE.find(c => t.includes(norm(c)));
  if (categorieTrouvee) champs.categorie = categorieTrouvee;

  const situationTrouvee = SITUATIONS_EMPLOYE.find(s => t.includes(norm(s)));
  if (situationTrouvee) champs.situation = situationTrouvee;

  const adresseM = t.match(/adresse\s*(?:de|:)?\s*([a-z0-9\s,'-]+?)(?=\s+(?:salaire|email|tel|numero|enfant|categorie|situation|service|avec|$))/);
  if (adresseM) champs.adresse = capitaliser(adresseM[1].trim());

  const serviceM = t.match(/(?:au service|pour le service|dans le service|service)\s+([a-z0-9\s'-]+?)(?=\s+(?:categorie|salaire|situation|email|tel|numero|enfant|adresse|avec|,|$))/);
  if (serviceM) {
    const serviceNomBrut = serviceM[1].trim();
    const service = trouverService(serviceNomBrut, departements);
    if (service) champs.serviceObj = service;
    else champs.serviceNomIntrouvable = serviceNomBrut;
  }

  const nomM = t.match(/employe\s+([a-z]+)\s+([a-z]+)/);
  if (nomM) {
    champs.prenom = capitaliser(nomM[1]);
    champs.nom = capitaliser(nomM[2]);
  }

  return champs;
}

function fusionnerChampsEmploye(existants, nouveaux) {
  return { ...existants, ...nouveaux };
}

function champsManquantsEmploye(champs) {
  const manquants = [];
  if (!champs.prenom || !champs.nom) manquants.push("prenom_nom");
  if (!champs.serviceObj) manquants.push("service");
  return manquants;
}

// ── Extraire les champs d'une sortie de stock depuis un texte libre ─────────
function extraireChampsSortie(texteOriginal, materiaux, logements) {
  const t = norm(texteOriginal);
  const champs = {};
  let reste = t;

  const logM = reste.match(/(?:logement|log)\s*([a-z0-9]+)/);
  if (logM) {
    const log = trouverLogement(logM[1], logements);
    if (log) champs.logement = log;
    else champs.logementNomIntrouvable = logM[1];
    reste = reste.replace(logM[0], " ");
  }

  const qM = reste.match(/(\d+(?:[.,]\d+)?)/);
  if (qM) {
    champs.quantite = parseFloat(qM[1].replace(",", "."));
    reste = reste.replace(qM[0], " ");
  }

  reste = reste
    .replace(/\b(sortie|sortir|retirer?|enlever?|prendre|utiliser?|sors?|prelever?|pour|du|de|au|dans|le|la|les)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (reste) {
    const mat = trouverMateriau(reste, materiaux);
    if (mat) champs.materiau = mat;
    else champs.materiauNomBrut = reste;
  }
  return champs;
}

function champsManquantsSortie(champs) {
  const m = [];
  if (!champs.materiau) m.push("materiau");
  if (champs.quantite === undefined || champs.quantite === null) m.push("quantite");
  if (!champs.logement) m.push("logement");
  return m;
}

// ── Extraire les champs d'une dépense depuis un texte libre ─────────────────
function extraireChampsDepense(texteOriginal, materiaux, logements) {
  const t = norm(texteOriginal);
  const champs = {};
  let reste = t;

  const logM = reste.match(/(?:logement|log)\s*([a-z0-9]+)/);
  if (logM) {
    const log = trouverLogement(logM[1], logements);
    if (log) champs.logement = log;
    reste = reste.replace(logM[0], " ");
  }

  const prixM = reste.match(/(?:a|au prix de|prix|coute|coutant)\s*(\d+)/);
  if (prixM) {
    champs.prix = parseInt(prixM[1]);
    reste = reste.replace(prixM[0], " ");
  }

  const nombres = [...reste.matchAll(/\d+(?:[.,]\d+)?/g)].map(m => m[0]);
  if (champs.prix === undefined && nombres.length >= 2) {
    champs.quantite = parseFloat(nombres[0].replace(",", "."));
    champs.prix = parseInt(nombres[1]);
    reste = reste.replace(nombres[0], " ").replace(nombres[1], " ");
  } else if (nombres.length >= 1) {
    champs.quantite = parseFloat(nombres[0].replace(",", "."));
    reste = reste.replace(nombres[0], " ");
  }

  reste = reste
    .replace(/\b(creer|ajouter?|nouvelle?|achet(?:er?|e)|achat|depense|pour|de|du|au|a)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (reste) {
    const mat = trouverMateriau(reste, materiaux);
    champs.description = mat?.nom || capitaliser(reste);
    if (mat) champs.mat = mat;
  }
  return champs;
}

function champsManquantsDepense(champs) {
  const m = [];
  if (!champs.description) m.push("description");
  if (champs.quantite === undefined || champs.quantite === null) m.push("quantite");
  if (champs.prix === undefined || champs.prix === null) m.push("prix");
  return m;
}

// ── Extraire les champs d'une attribution de logement ───────────────────────
function extraireChampsAttribution(texteOriginal, logements, departements) {
  const t = norm(texteOriginal);
  const champs = {};
  let reste = t;

  const logM = reste.match(/(?:logement|log)\s*([a-z0-9]+)/);
  if (logM) {
    const log = trouverLogement(logM[1], logements);
    if (log) champs.logement = log;
    else champs.logementNomIntrouvable = logM[1];
    reste = reste.replace(logM[0], " ");
  }

  const serviceM = reste.match(/(?:au service|pour le service|dans le service|service)\s+([a-z0-9\s'-]+)/);
  if (serviceM) {
    const service = trouverService(serviceM[1].trim(), departements);
    if (service) champs.service = service;
    else champs.serviceNomIntrouvable = serviceM[1].trim();
    reste = reste.replace(serviceM[0], " ");
  } else {
    reste = reste
      .replace(/\b(attribuer?|donner?|affecter?|assigner?|le|la|les|au?|pour|a)\b/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (reste && !champs.logement) {
      const log = trouverLogement(reste, logements);
      if (log) champs.logement = log;
    }
    if (reste && !champs.service) {
      const service = trouverService(reste, departements);
      if (service) champs.service = service;
    }
  }
  return champs;
}

function champsManquantsAttribution(champs) {
  const m = [];
  if (!champs.logement) m.push("logement");
  if (!champs.service) m.push("service");
  return m;
}

// ── Parser besoins "10 toles et 5 ciment" ────────────────────────────────────
function parseBesoins(texte, materiaux) {
  const besoins = [];
  const parties = texte.split(/\s+et\s+|,\s*|\+\s*/i);
  for (const partie of parties) {
    const m = partie.trim().match(/^(\d+(?:[.,]\d+)?)\s+(.+)$/);
    if (!m) continue;
    const quantite = parseFloat(m[1].replace(",", "."));
    const nomBrut = m[2].trim();
    const mat = trouverMateriau(nomBrut, materiaux);
    if (quantite > 0) {
      besoins.push({
        nom: mat?.nom || nomBrut,
        quantite,
        unite: mat?.unite || "unités",
      });
    }
  }
  return besoins;
}

// ── Parser principal — toutes les commandes, ordre libre ─────────────────────
function parseCommande(texte, contexte) {
  const t = norm(texte);
  const { logements, materiaux, departements } = contexte;

  // ── AIDE ──────────────────────────────────────────────────────────────────
  if (/\b(aide|help|commandes?|que peux.tu|comment)\b/.test(t))
    return { type: "aide" };

  // ── STATS ─────────────────────────────────────────────────────────────────
  if (/\b(stats?|resume|bilan|situation|etat general)\b/.test(t))
    return { type: "stats" };

  // ── VOIR STOCK ────────────────────────────────────────────────────────────
  if (/\b(stock|materiaux?|materiel|inventaire)\b/.test(t) && !/sortie|retrait|enlev|prend|utilis/.test(t))
    return { type: "voir_stock" };

  // ── VOIR LOGEMENTS ────────────────────────────────────────────────────────
  if (/\b(logements?|appartements?)\b/.test(t) && !/maintenance|reparation|met|passe|sortie/.test(t)) {
    if (/disponible/.test(t)) return { type: "voir_logements", filtre: "Disponible" };
    if (/occup/.test(t)) return { type: "voir_logements", filtre: "Occupé" };
    if (/maintenance/.test(t)) return { type: "voir_logements", filtre: "Maintenance" };
    return { type: "voir_logements", filtre: "Tous" };
  }

  // ── CRÉER / AJOUTER EMPLOYÉ ──────────────────────────────────────────────
  if (/\bemploye\b/.test(t) && /\b(ajouter?|ajoute|creer?|embaucher?|recruter?|engager?|nouvel|nouveau|inscrire)\b/.test(t)) {
    const champs = extraireChampsEmploye(texte, departements);
    if (champs.serviceNomIntrouvable && !champs.serviceObj)
      return { type: "erreur", message: `Service "${champs.serviceNomIntrouvable}" introuvable.` };
    const manquants = champsManquantsEmploye(champs);
    if (manquants.length > 0) return { type: "creation_employe_manque", champs, manquants };
    return { type: "creation_employe", champs };
  }

  // ── DÉSACTIVER EMPLOYÉ ────────────────────────────────────────────────────
  const desactMatch = t.match(/(?:desactiver?|desactive|virer?|licencier?|renvoyer?)\s+(?:l'?employe\s+)?(.+)/)
    || t.match(/mettre\s+(.+?)\s+en\s+conge/);
  if ((desactMatch && /\bemploye\b/.test(t)) || (desactMatch && /\bconge\b/.test(t))) {
    let reste = desactMatch[1].trim();
    const motif = trouverMotif(reste);
    if (motif) {
      // retirer le libellé du motif du texte pour isoler le nom
      reste = reste.replace(norm(motif.label), "").replace(/\bpour\b|\bcar\b|\bmotif\b/g, "").trim();
    }
    reste = reste.replace(/^l'?employe\s+/, "").trim();
    const matches = trouverEmploye(reste, departements);
    if (matches.length === 0) return { type: "employe_introuvable", nomBrut: reste };
    if (matches.length > 1) return { type: "employe_ambigu", matches, action: "desactiver" };
    const cible = matches[0];
    if (cible.emp.desactive) return { type: "erreur", message: `**${cible.emp.prenom} ${cible.emp.nom}** est déjà désactivé.` };
    if (!motif) return { type: "desactivation_employe_manque_motif", cible };
    return { type: "desactivation_employe", cible, motif };
  }

  // ── RÉACTIVER EMPLOYÉ ─────────────────────────────────────────────────────
  const reactMatch = t.match(/(?:reactiver?|reactive|reintegrer?|reprendre|remettre)\s+(?:l'?employe\s+)?(.+)/);
  if (reactMatch && /\bemploye\b/.test(t)) {
    const reste = reactMatch[1].trim().replace(/^l'?employe\s+/, "").trim();
    const matches = trouverEmploye(reste, departements);
    if (matches.length === 0) return { type: "employe_introuvable", nomBrut: reste };
    if (matches.length > 1) return { type: "employe_ambigu", matches, action: "reactiver" };
    const cible = matches[0];
    if (!cible.emp.desactive) return { type: "erreur", message: `**${cible.emp.prenom} ${cible.emp.nom}** est déjà actif.` };
    if (cible.emp.typeDesactivation === "definitif")
      return { type: "erreur", message: `Réactivation impossible : **${cible.emp.prenom} ${cible.emp.nom}** a été désactivé **définitivement** (${cible.emp.motifDesactivation || "motif définitif"}).` };
    return { type: "reactivation_employe", cible };
  }

  // ── VOIR SERVICES ─────────────────────────────────────────────────────────
  if (/\b(services?|sans logement|besoin logement)\b/.test(t) ||
      (/\bemployes?\b/.test(t) && !/\b(ajouter?|creer?|embaucher?|recruter?|desactiver?|virer?|licencier?|reactiver?|nouvel|nouveau)\b/.test(t)))
    return { type: "voir_services" };

  // ── VOIR ALERTES ──────────────────────────────────────────────────────────
  if (/\b(alertes?|besoins? (en attente|logement))\b/.test(t))
    return { type: "voir_alertes" };

  // ── VOIR DEPENSES ─────────────────────────────────────────────────────────
  if (/\b(depenses?|achats?|factures?)\b/.test(t) && !/creer|ajouter|nouvelle|achet/.test(t))
    return { type: "voir_depenses" };

  // ── SORTIE DE STOCK ───────────────────────────────────────────────────────
  // Patterns : "sortie 5 toles logement 12" / "retirer 3 ciment du logement 4"
  if (/\b(sortie|sortir|retirer?|enlever?|prendre|utiliser?|sors?|prelever?)\b/.test(t) && !/\bemploye\b/.test(t)) {
    const champs = extraireChampsSortie(texte, materiaux, logements);
    if (champs.logementNomIntrouvable) return { type: "erreur", message: `Logement "${champs.logementNomIntrouvable}" introuvable.` };
    if (champs.materiauNomBrut && !champs.materiau)
      return { type: "erreur", message: `Matériau "${champs.materiauNomBrut}" introuvable.\nDisponibles : ${materiaux.map(m => m.nom).join(", ")}` };
    const manquants = champsManquantsSortie(champs);
    if (manquants.length > 0) return { type: "sortie_stock_manque", champs, manquants };
    return { type: "sortie_stock", materiau: champs.materiau, quantite: champs.quantite, logement: champs.logement };
  }

  // ── MAINTENANCE ───────────────────────────────────────────────────────────
  const maintMatch = t.match(/(?:met(?:tre)?|pass(?:er)?|mise?|mets|mettre)\s+(?:le\s+)?(?:logement\s+)?(\w+)\s+en\s+maintenance(?:\s+avec\s+(.+))?/);
  if (maintMatch) {
    const logRef = maintMatch[1];
    const log = trouverLogement(logRef, logements);
    if (!log) return { type: "erreur", message: `Logement "${logRef}" introuvable.` };
    if (log.statut === "Maintenance" || log.statut === "EN_REPARATION")
      return { type: "erreur", message: `Logement **${log.id}** est déjà en ${log.statut}.` };
    const besoinsTexte = maintMatch[2] || "";
    const besoins = besoinsTexte ? parseBesoins(besoinsTexte, materiaux) : [];
    if (besoins.length === 0)
      return { type: "demander_besoins", logement: log };
    return { type: "demarrer_maintenance", logement: log, besoins };
  }

  // ── RÉPARATION ────────────────────────────────────────────────────────────
  const repMatch = t.match(/(?:commence[rz]?|demarre[rz]?|repare[rz]?|lancer?|fin(?:ir)?|terminer?)\s+(?:la\s+)?(?:reparation\s+)?(?:du\s+)?(?:logement\s+)?(\w+)/);
  if (repMatch) {
    const log = trouverLogement(repMatch[1], logements);
    if (!log) return { type: "erreur", message: `Logement "${repMatch[1]}" introuvable.` };
    return { type: "commencer_reparation", logement: log };
  }

  // ── TERMINER RÉPARATION ─────────────────────────────────────────────────
  const terminMatch = t.match(/(?:terminer?|finir?|fin|cloturer?)\s+(?:la\s+)?(?:reparation\s+)?(?:du\s+)?(?:logement\s+)?(\w+)/);
  if (terminMatch) {
    const log = trouverLogement(terminMatch[1], logements);
    if (!log) return { type: "erreur", message: `Logement "${terminMatch[1]}" introuvable.` };
    return { type: "terminer_reparation", logement: log };
  }

  // ── CRÉER DÉPENSE ─────────────────────────────────────────────────────────
  if (/\b(creer?|ajouter?|nouvelle?|achet(?:er?|e)|achat)\b/.test(t) && /\d/.test(t) && !/\bemploye\b/.test(t) && !/\bmaintenance\b/.test(t)) {
    const champs = extraireChampsDepense(texte, materiaux, logements);
    const manquants = champsManquantsDepense(champs);
    if (manquants.length > 0) return { type: "creer_depense_manque", champs, manquants };
    return { type: "creer_depense", materiauNom: champs.description, quantite: champs.quantite, prix: champs.prix, mat: champs.mat, logement: champs.logement };
  }

  // ── ATTRIBUTION ───────────────────────────────────────────────────────────
  if (/\b(attribuer?|donner?|affecter?|assigner?)\b/.test(t) && !/\bemploye\b/.test(t)) {
    const champs = extraireChampsAttribution(texte, logements, departements);
    if (champs.logementNomIntrouvable) return { type: "erreur", message: `Logement "${champs.logementNomIntrouvable}" introuvable.` };
    if (champs.serviceNomIntrouvable) return { type: "erreur", message: `Service "${champs.serviceNomIntrouvable}" introuvable.` };
    const manquants = champsManquantsAttribution(champs);
    if (manquants.length > 0) return { type: "attribution_manque", champs, manquants };
    return { type: "attribuer_logement", logement: champs.logement, service: champs.service };
  }

  // ── STATUT LOGEMENT ───────────────────────────────────────────────────────
  const statutMatch = t.match(/(?:statut|info|detail|voir)\s+(?:logement\s+)?(\w+)/);
  if (statutMatch) {
    const log = trouverLogement(statutMatch[1], logements);
    if (log) return { type: "statut_logement", logement: log };
  }

  return { type: "inconnu", texte };
}

// ── Exécution des commandes ───────────────────────────────────────────────────
async function executerCommande(commande, contexte, actions) {
  const { logements, materiaux, departements, attributions, alertesBesoins, depenses } = contexte;

  switch (commande.type) {

    case "aide":
      return `🤖 **Commandes disponibles (ordre libre) :**

📦 **Stock**
• \`stock\` — voir tous les matériaux
• \`sortie 11 toles logement 5\`
• \`retirer 3 ciment du logement 4\`

🏠 **Logements**
• \`logements\` / \`logements disponibles\` / \`logements occupés\`
• \`statut logement 5\` — détail d'un logement
• \`met logement 5 en maintenance avec 10 toles et 5 ciments\`
• \`commence réparation logement 5\`
• \`terminer réparation logement 5\`

💼 **Services & Attribution**
• \`services\` — voir tous les services
• \`services sans logement\`
• \`attribuer logement 5 au service RH\`

👤 **Employés**
• \`ajouter employé Jean Rakoto au service RH\` (et le reste si besoin : salaire, catégorie...)
• \`désactiver employé Jean Rakoto\` (le motif est demandé si absent)
• \`réactiver employé Jean Rakoto\`
• Tout ce qui manque est demandé sans ordre imposé — \`annuler\` pour abandonner

🔔 **Alertes**
• \`alertes\` — besoins en attente

💰 **Dépenses**
• \`dépenses\` — dépenses en attente
• \`créer dépense 10 toles à 30000 ar\`

📊 \`stats\` — résumé global`;

    case "stats": {
      const dispo = logements.filter(l => l.statut === "Disponible").length;
      const occupe = logements.filter(l => l.statut === "Occupé").length;
      const maint = logements.filter(l => l.statut === "Maintenance" || l.statut === "EN_REPARATION").length;
      const stockBas = materiaux.filter(m => m.stock <= m.seuil).length;
      const alertes = alertesBesoins.filter(a => a.statut === "En attente").length;
      const depAttente = depenses.filter(d => d.statut === "En attente").length;
      const totalEmp = departements.reduce((s, d) => s + (d.services || []).reduce((ss, srv) => ss + (srv.employes || []).length, 0), 0);
      return `📊 **Résumé général :**

🏠 Logements : **${dispo}** disponibles · **${occupe}** occupés · **${maint}** en maintenance
👥 Employés : **${totalEmp}** au total
📦 Stock : **${stockBas}** matériaux en alerte critique
🔔 Alertes besoin : **${alertes}** en attente
💰 Dépenses : **${depAttente}** en attente de validation`;
    }

    case "voir_stock": {
      if (materiaux.length === 0) return "📦 Aucun matériau en stock.";
      const lignes = materiaux.map(m => {
        const alerte = m.stock <= m.seuil ? " ⚠️" : " ✅";
        return `• **${m.nom}** : ${m.stock} ${m.unite}${alerte}`;
      });
      return `📦 **Stock (${materiaux.length} matériaux) :**\n${lignes.join("\n")}`;
    }

    case "voir_logements": {
      const filtres = commande.filtre === "Tous"
        ? logements
        : logements.filter(l => l.statut === commande.filtre);
      if (filtres.length === 0) return `🏠 Aucun logement ${commande.filtre.toLowerCase()}.`;
      const lignes = filtres.slice(0, 15).map(l => {
        const att = attributions.find(a => a.logement === l.id && a.statut === "Occupé");
        const occupants = att ? ` (${(att.occupants || []).length} pers.)` : "";
        return `• **${l.id}** — ${l.type} ${l.localisation || ""} → ${l.statut}${occupants}`;
      });
      return `🏠 **Logements ${commande.filtre === "Tous" ? "" : commande.filtre.toLowerCase()} (${filtres.length}) :**\n${lignes.join("\n")}`;
    }

    case "statut_logement": {
      const l = commande.logement;
      const att = attributions.find(a => a.logement === l.id && a.statut !== "Terminé");
      const besoins = l.besoinsMaintenance || [];
      const sortis = l.materiauxSortis || [];
      let info = `🏠 **Logement ${l.id} — ${l.type}**\n`;
      info += `• Statut : **${l.statut}**\n`;
      info += `• Localisation : ${l.localisation || "—"}\n`;
      if (att) info += `• Attribution : ${att.departement || "—"} (${(att.occupants || []).length} occupants)\n`;
      if (besoins.length > 0) {
        info += `• Besoins maintenance :\n`;
        besoins.forEach(b => {
          const sorti = sortis.find(s => norm(s.nom) === norm(b.nom));
          const qSortie = sorti?.quantiteSortie || 0;
          const ok = qSortie >= b.quantite ? "✅" : `⏳ (${qSortie}/${b.quantite} sortis)`;
          info += `  - ${b.nom} × ${b.quantite} ${b.unite} ${ok}\n`;
        });
      }
      return info;
    }

    case "voir_services": {
      const services = departements.flatMap(d => (d.services || []).map(s => ({ ...s, depNom: d.nom })));
      const sanLog = services.filter(s => !s.logementAttribue);
      const avecLog = services.filter(s => s.logementAttribue);
      let rep = `👥 **Services (${services.length} total) :**\n`;
      if (avecLog.length > 0) {
        rep += `\n✅ **Logés (${avecLog.length}) :**\n`;
        avecLog.forEach(s => { rep += `• **${s.name || s.nom}** (${s.depNom}) → logement ${s.logementAttribue}\n`; });
      }
      if (sanLog.length > 0) {
        rep += `\n❌ **Sans logement (${sanLog.length}) :**\n`;
        sanLog.forEach(s => { rep += `• **${s.name || s.nom}** (${s.depNom})\n`; });
      }
      return rep;
    }

    case "voir_alertes": {
      const alertes = alertesBesoins.filter(a => a.statut === "En attente");
      if (alertes.length === 0) return "✅ Aucune alerte de besoin en attente.";
      const lignes = alertes.map(a => `• **${a.service}** (${a.departement}) — besoin ${a.typeLogementRequis || "logement"}`);
      return `🔔 **Alertes (${alertes.length}) :**\n${lignes.join("\n")}`;
    }

    case "voir_depenses": {
      const enAttente = depenses.filter(d => d.statut === "En attente");
      if (enAttente.length === 0) return "✅ Aucune dépense en attente.";
      const lignes = enAttente.slice(0, 10).map(d =>
        `• **${d.description}** × ${d.quantite} ${d.unite || ""} — ${(d.montant || (d.quantite * (d.prix_unitaire || d.prixUnitaire || 0))).toLocaleString("fr-FR")} Ar`
      );
      return `💰 **Dépenses en attente (${enAttente.length}) :**\n${lignes.join("\n")}`;
    }

    case "sortie_stock": {
      const { materiau, quantite, logement } = commande;

      if (logement.statut !== "Maintenance" && logement.statut !== "EN_REPARATION")
        return `⚠️ Logement **${logement.id}** n'est pas en maintenance (statut actuel : **${logement.statut}**).\nSortie de stock possible uniquement pour un logement en maintenance.`;

      if (quantite <= 0)
        return `❌ La quantité doit être supérieure à 0.`;

      // Vérifier que le matériau est dans les besoins du logement (obligatoire, pas d'exception)
      const besoins = logement.besoinsMaintenance || [];
      const besoin = besoins.find(b => norm(b.nom) === norm(materiau.nom));
      if (!besoin)
        return `❌ Sortie impossible : **${materiau.nom}** n'est pas demandé par le logement **${logement.id}** (absent des besoins de maintenance).`;

      const sortis = logement.materiauxSortis || [];
      const dejaSorti = sortis.find(s => norm(s.nom) === norm(materiau.nom))?.quantiteSortie || 0;
      const restant = Math.max(0, besoin.quantite - dejaSorti);

      if (restant <= 0)
        return `ℹ️ La quantité requise de **${materiau.nom}** a déjà été sortie pour le logement **${logement.id}**.`;

      if (materiau.stock < quantite)
        return `❌ Stock insuffisant pour **${materiau.nom}** : seulement **${materiau.stock} ${materiau.unite}** disponibles.\nVous demandez : ${quantite} ${materiau.unite}.`;

      // Pas de sortie partielle : la quantité doit couvrir au moins le besoin restant (le surplus est autorisé, pas le manque)
      if (quantite < restant)
        return `⚠️ Sortie partielle non autorisée.\nLe besoin restant pour **${materiau.nom}** au logement **${logement.id}** est de **${restant} ${materiau.unite}** — vous devez sortir au moins cette quantité en une seule fois (un surplus est possible si le stock le permet).`;

      try {
        await api.sortieStock(materiau.id, {
          quantite,
          logement_ref: String(logement.id),
        });
        const stockApres = materiau.stock - quantite;
        const totalSorti = dejaSorti + quantite;
        let rep = `✅ **Sortie effectuée :**\n`;
        rep += `• Matériau : **${materiau.nom}**\n`;
        rep += `• Quantité sortie : **${quantite} ${materiau.unite}**\n`;
        rep += `• Logement : **${logement.id} — ${logement.type}**\n`;
        rep += `• Stock restant : **${stockApres} ${materiau.unite}**\n`;
        rep += `• Besoin logement : ${totalSorti}/${besoin.quantite} ✅ complet`;
        if (totalSorti > besoin.quantite) rep += ` (surplus de ${totalSorti - besoin.quantite})`;
        return rep;
      } catch (e) {
        return `❌ Erreur sortie : ${e.response?.data?.detail || e.message || "Impossible."}`;
      }
    }

    case "demarrer_maintenance": {
      const { logement, besoins } = commande;
      try {
        const result = await actions.demarrerMaintenance(logement.id, besoins, logement);
        if (result?.success) {
          const lignes = besoins.map(b => {
            const mat = trouverMateriau(b.nom, contexte.materiaux);
            const stockOk = mat && mat.stock >= b.quantite ? "✅ stock ok" : "⚠️ à commander";
            return `  • ${b.quantite} ${b.unite} de **${b.nom}** — ${stockOk}`;
          });
          return `✅ Logement **${logement.id} — ${logement.type}** passé en **maintenance**.\n\n**Besoins enregistrés :**\n${lignes.join("\n")}\n\nUtilisez \`sortie X ${besoins[0]?.nom || "materiau"} logement ${logement.id}\` pour sortir les matériaux.`;
        }
        return `❌ Erreur : ${result?.error || "Maintenance impossible."}`;
      } catch (e) {
        return `❌ Erreur : ${e.message || "Maintenance impossible."}`;
      }
    }

    case "demander_besoins": {
      const { logement } = commande;
      return `🔧 Logement **${logement.id} — ${logement.type}** (${logement.statut}) trouvé.\n\nQuels matériaux sont nécessaires pour la maintenance ?\n\n💡 Ex : \`met logement ${logement.id} en maintenance avec 10 toles et 5 ciments\``;
    }

    case "commencer_reparation": {
      const { logement } = commande;
      if (logement.statut !== "Maintenance" && logement.statut !== "EN_REPARATION")
        return `⚠️ Logement **${logement.id}** n'est pas en maintenance (statut : **${logement.statut}**).`;

      // Vérifier si tous les matériaux ont été sortis
      const besoins = logement.besoinsMaintenance || [];
      const sortis = logement.materiauxSortis || [];
      const manquants = besoins.filter(b => {
        const s = sortis.find(ms => norm(ms.nom) === norm(b.nom));
        return !s || s.quantiteSortie < b.quantite;
      });

      if (manquants.length > 0) {
        const lignes = manquants.map(b => {
          const s = sortis.find(ms => norm(ms.nom) === norm(b.nom));
          const qSorti = s?.quantiteSortie || 0;
          return `  • **${b.nom}** : ${qSorti}/${b.quantite} ${b.unite} sortis`;
        });
        return `⚠️ Matériaux non encore sortis du stock :\n${lignes.join("\n")}\n\nSortez-les d'abord avec \`sortie X materiau logement ${logement.id}\`.`;
      }

      const ok = await actions.commencerReparation(logement.id, 2);
      return ok
        ? `✅ Réparation démarrée pour logement **${logement.id} — ${logement.type}**.\n⏱️ Durée estimée : 2 minutes.\n\nUtilisez \`terminer réparation ${logement.id}\` quand c'est terminé.`
        : `❌ Impossible de démarrer la réparation du logement **${logement.id}**.`;
    }

    case "terminer_reparation": {
      const { logement } = commande;
      if (logement.statut !== "EN_REPARATION" && logement.statut !== "Maintenance")
        return `⚠️ Logement **${logement.id}** n'est pas en réparation (statut : **${logement.statut}**).`;
      try {
        await actions.terminerReparation(logement.id);
        return `✅ Réparation terminée pour logement **${logement.id} — ${logement.type}**.\nStatut → **Disponible**.`;
      } catch (e) {
        return `❌ Erreur : ${e.message || "Impossible de terminer la réparation."}`;
      }
    }

    case "creer_depense": {
      try {
        await actions.ajouterDepense({
          description: commande.materiauNom,
          quantite: commande.quantite,
          prixUnitaire: commande.prix || 0,
          fournisseur: "TRANO MORA",
          unite: commande.mat?.unite || "unités",
          categorie: "Matériaux",
          date: new Date().toISOString().split("T")[0],
          logement: commande.logement ? String(commande.logement.id) : "",
        });
        const total = (commande.quantite * (commande.prix || 0)).toLocaleString("fr-FR");
        let rep = `✅ **Dépense créée :**\n• Article : **${commande.materiauNom}** × ${commande.quantite}\n• Prix unitaire : ${(commande.prix || 0).toLocaleString("fr-FR")} Ar\n• Total : **${total} Ar**`;
        if (commande.logement) rep += `\n• Logement : **${commande.logement.id}**`;
        rep += `\n• Statut : ⏳ En attente de validation`;
        return rep;
      } catch (e) {
        return `❌ Erreur création dépense : ${e.response?.data ? JSON.stringify(e.response.data) : e.message}`;
      }
    }

    case "attribuer_logement": {
      const { logement, service } = commande;
      if (logement.statut !== "Disponible")
        return `⚠️ Logement **${logement.id}** n'est pas disponible (statut : **${logement.statut}**).`;

      if (service.logementAttribue)
        return `⚠️ Le service **${service.name || service.nom}** est déjà logé (logement **${service.logementAttribue}**). Il faut d'abord terminer cette attribution.`;

      const alerte = trouverAlerteBesoin(service.id, contexte.alertesBesoins);
      if (!alerte)
        return `❌ Attribution impossible : le service **${service.name || service.nom}** n'a pas de besoin de logement en attente.\n💡 Une alerte de besoin logement doit d'abord être créée pour ce service.`;

      const typeRequis = alerte.typeLogementRequis;
      if (!logementConforme(logement, typeRequis))
        return `❌ Logement non conforme : **${logement.type}** ne satisfait pas la demande **${typeRequis}** du service **${service.name || service.nom}**.`;

      const places = placesRestantes(logement, contexte.attributions);
      if (places === 0)
        return `⚠️ Logement **${logement.id}** est plein (capacité ${CAPACITE_TYPES[logement.type] || 1} atteinte).`;

      try {
        await actions.ajouterAttribution({
          logement: logement.id,
          service_id: service.id,
          departement: service.departement?.nom || service.depNom || "",
          statut: "Occupé",
          date_debut: new Date().toISOString().split("T")[0],
          _alerteId: alerte.id,
        });
        return `✅ Logement **${logement.id} — ${logement.type}** attribué au service **${service.name || service.nom}** (${service.departement?.nom || service.depNom}).\n• Besoin ${typeRequis || ""} satisfait, alerte résolue.`;
      } catch (e) {
        return `❌ Erreur attribution : ${e.response?.data?.detail || e.message || "Impossible."}`;
      }
    }

    case "creation_employe_manque": {
      const { champs, manquants } = commande;
      const connu = [];
      if (champs.prenom && champs.nom) connu.push(`Nom : **${champs.prenom} ${champs.nom}**`);
      if (champs.serviceObj) connu.push(`Service : **${champs.serviceObj.name || champs.serviceObj.nom}**`);
      if (champs.categorie) connu.push(`Catégorie : ${champs.categorie}`);
      if (champs.salaire) connu.push(`Salaire : ${champs.salaire.toLocaleString("fr-FR")} Ar`);

      const labelsManquants = manquants.map(m => m === "prenom_nom" ? "le prénom et nom" : "le service").join(" et ");
      let rep = `📋 **Création d'employé en cours...**\n`;
      if (connu.length > 0) rep += `\n✅ Déjà noté :\n${connu.map(c => `  • ${c}`).join("\n")}\n`;
      rep += `\n❓ Il me manque : **${labelsManquants}**.\n`;
      if (manquants.includes("prenom_nom")) rep += `💡 Donnez juste le prénom et nom, ex : \`Jean Rakoto\`\n`;
      if (manquants.includes("service")) rep += `💡 Précisez le service, ex : \`service RH\``;
      return rep;
    }

    case "creation_employe": {
      const c = commande.champs;
      const service = c.serviceObj;
      const payload = {
        prenom: c.prenom,
        nom: c.nom,
        categorie: c.categorie || "Agent exécution",
        situation: c.situation || "Célibataire",
        nb_enfants: c.nb_enfants || 0,
        email: c.email || "",
        telephone: c.telephone || "",
        adresse: c.adresse || "",
        salaire: c.salaire || 400000,
      };
      try {
        const result = await actions.ajouterEmployeService(service.departement.id, service.id, payload);
        if (result?.success) {
          const e = result.employe;
          return `✅ **Employé créé :**\n• Nom : **${e.prenom} ${e.nom}**${e.matricule ? ` (matricule ${e.matricule})` : ""}\n• Service : **${service.name || service.nom}** (${service.departement?.nom})\n• Catégorie : ${payload.categorie}\n• Salaire : ${payload.salaire.toLocaleString("fr-FR")} Ar`;
        }
        return `❌ Erreur création employé : ${typeof result?.error === "object" ? JSON.stringify(result.error) : (result?.error || "impossible.")}`;
      } catch (e) {
        return `❌ Erreur création employé : ${e.message || "impossible."}`;
      }
    }

    case "employe_introuvable":
      return `❌ Employé "${commande.nomBrut}" introuvable.`;

    case "employe_ambigu": {
      const lignes = commande.matches.map(m => `• **${m.emp.prenom} ${m.emp.nom}** — ${m.service.name || m.service.nom} (${m.departement.nom})`);
      return `🤔 Plusieurs employés correspondent :\n${lignes.join("\n")}\n\nPrécisez le nom complet ou le service.`;
    }

    case "desactivation_employe_manque_motif": {
      const { cible } = commande;
      return `❓ Quel est le motif de désactivation de **${cible.emp.prenom} ${cible.emp.nom}** ?\n\n**Définitif :** retraite, démission, décès, renvoi\n**Temporaire :** congé maladie, congé parental, congé sans solde, mise à pied, formation prolongée`;
    }

    case "desactivation_employe": {
      const { cible, motif } = commande;
      try {
        await actions.desactiverEmploye(cible.departement.id, cible.service.id, cible.emp.id, motif.label, motif.type);
        return `✅ **${cible.emp.prenom} ${cible.emp.nom}** désactivé.\n• Motif : ${motif.label} (${motif.type})\n• Service : ${cible.service.name || cible.service.nom}`;
      } catch (e) {
        return `❌ Erreur désactivation : ${e.message || "impossible."}`;
      }
    }

    case "reactivation_employe": {
      const { cible } = commande;
      try {
        await actions.reactiverEmploye(cible.departement.id, cible.service.id, cible.emp.id);
        return `✅ **${cible.emp.prenom} ${cible.emp.nom}** réactivé.\n• Service : ${cible.service.name || cible.service.nom}`;
      } catch (e) {
        return `❌ Erreur réactivation : ${e.message || "impossible."}`;
      }
    }

    case "sortie_stock_manque": {
      const { champs, manquants } = commande;
      const connu = [];
      if (champs.materiau) connu.push(`Matériau : **${champs.materiau.nom}**`);
      if (champs.quantite !== undefined && champs.quantite !== null) connu.push(`Quantité : **${champs.quantite}**`);
      if (champs.logement) connu.push(`Logement : **${champs.logement.id}**`);
      const labels = { materiau: "le matériau", quantite: "la quantité", logement: "le logement" };
      let rep = `📦 **Sortie de stock en cours...**\n`;
      if (connu.length > 0) rep += `\n✅ Déjà noté :\n${connu.map(c => `  • ${c}`).join("\n")}\n`;
      rep += `\n❓ Il me manque : **${manquants.map(m => labels[m]).join(" et ")}**.`;
      // Si matériau + logement connus, suggérer le besoin restant
      if (champs.materiau && champs.logement && manquants.length === 1 && manquants[0] === "quantite") {
        const besoins = champs.logement.besoinsMaintenance || [];
        const besoin = besoins.find(b => norm(b.nom) === norm(champs.materiau.nom));
        if (besoin) {
          const sortis = champs.logement.materiauxSortis || [];
          const dejaSorti = sortis.find(s => norm(s.nom) === norm(champs.materiau.nom))?.quantiteSortie || 0;
          const restant = Math.max(0, besoin.quantite - dejaSorti);
          rep += `\n💡 Besoin restant : **${restant} ${champs.materiau.unite}** (pas de sortie partielle possible, un surplus est ok).`;
        } else {
          rep += `\n⚠️ **${champs.materiau.nom}** n'est pas dans les besoins du logement **${champs.logement.id}** — la sortie sera refusée.`;
        }
      }
      return rep;
    }

    case "creer_depense_manque": {
      const { champs, manquants } = commande;
      const connu = [];
      if (champs.description) connu.push(`Article : **${champs.description}**`);
      if (champs.quantite !== undefined && champs.quantite !== null) connu.push(`Quantité : **${champs.quantite}**`);
      if (champs.prix !== undefined && champs.prix !== null) connu.push(`Prix unitaire : **${champs.prix.toLocaleString("fr-FR")} Ar**`);
      const labels = { description: "l'article", quantite: "la quantité", prix: "le prix unitaire" };
      let rep = `💰 **Création de dépense en cours...**\n`;
      if (connu.length > 0) rep += `\n✅ Déjà noté :\n${connu.map(c => `  • ${c}`).join("\n")}\n`;
      rep += `\n❓ Il me manque : **${manquants.map(m => labels[m]).join(" et ")}**.`;
      return rep;
    }

    case "attribution_manque": {
      const { champs, manquants } = commande;
      const connu = [];
      if (champs.logement) connu.push(`Logement : **${champs.logement.id}**`);
      if (champs.service) connu.push(`Service : **${champs.service.name || champs.service.nom}**`);
      const labels = { logement: "le logement", service: "le service" };
      let rep = `🏠 **Attribution en cours...**\n`;
      if (connu.length > 0) rep += `\n✅ Déjà noté :\n${connu.map(c => `  • ${c}`).join("\n")}\n`;
      rep += `\n❓ Il me manque : **${manquants.map(m => labels[m]).join(" et ")}**.`;
      return rep;
    }

    case "erreur":
      return `❌ ${commande.message}`;

    case "inconnu":
    default:
      return `🤔 Commande non reconnue.\n\nEssayez :\n• \`stock\` — voir les matériaux\n• \`logements disponibles\`\n• \`sortie 5 toles logement 12\`\n• \`met logement 5 en maintenance avec 10 toles\`\n• \`aide\` — toutes les commandes`;
  }
}

// ── Composant principal ───────────────────────────────────────────────────────
export default function Logi() {
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis **Logi**, votre assistant de gestion immobilière et RH.\n\nToutes les commandes sont accessibles dans n'importe quel ordre :\n\n• `stock` — voir les matériaux\n• `logements disponibles`\n• `sortie 11 toles logement 5`\n• `met logement 3 en maintenance avec 10 toles`\n• `ajouter employé Jean Rakoto au service RH`\n• `désactiver employé Jean Rakoto`\n• `aide` — toutes les commandes",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const contexte = useApp();
  const {
    demarrerMaintenance, commencerReparation, terminerReparation, ajouterDepense, ajouterAttribution,
    ajouterEmployeService, desactiverEmploye, reactiverEmploye,
  } = contexte;
  const actions = {
    demarrerMaintenance, commencerReparation, terminerReparation, ajouterDepense, ajouterAttribution,
    ajouterEmployeService, desactiverEmploye, reactiverEmploye,
  };
  const [enAttente, setEnAttente] = useState(null); // { type: "creation_employe" | "desactivation_employe", champs/cible }

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => { if (ouvert) setTimeout(() => inputRef.current?.focus(), 100); }, [ouvert]);

  const envoyerMessage = async () => {
    if (!input.trim() || loading) return;
    const texte = input.trim();
    setInput("");
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: texte }]);

    try {
      // Contexte frais à chaque appel
      const contexteActuel = {
        logements: contexte.logements,
        materiaux: contexte.materiaux,
        departements: contexte.departements,
        attributions: contexte.attributions,
        alertesBesoins: contexte.alertesBesoins,
        depenses: contexte.depenses,
      };
      let commande;

      if (enAttente && /\b(annuler|annule|stop|laisse tomber|abandonner?)\b/i.test(texte)) {
        setEnAttente(null);
        setMessages(prev => [...prev, { role: "assistant", content: "❎ Action annulée." }]);
        setLoading(false);
        return;
      }

      if (enAttente?.type === "creation_employe") {
        let nouveaux = extraireChampsEmploye(texte, contexteActuel.departements);
        let champs = fusionnerChampsEmploye(enAttente.champs, nouveaux);
        // Si prénom/nom toujours manquant et que le message est court (2-3 mots simples), le traiter comme un nom
        if ((!champs.prenom || !champs.nom)) {
          const mots = texte.trim().split(/\s+/).filter(Boolean);
          if (mots.length >= 2 && mots.length <= 4 && !/\d/.test(texte)) {
            champs.prenom = capitaliser(mots[0]);
            champs.nom = capitaliser(mots.slice(1).join(" "));
          }
        }
        // Si service toujours manquant et le message ressemble à un seul nom de service
        if (!champs.serviceObj && !nouveaux.serviceObj) {
          const service = trouverService(texte, contexteActuel.departements);
          if (service) champs.serviceObj = service;
        }
        const manquants = champsManquantsEmploye(champs);
        if (manquants.length > 0) {
          setEnAttente({ type: "creation_employe", champs });
          commande = { type: "creation_employe_manque", champs, manquants };
        } else {
          setEnAttente(null);
          commande = { type: "creation_employe", champs };
        }
      } else if (enAttente?.type === "desactivation_employe") {
        const motif = trouverMotif(texte);
        if (!motif) {
          commande = { type: "desactivation_employe_manque_motif", cible: enAttente.cible };
        } else {
          setEnAttente(null);
          commande = { type: "desactivation_employe", cible: enAttente.cible, motif };
        }
      } else if (enAttente?.type === "sortie_stock") {
        let nouveaux = extraireChampsSortie(texte, contexteActuel.materiaux, contexteActuel.logements);
        let champs = { ...enAttente.champs, ...nouveaux };
        // Fallback : si un seul champ manquait avant ce message, interpréter le texte brut pour ce champ
        const manquantsAvant = champsManquantsSortie(enAttente.champs);
        if (manquantsAvant.length === 1 && Object.keys(nouveaux).length === 0) {
          const champUnique = manquantsAvant[0];
          if (champUnique === "quantite" && /^\d+(?:[.,]\d+)?$/.test(texte.trim()))
            champs.quantite = parseFloat(texte.trim().replace(",", "."));
          else if (champUnique === "logement") {
            const log = trouverLogement(texte.trim(), contexteActuel.logements);
            if (log) champs.logement = log;
          } else if (champUnique === "materiau") {
            const mat = trouverMateriau(texte.trim(), contexteActuel.materiaux);
            if (mat) champs.materiau = mat;
          }
        }
        const manquants = champsManquantsSortie(champs);
        if (manquants.length > 0) {
          setEnAttente({ type: "sortie_stock", champs });
          commande = { type: "sortie_stock_manque", champs, manquants };
        } else {
          setEnAttente(null);
          commande = { type: "sortie_stock", materiau: champs.materiau, quantite: champs.quantite, logement: champs.logement };
        }
      } else if (enAttente?.type === "creer_depense") {
        let nouveaux = extraireChampsDepense(texte, contexteActuel.materiaux, contexteActuel.logements);
        let champs = { ...enAttente.champs, ...nouveaux };
        const manquantsAvant = champsManquantsDepense(enAttente.champs);
        if (manquantsAvant.length === 1 && Object.keys(nouveaux).length === 0) {
          const champUnique = manquantsAvant[0];
          if (champUnique === "quantite" && /^\d+(?:[.,]\d+)?$/.test(texte.trim()))
            champs.quantite = parseFloat(texte.trim().replace(",", "."));
          else if (champUnique === "prix" && /^\d+$/.test(texte.trim()))
            champs.prix = parseInt(texte.trim());
          else if (champUnique === "description") {
            const mat = trouverMateriau(texte.trim(), contexteActuel.materiaux);
            champs.description = mat?.nom || capitaliser(texte.trim());
            if (mat) champs.mat = mat;
          }
        }
        const manquants = champsManquantsDepense(champs);
        if (manquants.length > 0) {
          setEnAttente({ type: "creer_depense", champs });
          commande = { type: "creer_depense_manque", champs, manquants };
        } else {
          setEnAttente(null);
          commande = { type: "creer_depense", materiauNom: champs.description, quantite: champs.quantite, prix: champs.prix, mat: champs.mat, logement: champs.logement };
        }
      } else if (enAttente?.type === "attribution") {
        let nouveaux = extraireChampsAttribution(texte, contexteActuel.logements, contexteActuel.departements);
        let champs = { ...enAttente.champs, ...nouveaux };
        const manquantsAvant = champsManquantsAttribution(enAttente.champs);
        if (manquantsAvant.length === 1 && Object.keys(nouveaux).length === 0) {
          const champUnique = manquantsAvant[0];
          if (champUnique === "logement") {
            const log = trouverLogement(texte.trim(), contexteActuel.logements);
            if (log) champs.logement = log;
          } else if (champUnique === "service") {
            const service = trouverService(texte.trim(), contexteActuel.departements);
            if (service) champs.service = service;
          }
        }
        const manquants = champsManquantsAttribution(champs);
        if (manquants.length > 0) {
          setEnAttente({ type: "attribution", champs });
          commande = { type: "attribution_manque", champs, manquants };
        } else {
          setEnAttente(null);
          commande = { type: "attribuer_logement", logement: champs.logement, service: champs.service };
        }
      } else {
        commande = parseCommande(texte, contexteActuel);
        if (commande.type === "creation_employe_manque") setEnAttente({ type: "creation_employe", champs: commande.champs });
        else if (commande.type === "desactivation_employe_manque_motif") setEnAttente({ type: "desactivation_employe", cible: commande.cible });
        else if (commande.type === "sortie_stock_manque") setEnAttente({ type: "sortie_stock", champs: commande.champs });
        else if (commande.type === "creer_depense_manque") setEnAttente({ type: "creer_depense", champs: commande.champs });
        else if (commande.type === "attribution_manque") setEnAttente({ type: "attribution", champs: commande.champs });
      }

      const reponse = await executerCommande(commande, contexteActuel, actions);
      setMessages(prev => [...prev, { role: "assistant", content: reponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: `❌ Erreur inattendue : ${err.message || "Réessayez."}` }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); envoyerMessage(); }
  };

  const suggestions = ["stock", "logements", "employés", "alertes", "stats", "aide"];

  const renderContent = (content) =>
    (content || "").split("\n").map((line, j) => {
      if (!line) return <br key={j} />;
      const html = line
        .replace(/\*\*(.+?)\*\*/g, "<strong style='color:#fde68a'>$1</strong>")
        .replace(/`(.+?)`/g, "<code style='background:rgba(201,168,76,0.2);padding:1px 4px;border-radius:3px;font-family:monospace;font-size:0.85em'>$1</code>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");
      const isBullet = line.startsWith("•") || line.startsWith("-") || line.startsWith("  •");
      return (
        <div key={j} className={isBullet ? "flex gap-1 items-start" : ""}>
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      );
    });

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOuvert(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg, #0F2D56 0%, #1a4a7a 50%, #C9A84C 100%)" }}
        title="Logi — Assistant"
      >
        <div className="text-white">{ouvert ? <CloseIcon /> : <BotIcon />}</div>
        {!ouvert && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Fenêtre */}
      {ouvert && (
        <div
          className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: "560px",
            background: "linear-gradient(180deg, #0a1929 0%, #0F2D56 100%)",
            border: "1px solid rgba(26,74,122,0.6)",
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ borderBottom: "1px solid rgba(26,74,122,0.4)", background: "rgba(15,45,86,0.8)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #0F2D56, #C9A84C)" }}
            >
              <BotIcon />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Logi</div>
              <div className="text-blue-300 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                Prêt — commandes libres
              </div>
            </div>
            <button onClick={() => setOuvert(false)} className="ml-auto text-blue-300 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[90%] px-3 py-2 text-sm leading-relaxed"
                  style={{
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #C9A84C, #b8942a)"
                      : "rgba(26,74,122,0.5)",
                    border: msg.role === "assistant" ? "1px solid rgba(201,168,76,0.2)" : "none",
                    borderRadius: msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                    color: msg.role === "user" ? "white" : "#bfdbfe",
                  }}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-2xl text-blue-300 text-sm flex items-center gap-2"
                  style={{ background: "rgba(26,74,122,0.4)" }}
                >
                  <SpinIcon /><span>Traitement...</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => { setInput(s); inputRef.current?.focus(); }}
                className="flex-shrink-0 text-xs px-2 py-1 rounded-lg text-blue-200 hover:text-white transition-colors whitespace-nowrap"
                style={{ background: "rgba(26,74,122,0.4)", border: "1px solid rgba(26,74,122,0.6)" }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-3 flex gap-2"
            style={{ borderTop: "1px solid rgba(26,74,122,0.4)", background: "rgba(10,25,41,0.8)" }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ex: sortie 11 toles logement 5..."
              disabled={loading}
              className="flex-1 bg-transparent text-white text-sm placeholder-blue-400/60 outline-none"
            />
            <button
              onClick={envoyerMessage}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white disabled:opacity-40 transition-all hover:scale-110"
              style={{ background: "linear-gradient(135deg, #C9A84C, #1a4a7a)" }}
            >
              {loading ? <SpinIcon /> : <SendIcon />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}