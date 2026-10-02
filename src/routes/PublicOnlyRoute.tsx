import { useAuthContext } from "@/context/AuthContext"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { onboardingRedirect } from "./onboarding"

/**
 * PublicOnlyRoute - Allows access only to non-authenticated users
 * Redirects authenticated users to their intended destination or dashboard
 */
export default function PublicOnlyRoute() {
  const { user, token, isLoading } = useAuthContext()
  const location = useLocation()

  if (isLoading) {
    return null // or <LoadingSpinner />
  }

  // If user is authenticated and verified, redirect them
  if (user && token && user.isVerified) {
    // Check for return URL from location state (from protected routes)
    const returnUrl = location.state?.from || location.state?.returnUrl

    // not onboarded yet: send agents and buyers to their onboarding page
    const onboardingTarget = onboardingRedirect(user, location.pathname)
    if (onboardingTarget) {
      return <Navigate to={onboardingTarget} replace />
    }

    if (returnUrl) {
      return <Navigate to={returnUrl} replace />
    }

    // No return URL, redirect to role-based dashboard
    switch (user.role) {
      case "user":
        return <Navigate to="/" replace />
      case "agent":
        return <Navigate to="/agent/dashboard" replace />
      case "admin":
        return <Navigate to="/admin/dashboard" replace />
      default:
        return <Navigate to="/" replace />
    }
  }

  return <Outlet />
}
