export default function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-bg-accent animate-pulse">
      {/* Image — h-50 = 200px, same as the card */}
      <div className="w-full h-50 bg-gray-200" />

      {/* px-4 py-3 = 16px horizontal, 12px vertical — matches card */}
      <div className="px-4 py-3 flex flex-col gap-6 border border-bg-accent">
        {/* space-y-2 = 8px between title row and the flex-col below */}
        <div className="flex flex-col gap-2">
          {/* Title + Price row */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-3 bg-gray-200 rounded flex-1" />
            <div className="h-3 bg-gray-200 rounded w-16 flex-shrink-0" />
          </div>

          {/* gap-2 = 8px between address, beds/land, and agent rows */}
          <div className="flex flex-col gap-2">
            {/* Address row — w-4 h-4 icon */}
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>

            {/* Beds/Baths or Land — h-5 fixes height for both variants */}
            <div className="flex items-center gap-2 h-5">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-gray-200 flex-shrink-0" />
                <div className="h-3 bg-gray-200 rounded w-10" />
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded bg-gray-200 flex-shrink-0" />
                <div className="h-3 bg-gray-200 rounded w-10" />
              </div>
            </div>

            {/* Agent row — w-5 h-5 avatar */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>

        {/* Button — h-[45px] matches the Link */}
        <div className="h-[45px] bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}
