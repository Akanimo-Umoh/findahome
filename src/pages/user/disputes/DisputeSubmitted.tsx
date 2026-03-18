import { Link, useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import successImg from "@/assets/images/img-pay-inspection-fee.png";
import bellIcon from "@/assets/images/icon-blue-notification.svg";
import trackIcon from "@/assets/images/icon-blue-track.svg";

export default function DisputeSubmitted() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Dispute Submitted
        </p>
      </div>

      <main className="mt-6">
        <div className="flex flex-col mt-4 items-center justify-center">
          <img src={successImg} alt="" />

          <div className="flex flex-col items-center justify-center text-center w-74.5 gap-2">
            <p className="font-raleway font-medium text-[24px] tracking-[1px]">
              Dispute Sent For Review
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              We've received your dispute regarding transaction ID
              FH-TRX-002834. Our team will review it shortly.
            </p>
          </div>
        </div>

        {/* dispute details */}
        <div className="space-y-2 mt-9">
          <div className="flex items-center justify-between text-[12px] leading-4">
            <p>Reference ID:</p>
            <p className="text-text-secondary">FH-TRX-002834</p>
          </div>

          <div className="flex items-center justify-between text-[12px] leading-4">
            <p>Expected Resolution</p>
            <p className="text-text-secondary">Within 2-3 days</p>
          </div>

          <div className="flex items-center justify-between text-[12px] leading-4">
            <p>Tracking Status</p>
            <p className="text-bg-tertiary bg-[#D02727] py-0.5 px-2 rounded-2xl text-center">
              Pending Review
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] leading-4">
            <p>Date Issued</p>
            <p className="text-text-secondary">15th Nov, 2025</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8 max-w-[305px]">
          <div className="flex items-center gap-2">
            <div className="rounded-xl w-8 h-8 bg-bg-accent flex items-center justify-center shrink-0">
              <img src={bellIcon} alt="" />
            </div>
            <p className="text-[12px] leading-4 text-text-secondary">
              You will receive an email and an in-app notification with update
              on your dispute status
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl w-8 h-8 bg-bg-accent flex items-center justify-center shrink-0">
              <img src={trackIcon} alt="" />
            </div>
            <p className="text-[12px] leading-4 text-text-secondary">
              You can track this disputes in your my disputes section.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-4 mt-10">
          <Link
            to="/"
            className="w-full h-[45px] rounded-lg py-3 px-2 button-style text-white text-center"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/my-dispute"
            className="font-raleway font-semibold tracking-[1px] text-button-bg mx-auto"
          >
            View my Disputes
          </Link>
        </div>
      </main>
    </div>
  );
}
