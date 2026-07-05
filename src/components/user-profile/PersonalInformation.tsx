// import editIcon from "@/assets/images/icon-blue-edit.svg"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { Link } from "react-router-dom"

export default function PersonalInformation() {
  const { user } = useAuthContext()

  return (
    <div>
      <p className="text-black md:text-[18px]">Personal Information</p>

      <div className="mt-4 space-y-4 rounded-lg border border-bg-accent p-3">
        <div>
          <p className="text-text-secondary">Full Name:</p>
          <div className="flex items-center justify-between">
            <p>{user?.name}</p>
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Email Address:</p>
          <div className="flex items-center justify-between">
            <p>{user?.email}</p>
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Phone Number:</p>
          <div className="flex items-center justify-between">
            <p>{user?.phoneNumber}</p>
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Location:</p>
          <div className="flex items-center justify-between">
            <p>{user?.location}</p>
          </div>
        </div>

        <Button variant="app-primary" size="full" asChild>
          <Link to="/profile/edit">Edit Personal Details</Link>
        </Button>
      </div>
    </div>
  )
}
