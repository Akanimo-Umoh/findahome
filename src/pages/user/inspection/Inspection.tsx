import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import calendarIcon from "@/assets/images/icon-calendar.svg"
import propertyImg from "@/assets/images/property.jpg"
import blueNaira from "@/assets/images/icon-naira.svg"
import BuyerDetails from "@/components/userInspection/BuyerDetails"
import PaymentSummary from "@/components/userInspection/PaymentSummary"
import EscrowTimeline from "@/components/userInspection/EscrowTimeline"
import InspectionDetails from "@/components/userInspection/InspectionDetails"
// import InspectionScheduledModal from "./InspectionScheduledModal";

export default function Inspection() {
  const navigate = useNavigate()

  // const escrowTimelines = [
  //   {
  //     icon: checkIcon,
  //     title: "Date",
  //     detail: "14th Nov, 2025",
  //   },
  //   {
  //     icon: checkIcon,
  //     title: "Time",
  //     detail: "10:00am",
  //   },
  //   {
  //     icon: checkIcon,
  //     title: "Location",
  //     detail: "Lekki Toll Gate",
  //   },
  // ];

  return (
    <div className="px-6 md:px-8">
      <div className="mx-auto max-w-7xl text-text-primary md:mt-6">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
            <span className="md:hidden">Transaction Details</span>
            <span className="hidden md:block">Escrow Transaction Details</span>
          </p>
        </div>

        <main className="mt-6">
          <div className="flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-bg md:h-9.5 md:w-9.5">
              <img src={calendarIcon} alt="" className="md:h-6 md:w-6" />
            </div>

            <div className="flex-1">
              <p className="text-[14px] md:text-[16px]">
                Inspection Scheduled — Awaiting Your Confirmation
              </p>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                You need to confirm or reschedule this inspection.
              </p>
            </div>
          </div>

          {/* property detail */}
          <section className="mt-6 flex items-center gap-3 rounded-xl border border-bg-accent p-2 md:py-4">
            <div>
              <img
                src={propertyImg}
                alt=""
                className="h-15 w-15 rounded-lg object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="space-y-1">
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
                  Luxury 4 Bed-room Apartment
                </p>
                <div className="flex items-center gap-2">
                  <p className="flex items-center">
                    <img src={blueNaira} alt="" className="h-4 w-4" />
                    <span className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
                      3,000,000
                    </span>
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                    Agent: Jasmine Properties
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 text-[12px] md:text-[14px]">
                <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 leading-4 text-bg-tertiary md:leading-5.25">
                  In Escrow
                </p>
                <p className="leading-4 text-text-secondary">
                  Ref ID: FH-TRX-002834
                </p>
                <p className="leading-4 text-text-secondary">
                  Last updated: 2hrs ago
                </p>
              </div>
            </div>
          </section>

          {/* buyer details */}
          <section className="mt-6 space-y-6">
            <div>
              <BuyerDetails />
            </div>

            {/* payment summary */}
            <div>
              <PaymentSummary />
            </div>

            {/* inspection details */}
            <div>
              <InspectionDetails />
            </div>

            {/* escrow timeline */}
            <div>
              <EscrowTimeline />
            </div>

            {/* buttons */}
            <div className="mt-6 mb-10 space-y-3">
              <div className="flex flex-col items-center justify-center gap-4">
                <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                  Confirm Inspection schedule
                </button>

                <button className="h-[45px] w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
                  Suggest New Time
                </button>
              </div>

              <p className="text-center text-[12px] leading-4 text-text-secondary">
                Having issues with agent?&nbsp;
                <span className="text-button-bg">Open a dispute</span>
              </p>
            </div>
          </section>

          {/* when user clicks confirm inspection schedule, this component shows up */}
          {/* <InspectionScheduledModal /> */}
        </main>
      </div>
    </div>
  )
}
