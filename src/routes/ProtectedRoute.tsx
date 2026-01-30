import { useAuthContext } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, token, isLoading } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  // wait until auth state is loaded
  useEffect(() => {
    if (isLoading) return;

    if (!user || !token) {
      // redirect to login if not authenticated
      navigate("/login", { replace: true, state: { from: location.pathname } });
      return;
    }

    if (!user.isVerified) {
      // redirect to verify-email with proper state
      navigate("/verify-email", {
        replace: true,
        state: { email: user.email, from: "login" },
      });
      return;
    }
    // if user is authenticated and verified, allow access
  }, [user, token, isLoading, navigate, location.pathname]);

  if (isLoading) return null;

  // don't render anything if redirecting
  if (!user || !token || !user.isVerified) return null;

  // render the nested route if everything is okay
  return <Outlet />;
}
