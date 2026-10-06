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

    // the API sends `address`, the app reads `location`
    const { address, ...serverUser } = location.state?.updatedUser ?? {}
    updateUser({
      ...user,
      ...serverUser,
      location: address ?? user.location,
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
    <div className="auth-bg flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 md:px-8">
      <div className="w-full max-w-[520px] rounded-[28px] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-button-bg sm:h-20 sm:w-20">
            <img src={checkIcon} alt="" className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>

          <h1 className="mt-5 font-raleway text-[28px] font-semibold tracking-[1px] text-text-primary sm:text-[32px]">
            Profile Submitted
          </h1>

          <p className="mt-2 w-full max-w-[330px] text-sm leading-6 text-text-secondary sm:text-[14px]">
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

          <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-text-disabled">
            <div
              className="h-full origin-left bg-button-bg"
              style={{ animation: `shrink ${REDIRECT_MS}ms linear forwards` }}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate(redirectPath, { replace: true })}
            className="mt-6 cursor-pointer text-[13px] font-semibold text-button-bg underline sm:text-[14px]"
          >
            {isAgent ? "Go to dashboard now" : "Continue to home page"}
          </button>
        </div>
      </div>
    </div>
  )
}
