import uploadedFile from "@/assets/images/icon-evidence-uploaded.svg"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
import {
  CATEGORY_LABEL,
  STATUS_BADGE_BG,
  STATUS_LABEL,
} from "@/lib/disputeLabels"
import type { Dispute } from "@/services/dispute.service"
import { MessageSquareWarning } from "lucide-react"

// empty state
export function DisputeDetailsEmpty() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-accent">
        <MessageSquareWarning className="h-8 w-8 text-text-secondary" />
      </div>
      <p className="font-raleway text-[16px] font-semibold tracking-[1px]">
        No dispute selected
      </p>
      <p className="max-w-56 text-[14px] leading-5 text-text-secondary">
        Select a dispute from the list to view its details here
      </p>
    </div>
  )
}

function getFileName(url: string): string {
  const parts = url.split("/")
  return parts[parts.length - 1] || url
}

// details panel
interface DisputeDetailsProps {
  dispute: Dispute
}

export default function DisputeDetails({ dispute }: DisputeDetailsProps) {
  const buyer = typeof dispute.user === "string" ? undefined : dispute.user

  // timeline derived from real timestamps, only showing steps that actually happened
  const timeline = [
    { label: "Dispute submitted", date: dispute.openedAt },
    dispute.reviewedAt && {
      label: "Dispute under review",
      date: dispute.reviewedAt,
    },
    dispute.resolvedAt && {
      label: "Dispute resolved",
      date: dispute.resolvedAt,
    },
    dispute.closedAt && { label: "Dispute closed", date: dispute.closedAt },
  ].filter(Boolean) as { label: string; date: string }[]

  return (
    <div className="space-y-6">
      {/* agent description */}
      <div className="space-y-2">
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
          Agent Description
        </p>
        <p className="text-[12px] text-text-secondary md:text-[14px]">
          {dispute.description}
        </p>
      </div>

      {/* issue details */}
      <div>
        <p>Issue Details</p>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Buyer Name</p>
            <p className="text-text-secondary">
              {buyer?.name ?? buyer?.email ?? "--"}
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Category</p>
            <p className="text-text-secondary">
              {CATEGORY_LABEL[dispute.category]}
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Tracking Status</p>
            <p
              className={`rounded-2xl px-2 py-0.5 text-center text-bg-tertiary ${STATUS_BADGE_BG[dispute.status]}`}
            >
              {STATUS_LABEL[dispute.status]}
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Reference ID:</p>
            <p className="text-text-secondary">{dispute.referenceId}</p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Date Issued</p>
            <p className="text-text-secondary">
              {new Date(dispute.openedAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* evidence uploaded */}
      {dispute.disputeFiles.length > 0 && (
        <div>
          <p>Evidence Uploaded</p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {dispute.disputeFiles.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex max-w-40 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent px-2 py-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F95FF]">
                  <img src={uploadedFile} alt="" />
                </div>
                <p className="line-clamp-1 text-center text-[12px] leading-4 text-text-secondary">
                  {getFileName(url)}
                </p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* activity timeline */}
      <div>
        <p>Activity Timeline</p>

        <div className="mt-3 space-y-2">
          {timeline.map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
                <img src={checkIcon} alt="" />
              </div>
              <div>
                <p className="text-[14px]">{item.label}</p>
                <p className="text-[12px] text-text-secondary md:text-[14px]">
                  {new Date(item.date).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
