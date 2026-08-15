import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` }
});

export function useLogements() {
  const [logements, setLogements] = useState([]);
  const [loading, setLoading]     = useState(true);

  const fetchLogements = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/logements/`, getHeaders());
      const data = res.data.map(l => ({
        id:               l.id_logement,
        type:             l.type_logement,
        localisation:     l.localisation,
        statut:           l.statut,
        capacite:         l.capacite,
        superficie:       l.superficie,
        nb_occupants_max: l.nb_occupants_max,
        _pk:              l.id,
      }));
      setLogements(data);
    } catch (err) {
      console.error("Erreur chargement logements", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogements(); }, [fetchLogements]);

  const ajouterLogement = async (l) => {
    await axios.post(`${API}/logements/`, {
      id_logement:      `LOG-${Date.now()}`,
      type_logement:    l.type,
      localisation:     l.localisation,
      statut:           l.statut,
      capacite:         l.capacite,
      superficie:       l.superficie,
      nb_occupants_max: l.nb_occupants_max,
    }, getHeaders());
    await fetchLogements();
  };

  const modifierLogement = async (l) => {
    await axios.put(`${API}/logements/${l._pk}/`, {
      id_logement:      l.id,
      type_logement:    l.type,
      localisation:     l.localisation,
      statut:           l.statut,
      capacite:         l.capacite,
      superficie:       l.superficie,
      nb_occupants_max: l.nb_occupants_max,
    }, getHeaders());
    await fetchLogements();
  };

  const supprimerLogement = async (id) => {
    const log = logements.find(l => l.id === id);
    if (!log) return;
    await axios.delete(`${API}/logements/${log._pk}/`, getHeaders());
    await fetchLogements();
  };

  return { logements, loading, ajouterLogement, modifierLogement, supprimerLogement, fetchLogements };
}