import Skeleton from "./shared/Skeleton"

export default function ChatListSkeleton() {
  return (
    <div className="mx-6 mt-6 space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex justify-between gap-2 rounded-xl border border-bg-accent p-2"
        >
          {/* property image */}
          <Skeleton className="h-12.5 w-12.5 shrink-0 rounded-lg" />

          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between gap-2">
              <div className="flex flex-1 flex-col gap-1.5">
                {/* property title */}
                <Skeleton className="h-3.5 w-3/4" />
                {/* buyer/agent name */}
                <Skeleton className="h-3 w-1/2" />
                {/* last message */}
                <Skeleton className="h-3 w-2/3" />
              </div>

              <div className="flex flex-col items-end justify-between">
                {/* time */}
                <Skeleton className="h-3 w-10" />
                {/* unread count */}
                <Skeleton className="h-3.75 w-3.75 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
