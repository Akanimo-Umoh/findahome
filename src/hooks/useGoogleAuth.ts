import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosError } from "axios";
import { type CredentialResponse } from "@react-oauth/google";
import { googleAuth } from "@/services/auth.service";
import { useAuthContext } from "@/context/AuthContext";

export const useGoogleAuth = (
  clearFormError?: (error: string | null) => void,
) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    setIsLoading(true);
    try {
      setApiError(null);
      clearFormError?.(null);

      if (!credentialResponse.credential) {
        setApiError("Google authentication failed. Please try again.");
        return;
      }

      let result;

      try {
        result = await googleAuth(credentialResponse.credential, "login");
      } catch (loginError) {
        if (loginError instanceof AxiosError) {
          const errorMessage = loginError.response?.data?.message || "";

          if (errorMessage.includes("User not found")) {
            result = await googleAuth(
              credentialResponse.credential,
              "register",
            );
          } else if (
            errorMessage.includes("Please login using email/password")
          ) {
            setApiError(
              "This email is registered with email/password. Please use the email login form instead.",
            );
            return;
          } else if (errorMessage.includes("Please verify your email")) {
            navigate("/verify-email", {
              state: { from: "google-auth" },
              replace: true,
            });
            return;
          } else {
            throw loginError;
          }
        } else {
          throw loginError;
        }
      }

      if (!result) return;

      if (!result.user?.isVerified) {
        navigate("/verify-email", {
          state: { email: result.user.email, from: "google-auth" },
          replace: true,
        });
        return;
      }

      // Get the "from" state (where user was trying to go)
      const from = (location.state as { from?: string })?.from;

      // Determine redirect path
      const redirectPath =
        from ||
        (() => {
          switch (result.user.role) {
            case "user":
              return "/dashboard";
            case "agent":
              return "/agent/dashboard";
            case "admin":
              return "/admin/dashboard";
            default:
              return "/dashboard";
          }
        })();

      // Store user and token
      if (result.token && result.user) {
        login(result.user, result.token);
        navigate(redirectPath, { replace: true });
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setApiError(
      "Google authentication was cancelled or failed. Please try again.",
    );
    setIsLoading(false);
  };

  return {
    apiError,
    isLoading,
    setApiError,
    handleGoogleSuccess,
    handleGoogleError,
  };
};
