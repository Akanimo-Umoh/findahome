export default function CampaignDetails() {
  return (
    <div>
      <p>Campaign Details</p>

      <div className="mt-2 rounded-lg p-2 flex flex-col gap-2 bg-bg-accent">
        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Ad Goal</p>
          <p className="text-[14px]">Lead generation</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Duration</p>
          <p className="text-[14px]">6 Days(3 days left)</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Start Date</p>
          <p className="text-[14px]">Nov 17, 2025</p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[14px] text-text-secondary">Target Location</p>
          <p className="text-[14px]">Enugu, Lagos</p>
        </div>
      </div>
    </div>
  );
}
