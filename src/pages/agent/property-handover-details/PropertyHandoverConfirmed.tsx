import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import checkIcon from "@/assets/agentImages/icon-white-filled-icon.svg";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import infoIcon from "@/assets/agentImages/icon-filled-info.svg";
import BuyerInfo from "./BuyerInfo";
import InspectionDetails from "./InspectionDetails";
import ConfirmBuyersCode from "./ConfirmBuyersCode";
// import ConfirmedSuccess from "./ConfirmedSuccess";

export default function PropertyHandoverConfirmed() {
  const navigate = useNavigate();

  return (
    // transaction details for inspection
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Handover Details
        </p>
      </div>

      <div className="flex items-center rounded-lg border border-bg-accent bg-[#149D1833] py-2 px-3 gap-1 mt-6">
        <div className="w-7.5 h-7.5 bg-[#149D18] flex items-center justify-center rounded-full shrink-0">
          <img src={checkIcon} alt="" />
        </div>
        <div className="">
          <p className="text-[14px]">Mark property handover as completed</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Both you and the buyer must confirm that the house keys or land
            document has been handed over.
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
              <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit text-white">
                In Escrow
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

        {/* buyer details */}
        <div className="mt-6">
          <BuyerInfo />
        </div>

        <div className="mt-6">
          <InspectionDetails />
        </div>

        <div className="mt-6">
          <ConfirmBuyersCode />
        </div>

        <div className="flex items-center bg-bg-accent rounded-lg py-1 px-2 gap-1 mt-10">
          <img src={infoIcon} alt="" className="shrink-0" />

          <div className="text-[12px] leading-4 space-y-1">
            <p>Why do we need both confirmations?</p>
            <p className="text-text-secondary">
              This prevents disputes and ensures both parties agree the
              inspection happened.
            </p>
          </div>
        </div>

        <p className="text-[12px] leading-4 text-text-secondary text-center mt-3">
          Having issues with agent?{" "}
          <span className="text-button-bg">Open a dispute</span>
        </p>
      </section>

      {/* shows when it is confirmed */}
      {/* <ConfirmedSuccess /> */}
    </div>
  );
}
