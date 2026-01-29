// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AxiosError } from "axios";
// import { type CredentialResponse } from "@react-oauth/google";
// import { googleAuth } from "@/services/auth.service";
// import { useAuthContext } from "@/context/AuthContext";

// export const useGoogleAuth = () => {
//   const [apiError, setApiError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const { login } = useAuthContext();

//   const handleGoogleSuccess = async (
//     credentialResponse: CredentialResponse,
//   ) => {
//     try {
//       setApiError(null);

//       // Check if credential exists
//       if (!credentialResponse.credential) {
//         setApiError("Google authentication failed. Please try again.");
//         return;
//       }

//       const mode = location.pathname.includes("/signup") ? "register" : "login";
//       console.log(`Google OAuth with mode: ${mode}`);

//       // Send tokenId to backend
//       const result = await googleAuth(credentialResponse.credential, mode);

//       // Store user and token
//       if (result.token && result.user) {
//         login(result.user, result.token);
//       }

//       // Navigate based on verification status
//       if (result.user?.verified) {
//         navigate("/dashboard", { replace: true });
//       } else {
//         navigate("/verify-email", {
//           state: { email: result.user.email, from: "google-auth" },
//           replace: true,
//         });
//       }
//     } catch (error) {
//       console.error("Google auth error:", error);
//       if (error instanceof AxiosError) {
//         const errorMessage =
//           error.response?.data?.message ||
//           "Google authentication failed. Please try again.";
//         setApiError(errorMessage);
//       } else {
//         setApiError("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   const handleGoogleError = () => {
//     setApiError(
//       "Google authentication was cancelled or failed. Please try again.",
//     );
//   };

//   return {
//     apiError,
//     setApiError,
//     handleGoogleSuccess,
//     handleGoogleError,
//   };
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← CHANGE: Removed useLocation (not needed)
import { AxiosError } from "axios";
import { type CredentialResponse } from "@react-oauth/google";
import { googleAuth } from "@/services/auth.service";
import { useAuthContext } from "@/context/AuthContext";

export const useGoogleAuth = () => {
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    try {
      setApiError(null);

      // Check if credential exists
      if (!credentialResponse.credential) {
        setApiError("Google authentication failed. Please try again.");
        return;
      }

      // ← CHANGE: Use "register" mode for both pages (works for new and existing users)
      const mode = "register";
      console.log(`Google OAuth with mode: ${mode}`);

      // Send tokenId to backend
      const result = await googleAuth(credentialResponse.credential, mode);

      // Store user and token
      if (result.token && result.user) {
        login(result.user, result.token);
      }

      // Navigate based on verification status
      if (result.user?.verified) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/verify-email", {
          state: { email: result.user.email, from: "google-auth" },
          replace: true,
        });
      }
    } catch (error) {
      console.error("Google auth error:", error);

      if (error instanceof AxiosError) {
        // ← CHANGE: Special handling for 401 unverified user error
        if (
          error.response?.status === 401 &&
          error.response?.data?.message?.toLowerCase().includes("verify")
        ) {
          // Extract email from JWT token
          try {
            const token = credentialResponse.credential;
            if (!token) {
              throw new Error("No credential token available");
            }

            const payload = JSON.parse(atob(token.split(".")[1]));
            const email = payload.email;

            // Redirect to verify-email without showing error
            navigate("/verify-email", {
              state: { email, from: "google-auth" },
              replace: true,
            });
            return; // ← Exit early, don't show error message
          } catch (parseError) {
            console.error("Failed to parse JWT token:", parseError);
            // If parsing fails, fall through to show error message
          }
        }

        // For all other errors, show error message
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
