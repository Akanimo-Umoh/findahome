import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/**
 * PublicOnlyRoute - Allows access only to non-authenticated users
 * Redirects authenticated users to their role-specific dashboard
 */
export default function PublicOnlyRoute() {
  const { user, token, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // If user is authenticated and verified, redirect to their dashboard
    if (user && token && user.isVerified) {
      switch (user.role) {
        case "user":
          navigate("/dashboard", { replace: true });
          break;
        case "agent":
          navigate("/agent/dashboard", { replace: true });
          break;
        case "admin":
          navigate("/admin/dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    }
  }, [user, token, isLoading, navigate]);

  if (isLoading) return null;

  // If authenticated and verified, don't render (will redirect)
  if (user && token && user.isVerified) return null;

  return <Outlet />;
}