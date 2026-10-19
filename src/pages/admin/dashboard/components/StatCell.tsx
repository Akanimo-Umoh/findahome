import { cn } from "@/lib/utils"
import MetricValue from "@/components/admin/ui/MetricValue"
import { toneText, type Tone } from "@/components/admin/ui/tone"

type StatCellProps = {
  label: string
  value: number | null | undefined
  sub?: string
  loading: boolean
  tone?: Tone
  format?: (n: number) => string
}

// A bigger figure used in the 2×2 / 3-up grids on this page.
export default function StatCell({
  label,
  value,
  sub,
  loading,
  tone = "neutral",
  format,
}: StatCellProps) {
  const active = typeof value === "number" && value > 0

  return (
    <div className="bg-white p-4">
      <p className="text-[13px] font-semibold text-text-secondary">{label}</p>
      <MetricValue
        value={value}
        loading={loading}
        format={format}
        skeletonClassName="mt-1.5 h-7 w-14"
        className={cn(
          "mt-1 block font-raleway text-[24px] leading-8 font-bold",
          active ? toneText[tone] : "text-text-primary"
        )}
      />
      {sub && (
        <p className="mt-0.5 text-[12.5px] leading-4 text-text-secondary">
          {sub}
        </p>
      )}
    </div>
  )
}
