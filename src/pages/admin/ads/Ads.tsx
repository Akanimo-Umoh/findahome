import { useMemo, useState } from "react"
import { SearchX, TriangleAlert } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { AdminAd } from "@/types/adminAd"
import {
  PAGE_SIZE,
  PERIOD_LABEL,
  reviewQueue,
  selectAds,
  summarizeAds,
  type Period,
} from "./adMeta"
import AdActionDialog from "./components/AdActionDialog"
import AdDetailsDialog from "./components/AdDetailsDialog"
import type { AdRowMode } from "./components/AdRowActions"
import AdReviewDialog from "./components/AdReviewDialog"
import AdStats from "./components/AdStats"
import AdTable from "./components/AdTable"
import AdToolbar from "./components/AdToolbar"
import RevenueSnapshot from "./components/RevenueSnapshot"
import { useAdAction, useAdminAds, useRemoveAd } from "./useAds"
import { useAdFilters } from "./useAdFilters"

const selectTrigger =
  "h-9 w-auto min-w-34 gap-2 bg-white text-[13px] font-semibold"

export default function Ads() {
  const { filters, update, clear, hasActive, resetKey } = useAdFilters()
  const [reviewing, setReviewing] = useState<AdminAd | null>(null)
  const [details, setDetails] = useState<AdminAd | null>(null)
  const [acting, setActing] = useState<{ ad: AdminAd; mode: AdRowMode } | null>(
    null
  )

  const ads = useAdminAds()
  const adAction = useAdAction()
  const remove = useRemoveAd()

  const all = useMemo(() => ads.data ?? [], [ads.data])
  const summary = useMemo(
    () => summarizeAds(all, filters.period),
    [all, filters.period]
  )
  const queue = useMemo(() => reviewQueue(all), [all])
  const { counts, filtered, pageCount, page, rows } = useMemo(
    () => selectAds(all, filters),
    [all, filters]
  )

  const loading = ads.isLoading
  const empty = !loading && !ads.isError && filtered.length === 0

  const decide = (action: "approve" | "reject", note?: string) => {
    if (!reviewing) return
    adAction.mutate(
      { id: reviewing._id, action, note },
      { onSuccess: () => setReviewing(null) }
    )
  }

  const confirm = (note?: string) => {
    if (!acting) return
    const done = () => setActing(null)
    if (acting.mode === "remove") {
      remove.mutate(acting.ad._id, { onSuccess: done })
    } else {
      adAction.mutate(
        { id: acting.ad._id, action: acting.mode, note },
        { onSuccess: done }
      )
    }
  }

  const tableProps = {
    onDetails: setDetails,
    onReview: setReviewing,
    onAct: (ad: AdminAd, mode: AdRowMode) => setActing({ ad, mode }),
  }

  return (
    <div className="space-y-5">
      <Select
        value={filters.period}
        onValueChange={(v) => update({ period: v as Period })}
      >
        <SelectTrigger aria-label="Period" className={selectTrigger}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(PERIOD_LABEL) as Period[]).map((p) => (
            <SelectItem key={p} value={p}>
              {PERIOD_LABEL[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AdStats summary={summary} period={filters.period} loading={loading} />

      {ads.isError ? (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <TriangleAlert size={22} aria-hidden />
          </span>
          <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
            The ads didn&rsquo;t load
          </h3>
          <p className="mt-1 text-[14px] text-text-secondary">
            Check your connection and try again.
          </p>
          <Button
            variant="app-primary"
            className="mt-4"
            onClick={() => ads.refetch()}
            disabled={ads.isFetching}
          >
            Try again
          </Button>
        </div>
      ) : (
        <>
          <section className="rounded-xl border border-slate-200 bg-white">
            <header className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-3">
              <div className="flex items-center gap-2.5">
                <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
                  Ad Request Queue
                </h2>
                <span className="rounded-full bg-bg-accent px-2.5 py-0.5 text-[12px] font-semibold text-button-bg">
                  {queue.length} Pending
                </span>
              </div>
              <p className="text-[13px] text-text-secondary">
                Review and approve before they go live
              </p>
            </header>

            {!loading && queue.length === 0 ? (
              <p className="mx-5 mb-5 rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
                No ads are waiting for review.
              </p>
            ) : (
              <AdTable
                rows={queue}
                loading={loading}
                showStatus={false}
                {...tableProps}
              />
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white">
            <header className="flex items-center gap-2.5 px-5 pt-4 pb-3">
              <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
                All Ads
              </h2>
              <span className="rounded-full bg-bg-accent px-2.5 py-0.5 text-[12px] font-semibold text-button-bg">
                {all.length} {all.length === 1 ? "Ad" : "Ads"}
              </span>
            </header>

            <AdToolbar
              filters={filters}
              counts={counts}
              resetKey={resetKey}
              hasActive={hasActive}
              onChange={update}
              onClear={clear}
            />

            {empty ? (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <SearchX size={22} aria-hidden />
                </span>
                <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
                  {all.length === 0
                    ? "No ads yet"
                    : "No ads match these filters"}
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
              <AdTable
                rows={rows}
                loading={loading}
                showStatus
                {...tableProps}
              />
            )}

            <AdminPagination
              page={page}
              pageCount={pageCount}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              noun="ads"
              onPageChange={(next) => {
                update({ page: next })
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </section>
        </>
      )}

      <RevenueSnapshot
        summary={summary}
        period={filters.period}
        loading={loading}
      />

      {details && (
        <AdDetailsDialog ad={details} onClose={() => setDetails(null)} />
      )}
      {reviewing && (
        <AdReviewDialog
          ad={reviewing}
          pending={
            adAction.isPending ? (adAction.variables?.action ?? null) : null
          }
          onDecide={decide}
          onClose={() => setReviewing(null)}
        />
      )}
      {acting && (
        <AdActionDialog
          ad={acting.ad}
          mode={acting.mode}
          pending={adAction.isPending || remove.isPending}
          onConfirm={confirm}
          onClose={() => setActing(null)}
        />
      )}
    </div>
  )
}
