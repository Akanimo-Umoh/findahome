import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import apartmentImg from "@/assets/images/img-apartment.png"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import locationIcon from "@/assets/agentImages/icon-white-location.svg"
import ytIcon from "@/assets/agentImages/icon-youtube.svg"
import locationImg from "@/assets/agentImages/img-location-img.jpg"
import locIcon from "@/assets/images/icon-inspection-visit-location.svg"
import PickDate from "./PickDate"
// import ScheduledSuccessfully from "./ScheduledSuccessfully";

export default function PropertyHandoverSchedule() {
  const navigate = useNavigate()

  return (
    // transaction details for inspection
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Schedule Handover
        </p>
      </div>

      <section className="mt-6">
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={apartmentImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    3,000,000
                  </p>
                </div>
                <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-[12px] leading-4 text-white">
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
          <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-button-bg p-2 hover:bg-button-hover">
            <img src={locationIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              Physical Visit
            </p>
          </button>

          <button className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-text-secondary bg-button-disabled p-2">
            <img src={ytIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
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
          <div className="relative mt-2 flex items-center justify-center">
            <img
              src={locationImg}
              alt=""
              className="h-30.5 w-full rounded-xl object-cover"
            />
            <div className="absolute rounded-xl bg-button-bg px-2 py-3">
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

        <div className="mt-2 h-25 rounded-xl border border-text-disabled p-2">
          <textarea
            name=""
            id="notes"
            placeholder="Any specific questions or requirement for the visit?"
            className="w-full text-[12px] leading-4 outline-none"
            rows={5}
          />
        </div>

        <div className="mt-[21px] flex items-center gap-3">
          <input
            type="checkbox"
            name=""
            id="confirmation"
            className="h-5 w-5 shrink-0"
          />
          <label
            htmlFor="confirmation"
            className="text-[12px] leading-4 text-text-secondary"
          >
            I confirm that I will attend this scheduled visit and understand
            that failure to attend may affect future booking privileges.
          </label>
        </div>

        <button className="mt-8 h-[45px] w-full rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white hover:bg-button-hover">
          Schedule Property Handover
        </button>
      </div>

      {/* if visit has been scheduled, this component shows */}
      {/* <ScheduledSuccessfully /> */}
    </div>
  )
}
