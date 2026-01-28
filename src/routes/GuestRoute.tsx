import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";

/**
 * GuestRoute - Protects login and signup pages from authenticated users
 * 
 * Access rules:
 * 1. If user is authenticated AND verified → redirect to dashboard
 * 2. If user is authenticated BUT unverified → redirect to verify-email
 * 3. If user is NOT authenticated → allow access to login/signup
 */
export default function GuestRoute() {
  const { user, isAuthenticated } = useAuthContext();

  // If user is authenticated, redirect based on verification status
  if (isAuthenticated && user) {
    if (user.verified) {
      // Verified user trying to access login/signup → send to dashboard
      return <Navigate to="/dashboard" replace />;
    } else {
      // Unverified user trying to access login/signup → send to verify email with proper state
      return (
        <Navigate 
          to="/verify-email" 
          state={{ email: user.email, from: 'login' }} 
          replace 
        />
      );
    }
  }

  // Not authenticated → allow access to login/signup
  return <Outlet />;
}