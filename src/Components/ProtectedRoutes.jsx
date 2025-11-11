
import { Navigate } from "react-router-dom";
import { useUser } from "../Components/UserContext";

function ProtectedRoute({ children, role }) {
  const { user } = useUser();

  // Still loading (undefined) → show loader
  if (user === undefined) return <div className="text-center mt-20 text-white">Loading...</div>;

  // Not logged in
  if (!user) return <Navigate to="/" replace />;

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"} replace />;
  }

  return children;
}

export default ProtectedRoute;
