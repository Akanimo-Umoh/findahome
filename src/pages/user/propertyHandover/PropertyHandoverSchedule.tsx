import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import calendarIcon from "@/assets/images/icon-calendar.svg";
import propertyImg from "@/assets/images/property.jpg";
import blueNaira from "@/assets/images/icon-naira.svg";
import userIcon from "@/assets/images/icon-inspection-schedule-user.svg";
import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg";
import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg";
import copyIcon from "@/assets/images/icon-green-clipboard.svg";
import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg";
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg";
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg";
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg";
// import HandoverScheduleOverlay from "./HandoverScheduleOverlay";

export default function PropertyHandoverSchedule() {
  const navigate = useNavigate();

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
  ];

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
  ];

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
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Transaction Details
        </p>
      </div>

      <main className="mt-6.5">
        <div className="flex items-center gap-1 py-2 px-3 bg-bg-accent border border-bg-accent rounded-lg">
          <div className="w-7.5 h-7.5 bg-button-bg flex items-center justify-center rounded-full">
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

        <section className="mt-7 flex items-center gap-3 p-2 border border-bg-accent rounded-xl">
          <div>
            <img
              src={propertyImg}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div>
              <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
                Luxury 4 Bed-room Apartment
              </p>
              <div className="flex items-center gap-2">
                <p className="flex items-center">
                  <img src={blueNaira} alt="" className="w-4 h-4" />
                  <span className="text-[14px] tracking-[1px] font-raleway font-semibold text-button-bg">
                    3,000,000
                  </span>
                </p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[12px] leading-4 text-bg-tertiary bg-[#F39C12] py-1 px-2 rounded-2xl w-fit">
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
                <div className="w-7.5 h-7.5 rounded-lg bg-bg-accent flex items-center justify-center">
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

            <div className="mt-2 payment-summary space-y-2">
              <div className="payment-summary-ctn">
                <p className="">Payment in Escrow</p>
                <p className="text-[14px] tracking-[1px] text-button-bg font-raleway font-semibold flex items-center justify-center">
                  <img src={blueNaira} alt="" className="w-4 h-4" />
                  <span>3,000,000</span>
                </p>
              </div>

              <div className="payment-summary-ctn">
                <p>Payment Type</p>
                <p className="text-text-secondary">Property Fee</p>
              </div>

              <div className="payment-summary-ctn">
                <p className="">Reference Number</p>
                <p className="text-text-secondary flex items-center justify-center gap-0.5">
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
                  <div className="w-7.5 h-7.5 rounded-full bg-bg-accent flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-[#149D18] flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
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
                <div className="w-7.5 h-7.5 rounded-full bg-button-disabled flex items-center justify-center">
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
          <div className="mt-6 space-y-3 mb-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white">
                Confirm Handover schedule
              </button>

              {/* suggest new time takes the user back to the chat, only the agent can reschedule */}
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] bg-button-disabled border border-text-secondary h-[45px] w-full rounded-lg">
                Suggest New Time
              </button>
            </div>

            <p className="text-[12px] leading-4 text-text-secondary text-center">
              Having issues with agent?&nbsp;
              <span className="text-button-bg">Open a dispute</span>
            </p>
          </div>
        </section>

        {/* when user clicks confirm inspection schedule, this component shows up */}
        {/* <HandoverScheduleOverlay /> */}
      </main>
    </div>
  );
}
