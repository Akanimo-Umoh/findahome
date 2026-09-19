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
  getPurchaseDetails,
  scheduleHandover,
} from "@/services/purchase.service"
import { toast } from "sonner"
import Spinner from "@/components/Spinner"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const SCHEDULABLE_STATUSES = ["property_payment_made", "handover_rescheduled"]

export default function ScheduleHandover() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasScheduled, setHasScheduled] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState("10:30")

  const { data: purchase, isLoading } = useQuery({
    queryKey: ["purchaseDetails", transactionId],
    queryFn: () => getPurchaseDetails(transactionId ?? ""),
    enabled: !!transactionId,
  })

  if (isLoading) return <Spinner />

  if (!purchase) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  if (!hasScheduled && !SCHEDULABLE_STATUSES.includes(purchase.status)) {
    toast.error("This handover can't be scheduled right now.")
    navigate(`/agent/transactions/${transactionId}?type=purchase`, {
      replace: true,
    })
    return null
  }

  const property =
    typeof purchase.property === "string" ? undefined : purchase.property
  const buyer =
    typeof purchase.buyer === "string"
      ? { name: "Buyer" }
      : { name: purchase.buyer?.name ?? purchase.buyer?.email }

  const handleSubmit = async () => {
    if (!selectedDate || !transactionId) return

    const [hours, minutes] = selectedTime.split(":").map(Number)
    const combined = new Date(selectedDate)
    combined.setHours(hours, minutes, 0, 0)

    setIsSubmitting(true)
    try {
      await scheduleHandover(transactionId, combined.toISOString())

      queryClient.invalidateQueries({
        queryKey: ["purchaseDetails", transactionId],
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
      toast.error("Couldn't schedule the handover. Please try again.")
      console.error("scheduleHandover error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoToDetails = () => {
    navigate(`/agent/transactions/${transactionId}?type=purchase`, {
      replace: true,
    })
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      <PageHeader title="Schedule Handover" responsive />

      <div className="md:mt-6 md:flex md:gap-8">
        <section className="mt-6 hidden md:mt-0 md:block lg:w-[45%] lg:shrink-0">
          <PickDate
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </section>

        <section className="mt-6 lg:mt-0 lg:flex-1">
          <div className="flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
            <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
              <img src={calendarIcon} alt="" />
            </div>
            <div>
              <p className="text-[14px]">Handover Schedule</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                You need to schedule this handover.
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
                        {purchase.price.toLocaleString()}
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
                    Ref ID: {purchase.reference ?? purchase._id}
                  </p>
                  <p className="text-[12px] leading-4 text-text-secondary">
                    Last updated:{" "}
                    {new Date(purchase.updatedAt).toLocaleString("en-US", {
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
            <p>Handover Type</p>
            <div className="mt-2 flex items-center justify-between gap-4">
              <Button
                variant="app-primary"
                size="full"
                className="flex flex-1 items-center justify-center gap-1"
              >
                <img src={locationIcon} alt="" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                  In-Person Handover
                </p>
              </Button>
            </div>

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
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property?.address ?? "")}&output=embed`}
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
              {isSubmitting ? "Scheduling..." : "Schedule Handover"}
            </Button>
          </div>
        </section>
      </div>

      {showSuccess && (
        <ScheduledSuccessfully
          open={showSuccess}
          onOpenChange={setShowSuccess}
          title="Your handover has been scheduled!"
          date={selectedDate}
          time={selectedTime}
          onGoToDetails={handleGoToDetails}
        />
      )}
    </div>
  )
}
