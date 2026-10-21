import { Link } from "react-router-dom"
import { ChevronDown, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatNaira, formatNairaCompact, timeAgo } from "@/lib/adminFormat"
import { cn } from "@/lib/utils"
import { formatDate } from "@/pages/admin/escrow/format"
import type { AdminDispute } from "@/types/adminDispute"
import {
  STATUS_LABEL,
  STATUS_TONE,
  categoryLabel,
  disputeAmount,
} from "../disputeMeta"

export type DisputeMode = "review" | "resolve"

type DisputeCardProps = {
  dispute: AdminDispute
  // the escrow this dispute is about, when it can be matched
  escrowId?: string
  onEvidence: (dispute: AdminDispute) => void
  onAct: (dispute: AdminDispute, mode: DisputeMode) => void
}

const person =
  "rounded text-[14px] font-semibold text-text-primary outline-none hover:text-button-bg hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"

export default function DisputeCard({
  dispute: d,
  escrowId,
  onEvidence,
  onAct,
}: DisputeCardProps) {
  const amount = disputeAmount(d)
  const evidence = d.disputeFiles?.length ?? 0
  const done = d.status === "resolved" || d.status === "closed"
  const contacts = [
    { label: "Email buyer", email: d.user?.email },
    { label: "Email agent", email: d.agent?.email },
  ]

  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5">
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-raleway text-[18px] leading-6 font-bold text-text-primary">
          {d.property?.title ?? "Unknown property"}
        </h3>
        {amount !== null && (
          <span
            title={formatNaira(amount)}
            className="shrink-0 font-raleway text-[16px] font-bold text-button-bg tabular-nums"
          >
            {formatNairaCompact(amount)}
          </span>
        )}
      </header>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 text-[12px] font-semibold",
            STATUS_TONE[d.status] ?? "bg-slate-100 text-slate-600"
          )}
        >
          {STATUS_LABEL[d.status] ?? d.status}
        </span>
        <span className="text-[13px] font-semibold text-text-secondary tabular-nums">
          {d.referenceId}
        </span>
      </div>
      <p className="mt-1 text-[13px] text-text-secondary">
        Created {formatDate(d.createdAt)}
      </p>

      <dl className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <dt className="text-[12.5px] text-text-secondary">Buyer</dt>
          <dd>
            {d.user ? (
              <Link to={`/admin/users/${d.user._id}`} className={person}>
                {d.user.name ?? "Unknown buyer"}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
        <div>
          <dt className="text-[12.5px] text-text-secondary">Agent</dt>
          <dd>
            {d.agent ? (
              <Link to={`/admin/agents/${d.agent._id}`} className={person}>
                {d.agent.name ?? "Unknown agent"}
              </Link>
            ) : (
              "—"
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex-1 rounded-lg bg-bg-accent p-3">
        <p className="text-[13.5px] font-semibold text-text-primary">
          {categoryLabel(d.category)}
        </p>
        <p className="mt-1 line-clamp-3 text-[13px] text-text-secondary">
          {d.description}
        </p>
        {done && d.resolutionNotes && (
          <p className="mt-2 border-t border-white/70 pt-2 text-[13px] text-text-primary">
            <span className="font-semibold">Resolution: </span>
            {d.resolutionNotes}
          </p>
        )}
      </div>

      <p className="mt-2 flex flex-wrap items-center gap-x-3 text-[12.5px] text-text-secondary">
        <span>Updated {timeAgo(d.updatedAt)}</span>
        {escrowId && (
          <Link
            to={`/admin/transactions/${escrowId}`}
            className="font-semibold text-button-bg underline-offset-4 hover:underline"
          >
            View escrow
          </Link>
        )}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button
          variant="outline"
          disabled={evidence === 0}
          onClick={() => onEvidence(d)}
        >
          <FileText size={15} aria-hidden />
          View evidence{evidence > 0 ? ` (${evidence})` : ""}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Mail size={15} aria-hidden />
              Contact
              <ChevronDown size={14} aria-hidden />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-xl p-1.5">
            {contacts.map((c) => (
              <DropdownMenuItem
                key={c.label}
                asChild={!!c.email}
                disabled={!c.email}
                className="cursor-pointer rounded-lg px-2.5 py-2 text-[14px]"
              >
                {c.email ? (
                  <a href={`mailto:${c.email}`}>{c.label}</a>
                ) : (
                  c.label
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {d.status === "opened" && (
          <Button variant="app-primary" onClick={() => onAct(d, "review")}>
            Start review
          </Button>
        )}
        {(d.status === "under_review" || d.status === "escalated") && (
          <Button variant="app-primary" onClick={() => onAct(d, "resolve")}>
            Resolve
          </Button>
        )}
      </div>
    </article>
  )
}
