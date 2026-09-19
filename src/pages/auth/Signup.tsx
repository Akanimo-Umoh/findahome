import hide from "@/assets/images/icon-hide-password.svg"
import show from "@/assets/images/icon-show-password.svg"
import inputError from "@/assets/images/icon-email-error.svg"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type RegisterFormData,
  RegisterFormSchema,
} from "@/validation/auth/rules"
import { signup as signupApi } from "@/services/auth.service"
import { useState } from "react"
import { AxiosError } from "axios"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleAuth } from "@/hooks/useGoogleAuth"
import Loading from "@/components/Loading"

export default function Signup() {
  const { role } = useParams<{ role: "user" | "agent" }>()
  const selectedRole = role ?? "user"

  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  // use custom google auth hook
  const {
    apiError: googleApiError,
    isLoading: isGoogleLoading,
    setApiError: setGoogleApiError,
    handleGoogleSuccess,
    handleGoogleError,
  } = useGoogleAuth(setApiError)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(RegisterFormSchema) })

  const navigate = useNavigate()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      // clear previous errors
      setApiError(null)
      setGoogleApiError(null)

      // add the fixed role "buyer" to the payload
      const payload = {
        ...data,
        email: data.email.toLowerCase(),
        role: selectedRole,
      }

      console.log("Sending payload:", payload)

      await signupApi(payload)

      // redirect to verification page
      navigate("/verify-email", {
        state: { email: data.email, from: "signup" },
        replace: true,
      })
    } catch (error) {
      console.error("Full error:", error)

      if (error instanceof AxiosError) {
        console.error("Response data:", error.response?.data)
        const errorMessage =
          error.response?.data?.message || "Signup failed. Please try again."
        setApiError(errorMessage)
      } else {
        setApiError("An unexpected error occurred. Please try again.")
      }
    }
  }

  // Parse password errors from JSON string to array
  const passwordErrors = errors.password?.message
    ? (() => {
        try {
          return JSON.parse(errors.password.message)
        } catch {
          return [errors.password.message]
        }
      })()
    : null

  if (isGoogleLoading) {
    return <Loading />
  }

  return (
    <div className="mx-6 flex w-full flex-col gap-6 font-ssPro md:mx-7.5 md:my-5 md:gap-10">
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary md:hidden">
          Create Your Account
        </p>
        <p className="hidden font-raleway text-[28px] font-medium tracking-[1px] text-text-primary md:flex">
          Create Account
        </p>
        <p className="text-[14px] text-text-secondary md:text-[16px]">
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

          <div className="flex w-full items-center justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
              text="signup_with"
              width="100"
            />
          </div>

          <div className="flex items-center justify-center gap-1">
            <hr className="grow border-[#80808059]" />
            <p className="text-[12px] text-text-secondary md:text-[14px]">
              Or sign up with email
            </p>
            <hr className="grow border-[#80808059]" />
          </div>
        </div>

        {/* API Error Display */}
        {(apiError || googleApiError) && (
          <div
            className="flex items-center gap-2 rounded-lg border border-state-error bg-[#FFF0F0] p-3"
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
          <div className="space-y-8 md:space-y-10">
            {/* input ctn */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-black">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Full Name"
                  className={`h-[45px] w-full rounded-xl bg-white px-2 text-[14px] text-black outline-none placeholder:text-text-secondary ${
                    errors.name
                      ? "border-2 border-state-error"
                      : "md:border-2 md:border-text-disabled"
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />

                {errors.name && (
                  <div
                    className="flex items-center gap-1"
                    id="name-error"
                    role="alert"
                  >
                    <img src={inputError} alt="" aria-hidden="true" />
                    <p className="text-[12px] text-state-error">
                      {errors.name.message}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter Email"
                  className={`h-[45px] w-full rounded-xl bg-white px-2 text-[14px] text-black outline-none placeholder:text-text-secondary ${
                    errors.email
                      ? "border-2 border-state-error"
                      : "md:border-2 md:border-text-disabled"
                  }`}
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
                    className={`h-[45px] w-full rounded-xl bg-white pr-10 pl-2 text-[14px] text-black outline-none placeholder:text-text-secondary ${
                      errors.password
                        ? "border-2 border-state-error"
                        : "md:border-2 md:border-text-disabled"
                    }`}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    {...register("password")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <img
                      src={showPassword ? hide : show}
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>

                {passwordErrors && (
                  <div className="text-[12px]" id="password-error" role="alert">
                    <div className="flex items-center gap-1">
                      <img src={inputError} alt="" aria-hidden="true" />
                      <p className="text-state-error">Password must:</p>
                    </div>
                    <ul className="ml-4 list-inside list-disc space-y-1">
                      {passwordErrors.map((err: string) => (
                        <li key={err} className="text-state-error">
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2 text-center md:space-y-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[37px] w-full cursor-pointer rounded-lg bg-sec-but font-raleway text-[14px] font-semibold tracking-[1px] text-component-primary transition-colors hover:bg-[#1e3aa8] disabled:cursor-not-allowed disabled:opacity-50 md:h-[45px] md:text-[16px]"
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-[21px]">
                Already have an account?&nbsp;
                <Link to="/login" className="text-[#274AD0]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
