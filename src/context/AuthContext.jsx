import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api";

const AuthContext = createContext(null);

const API = "http://localhost:8000/api";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(`${API}/auth/me/`)
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("access_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Statut "en ligne" (façon Facebook) : tant que l'utilisateur a l'app
  // ouverte, on envoie un ping toutes les 20s pour marquer sa présence.
  // Pas de websocket : quand les pings s'arrêtent (fermeture d'onglet,
  // déconnexion...), les autres le voient redevenir "hors ligne" au fur
  // et à mesure que son dernier ping vieillit — calculé côté frontend.
  // Important : on passe par api.heartbeat() (donc par axiosInstance,
  // cf. api.js), qui rafraîchit automatiquement le token expiré — un
  // axios.post() brut ici resterait bloqué en 401 en boucle sans jamais
  // se reconnecter.
  useEffect(() => {
    if (!user) return;
    const envoyerHeartbeat = () => {
      api.heartbeat().catch(() => {});
    };
    envoyerHeartbeat();
    const interval = setInterval(envoyerHeartbeat, 20000);
    return () => clearInterval(interval);
  }, [user]);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/auth/token/`, { username, password });
    const { access, refresh } = res.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const me = await axios.get(`${API}/auth/me/`);
    setUser(me.data);
    return me.data;
  };

  const register = async (username, email, password) => {
    await axios.post(`${API}/auth/register/`, { username, email, password });
    await login(username, password);
  };

  const registerEmploye = async (matricule, codeInscription, username, password) => {
    await axios.post(`${API}/auth/register-employe/`, {
      matricule,
      code_inscription: codeInscription,
      username,
      password,
    });
    await login(username, password);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // Met à jour le type d'avatar OU la photo de profil
  const updateProfil = async ({ avatarType, file }) => {
    const formData = new FormData();
    if (avatarType) formData.append("avatar_type", avatarType);
    if (file) formData.append("avatar", file);

    const res = await axios.patch(`${API}/auth/update-profil/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Met à jour l'utilisateur local
    setUser((prev) => ({
      ...prev,
      avatar_url: res.data.avatar_url,
      avatar_type: res.data.avatar_type,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, registerEmploye, logout, updateProfil }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}