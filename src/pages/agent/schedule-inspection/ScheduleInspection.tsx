import apartmentImg from "@/assets/images/img-apartment.png"
import calendarIcon from "@/assets/images/icon-calendar.svg"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import locationIcon from "@/assets/agentImages/icon-white-location.svg"
// import ytIcon from "@/assets/agentImages/icon-youtube.svg"
import PickDate from "./PickDate"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/PageHeader"
// import ScheduledSuccessfully from "./ScheduledSuccessfully";

export default function ScheduleInspection() {
  return (
    // transaction details for inspection
    <div className="mb-10 md:pt-6 lg:pt-8">
      {/* header */}
      <PageHeader title="Schedule Inspection" responsive />

      <div className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
        <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
          <img src={calendarIcon} alt="" />
        </div>
        <div className="">
          <p className="text-[14px]">Inspection Schedule</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            You need to schedule this inspection.
          </p>
        </div>
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
          <Button
            variant="app-primary"
            size="full"
            className="flex flex-1 items-center justify-center gap-1"
          >
            <img src={locationIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              Physical Visit
            </p>
          </Button>

          {/* <Button
            variant="app-secondary"
            size="full"
            className="flex flex-1 items-center justify-center gap-1"
          >
            <img src={ytIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              Virtual Tour
            </p>
          </Button> */}
        </div>

        {/* date picker */}
        <div className="mt-4">
          <PickDate />
        </div>

        {/* location */}
        <div className="mt-[21px]">
          <p>Property Location</p>
          <div className="relative mt-2">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent("Lekki Phase 1, Lagos State")}&output=embed`}
              className="h-30.5 w-full rounded-xl"
              loading="lazy"
              title="Property location"
            />
          </div>

          <p className="mt-2 text-[12px] leading-4 text-black">
            Lekki Phase 1, Lagos State
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div className="flex items-center gap-3">
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

        <Button variant="app-primary" size="full">
          Schedule Visit
        </Button>
      </div>

      {/* if visit has been scheduled, this component shows */}
      {/* <ScheduledSuccessfully /> */}
    </div>
  )
}
