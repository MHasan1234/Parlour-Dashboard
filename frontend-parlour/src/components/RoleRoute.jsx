import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowed, children }) => {
  const { role } = useAuth();

  const normalizedRole = role?.toLowerCase().replace("-", "");
  const normalizedAllowed = allowed.map(r => r.toLowerCase().replace("-", ""));

  return normalizedAllowed.includes(normalizedRole)
    ? children
    : <Navigate to="/dashboard" />;
};

export default RoleRoute;
