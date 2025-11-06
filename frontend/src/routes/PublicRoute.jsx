import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // If already logged in, redirect to home
  if (user || token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
