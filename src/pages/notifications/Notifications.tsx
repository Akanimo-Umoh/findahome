import { Link } from "react-router-dom"
import Spinner from "@/components/Spinner"
import { useAuthContext } from "@/context/AuthContext"
import { useNotifications } from "@/hooks/useNotifications"

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

export default function Notifications() {
  const { user } = useAuthContext()
  const { data, isLoading, isError, refetch } = useNotifications()
  const items = data?.data ?? []

  return (
    <div className="mx-auto mb-10 max-w-3xl px-6 md:pt-6 lg:pt-8">
      <h1 className="font-raleway text-[18px] font-semibold tracking-[1px] md:text-[22px]">
        Notifications
      </h1>

      {isLoading && (
        <Spinner className="flex min-h-40 items-center justify-center" />
      )}

      {isError && (
        <div className="mt-4 text-[14px] text-text-secondary">
          <p>Couldn&apos;t load your notifications.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-2 font-semibold text-button-bg underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && items.length === 0 && (
        <p className="mt-4 text-[14px] text-text-secondary">
          No notifications yet.
        </p>
      )}

      <ul className="mt-4 space-y-3">
        {items.map((n) => {
          const propertyId =
            typeof n.meta?.propertyId === "string" ? n.meta.propertyId : null

          return (
            <li
              key={n._id}
              className="rounded-lg border border-bg-accent p-3 text-[13px] leading-5 md:text-[14px]"
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-text-disabled" : "bg-button-bg"}`}
                />
                <div className="min-w-0 flex-1">
                  {n.title && <p className="font-semibold">{n.title}</p>}
                  {/* full text: no line clamp, so long admin notes can be read */}
                  <p className="break-words whitespace-pre-wrap text-text-secondary">
                    {n.message}
                  </p>
                  <p className="mt-1 text-[12px] text-text-secondary">
                    {formatDateTime(n.createdAt)}
                  </p>
                  {propertyId && user?.role === "agent" && (
                    <Link
                      to={`/agent/property-preview/${propertyId}`}
                      className="mt-1 inline-block font-semibold text-button-bg underline"
                    >
                      View listing
                    </Link>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
