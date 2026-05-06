import Loading from "@/components/Loading";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "user" | "agent" | "admin";

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
  const { user, token, isLoading, isLoggingOut } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const hasShownToast = useRef(false);

  const isIntentionalLogout = location.state?.loggedOut === true;

  useEffect(() => {
    if (isLoading || hasShownToast.current) return;

    if (isLoggingOut) return;

    // Not authenticated at all
    if (!user || !token) {
      if (!isIntentionalLogout) {
        hasShownToast.current = true;
        toast.error("Please login to access this page");

        // delay navigation
        setTimeout(() => {
          navigate("/login", {
            replace: true,
            state: { from: location.pathname },
          });
        }, 3000);
      }
      return;
    }

    // Not verified
    if (!user.isVerified) {
      hasShownToast.current = true;
      toast.warning("Please verify your email to continue");
      // delay navigation
      setTimeout(() => {
        navigate("/verify-email", {
          replace: true,
          state: { email: user.email, from: "login" },
        });
      }, 3000);
      return;
    }

    // Check if user has the required role
    if (!allowedRoles.includes(user.role as UserRole)) {
      hasShownToast.current = true;
      toast.error("You don't have permission to access this page");
      // delay navigation
      setTimeout(() => {
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
      }, 3000);
      return;
    }
  }, [
    user,
    token,
    isLoading,
    isLoggingOut,
    navigate,
    location.pathname,
    allowedRoles,
    isIntentionalLogout,
  ]);

  if (isLoading || isLoggingOut) return <Loading />;

  // Don't render if redirecting
  if (
    !user ||
    !token ||
    !user.isVerified ||
    !allowedRoles.includes(user.role as UserRole)
  ) {
    return null;
  }

  return <Outlet />;
}
