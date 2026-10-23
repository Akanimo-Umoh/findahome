import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthContext"
import { requestError } from "@/lib/requestError"
import { updateProfile } from "@/services/user.service"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function EditPersonalInfo() {
  const { user, updateUser } = useAuthContext()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? "")
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber ?? "")
  const [location, setLocation] = useState(user?.location ?? "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSaving(true)

    try {
      const { user: saved } = await updateProfile({
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
        location: location.trim(),
      })

      // use what the server saved (it calls the location "address")
      updateUser({
        ...user,
        name: saved?.name ?? name.trim(),
        phoneNumber: saved?.phoneNumber ?? phoneNumber.trim(),
        location: saved?.address ?? location.trim(),
      })
      toast.success("Your personal information has been updated.")
      navigate("/profile")
    } catch (err) {
      toast.error(
        requestError(err, "Couldn't save your changes. Please try again.")
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mb-10 px-6 text-text-primary md:px-8 md:pt-6">
      <div className="mx-auto max-w-4xl">
        {/* header */}
        <h1 className="mt-1 font-semibold md:text-[18px]">
          Edit Personal Information
        </h1>

        {/* form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="md:text-[18px]">
              Your Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="editInput"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="md:text-[18px]">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={user?.email ?? ""}
              disabled
              className="editInput cursor-not-allowed rounded-lg border border-none bg-bg-accent px-3 text-[14px] text-text-secondary outline-none"
            />
            <p className="text-[11px] leading-4 text-text-secondary">
              Your email can't be changed here. Contact support if you need to
              update it.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phoneNumber" className="md:text-[18px]">
              Phone Number
            </label>

            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="editInput"
              placeholder="+234**********"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="location" className="md:text-[18px]">
              Location
            </label>

            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="editInput"
              placeholder="Lagos"
            />
          </div>

          <Button
            variant="app-primary"
            size="full"
            type="submit"
            className="mt-4"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  )
}
