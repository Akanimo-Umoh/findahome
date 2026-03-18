import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg";

export default function Timeline() {
  return (
    <div className="rounded-lg p-3 border border-bg-accent">
      {/* escrow timeline */}
      <div className="space-y-2">
        <div className="flex items-center">
          <img src={blueNairaIcon} alt="" className="w-4 h-4" />
          <p className="font-raleway font-semibold tracking-[1px] text-button-bg text-[14px]">
            3,000,000
          </p>
        </div>

        <p className="text-[12px] leading-4">
          Funds securely held until transaction steps are completed
        </p>

        <p className="text-[12px] leading-4 bg-[#149D18] py-1 px-2 rounded-2xl w-fit text-white">
          Inspection Scheduled
        </p>
      </div>

      <div className="mt-3 flex items-center relative gap-1">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#149D18]" />
          <p className="text-[12px] leading-4 text-text-secondary">Paid</p>
        </div>

        {/* this fills up with the color bg-[#149D18] when the next item is checked */}
        <div className="w-10 h-[5px] rounded-lg bg-[#149D18] relative -top-3" />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#149D18]" />
          <p className="text-[12px] leading-4 text-text-secondary">Scheduled</p>
        </div>

        <div className="w-10 h-[5px] rounded-lg bg-bg-accent relative -top-3" />

        {/* if it is not checked, it would show this way */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-bg-accent" />
          <p className="text-[12px] leading-4 text-text-secondary">Complete</p>
        </div>

        <div className="w-10 h-[5px] rounded-lg bg-bg-accent relative -top-3" />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-bg-accent" />
          <p className="text-[12px] leading-4 text-text-secondary">Released</p>
        </div>
      </div>
    </div>
  );
}
