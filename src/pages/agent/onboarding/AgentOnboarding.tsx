import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import ProgressBar from "./ProgressBar"
import infoIcon from "@/assets/agentImages/icon-filled-info.svg"
import { useAuthContext } from "@/context/AuthContext"
import { onboardAgent } from "@/services/user.service"
import { useLogout } from "@/hooks/useLogout"
import { useQueryClient } from "@tanstack/react-query"
import Spinner from "@/components/Spinner"
import {
  myVerificationKey,
  useMyVerification,
  type MyAccount,
} from "@/hooks/useMyVerification"

const TOTAL_STEPS = 3

const capitalizeFirstCharacter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

export type AgentProfileData = {
  about: string
  yearsOfExperience: string
  serviceArea: string[]
  languages: string[]
  businessName: string
  phoneNumber: string
  licenseNumber: string
  officeAddress: string
  socialLinkOrWebsite: string
}

const initialData: AgentProfileData = {
  about: "",
  yearsOfExperience: "",
  serviceArea: [],
  languages: [],
  businessName: "",
  phoneNumber: "",
  licenseNumber: "",
  officeAddress: "",
  socialLinkOrWebsite: "",
}

type OnboardingFormProps = {
  initial: AgentProfileData
  isResubmission: boolean
  rejectionNote: string | null
  existingGovernmentId?: string
  existingLicenseDoc?: string
}

