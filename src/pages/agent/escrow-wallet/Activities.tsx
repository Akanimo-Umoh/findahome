import escrowReleaseIcon from "@/assets/agentImages/icon-escrow-release.svg";
import escrowHoldIcon from "@/assets/agentImages/icon-escrow-lock.svg";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";
import calendarCheck from "@/assets/agentImages/icon-calendar-check.svg";

export default function Activities() {
  return (
    <div>
      <p className="">Recent Activities/Notifications</p>

      {/* activities ctn */}
      <div className="mt-4 space-y-4">
        {/* property handover scheduled */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-state-error flex items-center justify-center shrink-0">
              <img src={calendarCheck} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Property Handover Scheduled
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

        {/* inspection scheduled */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-state-error flex items-center justify-center shrink-0">
              <img src={escrowHoldIcon} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Inspection Scheduled
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

        {/* withdrawal successful */}
        <div className="flex items-start gap-2 p-2 justify-between border border-bg-accent rounded-xl">
          <div className="flex flex-1 gap-3">
            <div className="w-10 h-10 rounded-full bg-state-error flex items-center justify-center shrink-0">
              <img src={calendarCheck} alt="" />
            </div>

            <div>
              <p className="text-[12px] font-raleway font-semibold tracking-[1px] line-clamp-2">
                Property Handover Scheduled
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
