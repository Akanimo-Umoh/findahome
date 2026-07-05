import ActivityCard from "./ActivityCard"
import { MOCK_ACTIVITIES } from "@/data/mockActivities"
import PageHeader from "../shared/PageHeader"

export default function Recent() {
  return (
    <div className="mb-10 px-6 text-text-primary md:px-8 md:pt-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Recent Activities" responsive />

        <main className="mt-6">
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
