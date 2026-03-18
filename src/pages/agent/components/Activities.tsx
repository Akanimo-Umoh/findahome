import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg";
import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg";
import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";

export default function Activities() {
  return (
    <div>
      <p className="">Recent Activities/Notifications</p>

      {/* activities ctn */}
      <div className="mt-4 space-y-4">
        {/* escrow release */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#149D18] flex items-center justify-center shrink-0">
              <img src={escrowReleaseIcon} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Escrow Release - Lekki Phase 1 Apartment
              </p>
              <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                Buyer confirmed inspection
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Today . 12:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="text-button-bg">10,000</p>
          </div>
        </div>

        {/* escrow hold */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF6B6B] flex items-center justify-center shrink-0">
              <img src={escrowHoldIcon} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Escrow Hold - Ikoyi Duplex
              </p>
              <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                Buyer confirmed inspection
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Today . 12:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="text-button-bg">3,500,000</p>
          </div>
        </div>

        {/* withdrawal successful */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-button-bg flex items-center justify-center shrink-0">
              <img src={withdrawIcon} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Withdrawal successful
              </p>
              <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                Transferred to First Bank ****4810
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                2 days ago . 10:00 AM
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="text-button-bg">3,500,000</p>
          </div>
        </div>

        {/* escrow release */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#149D18] flex items-center justify-center shrink-0">
              <img src={escrowReleaseIcon} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Escrow Release - 2- Bedroom Apartment, Ikorodu, Lagos.
              </p>
              <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                Buyer confirmed property handover.
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                10th Nov, 2025 . 14:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" />
            <p className="text-button-bg">700,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
