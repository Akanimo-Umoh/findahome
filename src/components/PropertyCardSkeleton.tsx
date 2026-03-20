type PropertyCardSkeletonProps = {
  variant?: "property" | "land";
};

export default function PropertyCardSkeleton({
  variant = "property",
}: PropertyCardSkeletonProps) {
  const isLand = variant === "land";

  return (
    <div className="rounded-2xl overflow-hidden animate-pulse">
      {/* image — shorter for land */}
      <div className={`w-full ${isLand ? "h-37.5" : "h-50"} bg-gray-200`} />

      <div className="px-4 py-3 space-y-6 border rounded-b-2xl border-bg-accent">
        <div className="space-y-2">
          {/* title + price row */}
          <div className="flex items-center justify-between gap-2">
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              {/* address */}
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>

              {/* bed + bath — property only */}
              {!isLand && (
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
              )}
            </div>

            {/* agent row */}
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0" />
              <div className="h-3 bg-gray-200 rounded w-2/5" />
            </div>
          </div>
        </div>

        {/* button */}
        <div className="h-[45px] bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
}
