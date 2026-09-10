import Skeleton from "./ui/Skeleton"

export default function PropertyCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-112.5 overflow-hidden rounded-2xl">
      {/* image */}
      <Skeleton className="h-50 w-full rounded-none md:h-62.5" />

      <div className="space-y-6 rounded-b-2xl border border-bg-accent px-4 py-3 md:space-y-0 md:p-3">
        <div className="space-y-2">
          {/* title + price */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex flex-col gap-2">
            {/* location + beds/baths */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-1 md:flex-1">
                <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>

              <div className="flex h-5 items-center gap-3">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>

            {/* agent + favorite */}
            <div className="md:flex md:items-end md:justify-between md:gap-2">
              <div className="flex items-center gap-1 md:flex-col md:items-start">
                <Skeleton className="h-5 w-5 shrink-0 rounded-full md:h-12.5 md:w-12.5" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-16" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-5 w-5 shrink-0 rounded-full" />
                  </div>
                </div>
              </div>

              <Skeleton className="hidden h-6 w-6 shrink-0 rounded-full md:block" />
            </div>
          </div>
        </div>

        {/* view details button — mobile only */}
        <Skeleton className="h-[45px] w-full rounded-lg md:hidden" />
      </div>
    </div>
  )
}