function OnboardingForm({
  initial,
  isResubmission,
  rejectionNote,
  existingGovernmentId,
  existingLicenseDoc,
}: OnboardingFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<AgentProfileData>(initial)
  const [governmentId, setGovernmentId] = useState<File | null>(null)
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null)

  const { token } = useAuthContext()
  const { handleLogout } = useLogout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const updateField = (field: keyof AgentProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateArrayField = (
    field: "serviceArea" | "languages",
    values: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
  }

  const goNext = () => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  // warn on tab close/refresh while onboarding isn't complete
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [])

  const handleFinalSubmit = async () => {
    if (!token) throw new Error("Not authenticated")

    const payload = new FormData()
    payload.append("about", capitalizeFirstCharacter(formData.about))
    payload.append("yearsOfExperience", formData.yearsOfExperience)
    payload.append(
      "serviceArea",
      JSON.stringify(formData.serviceArea.map(capitalizeFirstCharacter))
    )
    payload.append(
      "languages",
      JSON.stringify(formData.languages.map(capitalizeFirstCharacter))
    )
    payload.append(
      "businessName",
      capitalizeFirstCharacter(formData.businessName)
    )
    payload.append("phoneNumber", formData.phoneNumber)
    payload.append(
      "licenseNumber",
      capitalizeFirstCharacter(formData.licenseNumber.trim())
    )
    payload.append(
      "officeAddress",
      capitalizeFirstCharacter(formData.officeAddress)
    )
    payload.append("socialLinkOrWebsite", formData.socialLinkOrWebsite)
    if (governmentId) payload.append("governmentId", governmentId)
    if (licenseDoc) payload.append("licenseDoc", licenseDoc)

    console.log(
      "Agent onboarding submission:",
      Object.fromEntries(payload.entries())
    )

    const { user: updatedUser } = await onboardAgent(payload)

    // so the profile and dashboard show "Awaiting review" straight away
    queryClient.invalidateQueries({ queryKey: myVerificationKey })

    navigate("/agent/onboarding/success", {
      replace: true,
      state: { fromOnboarding: true, updatedUser },
    })
  }

  return (
    <div className="onboarding min-h-screen px-6 md:px-8">
      <div className="mx-auto flex max-w-120 flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between pt-4">
          <Link
            to="/agent/dashboard"
            className="font-raleway text-[28px] font-bold text-button-bg"
          >
            FindaHome
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="cursor-pointer text-[13px] font-semibold text-text-secondary underline"
          >
            Log out
          </button>
        </div>

        <div className="mt-4 flex w-full max-w-66.75 flex-col items-center justify-center gap-1 text-center">
          <h1 className="font-raleway font-semibold tracking-[1px]">
            {isResubmission
              ? "Update Your Agent Details"
              : "Set Up Your Agent Profile"}
          </h1>
          <p className="text-[14px] text-text-secondary">
            {isResubmission
              ? "Check your details and upload your documents again."
              : "Tell us a bit about your agency to build trust with buyers."}
          </p>
        </div>

        {isResubmission && (
          <div
            role="alert"
            className="mt-4 w-full rounded-lg bg-red-50 px-3 py-2.5 text-[13px] text-red-700"
          >
            <p className="font-semibold">
              Your last submission was not approved
            </p>
            <p>
              {rejectionNote ??
                "Please check your details and upload your documents again."}
            </p>
          </div>
        )}

        <div className="mt-6 flex w-full max-w-79.25 flex-col items-center gap-2">
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
          <p className="text-[13px] text-text-secondary">
            Step {step} of {TOTAL_STEPS}
          </p>
        </div>

        <div className="mt-6 mb-10 w-full">
          {step === 1 && (
            <Step1
              data={formData}
              updateField={updateField}
              updateArrayField={updateArrayField}
              onNext={goNext}
            />
          )}
          {step === 2 && (
            <Step2
              data={formData}
              updateField={updateField}
              onNext={goNext}
              onBack={goBack}
            />
          )}
          {step === 3 && (
            <Step3
              governmentId={governmentId}
              licenseDoc={licenseDoc}
              existingGovernmentId={existingGovernmentId}
              existingLicenseDoc={existingLicenseDoc}
              setGovernmentId={setGovernmentId}
              setLicenseDoc={setLicenseDoc}
              onBack={goBack}
              onSubmit={handleFinalSubmit}
            />
          )}

          <div className="mx-auto mt-4 flex w-full max-w-79.25 items-center justify-center gap-1">
            <img src={infoIcon} alt="" className="h-6 w-6" />
            <p className="text-[12px] text-text-secondary">
              These details help verify your identity and make your listings
              more credible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const toFormData = (me: MyAccount): AgentProfileData => ({
  about: me.about ?? "",
  yearsOfExperience: me.yearsOfExperience ? String(me.yearsOfExperience) : "",
  serviceArea: me.serviceArea ?? [],
  languages: me.languages ?? [],
  businessName: me.businessName ?? "",
  phoneNumber: me.phoneNumber ?? "",
  licenseNumber: me.licenseNumber ?? "",
  officeAddress: me.officeAddress ?? "",
  socialLinkOrWebsite: me.socialLinkOrWebsite ?? "",
})

export default function AgentOnboarding() {
  const { user } = useAuthContext()
  const { status, note, me, isLoading, refetch } = useMyVerification()

  // A rejected agent can resubmit. An agent with a prior onboarding submission
  // may also be resubmitting while the one-time legacy migration is pending.
  const isResubmission = !!user?.isOnboarding || status === "rejected"

  // Wait for the first answer from /user/me only. Don't also wait on
  // background refetches: they run whenever the tab regains focus, and
  // swapping the form for a spinner would throw away what the agent typed.
  // The server refuses duplicate submissions anyway.
  if (isLoading) {
    return (
      <Spinner className="fixed inset-0 z-50 flex items-center justify-center bg-white" />
    )
  }

  // no answer at all (the first request failed): don't show a form we can't check
  if (!me) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-semibold text-text-primary">
          We couldn't load your verification status.
        </p>
        <p className="text-sm text-text-secondary">
          Please try again before submitting your agent details.
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-lg bg-button-bg px-5 py-2 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    )
  }

  // Pending and approved agents must not submit another application.
  if (status === "pending" || status === "approved") {
    return <Navigate to="/agent/dashboard" replace />
  }

  return (
    <OnboardingForm
      initial={isResubmission && me ? toFormData(me) : initialData}
      isResubmission={isResubmission}
      rejectionNote={note}
      existingGovernmentId={me?.governmentId?.[0]}
      existingLicenseDoc={me?.licenseDoc?.[0]}
    />
  )
}
