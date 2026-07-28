import { createContext, useContext, useEffect, useState } from "react"

export type UserRole = "user" | "agent" | "admin"

export type User = {
  id: string
  email: string
  name?: string
  isVerified: boolean
  isOnboarding?: boolean
  role: UserRole
  profilePicture?: string | null
  phoneNumber?: string
  location?: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  isLoading: boolean
  isLoggingOut: boolean
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // user is authenticated if both user and token exist
  const isAuthenticated = !!(user && token)

  // Hydrate token and user from localStorage on load
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token")
      const savedUser = localStorage.getItem("user")
      if (savedToken && savedUser) {
        setToken(savedToken)
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (user: User, token: string) => {
    setIsLoggingOut(false)
    setUser(user)
    setToken(token)
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const updateUser = (user: User) => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    setIsLoggingOut(true)
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isLoggingOut,
        isAuthenticated,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider")
  }
  return context
}
