import AdminSection from "@/components/admin/ui/AdminSection"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { useAuthContext } from "@/context/AuthContext"
import { formatDate } from "@/pages/admin/escrow/format"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"

export default function AdminTeamCard() {
  const { user } = useAuthContext()
  const users = useAdminUsers()
  const admins = (users.data ?? []).filter((u) => u.role === "admin")

  return (
    <AdminSection title="Admin Team">
      <p className="-mt-2 mb-3 text-[13px] text-text-secondary">
        Everyone with admin access to this dashboard
      </p>

      {users.isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : users.isError ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[14px] text-text-secondary">
            The admin list didn&rsquo;t load.
          </p>
          <Button variant="outline" onClick={() => users.refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {admins.map((a) => (
            <li key={a._id} className="flex items-center gap-3 py-2.5">
              <Avatar name={a.name} src={a.profilePicture?.[0]} size="md" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-text-primary">
                  {a.name}
                  {a._id === user?._id && (
                    <span className="ml-2 rounded-full bg-bg-accent px-2 py-0.5 text-[11.5px] font-semibold text-button-bg">
                      You
                    </span>
                  )}
                </p>
                <p className="truncate text-[12.5px] text-text-secondary">
                  {a.email}
                </p>
              </div>
              <span className="hidden text-[12.5px] whitespace-nowrap text-text-secondary sm:block">
                Since {formatDate(a.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 border-t border-slate-100 pt-3 text-[12.5px] text-text-secondary">
        Adding or removing admins isn&rsquo;t available yet.
      </p>
    </AdminSection>
  )
}
