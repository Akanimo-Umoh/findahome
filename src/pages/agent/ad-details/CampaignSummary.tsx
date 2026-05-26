import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import campaignIcon from "@/assets/agentImages/icon-campaign.svg"
import calendarIcon from "@/assets/agentImages/icon-blue-calendar-check.svg"

export default function CampaignSummary() {
  return (
    <div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={campaignIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Campaign Goal</p>
          </div>
          <p className="text-[14px]">More Views</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Duration</p>
          </div>

          <p className="text-[14px]">Nov 17 - Nov 22</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={calendarIcon} alt="" />
            <p className="text-[14px] text-text-secondary">Total Budget</p>
          </div>

          <div className="flex items-center">
            <img src={blueNaira} alt="" className="h-4 w-4" />
            <p className="font-raleway text-[14px] font-semibold text-button-bg">
              15,000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
