import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import AdminSection from "@/components/admin/ui/AdminSection"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { timeAgo } from "@/lib/adminFormat"
import { requestError } from "@/lib/requestError"
import { getMyNotifications } from "@/services/notification.service"
import { markAllNotificationsRead } from "@/services/admin/settings.service"

const SHOWN = 8
const key = ["admin", "notifications"] as const

export default function NotificationsCard() {
  const qc = useQueryClient()
  const list = useQuery({
    queryKey: key,
    queryFn: getMyNotifications,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })

  const markAll = useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key })
      toast.success("All notifications marked as read")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't update notifications. Please try again.")
      ),
  })

  const items = list.data?.data.slice(0, SHOWN) ?? []
  const unread = list.data?.unreadCount ?? 0

  return (
    <AdminSection title="Notifications">
      {list.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : list.isError ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[14px] text-text-secondary">
            Your notifications didn&rsquo;t load.
          </p>
          <Button variant="outline" onClick={() => list.refetch()}>
            Try again
          </Button>
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-lg bg-slate-50 px-4 py-6 text-center text-[14px] text-text-secondary">
          You&rsquo;re all caught up.
        </p>
      ) : (
        <>
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-[13px] text-text-secondary">
              {unread > 0 ? `${unread} unread` : "Nothing unread"}
            </p>
            {unread > 0 && (
              <button
                type="button"
                disabled={markAll.isPending}
                onClick={() => markAll.mutate()}
                className="cursor-pointer text-[13px] font-semibold text-button-bg underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-button-bg/40"
              >
                Mark all as read
              </button>
            )}
          </div>
          <ul className="divide-y divide-slate-100">
            {items.map((n) => (
              <li key={n._id} className="flex items-start gap-3 py-2.5">
                <span
                  aria-label={n.read ? "Read" : "Unread"}
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${n.read ? "bg-slate-200" : "bg-button-bg"}`}
                />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-[13.5px] text-text-primary">
                    {n.message}
                  </p>
                  <p className="text-[12px] text-text-secondary">
                    {timeAgo(n.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </AdminSection>
  )
}
