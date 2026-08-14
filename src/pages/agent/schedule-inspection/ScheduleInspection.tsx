import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import apartmentImg from "@/assets/images/img-apartment.png"
import calendarIcon from "@/assets/images/icon-calendar.svg"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import locationIcon from "@/assets/agentImages/icon-white-location.svg"
import PickDate from "./PickDate"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/PageHeader"
import { getMockTransaction } from "@/data/mockTransactions"
import ScheduledSuccessfully from "./ScheduledSuccessfully"

export default function ScheduleInspection() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("10:30")

  // TODO: replace with useQuery once endpoint exists
  const transaction = getMockTransaction(transactionId ?? "")
  const status = transaction?.status ?? "inspection_requested"
  const isHandover = status === "handover_requested"

  const pageTitle = isHandover ? "Schedule Handover" : "Schedule Inspection"
  const bannerLabel = isHandover ? "Handover Schedule" : "Inspection Schedule"
  const bannerSubtitle = isHandover
    ? "You need to schedule this handover."
    : "You need to schedule this inspection."
  const submitLabel = isHandover ? "Schedule Handover" : "Schedule Visit"
  const successTitle = isHandover
    ? "Your handover has been scheduled!"
    : "Your inspection has been scheduled!"

  const handleSubmit = () => {
    // TODO: fire mutation (schedule inspection/handover), then setShowSuccess(true) in onSuccess
    setShowSuccess(true)
  }

  const handleGoToDashboard = () => {
    navigate("/agent/dashboard", { replace: true })
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      <PageHeader title={pageTitle} responsive />

      <div className="md:mt-6 md:flex md:gap-8">
        {/* left column on md+: calendar */}
        <section className="mt-6 hidden md:mt-0 md:block lg:w-[45%] lg:shrink-0">
          <PickDate
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </section>

        {/* right column on md+ / full width on mobile */}
        <section className="mt-6 lg:mt-0 lg:flex-1">
          <div className="flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
              <img src={calendarIcon} alt="" />
            </div>
            <div>
              <p className="text-[14px]">{bannerLabel}</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                {bannerSubtitle}
              </p>
            </div>
          </div>

          <div className="mt-6">
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
          </div>

          <div className="mt-4">
            <p>Visit Type</p>
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
            </div>

            {/* mobile-only calendar, inline within the form flow */}
            <section className="mt-6 md:hidden">
              <PickDate
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                selectedTime={selectedTime}
                onSelectTime={setSelectedTime}
              />
            </section>

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
                id="confirmation"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
                className="h-5 w-5 shrink-0"
              />
              <label
                htmlFor="confirmation"
                className="text-[12px] leading-4 text-text-secondary"
              >
                I confirm the schedule details are accurate and the buyer will
                be notified accordingly.
              </label>
            </div>
            <Button
              variant="app-primary"
              size="full"
              disabled={!isConfirmed || !selectedDate}
              onClick={handleSubmit}
            >
              {submitLabel}
            </Button>
          </div>
        </section>
      </div>

      {showSuccess && (
        <ScheduledSuccessfully
          title={successTitle}
          date={selectedDate}
          time={selectedTime}
          onGoToDashboard={handleGoToDashboard}
        />
      )}
    </div>
  )
}
