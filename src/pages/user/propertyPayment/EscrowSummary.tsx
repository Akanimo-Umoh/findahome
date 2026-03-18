import blackNaira from "@/assets/images/icon-black-naira.svg";
import greyInfo from "@/assets/images/icon-grey-info.svg";

export default function EscrowSummary() {
  return (
    <div className="text-text-primary">
      <div>
        <p>Escrow Summary</p>

        <div className="rounded-xl p-2 flex flex-col gap-3 bg-bg-accent border border-bg-accent">
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4">Escrow ID:</p>

            <p className="text-[12px] font-semibold">FH-2458</p>
          </div>

          {/* Property Amount */}
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4">Property Amount</p>

            <p className="flex items-center text-[14px] font-raleway font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="w-4 h-4" />
              <span>3,000,000</span>
            </p>
          </div>

          {/* Escrow fee */}
          <div className="flex items-center justify-between">
            <p className="text-[12px] leading-4 flex items-center">
              <span>Escrow fee</span>
              <img src={greyInfo} alt="" />
            </p>

            <p className="flex items-center text-[14px] font-raleway font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="w-4 h-4" />
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
            <p className="text-[14px] tracking-[1px] font-raleway font-semibold">
              Total Fee
            </p>

            <p className="flex items-center text-[14px] font-raleway font-semibold tracking-[1px]">
              <img src={blackNaira} alt="" className="w-4 h-4" />
              <span>3,060,000</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
