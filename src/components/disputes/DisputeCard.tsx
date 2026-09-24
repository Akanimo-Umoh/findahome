import nairaIcon from "@/assets/images/icon-naira.svg"
import { ChevronRight } from "lucide-react"
import Skeleton from "../ui/Skeleton"
import type { Dispute } from "@/services/dispute.service"
import {
  CATEGORY_LABEL,
  STATUS_BADGE_BG,
  STATUS_LABEL,
} from "@/lib/disputeLabels"

// skeleton
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

// card
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
  const property =
    typeof dispute.property === "string" ? undefined : dispute.property
  const amount = property?.price ?? 0

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
            {dispute.referenceId}
          </p>
          <p className="text-[14px] md:text-[16px]">
            <span className="text-[#149D18]">Dispute Type:</span>{" "}
            {CATEGORY_LABEL[dispute.category]}
          </p>
          <p className="line-clamp-1 text-[14px] md:text-[16px]">
            {property?.title ?? ""}
          </p>
          <div className="flex items-center">
            <img src={nairaIcon} alt="" className="h-4 w-4" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
              {amount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl px-2 py-0.5 ${STATUS_BADGE_BG[dispute.status]}`}
          >
            <p className="text-[12px] leading-4 text-bg-tertiary md:text-[14px]">
              {STATUS_LABEL[dispute.status]}
            </p>
          </div>

          <p className="line-clamp-1 text-[14px] text-text-secondary">
            Last updated:{" "}
            {new Date(dispute.updatedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 md:h-6 md:w-6" />
    </button>
  )
}
