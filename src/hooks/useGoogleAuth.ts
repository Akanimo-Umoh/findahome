import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AxiosError } from "axios"
import { type CredentialResponse } from "@react-oauth/google"
import { googleAuth } from "@/services/auth.service"
import { useAuthContext } from "@/context/AuthContext"
import { DASHBOARD, onboardingRedirect } from "@/routes/onboarding"
import { toast } from "sonner"
import { getMe } from "@/services/user.service"

type Options = {
  mode: "login" | "signup"
  role?: "user" | "agent"
  clearFormError?: (error: string | null) => void
}

// read the email out of the Google credential (JWT) for navigation only
const getEmailFromCredential = (credential: string): string | undefined => {
  try {
    const payload = credential
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
    return JSON.parse(atob(payload)).email?.toLowerCase()
  } catch {
    return undefined
  }
}

const getMessage = (error: unknown) =>
  error instanceof AxiosError ? error.response?.data?.message || "" : ""

export const useGoogleAuth = ({ mode, role, clearFormError }: Options) => {
  const [apiError, setApiError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthContext()

  const goToVerify = (email?: string) => {
    if (!email) {
      setApiError("Couldn't read your Google email. Please try again.")
      return
    }
    navigate("/verify-email", {
      state: { email, from: "google-auth" },
      replace: true,
    })
  }

  // shared by every successful path
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finishAuth = async (result: any, credential: string) => {
    if (!result?.user?.isVerified) {
      goToVerify(result?.user?.email ?? getEmailFromCredential(credential))
      return
    }

    if (!result.token) {
      setApiError("Google authentication failed. Please try again.")
      return
    }

    // the Google response is a partial user, so load the full one
    // the same way the email login does
    localStorage.setItem("token", result.token)
    let fullUser = result.user
    try {
      const meRes = await getMe()
      fullUser = meRes.user
    } catch (err) {
      console.error("getMe fetch failed, falling back to Google payload:", err)
    }

    login(fullUser, result.token)

    const from = (location.state as { from?: string } | null)?.from
    const onboardingTarget = onboardingRedirect(fullUser, location.pathname)
    const fallback = DASHBOARD[fullUser.role as keyof typeof DASHBOARD] ?? "/"

    navigate(onboardingTarget ?? from ?? fallback, { replace: true })
  }

  // returns true if the error was handled
  const handleLoginError = (error: unknown, credential: string) => {
    const message = getMessage(error)

    if (/verify your email/i.test(message)) {
      goToVerify(getEmailFromCredential(credential))
      return true
    }
    if (/login using email\/password/i.test(message)) {
      setApiError(
        "This email is registered with email/password. Please use the email login form instead."
      )
      return true
    }
    return false
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential
    setApiError(null)
    clearFormError?.(null)

    if (!credential) {
      setApiError("Google authentication failed. Please try again.")
      return
    }

    setIsLoading(true)
    try {
      if (mode === "signup") {
        try {
          const result = await googleAuth(credential, "register", role)
          finishAuth(result, credential)
        } catch (registerError) {
          // anything other than "account already exists" is a real error
          if (!/exist|already/i.test(getMessage(registerError)))
            throw registerError

          // account exists: try to log them in
          try {
            const result = await googleAuth(credential, "login")
            finishAuth(result, credential)
          } catch (loginError) {
            if (!handleLoginError(loginError, credential)) throw loginError
          }
        }
        return
      }

      // login page
      try {
        const result = await googleAuth(credential, "login")
        finishAuth(result, credential)
      } catch (loginError) {
        const message = getMessage(loginError)

        if (message.includes("User not found")) {
          toast.info("No account found. Choose how you'd like to join.")
          navigate("/signup", { replace: true })
        } else if (!handleLoginError(loginError, credential)) {
          throw loginError
        }
      }
    } catch (error) {
      console.error("Google auth error:", error)
      setApiError(
        getMessage(error) ||
          (error instanceof AxiosError
            ? "Google authentication failed. Please try again."
            : "An unexpected error occurred. Please try again.")
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleError = () => {
    setApiError(
      "Google authentication was cancelled or failed. Please try again."
    )
    setIsLoading(false)
  }

  return {
    apiError,
    isLoading,
    setApiError,
    handleGoogleSuccess,
    handleGoogleError,
  }
}
