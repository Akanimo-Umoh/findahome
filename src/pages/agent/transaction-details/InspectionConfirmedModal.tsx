// import successImg from "@/assets/images/img-pay-inspection-fee.png";

// export default function InspectionConfirmedModal() {
//   return (
//     <div className="fixed inset-0 z-50 modal-enter bg-black/40">
//       {/* modal */}

//       <div className="bg-white py-[43px] px-[27px] rounded-xl max-w-[340px] w-full flex flex-col items-center justify-center mx-6">
//         <div>
//           <img src={successImg} alt="" className="mx-auto" />
//         </div>

//         <div className="flex flex-col gap-6 mt-2 w-[258px]">
//           <div className="flex flex-col gap-4 items-center justify-center">
//             <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center">
//               Inspection Confirmed!
//             </p>
//             <p className="text-[14px] text-text-secondary text-center">
//               Success! The buyer confirmed the inspection and your payment is
//               now released
//             </p>
//           </div>

//           <div className="flex flex-col gap-3">
//             <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white">
//               View Transaction Details
//             </button>

//             <button className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-11.25 rounded-lg border border-text-secondary">
//               Back to dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import successImg from "@/assets/images/img-pay-inspection-fee.png";

type InspectionConfirmedModalProps = {
  onViewTransaction: () => void;
  onBackToDashboard: () => void;
};

export default function InspectionConfirmedModal({
  onViewTransaction,
  onBackToDashboard,
}: InspectionConfirmedModalProps) {
  return (
    <div className="fixed inset-0 z-50 modal-enter bg-black/40 flex items-center justify-center">
      {/* CHANGED: added flex items-center justify-center to center the modal */}
      <div className="bg-white py-[43px] px-[27px] rounded-xl max-w-[340px] w-full flex flex-col items-center justify-center mx-6">
        <div>
          <img src={successImg} alt="" className="mx-auto" />
        </div>

        <div className="flex flex-col gap-6 mt-2 w-[258px]">
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center">
              Inspection Confirmed!
            </p>
            <p className="text-[14px] text-text-secondary text-center">
              Success! The buyer confirmed the inspection and your payment is
              now released
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {/* CHANGED: wired up onViewTransaction */}
            <button
              onClick={onViewTransaction}
              className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white"
            >
              View Transaction Details
            </button>

            {/* CHANGED: wired up onBackToDashboard */}
            <button
              onClick={onBackToDashboard}
              className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-11.25 rounded-lg border border-text-secondary"
            >
              Back to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
