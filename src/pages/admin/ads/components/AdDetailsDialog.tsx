import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatNaira } from "@/lib/adminFormat"
import { formatDateTime } from "@/pages/admin/finance/financeMeta"
import type { AdminAd } from "@/types/adminAd"
import { OBJECTIVE_LABEL, adCode, adState } from "../adMeta"
import AdStatusBadge from "./AdStatusBadge"

type AdDetailsDialogProps = {
  ad: AdminAd
  onClose: () => void
}

const link =
  "font-semibold text-button-bg underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"

function pausedBy(reason?: string | null) {
  if (reason === "admin") return "Paused by an admin"
  if (reason === "budget") return "Budget used up"
  if (reason === "manual") return "Paused by the agent"
  return null
}

// Mount it only while an ad is chosen.
export default function AdDetailsDialog({ ad, onClose }: AdDetailsDialogProps) {
  const state = adState(ad)
  const paused = state === "paused" ? pausedBy(ad.pauseReason) : null

  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Listing",
      value: ad.property?._id ? (
        <Link to={`/admin/properties/${ad.property._id}`} className={link}>
          {ad.property.title ?? "Unknown listing"}
        </Link>
      ) : (
        "Unknown listing"
      ),
    },
    {
      label: "Agent",
      value: ad.user?._id ? (
        <Link to={`/admin/agents/${ad.user._id}`} className={link}>
          {ad.user.name ?? "Unknown agent"}
        </Link>
      ) : (
        "Unknown agent"
      ),
    },
    { label: "Status", value: <AdStatusBadge state={state} /> },
    { label: "Goal", value: OBJECTIVE_LABEL[ad.objective] ?? ad.objective },
    { label: "Daily budget", value: formatNaira(ad.dailyBudget) },
    { label: "Duration", value: `${ad.duration} days` },
    { label: "Total budget", value: formatNaira(ad.adBudget) },
    { label: "Paid", value: ad.isPaid ? "Yes" : "No" },
    { label: "Payment reference", value: ad.paymentReference ?? "—" },
    { label: "Submitted", value: formatDateTime(ad.createdAt) },
    { label: "Last updated", value: formatDateTime(ad.updatedAt) },
  ]
  if (paused) rows.push({ label: "Pause reason", value: paused })
  if (ad.adminNote) rows.push({ label: "Admin note", value: ad.adminNote })

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ad {adCode(ad)}</DialogTitle>
          <DialogDescription>Campaign details</DialogDescription>
        </DialogHeader>

        <dl className="divide-y divide-slate-100 text-[14px]">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-start justify-between gap-6 py-2.5"
            >
              <dt className="shrink-0 text-text-secondary">{r.label}</dt>
              <dd className="min-w-0 text-right wrap-break-word text-text-primary">
                {r.value}
              </dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  )
}
