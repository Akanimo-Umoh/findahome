import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SearchX, TriangleAlert } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import { getAdminProperties } from "@/services/admin/properties.service"
import type { AdminProperty } from "@/types/adminProperty"
import PropertyStats from "./components/PropertyStats"
import PropertyTable from "./components/PropertyTable"
import PropertyToolbar from "./components/PropertyToolbar"
import { PAGE_SIZE, countStatuses, selectListings } from "./filterProperties"
import ReviewDialog, { type ReviewAction } from "./shared/ReviewDialog"
import {
  propertiesKey,
  useFlagProperty,
  useReviewProperty,
} from "./shared/useModeration"
import { downloadListingsCsv } from "./shared/propertyMeta"
import { usePropertyFilters } from "./usePropertyFilters"

export default function Properties() {
  const { filters, update, clear, hasActive, resetKey } = usePropertyFilters()
  const [review, setReview] = useState<{
    property: AdminProperty
    action: ReviewAction
  } | null>(null)

  const query = useQuery({
    queryKey: propertiesKey,
    queryFn: getAdminProperties,
    // approvals happen here and on the detail page, so never show a stale list
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })

  const all = useMemo(() => query.data ?? [], [query.data])
  const totals = useMemo(() => countStatuses(all), [all])
  const { tabCounts, filtered, pageCount, page, rows } = useMemo(
    () => selectListings(all, filters),
    [all, filters]
  )

  const reviewMutation = useReviewProperty()
  const flagMutation = useFlagProperty()
  const pending = reviewMutation.isPending || flagMutation.isPending

  const confirm = (reason?: string) => {
    if (!review) return
    const { property, action } = review
    const done = { onSuccess: () => setReview(null) }
    if (action === "approved" || action === "rejected") {
      reviewMutation.mutate({ id: property._id, status: action }, done)
    } else {
      flagMutation.mutate(
        { id: property._id, flagged: action === "flagged", reason },
        done
      )
    }
  }

  const loading = query.isLoading
  const empty = !loading && !query.isError && filtered.length === 0

  return (
    <div className="space-y-5">
      <PropertyStats
        counts={totals}
        active={filters.status}
        loading={loading}
        onSelect={(status) => update({ status })}
      />

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 pt-4 pb-3">
          <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
            Listing Overview
          </h2>
          <p className="text-[13px] text-text-secondary">
            See all listed properties
          </p>
        </header>

        <PropertyToolbar
          filters={filters}
          counts={tabCounts}
          resetKey={resetKey}
          hasActive={hasActive}
          exportDisabled={loading || filtered.length === 0}
          onChange={update}
          onClear={clear}
          onExport={() => downloadListingsCsv(filtered)}
        />

        {query.isError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <TriangleAlert size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              The listings didn&rsquo;t load
            </h3>
            <p className="mt-1 text-[14px] text-text-secondary">
              Check your connection and try again.
            </p>
            <Button
              variant="app-primary"
              className="mt-4"
              onClick={() => query.refetch()}
              disabled={query.isFetching}
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
              {all.length === 0
                ? "No listings yet"
                : "No listings match these filters"}
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
          <PropertyTable
            rows={rows}
            loading={loading}
            onReview={(property, action) => setReview({ property, action })}
          />
        )}

        <AdminPagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          noun="listings"
          onPageChange={(next) => {
            update({ page: next })
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </section>

      {review && (
        <ReviewDialog
          action={review.action}
          propertyTitle={review.property.title}
          pending={pending}
          onConfirm={confirm}
          onClose={() => setReview(null)}
        />
      )}
    </div>
  )
}
