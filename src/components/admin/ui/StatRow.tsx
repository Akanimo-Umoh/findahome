import { cn } from "@/lib/utils"
import MetricValue from "./MetricValue"
import { toneDot, toneText, type Tone } from "./tone"

type StatRowProps = {
  label: string
  value: number | null | undefined
  loading?: boolean
  // colours the value only when it is above zero, so quiet queues stay quiet
  tone?: Tone
  dot?: boolean
  format?: (n: number) => string
  hint?: string
}

export default function StatRow({
  label,
  value,
  loading,
  tone = "neutral",
  dot = true,
  format,
  hint,
}: StatRowProps) {
  const active = typeof value === "number" && value > 0

  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        {dot && (
          <span
            aria-hidden
            className={cn("size-2 shrink-0 rounded-full", toneDot[tone])}
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-[14px] text-text-secondary">{label}</p>
          {hint && (
            <p className="truncate text-[12px] text-text-secondary">{hint}</p>
          )}
        </div>
      </div>
      <MetricValue
        value={value}
        loading={loading}
        format={format}
        className={cn(
          "text-[15px] font-semibold",
          active ? toneText[tone] : "text-text-primary"
        )}
      />
    </div>
  )
}
