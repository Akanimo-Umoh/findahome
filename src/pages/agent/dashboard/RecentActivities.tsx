import paymentIcon from "@/assets/agentImages/icon-payment-released.svg"
import inspectionIcon from "@/assets/agentImages/icon-inspection-scheduled.svg"
import escrowIcon from "@/assets/agentImages/icon-funds-in-escrow.svg"
import adsIcon from "@/assets/agentImages/icon-ads-performance-updates.svg"
import uploadIcon from "@/assets/agentImages/icon-upload-successful.svg"
import nairaIcon from "@/assets/agentImages/icon-grey-naira.svg"

type ActivityType =
  | "payment_released"
  | "inspection_scheduled"
  | "inspection_requested"
  | "ads_performance"
  | "property_uploaded"

type Activity = {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  amount?: string
}

const activityConfig: Record<ActivityType, { icon: string; bgColor: string }> =
  {
    payment_released: {
      icon: paymentIcon,
      bgColor: "bg-[#274AD033]",
    },
    inspection_scheduled: {
      icon: inspectionIcon,
      bgColor: "bg-[#FF6B6B33]",
    },
    inspection_requested: {
      icon: escrowIcon,
      bgColor: "bg-[#274AD033]",
    },
    ads_performance: {
      icon: adsIcon,
      bgColor: "bg-[#F8B40033]",
    },
    property_uploaded: {
      icon: uploadIcon,
      bgColor: "bg-[#149D1833]",
    },
  }

export default function RecentActivities() {
  const activities: Activity[] = [
    {
      id: "1",
      type: "payment_released",
      title: "Payment Released",
      description: "10,000 from Lekki apartment inspection",
      timestamp: "2 hrs ago",
      amount: "10,000",
    },
    {
      id: "2",
      type: "inspection_scheduled",
      title: "Inspection Scheduled",
      description: "New inspection for 4-Bedroom Duplex",
      timestamp: "3 hrs ago",
    },
    {
      id: "3",
      type: "inspection_requested",
      title: "Inspection Requested",
      description: "200,000 held for Victoria Island property",
      timestamp: "5 hrs ago",
      amount: "200,000",
    },
    {
      id: "4",
      type: "ads_performance",
      title: "Ads Performance Updates",
      description: "Your Lekki listing got 340 new views",
      timestamp: "2 days ago",
    },
    {
      id: "5",
      type: "property_uploaded",
      title: "Property Upload Successful",
      description: "Your Property in Ikoyi is now live",
      timestamp: "3 days ago",
    },
  ]

  const renderDescription = (activity: Activity) => {
    if (activity.amount) {
      return (
        <p className="line-clamp-1 text-text-secondary">
          <img src={nairaIcon} alt="" className="inline-block align-middle" />
          <span className="align-middle">{activity.description}</span>
        </p>
      )
    }
    return (
      <p className="line-clamp-1 text-text-secondary">{activity.description}</p>
    )
  }

  return (
    <div className="mx-6 md:mx-8">
      <p>Recent Activities</p>

      <div className="mt-2 space-y-4">
        {activities.map((activity) => {
          const config = activityConfig[activity.type]

          return (
            <div
              key={activity.id}
              className="flex items-center gap-2 border-b border-bg-accent p-2"
            >
              <div
                className={`${config.bgColor} flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg md:h-10 md:w-10`}
              >
                <img src={config.icon} alt="" />
              </div>

              <div className="text-[12px] leading-4 md:text-[14px]">
                <p>{activity.title}</p>
                {renderDescription(activity)}
                <p className="text-text-secondary">{activity.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
