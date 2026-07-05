import nairaIcon from "@/assets/images/icon-naira.svg"
import { ChevronRight } from "lucide-react"
import type { Dispute, DisputeStatus } from "./mockDisputes"
import Skeleton from "../shared/Skeleton"

// --- status badge ---
const STATUS_STYLES: Record<DisputeStatus, { bg: string; label: string }> = {
  pending_review: { bg: "bg-[#D02727]", label: "Pending Review" },
  under_review: { bg: "bg-[#E58A00]", label: "Under Review" },
  resolved: { bg: "bg-[#149D18]", label: "Resolved" },
}

// --- skeleton ---
export function DisputeCardSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-xl border border-bg-accent p-3"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24 rounded-2xl" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

// --- card ---
interface DisputeCardProps {
  dispute: Dispute
  isSelected?: boolean
  onClick: () => void
}

export default function DisputeCard({
  dispute,
  isSelected = false,
  onClick,
}: DisputeCardProps) {
  const { bg, label } = STATUS_STYLES[dispute.status]

  return (
    <button
      onClick={onClick}
      className={`relative flex w-full cursor-pointer items-center justify-between gap-1 rounded-xl border p-3 text-left transition-colors ${
        isSelected
          ? "border-button-bg bg-button-disabled"
          : "border-bg-accent hover:border-button-bg"
      }`}
    >
      <div className="flex w-full flex-col gap-1">
        <div className="space-y-1">
          <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
            {dispute.refId}
          </p>
          <p className="text-[14px] md:text-[16px]">
            <span className="text-[#149D18]">Dispute Type:</span>{" "}
            {dispute.disputeType}
          </p>
          <p className="line-clamp-1 text-[14px] md:text-[16px]">
            {dispute.propertyName}
          </p>
          <div className="flex items-center">
            <img src={nairaIcon} alt="" className="h-4 w-4" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
              {dispute.amount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl px-2 py-0.5 ${bg}`}
          >
            <p className="text-[12px] leading-4 text-bg-tertiary md:text-[14px]">
              {label}
            </p>
          </div>
          <p className="line-clamp-1 text-[14px] text-text-secondary">
            Last updated: {dispute.lastUpdated}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 md:h-6 md:w-6" />
    </button>
  )
}
