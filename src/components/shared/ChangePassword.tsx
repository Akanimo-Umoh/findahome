import inputError from "@/assets/images/icon-email-error.svg"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { forgotPassword, resetPassword } from "@/services/auth.service"
import {
  ResetPasswordSchema,
  type ResetPasswordFormData,
} from "@/validation/auth/rules"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type ChangePasswordProps = {
  backTo: string
}

export default function ChangePassword({ backTo }: ChangePasswordProps) {
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const [codeRequested, setCodeRequested] = useState(false)
  const [isRequestingCode, setIsRequestingCode] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const email = user?.email?.toLowerCase()

  const handleRequestCode = async (resend = false) => {
    if (!email) {
      setApiError(
        "Your account email could not be found. Please sign in again."
      )
      return
    }

    setApiError(null)
    setSuccessMessage(null)
    if (resend) {
      setIsResending(true)
    } else {
      setIsRequestingCode(true)
    }

    try {
      await forgotPassword({ email })
      setCodeRequested(true)
      setSuccessMessage(
        resend
          ? "A new code has been sent to your email."
          : "A password reset code has been sent to your email."
      )
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message ||
            "Failed to send the code. Please try again."
          : "An unexpected error occurred. Please try again."
      setApiError(message)
    } finally {
      setIsRequestingCode(false)
      setIsResending(false)
    }
  }

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!email) return

    setApiError(null)
    try {
      await resetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      })
      toast.success("Password updated successfully.")
      navigate(backTo, { replace: true })
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message ||
            "Failed to update password. Please try again."
          : "An unexpected error occurred. Please try again."
      setApiError(message)
    }
  }

  const newPasswordErrors = errors.newPassword?.message
    ? (() => {
        try {
          return JSON.parse(errors.newPassword.message)
        } catch {
          return [errors.newPassword.message]
        }
      })()
    : null

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-150">
        <PageHeader title="Change Password" responsive />

        <section className="mt-6 space-y-2">
          <h2 className="font-raleway text-[18px] font-semibold text-text-primary">
            {codeRequested ? "Enter your reset code" : "Verify your email"}
          </h2>
          <p className="text-[14px] text-text-secondary">
            {codeRequested
              ? `We've sent a reset code to ${email}. Enter it below with your new password.`
              : `Request a password reset code sent to ${email ?? "your account email"}.`}
          </p>
        </section>

        {apiError && (
          <div
            className="mt-4 flex items-center gap-2 rounded-lg border border-state-error bg-[#FFF0F0] p-3"
            role="alert"
          >
            <img src={inputError} alt="" aria-hidden="true" />
            <p className="text-[12px] text-state-error">{apiError}</p>
          </div>
        )}

        {successMessage && (
          <p
            className="mt-4 rounded-lg border border-green-500 bg-[#F0FFF4] p-3 text-[12px] text-green-700"
            role="status"
          >
            {successMessage}
          </p>
        )}

        {!codeRequested ? (
          <div className="mt-6 space-y-4">
            <Button
              variant="app-primary"
              size="full"
              onClick={() => void handleRequestCode()}
              disabled={isRequestingCode || !email}
            >
              {isRequestingCode ? "Sending..." : "Send reset code"}
            </Button>

            <Button
              variant="app-secondary"
              size="full"
              onClick={() => navigate(backTo)}
            >
              Back to profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="code">Reset Code</label>
              <input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter code"
                className={`h-12 w-full rounded-xl bg-white px-3 text-[14px] outline-none ${errors.code ? "border-2 border-state-error" : "border border-[#0A0A0A59]"}`}
                aria-invalid={errors.code ? "true" : "false"}
                aria-describedby={errors.code ? "code-error" : undefined}
                {...register("code")}
              />
              {errors.code && (
                <p
                  id="code-error"
                  className="text-[12px] text-state-error"
                  role="alert"
                >
                  {errors.code.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className={`h-12 w-full rounded-xl bg-white px-3 pr-11 text-[14px] outline-none ${errors.newPassword ? "border-2 border-state-error" : "border border-[#0A0A0A59]"}`}
                  aria-invalid={errors.newPassword ? "true" : "false"}
                  aria-describedby={
                    errors.newPassword ? "newPassword-error" : undefined
                  }
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {newPasswordErrors && (
                <div
                  id="newPassword-error"
                  className="text-[12px] text-state-error"
                  role="alert"
                >
                  <p>Password must:</p>
                  <ul className="ml-4 list-inside list-disc">
                    {newPasswordErrors.map((message: string) => (
                      <li key={message}>{message}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className={`h-12 w-full rounded-xl bg-white px-3 pr-11 text-[14px] outline-none ${errors.confirmPassword ? "border-2 border-state-error" : "border border-[#0A0A0A59]"}`}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  id="confirmPassword-error"
                  className="text-[12px] text-state-error"
                  role="alert"
                >
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="app-primary"
              size="full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>

            <button
              type="button"
              onClick={() => void handleRequestCode(true)}
              disabled={isResending}
              className="mx-auto block text-[14px] text-button-bg disabled:opacity-60"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
