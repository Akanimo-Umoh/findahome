import checkIcon from "@/assets/images/icon-transaction-confirmed.svg"
import type { TimelineStep } from "@/types/transactions"

type EscrowTimelineProps = {
  steps: TimelineStep[]
}

export default function EscrowTimeline({ steps }: EscrowTimelineProps) {
  return (
    <section className="md:rounded-xl md:border md:border-bg-accent md:p-2 lg:p-3">
      <p className="md:text-[18px] md:font-semibold">Escrow Timeline</p>

      <div className="mt-2 space-y-2">
        {steps.map((step, index) => {
          const isCompleted = Boolean(step.completedAt)
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full md:h-6 md:w-6 ${
                  isCompleted ? "bg-button-bg" : "bg-button-disabled"
                }`}
              >
                {isCompleted && <img src={checkIcon} alt="" />}
              </div>

              <div>
                <p className="text-[14px] md:text-[16px]">{step.label}</p>

                <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                  {isCompleted ? step.completedAt : "Pending"}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
