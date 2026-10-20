import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import Skeleton from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import { formatDate, titleCase } from "@/pages/admin/escrow/format"
import type { RawDispute } from "@/types/adminEscrow"
import { DISPUTE_LABEL, DISPUTE_TONE, isOpenDispute } from "../../buyerMeta"

type DisputesOverviewProps = {
  // undefined when the disputes request failed
  disputes?: RawDispute[]
  loading: boolean
}

const SHOWN = 5

export default function DisputesOverview({
  disputes,
  loading,
}: DisputesOverviewProps) {
  const sorted = [...(disputes ?? [])].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  )
  const open = sorted.filter(isOpenDispute).length
  const tiles = [
    { label: "Total", value: sorted.length, color: "text-button-bg" },
    { label: "Open", value: open, color: "text-amber-600" },
    {
      label: "Resolved",
      value: sorted.length - open,
      color: "text-emerald-700",
    },
  ]

  return (
    <AdminSection title="Disputes Overview">
      <p className="-mt-2 mb-3 text-[13px] text-text-secondary">
        Disputes this buyer has raised
      </p>

      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : !disputes ? (
        <p className="py-6 text-center text-[14px] text-text-secondary">
          The disputes didn&rsquo;t load.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            {tiles.map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-slate-200 py-3 text-center"
              >
                <p className="text-[12.5px] text-text-secondary">{t.label}</p>
                <p
                  className={cn(
                    "font-raleway text-[22px] leading-8 font-bold tabular-nums",
                    t.color
                  )}
                >
                  {t.value}
                </p>
              </div>
            ))}
          </div>

          {sorted.length === 0 ? (
            <p className="mt-4 rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
              This buyer hasn&rsquo;t raised any disputes.
            </p>
          ) : (
            <ul className="mt-2 divide-y divide-slate-100">
              {sorted.slice(0, SHOWN).map((d) => (
                <li
                  key={d._id}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[14px] font-semibold text-text-primary tabular-nums">
                        {d.referenceId}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-[12px] font-semibold",
                          DISPUTE_TONE[d.status] ??
                            "bg-slate-100 text-slate-600"
                        )}
                      >
                        {DISPUTE_LABEL[d.status] ?? titleCase(d.status)}
                      </span>
                    </div>
                    <p className="truncate text-[13.5px] text-text-primary">
                      {d.property?.title ?? "Unknown property"}
                    </p>
                    <p className="line-clamp-1 text-[13px] text-text-secondary">
                      {titleCase(d.category)} · {d.description}
                    </p>
                    <p className="text-[12.5px] text-text-secondary">
                      Opened {formatDate(d.createdAt)}
                    </p>
                  </div>

                  {/* the Disputes page isn't built yet: this lands on its placeholder */}
                  <Link
                    to={`/admin/disputes?dispute=${d._id}`}
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3.5 text-[13px] font-semibold text-text-primary outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-button-bg/40"
                  >
                    <ExternalLink size={14} aria-hidden />
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {sorted.length > SHOWN && (
            <p className="mt-2 text-[12.5px] text-text-secondary">
              Showing the latest {SHOWN} of {sorted.length} disputes.
            </p>
          )}
        </>
      )}
    </AdminSection>
  )
}
