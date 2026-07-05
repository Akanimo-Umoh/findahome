import { Link, useNavigate } from "react-router-dom"
import checkIcon from "@/assets/images/icon-transaction-confirmed.svg"
import copyIcon from "@/assets/images/icon-inspection-schedule-copy.svg"
import userIcon from "@/assets/images/icon-inspection-schedule-user.svg"
import phoneIcon from "@/assets/images/icon-inspection-schedule-phone.svg"
import emailIcon from "@/assets/images/icon-inspection-schedule-email.svg"
import propertyImg from "@/assets/images/property.jpg"
import blueNaira from "@/assets/images/icon-naira.svg"
import goBack from "@/assets/images/icon-back.svg"
import whiteCalendar from "@/assets/images/icon-calendar.svg"
import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"
import { Button } from "@/components/ui/button"
import RequestSuccessful from "./RequestSuccessful"
import { useState } from "react"

export default function Phase1() {
  const navigate = useNavigate()
  const [isRequestSuccessOpen, setIsRequestSuccessOpen] = useState(false)

  const inspectionDetails = [
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

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl text-text-primary">
        {/* header */}
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <img src={goBack} alt="" className="h-6 w-6" />
          </button>

          <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
            Transaction Details
          </p>
        </div>

        {/* property details */}
        <section className="mt-6">
          <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
            <div className="shrink-0">
              <img
                src={propertyImg}
                alt=""
                className="h-15 w-15 rounded-lg object-cover"
              />
            </div>

            <div>
              <div className="">
                {/* property name */}
                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Luxury 4 Bed-room Apartment
                </p>

                {/* price & buyer name */}
                <div className="flex items-center">
                  <img src={blueNaira} alt="" className="h-4 w-4" />{" "}
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    3,000,000
                  </p>
                </div>
              </div>

              <div className="mt-1">
                <p className="w-fit rounded-2xl bg-agents-bg px-2 text-[12px] leading-4 text-bg-tertiary">
                  Paid
                </p>

                {/* last updated */}
                <p className="text-[12px] leading-4 text-text-secondary">
                  Last updated: <span>2hrs ago</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* banner */}
        <section className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
          <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
            <img src={whiteCalendar} alt="" />
          </div>

          <div>
            <p className="text-[14px]">
              Handover Scheduled — Awaiting Your Confirmation
            </p>

            <p className="text-[12px] leading-4 text-text-secondary">
              You need to confirm or reschedule this handover.
            </p>
          </div>
        </section>

        {/* payment summary */}
        <section className="mt-8">
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

              <p className="text-text-secondary">Handover Fee</p>
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
        </section>

        {/* inspection details */}
        <section className="mt-6">
          <p>Handover Details</p>

          <div className="mt-2 space-y-2">
            {inspectionDetails.map((inspectionDetail, index) => (
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
        </section>

        {/* escrow timeline */}
        <section className="mt-6">
          <p>Escrow Timeline</p>

          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
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
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
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
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Agent scheduled an inspection</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov · 3:22 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Confirm inspection schedule</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov · 3:22 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Inspection Completed</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov · 3:22 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">Property payment</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  11 Nov · 3:22 PM
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-disabled">
                {/* <img src={checkIcon} alt="" /> */}
              </div>

              <div>
                <p className="text-[14px]">Agent scheduled handover</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Pending
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-disabled">
                {/* <img src={checkIcon} alt="" /> */}
              </div>

              <div>
                <p className="text-[14px]">Confirm handover schedule</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Pending
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-disabled">
                {/* <img src={checkIcon} alt="" /> */}
              </div>

              <div>
                <p className="text-[14px]">Property handover completed</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Pending
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* buyer details */}
        <section className="mt-6">
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
        </section>

        <div className="mt-6 mb-8">
          {/* buttons */}
          <div className="flex flex-col items-center justify-center gap-4">
            <Button
              variant="app-primary"
              size="full"
              onClick={() => {
                // TODO: fire the inspection-request mutation here,
                // then call setIsRequestSuccessOpen(true) in onSuccess
                setIsRequestSuccessOpen(true)
              }}
            >
              Request Handover schedule
            </Button>

            {/* confirm inspection schedule modal */}
            <RequestSuccessful
              open={isRequestSuccessOpen}
              onOpenChange={setIsRequestSuccessOpen}
              onGoToDashboard={() => navigate("/")}
              title="Your agent has received your handover request"
              description="You will receive a notification for a handover schedule"
            />
          </div>

          {/* open dispute */}
          <p className="mt-3 text-center text-[12px] leading-4 text-text-secondary">
            Having issues with agent?{" "}
            <Link to="/dispute" className="font-bold hover:text-button-bg">
              Open a dispute
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
