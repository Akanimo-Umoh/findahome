import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import checkIcon from "@/assets/images/img-pay-inspection-fee.png"
import { useAuthContext } from "@/context/AuthContext"
import { DASHBOARD } from "@/routes/onboarding"

const REDIRECT_MS = 8000

export default function OnboardingSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, updateUser } = useAuthContext()
  const hasShownToast = useRef(false)
  const hasSyncedUser = useRef(false)

  const cameFromOnboarding = location.state?.fromOnboarding === true

  const isAgent = user?.role === "agent"
  const redirectPath = isAgent ? DASHBOARD.agent : DASHBOARD.user

  // guard: direct nav or reload without the flag -> bounce away
  useEffect(() => {
    if (!cameFromOnboarding) {
      navigate(redirectPath, { replace: true })
    }
  }, [cameFromOnboarding, navigate, redirectPath])

  // mark the user as onboarded now that we're safely on this page
  useEffect(() => {
    if (!cameFromOnboarding || hasSyncedUser.current || !user) return
    hasSyncedUser.current = true
    updateUser({
      ...user,
      ...location.state?.updatedUser,
      isOnboarding: true,
    })
  }, [cameFromOnboarding, user, updateUser, location.state])

  // toast + auto redirect
  useEffect(() => {
    if (!cameFromOnboarding) return

    if (!hasShownToast.current) {
      hasShownToast.current = true
      toast.success("Profile submitted!")
    }

    const timer = setTimeout(() => {
      navigate(redirectPath, { replace: true })
    }, REDIRECT_MS)

    return () => clearTimeout(timer)
  }, [cameFromOnboarding, navigate, redirectPath])

  if (!cameFromOnboarding) return null

  return (
    <div className="onboarding flex min-h-screen flex-col items-center justify-center px-6 text-center md:px-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-button-bg">
        <img src={checkIcon} alt="" className="h-8 w-8" />
      </div>

      <h1 className="mt-4 font-raleway font-semibold tracking-[1px]">
        Profile Submitted
      </h1>

      <p className="mt-1 max-w-66.75 text-[14px] text-text-secondary">
        {isAgent ? (
          <>
            We're reviewing your details.
            <br />
            Redirecting you to your dashboard...
          </>
        ) : (
          <>
            Your profile has been saved.
            <br />
            Taking you to the home page...
          </>
        )}
      </p>

      <div className="mt-6 h-1 w-full max-w-66.75 overflow-hidden rounded-full bg-text-disabled">
        <div
          className="h-full origin-left bg-button-bg"
          style={{ animation: `shrink ${REDIRECT_MS}ms linear forwards` }}
        />
      </div>

      <button
        type="button"
        onClick={() => navigate(redirectPath, { replace: true })}
        className="mt-6 cursor-pointer text-[13px] font-semibold text-button-bg underline"
      >
        {isAgent ? "Go to dashboard now" : "Continue to home page"}
      </button>
    </div>
  )
}
