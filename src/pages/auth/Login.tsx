// // import google from "@/assets/images/icon-google.svg";
// import hide from "@/assets/images/icon-hide-password.svg";
// import show from "@/assets/images/icon-show-password.svg";
// import inputError from "@/assets/images/icon-email-error.svg";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { type LoginFormData, LoginFormSchema } from "@/validation/auth/rules";
// import { useState } from "react";
// import { useAuthContext } from "@/context/AuthContext";
// import { login as loginApi } from "@/services/auth.service";
// import { AxiosError } from "axios";
// import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleAuth } from "@/hooks/useGoogleAuth";

// type LocationState = {
//   from?: string;
// };

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   // use custom google auth hook
//   const {
//     apiError: googleApiError,
//     setApiError: setGoogleApiError,
//     handleGoogleSuccess,
//     handleGoogleError,
//   } = useGoogleAuth();

//   const [apiError, setApiError] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });

//   const { login } = useAuthContext();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = (location.state as LocationState)?.from || "/dashboard";

//   const onSubmit = async (data: LoginFormData) => {
//     // await new Promise((resolve) => setTimeout(resolve, 10000));
//     // console.log(data);
//     try {
//       // clear api errors
//       setApiError(null);
//       setGoogleApiError(null);

//       console.log("Data:", data);

//       const response = await loginApi({
//         email: data.email.toLowerCase(),
//         password: data.password,
//       });

//       console.log("Response:", response);
//       // check if user us verified before logging in
//       if (!response.user.verified) {
//         // redirect unverified users to verify-email
//         navigate("/verify-email", {
//           state: { email: response.user.email, from: "login" },
//           replace: true,
//         });
//         return;
//       }

//       // store user + token in context & redirect to dashboard
//       login(response.user, response.token);
//       // redirect user
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error("Login error:", error);

//       // added proper error handling
//       if (error instanceof AxiosError) {
//         const errorMessage =
//           error.response?.data?.message || "Login failed. Please try again.";
//         setApiError(errorMessage);
//       } else {
//         setApiError("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6 font-ssPro w-full mx-6">
//       <div className="flex flex-col items-center justify-center gap-1">
//         <p className="text-text-primary text-[18px] tracking-[1px] font-semibold font-raleway">
//           Log in to your account
//         </p>
//         <p className="text-[14px] text-text-secondary">
//           Start your journey to finding the perfect home
//         </p>
//       </div>

//       {/* main ctn */}
//       <div className="flex flex-col gap-6">
//         <div className="space-y-4">
//           {/* <div className="px-4 py-3 flex items-center justify-center gap-4 bg-white rounded-[2px]">
//             <img src={google} alt="google" />
//             <p className="text-text-primary">Continue with Google</p>
//           </div> */}

//           <div className="w-full flex items-center justify-center">
//             <GoogleLogin
//               onSuccess={handleGoogleSuccess}
//               onError={handleGoogleError}
//               useOneTap
//               text="signin_with"
//               width="100"
//             />
//           </div>

//           <div className="flex items-center justify-center gap-1">
//             <hr className="grow border-[#80808059]" />
//             <p className="text-[12px] text-text-secondary">
//               Or log in with email
//             </p>
//             <hr className="grow border-[#80808059]" />
//           </div>
//         </div>

//         {(apiError || googleApiError) && (
//           <div
//             className="flex items-center gap-2 p-3 bg-[#FFF0F0] border border-state-error rounded-lg"
//             role="alert"
//           >
//             <img src={inputError} alt="" aria-hidden="true" />
//             <p className="text-[12px] text-state-error">
//               {apiError || googleApiError}
//             </p>
//           </div>
//         )}

//         {/* form */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="space-y-8">
//             {/* input ctn */}
//             <div className="flex flex-col gap-4">
//               <div className="flex flex-col gap-2">
//                 <label htmlFor="email" className="text-black">
//                   Email
//                 </label>
//                 <input
//                   type="text"
//                   id="email"
//                   placeholder="Enter Email"
//                   className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-[45px] px-2 rounded-xl outline-none ${errors.email ? "border-2 border-state-error" : "border-none"}`}
//                   aria-invalid={errors.email ? "true" : "false"}
//                   aria-describedby={errors.email ? "email-error" : undefined}
//                   {...register("email")}
//                 />

//                 {errors.email && (
//                   <div
//                     className="flex items-center gap-1"
//                     id="email-error"
//                     role="alert"
//                   >
//                     <img src={inputError} alt="" aria-hidden="true" />
//                     <p className="text-[12px] text-state-error">
//                       {errors.email.message}
//                     </p>
//                   </div>
//                 )}
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label htmlFor="password" className="text-black">
//                   Password
//                 </label>

//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Enter Password"
//                     className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-[45px] pl-2 pr-10 rounded-xl outline-none ${errors.password ? "border-2 border-state-error" : "border-none"}`}
//                     aria-invalid={errors.password ? "true" : "false"}
//                     aria-describedby={
//                       errors.password ? "password-error" : undefined
//                     }
//                     {...register("password")}
//                   />

//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                     className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     tabIndex={0}
//                   >
//                     <img
//                       src={showPassword ? hide : show}
//                       alt=""
//                       aria-hidden="true"
//                     />
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <div
//                     className="flex items-center gap-1"
//                     id="password-error"
//                     role="alert"
//                   >
//                     <img src={inputError} alt="" aria-hidden="true" />
//                     <p className="text-[12px] text-state-error">
//                       {errors.password.message}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="text-center space-y-2">
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="bg-sec-but h-[37px] w-full font-raleway text-component-primary font-semibold tracking-[1px] text-[14px] rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e3aa8] transition-colors"
//               >
//                 {isSubmitting ? "Logging in..." : "Log in"}
//               </button>

//               <p className="text-[12px] text-text-secondary">
//                 Don’t have an account?&nbsp;
//                 <Link to="/signup" className="text-[#274AD0]">
//                   Create account
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { login as loginApi, googleAuth } from "@/services/auth.service";
import { AxiosError } from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await loginApi({
        email: email.trim(),
        password: password.trim(),
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Login failed");
      } else {
        alert("Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      if (!response.credential) {
        alert("Google login failed");
        return;
      }

      const data = await googleAuth({
        tokenId: response.credential,
        mode: "login",
      });

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login via Google successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Google Login error:", err);
      if (err instanceof AxiosError) {
        alert(err.response?.data?.message || "Google login failed");
      } else {
        alert("Google login failed");
      }
    }
  };

  const handleGoogleError = () => {
    console.error("Google login error");
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "40px" }}>
      <h2>Login to RealEstate</h2>

      {/* Google OAuth Button */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={handleGoogleError}
          text="signin_with"
        />
      </div>

      <p>or use your account</p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ width: "100%", padding: "8px", margin: "8px 0" }}
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ width: "100%", padding: "8px", margin: "8px 0" }}
        />
        <br />
        <button type="submit" disabled={isLoading} style={{ padding: "8px 16px" }}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}