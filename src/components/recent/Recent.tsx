import ActivityCard from "./ActivityCard"
import PageHeader from "../shared/PageHeader"
import Skeleton from "@/components/ui/Skeleton"
import { useUserActivities } from "@/hooks/useUserActivities"
import { mapToActivity } from "./activityMapping"

export default function Recent() {
  const { items, isLoading, error } = useUserActivities()
  const activities = items.map(mapToActivity)

  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Recent Activities" responsive />

        <main className="mt-6">
          {isLoading && (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                      <Skeleton className="h-3 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
            </section>
          )}

          {error && (
            <p className="mt-10 text-center text-[12px] text-text-secondary">
              {error}
            </p>
          )}

          {!isLoading && !error && activities.length === 0 && (
            <p className="mt-10 text-center text-[12px] text-text-secondary">
              No recent activity yet.
            </p>
          )}

          {!isLoading && !error && activities.length > 0 && (
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
