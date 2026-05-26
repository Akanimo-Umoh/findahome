import api from "@/services/api"
import { useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import { toast } from "sonner"

export function useProfilePicture() {
  const { user, updateUser } = useAuthContext()
  const [isUploading, setIsUploading] = useState(false)

  async function changeProfilePicture(file: File) {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("images", file)

      const response = await api.post(
        "/user/change-profile-picture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )

      // update user in context and localStorage with new picture
      const updatedPicture = Array.isArray(response.data.profilePicture)
        ? response.data.profilePicture[0]
        : response.data.profilePicture

      if (user) {
        updateUser({ ...user, profilePicture: updatedPicture })
      }

      toast.success("Profile picture updated")
    } catch {
      toast.error("Failed to update profile picture")
    } finally {
      setIsUploading(false)
    }
  }

  return { changeProfilePicture, isUploading }
}
