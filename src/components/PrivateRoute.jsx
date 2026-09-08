
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * onlyRole="employe"    -> réservé à l'espace employé (redirige les
 *                          comptes back-office vers /dashboard)
 * onlyRole="backoffice" -> réservé au back-office (redirige les comptes
 *                          employé vers /espace-employe)
 * onlyRole absent       -> juste "connecté ou pas" (comportement d'origine)
 */
export default function PrivateRoute({ children, onlyRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center h-screen">Chargement...</div>;
  if (!user) return <Navigate to="/login" replace />;

  const estEmploye = user.role === "employe";
  if (onlyRole === "employe" && !estEmploye) {
    return <Navigate to="/dashboard" replace />;
  }
  if (onlyRole === "backoffice" && estEmploye) {
    return <Navigate to="/espace-employe" replace />;
  }

  return children;
}