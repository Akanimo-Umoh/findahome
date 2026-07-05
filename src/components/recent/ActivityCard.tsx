import { Link } from "react-router-dom"
import verifiedIcon from "@/assets/images/icon-verified-green.svg"
import { Button } from "@/components/ui/button"
import type { Activity } from "@/types/transactions"

type ActivityCardProps = {
  activity: Activity
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="space-y-4 rounded-lg border border-bg-accent px-3 pt-4 pb-2 shadow-sm hover:shadow-lg">
      <div className="flex items-center gap-3">
        <img
          src={activity.propertyImg}
          alt=""
          className="h-12 w-12 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="line-clamp-1 font-raleway text-[14px] font-semibold tracking-[1px] md:text-[16px]">
              {activity.type}
            </p>
            {activity.agentVerified && (
              <img
                src={verifiedIcon}
                alt="Verified Agent"
                className="shrink-0"
              />
            )}
          </div>

          <p className="line-clamp-1 text-[12px] leading-4 text-[#10B981] md:text-[14px]">
            {activity.statusLabel}{" "}
            <span className="text-text-secondary">{activity.date}</span>
          </p>

          <p className="text-[14px] md:text-[16px]">
            <span className="font-semibold">Agent:</span> {activity.agentName}
          </p>

          <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
            {activity.propertyName}
          </p>
        </div>
      </div>

      <Button variant="app-primary" size="full" asChild>
        <Link to={activity.detailsRoute}>View Details</Link>
      </Button>
    </div>
  )
}
