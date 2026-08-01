import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import securityIcon from "@/assets/agentImages/icon-security.svg"
import inputError from "@/assets/images/icon-email-error.svg"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { AxiosError } from "axios"
import { toast } from "sonner"

const passwordRule = z
  .string()
  .superRefine((val, ctx) => {
    const errors: string[] = []

    if (val.length === 0) {
      ctx.addIssue({ code: "custom", message: "Not be empty" })
      return
    }
    if (val.length < 8) errors.push("Be at least 8 characters long")
    if (!/[a-z]/.test(val)) errors.push("Contain at least one lowercase letter")
    if (!/[A-Z]/.test(val)) errors.push("Contain at least one uppercase letter")
    if (!/[0-9]/.test(val)) errors.push("Contain at least one number")
    if (!/[^a-zA-Z0-9]/.test(val))
      errors.push("Contain at least one special character")

    if (errors.length > 0) {
      ctx.addIssue({ code: "custom", message: JSON.stringify(errors) })
    }
  })
  .trim()

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required").trim(),
    newPassword: passwordRule,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match. Try again",
    path: ["confirmPassword"],
  })

type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
  })

  const onSubmit = async () => {
    try {
      setApiError(null)

      // TODO: replace with real endpoint once backend is ready.
      // Expected shape: changePassword({ currentPassword, newPassword })
      await new Promise((resolve) => setTimeout(resolve, 600))

      toast.success("Password updated successfully.")
      navigate("/profile")
    } catch (error) {
      if (error instanceof AxiosError) {
        const msg =
          error.response?.data?.message ||
          "Failed to update password. Please try again."
        setApiError(msg)
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
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
    <div className="mx-auto mb-10 max-w-150 md:pt-6 lg:pt-8">
      <PageHeader title="Change Password" responsive />

      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* api error */}
          {apiError && (
            <div
              className="flex items-center gap-2 rounded-lg border border-state-error bg-[#FFF0F0] p-3"
              role="alert"
            >
              <img src={inputError} alt="" aria-hidden="true" />
              <p className="text-[12px] text-state-error">{apiError}</p>
            </div>
          )}

          {/* current password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="currentPassword">Current Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                id="currentPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
                aria-invalid={errors.currentPassword ? "true" : "false"}
                aria-describedby={
                  errors.currentPassword ? "currentPassword-error" : undefined
                }
                {...register("currentPassword")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {errors.currentPassword && (
              <div
                className="flex items-center gap-1"
                id="currentPassword-error"
                role="alert"
              >
                <img src={inputError} alt="" aria-hidden="true" />
                <p className="text-[12px] text-state-error">
                  {errors.currentPassword.message}
                </p>
              </div>
            )}
          </div>

          {/* new password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword">New Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
                aria-invalid={errors.newPassword ? "true" : "false"}
                aria-describedby={
                  errors.newPassword ? "newPassword-error" : undefined
                }
                {...register("newPassword")}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {newPasswordErrors && (
              <div className="text-[12px]" id="newPassword-error" role="alert">
                <div className="flex items-center gap-1">
                  <img src={inputError} alt="" aria-hidden="true" />
                  <p className="text-state-error">Password must:</p>
                </div>
                <ul className="ml-4 list-inside list-disc space-y-1">
                  {newPasswordErrors.map((err: string) => (
                    <li key={err} className="text-state-error">
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* confirm new password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword">Confirm New Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword")}
              />

              <button
                type="button"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showConfirmNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {errors.confirmPassword && (
              <div
                className="flex items-center gap-1"
                id="confirmPassword-error"
                role="alert"
              >
                <img src={inputError} alt="" aria-hidden="true" />
                <p className="text-[12px] text-state-error">
                  {errors.confirmPassword.message}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-lg bg-bg-accent px-2 py-3">
          <img src={securityIcon} alt="" />

          <div className="space-y-1">
            <p className="text-[12px] font-semibold">Security Tip</p>

            <p className="text-[12px] leading-4 text-text-secondary">
              Change your password regularly and avoid sharing it with anyone.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          variant="app-primary"
          size="full"
          disabled={isSubmitting}
          className="mt-8"
        >
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}
