import greenCheckIcon from "@/assets/images/icon-inspection-schedule-green-check.svg"

interface VisitBannerProps {
  title: string
  subtitle: string
}

export default function VisitBanner({ title, subtitle }: VisitBannerProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#149D1833] p-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#149D1833] md:h-9.5 md:w-9.5">
        <img src={greenCheckIcon} alt="" />
      </div>
      <div className="space-y-1">
        <p className="font-raleway text-[12px] font-semibold tracking-[1px] md:text-[16px]">
          {title}
        </p>
        <p className="text-[12px] leading-4 text-text-secondary md:text-[14px]">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
