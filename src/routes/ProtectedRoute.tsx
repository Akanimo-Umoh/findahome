import { useAuthContext } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, token, isLoading } = useAuthContext();
  const location = useLocation();

  // wait until auth state is loaded
  if (isLoading) return null;

  if (!user || !token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // check if user is not verified
  if (!user.verified) {
    return <Navigate to="/verify-email" replace />;
  }

  // render the nested route if everything is okay
  return <Outlet />;
}
