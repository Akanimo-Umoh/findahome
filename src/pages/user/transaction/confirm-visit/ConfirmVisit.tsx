// import { Link, useNavigate, useParams } from "react-router-dom"
// import { useState } from "react"
// import { Star } from "lucide-react"
// import goBack from "@/assets/images/icon-back.svg"
// import propertyImg from "@/assets/images/property.jpg"
// import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
// import { Button } from "@/components/ui/button"
// import { getMockTransaction } from "@/data/mockTransactions"
// import SuccessModal from "@/components/confirm-visit/SuccessModal"

// type CheckState = {
//   satisfied: boolean
//   // inspection only
//   inspectedProperly: boolean
//   matchesListing: boolean
//   // handover only
//   finalizedDeal: boolean
// }

// export default function ConfirmVisit() {
//   const { transactionId } = useParams()
//   const navigate = useNavigate()
//   const [successOpen, setSuccessOpen] = useState(false)
//   const [rating, setRating] = useState(0)
//   const [hover, setHover] = useState(0)
//   const [checks, setChecks] = useState<CheckState>({
//     satisfied: false,
//     inspectedProperly: false,
//     matchesListing: false,
//     finalizedDeal: false,
//   })

//   // TODO: replace with useQuery once endpoint exists
//   const transaction = getMockTransaction(transactionId ?? "")
//   const status = transaction?.status ?? "inspection_completed"
//   const isHandover = status === "handover_completed"

//   const allChecked = isHandover
//     ? checks.satisfied && checks.finalizedDeal && rating > 0
//     : checks.satisfied &&
//       checks.inspectedProperly &&
//       checks.matchesListing &&
//       rating > 0

//   const pageTitle = isHandover ? "Confirm Handover" : "Confirm Inspection"
//   const pageSubtitle = isHandover
//     ? "Confirm that this handover has been completed."
//     : "Confirm that this inspection has been completed."
//   const badgeLabel = isHandover ? "Handover Pending" : "Inspection Pending"
//   const verifyTitle = isHandover
//     ? "Verify Property Handover"
//     : "Verify Property Inspection"
//   const confirmButtonLabel = isHandover
//     ? "Mark as Completed"
//     : "Complete Inspection"

//   return (
//     <div className="px-6 md:px-8 md:pt-6">
//       <div className="mx-auto max-w-3xl text-text-primary">
//         <div className="relative flex items-center justify-center">
//           <button onClick={() => navigate(-1)} className="absolute left-0">
//             <img src={goBack} alt="" className="h-6 w-6 md:h-8 md:w-8" />
//           </button>

//           <p className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
//             {pageTitle}
//           </p>
//         </div>

//         <main>
//           <p className="text-center text-[12px] leading-4 text-text-secondary">
//             {pageSubtitle}
//           </p>

//           <div className="mt-4.5 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
//             <img
//               src={propertyImg}
//               alt=""
//               className="h-15 w-15 rounded-lg object-cover"
//             />
//             <div className="flex w-full flex-col justify-center gap-2">
//               <div className="flex flex-col gap-1">
//                 <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
//                   4 Bed-room Apartment, Lekki phase 1
//                 </p>
//                 <p className="text-[12px] leading-4 text-text-secondary">
//                   Agent: Maryann Kikomu{" "}
//                   <span className="text-button-bg">(Verified)</span>
//                 </p>
//                 <p className="text-[12px] leading-4 text-text-secondary">
//                   Buyer: Victoria Ntekim
//                 </p>
//               </div>
//               <p className="w-fit rounded-2xl bg-agents-bg px-2 py-1 text-[12px] leading-4">
//                 {badgeLabel}
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 flex flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent py-3">
//             <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-bg-accent">
//               <img src={infoIcon} alt="" className="h-10 w-10" />
//             </div>
//             <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
//               {verifyTitle}
//             </p>
//           </div>

//           {/* checkboxes */}
//           <div className="mt-6.5 space-y-2">
//             <p>Review before confirming</p>

//             <div className="space-y-2">
//               {/* satisfied — shared by both */}
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   id="satisfied"
//                   checked={checks.satisfied}
//                   onChange={(e) =>
//                     setChecks((prev) => ({
//                       ...prev,
//                       satisfied: e.target.checked,
//                     }))
//                   }
//                   className="h-4 w-4 cursor-pointer"
//                 />
//                 <label
//                   htmlFor="satisfied"
//                   className="cursor-pointer text-[12px] leading-4 text-text-secondary"
//                 >
//                   {isHandover
//                     ? "I am satisfied with the property"
//                     : "I am satisfied with the inspection"}
//                 </label>
//               </div>

