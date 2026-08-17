import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import campaignIcon from "@/assets/agentImages/icon-campaign.svg"
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg"
import viewsIcon from "@/assets/agentImages/icon-visibility.svg"
import { useAdDraft } from "@/hooks/useAdDraft"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

const OBJECTIVE_LABEL: Record<string, string> = {
  views: "More Views",
  leads: "Get Leads",
  sales: "Quick Sales",
}

export default function AdPreview() {
  const navigate = useNavigate()
  const { draft, hasPropertyAndObjective } = useAdDraft()

  useEffect(() => {
    if (!hasPropertyAndObjective) {
      navigate("/agent/create-ad", { replace: true })
    }
  }, [hasPropertyAndObjective, navigate])

  if (!hasPropertyAndObjective) return null

  const totalBudget = draft.dailyBudget * draft.duration
  const reachMin = Math.round(totalBudget * 0.6).toLocaleString()
  const reachMax = Math.round(totalBudget * 2).toLocaleString()
  const clickMin = Math.round(totalBudget * 0.03).toLocaleString()
  const clickMax = Math.round(totalBudget * 0.06).toLocaleString()

  return (
    <div className="mb-10 flex flex-col font-ssPro md:pt-6 lg:pt-8">
      <header className="">
        <div className="relative flex items-center justify-center">
          <button className="absolute left-0" onClick={() => navigate(-1)}>
            <img src={goBack} alt="" />
          </button>
          <p className="font-raleway text-[18px] font-semibold">Ad Preview</p>
        </div>
      </header>

      <main className="mt-6">
        <div>
          <img
            src={draft.propertyImage ?? undefined}
            alt={draft.propertyTitle}
            className="h-75 w-full rounded-xl object-cover"
          />

          <div className="space-y-2">
            <p className="line-clamp-2 font-raleway font-semibold tracking-[1px]">
              {draft.propertyTitle}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={blueNaira} alt="" />
                <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                  {draft.propertyPrice.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/agent/property-preview/${draft.propertyId}`)
                }
                className="rounded-lg border border-button-bg p-2 font-raleway text-[14px] font-semibold tracking-[1px]"
              >
                View Listing
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p>Campaign Summary</p>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-bg-accent p-2">
            <img
              src={draft.propertyImage ?? undefined}
              alt={draft.propertyTitle}
              className="h-10 w-10 rounded-lg object-cover"
            />

            <div className="space-y-2">
              <p className="text-[12px] leading-4 text-text-secondary">
                Selected Listing
              </p>
              <p className="font-raleway text-[12px] font-semibold tracking-[1px]">
                {draft.propertyTitle}
              </p>
            </div>
          </div>

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
                  {totalBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p>Estimated Performance</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[14px] text-text-secondary">Est. Views</p>
              </div>
              <p className="mt-1 text-[14px] font-semibold">
                {reachMin} - {reachMax}
              </p>
            </div>

            <div className="flex-1 rounded-lg bg-bg-accent px-4 py-3">
              <div className="flex items-center gap-2">
                <img src={viewsIcon} alt="" className="h-4 w-4" />
                <p className="text-[14px] text-text-secondary">Est. Clicks</p>
              </div>
              <p className="mt-1 text-[14px] font-semibold">
                {clickMin} - {clickMax}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button
            variant="app-primary"
            size="full"
            onClick={() => navigate("/agent/ad-payment-summary")}
          >
            Launch Campaign
          </Button>
        </div>
      </main>
    </div>
  )
}
