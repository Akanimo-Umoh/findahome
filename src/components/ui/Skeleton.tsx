import { cn } from "@/lib/utils"

type SkeletonProps = {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("w-full animate-pulse rounded-md bg-bg-accent", className)}
    />
  )
}
