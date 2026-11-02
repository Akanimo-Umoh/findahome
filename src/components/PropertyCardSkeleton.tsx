import Skeleton from "@/components/ui/Skeleton"

/**
 * Mirrors the structure and row heights of PropertyCard so nothing jumps
 * when real cards replace the skeletons. If you change PropertyCard's
 * spacing or text sizes, update the matching row here.
 */
export default function PropertyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex h-full w-full max-w-112.5 flex-col overflow-hidden rounded-2xl border border-bg-accent bg-white"
    >
      {/* Image: same height as the card (h-40, md:h-62.5) */}
      <Skeleton className="aspect-2/1 rounded-none" />

      {/* Body: same padding and gap as the card */}
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        {/* Title row (14px / 16px text) */}
        <div className="flex h-5.25 items-center md:h-6">
          <Skeleton className="h-4 w-3/4 md:h-4.5" />
        </div>

        {/* Price row */}
        <div className="flex h-5.25 items-center md:h-6">
          <Skeleton className="h-4 w-20 md:h-4.5 md:w-24" />
        </div>

        {/* Address row (12px / 14px text) */}
        <div className="flex h-4.5 items-center gap-1.5 md:h-5.25">
          <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
          <Skeleton className="h-3 w-2/3 md:h-3.5" />
        </div>

        {/* Meta row: beds/baths or land type */}
        <div className="flex h-4.5 items-center gap-4 md:h-5.25">
          <Skeleton className="h-3 w-14 md:h-3.5 md:w-16" />
          <Skeleton className="h-3 w-14 md:h-3.5 md:w-16" />
        </div>

        {/* Agent row: pinned to the bottom like the card */}
        <div className="mt-auto flex items-center gap-2 border-t border-bg-accent pt-3">
          <Skeleton className="h-6 w-6 shrink-0 rounded-full" />
          <Skeleton className="h-3 w-1/3 md:h-3.5" />
        </div>
      </div>
    </div>
  )
}
