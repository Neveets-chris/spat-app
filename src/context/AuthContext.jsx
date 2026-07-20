import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API = "http://localhost:8000/api";

// ── Interceptor refresh token — déclaré UNE SEULE FOIS au niveau module ───────
let isRefreshing = false;
let failedQueue  = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
  failedQueue = [];
};

axios.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;

    // Ne pas intercepter les appels de refresh eux-mêmes
    if (original.url?.includes("/auth/token/refresh/")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !original._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          original.headers["Authorization"] = `Bearer ${token}`;
          return axios(original);
        });
      }

      original._retry = true;
      isRefreshing    = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        isRefreshing = false;
        localStorage.removeItem("access_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${API}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newToken = res.data.access;
        localStorage.setItem("access_token", newToken);

        if (res.data.refresh) {
          localStorage.setItem("refresh_token", res.data.refresh);
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        original.headers["Authorization"]              = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return axios(original);

      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.get(`${API}/auth/me/`)
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(`${API}/auth/token/`, { username, password });

    localStorage.setItem("access_token",  res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;

    // Charger le profil complet
    const me = await axios.get(`${API}/auth/me/`);
    setUser(me.data);
    return me.data;
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

  const updateProfil = async ({ avatarType, file }) => {
    const formData = new FormData();
    if (avatarType) formData.append("avatar_type", avatarType);
    if (file)       formData.append("avatar", file);

    const res = await axios.patch(`${API}/auth/update-profil/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const avatarUrl = res.data.avatar_url
      ? `${res.data.avatar_url}?t=${Date.now()}`
      : null;

    setUser(prev => ({
      ...prev,
      avatar_url:  avatarUrl,
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