import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import securityIcon from "@/assets/agentImages/icon-security.svg"

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)

  return (
    <div className="mx-auto mb-10 max-w-150 md:pt-6 lg:pt-8">
      <PageHeader title="Change Password" responsive />

      {/* <p className="mt-2 text-[12px] leading-4 text-text-secondary">
        For your security, choose a strong password you haven't used before.
      </p> */}

      <form action="" className="mt-6">
        <div className="space-y-6">
          {/* old password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="oldPassword">Current Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* new password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword">New Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* confirm new password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="oldPassword">Confirm New Password</label>

            <div className="relative flex items-center justify-center">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                className="h-11.25 w-full rounded-xl border pr-11 pl-2 outline-none"
                placeholder="*********"
              />

              <button
                type="button"
                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                {showConfirmNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
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

        <Button variant="app-primary" size="full" className="mt-8">
          Update Password
        </Button>
      </form>
    </div>
  )
}
