// routes/BlockRoleRoute.tsx
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"

type UserRole = "user" | "agent" | "admin"

type BlockRoleRouteProps = {
  blockedRoles: UserRole[]
}

export default function BlockRoleRoute({ blockedRoles }: BlockRoleRouteProps) {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && blockedRoles.includes(user.role)) {
      toast.error("This page isn't available for your account type")
      switch (user.role) {
        case "agent":
          navigate("/agent/dashboard", { replace: true })
          break
        case "admin":
          navigate("/admin/dashboard", { replace: true })
          break
        default:
          navigate("/", { replace: true })
      }
    }
  }, [user, blockedRoles, navigate])

  if (user && blockedRoles.includes(user.role)) return null

  return <Outlet />
}
