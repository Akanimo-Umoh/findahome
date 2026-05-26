export default function PropertyCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-bg-accent">
      {/* Image — h-50 = 200px, same as the card */}
      <div className="h-50 w-full bg-gray-200" />

      {/* px-4 py-3 = 16px horizontal, 12px vertical — matches card */}
      <div className="flex flex-col gap-6 border border-bg-accent px-4 py-3">
        {/* space-y-2 = 8px between title row and the flex-col below */}
        <div className="flex flex-col gap-2">
          {/* Title + Price row */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-3 flex-1 rounded bg-gray-200" />
            <div className="h-3 w-16 flex-shrink-0 rounded bg-gray-200" />
          </div>

          {/* gap-2 = 8px between address, beds/land, and agent rows */}
          <div className="flex flex-col gap-2">
            {/* Address row — w-4 h-4 icon */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 flex-shrink-0 rounded-full bg-gray-200" />
              <div className="h-3 w-3/4 rounded bg-gray-200" />
            </div>

            {/* Beds/Baths or Land — h-5 fixes height for both variants */}
            <div className="flex h-5 items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 flex-shrink-0 rounded bg-gray-200" />
                <div className="h-3 w-10 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 flex-shrink-0 rounded bg-gray-200" />
                <div className="h-3 w-10 rounded bg-gray-200" />
              </div>
            </div>

            {/* Agent row — w-5 h-5 avatar */}
            <div className="flex items-center gap-1">
              <div className="h-5 w-5 flex-shrink-0 rounded-full bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Button — h-[45px] matches the Link */}
        <div className="h-[45px] w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  )
}
