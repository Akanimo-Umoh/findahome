import forgotPasswordImg from "@/assets/images/img-forgot-password.png"
import inputError from "@/assets/images/icon-email-error.svg"
import { forgotPassword } from "@/services/auth.service"
import {
  type ForgotPasswordFormData,
  ForgotPasswordSchema,
} from "@/validation/auth/rules"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export default function ForgotPassword() {
  const [apiError, setApiError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setApiError(null)
      console.log("Requesting password reset for:", data.email)

      // send the reset code
      await forgotPassword({ email: data.email.toLowerCase() })
      console.log("Reset code request successful")

      // always navigate even if email does not exist
      navigate("/reset-password", {
        state: { email: data.email.toLowerCase() },
        replace: true,
      })
    } catch (error) {
      console.error("Forgot password error:", error)

      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || ""

        console.log("Backend error message:", errorMessage)
        console.log("Error status:", error.response?.status)

        // Check if error is about non-existent email
        if (
          errorMessage.toLowerCase().includes("not found") ||
          errorMessage.toLowerCase().includes("does not exist") ||
          errorMessage.toLowerCase().includes("no account") ||
          error.response?.status === 404
        ) {
          // Still navigate to reset password page for security
          // Don't reveal that the email doesn't exist
          console.log("Email not found, but still navigating for security")
          navigate("/reset-password", {
            state: { email: data.email.toLowerCase() },
            replace: true,
          })
          return
        }

        // For other errors (rate limiting, server errors, etc.), show the error
        setApiError(
          errorMessage || "Failed to send reset code. Please try again."
        )
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
    }
  }

  return (
    <div className="mx-6 flex w-full flex-col items-center justify-center font-ssPro text-text-primary md:mx-7.5 md:my-5">
      <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[28px] md:font-medium">
        Forgot Password?
      </p>

      <div className="mt-12 flex flex-col items-center justify-center gap-2 md:mt-1">
        <img src={forgotPasswordImg} alt="" className="md:hidden" />

        <p className="max-w-[242px] text-center text-[12px] text-text-primary md:max-w-70 md:leading-4">
          Please enter your email address associated with this account. We will
          send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 w-full md:mt-10">
        {/* api error */}
        {apiError && (
          <div
            className="mb-2 flex items-center gap-2 rounded-lg border border-state-error bg-[#FFF0F0] p-3"
            role="alert"
          >
            <img src={inputError} alt="" aria-hidden="true" />
            <p className="text-[12px] text-state-error">{apiError}</p>
          </div>
        )}

        <div className="space-y-8 md:space-y-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black">
              Email
            </label>

            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              className={`h-[45px] w-full rounded-xl bg-white px-2 text-[14px] text-black outline-none placeholder:text-text-secondary ${errors.email ? "border-2 border-state-error" : "border-2 border-text-disabled"}`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />

            {errors.email && (
              <div
                className="flex items-center gap-1"
                id="email-error"
                role="alert"
              >
                <img src={inputError} alt="" aria-hidden="true" />
                <p className="text-[12px] text-state-error">
                  {errors.email.message}
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-style flex h-12 w-full items-center justify-center rounded-lg font-raleway font-semibold tracking-[1px] text-white"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>

            <Link
              to="/login"
              className="mx-auto mt-5 hidden w-fit font-raleway font-semibold tracking-[1px] text-button-bg md:flex"
            >
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
