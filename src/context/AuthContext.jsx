import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API = "https://spat-backend.onrender.com/api";

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`${API}/auth/me/`)
        .then(res => setUser(res.data))
        .catch(() => { localStorage.removeItem("access_token"); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/auth/token/`, { username, password });
    const { access, refresh } = res.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const me = await axios.get(`${API}/auth/me/`);
    setUser(me.data);
  };

  const register = async (username, email, password) => {
    await axios.post(`${API}/auth/register/`, { username, email, password });
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
    if (file)       formData.append("avatar", file);

    const res = await axios.patch(`${API}/auth/update-profil/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Met à jour l'utilisateur local
    setUser(prev => ({
      ...prev,
      avatar_url:  res.data.avatar_url,
      avatar_type: res.data.avatar_type,
    }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfil }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}