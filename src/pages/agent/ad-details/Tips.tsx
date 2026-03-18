import tipsIcon from "@/assets/agentImages/icon-tips.svg";

export default function Tips() {
  return (
    <div className="flex items-start bg-bg-accent rounded-lg p-2 gap-2">
      <img src={tipsIcon} alt="" className="shrink-0" />
      <div>
        <p className="text-[14px]">Tips for better results</p>
        <p className="text-[12px] leading-4 text-text-secondary">
          Ads perform better with clearer photos/videos and competitive pricing.
        </p>
      </div>
    </div>
  );
}
