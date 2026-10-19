import Skeleton from "@/components/ui/Skeleton"
import { cn } from "@/lib/utils"
import { formatCount } from "@/lib/adminFormat"

type MetricValueProps = {
  value: number | null | undefined
  loading?: boolean
  format?: (n: number) => string
  className?: string
  skeletonClassName?: string
}

// The single way admin screens print a number: loading → skeleton, null → muted dash (no data source yet), else formatted.
export default function MetricValue({
  value,
  loading,
  format = formatCount,
  className,
  skeletonClassName,
}: MetricValueProps) {
  if (loading) {
    return <Skeleton className={cn("h-5 w-10", skeletonClassName)} />
  }

  if (value === null || value === undefined) {
    return (
      <span
        className={cn("text-text-disabled", className)}
        title="Not available yet"
        aria-label="Not available yet"
      >
        —
      </span>
    )
  }

  return (
    <span className={cn("lining-nums tabular-nums", className)}>
      {format(value)}
    </span>
  )
}
