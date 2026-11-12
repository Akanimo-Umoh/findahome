import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import calendarIcon from "@/assets/images/icon-calendar.svg"
import propertyImg from "@/assets/images/property.jpg"
import blueNaira from "@/assets/images/icon-naira.svg"
import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"
import copyIcon from "@/assets/images/icon-green-clipboard.svg"
import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
// import HandoverScheduleOverlay from "./HandoverScheduleOverlay";

export default function PropertyHandoverSchedule() {
  const navigate = useNavigate()

  const buyerDetails = [
    {
      icon: userIcon,
      title: "Name",
      detail: "Victoria Ntekim",
    },
    {
      icon: phoneIcon,
      title: "Phone Number",
      detail: "08152833119",
    },
    {
      icon: emailIcon,
      title: "Email",
      detail: "etimvictoria62@gmail.com",
    },
  ]

  const indpectionDetails = [
    {
      icon: blueCalendarIcon,
      title: "Date",
      detail: "14th Nov, 2025",
    },
    {
      icon: timeIcon,
      title: "Time",
      detail: "10:00am",
    },
    {
      icon: locationIcon,
      title: "Location",
      detail: "Lekki Toll Gate",
    },
  ]

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
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Transaction Details
        </p>
      </div>

      <main className="mt-6.5">
        <div className="flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-bg">
            <img src={calendarIcon} alt="" />
          </div>

          <div className="flex-1">
            <p className="text-[14px]">
              Inspection Scheduled — Awaiting Your Confirmation
            </p>
            <p className="text-[12px] leading-4 text-text-secondary">
              You need to confirm or reschedule.
            </p>
          </div>
        </div>

        <section className="mt-7 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <div>
            <img
              src={propertyImg}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                Luxury 4 Bed-room Apartment
              </p>
              <div className="flex items-center gap-2">
                <p className="flex items-center">
                  <img src={blueNaira} alt="" className="h-4 w-4" />
                  <span className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    3,000,000
                  </span>
                </p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-[12px] leading-4 text-bg-tertiary">
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
        </section>

        {/* buyer details */}
        <section>
          <p>Buyer Details</p>

          <div className="mt-2 space-y-4">
            {buyerDetails.map((buyerDetail, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-bg-accent">
                  <img src={buyerDetail.icon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">{buyerDetail.title}</p>
                  <p className="text-[14px] font-semibold">
                    {buyerDetail.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* payment summary */}
          <div className="mt-6">
            <p className="">Payment Summary</p>

            <div className="payment-summary mt-2 space-y-2">
              <div className="payment-summary-ctn">
                <p className="">Payment in Escrow</p>
                <p className="flex items-center justify-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                  <img src={blueNaira} alt="" className="h-4 w-4" />
                  <span>3,000,000</span>
                </p>
              </div>

              <div className="payment-summary-ctn">
                <p>Payment Type</p>
                <p className="text-text-secondary">Property Fee</p>
              </div>

              <div className="payment-summary-ctn">
                <p className="">Reference Number</p>
                <p className="flex items-center justify-center gap-0.5 text-text-secondary">
                  <span>Ref ID: FH-TRX-002834</span>
                  <img src={copyIcon} alt="" />
                </p>
              </div>

              <div className="payment-summary-ctn">
                <p>Date Paid</p>
                <p className="text-text-secondary">15th Nov,2025</p>
              </div>
            </div>
          </div>

          {/* inspection details */}
          <div className="mt-6">
            <p>Handover Details</p>

            <div className="mt-2 space-y-2">
              {indpectionDetails.map((inspectionDetail, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-bg-accent">
                    <img src={inspectionDetail.icon} alt="" />
                  </div>

                  <div>
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {inspectionDetail.title}
                    </p>
                    <p className="text-[14px]">{inspectionDetail.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* escrow timeline */}
          <div className="mt-6">
            <p>Escrow Timeline</p>

            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
                  <img src={checkIcon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">Payment Made by Buyer</p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    11 Nov · 3:22 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
                  <img src={checkIcon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">Funds held in Escrow</p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    11 Nov · 3:22 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-[#149D18]">
                  <img src={checkIcon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">Agent scheduled an handover</p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    11 Nov · 3:22 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
                  {/* <img src={checkIcon} alt="" /> */}
                </div>

                <div>
                  <p className="text-[14px]">
                    Handover schedule not confirmed yet
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    Agent must confirm inspection completion
                    {/* if it is completed, show the time and remove the other text */}
                    {/* 11 Nov · 3:22 PM */}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
                  <img src={checkIcon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">Handover Completed</p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {/* replace the text with date and time if it is complete= 11 Nov · 3:22 PM */}
                    Pending completion
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-button-disabled">
                  <img src={checkIcon} alt="" />
                </div>

                <div>
                  <p className="text-[14px]">Payment Released</p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    {/* replace the text with date and time if it is complete= 11 Nov · 3:22 PM */}
                    Pending completion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="mt-6 mb-10 space-y-3">
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                Confirm Handover schedule
              </button>

              {/* suggest new time takes the user back to the chat, only the agent can reschedule */}
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
        {/* <HandoverScheduleOverlay /> */}
      </main>
    </div>
  )
}
