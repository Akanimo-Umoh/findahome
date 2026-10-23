import { useMemo, useState } from "react"
import { Clock, SearchX, TriangleAlert } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import { useEscrowData } from "@/pages/admin/escrow/useEscrow"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"
import { buildLedger, buildPayouts } from "../finance/buildFinance"
import FundingDialog from "../finance/components/FundingDialog"
import PayoutDialog from "../finance/components/PayoutDialog"
import type { LedgerRow, PayoutRow } from "../finance/types"
import {
  useConfirmFunding,
  useFinanceData,
  useSetPayoutStatus,
} from "../finance/useFinanceData"
import LedgerFilters from "./components/LedgerFilters"
import LedgerTable from "./components/LedgerTable"
import PayoutOverview from "./components/PayoutOverview"
import ReportHeaderBar from "./components/ReportHeaderBar"
import ReportStats from "./components/ReportStats"
import {
  PAGE_SIZE,
  exportLedgerCsv,
  selectLedger,
  summarizeLedger,
} from "./reportMeta"
import { useReportFilters } from "./useReportFilters"

export default function Reports() {
  const { filters, update, clear, hasActive, resetKey } = useReportFilters()
  const [payout, setPayout] = useState<PayoutRow | null>(null)
  const [funding, setFunding] = useState<LedgerRow | null>(null)

  const finance = useFinanceData()
  const escrow = useEscrowData()
  const users = useAdminUsers()
  const setStatus = useSetPayoutStatus()
  const confirmFunding = useConfirmFunding()

  const transactions = useMemo(
    () => finance.data?.transactions ?? [],
    [finance.data]
  )
  const ledger = useMemo(
    () =>
      buildLedger({
        transactions,
        escrows: escrow.data?.rows ?? [],
        users: users.data ?? [],
      }),
    [transactions, escrow.data, users.data]
  )
  const payouts = useMemo(
    () =>
      buildPayouts({
        transactions,
        users: users.data ?? [],
        banks: finance.data?.banks,
      }),
    [transactions, users.data, finance.data]
  )
  const { periodRows, filtered, pageCount, page, rows } = useMemo(
    () => selectLedger(ledger, filters),
    [ledger, filters]
  )
  const summary = useMemo(() => summarizeLedger(periodRows), [periodRows])

  const awaitingFunding = useMemo(
    () =>
      ledger.filter(
        (r) => r.kind === "wallet_funding" && r.status === "pending"
      ).length,
    [ledger]
  )

  const loading = finance.isLoading || escrow.isLoading
  const empty = !loading && !finance.isError && filtered.length === 0

  const confirm = () => {
    if (!payout) return
    setStatus.mutate(
      { id: payout.id, status: "approved" },
      { onSuccess: () => setPayout(null) }
    )
  }

  const confirmPayment = () => {
    if (!funding?.reference) return
    confirmFunding.mutate(
      { id: funding.id, reference: funding.reference },
      { onSuccess: () => setFunding(null) }
    )
  }

  return (
    <div className="space-y-5">
      <ReportHeaderBar
        period={filters.period}
        canExport={filtered.length > 0}
        onPeriod={(period) => update({ period })}
        onExportCsv={() => exportLedgerCsv(filtered)}
      />

      {escrow.isError && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          Escrow data didn&rsquo;t load, so escrow payments, releases and
          refunds are missing from the totals and the table.
        </div>
      )}

      {awaitingFunding > 0 && (
        <div
          role="status"
          className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-[13.5px] text-amber-800"
        >
          <span className="flex items-center gap-2">
            <Clock size={15} aria-hidden />
            {awaitingFunding} wallet funding{" "}
            {awaitingFunding === 1 ? "payment is" : "payments are"} waiting for
            your confirmation.
          </span>
          <button
            type="button"
            onClick={() =>
              update({ kind: "wallet_funding", status: "pending" })
            }
            className="cursor-pointer font-semibold underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-amber-600/40"
          >
            Show them
          </button>
        </div>
      )}

      <ReportStats summary={summary} loading={loading} />

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 pt-4 pb-3">
          <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
            Transactions
          </h2>
          <p className="text-[13px] text-text-secondary">
            Every payment, release, refund and payout in one list
          </p>
        </header>

        <LedgerFilters
          filters={filters}
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
              The transactions didn&rsquo;t load
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
              {ledger.length === 0
                ? "No transactions yet"
                : "No transactions match these filters"}
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
          <LedgerTable rows={rows} loading={loading} onConfirm={setFunding} />
        )}

        <AdminPagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          noun="transactions"
          onPageChange={(next) => {
            update({ page: next })
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </section>

      <PayoutOverview
        payouts={payouts}
        loading={finance.isLoading}
        onProcess={setPayout}
      />

      {funding && (
        <FundingDialog
          row={funding}
          pending={confirmFunding.isPending}
          onConfirm={confirmPayment}
          onClose={() => setFunding(null)}
        />
      )}

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
