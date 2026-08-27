import { useAuthContext } from "@/context/AuthContext"
import { getMe } from "@/services/user.service"

export function useRefreshUser() {
  const { token, updateUser } = useAuthContext()

  const refreshUser = async () => {
    if (!token) return
    try {
      const { user } = await getMe()
      updateUser(user)
    } catch (err) {
      console.error("refreshUser error:", err)
    }
  }

  return { refreshUser }
}
