import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

/**
 * VerificationRoute - Protects the email verification page
 *
 * Access rules:
 * 1. If user is authenticated AND verified → redirect to dashboard (already verified)
 * 2. If user is authenticated BUT unverified → allow access (needs to verify)
 * 3. If user is NOT authenticated BUT has email AND valid 'from' → allow access (just signed up/logged in)
 * 4. If user is NOT authenticated AND (no email OR invalid 'from') → redirect to signup (shouldn't be here)
 */
export default function VerificationRoute() {
  const { user, isAuthenticated } = useAuthContext();
  const location = useLocation();
  const state = location.state as { email?: string; from?: string } | null;
  const email = state?.email;
  const from = state?.from;

  // Case 1: Authenticated user who is already verified
  if (isAuthenticated && user?.verified) {
    return <Navigate to="/dashboard" replace />;
  }

  // Case 2: Authenticated user who is unverified (e.g., came back after login)
  if (isAuthenticated && !user?.verified) {
    return <Outlet />;
  }

  // Case 3: Not authenticated but has email AND came from valid source
  // Valid sources: 'signup', 'login', 'google-auth'
  const validSources = ["signup", "login", "google-auth"];
  if (!isAuthenticated && email && from && validSources.includes(from)) {
    return <Outlet />;
  }

  // Case 4: Not authenticated and either no email or invalid source - shouldn't be here
  return <Navigate to="/signup" replace />;
}
