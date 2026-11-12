import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"

export default function Timeline() {
  return (
    <div className="rounded-lg border border-bg-accent p-3">
      {/* escrow timeline */}
      <div className="space-y-2">
        <div className="flex items-center">
          <img src={blueNairaIcon} alt="" className="h-4 w-4" />
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
            3,000,000
          </p>
        </div>

        <p className="text-[12px] leading-4">
          Funds securely held until transaction steps are completed
        </p>

        <p className="w-fit rounded-2xl bg-[#149D18] px-2 py-1 text-[12px] leading-4 text-white">
          Inspection Scheduled
        </p>
      </div>

      <div className="relative mt-3 flex items-center gap-1">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#149D18]" />
          <p className="text-[12px] leading-4 text-text-secondary">Paid</p>
        </div>

        {/* this fills up with the color bg-[#149D18] when the next item is checked */}
        <div className="relative -top-3 h-[5px] w-10 rounded-lg bg-[#149D18]" />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-5 w-5 rounded-full bg-[#149D18]" />
          <p className="text-[12px] leading-4 text-text-secondary">Scheduled</p>
        </div>

        <div className="relative -top-3 h-[5px] w-10 rounded-lg bg-bg-accent" />

        {/* if it is not checked, it would show this way */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-5 w-5 rounded-full bg-bg-accent" />
          <p className="text-[12px] leading-4 text-text-secondary">Complete</p>
        </div>

        <div className="relative -top-3 h-[5px] w-10 rounded-lg bg-bg-accent" />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-5 w-5 rounded-full bg-bg-accent" />
          <p className="text-[12px] leading-4 text-text-secondary">Released</p>
        </div>
      </div>
    </div>
  )
}
