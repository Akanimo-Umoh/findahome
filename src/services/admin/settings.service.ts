import api from "@/services/api"

// Marks every notification of the signed-in user as read.
export const markAllNotificationsRead = async () => {
  const { data } = await api.patch("/notification/read-all")
  return data
}
