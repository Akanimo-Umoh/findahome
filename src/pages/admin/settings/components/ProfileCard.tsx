import { useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Camera } from "lucide-react"
import { toast } from "sonner"
import AdminSection from "@/components/admin/ui/AdminSection"
import Avatar from "@/components/Avatar"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { useAuthContext } from "@/context/AuthContext"
import { useProfilePicture } from "@/hooks/useProfilePicture"
import { requestError } from "@/lib/requestError"
import { formatDate } from "@/pages/admin/escrow/format"
import { updateProfile } from "@/services/user.service"
import { meKey, useMe, type MeUser } from "../useMe"
import Field, { inputClass } from "./Field"

function ProfileForm({ me }: { me: MeUser }) {
  const { user, updateUser } = useAuthContext()
  const qc = useQueryClient()
  const { changeProfilePicture, isUploading } = useProfilePicture()
  const fileRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState(me.name ?? "")
  const [phone, setPhone] = useState(me.phoneNumber ?? "")
  const [address, setAddress] = useState(me.address ?? "")

  const unchanged =
    name.trim() === (me.name ?? "") &&
    phone.trim() === (me.phoneNumber ?? "") &&
    address.trim() === (me.address ?? "")

  const save = useMutation({
    mutationFn: () =>
      updateProfile({
        name: name.trim(),
        phoneNumber: phone.trim(),
        location: address.trim(),
      }),
    onSuccess: () => {
      if (user) {
        updateUser({
          ...user,
          name: name.trim(),
          phoneNumber: phone.trim(),
          location: address.trim(),
        })
      }
      qc.invalidateQueries({ queryKey: meKey })
      toast.success("Profile saved")
    },
    onError: (err) =>
      toast.error(
        requestError(err, "Couldn't save your profile. Please try again.")
      ),
  })

  const onPick = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.")
      return
    }
    changeProfilePicture(file)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (name.trim()) save.mutate()
      }}
      className="space-y-5"
    >
      <div className="flex items-center gap-4">
        <Avatar name={name || "Admin"} src={user?.profilePicture} size="lg" />
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Choose a profile photo"
            onChange={(e) => {
              onPick(e.target.files?.[0])
              e.target.value = ""
            }}
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => fileRef.current?.click()}
          >
            <Camera size={15} aria-hidden />
            {isUploading ? "Uploading…" : "Change photo"}
          </Button>
          <p className="mt-1 text-[12.5px] text-text-secondary">
            Shown in the top bar and on your activity.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="admin-name" label="Full name">
          <input
            id="admin-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field id="admin-phone" label="Phone number">
          <input
            id="admin-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-address" label="Address">
          <input
            id="admin-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field
          id="admin-email"
          label="Email"
          hint="Your sign-in email can't be changed here."
        >
          <input
            id="admin-email"
            value={me.email}
            disabled
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <p className="text-[13px] text-text-secondary">
          Administrator
          {me.createdAt ? ` · member since ${formatDate(me.createdAt)}` : ""}
        </p>
        <Button
          type="submit"
          variant="app-primary"
          disabled={save.isPending || unchanged || !name.trim()}
        >
          {save.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  )
}

export default function ProfileCard() {
  const me = useMe()

  return (
    <AdminSection title="Profile">
      {me.isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : me.isError || !me.data ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-[14px] text-text-secondary">
            Your profile didn&rsquo;t load.
          </p>
          <Button variant="outline" onClick={() => me.refetch()}>
            Try again
          </Button>
        </div>
      ) : (
        <ProfileForm me={me.data} />
      )}
    </AdminSection>
  )
}
