// import google from "@/assets/images/icon-google.svg";
import hide from "@/assets/images/icon-hide-password.svg";
import show from "@/assets/images/icon-show-password.svg";
import inputError from "@/assets/images/icon-email-error.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, LoginFormSchema } from "@/validation/auth/rules";
import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { login as loginApi } from "@/services/auth.service";
import { AxiosError } from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

type LocationState = {
  from?: string;
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  // use custom google auth hook
  const {
    apiError: googleApiError,
    setApiError: setGoogleApiError,
    handleGoogleSuccess,
    handleGoogleError,
  } = useGoogleAuth();

  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(LoginFormSchema) });

  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState)?.from || "/dashboard";

  const onSubmit = async (data: LoginFormData) => {
    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // console.log(data);
    try {
      // clear api errors
      setApiError(null);
      setGoogleApiError(null);

      console.log("Data:", data);

      const response = await loginApi({
        email: data.email.toLowerCase(),
        password: data.password,
      });

      console.log("Response:", response);
      // check if user us verified before logging in
      if (!response.user.verified) {
        // redirect unverified users to verify-email
        navigate("/verify-email", {
          state: { email: response.user.email, from: "login" },
          replace: true,
        });
        return;
      }

      // store user + token in context & redirect to dashboard
      login(response.user, response.token);
      // redirect user
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // added proper error handling
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Login failed. Please try again.";
        setApiError(errorMessage);
      } else {
        setApiError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 font-ssPro w-full mx-6">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-text-primary text-[18px] tracking-[1px] font-semibold font-raleway">
          Log in to your account
        </p>
        <p className="text-[14px] text-text-secondary">
          Start your journey to finding the perfect home
        </p>
      </div>

      {/* main ctn */}
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          {/* <div className="px-4 py-3 flex items-center justify-center gap-4 bg-white rounded-[2px]">
            <img src={google} alt="google" />
            <p className="text-text-primary">Continue with Google</p>
          </div> */}

          <div className="w-full flex items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              text="signin_with"
              width="100"
            />
          </div>

          <div className="flex items-center justify-center gap-1">
            <hr className="grow border-[#80808059]" />
            <p className="text-[12px] text-text-secondary">
              Or log in with email
            </p>
            <hr className="grow border-[#80808059]" />
          </div>
        </div>

        {(apiError || googleApiError) && (
          <div
            className="flex items-center gap-2 p-3 bg-[#FFF0F0] border border-state-error rounded-lg"
            role="alert"
          >
            <img src={inputError} alt="" aria-hidden="true" />
            <p className="text-[12px] text-state-error">
              {apiError || googleApiError}
            </p>
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8">
            {/* input ctn */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-[45px] px-2 rounded-xl outline-none ${errors.email ? "border-2 border-state-error" : "border-none"}`}
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

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-black">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    className={`w-full text-[14px] placeholder:text-text-secondary text-black bg-white h-[45px] pl-2 pr-10 rounded-xl outline-none ${errors.password ? "border-2 border-state-error" : "border-none"}`}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={0}
                  >
                    <img
                      src={showPassword ? hide : show}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {errors.password && (
                  <div
                    className="flex items-center gap-1"
                    id="password-error"
                    role="alert"
                  >
                    <img src={inputError} alt="" aria-hidden="true" />
                    <p className="text-[12px] text-state-error">
                      {errors.password.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-sec-but h-[37px] w-full font-raleway text-component-primary font-semibold tracking-[1px] text-[14px] rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e3aa8] transition-colors"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>

              <p className="text-[12px] text-text-secondary">
                Don’t have an account?&nbsp;
                <Link to="/signup" className="text-[#274AD0]">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
