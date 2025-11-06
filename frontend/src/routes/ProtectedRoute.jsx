import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // If not logged in, redirect to login
  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
