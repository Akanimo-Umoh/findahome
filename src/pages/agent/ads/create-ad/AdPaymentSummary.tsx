import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import campaignIcon from "@/assets/agentImages/icon-campaign.svg"
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg"
import viewsIcon from "@/assets/agentImages/icon-visibility.svg"
import { useEffect, useState } from "react"
import { useAdDraft } from "@/hooks/useAdDraft"
import { createAd } from "@/services/ad.service"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import AdCreatedModal from "./AdCreatedModal"

const OBJECTIVE_LABEL: Record<string, string> = {
  views: "More Views",
  leads: "Get Leads",
  sales: "Quick Sales",
}

// TODO: replace with real wallet balance once that endpoint exists
const walletBalance = 4000

export default function AdPaymentSummary() {
  const navigate = useNavigate()
  const { draft, hasPropertyAndObjective, clearDraft } = useAdDraft()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdAdId, setCreatedAdId] = useState<string | null>(null)

  useEffect(() => {
    if (!hasPropertyAndObjective && !createdAdId) {
      navigate("/agent/create-ad", { replace: true })
    }
  }, [hasPropertyAndObjective, createdAdId, navigate])

  if (!hasPropertyAndObjective) return null

  const adCost = draft.dailyBudget * draft.duration
  const reachMin = Math.round(adCost * 0.6).toLocaleString()
  const reachMax = Math.round(adCost * 2).toLocaleString()
  const clickMin = Math.round(adCost * 0.03).toLocaleString()
  const clickMax = Math.round(adCost * 0.06).toLocaleString()

  const handleRunAd = async () => {
    setIsSubmitting(true)
    try {
      const ad = await createAd(draft)
      setCreatedAdId(ad._id)
    } catch (err) {
      toast.error("Failed to create ad. Please try again.")
      console.error("createAd error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 flex flex-col font-ssPro md:pt-6 lg:pt-8">
      <header className="">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>
          <p className="font-raleway text-[18px] font-semibold">
            Ad Payment Summary
          </p>
        </div>
      </header>

      <main className="mt-6">
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={draft.propertyImage ?? undefined}
            alt={draft.propertyTitle}
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />

          <div className="min-w-0 flex-1 space-y-1">
            <p className="line-clamp-1 font-raleway text-[13px] font-semibold tracking-[1px]">
              {draft.propertyTitle}
            </p>
            <div className="flex items-center">
              <img src={blueNaira} alt="" className="h-3 w-3" />
              <p className="font-raleway text-[13px] font-semibold text-button-bg">
                {draft.propertyPrice.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p>Campaign Summary</p>

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={campaignIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Campaign Goal</p>
              </div>
              <p className="text-[14px]">
                {OBJECTIVE_LABEL[draft.objective ?? ""]}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Duration</p>
              </div>
              <p className="text-[14px]">{draft.duration} days</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={calendarIcon} alt="" />
                <p className="text-[14px] text-text-secondary">Total Budget</p>
              </div>
              <div className="flex items-center">
                <img src={blueNaira} alt="" className="h-4 w-4" />
                <p className="font-raleway text-[14px] font-semibold text-button-bg">
                  {adCost.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p>Estimated Performance</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[12px] text-text-secondary">Est. Views</p>
              </div>
              <p className="mt-1 text-[14px] font-semibold">
                {reachMin} - {reachMax}
              </p>
            </div>

            <div className="flex-1 rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[12px] text-text-secondary">Est. Clicks</p>
              </div>
              <p className="mt-1 text-[14px] font-semibold">
                {clickMin} - {clickMax}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-[#149D1814] p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] text-text-secondary">Wallet Balance</p>
            <p className="text-[13px] font-semibold">
              ₦{walletBalance.toLocaleString()}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-[13px] text-text-secondary">Ad cost</p>
            <p className="text-[13px] font-semibold">
              ₦{adCost.toLocaleString()}
            </p>
          </div>
          <p className="mt-3 text-[11px] text-text-secondary">
            Funds will be deducted once your ad is launched
          </p>
        </div>

        <div className="mt-8 flex flex-col">
          <Button
            variant="app-primary"
            size="full"
            onClick={handleRunAd}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Ad"}
          </Button>
        </div>
      </main>

      <AdCreatedModal
        open={!!createdAdId}
        adId={createdAdId ?? ""}
        onNavigate={clearDraft}
      />
    </div>
  )
}
