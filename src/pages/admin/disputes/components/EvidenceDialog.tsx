import { FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { AdminDispute } from "@/types/adminDispute"

const isImage = (url: string) => /\.(png|jpe?g|webp|gif|avif)($|\?)/i.test(url)

type EvidenceDialogProps = {
  dispute: AdminDispute
  onClose: () => void
}

// Files the buyer attached when they raised the dispute. Mount it only while a dispute is chosen.
export default function EvidenceDialog({
  dispute,
  onClose,
}: EvidenceDialogProps) {
  const files = dispute.disputeFiles ?? []

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Evidence for {dispute.referenceId}</DialogTitle>
          <DialogDescription>
            Files the buyer attached when they raised this dispute.
          </DialogDescription>
        </DialogHeader>

        {files.length === 0 ? (
          <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
            No evidence was uploaded with this dispute.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {files.map((url, i) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-text-secondary outline-none hover:border-button-bg focus-visible:ring-2 focus-visible:ring-button-bg/40"
                >
                  {isImage(url) ? (
                    <img
                      src={url}
                      alt={`Evidence ${i + 1}`}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="flex flex-col items-center gap-1.5 text-[13px] font-semibold">
                      <FileText size={24} aria-hidden />
                      Open file {i + 1}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  )
}
