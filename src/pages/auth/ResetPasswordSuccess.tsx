import forgotPasswordImg from "@/assets/images/img-forgot-password.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordSuccess() {
  const navigate = useNavigate();

  // auto-redirect to login after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="font-ssPro mx-6 w-full items-center justify-center space-y-9">
      <div className="text-text-primary space-y-2 text-center max-w-[203px] mx-auto">
        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Password Updated!
        </p>
        <p className="text-[12px] text-center">
          Please wait you will be directed to the home page
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <img src={forgotPasswordImg} alt="" />

        <button
          onClick={() => navigate("/login")}
          className="font-raleway font-semibold tracking-[1px] h-12 bg-button-bg rounded-lg text-white"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
