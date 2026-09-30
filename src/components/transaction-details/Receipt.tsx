import { forwardRef } from "react"
import checkCircle from "@/assets/images/icon-inspection-schedule-check.svg"
import blueNaira from "@/assets/images/icon-naira.svg"

type ReceiptProps = {
  propertyTitle: string
  propertyAddress: string
  buyerName: string
  agentName: string
  price: number
  escrowFee: number
  serviceFee: number
  reference: string
  completedDate: string
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(function Receipt(
  {
    propertyTitle,
    propertyAddress,
    buyerName,
    agentName,
    price,
    escrowFee,
    serviceFee,
    reference,
    completedDate,
  },
  ref
) {
  const total = price + escrowFee + serviceFee

  return (
    <div
      ref={ref}
      className="w-full max-w-md rounded-2xl border border-bg-accent bg-white p-6 font-ssPro text-text-primary"
    >
      <div className="flex flex-col items-center gap-2 border-b border-dashed border-bg-accent pb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#149D1833]">
          <img src={checkCircle} alt="" className="h-6 w-6" />
        </div>
        <p className="font-raleway text-[16px] font-semibold tracking-[1px]">
          Transaction Receipt
        </p>
        <p className="text-[12px] text-text-secondary">
          FindaHome Escrow Confirmation
        </p>
      </div>

      <div className="space-y-1 border-b border-dashed border-bg-accent py-4">
        <p className="line-clamp-2 text-[14px] font-semibold">
          {propertyTitle}
        </p>
        <p className="text-[12px] text-text-secondary">{propertyAddress}</p>
      </div>

      <div className="space-y-2 border-b border-dashed border-bg-accent py-4 text-[13px]">
        <div className="flex justify-between">
          <span className="text-text-secondary">Buyer</span>
          <span>{buyerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Agent</span>
          <span>{agentName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Reference</span>
          <span>{reference}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Completed</span>
          <span>{completedDate}</span>
        </div>
      </div>

      <div className="space-y-2 py-4 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Property Price</span>
          <span className="flex items-center">
            <img src={blueNaira} alt="" className="h-3.5 w-3.5" />
            {price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Escrow Fee</span>
          <span className="flex items-center">
            <img src={blueNaira} alt="" className="h-3.5 w-3.5" />
            {escrowFee.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Service Fee</span>
          <span className="flex items-center">
            <img src={blueNaira} alt="" className="h-3.5 w-3.5" />
            {serviceFee.toLocaleString()}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-bg-accent pt-2 font-raleway text-[15px] font-semibold">
          <span>Total Paid</span>
          <span className="flex items-center text-button-bg">
            <img src={blueNaira} alt="" className="h-4 w-4" />
            {total.toLocaleString()}
          </span>
        </div>
      </div>

      <p className="mt-4 text-center text-[10px] text-text-secondary">
        Funds released to agent via FindaHome Escrow ·{" "}
        {new Date().getFullYear()}
      </p>
    </div>
  )
})

export default Receipt
