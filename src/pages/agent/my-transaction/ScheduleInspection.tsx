import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import calendarIcon from "@/assets/images/icon-calendar.svg"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import locationIcon from "@/assets/agentImages/icon-white-location.svg"
import PickDate from "./PickDate"
import { Button } from "@/components/ui/button"
import PageHeader from "@/components/shared/PageHeader"
import ScheduledSuccessfully from "./ScheduledSuccessfully"
import {
  getInspectionDetails,
  scheduleInspection,
} from "@/services/inspection.service"
import { toast } from "sonner"
import Spinner from "@/components/Spinner"
import { useQuery, useQueryClient } from "@tanstack/react-query"

// only these statuses represent a genuinely schedulable inspection — anything else means this page was reached incorrectly
const SCHEDULABLE_STATUSES = ["inspection_paid"]

export default function ScheduleInspection() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient() // CHANGED
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("10:30")
  const [hasScheduled, setHasScheduled] = useState(false)

  const { data: inspection, isLoading } = useQuery({
    queryKey: ["inspectionDetails", transactionId],
    queryFn: () => getInspectionDetails(transactionId ?? ""),
    enabled: !!transactionId,
  })

  if (isLoading) return <Spinner />

  if (!inspection) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  // guard — this page only makes sense for an inspection that's actually awaiting a schedule. Anything else, send them back to the details page instead of letting them submit into an invalid state.
  if (!hasScheduled && !SCHEDULABLE_STATUSES.includes(inspection.status)) {
    return (
      <div className="flex h-[calc(100vh-72px)] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-[14px] text-text-secondary">
          This inspection has already been scheduled.
        </p>
        <Button
          variant="app-primary"
          onClick={() =>
            navigate(`/agent/transactions/${transactionId}?type=inspection`, {
              replace: true,
            })
          }
        >
          View Transaction Details
        </Button>
      </div>
    )
  }

  const property =
    typeof inspection.property === "string" ? undefined : inspection.property
  const buyer =
    typeof inspection.user === "string"
      ? { name: "Buyer" }
      : { name: inspection.user?.name ?? inspection.user?.email }

  const isHandover = false // handover scheduling not wired yet — inspection only per current scope

  const pageTitle = isHandover ? "Schedule Handover" : "Schedule Inspection"
  const bannerLabel = isHandover ? "Handover Schedule" : "Inspection Schedule"
  const bannerSubtitle = isHandover
    ? "You need to schedule this handover."
    : "You need to schedule this inspection."
  const submitLabel = isHandover ? "Schedule Handover" : "Schedule Visit"
  const successTitle = isHandover
    ? "Your handover has been scheduled!"
    : "Your inspection has been scheduled!"

  const handleSubmit = async () => {
    if (!selectedDate || !transactionId) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const combined = new Date(selectedDate)
    combined.setHours(hours, minutes, 0, 0)

    setIsSubmitting(true)
    try {
      await scheduleInspection(transactionId, combined.toISOString())

      // invalidate every cache key that could be showing stale status/actions for this inspection, so the details page's button updates the moment the agent lands back on it — no manual refresh
      queryClient.invalidateQueries({
        queryKey: ["inspectionDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["agentTransactionDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["agentPurchasesAndInspections"],
      })

      setHasScheduled(true)
      setShowSuccess(true)
    } catch (err) {
      toast.error("Couldn't schedule the inspection. Please try again.")
      console.error("scheduleInspection error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // redirect to the transaction details page, not the dashboard — the agent should immediately see the schedule they just set
  const handleGoToDetails = () => {
    navigate(`/agent/transactions/${transactionId}?type=inspection`, {
      replace: true,
    })
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
              {property?.image ? (
                <img
                  src={property.image}
                  alt=""
                  className="h-15 w-15 rounded-lg object-cover"
                />
              ) : (
                <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
              )}

              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                    {property?.title ?? ""}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                      <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                        {inspection.fee.toLocaleString()}
                      </p>
                    </div>

                    <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                      Buyer: {buyer.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-[12px] leading-4 text-white">
                    In Escrow
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Ref ID: {inspection._id}
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    Last updated:{" "}
                    {new Date(inspection.updatedAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "short",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
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
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(
                    property?.address ?? ""
                  )}&output=embed`}
                  className="h-30.5 w-full rounded-xl"
                  loading="lazy"
                  title="Property location"
                />
              </div>
              <p className="mt-2 text-[12px] leading-4 text-black">
                {property?.address ?? "—"}
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
              disabled={!isConfirmed || !selectedDate || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Scheduling..." : submitLabel}
            </Button>
          </div>
        </section>
      </div>

      {showSuccess && (
        <ScheduledSuccessfully
          open={showSuccess}
          onOpenChange={setShowSuccess}
          title={successTitle}
          date={selectedDate}
          time={selectedTime}
          onGoToDetails={handleGoToDetails}
        />
      )}
    </div>
  )
}
