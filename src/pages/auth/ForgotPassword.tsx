import forgotPasswordImg from "@/assets/images/img-forgot-password.png";
import inputError from "@/assets/images/icon-email-error.svg";
import { forgotPassword } from "@/services/auth.service";
import {
  type ForgotPasswordFormData,
  ForgotPasswordSchema,
} from "@/validation/auth/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setApiError(null);
      console.log("Requesting password reset for:", data.email);

      // send the reset code
      await forgotPassword({ email: data.email.toLowerCase() });
      console.log("Reset code request successful");

      // always navigate even if email does not exist
      navigate("/reset-password", {
        state: { email: data.email.toLowerCase() },
        replace: true,
      });
    } catch (error) {
      console.error("Forgot password error:", error);

      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "";

        console.log("Backend error message:", errorMessage);
        console.log("Error status:", error.response?.status);

        // Check if error is about non-existent email
        if (
          errorMessage.toLowerCase().includes("not found") ||
          errorMessage.toLowerCase().includes("does not exist") ||
          errorMessage.toLowerCase().includes("no account") ||
          error.response?.status === 404
        ) {
          // Still navigate to reset password page for security
          // Don't reveal that the email doesn't exist
          console.log("Email not found, but still navigating for security");
          navigate("/reset-password", {
            state: { email: data.email.toLowerCase() },
            replace: true,
          });
          return;
        }

        // For other errors (rate limiting, server errors, etc.), show the error
        setApiError(
          errorMessage || "Failed to send reset code. Please try again.",
        );
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="text-text-primary w-full mx-6 flex flex-col items-center justify-center font-ssPro">
      <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
        Forgot Password?
      </p>

      <div className="mt-12 flex flex-col items-center justify-center gap-2">
        <img src={forgotPasswordImg} alt="" className="" />

        <p className="text-[12px] text-center max-w-[242px] text-text-primary">
          Please enter your email address associated with this account. We will
          send you reset instructions
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-8">
        {/* api error */}
        {apiError && (
          <div
            className="flex items-center gap-2 p-3 bg-[#FFF0F0] border border-state-error rounded-lg mb-2"
            role="alert"
          >
            <img src={inputError} alt="" aria-hidden="true" />
            <p className="text-[12px] text-state-error">{apiError}</p>
          </div>
        )}

        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black">
              Email
            </label>

            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              className={`w-full text-black text-[14px] placeholder:text-text-secondary rounded-xl bg-white px-2 h-[45px] outline-none ${errors.email ? "border-2 border-state-error" : "border border-[#0A0A0A59]"}`}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="font-raleway font-semibold tracking-[1px] text-white w-full bg-button-bg h-12 rounded-lg flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
