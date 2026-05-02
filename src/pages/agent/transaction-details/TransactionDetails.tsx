import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import BuyerInfo from "./BuyerInfo";
import PaymentSummary from "./PaymentSummary";
import InspectionDetails from "./InspectionDetails";
import Timeline from "./Timeline";
import { useState } from "react";
import checkIcon from "@/assets/agentImages/icon-white-filled-icon.svg";
import ConfirmBuyersCode from "./ConfirmBuyersCode";
import InspectionConfirmedModal from "./InspectionConfirmedModal";

export type TransactionStage =
  | "in_escrow" // Scenario 1: payment made, schedule inspection button
  | "inspection_scheduled" // Scenario 2a: agent scheduled, waiting for buyer
  | "inspection_confirmed" // Scenario 2b: buyer confirmed — banner shows
  | "inspection_completing" // Scenario 3: code input shown
  | "inspection_done" // Scenario 3 confirmed: modal shows
  | "completed"; // Scenario 4: payment released

// header title — only changes after inspection is scheduled
const headerTitle = (stage: TransactionStage) =>
  stage === "in_escrow" ? "Transaction Details" : "Inspection Details";

export default function TransactionDetails() {
  const navigate = useNavigate();

  // In a real app this comes from the API based on transaction ID from URL params
  const [stage, setStage] = useState<TransactionStage>("in_escrow");
  const [showModal, setShowModal] = useState(false);

  const showInspectionConfirmedBanner =
    stage === "inspection_confirmed" || stage === "inspection_completing";
  const showInspectionDetails = stage !== "in_escrow";
  const showTimeline =
    stage !== "inspection_completing" && stage !== "inspection_done";
  const showConfirmBuyersCode = stage === "inspection_completing";

  return (
    // transaction details for inspection
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          {headerTitle(stage)}
        </p>
      </div>

      {/* Scenario 2b + 3: inspection confirmed banner */}
      {showInspectionConfirmedBanner && (
        <div className="flex items-center rounded-lg border border-bg-accent bg-bg-accent py-2 px-3 gap-1 mt-6">
          <div className="w-7.5 h-7.5 bg-[#10B981] flex items-center justify-center rounded-full shrink-0">
            <img src={checkIcon} alt="" />
          </div>
          <div>
            <p className="text-[14px]">Inspection Schedule Confirmed.</p>
            <p className="text-[12px] leading-4 text-text-secondary">
              {stage === "inspection_confirmed"
                ? "The inspection is scheduled. No further action is required until the inspection takes place."
                : "Both you and the buyer must confirm that the inspection was carried out."}
            </p>
          </div>
        </div>
      )}

      <section className="mt-6">
        {/* property card — always visible */}
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

        {/* buyer details — hidden when payment is released (completed) */}
        {stage !== "completed" && (
          <div className="mt-6">
            <BuyerInfo />
          </div>
        )}

        {/* payment summary — hidden in scenario 3 (code input) */}
        {stage !== "inspection_completing" && (
          <div className="mt-6">
            <PaymentSummary />
          </div>
        )}

        {/* inspection details — hidden when payment is released */}
        {showInspectionDetails && stage !== "completed" && (
          <div className="mt-6">
            <InspectionDetails />
          </div>
        )}

        {/* timeline — hidden only in scenario 3 */}
        {showTimeline && (
          <div className="mt-6">
            <Timeline stage={stage} />
          </div>
        )}

        {/* scenario 1 button */}
        {stage === "in_escrow" && (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setStage("inspection_scheduled")}
              className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white"
            >
              Schedule Inspection
            </button>
          </div>
        )}

        {/* scenario 2 buttons */}
        {(stage === "inspection_scheduled" ||
          stage === "inspection_confirmed") && (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setStage("inspection_completing")}
              className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white"
            >
              Confirm Inspection Completed
            </button>
            <button
              onClick={() => navigate("/agent/dashboard")}
              className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled w-full"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {/* scenario 4 buttons */}
        {stage === "completed" && (
          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate("/agent/wallet")}
              className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white"
            >
              View Wallet
            </button>
            <button
              onClick={() => navigate("/agent/dashboard")}
              className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-button-bg text-button-bg w-full"
            >
              Go to Dashboard
            </button>
            <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled w-full">
              Download Receipt
            </button>
          </div>
        )}

        {/* open a dispute — hidden in scenario 3 and 4 */}
        {stage !== "inspection_completing" &&
          stage !== "inspection_done" &&
          stage !== "completed" &&
          stage !== "in_escrow" && (
            <p className="text-[12px] leading-4 text-text-secondary text-center mt-3">
              Having issues?{" "}
              <span className="text-button-bg cursor-pointer">
                Open a dispute
              </span>
            </p>
          )}

        {/* Scenario 3: code input */}
        {showConfirmBuyersCode && (
          <div className="mt-6">
            <ConfirmBuyersCode
              onConfirm={() => {
                setStage("inspection_done");
                setShowModal(true);
              }}
            />
          </div>
        )}
      </section>

      {/* Scenario 3 success modal */}
      {showModal && (
        <InspectionConfirmedModal
          onViewTransaction={() => {
            setShowModal(false);
            setStage("completed");
          }}
          onBackToDashboard={() => navigate("/agent/dashboard")}
        />
      )}
    </div>
  );
}
