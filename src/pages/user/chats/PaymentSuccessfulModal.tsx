// import successImg from "@/assets/images/img-inspection-fee-successful.png";
// import { useEffect } from "react";

// type PaymentSuccessfulProps = {
//   isOpen: boolean;
//   onClose: () => void;
// };

// export default function PaymentSuccessfulModal({
//   isOpen,
//   onClose,
// }: PaymentSuccessfulProps {
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
