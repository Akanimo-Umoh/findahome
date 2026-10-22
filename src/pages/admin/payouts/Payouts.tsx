import { useMemo, useState } from "react"
import { SearchX, TriangleAlert, X } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"
import { buildPayouts } from "../finance/buildFinance"
import PayoutDialog from "../finance/components/PayoutDialog"
import type { PayoutRow } from "../finance/types"
import { useFinanceData, useSetPayoutStatus } from "../finance/useFinanceData"
import PayoutStats from "./components/PayoutStats"
import PayoutTable from "./components/PayoutTable"
import PayoutToolbar from "./components/PayoutToolbar"
import { PAGE_SIZE, selectPayouts, summarizePayouts } from "./payoutMeta"
import { usePayoutFilters } from "./usePayoutFilters"

export default function Payouts() {
  const { filters, update, clear, hasActive, resetKey } = usePayoutFilters()
  const [payout, setPayout] = useState<PayoutRow | null>(null)

  const finance = useFinanceData()
  const users = useAdminUsers()
  const setStatus = useSetPayoutStatus()

  const payouts = useMemo(
    () =>
      buildPayouts({
        transactions: finance.data?.transactions ?? [],
        users: users.data ?? [],
        banks: finance.data?.banks,
      }),
    [finance.data, users.data]
  )
  const summary = useMemo(() => summarizePayouts(payouts), [payouts])
  const { counts, filtered, pageCount, page, rows } = useMemo(
    () => selectPayouts(payouts, filters),
    [payouts, filters]
  )

  const banksKnown = !!finance.data?.banks
  const loading = finance.isLoading
  const empty = !loading && !finance.isError && filtered.length === 0

  const confirm = () => {
    if (!payout) return
    setStatus.mutate(
      { id: payout.id, status: "approved" },
      { onSuccess: () => setPayout(null) }
    )
  }

  return (
    <div className="space-y-5">
      <PayoutStats
        summary={summary}
        active={filters.payout ? "all" : filters.status}
        loading={loading}
        onSelect={(status) => update({ status, payout: "" })}
      />

      {finance.data && !banksKnown && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          Bank details didn&rsquo;t load, so the account to pay isn&rsquo;t
          shown.
        </div>
      )}

      {filters.payout && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-blue-100 bg-bg-accent px-4 py-2.5 text-[13.5px] text-text-primary">
          Showing one payout.
          <button
            type="button"
            onClick={() => update({ payout: "" })}
            className="flex cursor-pointer items-center gap-1.5 font-semibold text-button-bg outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
          >
            <X size={14} aria-hidden />
            Show all payouts
          </button>
        </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 pt-4 pb-3">
          <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
            Payout Queue
          </h2>
          <p className="text-[13px] text-text-secondary">
            Withdrawal requests from agents. Send the money, then mark it as
            paid.
          </p>
        </header>

        <PayoutToolbar
          filters={filters}
          counts={counts}
          resetKey={resetKey}
          hasActive={hasActive}
          onChange={update}
          onClear={clear}
        />

        {finance.isError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <TriangleAlert size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              The payouts didn&rsquo;t load
            </h3>
            <p className="mt-1 text-[14px] text-text-secondary">
              Check your connection and try again.
            </p>
            <Button
              variant="app-primary"
              className="mt-4"
              onClick={() => finance.refetch()}
              disabled={finance.isFetching}
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
              {payouts.length === 0
                ? "No payout requests yet"
                : "No payouts match these filters"}
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
          <PayoutTable
            rows={rows}
            loading={loading}
            banksKnown={banksKnown}
            onProcess={setPayout}
          />
        )}

        <AdminPagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          noun="payouts"
          onPageChange={(next) => {
            update({ page: next })
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </section>

      {payout && (
        <PayoutDialog
          payout={payout}
          pending={setStatus.isPending}
          onConfirm={confirm}
          onClose={() => setPayout(null)}
        />
      )}
    </div>
  )
}
