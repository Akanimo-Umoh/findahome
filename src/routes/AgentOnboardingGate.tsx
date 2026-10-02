import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { DASHBOARD, ONBOARDING_ENTRY, onboardingRedirect } from "./onboarding"

export default function AgentOnboardingGate({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, token } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !token || !user.isVerified || user.role === "admin") return

    // not onboarded yet — force them into onboarding
    const target = onboardingRedirect(user, location.pathname)
    if (target) {
      navigate(target, { replace: true })
      return
    }

    // onboarded users can't go back to the form (the success page stays allowed)
    if (
      user.isOnboarding &&
      location.pathname === ONBOARDING_ENTRY[user.role]
    ) {
      navigate(DASHBOARD[user.role], { replace: true })
    }
  }, [user, token, location.pathname, navigate])

  return <>{children}</>
}
