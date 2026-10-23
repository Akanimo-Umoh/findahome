import AdminTeamCard from "./components/AdminTeamCard"
import NotificationsCard from "./components/NotificationsCard"
import PasswordCard from "./components/PasswordCard"
import ProfileCard from "./components/ProfileCard"

export default function Settings() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <ProfileCard />
        <PasswordCard />
      </div>
      <div className="space-y-5">
        <NotificationsCard />
        <AdminTeamCard />
      </div>
    </div>
  )
}
