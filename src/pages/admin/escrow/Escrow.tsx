import { useMemo } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildEscrowStats } from "./buildEscrowRows"
import { EscrowPagination } from "./components/EscrowPagination"
import { EscrowStats } from "./components/EscrowStats"
import { EscrowTable } from "./components/EscrowTable"
import { EscrowToolbar } from "./components/EscrowToolbar"
import { useEscrowData } from "./useEscrow"
import { useEscrowFilters } from "./useEscrowFilters"

export default function Escrow() {
  const { data, isLoading, isError, refetch, isFetching } = useEscrowData()
  const rows = useMemo(() => data?.rows ?? [], [data])
  const stats = useMemo(
    () => (data ? buildEscrowStats(rows) : null),
    [data, rows]
  )
  const f = useEscrowFilters(rows)

  return (
    <div className="space-y-5">
      {data?.partial && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
        >
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          Some linked data (purchases, inspections or disputes) failed to load,
          so contact details and the Disputed status may be incomplete.
        </div>
      )}

      <EscrowStats stats={stats} loading={isLoading} />

      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <EscrowToolbar
            tab={f.tab}
            query={f.q}
            counts={stats?.count}
            onTab={f.setTab}
            onQuery={f.setQuery}
          />
        </div>

        {isError ? (
          <div className="flex flex-col items-center gap-3 px-4 py-14 text-center">
            <p className="text-sm text-slate-600">
              Could not load escrow transactions.
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className="mr-2 size-4" /> Try again
            </Button>
          </div>
        ) : isLoading ? (
          <div className="space-y-3 p-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : f.items.length === 0 ? (
          <p className="px-4 py-14 text-center text-sm text-slate-500">
            {f.q || f.tab !== "all"
              ? "No transactions match your filters."
              : "No escrow transactions yet."}
          </p>
        ) : (
          <>
            <EscrowTable rows={f.items} />
            <EscrowPagination
              page={f.page}
              pageCount={f.pageCount}
              total={f.total}
              onPage={f.setPage}
            />
          </>
        )}
      </section>
    </div>
  )
}
