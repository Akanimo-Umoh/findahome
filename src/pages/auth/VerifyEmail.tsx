import alert from "@/assets/images/icon-mail-alert.png";
import { resendVerificationEmail, verifyEmail } from "@/services/auth.service";
import { AxiosError } from "axios";
import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const hasAutoResent = useRef(false);

  const state = location.state as { email?: string; from?: string } | null;
  const email = state?.email;
  const fromPage = state?.from;

  // automatically resend verification code if coming from login/google auth
  useEffect(() => {
    const shouldAutoResend = fromPage === "login" || fromPage === "google-auth";

    if (email && shouldAutoResend && !hasAutoResent.current) {
      hasAutoResent.current = true;
      handleResendCode(true);
    }
  }, [email, fromPage]);

  // redirect if email is missing or not coming from a valid source
  useEffect(() => {
    const validSources = ["signup", "login", "google-auth"];

    if (!email || !fromPage || !validSources.includes(fromPage)) {
      // no email? redirect to signup
      navigate("/signup", { replace: true });
    }
  }, [email, fromPage, navigate]);

  if (!email) return null;

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only process if pasted data is 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode(newCode);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendCode = async (silent = false) => {
    if (!email) return;

    try {
      setIsResending(true);
      setApiError(null);
      setSuccessMessage(null);

      await resendVerificationEmail({ email });

      if (!silent) {
        // only show success message if user manually clicked
        setSuccessMessage("Verification code sent! Please check your email.");
      }

      console.log("Verification code sent to:", email);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log("Verification code:", verificationCode);

    // Validate that all 6 digits are filled
    if (verificationCode.length === 6 && email) {
      setIsVerifying(true);
      setApiError(null);
      try {
        // api call
        await verifyEmail({ email, code: verificationCode });
        console.log("Verification successful");
        // navigate to success page on successful verification
        navigate("/verify-email/success", { replace: true });
      } catch (error) {
        console.error(error);

        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.message ||
            "Verification failed. Please try again.";
          setApiError(errorMessage);
        } else {
          setApiError("An unexpected error occurred. Please try again.");
        }
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 font-ssPro w-full mx-6">
      <p className="text-[18px] font-semibold font-raleway tracking-[1px] text-text-primary text-center">
        Verify Email
      </p>

      <div className="flex flex-col items-center justify-center gap-2">
        <div>
          <img src={alert} alt="mailbox" />
        </div>

        <div className="flex flex-col items-center justify-center text-[14px] text-text-secondary">
          <p>We’ve sent a verification code to</p>
          <p className="font-semibold text-black">{email}</p>
        </div>
      </div>

      {/* verification ctn */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Success message */}
          {successMessage && (
            <div
              className="flex items-center gap-2 p-3 bg-[#F0FFF4] border border-green-500 rounded-lg w-full"
              role="alert"
            >
              <p className="text-[12px] text-green-700">{successMessage}</p>
            </div>
          )}

          {/* Error message */}
          {apiError && (
            <div
              className="flex items-center gap-2 p-3 bg-[#FFF0F0] border border-state-error rounded-lg"
              role="alert"
            >
              <p className="text-[12px] text-state-error">{apiError}</p>
            </div>
          )}

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex gap-2 items-center justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="h-[45px] w-[33px] bg-white text-center text-black text-[18px]"
                  aria-label={`Digit ${index + 1}`}
                  disabled={isVerifying || isResending}
                />
              ))}
            </div>

            <p className="text-[14px] text-black">
              Didn’t receive a mail?{" "}
              <button
                type="button"
                onClick={() => handleResendCode(false)}
                disabled={isResending}
                className="font-raleway tracking-[1px] cursor-pointer font-semibold underline"
              >
                {isResending ? "Sending..." : "Click here"}
              </button>
            </p>
          </div>
          <button
            type="submit"
            disabled={code.join("").length !== 6 || isVerifying}
            className="h-[37px] rounded-lg text-[14px] tracking-[1px] font-raleway font-semibold w-full cursor-pointer bg-sec-but text-component-primary disabled:text-black disabled:bg-bg-accent disabled:border disabled:border-text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Verify Your Email"}
          </button>
        </div>
      </form>
    </div>
  );
}
