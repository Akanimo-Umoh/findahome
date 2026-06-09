import closeIcon from "@/assets/images/closeMenu.svg"
import { useEffect } from "react"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import blueNairaIcon from "@/assets/images/naira.svg"
// import escrowIcon from "@/assets/images/icon-pay-inspection-fee.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Link } from "react-router-dom"

type PayInspectionProps = {
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
  propertyAddress: string
  propertyPrice: number
  propertyImage: string
}

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
    <div className="modal-enter fixed inset-0 z-50 h-full font-ssPro">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal */}
      <div className="absolute right-0 bottom-0 left-0 flex max-h-[90vh] flex-col rounded-t-[24px] bg-white">
        <div className="shrink-0 px-6 pt-[50px]">
          {/* header */}
          <div className="relative flex items-center justify-center">
            <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-text-primary">
              Pay Inspection Fee
            </p>

            <button onClick={onClose} className="absolute top-0 right-0">
              <img src={closeIcon} alt="" className="h-6 w-6" />
            </button>
          </div>

          {/* wallet balance */}
          {/* <div className="mt-[23px] flex items-center gap-2 rounded-xl border border-bg-accent p-2">
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
          </div> */}

          {/* details ctn */}
          <div className="mt-6 flex-1 space-y-2 overflow-y-auto">
            {/* property details */}
            <div className="flex items-center gap-2 rounded-xl border border-bg-accent p-2">
              <img
                src={propertyImage}
                alt={propertyTitle}
                className="h-15 w-15 rounded-lg object-cover"
              />

              <div className="flex flex-col justify-center">
                <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] text-text-primary">
                  {propertyTitle}
                </p>

                <div className="flex items-center text-[12px] leading-4 text-text-secondary">
                  <p className="line-clamp-1 flex-1">{propertyAddress}</p>
                  <p className="flex items-center">
                    <img src={nairaIcon} alt="" className="h-4 w-4" />
                    <span>{propertyPrice?.toLocaleString()}</span>
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

            <div className="mt-[29px] flex flex-col items-center justify-center gap-1">
              <button className="button-style flex h-[45px] w-full items-center justify-center rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                Confirm payment from wallet
              </button>

              <p className="text-[12px] leading-4 text-text-secondary">
                By proceeding, you agree to FindaHome's escrow policy
              </p>
            </div>

            <div className="mt-3 mb-8 text-center">
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
    </div>
  )
}
