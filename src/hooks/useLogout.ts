import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"

export function useLogout() {
  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success("You've been logged out successfully.")
    navigate("/login", { replace: true })
  }

  return { handleLogout }
}
