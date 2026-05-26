import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
import type { TransactionStage } from "./TransactionDetails"

type TimelineProps = {
  stage: TransactionStage
}

type TimelineItem = {
  label: (stage: TransactionStage) => string
  subtext: (stage: TransactionStage) => string
  completedIn: TransactionStage[]
}

const timelineItems: TimelineItem[] = [
  {
    label: () => "Payment Made by Buyer",
    subtext: (s) =>
      [
        "in_escrow",
        "inspection_scheduled",
        "inspection_confirmed",
        "inspection_completing",
        "inspection_done",
        "completed",
      ].includes(s)
        ? "11 Nov · 3:22 PM"
        : "Awaiting payment",
    completedIn: [
      "in_escrow",
      "inspection_scheduled",
      "inspection_confirmed",
      "inspection_completing",
      "inspection_done",
      "completed",
    ],
  },
  {
    label: () => "Funds held in Escrow",
    subtext: (s) =>
      [
        "in_escrow",
        "inspection_scheduled",
        "inspection_confirmed",
        "inspection_completing",
        "inspection_done",
        "completed",
      ].includes(s)
        ? "11 Nov · 3:22 PM"
        : "Awaiting escrow",
    completedIn: [
      "in_escrow",
      "inspection_scheduled",
      "inspection_confirmed",
      "inspection_completing",
      "inspection_done",
      "completed",
    ],
  },
  {
    label: () => "Inspection Scheduled",
    subtext: (s) =>
      [
        "inspection_scheduled",
        "inspection_confirmed",
        "inspection_completing",
        "inspection_done",
        "completed",
      ].includes(s)
        ? "11 Nov · 3:22 PM"
        : "Not yet scheduled",
    completedIn: [
      "inspection_scheduled",
      "inspection_confirmed",
      "inspection_completing",
      "inspection_done",
      "completed",
    ],
  },
  {
    label: (s) =>
      s === "inspection_confirmed" ||
      s === "inspection_completing" ||
      s === "inspection_done" ||
      s === "completed"
        ? "Buyer confirmed inspection schedule"
        : "Inspection schedule not confirmed yet",
    subtext: (s) =>
      [
        "inspection_confirmed",
        "inspection_completing",
        "inspection_done",
        "completed",
      ].includes(s)
        ? "11 Nov · 3:22 PM"
        : "Buyer must confirm inspection schedule",
    completedIn: [
      "inspection_confirmed",
      "inspection_completing",
      "inspection_done",
      "completed",
    ],
  },
  {
    label: () => "Inspection Completed",
    subtext: (s) =>
      ["inspection_done", "completed"].includes(s)
        ? "11 Nov · 3:22 PM"
        : "Pending completion",
    completedIn: ["inspection_done", "completed"],
  },
  {
    label: () => "Payment Released",
    subtext: (s) =>
      s === "completed" ? "11 Nov · 3:22 PM" : "Pending completion",
    completedIn: ["completed"],
  },
]

export default function Timeline({ stage }: TimelineProps) {
  return (
    <div>
      <p>Escrow Timeline</p>
      <div className="mt-2 space-y-2">
        {timelineItems.map((item, index) => {
          const isCompleted = item.completedIn.includes(stage)
          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full ${
                  isCompleted ? "bg-[#149D18]" : "bg-button-disabled"
                }`}
              >
                {isCompleted && <img src={checkIcon} alt="" />}
              </div>
              <div>
                <p className="text-[14px]">{item.label(stage)}</p>
                <p className="text-[12px] leading-4 text-text-secondary">
                  {item.subtext(stage)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
