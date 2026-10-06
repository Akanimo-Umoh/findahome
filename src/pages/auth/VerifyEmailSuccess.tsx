import iconSuccess from "@/assets/images/icon-verification-successful.png"
import { useNavigate } from "react-router-dom"

export default function VerifyEmailSuccess() {
  const navigate = useNavigate()

  return (
    <div className="mx-6 flex w-full flex-col gap-6 py-10 font-ssPro">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
          Email Verification Successful!
        </p>

        <img src={iconSuccess} alt="success" className="mx-auto" />
      </div>

      <button
        type="button"
        onClick={() => navigate("/login", { replace: true })}
        className="h-[37px] cursor-pointer rounded-lg bg-sec-but font-raleway text-[14px] font-semibold tracking-[1px] text-component-primary"
      >
        Continue
      </button>
    </div>
  )
}
