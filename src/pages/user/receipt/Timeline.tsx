import checkIcon from "@/assets/images/icon-transaction-confirmed.svg"

export default function Timeline() {
  const timelines = [
    {
      title: "Payment Made",
      date: "20th Oct, 2025",
    },
    {
      title: "Handover Scheduled",
      date: "22nd Oct, 2025",
    },
    {
      title: "Handover Completed",
      date: "28th Oct, 2025",
    },
    {
      title: "Funds Released",
      date: "30th Oct, 2025",
    },
  ]

  return (
    <div className="flex flex-col gap-2">
      <p>Transaction timeline</p>

      <div className="flex flex-col gap-2">
        {timelines.map((timeline, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-button-bg">
              <img src={checkIcon} alt="" className="h-4 w-4" />
            </div>

            <div>
              <p className="text-[14px]">{timeline.title}</p>
              <p className="text-[12px] leading-4 text-text-secondary">
                {timeline.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
