import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type UserRole = "user" | "agent" | "admin";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
  const { user, token, isLoading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    // Not authenticated at all
    if (!user || !token) {
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return;
    }

    // Not verified
    if (!user.isVerified) {
      navigate("/verify-email", {
        replace: true,
        state: { email: user.email, from: "login" },
      });
      return;
    }

    // Check if user has the required role
    if (!allowedRoles.includes(user.role as UserRole)) {
      // Redirect to appropriate dashboard based on role
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
          navigate("/login", { replace: true });
      }
      return;
    }
  }, [user, token, isLoading, navigate, location.pathname, allowedRoles]);

  if (isLoading) return null;

  // Don't render if redirecting
  if (!user || !token || !user.isVerified || !allowedRoles.includes(user.role as UserRole)) {
    return null;
  }

  return <Outlet />;
}
