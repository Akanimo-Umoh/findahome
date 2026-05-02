import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import PaymentSummary from "./PaymentSummary";
import Timeline from "./Timeline";
import checkIcon from "@/assets/agentImages/icon-check.svg";
import downloadIcon from "@/assets/agentImages/icon-download-receipt.svg";

export default function TransactionCompleted() {
  const navigate = useNavigate();

  return (
    // transaction details for inspection completed, this is when all every thing has been checked
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Transaction Details
        </p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-bg-accent bg-[#149D1833] py-4 px-3 gap-1 mt-6">
        <div className="w-7.5 h-7.5 bg-[#149D18] flex items-center justify-center rounded-full shrink-0">
          <img src={checkIcon} alt="" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[14px]">Inspection Schedule Confirmed.</p>
          <p className="text-[12px] leading-4 text-text-secondary text-center">
            The buyer confirmed the inspection. Escrow funds have been released
            to your wallet.
          </p>
        </div>
      </div>

      <section className="mt-6">
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={apartmentImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    3,000,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 bg-[#149D18] py-1 px-2 rounded-2xl w-fit text-white">
                Completed
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 2hrs ago
              </p>
            </div>
          </div>
        </div>

        {/* payment summary */}
        <div className="mt-6">
          <PaymentSummary />
        </div>

        <div className="mt-6">
          <Timeline stage="completed" />
        </div>

        <div>
          <div>
            <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white mt-8">
              View Wallet
            </button>

            <button className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-[45px] rounded-lg mt-3 border border-text-secondary bg-button-disabled">
              Go to Dashboard
            </button>
          </div>

          <div className="flex items-center justify-center gap-1 mt-2 w-fit mx-auto">
            <img src={downloadIcon} alt="" />
            <p className="text-[12px] leading-4 text-button-bg">
              Download Receipt
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
