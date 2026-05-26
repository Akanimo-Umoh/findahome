import forgotPasswordImg from "@/assets/images/img-forgot-password.png"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function ResetPasswordSuccess() {
  const navigate = useNavigate()

  // auto-redirect to login after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="mx-6 w-full items-center justify-center space-y-9 font-ssPro">
      <div className="mx-auto max-w-[203px] space-y-2 text-center text-text-primary">
        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Password Updated!
        </p>
        <p className="text-center text-[12px]">
          Please wait you will be directed to the home page
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <img src={forgotPasswordImg} alt="" />

        <button
          onClick={() => navigate("/login")}
          className="h-12 rounded-lg bg-button-bg font-raleway font-semibold tracking-[1px] text-white"
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}
