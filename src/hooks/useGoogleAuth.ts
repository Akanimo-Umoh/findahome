import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { type CredentialResponse } from "@react-oauth/google";
import { googleAuth } from "@/services/auth.service";
import { useAuthContext } from "@/context/AuthContext";

export const useGoogleAuth = (
  clearFormError?: (error: string | null) => void,
) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      setApiError(null);
      clearFormError?.(null); // Clear form error too

      // Check if credential exists
      if (!credentialResponse.credential) {
        setApiError("Google authentication failed. Please try again.");
        return;
      }

      console.log("Google OAuth initiated");

      // Try login mode first
      let result;

      try {
        result = await googleAuth(credentialResponse.credential, "login");
        console.log("Google login successful:", result);
      } catch (loginError) {
        if (loginError instanceof AxiosError) {
          const errorMessage = loginError.response?.data?.message || "";

          // If user not found, try to register
          if (errorMessage.includes("User not found")) {
            console.log("User not found, attempting registration");
            result = await googleAuth(
              credentialResponse.credential,
              "register",
            );
            console.log("Google registration successful:", result);
          }
          // If it's "Please login using email/password", show error
          else if (errorMessage.includes("Please login using email/password")) {
            setApiError(
              "This email is registered with email/password. Please use the email login form instead.",
            );
            return;
          }
          // If it's "Please verify your email", redirect to verify-email
          else if (errorMessage.includes("Please verify your email")) {
            navigate("/verify-email", {
              state: { from: "google-auth" },
              replace: true,
            });
            return;
          }
          // For any other error, throw it
          else {
            throw loginError;
          }
        } else {
          throw loginError;
        }
      }

      // If we got here, we have a successful result
      if (!result) return;

      console.log("User verified status:", result.user?.isVerified);

      // Navigate based on verification status
      if (!result.user?.isVerified) {
        console.log("User not verified, redirecting to verify-email");
        navigate("/verify-email", {
          state: { email: result.user.email, from: "google-auth" },
          replace: true,
        });
        return;
      }

      // Store user and token if verified
      if (result.token && result.user) {
        console.log("User verified, logging in and redirecting to dashboard");
        login(result.user, result.token);
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Google auth error:", error);
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          "Google authentication failed. Please try again.";
        setApiError(errorMessage);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleGoogleError = () => {
    setApiError(
      "Google authentication was cancelled or failed. Please try again.",
    );
  };

  return {
    apiError,
    setApiError,
    handleGoogleSuccess,
    handleGoogleError,
  };
};
