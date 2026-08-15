import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise = null;

function performRefresh() {
  if (!refreshPromise) {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) {
      return Promise.reject(new Error("no_refresh_token"));
    }
    refreshPromise = axios
      .post(`${BASE_URL}/auth/token/refresh/`, { refresh })
      .then((res) => {
        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);
        if (res.data.refresh) {
          localStorage.setItem("refresh_token", res.data.refresh);
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        return newAccess;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const newAccess = await performRefresh();
        original.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(original);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const request = async (method, endpoint, body = null) => {
  const config = { method, url: endpoint };
  if (body) config.data = body;
  const res = await axiosInstance(config);
  return res.data;
};

export const api = {
  // Départements
  getDepartements: () => request("GET", "/employes/departements/"),
  creerDepartement: (data) => request("POST", "/employes/departements/", data),
  modifierDepartement: (id, data) => request("PUT", `/employes/departements/${id}/`, data),
  supprimerDepartement: (id) => request("DELETE", `/employes/departements/${id}/`),

  //Services 
  getServices: (departementId) => request("GET", `/employes/services/?departement=${departementId}`),
  creerService: (data) => request("POST", "/employes/services/", data),
  modifierService: (id, data) => request("PUT", `/employes/services/${id}/`, data),
  supprimerService: (id) => request("DELETE", `/employes/services/${id}/`),

  // Employés
  getEmployes: (serviceId) => request("GET", `/employes/employes/?service=${serviceId}`),
  creerEmploye: (data) => request("POST", "/employes/employes/", data),
  modifierEmploye: (id, data) => request("PUT", `/employes/employes/${id}/`, data),
  supprimerEmploye: (id) => request("DELETE", `/employes/employes/${id}/`),
  desactiverEmploye: (id, motifLabel, motifType) =>
    request("POST", `/employes/employes/${id}/desactiver/`, { motif_label: motifLabel, motif_type: motifType }),
  reactiverEmploye: (id) => request("POST", `/employes/employes/${id}/reactiver/`),

  // Logements 
  getLogements: (params = "") => request("GET", `/logi/logements/${params}`),
  creerLogement: (data) => request("POST", "/logi/logements/", data),
  modifierLogement: (id, data) => request("PUT", `/logi/logements/${id}/`, data),
  supprimerLogement: (id) => request("DELETE", `/logi/logements/${id}/`),
  demarrerMaintenance: (id, data) => request("POST", `/logi/logements/${id}/demarrer_maintenance/`, data),
  commencerReparation: (id, data) => request("POST", `/logi/logements/${id}/commencer_reparation/`, data),
  terminerReparation: (id) => request("POST", `/logi/logements/${id}/terminer_reparation/`),
  getStatsLogements: () => request("GET", "/logi/logements/stats/"),

  // Attributions
  getAttributions: (params = "") => request("GET", `/logi/attributions/${params}`),
  creerAttribution: (data) => request("POST", "/logi/attributions/", data),
  modifierAttribution: (id, data) => request("PUT", `/logi/attributions/${id}/`, data),
  supprimerAttribution: (id) => request("DELETE", `/logi/attributions/${id}/`),
  terminerAttribution: (id) => request("POST", `/logi/attributions/${id}/terminer/`),
  synchroniserOccupants: (id, occupants) => request("POST", `/logi/attributions/${id}/modifier_occupants/`, { occupants }),
  modifierOccupantsAttribution: (id, occupants) => request("POST", `/logi/attributions/${id}/modifier_occupants/`, { occupants }),
  passageMaintenance: (id) => request("POST", `/logi/attributions/${id}/passage_maintenance/`),
  marquerRepare: (id, data) => request("POST", `/logi/attributions/${id}/marquer_repare/`, data),
  demenagementTemporaire: (data) => request("POST", "/logi/attributions/demenagement_temporaire/", data),
  getStatsAttributions: () => request("GET", "/logi/attributions/stats/"),

  //  Alertes de Besoins 
  getAlertes: (params = "") => request("GET", `/logi/alertes/${params}`),
  creerAlerte: (data) => request("POST", "/logi/alertes/", data),
  modifierAlerte: (id, data) => request("PUT", `/logi/alertes/${id}/`, data),
  supprimerAlerte: (id) => request("DELETE", `/logi/alertes/${id}/`),
  resoudreAlerte: (id, logementId) => request("POST", `/logi/alertes/${id}/resoudre/`, { logement_id: logementId }),
  annulerAlerte: (id) => request("POST", `/logi/alertes/${id}/annuler/`),
  mettreAJourEmployesAlerte: (id, employesActifs) =>
    request("POST", `/logi/alertes/${id}/mettre_a_jour_employes/`, { employes_actifs: employesActifs }),

  //Historique RH 
  getHistorique: (action = "") =>
    request("GET", `/employes/historique-rh/${action ? `?action=${action}` : ""}`),
  ajouterHistorique: (payload) => request("POST", "/employes/historique-rh/", payload),

  // Matériaux (Stock)
getMateriaux:       (params = "") => request("GET",    `/stock/materiaux/${params}`),
creerMateriau:      (data)        => request("POST",   "/stock/materiaux/", data),
modifierMateriau:   (id, data)    => request("PUT",    `/stock/materiaux/${id}/`, data),
supprimerMateriau:  (id)          => request("DELETE", `/stock/materiaux/${id}/`),
sortieStock:        (id, data)    => request("POST",   `/stock/materiaux/${id}/sortie/`, data),
getStatsMateriaux:  ()            => request("GET",    "/stock/materiaux/stats/"),
 
//Mouvements de stock 
getMouvements:         (params = "") => request("GET",  `/stock/mouvements/${params}`),
creerMouvement:        (data)        => request("POST", "/stock/mouvements/", data),
receptionnerMouvement: (id)          => request("POST", `/stock/mouvements/${id}/receptionner/`),
 
//Besoins de maintenance 
getBesoins:              (params = "") => request("GET",    `/stock/besoins/${params}`),
supprimerBesoin:         (id)          => request("DELETE", `/stock/besoins/${id}/`),

creerBesoinsParLogement: (data)        => request("POST",   "/stock/besoins/par_logement/", data),
effacerBesoinsLogement:  (logementRef) => request("POST",   "/stock/besoins/effacer_logement/", { logement_ref: logementRef }),
// Dropdown pour Depense.jsx :
getBesoinsDropdown:      (logement = "") =>
  request("GET", `/stock/besoins/dropdown_depense/${logement ? `?logement=${logement}` : ""}`),
 
//Dépenses
getDepenses:          (params = "") => request("GET",    `/depense/depenses/${params}`),
creerDepense:         (data)        => request("POST",   "/depense/depenses/", data),
modifierDepense:      (id, data)    => request("PUT",    `/depense/depenses/${id}/`, data),
supprimerDepense:     (id)          => request("DELETE", `/depense/depenses/${id}/`),
validerDepense:       (id)          => request("POST",   `/depense/depenses/${id}/valider/`),
rejeterDepense:       (id)          => request("POST",   `/depense/depenses/${id}/rejeter/`),
receptionnerDepense:  (id)          => request("POST",   `/depense/depenses/${id}/receptionner/`),
getStatsDepenses:     ()            => request("GET",    "/depense/depenses/stats/"),
// Dropdown besoins pour Depense.jsx :
getBesoinsMaintenanceDepense: (logement = "") =>
  request("GET", `/depense/depenses/dropdown_besoins/${logement ? `?logement=${logement}` : ""}`),
 
};