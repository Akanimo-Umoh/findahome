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
