import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import ProgressBar from "./ProgressBar"
import OnboardingSuccess from "./OnboardingSuccess"
import infoIcon from "@/assets/agentImages/icon-filled-info.svg"
import { useAuthContext } from "@/context/AuthContext"
import { onboardAgent } from "@/services/user.service"

const TOTAL_STEPS = 3

export type AgentProfileData = {
  about: string
  yearsOfExperience: string
  serviceArea: string[]
  languages: string[]
  businessName: string
  licenceNumber: string
  officeAddress: string
  socialLinkOrWebsite: string
}

const initialData: AgentProfileData = {
  about: "",
  yearsOfExperience: "",
  serviceArea: [],
  languages: [],
  businessName: "",
  licenceNumber: "",
  officeAddress: "",
  socialLinkOrWebsite: "",
}

export default function AgentOnboarding() {
  const [step, setStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  const [formData, setFormData] = useState<AgentProfileData>(initialData)
  const [governmentId, setGovernmentId] = useState<File | null>(null)
  const [licenseDoc, setLicenseDoc] = useState<File | null>(null)

  const { token, user, updateUser } = useAuthContext()

  const updateField = (field: keyof AgentProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateArrayField = (
    field: "serviceArea" | "languages",
    values: string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
  }

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const goBack = () => setStep((s) => Math.max(s - 1, 1))

  // warn on tab close/refresh while onboarding isn't complete
  useEffect(() => {
    if (isComplete) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }
    window.addEventListener("beforeunload", handler)
    return () => window.removeEventListener("beforeunload", handler)
  }, [isComplete])

  const handleFinalSubmit = async () => {
    if (!token) throw new Error("Not authenticated")

    const payload = new FormData()
    payload.append("about", formData.about)
    payload.append("yearsOfExperience", formData.yearsOfExperience)
    payload.append("serviceArea", JSON.stringify(formData.serviceArea))
    payload.append("languages", JSON.stringify(formData.languages))
    payload.append("businessName", formData.businessName)
    payload.append("licenceNumber", formData.licenceNumber)
    payload.append("officeAddress", formData.officeAddress)
    payload.append("socialLinkOrWebsite", formData.socialLinkOrWebsite)
    if (governmentId) payload.append("governmentId", governmentId)
    if (licenseDoc) payload.append("licenseDoc", licenseDoc)

    const { user: updatedUser } = await onboardAgent(payload)

    if (user) {
      updateUser({ ...user, ...updatedUser, isOnboarding: true })
    }
    setIsComplete(true)
  }

  if (isComplete) {
    return <OnboardingSuccess />
  }

  return (
    <div className="onboarding min-h-screen px-6 md:px-8">
      <div className="mx-auto flex max-w-120 flex-col items-center justify-center">
        <Link
          to="/agent/dashboard"
          className="mt-4 font-raleway text-[28px] font-bold text-button-bg"
        >
          FindaHome
        </Link>

        <div className="mt-4 flex w-full max-w-66.75 flex-col items-center justify-center gap-1 text-center">
          <h1 className="font-raleway font-semibold tracking-[1px]">
            Set Up Your Agent Profile
          </h1>
          <p className="text-[14px] text-text-secondary">
            Tell us a bit about your agency to build trust with buyers.
          </p>
        </div>

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
