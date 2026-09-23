import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import goBack from "@/assets/images/icon-back.svg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Button } from "@/components/ui/button"
import Spinner from "@/components/Spinner"
import SuccessModal from "@/components/confirm-visit/SuccessModal"
import StarRating from "@/components/shared/StarRating"
import {
  getInspectionDetails,
  completeInspection,
} from "@/services/inspection.service"
import { createRating } from "@/services/rating.service"

const COMPLETABLE_STATUS = "inspection_confirmed"

type CheckState = {
  satisfied: boolean
  inspectedProperly: boolean
  matchesListing: boolean
}

export default function ConfirmVisit() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [successOpen, setSuccessOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [rating, setRating] = useState(0)
  const [checks, setChecks] = useState<CheckState>({
    satisfied: false,
    inspectedProperly: false,
    matchesListing: false,
  })
  const [review, setReview] = useState("")

  const {
    data: inspection,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["inspectionDetails", transactionId],
    queryFn: () => getInspectionDetails(transactionId ?? ""),
    enabled: !!transactionId,
    staleTime: 0,
    refetchOnMount: "always",
  })

  if (isLoading || isFetching) return <Spinner />

  if (!inspection) {
    return (
      <div className="flex h-[calc(100vh-72px)] items-center justify-center">
        <p className="text-[14px] text-text-secondary">
          Couldn't load this transaction.
        </p>
      </div>
    )
  }

  if (!hasCompleted && inspection.status !== COMPLETABLE_STATUS) {
    toast.error("This inspection isn't ready to be marked completed.")
    navigate(`/transactions/${transactionId}?type=inspection`, {
      replace: true,
    })
    return null
  }

  const property =
    typeof inspection.property === "string" ? undefined : inspection.property
  const owner =
    typeof inspection.owner === "string"
      ? { name: "Agent" }
      : { name: inspection.owner?.name ?? inspection.owner?.email }

  const allChecked =
    checks.satisfied && checks.inspectedProperly && checks.matchesListing

  const handleConfirm = async () => {
    if (!transactionId || !inspection) return
    setIsSubmitting(true)
    try {
      await completeInspection(transactionId)

      if (rating > 0) {
        const propertyId =
          typeof inspection.property === "string"
            ? inspection.property
            : inspection.property?._id
        if (propertyId) {
          try {
            await createRating({
              propertyId,
              rating,
              comment: review || undefined,
            })
          } catch (ratingErr) {
            console.error("createRating error:", ratingErr)
            toast.error(
              "Inspection completed, but your rating couldn't be saved."
            )
          }
        }
      }

      queryClient.invalidateQueries({
        queryKey: ["inspectionDetails", transactionId],
      })
      queryClient.invalidateQueries({
        queryKey: ["userPurchasesAndInspections"],
      })
      setHasCompleted(true)
      setSuccessOpen(true)
    } catch (err) {
      toast.error("Couldn't confirm the inspection. Please try again.")
      console.error("completeInspection error:", err)
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
            Confirm Inspection
          </p>
        </div>

        <main>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Confirm that this inspection has been completed.
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
                Inspection Pending
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent py-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-bg-accent">
              <img src={infoIcon} alt="" className="h-10 w-10" />
            </div>
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              Verify Property Inspection
            </p>
          </div>

          <div className="mt-6.5 space-y-2">
            <p>Review before confirming</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="satisfied"
                  checked={checks.satisfied}
                  onChange={(e) =>
                    setChecks((p) => ({ ...p, satisfied: e.target.checked }))
                  }
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="satisfied"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  I am satisfied with the inspection
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="inspected-properly"
                  checked={checks.inspectedProperly}
                  onChange={(e) =>
                    setChecks((p) => ({
                      ...p,
                      inspectedProperly: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="inspected-properly"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  I inspected the property physically
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="match"
                  checked={checks.matchesListing}
                  onChange={(e) =>
                    setChecks((p) => ({
                      ...p,
                      matchesListing: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="match"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  The property matches the listing description
                </label>
              </div>
            </div>
          </div>

          {/* rating */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p>Rate this Agent</p>
              <StarRating value={rating} onChange={setRating} />
            </div>

            {/* CHANGED: restored — backend endpoint for submitting this isn't ready yet, but the input itself is user-authored, not fake display data */}
            <div className="flex flex-col gap-1">
              <p>Kindly leave a review about your agent (Optional)</p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full rounded-xl border border-text-disabled p-2 px-2 text-[12px] leading-4"
                placeholder="How was your experience with this agent during the inspection?"
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
              {isSubmitting ? "Confirming..." : "Complete Inspection"}
            </Button>

            <SuccessModal
              open={successOpen}
              onOpenChange={setSuccessOpen}
              title="Inspection Confirmed!"
              description={
                <>
                  Funds will be released to the agent.
                  <br />
                  Thank you for using FindaHome.
                </>
              }
              primaryAction={{
                label: "Back to Transaction",
                to: `/transactions/${transactionId}?type=inspection`,
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
