import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import {
  getAdminActivities,
  getAdminAds,
  getAdminDisputes,
  getAdminListings,
  getAdminUsers,
} from "@/services/admin/dashboard.service"
import { buildOverview, type RawSources } from "./buildOverview"

export type SourceName = keyof RawSources

export const SOURCE_LABEL: Record<SourceName, string> = {
  users: "users",
  listings: "listings",
  disputes: "disputes",
  ads: "ads",
  activities: "transactions and escrow",
}

export const dashboardQueryKey = ["admin", "dashboard"] as const

async function loadOverview() {
  const failed: SourceName[] = []

  // allSettled: one failing endpoint should dim its own numbers, not blank the page
  const settle = <T>(result: PromiseSettledResult<T>, name: SourceName) => {
    if (result.status === "fulfilled") return result.value
    failed.push(name)
    return null
  }

  const [users, listings, disputes, ads, activities] = await Promise.allSettled(
    [
      getAdminUsers(),
      getAdminListings(),
      getAdminDisputes(),
      getAdminAds(),
      getAdminActivities(),
    ]
  )

  const sources: RawSources = {
    users: settle(users, "users"),
    listings: settle(listings, "listings"),
    disputes: settle(disputes, "disputes"),
    ads: settle(ads, "ads"),
    activities: settle(activities, "activities"),
  }

  // every source down → treat as a real error so the page can offer a retry
  if (failed.length === Object.keys(sources).length) {
    throw new Error("Dashboard data could not be loaded")
  }

  return { overview: buildOverview(sources), failed }
}

export const useDashboardOverview = () => {
  const { token } = useAuthContext()

  const query = useQuery({
    queryKey: dashboardQueryKey,
    queryFn: loadOverview,
    enabled: !!token,
    // admin decisions happen elsewhere (disputes, payouts…), so never show a stale board
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })

  return {
    overview: query.data?.overview,
    failed: query.data?.failed ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    updatedAt: query.dataUpdatedAt,
    refetch: query.refetch,
  }
}
