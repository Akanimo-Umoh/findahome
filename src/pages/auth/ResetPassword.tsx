import { useState } from "react";
import hide from "@/assets/images/icon-hide-password.svg";
import show from "@/assets/images/icon-show-password.svg";
// import inputError from "@/assets/images/icon-email-error.svg";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="font-ssPro mx-6 w-full items-center justify-center space-y-[45px] mb-8">
      <div className="text-text-primary space-y-2 text-center">
        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Reset Password
        </p>
        <p className="text-[12px]">Enter your new password.</p>
      </div>

      <form action="" className="">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-black">
              Reset Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none border border-[#0A0A0A59]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-black">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none border border-[#0A0A0A59]`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                <img
                  src={showPassword ? hide : show}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-black">
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter Password"
                className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none border border-[#0A0A0A59]`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                tabIndex={0}
              >
                <img
                  src={showConfirmPassword ? hide : show}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 h-12 rounded-lg bg-button-bg flex items-center justify-center w-full text-white font-raleway font-semibold tracking-[1px] cursor-pointer"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
