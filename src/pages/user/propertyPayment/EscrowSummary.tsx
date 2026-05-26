import blackNaira from "@/assets/images/icon-black-naira.svg"
import greyInfo from "@/assets/images/icon-grey-info.svg"

export default function EscrowSummary() {
  return (
    <div className="text-text-primary">
      <div>
        <p>Escrow Summary</p>

        <div className="flex flex-col gap-3 rounded-xl border border-bg-accent bg-bg-accent p-2">
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4">Escrow ID:</p>

            <p className="text-[12px] font-semibold">FH-2458</p>
          </div>

          {/* Property Amount */}
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4">Property Amount</p>

            <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <span>3,000,000</span>
            </p>
          </div>

          {/* Escrow fee */}
          <div className="flex items-center justify-between">
            <p className="flex items-center text-[12px] leading-4">
              <span>Escrow fee</span>
              <img src={greyInfo} alt="" />
            </p>

            <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <span>60,000</span>
            </p>
          </div>

          {/* Date Funded */}
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4">Date Funded</p>

            <p className="text-[12px] font-semibold">Oct 15, 2025</p>
          </div>

          {/* Total Fee */}
          <div className="flex items-center justify-between">
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              Total Fee
            </p>

            <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="h-4 w-4" />
              <span>3,060,000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
