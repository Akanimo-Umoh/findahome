import {
  Banknote,
  Building2,
  CircleCheck,
  Scale,
  TriangleAlert,
  UserPlus,
  type LucideIcon,
} from "lucide-react"
import Skeleton from "@/components/ui/Skeleton"
import AdminSection from "@/components/admin/ui/AdminSection"
import { toneSoft } from "@/components/admin/ui/tone"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/lib/adminFormat"
import type { ActivityKind, DashboardOverview } from "../types"

type Props = {
  overview?: DashboardOverview
  loading: boolean
  className?: string
}

const ICONS: Record<ActivityKind, LucideIcon> = {
  agent_joined: UserPlus,
  dispute_opened: Scale,
  dispute_resolved: CircleCheck,
  listing_pending: Building2,
  payout_sent: Banknote,
  transaction_failed: TriangleAlert,
}

export default function ActivityFeed({ overview, loading, className }: Props) {
  const events = overview?.activity ?? []

  return (
    <AdminSection title="Recent activity" className={className}>
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="py-6 text-center text-[14px] text-text-secondary">
          Activity will appear here as agents, listings, disputes and payouts
          change.
        </p>
      ) : (
        <ul className="md:columns-2 md:gap-x-10">
          {events.map((event) => {
            const Icon = ICONS[event.kind]
            return (
              <li
                key={event.id}
                className="flex break-inside-avoid items-start gap-3 border-b border-slate-100 py-3 last:border-b-0"
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                    toneSoft[event.tone]
                  )}
                >
                  <Icon size={15} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-text-primary">
                    {event.title}
                  </p>
                  <p className="truncate text-[12.5px] text-text-secondary">
                    {event.detail}
                  </p>
                </div>
                <time
                  dateTime={event.at}
                  className="shrink-0 pt-0.5 text-[12px] text-text-secondary"
                >
                  {timeAgo(event.at)}
                </time>
              </li>
            )
          })}
        </ul>
      )}
    </AdminSection>
  )
}
