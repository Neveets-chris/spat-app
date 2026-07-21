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

  // ── VOIR SERVICES ─────────────────────────────────────────────────────────
  if (/\b(services?|employes?|sans logement|besoin logement)\b/.test(t))
    return { type: "voir_services" };

  // ── VOIR ALERTES ──────────────────────────────────────────────────────────
  if (/\b(alertes?|besoins? (en attente|logement))\b/.test(t))
    return { type: "voir_alertes" };

  // ── VOIR DEPENSES ─────────────────────────────────────────────────────────
  if (/\b(depenses?|achats?|factures?)\b/.test(t) && !/creer|ajouter|nouvelle|achet/.test(t))
    return { type: "voir_depenses" };

  // ── SORTIE DE STOCK ───────────────────────────────────────────────────────
  // Patterns : "sortie 5 toles logement 12" / "retirer 3 ciment du logement 4"
  //            "sors 11 toles pour log 12" / "utiliser 2 ciment logement 3"
  const sortiePatterns = [
    /(?:sortie|retirer?|enlever?|prendre|utiliser?|sors?|prelever?)\s+(?:de\s+)?(\d+(?:[.,]\d+)?)\s+(.+?)\s+(?:pour|du|de|au|dans|logement|log)\s+(?:logement\s+)?(\w+)/,
    /(?:sortie|retirer?|enlever?)\s+(\d+(?:[.,]\d+)?)\s+(.+?)\s+(\d+)/,
  ];
  for (const pattern of sortiePatterns) {
    const m = t.match(pattern);
    if (m) {
      const quantite = parseFloat(m[1].replace(",", "."));
      const materiauNom = m[2].trim();
      const logRef = m[3].trim();
      const mat = trouverMateriau(materiauNom, materiaux);
      const log = trouverLogement(logRef, logements);
      if (!mat) return { type: "erreur", message: `Matériau "${materiauNom}" introuvable.\nDisponibles : ${materiaux.map(m => m.nom).join(", ")}` };
      if (!log) return { type: "erreur", message: `Logement "${logRef}" introuvable.` };
      return { type: "sortie_stock", materiau: mat, quantite, logement: log };
    }
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
  const depMatch = t.match(/(?:creer?|ajouter?|nouvelle?|achet(?:er?|e)|achat)\s+(?:depense\s+)?(?:de\s+)?(\d+)\s+(.+?)\s+(?:a|au prix|pour|a|@)?\s*(\d+)/);
  if (depMatch) {
    const quantite = parseInt(depMatch[1]);
    const nomBrut = depMatch[2].trim().replace(/\s+(ar|ariary|fmg).*$/, "");
    const prix = parseInt(depMatch[3]);
    const mat = trouverMateriau(nomBrut, materiaux);
    return { type: "creer_depense", materiauNom: mat?.nom || nomBrut, quantite, prix, mat };
  }

  // ── ATTRIBUTION ───────────────────────────────────────────────────────────
  const attMatch = t.match(/(?:attribuer?|donner?|affecter?|assigner?)\s+(?:le\s+)?(?:logement\s+)?(\w+)\s+(?:au?|pour|a)\s+(?:service\s+)?(.+)/);
  if (attMatch) {
    const log = trouverLogement(attMatch[1], logements);
    const serviceNom = attMatch[2].trim();
    const service = trouverService(serviceNom, departements);
    if (!log) return { type: "erreur", message: `Logement "${attMatch[1]}" introuvable.` };
    if (!service) return { type: "erreur", message: `Service "${serviceNom}" introuvable.` };
    return { type: "attribuer_logement", logement: log, service };
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

      // Vérifications
      if (materiau.stock < quantite)
        return `❌ Stock insuffisant pour **${materiau.nom}** : seulement **${materiau.stock} ${materiau.unite}** disponibles.\nVous demandez : ${quantite} ${materiau.unite}.`;

      if (logement.statut !== "Maintenance" && logement.statut !== "EN_REPARATION")
        return `⚠️ Logement **${logement.id}** n'est pas en maintenance (statut actuel : **${logement.statut}**).\nSortie de stock possible uniquement pour un logement en maintenance.`;

      // Vérifier que le matériau est dans les besoins du logement
      const besoins = logement.besoinsMaintenance || [];
      const besoin = besoins.find(b => norm(b.nom) === norm(materiau.nom));
      const sortis = logement.materiauxSortis || [];
      const dejaSorti = sortis.find(s => norm(s.nom) === norm(materiau.nom))?.quantiteSortie || 0;

      if (besoin) {
        const restant = besoin.quantite - dejaSorti;
        if (restant <= 0)
          return `ℹ️ La quantité requise de **${materiau.nom}** a déjà été sortie pour le logement **${logement.id}**.`;
        if (quantite > restant)
          return `⚠️ Le logement **${logement.id}** n'a besoin que de **${restant} ${materiau.unite}** de ${materiau.nom} (${dejaSorti} déjà sortis sur ${besoin.quantite} requis).\nVoulez-vous sortir ${restant} à la place ?`;
      }

      try {
        await api.sortieStock(materiau.id, {
          quantite,
          logement_ref: String(logement.id),
        });
        const stockApres = materiau.stock - quantite;
        let rep = `✅ **Sortie effectuée :**\n`;
        rep += `• Matériau : **${materiau.nom}**\n`;
        rep += `• Quantité sortie : **${quantite} ${materiau.unite}**\n`;
        rep += `• Logement : **${logement.id} — ${logement.type}**\n`;
        rep += `• Stock restant : **${stockApres} ${materiau.unite}**`;
        if (besoin) {
          const totalSorti = dejaSorti + quantite;
          const complet = totalSorti >= besoin.quantite;
          rep += `\n• Besoin logement : ${totalSorti}/${besoin.quantite} ${complet ? "✅ complet" : "⏳ en cours"}`;
        }
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
        });
        const total = (commande.quantite * (commande.prix || 0)).toLocaleString("fr-FR");
        return `✅ **Dépense créée :**\n• Article : **${commande.materiauNom}** × ${commande.quantite}\n• Prix unitaire : ${(commande.prix || 0).toLocaleString("fr-FR")} Ar\n• Total : **${total} Ar**\n• Statut : ⏳ En attente de validation`;
      } catch (e) {
        return `❌ Erreur création dépense : ${e.response?.data ? JSON.stringify(e.response.data) : e.message}`;
      }
    }

    case "attribuer_logement": {
      const { logement, service } = commande;
      if (logement.statut !== "Disponible")
        return `⚠️ Logement **${logement.id}** n'est pas disponible (statut : **${logement.statut}**).`;
      try {
        await actions.ajouterAttribution({
          logement: logement.id,
          service_id: service.id,
          departement: service.departement?.nom || service.depNom || "",
          statut: "Occupé",
          date_debut: new Date().toISOString().split("T")[0],
        });
        return `✅ Logement **${logement.id} — ${logement.type}** attribué au service **${service.name || service.nom}** (${service.departement?.nom || service.depNom}).`;
      } catch (e) {
        return `❌ Erreur attribution : ${e.response?.data?.detail || e.message || "Impossible."}`;
      }
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
      content: "Bonjour ! Je suis **Logi**, votre assistant de gestion immobilière.\n\nToutes les commandes sont accessibles dans n'importe quel ordre :\n\n• `stock` — voir les matériaux\n• `logements disponibles`\n• `sortie 11 toles logement 5`\n• `met logement 3 en maintenance avec 10 toles`\n• `aide` — toutes les commandes",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const contexte = useApp();
  const { demarrerMaintenance, commencerReparation, terminerReparation, ajouterDepense, ajouterAttribution } = contexte;
  const actions = { demarrerMaintenance, commencerReparation, terminerReparation, ajouterDepense, ajouterAttribution };

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
      const commande = parseCommande(texte, contexteActuel);
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

  const suggestions = ["stock", "logements", "alertes", "stats", "aide"];

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