import tipsIcon from "@/assets/agentImages/icon-tips.svg"

export default function Tips() {
  return (
    <div className="flex items-start gap-2 rounded-lg bg-bg-accent p-2">
      <img src={tipsIcon} alt="" className="shrink-0" />
      <div>
        <p className="text-[14px]">Tips for better results</p>
        <p className="text-[12px] leading-4 text-text-secondary">
          Ads perform better with clearer photos/videos and competitive pricing.
        </p>
      </div>
    </div>
  )
}
