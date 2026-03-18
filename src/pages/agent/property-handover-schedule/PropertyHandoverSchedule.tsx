import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import apartmentImg from "@/assets/images/img-apartment.png";
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";
import locationIcon from "@/assets/agentImages/icon-white-location.svg";
import ytIcon from "@/assets/agentImages/icon-youtube.svg";
import locationImg from "@/assets/agentImages/img-location-img.jpg";
import locIcon from "@/assets/images/icon-inspection-visit-location.svg";
import PickDate from "./PickDate";
// import ScheduledSuccessfully from "./ScheduledSuccessfully";

export default function PropertyHandoverSchedule() {
  const navigate = useNavigate();

  return (
    // transaction details for inspection
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Schedule Handover
        </p>
      </div>

      <section className="mt-6">
        <div className="border border-bg-accent rounded-xl p-2 flex items-center gap-3">
          <img
            src={apartmentImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="w-4 h-4" />
                  <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
                    3,000,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1 flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit text-white">
                In Escrow
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 2hrs ago
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4">
        <p>Visit Type</p>

        {/* visit type */}
        <div className="mt-2 flex items-center justify-between gap-4">
          <button className="bg-button-bg flex items-center rounded-lg p-2 gap-2 hover:bg-button-hover cursor-pointer w-full">
            <img src={locationIcon} alt="" />
            <p className="font-raleway font-semibold text-[14px] tracking-[1px] text-white">
              Physical Visit
            </p>
          </button>

          <button className="bg-button-disabled flex items-center rounded-lg p-2 gap-2 cursor-pointer border border-text-secondary w-full">
            <img src={ytIcon} alt="" />
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              Virtual Tour
            </p>
          </button>
        </div>

        {/* date picker */}
        <div className="mt-4">
          <PickDate />
        </div>

        {/* location */}
        <div className="mt-[21px]">
          <p>Property Location</p>
          <div className="relative flex items-center justify-center mt-2">
            <img
              src={locationImg}
              alt=""
              className="h-30.5 w-full object-cover rounded-xl"
            />
            <div className="bg-button-bg py-3 px-2 rounded-xl absolute">
              <img src={locIcon} alt="" />
            </div>
          </div>
          <p className="mt-2 text-[12px] leading-4 text-black">
            Lekki Phase 1, Lagos State
          </p>
        </div>
      </div>

      {/* additional notes */}
      <div className="mt-[21px]">
        <label htmlFor="notes">Additional Note(Optional)</label>

        <div className="border border-text-disabled rounded-xl h-25 p-2 mt-2">
          <textarea
            name=""
            id="notes"
            placeholder="Any specific questions or requirement for the visit?"
            className="text-[12px] leading-4 w-full outline-none"
            rows={5}
          />
        </div>

        <div className="mt-[21px] flex gap-3 items-center">
          <input
            type="checkbox"
            name=""
            id="confirmation"
            className="w-5 h-5 shrink-0"
          />
          <label
            htmlFor="confirmation"
            className="text-[12px] leading-4 text-text-secondary"
          >
            I confirm that I will attend this scheduled visit and understand
            that failure to attend may affect future booking privileges.
          </label>
        </div>

        <button className="font-raleway font-semibold text-[14px] tracking-[1px] h-[45px] rounded-lg bg-button-bg w-full hover:bg-button-hover text-white mt-8">
          Schedule Property Handover
        </button>
      </div>

      {/* if visit has been scheduled, this component shows */}
      {/* <ScheduledSuccessfully /> */}
    </div>
  );
}
