// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setError("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EDEBE6] dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Créer un compte</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom d'utilisateur" value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" required />
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" required />
          <input type="password" placeholder="Mot de passe" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" required />
          <input type="password" placeholder="Confirmer le mot de passe" value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })}
            className="w-full border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white" required />
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Déjà un compte ? <Link to="/login" className="text-blue-600 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}