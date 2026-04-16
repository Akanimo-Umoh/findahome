// import successImg from "@/assets/images/img-pay-inspection-fee.png";
// import { useEffect } from "react";

// type PayInspectionProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function PayInspectionModal({
//   isOpen,
//   onClose,
// }: PayInspectionProps) {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 modal-enter font-ssPro">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       {/* modal */}
//       <div className="absolute bottom-0 left-0 right-0 bg-white pt-[50px] px-6 rounded-t-[24px]">
//         <img src={successImg} alt="" className="w-25 h-25 mx-auto" />

//         <div className="flex flex-col items-center justify-center gap-2 mt-4 max-w-[317px] mx-auto text-center">
//           <p className="font-raleway font-medium text-[24px] tracking-[1px]">
//             Your agent has received your inspection request
//           </p>
//           <p className="text-text-secondary text-[12px] leading-4">
//             You will receive a notification for an inspection schedule
//           </p>
//         </div>

//         <div className="mt-[34px] flex flex-col gap-4 mb-8">
//           <button className="text-[14px] tracking-[1px] font-raleway font-semibold text-white flex items-center justify-center button-style w-full rounded-lg h-[45px] cursor-pointer">
//             Go to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import successImg from "@/assets/images/img-inspection-fee-successful.png";
// import { useEffect } from "react";

// type PayInspectionProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function PayInspectionModal({
//   isOpen,
//   onClose,
// }: PayInspectionProps) {
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 modal-enter font-ssPro">
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       {/* modal */}
//       <div className="absolute bottom-0 left-0 right-0 bg-white pt-[50px] px-6 rounded-t-[24px]">
//         <img src={successImg} alt="" className="w-[191px] h-[191px] mx-auto" />

//         <div className="flex flex-col items-center justify-center gap-2 mt-8">
//           <p className="font-raleway font-medium text-[24px] tracking-[1px]">
//             Payment Successful!
//           </p>
//           <p className="text-text-primary">
//             Your inspection with John Ade is confirmed.
//           </p>
//         </div>

//         <div className="mt-8 flex flex-col gap-4 mb-8">
//           <button className="text-[14px] tracking-[1px] font-raleway font-semibold text-white flex items-center justify-center button-style w-full rounded-lg h-[45px] cursor-pointer">
//             Schedule Inspection
//           </button>
//           <button className="text-[14px] font-raleway font-semibold tracking-[1px] text-text-primary h-[45px] rounded-lg bg-bg-accent border border-text-secondary cursor-pointer">
//             Return to chat
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import closeIcon from "@/assets/images/closeMenu.svg";
import { useEffect } from "react";
import nairaIcon from "@/assets/images/icon-chat-naira.svg";
import blueNairaIcon from "@/assets/images/naira.svg";
import escrowIcon from "@/assets/images/icon-pay-inspection-fee.svg";
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg";
import { Link } from "react-router-dom";

// import paymentError from "@/assets/images/icon-pay-inspection-fee-error.svg";

type PayInspectionProps = {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImage: string;
};

export default function PayInspectionModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyAddress,
  propertyPrice,
  propertyImage,
}: PayInspectionProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro h-full">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[90vh] flex flex-col">
        <div className="pt-[50px] px-6 shrink-0">
          {/* header */}
          <div className="flex items-center justify-center relative">
            <p className="text-[18px] font-raleway font-semibold tracking-[1px] text-text-primary">
              Pay Inspection Fee
            </p>

            <button onClick={onClose} className="absolute top-0 right-0">
              <img src={closeIcon} alt="" className="w-6 h-6" />
            </button>
          </div>

          {/* wallet balance */}
          <div className="mt-[23px] border p-2 border-bg-accent rounded-xl flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-bg-accent flex items-center justify-center">
              <img src={escrowIcon} alt="" />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-text-secondary">Escrow Wallet Balance</p>
              <p className="text-[18px] font-bold font-raleway tracking-[1px] text-button-bg flex items-center">
                <img src={blueNairaIcon} alt="" className="w-6 h-6" />
                <span>18,000</span>
              </p>
            </div>
          </div>

          {/* details ctn */}
          <div className="overflow-y-auto flex-1 mt-8 space-y-2">
            {/* property details */}
            <div className="p-2 border border-bg-accent rounded-xl flex gap-2 items-center">
              <img
                src={propertyImage}
                alt={propertyTitle}
                className="w-15 h-15 object-cover rounded-lg"
              />

              <div className="flex flex-col justify-center">
                <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-text-primary line-clamp-1">
                  {propertyTitle}
                </p>

                <div className="text-[12px] leading-4 text-text-secondary flex items-center">
                  <p className="line-clamp-1 flex-1">{propertyAddress}</p>
                  <p className="flex items-center">
                    <img src={nairaIcon} alt="" className="w-4 h-4" />
                    <span>{propertyPrice?.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="px-3 py-2 flex flex-col gap-2 bg-bg-accent rounded-xl">
              <div className="flex items-center justify-between">
                <p className="text-text-primary">Inspection fee</p>
                <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <span>5,000</span>
                </p>
              </div>

              <div className="text-[12px] leading-4 text-text-secondary flex items-center justify-between">
                <p className="">Payment Reference</p>
                <p className="">FH-PAY-2472-001</p>
              </div>

              <div className="flex items-center gap-1">
                <img src={infoIcon} alt="" />
                <p className="text-[12px] text-text-secondary leading-4">
                  Payment is held securely by FindaHome until inspection is
                  complete
                </p>
              </div>
            </div>

            {/* payment not successful */}
            {/* <div className="flex items-center bg-[#FF6B6B26] border border-state-error py-2 px-3 gap-2 rounded-xl mt-4">
            <img src={paymentError} alt="" />
            <p className="text-[12px] leading-4 text-state-error">
              Insufficient funds in your escrow wallet. Please fund your wallet
              to continue
            </p>
            </div>

            <div className="flex items-center justify-between mt-10.5 gap-4">
            <button className="rounded-lg h-[45px] flex items-center justify-center bg-button-disabled border border-text-secondary text-[14px] tracking-[1px] font-raleway font-semibold cursor-pointer w-full">
              Cancel
            </button>

            <button className="rounded-lg h-[45px] flex items-center justify-center bg-button-bg text-[14px] tracking-[1px] font-raleway font-semibold text-white w-full">
              Fund Wallet
            </button>
            </div> */}

            <div className="mt-[29px] flex flex-col items-center justify-center gap-1">
              <button className="text-[14px] tracking-[1px] font-raleway font-semibold text-white button-style w-full h-[45px] rounded-lg flex justify-center items-center">
                Confirm payment from wallet
              </button>

              <p className="text-[12px] text-text-secondary leading-4">
                By proceeding, you agree to FindaHome's escrow policy
              </p>
            </div>

            <div className="mt-3 mb-4 text-center">
              <Link
                to=""
                className="text-[12px] text-text-secondary leading-4 text-center border-b border-b-button-bg"
              >
                Having issues with agent? Open a dispute
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
