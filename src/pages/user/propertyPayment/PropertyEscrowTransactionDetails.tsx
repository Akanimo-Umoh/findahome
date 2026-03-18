import { useNavigate } from "react-router-dom";
import propertyImg from "@/assets/images/property.jpg";
// import greyNaira from "@/assets/images/icon-chat-naira.svg";
import goBack from "@/assets/images/icon-back.svg";
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg";
import privacyIcon from "@/assets/images/icon-escrow-privacy.svg";
import keysIcon from "@/assets/images/icon-keys.svg";
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg";
import EscrowSummary from "./EscrowSummary";
import greyInfo from "@/assets/images/icon-grey-info.svg";
// import PaymentSuccessful from "./PaymentSuccessful";
// import EscrowProtectionTerms from "./EscrowProtectionTerms";

export default function PropertyEscrowTransactionDetails() {
  const navigate = useNavigate();

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Escrow Transaction Details
        </p>
      </div>

      <main className="mt-6">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-bg-accent">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-center gap-1 w-full">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
              4 Bed-room Apartment, Lekki phase 1
            </p>
            {/* <div className="text-[12px] leading-4 text-text-secondary flex items-center justify-between">
            <p className="">FH-PAY-2472-001</p>
            <p className="flex items-center">
              <img src={greyNaira} alt="" />
              <span>3M/yr</span>
            </p>
          </div> */}
            <p className="text-[12px] leading-4 text-text-secondary">
              Listed by Maryann Kikomu{" "}
              <span className="text-button-bg">(Verified)</span>
            </p>
            <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit">
              Inspection Pending
            </p>
            {/* payment secured would show if the user made payment into the escrow system */}
            {/* <p className="text-[12px] leading-4 bg-[#149D18] py-1 px-2 rounded-2xl w-fit">
              Payment Secured
            </p> */}
          </div>
        </div>

        <div className="mt-4">
          {/* escrow summary */}
          <div>
            <EscrowSummary />
          </div>

          {/* transaction in progress */}
          <div className="mt-4">
            <p>Transaction in progress</p>

            <div className="mt-2">
              {/* progress bar */}
              <div>progress bar</div>

              {/* transaction status */}
              <div className="flex flex-col justify-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Payment initiated</p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Funds held in Escrow
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Scheduled
                  </p>
                </div>

                {/* if it is not completed */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Inspection Completed
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Funds released
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              <p className="text-[12px] leading-4 text-button-bg">
                See Escrow Protection Terms
              </p>
              <img src={greyInfo} alt="" />
            </div>
            {/* when the escrow protection terms is clicked, this overlay should show */}
            {/* <EscrowProtectionTerms /> */}
          </div>

          {/* confirm inspection is completed */}
          <div className="mt-4">
            <div className="space-y-3">
              {/* when the request property handover is clicked, the payment successful overflow would show  */}
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white h-11.25 rounded-lg button-style w-full flex items-center justify-center gap-2">
                <img src={keysIcon} alt="" />
                <p>Request Property Handover</p>
              </button>

              {/* <PaymentSuccessful /> */}

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] h-11.25 rounded-lg w-full flex items-center justify-center border border-text-secondary bg-button-disabled gap-2">
                <img src={homeIcon} alt="" /> <p>Go to Dashboard</p>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 mt-3 mb-10 bg-bg-accent py-1 px-2">
              <img src={privacyIcon} alt="" className="w-4 h-4" />
              <p className="text-[12px] leading-4 text-text-secondary">
                Funds are securely held by FindaHome until inspection is
                confirmed by both parties
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
