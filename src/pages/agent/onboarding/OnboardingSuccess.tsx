import { useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import checkIcon from "@/assets/agentImages/icon-upload-successful.svg"

const REDIRECT_MS = 80000

export default function OnboardingSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasShownToast = useRef(false)

  const cameFromOnboarding = location.state?.fromOnboarding === true

  // guard: direct nav or reload without the flag -> bounce to dashboard
  useEffect(() => {
    if (!cameFromOnboarding) {
      navigate("/agent/dashboard", { replace: true })
    }
  }, [cameFromOnboarding, navigate])

  useEffect(() => {
    if (!cameFromOnboarding) return

    if (!hasShownToast.current) {
      hasShownToast.current = true
      toast.success("Profile submitted! Redirecting you to your dashboard...")
    }

    const timer = setTimeout(() => {
      navigate("/agent/dashboard", { replace: true })
    }, REDIRECT_MS)

    return () => clearTimeout(timer)
  }, [cameFromOnboarding, navigate])

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
        We're reviewing your details. You'll be taken to your dashboard shortly.
      </p>

      <button
        type="button"
        onClick={() => navigate("/agent/dashboard")}
        className="mt-6 cursor-pointer text-[13px] font-semibold text-button-bg underline"
      >
        Go to dashboard now
      </button>
    </div>
  )
}
