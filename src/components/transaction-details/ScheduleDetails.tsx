import blueCalendarIcon from "@/assets/images/icon-blue-calendar.svg"
import timeIcon from "@/assets/images/icon-inspection-schedule-time.svg"
import locationIcon from "@/assets/images/icon-inspection-schedule-location.svg"

interface ScheduleDetailsProps {
  label: string
  date: string
  time: string
  location: string
}

const ICONS = {
  date: blueCalendarIcon,
  time: timeIcon,
  location: locationIcon,
}

export default function ScheduleDetails({
  label,
  date,
  time,
  location,
}: ScheduleDetailsProps) {
  const items = [
    { icon: ICONS.date, title: "Date", detail: date },
    { icon: ICONS.time, title: "Time", detail: time },
    { icon: ICONS.location, title: "Location", detail: location },
  ]

  return (
    <section className="md:rounded-xl md:border md:border-bg-accent md:p-2 lg:p-3">
      <p className="md:text-[18px] md:font-semibold">{label}</p>

      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-bg-accent">
              <img src={item.icon} alt="" className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
                {item.title}
              </p>

              <p className="text-[14px] md:text-[16px]">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
