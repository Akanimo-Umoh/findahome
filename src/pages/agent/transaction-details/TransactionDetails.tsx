import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import BuyerInfo from "./BuyerInfo";
import PaymentSummary from "./PaymentSummary";
import InspectionDetails from "./InspectionDetails";
import Timeline from "./Timeline";
import { useState } from "react";

// Each stage maps to a scenario
// in_escrow            → Scenario 1: payment made, funds held, show Schedule Inspection button
// inspection_scheduled → Scenario 2a: agent scheduled, waiting for buyer to confirm
// inspection_confirmed → Scenario 2b: buyer confirmed schedule
// inspection_completing → Scenario 3: code input, confirm inspection completed
// completed            → Scenario 4: all done, payment released

export type TransactionStage =
  | "in_escrow"
  | "inspection_scheduled"
  | "inspection_confirmed"
  | "inspection_completing"
  | "completed";

// Header title changes based on stage
const headerTitle: Record<TransactionStage, string> = {
  in_escrow: "Transaction Details",
  inspection_scheduled: "Inspection Details",
  inspection_confirmed: "Inspection Details",
  inspection_completing: "Inspection Details",
  completed: "Transaction Details",
};

// Top message changes based on stage
const stageMessage: Partial<Record<TransactionStage, string>> = {
  inspection_scheduled: "Waiting for the buyer to confirm schedule",
  inspection_confirmed: "Inspection schedule confirmed",
};

export default function TransactionDetails() {
  const navigate = useNavigate();

  // In a real app, this comes from the API response
  // We use local state here so you can test all scenarios
  const [stage, setStage] = useState<TransactionStage>("in_escrow");
  const [inspectionCode, setInspectionCode] = useState("");

  const isScenario1 = stage === "in_escrow";
  const isScenario2 =
    stage === "inspection_scheduled" || stage === "inspection_confirmed";
  const isScenario3 = stage === "inspection_completing";
  const isScenario4 = stage === "completed";

  return (
    // transaction details for inspection
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          {headerTitle[stage]}
        </p>
      </div>

      <section className="mt-6">
        {/* top message — only shows in scenario 2 */}
        {stageMessage[stage] && (
          <div className="mb-4 px-3 py-2 bg-bg-accent rounded-lg">
            <p className="text-[12px] text-text-secondary text-center">
              {stageMessage[stage]}
            </p>
          </div>
        )}

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

        {/* buyer details — hidden in scenario 3 */}
        {!isScenario3 && (
          <div className="mt-6">
            <BuyerInfo />
          </div>
        )}

        {/* payment summary — hidden in scenario 3 */}
        {!isScenario3 && (
          <div className="mt-6">
            <PaymentSummary />
          </div>
        )}

        {/* inspection details — only visible in scenario 2 */}
        {isScenario2 && (
          <div className="mt-6">
            <InspectionDetails />
          </div>
        )}

        <div className="mt-6">
          <Timeline />
        </div>

        <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white mt-12.5">
          Schedule Inspection
        </button>
      </section>
      {/* quick note, i have another component that would show the transaction details when every thing has been checked */}
    </div>
  );
}
