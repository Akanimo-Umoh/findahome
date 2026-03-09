import { useEffect, useState } from "react";
import hide from "@/assets/images/icon-hide-password.svg";
import show from "@/assets/images/icon-show-password.svg";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ResetPasswordSchema,
  type ResetPasswordFormData,
} from "@/validation/auth/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword, resetPassword } from "@/services/auth.service";
import { AxiosError } from "axios";
import inputError from "@/assets/images/icon-email-error.svg";

type LocationState = {
  email?: string;
};

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // check url params first before checking the location state
  const emailFromUrl = searchParams.get("email");
  const emailFromState = (location.state as LocationState)?.email;
  const email = emailFromUrl || emailFromState;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // redirect if no email provided
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  if (!email) return null;

  const handleResendCode = async () => {
    try {
      setIsResending(true);
      setApiError(null);
      setSuccessMessage(null);

      await forgotPassword({ email });

      setSuccessMessage("Reset code sent! Please check your email.");
    } catch (error) {
      console.error("Resend error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to resend code. Please try again.";
        setApiError(errorMessage);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setApiError(null);
      setSuccessMessage(null);

      console.log("Resetting password for:", email);

      // only send email, code and newPassword
      await resetPassword({
        email,
        code: data.code,
        newPassword: data.newPassword,
      });

      console.log("Password reset successful");

      navigate("/reset-password/success", {
        replace: true,
      });
    } catch (error) {
      console.error("Reset password error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to reset password. Please try again.";
        setApiError(errorMessage);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="font-ssPro mx-6 w-full items-center justify-center space-y-[45px]">
      <div className="text-text-primary space-y-2 text-center">
        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Reset Password
        </p>
        <p className="text-[12px] text-center">
          We've sent a reset code to <span>{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Success message */}
        {successMessage && (
          <div
            className="flex items-center gap-2 p-3 bg-[#F0FFF4] border border-green-500 rounded-lg mb-2"
            role="alert"
          >
            <p className="text-[12px] text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Error message */}
        {apiError && (
          <div
            className="flex items-center gap-2 p-3 bg-[#FFF0F0] border border-state-error rounded-lg mb-2"
            role="alert"
          >
            <img src={inputError} alt="" aria-hidden="true" />
            <p className="text-[12px] text-state-error">{apiError}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* reset code */}
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-black">
              Reset Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="Enter code"
              maxLength={6}
              className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none ${
                errors.code
                  ? "border-2 border-state-error"
                  : "border border-[#0A0A0A59]"
              }`}
              aria-invalid={errors.code ? "true" : "false"}
              aria-describedby={errors.code ? "code-error" : undefined}
              {...register("code")}
            />

            {errors.code && (
              <div
                className="flex items-center gap-1"
                id="code-error"
                role="alert"
              >
                <img src={inputError} alt="" aria-hidden="true" />
                <p className="text-[12px] text-state-error">
                  {errors.code.message}
                </p>
              </div>
            )}
          </div>

          {/* new password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-black">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter Password"
                className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none ${
                  errors.newPassword
                    ? "border-2 border-state-error"
                    : "border border-[#0A0A0A59]"
                }`}
                aria-invalid={errors.newPassword ? "true" : "false"}
                aria-describedby={
                  errors.newPassword ? "newPassword-error" : undefined
                }
                {...register("newPassword")}
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
            {errors.newPassword && (
              <div
                className="flex items-center gap-1"
                id="newPassword-error"
                role="alert"
              >
                <img src={inputError} alt="" aria-hidden="true" />
                <p className="text-[12px] text-state-error">
                  {errors.newPassword.message}
                </p>
              </div>
            )}
          </div>

          {/* confirm password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-black">
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Enter Password"
                className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-12 pl-2 pr-10 rounded-xl outline-none ${
                  errors.confirmPassword
                    ? "border-2 border-state-error"
                    : "border border-[#0A0A0A59]"
                }`}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword")}
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

        <button
          type="button"
          onClick={handleResendCode}
          disabled={isResending}
          className="text-[14px] text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed mx-auto"
        >
          {isResending ? "Sending..." : "Resend Code"}
        </button>

        <button
          type="submit"
          disabled={isSubmitting || isResending}
          className="mt-8 h-12 rounded-lg bg-button-bg flex items-center justify-center w-full text-white font-raleway font-semibold tracking-[1px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e3aa8] transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
