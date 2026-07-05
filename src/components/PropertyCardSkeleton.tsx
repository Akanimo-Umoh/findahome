import Skeleton from "./ui/Skeleton"

export default function PropertyCardSkeleton() {
  return (
    <>
      {/* mobile */}
      <div className="w-full max-w-112.5 overflow-hidden rounded-2xl lg:hidden">
        <Skeleton className="h-50 rounded-none" />
        <div className="space-y-6 rounded-b-2xl border border-t-0 border-bg-accent px-4 py-3">
          {/* content block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          {/* button */}
          <Skeleton className="h-[45px] rounded-lg" />
        </div>
      </div>

      {/* desktop */}
      <div className="hidden w-full max-w-112.5 overflow-hidden rounded-2xl lg:block">
        <Skeleton className="h-62.5 rounded-none" />
        <div className="space-y-3 rounded-b-2xl border border-t-0 border-bg-accent p-3">
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}
