import whiteCalendar from "@/assets/images/icon-calendar.svg"

interface TransactionBannerProps {
  title: string
  subtitle: string
}

export default function TransactionBanner({
  title,
  subtitle,
}: TransactionBannerProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-bg-accent bg-bg-accent px-3 py-2">
      <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-button-bg">
        <img src={whiteCalendar} alt="" />
      </div>
      <div>
        <p className="text-[14px]">{title}</p>
        <p className="text-[12px] leading-4 text-text-secondary">{subtitle}</p>
      </div>
    </div>
  )
}
