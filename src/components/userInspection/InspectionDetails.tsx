import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"

export default function InspectionDetails() {
  const indpectionDetails = [
    {
      icon: blueCalendarIcon,
      title: "Date",
      detail: "14th Nov, 2025",
    },
    {
      icon: timeIcon,
      title: "Time",
      detail: "10:00am",
    },
    {
      icon: locationIcon,
      title: "Location",
      detail: "Lekki Toll Gate",
    },
  ]

  return (
    <div>
      <p>Inspection Details</p>
      <div className="mt-2 space-y-2">
        {indpectionDetails.map((inspectionDetail, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-bg-accent">
              <img src={inspectionDetail.icon} alt="" />
            </div>

            <div>
              <p className="text-[12px] leading-4 text-text-secondary">
                {inspectionDetail.title}
              </p>
              <p className="text-[14px]">{inspectionDetail.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
