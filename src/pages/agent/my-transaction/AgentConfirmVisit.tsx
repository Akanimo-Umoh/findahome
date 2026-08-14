import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { Star } from "lucide-react"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Button } from "@/components/ui/button"
import { getMockTransaction } from "@/data/mockTransactions"
import SuccessModal from "@/components/confirm-visit/SuccessModal"

type CheckState = {
  satisfied: boolean
  inspectedProperly: boolean
  matchesListing: boolean
  finalizedDeal: boolean
}

export default function AgentConfirmVisit() {
  const { transactionId } = useParams()
  const navigate = useNavigate()
  const [successOpen, setSuccessOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [checks, setChecks] = useState<CheckState>({
    satisfied: false,
    inspectedProperly: false,
    matchesListing: false,
    finalizedDeal: false,
  })

  // TODO: replace with useQuery once endpoint exists
  const transaction = getMockTransaction(transactionId ?? "")
  const status = transaction?.status ?? "inspection_completed"
  const isHandover = status === "handover_completed"

  const allChecked = isHandover
    ? checks.satisfied && checks.finalizedDeal && rating > 0
    : checks.satisfied &&
      checks.inspectedProperly &&
      checks.matchesListing &&
      rating > 0

  const pageTitle = isHandover ? "Confirm Handover" : "Confirm Inspection"
  const pageSubtitle = isHandover
    ? "Confirm that this handover has been completed."
    : "Confirm that this inspection has been completed."
  const badgeLabel = isHandover ? "Handover Pending" : "Inspection Pending"
  const verifyTitle = isHandover
    ? "Verify Property Handover"
    : "Verify Property Inspection"
  const confirmButtonLabel = isHandover
    ? "Mark as Completed"
    : "Complete Inspection"

  const handleSuccess = () => {
    setSuccessOpen(true)
  }

  return (
    <div className="px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-3xl text-text-primary">
        <div className="relative flex items-center justify-center">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
          </button>

          <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
            {pageTitle}
          </p>
        </div>

        <main>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            {pageSubtitle}
          </p>

          <div className="mt-4.5 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
            <img
              src={propertyImg}
              alt=""
              className="h-15 w-15 rounded-lg object-cover"
            />
            <div className="flex w-full flex-col justify-center gap-2">
              <div className="flex flex-col gap-1">
                <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                  4 Bed-room Apartment, Lekki phase 1
                </p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
              <p className="w-fit rounded-2xl bg-agents-bg px-2 py-1 text-[12px] leading-4">
                {badgeLabel}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent py-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-bg-accent">
              <img src={infoIcon} alt="" className="h-10 w-10" />
            </div>
            <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
              {verifyTitle}
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
                    setChecks((prev) => ({
                      ...prev,
                      satisfied: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 cursor-pointer"
                />
                <label
                  htmlFor="satisfied"
                  className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                >
                  {isHandover
                    ? "I confirm the property has been handed over"
                    : "I confirm the inspection took place"}
                </label>
              </div>

              {!isHandover && (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="inspected-properly"
                      checked={checks.inspectedProperly}
                      onChange={(e) =>
                        setChecks((prev) => ({
                          ...prev,
                          inspectedProperly: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 cursor-pointer"
                    />
                    <label
                      htmlFor="inspected-properly"
                      className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                    >
                      I was present for the physical inspection
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="match"
                      checked={checks.matchesListing}
                      onChange={(e) =>
                        setChecks((prev) => ({
                          ...prev,
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
                </>
              )}

              {isHandover && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="finalized-deal"
                    checked={checks.finalizedDeal}
                    onChange={(e) =>
                      setChecks((prev) => ({
                        ...prev,
                        finalizedDeal: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 cursor-pointer"
                  />
                  <label
                    htmlFor="finalized-deal"
                    className="cursor-pointer text-[12px] leading-4 text-text-secondary"
                  >
                    I have handed over the keys
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p>Rate this Buyer</p>
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
                  Please rate the buyer before confirming.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p>Kindly leave a review (Optional)</p>
              <textarea
                className="w-full rounded-xl border border-text-disabled p-2 px-2 text-[12px] leading-4"
                placeholder="Share your thoughts about the buyer, any concerns or feedback about the visit?"
                rows={4}
              />
              <p className="text-[12px] leading-4 text-text-secondary">
                This helps improve our service and assist future agents
              </p>
            </div>
          </div>

          <div className="mt-8.5 flex flex-col gap-3">
            <Button
              variant="app-primary"
              size="full"
              disabled={!allChecked}
              onClick={handleSuccess}
            >
              {confirmButtonLabel}
            </Button>

            <SuccessModal
              open={successOpen}
              onOpenChange={setSuccessOpen}
              title={
                isHandover ? "Handover Confirmed!" : "Inspection Confirmed!"
              }
              description={
                <>
                  {isHandover
                    ? "The transaction is now complete."
                    : "The buyer can now proceed to secure the property."}
                  <br />
                  Thank you for using FindaHome.
                </>
              }
              primaryAction={{
                label: "View Transaction Details",
                to: `/agent/transactions/${transactionId}`,
              }}
              secondaryAction={{
                label: "Go to Dashboard",
                to: "/agent/dashboard",
              }}
              replace
            />

            <p className="mb-10 flex items-center justify-center text-[12px] leading-4 text-text-secondary">
              Having issues with buyer?&nbsp;
              <span
                className="cursor-pointer text-button-bg"
                onClick={() => navigate("/dispute")}
              >
                Open a dispute
              </span>
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
