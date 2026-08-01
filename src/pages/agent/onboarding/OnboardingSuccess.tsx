import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import checkIcon from "@/assets/agentImages/icon-upload-successful.svg"

const REDIRECT_SECONDS = 8000

export default function OnboardingSuccess() {
  const navigate = useNavigate()
  const hasShownToast = useRef(false)

  useEffect(() => {
    if (!hasShownToast.current) {
      hasShownToast.current = true
      toast.success("Profile submitted! Redirecting you to your dashboard...")
    }

    const timer = setTimeout(() => {
      navigate("/agent/dashboard")
    }, REDIRECT_SECONDS)

    return () => clearTimeout(timer)
  }, [navigate])

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
        className="mt-6 text-[13px] font-semibold text-button-bg underline"
      >
        Go to dashboard now
      </button>
    </div>
  )
}
