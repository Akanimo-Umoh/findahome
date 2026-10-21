import { useMemo, useState } from "react"
import { SearchX, TriangleAlert, X } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { useEscrowData } from "@/pages/admin/escrow/useEscrow"
import type { AdminDispute } from "@/types/adminDispute"
import DisputeCard, { type DisputeMode } from "./components/DisputeCard"
import DisputeStats from "./components/DisputeStats"
import DisputeToolbar from "./components/DisputeToolbar"
import EvidenceDialog from "./components/EvidenceDialog"
import StatusDialog from "./components/StatusDialog"
import {
  PAGE_SIZE,
  exportDisputesCsv,
  selectDisputes,
  summarize,
} from "./disputeMeta"
import { useAdminDisputes, useSetDisputeStatus } from "./useDisputes"
import { useDisputeFilters } from "./useDisputeFilters"

export default function Disputes() {
  const { filters, update, clear, hasActive, resetKey } = useDisputeFilters()
  const [evidence, setEvidence] = useState<AdminDispute | null>(null)
  const [acting, setActing] = useState<{
    dispute: AdminDispute
    mode: DisputeMode
  } | null>(null)

  const disputes = useAdminDisputes()
  const escrow = useEscrowData()
  const setStatus = useSetDisputeStatus()

  const all = useMemo(() => disputes.data ?? [], [disputes.data])
  const summary = useMemo(() => summarize(all), [all])
  const { counts, filtered, pageCount, page, rows } = useMemo(
    () => selectDisputes(all, filters),
    [all, filters]
  )

  // purchase / inspection id -> escrow id, so a card can link to its payment
  const escrowByRecord = useMemo(() => {
    const map = new Map<string, string>()
    for (const r of escrow.data?.rows ?? []) {
      if (r.linked) map.set(r.linked._id, r.id)
    }
    return map
  }, [escrow.data])

  const confirm = (notes?: string) => {
    if (!acting) return
    setStatus.mutate(
      {
        id: acting.dispute._id,
        status: acting.mode === "resolve" ? "resolved" : "under_review",
        notes,
      },
      { onSuccess: () => setActing(null) }
    )
  }

  const loading = disputes.isLoading
  const empty = !loading && !disputes.isError && filtered.length === 0

  return (
    <div className="space-y-5">
      <DisputeStats
        summary={summary}
        active={filters.dispute ? "all" : filters.view}
        loading={loading}
        onSelect={(view) => update({ view, dispute: "" })}
      />

      <DisputeToolbar
        filters={filters}
        counts={counts}
        resetKey={resetKey}
        hasActive={hasActive}
        canExport={filtered.length > 0}
        onChange={update}
        onClear={clear}
        onExport={() => exportDisputesCsv(filtered)}
      />

      {filters.dispute && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-100 bg-bg-accent px-4 py-2.5 text-[13.5px] text-text-primary">
          Showing one dispute.
          <button
            type="button"
            onClick={() => update({ dispute: "" })}
            className="flex cursor-pointer items-center gap-1.5 font-semibold text-button-bg outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
          >
            <X size={14} aria-hidden />
            Show all disputes
          </button>
        </div>
      )}

      {disputes.isError ? (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <TriangleAlert size={22} aria-hidden />
          </span>
          <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
            The disputes didn&rsquo;t load
          </h3>
          <p className="mt-1 text-[14px] text-text-secondary">
            Check your connection and try again.
          </p>
          <Button
            variant="app-primary"
            className="mt-4"
            onClick={() => disputes.refetch()}
            disabled={disputes.isFetching}
          >
            Try again
          </Button>
        </div>
      ) : loading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      ) : empty ? (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <SearchX size={22} aria-hidden />
          </span>
          <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
            {all.length === 0
              ? "No disputes yet"
              : "No disputes match these filters"}
          </h3>
          {hasActive && (
            <button
              type="button"
              onClick={clear}
              className="mt-2 cursor-pointer text-[14px] font-semibold text-button-bg underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {rows.map((d) => (
            <DisputeCard
              key={d._id}
              dispute={d}
              escrowId={escrowByRecord.get(
                d.purchase?._id ?? d.inspection?._id ?? ""
              )}
              onEvidence={setEvidence}
              onAct={(dispute, mode) => setActing({ dispute, mode })}
            />
          ))}
        </div>
      )}

      <AdminPagination
        page={page}
        pageCount={pageCount}
        total={filtered.length}
        pageSize={PAGE_SIZE}
        noun="disputes"
        onPageChange={(next) => {
          update({ page: next })
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />

      {evidence && (
        <EvidenceDialog dispute={evidence} onClose={() => setEvidence(null)} />
      )}
      {acting && (
        <StatusDialog
          dispute={acting.dispute}
          mode={acting.mode}
          pending={setStatus.isPending}
          onConfirm={confirm}
          onClose={() => setActing(null)}
        />
      )}
    </div>
  )
}
