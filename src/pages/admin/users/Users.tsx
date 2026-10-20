import { useMemo } from "react"
import { SearchX, TriangleAlert } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import { useEscrowData } from "@/pages/admin/escrow/useEscrow"
import { PAGE_SIZE, countViews, selectBuyers } from "./buyerFilters"
import { buyerActivity } from "./buyerMeta"
import BuyerListStats from "./components/BuyerListStats"
import BuyerTable from "./components/BuyerTable"
import BuyerToolbar from "./components/BuyerToolbar"
import { useAdminUsers } from "./useAdminUsers"
import { useBuyerFilters } from "./useBuyerFilters"

export default function Users() {
  const { filters, update, clear, hasActive, resetKey } = useBuyerFilters()
  const users = useAdminUsers()
  // transactions and disputes per buyer come from the escrow query
  const escrow = useEscrowData()

  const buyers = useMemo(
    () => (users.data ?? []).filter((u) => u.role === "user"),
    [users.data]
  )
  const activity = useMemo(
    () => buyerActivity(escrow.data?.rows, escrow.data?.disputes),
    [escrow.data]
  )
  const transactionsKnown = !!escrow.data
  const disputesKnown = !!escrow.data?.disputes

  const totals = useMemo(() => countViews(buyers, activity), [buyers, activity])
  const { tabCounts, filtered, pageCount, page, rows } = useMemo(
    () => selectBuyers(buyers, filters, activity),
    [buyers, filters, activity]
  )

  const loading = users.isLoading
  const empty = !loading && !users.isError && filtered.length === 0

  return (
    <div className="space-y-5">
      <BuyerListStats
        counts={totals}
        active={filters.view}
        loading={loading || escrow.isLoading}
        disputesKnown={disputesKnown}
        onSelect={(view) => update({ view })}
      />

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 pt-4 pb-3">
          <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
            All Buyers
          </h2>
          <p className="text-[13px] text-text-secondary">
            House-hunters who book inspections and pay through escrow
          </p>
        </header>

        <BuyerToolbar
          filters={filters}
          counts={tabCounts}
          resetKey={resetKey}
          hasActive={hasActive}
          disputesKnown={disputesKnown}
          onChange={update}
          onClear={clear}
        />

        {users.isError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <TriangleAlert size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              The buyers didn&rsquo;t load
            </h3>
            <p className="mt-1 text-[14px] text-text-secondary">
              Check your connection and try again.
            </p>
            <Button
              variant="app-primary"
              className="mt-4"
              onClick={() => users.refetch()}
              disabled={users.isFetching}
            >
              Try again
            </Button>
          </div>
        ) : empty ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <SearchX size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              {buyers.length === 0
                ? "No buyers yet"
                : "No buyers match these filters"}
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
          <BuyerTable
            rows={rows}
            loading={loading}
            activity={activity}
            transactionsKnown={transactionsKnown}
            disputesKnown={disputesKnown}
          />
        )}

        <AdminPagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          noun="buyers"
          onPageChange={(next) => {
            update({ page: next })
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </section>
    </div>
  )
}
