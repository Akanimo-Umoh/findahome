import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg"
import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw-successful.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"

export default function Activities() {
  return (
    <div>
      <p className="">Recent Activities/Notifications</p>

      {/* activities ctn */}
      <div className="mt-4 space-y-4">
        {/* escrow release */}
        <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
          <div className="flex flex-1 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
              <img src={escrowReleaseIcon} alt="" />
            </div>

            <div>
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                Escrow Release - Lekki Phase 1 Apartment
              </p>
              <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
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
        <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
          <div className="flex flex-1 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FF6B6B]">
              <img src={escrowHoldIcon} alt="" />
            </div>

            <div>
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                Escrow Hold - Ikoyi Duplex
              </p>
              <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
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
        <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
          <div className="flex flex-1 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-button-bg">
              <img src={withdrawIcon} alt="" />
            </div>

            <div>
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                Withdrawal successful
              </p>
              <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
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
        <div className="flex items-start justify-between gap-2 rounded-xl border border-bg-accent p-2">
          <div className="flex flex-1 gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
              <img src={escrowReleaseIcon} alt="" />
            </div>

            <div>
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                Escrow Release - 2- Bedroom Apartment, Ikorodu, Lagos.
              </p>
              <p className="line-clamp-1 text-[12px] leading-4 text-text-secondary">
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
  )
}