//               {/* inspection only */}
//               {!isHandover && (
//                 <>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id="inspected-properly"
//                       checked={checks.inspectedProperly}
//                       onChange={(e) =>
//                         setChecks((prev) => ({
//                           ...prev,
//                           inspectedProperly: e.target.checked,
//                         }))
//                       }
//                       className="h-4 w-4 cursor-pointer"
//                     />
//                     <label
//                       htmlFor="inspected-properly"
//                       className="cursor-pointer text-[12px] leading-4 text-text-secondary"
//                     >
//                       I inspected the property physically
//                     </label>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id="match"
//                       checked={checks.matchesListing}
//                       onChange={(e) =>
//                         setChecks((prev) => ({
//                           ...prev,
//                           matchesListing: e.target.checked,
//                         }))
//                       }
//                       className="h-4 w-4 cursor-pointer"
//                     />
//                     <label
//                       htmlFor="match"
//                       className="cursor-pointer text-[12px] leading-4 text-text-secondary"
//                     >
//                       The property matches the listing description
//                     </label>
//                   </div>
//                 </>
//               )}

//               {/* handover only */}
//               {isHandover && (
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     id="finalized-deal"
//                     checked={checks.finalizedDeal}
//                     onChange={(e) =>
//                       setChecks((prev) => ({
//                         ...prev,
//                         finalizedDeal: e.target.checked,
//                       }))
//                     }
//                     className="h-4 w-4 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="finalized-deal"
//                     className="cursor-pointer text-[12px] leading-4 text-text-secondary"
//                   >
//                     I have received my keys
//                   </label>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* rating */}
//           <div className="mt-6 flex flex-col gap-2">
//             <div className="flex flex-col gap-1">
//               <p>Rate this Agent</p>
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, index) => {
//                   const starIndex = index + 1
//                   return (
//                     <Star
//                       key={starIndex}
//                       className={`h-5 w-5 cursor-pointer transition-colors ${
//                         starIndex <= (hover || rating)
//                           ? "fill-yellow-500 text-yellow-500"
//                           : "text-text-secondary"
//                       }`}
//                       onClick={() => setRating(starIndex)}
//                       onMouseEnter={() => setHover(starIndex)}
//                       onMouseLeave={() => setHover(0)}
//                     />
//                   )
//                 })}
//               </div>
//               {rating === 0 && (
//                 <p className="mt-1 text-[12px] text-destructive">
//                   Please rate the agent before confirming.
//                 </p>
//               )}
//             </div>

//             <div className="flex flex-col gap-1">
//               <p>Kindly leave a review (Optional)</p>
//               <textarea
//                 className="w-full rounded-xl border border-text-disabled p-2 px-2 text-[12px] leading-4"
//                 placeholder="Share your thoughts about the property, any concerns or feedback about the visit?"
//                 rows={4}
//               />
//               <p className="text-[12px] leading-4 text-text-secondary">
//                 This helps improve our service and assist future buyers
//               </p>
//             </div>
//           </div>

//           <div className="mt-8.5 flex flex-col gap-3">
//             <Button
//               variant="app-primary"
//               size="full"
//               disabled={!allChecked}
//               onClick={() => {
//                 // TODO: fire mutation, then setSuccessOpen(true) in onSuccess
//                 setSuccessOpen(true)
//               }}
//             >
//               {confirmButtonLabel}
//             </Button>

//             <SuccessModal
//               open={successOpen}
//               onOpenChange={setSuccessOpen}
//               title={isHandover ? "Congratulations!" : "Inspection Confirmed!"}
//               description={
//                 <>
//                   Funds will be released to the agent.
//                   <br />
//                   Thank you for using FindaHome.
//                 </>
//               }
//               primaryAction={
//                 isHandover
//                   ? {
//                       label: "View Transaction Details",
//                       to: `/transactions/${transactionId}/receipt`,
//                     }
//                   : {
//                       label: "Secure Property Now",
//                       to: `/transactions/${transactionId}`,
//                     }
//               }
//               secondaryAction={{ label: "Back to Home", to: "/" }}
//             />

//             <p className="mb-10 flex items-center justify-center text-[12px] leading-4 text-text-secondary">
//               Having issues with agent?&nbsp;
//               <Link to="/dispute" className="text-button-bg">
//                 Open a dispute
//               </Link>
//             </p>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

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
  getInspectionDetails,
  completeInspection,
} from "@/services/inspection.service"

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
  const [hover, setHover] = useState(0)
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
    checks.satisfied &&
    checks.inspectedProperly &&
    checks.matchesListing &&
    rating > 0

  const handleConfirm = async () => {
    if (!transactionId) return
    setIsSubmitting(true)
    try {
      await completeInspection(transactionId)
      // TODO: once the review/rating endpoint exists, send { rating, review } here too —
      // likely as a second call, or folded into completeInspection's body if he adds it there
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
