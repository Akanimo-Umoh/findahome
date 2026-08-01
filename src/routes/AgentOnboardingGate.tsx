import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"

export default function AgentOnboardingGate({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, token } = useAuthContext()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !token || user.role !== "agent" || !user.isVerified) return

    // not onboarded yet — force them into onboarding
    if (!user.isOnboarding && location.pathname !== "/agent/onboarding") {
      navigate("/agent/onboarding", { replace: true })
      return
    }

    // already onboarded — don't let them back into onboarding
    if (user.isOnboarding && location.pathname === "/agent/onboarding") {
      navigate("/agent/dashboard", { replace: true })
      return
    }
  }, [user, token, location.pathname, navigate])

  return <>{children}</>
}
