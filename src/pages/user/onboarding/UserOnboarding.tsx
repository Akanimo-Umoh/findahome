import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { useLogout } from "@/hooks/useLogout"
import { onboardUser } from "@/services/user.service"

type Errors = { fullName?: string; phoneNumber?: string; location?: string }

export default function UserOnboarding() {
  const { user } = useAuthContext()
  const { handleLogout } = useLogout()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.name ?? "")
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "")
  const [locationInput, setLocationInput] = useState(user?.location ?? "")
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isValid =
    fullName.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    locationInput.trim() !== ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Errors = {}
    if (!fullName.trim()) newErrors.fullName = "Can't be empty"
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Can't be empty"
    } else if (!/^\d{10,11}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number"
    }
    if (!locationInput.trim()) newErrors.location = "Can't be empty"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)
    try {
      const { user: updatedUser } = await onboardUser({
        name: fullName.trim(),
        phoneNumber,
        location: locationInput.trim(),
      })

      // don't touch isOnboarding here, the success page does it
      navigate("/onboarding/success", {
        replace: true,
        state: { fromOnboarding: true, updatedUser },
      })
    } catch (err) {
      const message =
        err instanceof AxiosError
          ? err.response?.data?.message ||
            "Submission failed. Please try again."
          : "Submission failed. Please try again."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="onboarding min-h-screen px-6 md:px-8">
      <div className="mx-auto flex max-w-120 flex-col items-center justify-center">
        <div className="flex w-full items-center justify-between pt-4">
          <Link
            to="/"
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

        <div className="mt-4 flex w-full max-w-66.75 flex-col items-center gap-1 text-center">
          <h1 className="font-raleway text-[20px] font-semibold tracking-[1px] md:text-[24px]">
            Complete Your Profile
          </h1>

          <p className="text-[14px] text-text-secondary">
            Just a few details so we can get you started.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 mb-10 w-full md:rounded-2xl md:bg-gray-50 md:p-8 md:shadow-sm"
        >
          <div className="space-y-4">
            {/* full name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.fullName ? "border-red-500" : "border-text-disabled"}`}
              />
              {errors.fullName && (
                <p className="text-[12px] text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* email (read-only) */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="johndoe@example.com"
                value={user?.email ?? ""}
                readOnly
                tabIndex={-1}
                className="h-11.25 w-full cursor-not-allowed rounded-xl border border-text-disabled bg-gray-100 px-2 text-[14px] text-text-secondary outline-none"
              />
            </div>

            {/* phone number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="08012345678"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                maxLength={11}
                className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.phoneNumber ? "border-red-500" : "border-text-disabled"}`}
              />
              {errors.phoneNumber && (
                <p className="text-[12px] text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="location">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="location"
                placeholder="Lekki, Lagos"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className={`h-11.25 w-full rounded-xl border bg-white px-2 text-[14px] outline-none ${errors.location ? "border-red-500" : "border-text-disabled"}`}
              />
              {errors.location && (
                <p className="text-[12px] text-red-500">{errors.location}</p>
              )}
            </div>
          </div>

          <Button
            variant="app-primary"
            size="full"
            className="mt-6 disabled:bg-text-secondary disabled:opacity-50"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Continue <ArrowRight />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
