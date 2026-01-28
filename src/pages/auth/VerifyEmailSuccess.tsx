import iconSuccess from "@/assets/images/icon-verification-successful.png";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col font-ssPro w-full mx-6 gap-6">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-text-primary text-[18px] font-semibold font-raleway tracking-[1px] text-center">
          Email Verification Successful!
        </p>

        <img src={iconSuccess} alt="success" className="mx-auto" />
      </div>

      <button
        type="button"
        onClick={() => navigate("/login", { replace: true })}
        className="bg-sec-but h-[37px] rounded-lg font-raleway font-semibold text-[14px] tracking-[1px] text-component-primary"
      >
        Continue
      </button>
    </div>
  );
}
