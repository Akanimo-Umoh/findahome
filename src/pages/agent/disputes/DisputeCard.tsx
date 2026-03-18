import nairaIcon from "@/assets/images/icon-naira.svg";
import rightArrow from "@/assets/images/icon-right-carousel.svg";

export default function DisputeCard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-bg-accent gap-1 p-3 relative">
        <div className="flex flex-col gap-2 w-full">
          <div className="space-y-2 mr-6">
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              FH-TRX-002834
            </p>
            <p className="text-[14px]">
              <span className="text-[#149D18]">Dispute Type:</span> Payments
            </p>
            <p className="text-[14px]">3 bedroom apartment, Lekki Phase 1</p>
            <div className="flex items-center">
              <img src={nairaIcon} alt="" className="w-4 h-4" />
              <p className="text-button-bg font-raleway font-semibold tracking-[1px] text-[14px]">
                3,000,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl py-0.5 px-2 bg-[#D02727] flex items-center justify-center">
              <p className="text-[12px] leading-4 text-bg-tertiary">
                Pending Review
              </p>
            </div>

            {/* if it is resolved, the bg and text should change */}
            {/* <div className="rounded-2xl py-0.5 px-2 bg-[#149D18] flex items-center justify-center">
              <p className="text-[12px] leading-4 text-bg-tertiary">Resolved</p>
            </div> */}
            <p className="text-[14px] text-text-secondary">
              Last updated: Nov 21, 2026
            </p>
          </div>
        </div>

        <img src={rightArrow} alt="" className="absolute right-3" />
      </div>

      <div className="flex items-center justify-between rounded-lg border border-bg-accent gap-1 p-3 relative">
        <div className="flex flex-col gap-2 w-full">
          <div className="space-y-2 mr-6">
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              FH-TRX-002834
            </p>
            <p className="text-[14px]">
              <span className="text-[#149D18]">Dispute Type:</span> Payments
            </p>
            <p className="text-[14px]">
              3 bedroom apartment, Lekki Phase 1 Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Temporibus, neque.
            </p>
            <div className="flex items-center">
              <img src={nairaIcon} alt="" className="w-4 h-4" />
              <p className="text-button-bg font-raleway font-semibold tracking-[1px] text-[14px]">
                3,000,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-2xl py-0.5 px-2 bg-[#D02727] flex items-center justify-center">
              <p className="text-[12px] leading-4 text-bg-tertiary">
                Pending Review
              </p>
            </div>
            <p className="text-[14px] text-text-secondary">
              Last updated: Nov 21, 2026
            </p>
          </div>
        </div>

        <img src={rightArrow} alt="" className="absolute right-3" />
      </div>
    </div>
  );
}
