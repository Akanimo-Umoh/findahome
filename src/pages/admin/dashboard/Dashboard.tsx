import { RefreshCw, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/lib/adminFormat"
import ActivityFeed from "./components/ActivityFeed"
import AdsRevenue from "./components/AdsRevenue"
import DisputesOverview from "./components/DisputesOverview"
import EscrowPosition from "./components/EscrowPosition"
import KpiStrip from "./components/KpiStrip"
import ListingsModeration from "./components/ListingsModeration"
import NeedsAttention from "./components/NeedsAttention"
import UsersOverview from "./components/UsersOverview"
import { SOURCE_LABEL, useDashboardOverview } from "./useDashboardOverview"

export default function Dashboard() {
  const {
    overview,
    failed,
    isLoading,
    isError,
    isFetching,
    updatedAt,
    refetch,
  } = useDashboardOverview()

  if (isError) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center py-24 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
          <TriangleAlert size={22} aria-hidden />
        </span>
        <h2 className="mt-4 font-raleway text-[18px] font-bold text-text-primary">
          The dashboard didn&rsquo;t load
        </h2>
        <p className="mt-1 text-[14px] text-text-secondary">
          Check your connection and try again.
        </p>
        <Button
          variant="app-primary"
          className="mt-5"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex min-h-8 flex-wrap items-center justify-between gap-3">
        {failed.length > 0 ? (
          <p
            role="status"
            className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-1.5 text-[13px] text-amber-800"
          >
            <TriangleAlert size={15} aria-hidden />
            Couldn&rsquo;t load{" "}
            {failed.map((name) => SOURCE_LABEL[name]).join(", ")}. Those figures
            show a dash.
          </p>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2 text-[12.5px] text-text-secondary">
          {updatedAt > 0 && (
            <span>Updated {timeAgo(new Date(updatedAt).toISOString())}</span>
          )}
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            aria-label="Refresh dashboard"
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-white hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 disabled:cursor-not-allowed"
          >
            <RefreshCw
              size={15}
              aria-hidden
              className={cn(isFetching && "animate-spin")}
            />
          </button>
        </div>
      </div>

      <KpiStrip overview={overview} loading={isLoading} />

      <div className="grid gap-5 xl:grid-cols-12">
        <NeedsAttention
          overview={overview}
          loading={isLoading}
          className="xl:col-span-5"
        />
        <EscrowPosition
          overview={overview}
          loading={isLoading}
          className="xl:col-span-7"
        />
        <DisputesOverview
          overview={overview}
          loading={isLoading}
          className="xl:col-span-5"
        />
        <UsersOverview
          overview={overview}
          loading={isLoading}
          className="xl:col-span-7"
        />
        <ListingsModeration
          overview={overview}
          loading={isLoading}
          className="xl:col-span-6"
        />
        <AdsRevenue
          overview={overview}
          loading={isLoading}
          className="xl:col-span-6"
        />
      </div>

      <ActivityFeed overview={overview} loading={isLoading} />
    </div>
  )
}
