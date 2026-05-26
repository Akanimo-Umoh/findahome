import propertyImg from "@/assets/images/property.jpg"
import iconOptions from "@/assets/images/icon-chat-options.svg"
import { useEffect } from "react"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import blueNairaIcon from "@/assets/images/naira.svg"
import escrowIcon from "@/assets/images/icon-pay-inspection-fee.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Link } from "react-router-dom"

// import paymentError from "@/assets/images/icon-pay-inspection-fee-error.svg";

type PayInspectionProps = {
  isOpen: boolean
  onClose: () => void
}

export default function PayInspectionModal({
  isOpen,
  onClose,
}: PayInspectionProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute right-0 bottom-0 left-0 rounded-t-[24px] bg-white px-6 pt-[50px]">
        <div className="relative flex items-center justify-center">
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
            Pay Inspection Fee
          </p>

          <button className="absolute top-0 right-0">
            <img src={iconOptions} alt="" />
          </button>
        </div>

        {/* wallet balance */}
        <div className="mt-[23px] flex items-center gap-2 rounded-xl border border-bg-accent p-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-accent">
            <img src={escrowIcon} alt="" />
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-text-secondary">Escrow Wallet Balance</p>
            <p className="flex items-center font-raleway text-[18px] font-bold tracking-[1px] text-button-bg">
              <img src={blueNairaIcon} alt="" className="h-6 w-6" />
              <span>18,000</span>
            </p>
          </div>
        </div>

        {/* details ctn */}
        <div className="mt-8 space-y-2">
          {/* property details */}
          <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
            <img
              src={propertyImg}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />

            <div className="flex flex-col justify-center">
              <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                Luxury 4 Bed-room Apartment
              </p>

              <div className="flex items-center text-[12px] leading-4 text-text-secondary">
                <p className="">Lekki Phase 1, Lagos.</p>
                <p className="flex items-center">
                  <img src={nairaIcon} alt="" className="h-4 w-4" />
                  <span>3M/yr</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-xl bg-bg-accent px-3 py-2">
            <div className="flex items-center justify-between">
              <p className="text-text-primary">Inspection fee</p>
              <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                <span>5,000</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-[12px] leading-4 text-text-secondary">
              <p className="">Payment Reference</p>
              <p className="">FH-PAY-2472-001</p>
            </div>

            <div className="flex items-center gap-1">
              <img src={infoIcon} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
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
            <button className="button-style flex h-[45px] w-full items-center justify-center rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              Confirm payment from wallet
            </button>

            <p className="text-[12px] leading-4 text-text-secondary">
              By proceeding, you agree to FindaHome's escrow policy
            </p>
          </div>

          <div className="mt-3 mb-4 text-center">
            <Link
              to=""
              className="border-b border-b-button-bg text-center text-[12px] leading-4 text-text-secondary"
            >
              Having issues with agent? Open a dispute
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
