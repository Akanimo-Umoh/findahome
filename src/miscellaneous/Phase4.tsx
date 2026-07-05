import { Link, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import infoIcon from "@/assets/images/icon-pay-inspection-info.svg"
import { Button } from "@/components/ui/button"
import SuccessModal from "./SuccessModal"
import { useState } from "react"
import { Star } from "lucide-react"

export default function Phase4() {
  const [successOpen, setSuccessOpen] = useState(false)
  const [checks, setChecks] = useState({
    satisfied: false,
    inspectedProperly: false,
    matchesListing: false,
  })
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const navigate = useNavigate()
  const allChecked = Object.values(checks).every(Boolean) && rating > 0

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Confirm Inspection
        </p>
      </div>

      <main>
        <p className="text-center text-[12px] leading-4 text-text-secondary">
          Confirm that this inspection has been completed.
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
                Agent: Maryann Kikomu{" "}
                <span className="text-button-bg">(Verified)</span>
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Buyer: Victoria Ntekim
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

        {/* review before confirming */}
        <div className="mt-6.5 space-y-2">
          <p>Review before confirming</p>

          {/* checkbox 1 */}
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
                I am satisfied with the inspection
              </label>
            </div>

            {/* checkbox 2 */}
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
                I inspected the property physically
              </label>
            </div>

            {/* checkbox 3 */}
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
          </div>
        </div>

        {/* rate agent */}
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
            <p>Kindly leave a review(Optional)</p>

            <textarea
              className="w-full rounded-xl border border-text-disabled p-2 px-2 text-[12px] leading-4"
              placeholder="Share your thoughts about the property, any concerns or feedback about the visit?"
              rows={4}
            />

            <p className="text-[12px] leading-4 text-text-secondary">
              This helps improve our service and assist future buyers
            </p>
          </div>
        </div>

        <div className="mt-8.5 flex flex-col gap-3">
          <Button
            variant="app-primary"
            size="full"
            disabled={!allChecked}
            onClick={() => setSuccessOpen(true)}
          >
            Complete Inspection
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
              label: "Secure Property Now",
              to: "/transaction-details",
            }}
            secondaryAction={{ label: "Back to Home", to: "/" }}
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
  )
}
