import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";
import campaignIcon from "@/assets/agentImages/icon-campaign.svg";
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg";
import viewsIcon from "@/assets/agentImages/icon-visibility.svg";

export default function AdPreview() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro flex flex-col mb-10 mx-6">
      <header className="">
        {/* header */}
        <div className="flex items-center justify-center relative">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>

          <p className="text-[18px] font-raleway font-semibold">Ad Preview</p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <img src={apartmentImg} alt="" className="" />

          <div className="space-y-2">
            <p className="font-raleway font-semibold tracking-[1px] line-clamp-2">
              3 Bed-room Apartment, Lekki phase 1
            </p>
            <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-text-secondary">
              Lekki, Lagos State
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={blueNaira} alt="" />
                <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-button-bg">
                  3,000,000
                </p>
              </div>

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg p-2 border border-button-bg">
                View Listing
              </button>
            </div>
          </div>

          <p className="text-[14px] text-text-secondary mt-6 text-center">
            This is how your ad will appear to buyers
          </p>
        </div>

        {/* campaign  summary */}
        <div className="mt-4">
          <p>Campaign Summary</p>

          <div className="flex items-center gap-3 border border-bg-accent rounded-xl mt-4 p-2">
            <img
              src={apartmentImg}
              alt=""
              className="w-10 h-10 rounded-lg object-cover"
            />

            <div className="space-y-2">
              <p className="text-[12px] leading-4 text-text-secondary">
                Selected Listing
              </p>
              <p className="font-raleway font-semibold text-[12px] tracking-[1px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
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
                <img src={blueNaira} alt="" className="w-4 h-4" />
                <p className="text-[14px] font-raleway font-semibold text-button-bg">
                  15,000
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p>Estimated Performance</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="bg-bg-accent py-3 px-4 rounded-lg">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="w-4 h-4" />
                <p className="text-[14px] text-text-secondary">Est. Views</p>
              </div>

              <p className="text-[14px]">2.5k - 4.8k</p>

              {/* progress bar */}
              <div>{/* blue progress and white track h-1 rounded-xl */}</div>
            </div>

            <div className="bg-bg-accent py-3 px-4 rounded-lg">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="w-4 h-4" />
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
          <button className="button-style w-full h-[45px] rounded-lg text-white font-raleway font-semibold text-[14px] tracking-[1px]">
            Launch Campaign
          </button>
        </div>
      </main>
    </div>
  );
}
