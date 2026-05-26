import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import apartmentImg from "@/assets/images/img-apartment.png"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import campaignIcon from "@/assets/agentImages/icon-campaign.svg"
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg"
import viewsIcon from "@/assets/agentImages/icon-visibility.svg"

export default function AdPreview() {
  const navigate = useNavigate()

  return (
    <div className="mx-6 mb-10 flex flex-col font-ssPro">
      <header className="">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="font-raleway text-[18px] font-semibold">Ad Preview</p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <img src={apartmentImg} alt="" className="" />

          <div className="space-y-2">
            <p className="line-clamp-2 font-raleway font-semibold tracking-[1px]">
              3 Bed-room Apartment, Lekki phase 1
            </p>
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-text-secondary">
              Lekki, Lagos State
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={blueNaira} alt="" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                  3,000,000
                </p>
              </div>

              <button className="rounded-lg border border-button-bg p-2 font-raleway text-[14px] font-semibold tracking-[1px]">
                View Listing
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-[14px] text-text-secondary">
            This is how your ad will appear to buyers
          </p>
        </div>

        {/* campaign  summary */}
        <div className="mt-4">
          <p>Campaign Summary</p>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
            <img
              src={apartmentImg}
              alt=""
              className="h-10 w-10 rounded-lg object-cover"
            />

            <div className="space-y-2">
              <p className="text-[12px] leading-4 text-text-secondary">
                Selected Listing
              </p>
              <p className="font-raleway text-[12px] font-semibold tracking-[1px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={campaignIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Campaign Goal</p>
              </div>
              <p className="text-[14px]">More Views</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Duration</p>
              </div>

              <p className="text-[14px]">Nov 17 - Nov 22</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Total Budget</p>
              </div>

              <div className="flex items-center">
                <img src={blueNaira} alt="" className="h-4 w-4" />
                <p className="font-raleway text-[14px] font-semibold text-button-bg">
                  15,000
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p>Estimated Performance</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[14px] text-text-secondary">Est. Views</p>
              </div>

              <p className="text-[14px]">2.5k - 4.8k</p>

              {/* progress bar */}
              <div>{/* blue progress and white track h-1 rounded-xl */}</div>
            </div>

            <div className="rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[14px] text-text-secondary">Est. Views</p>
              </div>

              <p className="text-[14px]">120 -260</p>

              {/* progress bar */}
              <div>{/* blue progress and white track h-1 rounded-xl */}</div>
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-10">
          <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            Launch Campaign
          </button>
        </div>
      </main>
    </div>
  )
}
