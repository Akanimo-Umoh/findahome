import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Star } from "lucide-react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import goBack from "@/assets/images/icon-back.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/Spinner"
import SuccessModal from "@/components/confirm-visit/SuccessModal"
import {
  getPurchaseDetails,
  completeHandover,
} from "@/services/purchase.service"

const COMPLETABLE_STATUS = "handover_confirmed"

export default function PurchaseConfirmVisit() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [successOpen, setSuccessOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [satisfied, setSatisfied] = useState(false)
  const [finalizedDeal, setFinalizedDeal] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState("")

  const {
    data: purchase,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["purchaseDetails", transactionId],
    queryFn: () => getPurchaseDetails(transactionId ?? ""),
    enabled: !!transactionId,
    staleTime: 0,
    refetchOnMount: "always",
  })

  if (isLoading || isFetching) return <Spinner />

  if (!purchase) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  if (!hasCompleted && purchase.status !== COMPLETABLE_STATUS) {
    toast.error("This handover isn't ready to be marked completed.")
    navigate(`/transactions/${transactionId}?type=purchase`, { replace: true })
    return null
  }

  const property =
    typeof purchase.property === "string" ? undefined : purchase.property
  const owner =
    typeof purchase.owner === "string"
      ? { name: "Agent" }
      : { name: purchase.owner?.name ?? purchase.owner?.email }

  const allChecked = satisfied && finalizedDeal && rating > 0

  const handleConfirm = async () => {
    if (!transactionId) return
    setIsSubmitting(true)
    try {
      await completeHandover(transactionId)
      queryClient.invalidateQueries({
        queryKey: ["purchaseDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["userPurchasesAndInspections"],
      })
      setHasCompleted(true)
      setSuccessOpen(true)
    } catch (err) {
      toast.error("Couldn't confirm the handover. Please try again.")
      console.error("completeHandover error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-3xl text-text-primary">
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
          </button>
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
            Confirm Handover
          </p>
        </div>

        <main>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Confirm that this handover has been completed.
          </p>

          <div className="mt-4.5 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
            {property?.image ? (
              <img
                src={property.image}
                alt=""
                className="h-15 w-15 rounded-lg object-cover"
              />
            ) : (
              <div className="h-15 w-15 shrink-0 rounded-lg bg-bg-accent" />
            )}
            <div className="flex w-full flex-col justify-center gap-2">
              <div className="flex flex-col gap-1">
                <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                  {property?.title ?? ""}
                </p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Agent: {owner.name}
                </p>
              </div>
              <p className="w-fit rounded-2xl bg-agents-bg px-2 py-1 text-[12px] leading-4">
                Handover Pending
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent py-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-bg-accent">
              <img src={infoIcon} alt="" className="h-10 w-10" />
            </div>
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              Verify Property Handover
            </p>
          </div>

          <div className="mt-6.5 space-y-2">
            <p>Review before confirming</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="satisfied"
                  checked={satisfied}
                  onChange={(e) => setSatisfied(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="satisfied"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  I am satisfied with the property
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="finalized-deal"
                  checked={finalizedDeal}
                  onChange={(e) => setFinalizedDeal(e.target.checked)}
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="finalized-deal"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  I have received possession or access to the property
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p>Rate this Agent</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => {
                  const starIndex = index + 1
                  return (
                    <Star
                      key={starIndex}
                      className={`h-5 w-5 cursor-pointer transition-colors ${
                        starIndex <= (hover || rating)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-text-secondary"
                      }`}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHover(starIndex)}
                      onMouseLeave={() => setHover(0)}
                    />
                  )
                })}
              </div>
              {rating === 0 && (
                <p className="mt-1 text-[12px] text-destructive">
                  Please rate the agent before confirming.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p>Kindly leave a review about your agent (Optional)</p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full rounded-xl border border-text-disabled p-2 px-2 text-[12px] leading-4"
                placeholder="How was your experience with this agent throughout the deal?"
                rows={4}
              />
              <p className="text-[12px] leading-4 text-text-secondary">
                This helps other buyers know what to expect from this agent
              </p>
            </div>
          </div>

          <div className="mt-8.5 flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              disabled={!allChecked || isSubmitting}
              onClick={handleConfirm}
            >
              {isSubmitting ? "Confirming..." : "Mark as Completed"}
            </Button>

            <SuccessModal
              open={successOpen}
              onOpenChange={setSuccessOpen}
              title="Congratulations!"
              description={
                <>
                  The transaction is now complete. Funds will be released to the
                  agent.
                  <br />
                  Thank you for using FindaHome.
                </>
              }
              primaryAction={{
                label: "View Transaction Details",
                to: `/transactions/${transactionId}?type=purchase`,
              }}
              secondaryAction={{ label: "Back to Home", to: "/" }}
              replace
            />

            <p className="mb-10 flex items-center justify-center text-[12px] leading-4 text-text-secondary">
              Having issues with agent?&nbsp;
              <Link to="/dispute" className="text-button-bg">
                Open a dispute
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
