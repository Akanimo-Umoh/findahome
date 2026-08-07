import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

export function useLogout() {
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    logout()
    queryClient.clear()
    toast.success("You've been logged out successfully.")
    navigate("/login", { replace: true })
  }

  return { handleLogout }
}
