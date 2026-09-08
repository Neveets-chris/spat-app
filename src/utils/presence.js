// Seuil au-delà duquel on considère que l'utilisateur n'est plus "en
// ligne" mais juste "vu récemment" — doit être un peu plus grand que
// l'intervalle du heartbeat (20s, cf. AuthContext) pour tolérer un ping
// manqué sans faire clignoter le statut à tort.
const SEUIL_EN_LIGNE_MS = 45 * 1000;

/**
 * Calcule si un employé est actuellement "en ligne" à partir de son
 * dernier heartbeat.
 */
export function estEnLigne(derniereActivite) {
  if (!derniereActivite) return false;
  const diff = Date.now() - new Date(derniereActivite).getTime();
  return diff >= 0 && diff < SEUIL_EN_LIGNE_MS;
}

/**
 * Texte façon Facebook : "En ligne", "Actif il y a 7s", "Actif il y a
 * 3 min", "Actif il y a 2h", "Actif il y a 5j", ou null si jamais connu.
 */
export function texteActivite(derniereActivite) {
  if (!derniereActivite) return "Jamais connecté(e)";
  if (estEnLigne(derniereActivite)) return "En ligne";

  const diffMs = Date.now() - new Date(derniereActivite).getTime();
  const s = Math.floor(diffMs / 1000);
  if (s < 60) return `Actif il y a ${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `Actif il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `Actif il y a ${h}h`;
  const j = Math.floor(h / 24);
  if (j < 7) return `Actif il y a ${j}j`;
  const sem = Math.floor(j / 7);
  return `Actif il y a ${sem} sem.`;
}

/**
 * Heure d'un message façon "18h30" (format FR courant, sans deux-points).
 */
export function heureMessage(date) {
  const d = new Date(date);
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${h}h${m}`;
}

/**
 * Étiquette de jour façon Messenger : "Aujourd'hui", "Hier", ou la date
 * complète ("12/06/2026") pour tout ce qui est plus ancien. Comparaison
 * sur le jour calendaire (pas un simple delta de 24h glissant), pour que
 * "hier" corresponde bien à la veille et non à "il y a entre 24 et 48h".
 */
export function libelleJourMessage(date) {
  const d = new Date(date);
  const debutJour = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
  const diffJours = Math.round((debutJour(new Date()) - debutJour(d)) / 86400000);
  if (diffJours === 0) return "Aujourd'hui";
  if (diffJours === 1) return "Hier";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/**
 * Regroupe une liste de messages (triés par date croissante) en insérant
 * un séparateur de jour avant chaque nouveau groupe de 24h calendaires —
 * exactement comme Messenger/WhatsApp. Retourne une liste plate d'items
 * { type: "separateur", label } | { type: "message", message }.
 */
export function grouperMessagesParJour(messages) {
  const items = [];
  let dernierLabel = null;
  for (const m of messages) {
    const label = libelleJourMessage(m.date_envoi);
    if (label !== dernierLabel) {
      items.push({ type: "separateur", label, key: `sep-${m.id}` });
      dernierLabel = label;
    }
    items.push({ type: "message", message: m, key: `msg-${m.id}` });
  }
  return items;
}