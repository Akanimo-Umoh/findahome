import uploadedFile from "@/assets/images/icon-evidence-uploaded.svg"
import checkIcon from "@/assets/images/icon-inspection-schedule-check.svg"
import { MessageSquareWarning } from "lucide-react"
import type { Dispute } from "./mockDisputes"

// --- empty state ---
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

// --- details panel ---
interface DisputeDetailsProps {
  dispute: Dispute
}

export default function DisputeDetails({ dispute }: DisputeDetailsProps) {
  return (
    <div className="space-y-6">
      {/* agent description */}
      <div className="space-y-2">
        <p className="font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
          Agent Description
        </p>
        <p className="text-[12px] text-text-secondary md:text-[14px]">
          {dispute.agentDescription}
        </p>
      </div>

      {/* issue details */}
      <div>
        <p>Issue Details</p>

        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Buyer Name</p>
            <p className="text-text-secondary">{dispute.buyerName}</p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Tracking Status</p>
            <p
              className={`rounded-2xl px-2 py-0.5 text-center text-bg-tertiary ${
                dispute.status === "resolved"
                  ? "bg-[#149D18]"
                  : dispute.status === "under_review"
                    ? "bg-[#E58A00]"
                    : "bg-[#D02727]"
              }`}
            >
              {dispute.status === "resolved"
                ? "Resolved"
                : dispute.status === "under_review"
                  ? "Under Review"
                  : "Pending Review"}
            </p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Reference ID:</p>

            <p className="text-text-secondary">{dispute.refId}</p>
          </div>

          <div className="flex items-center justify-between text-[12px] md:text-[14px]">
            <p>Date Issued</p>

            <p className="text-text-secondary">{dispute.dateIssued}</p>
          </div>
        </div>
      </div>

      {/* evidence uploaded */}
      <div>
        <p>Evidence Uploaded</p>

        <div className="mt-4 flex items-center gap-4">
          {dispute.evidence.map((file) => (
            <div
              key={file.name}
              className="flex max-w-40 flex-1 flex-col items-center justify-center gap-2 rounded-lg border border-bg-accent px-2 py-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F95FF]">
                <img src={uploadedFile} alt="" />
              </div>

              <p className="line-clamp-1 text-center text-[12px] leading-4 text-text-secondary">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* activity timeline */}
      <div>
        <p>Activity Timeline</p>

        <div className="mt-3 space-y-2">
          {dispute.timeline.map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
                <img src={checkIcon} alt="" />
              </div>

              <div>
                <p className="text-[14px]">{item.label}</p>

                <p className="text-[12px] text-text-secondary md:text-[14px]">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
