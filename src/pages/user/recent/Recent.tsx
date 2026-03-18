import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import keyIcon from "@/assets/images/icon-blue-key.svg";
import chatIcon from "@/assets/images/icon-go-to-chat.svg";
import nairaIcon from "@/assets/images/icon-chat-naira.svg";
import downloadIcon from "@/assets/images/icon-white-download.svg";
import cardholderIcon from "@/assets/images/icon-blue-cardholder.svg";
import blueInspectionIcon from "@/assets/images/icon-blue-eye.svg";
import verifiedIcon from "@/assets/images/icon-verified-green.svg";
import timeIcon from "@/assets/images/icon-white-time.svg";

export default function Recent() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Recent Activities
        </p>
      </div>

      <main className="mt-6">
        {/* filter bar */}
        <div className="text-[14px] flex justify-between">
          {/* this is the style for the active filter */}
          {/* <p className="text-[14px] text-white bg-button-bg p-2 rounded-lg">
            All
          </p> */}
          <p className="p-2">All</p>
          <p className="p-2">In Progress</p>
          <p className="p-2">Completed</p>
          <p className="p-2">Cancelled</p>
        </div>

        {/* recent main ctn */}
        <section className="mt-6 space-y-[23px]">
          {/* activities ctn */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={keyIcon} alt="" />
              </div>

              <div>
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Property Handover
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Awaiting Confirmation
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    Saturday, Oct 15th 10:00am
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg">
                View details
              </button>

              <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled flex items-center justify-center gap-2">
                <img src={chatIcon} alt="" />
                <p>Go to chat</p>
              </button>
            </div>
          </div>

          {/* the second one: when it is for payment released */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={cardholderIcon} alt="" />
              </div>

              <div className="relative">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Property Payment
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Payment released
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary flex items-center">
                    <img src={nairaIcon} alt="" />
                    <span>3,060,000</span>
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>

                <div className="absolute top-0 right-0">
                  <img src={verifiedIcon} alt="" />
                </div>
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg flex items-center justify-center gap-2">
                <img src={downloadIcon} alt="" />
                <span>Download Receipt</span>
              </button>

              <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled flex items-center justify-center gap-2">
                {/* <img src={chatIcon} alt="" /> */}
                <p>View Details</p>
              </button>
            </div>
          </div>

          {/* the third one: when it is for scheduled visit */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={blueInspectionIcon} alt="" />
              </div>

              <div className="relative">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Property Inspection
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Scheduled Visit
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary flex items-center">
                    Saturday, Oct 15th 10:00am
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>

                <div className="absolute top-0 right-0">
                  <img src={verifiedIcon} alt="" />
                </div>
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg flex items-center justify-center gap-2">
                View Details
              </button>
            </div>
          </div>

          {/* the fourth one: when it is for Payment held by system */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={cardholderIcon} alt="" />
              </div>

              <div className="relative">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Inspection Fee
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Payment held by system
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary flex items-center">
                    <img src={nairaIcon} alt="" />
                    <span>10,000</span>
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>

                <div className="absolute top-0 right-0">
                  <img src={verifiedIcon} alt="" />
                </div>
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg flex items-center justify-center gap-2">
                <img src={downloadIcon} alt="" />
                <span>Download Receipt</span>
              </button>

              <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled flex items-center justify-center gap-2">
                <p>View Details</p>
              </button>
            </div>
          </div>

          {/* the fifth one: when it is for handover schedule */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={keyIcon} alt="" />
              </div>

              <div className="relative">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Handover Schedule
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Awaiting Confirmation
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary flex items-center">
                    Saturday, Oct 15th 10:00am
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>

                {/* the verified icon only shows if the agent the user is dealing with is verified */}
                {/* <div className="absolute top-0 right-0">
                  <img src={verifiedIcon} alt="" />
                </div> */}
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg flex items-center justify-center gap-2">
                <img src={timeIcon} alt="" />
                <span>Reschedule</span>
              </button>

              <button className="h-[45px] font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg border border-text-secondary bg-button-disabled flex items-center justify-center gap-2">
                <p>View Details</p>
              </button>
            </div>
          </div>

          {/* the sixth one: when it is for inspection schedule */}
          <div className="space-y-4 border border-bg-accent pt-4 px-3 pb-2 rounded-lg recent-card">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-bg-accent flex items-center justify-center">
                <img src={blueInspectionIcon} alt="" />
              </div>

              <div className="relative">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Inspection Schedule
                </p>
                <div>
                  <p className="text-[12px] leading-4 text-[#10B981]">
                    Scheduled Visit
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary flex items-center">
                    Saturday, Oct 15th 10:00am
                  </p>
                </div>
                <p className="text-[14px]">
                  <span className="font-semibold">Agent:</span> Maryann Kikomu
                </p>
                <p className="text-[12px] tracking-[1px] font-raleway font-semibold line-clamp-1">
                  4 Bed-room Apartment, Lekki phase 1
                </p>

                {/* the verified icon only shows if the agent the user is dealing with is verified */}
                {/* <div className="absolute top-0 right-0">
                  <img src={verifiedIcon} alt="" />
                </div> */}
              </div>
            </div>

            {/* button links */}
            <div className="flex flex-col gap-2">
              <button className="button-style h-[45px] text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg flex items-center justify-center gap-2">
                View Details
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
