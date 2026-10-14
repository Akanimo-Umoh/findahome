import api from "./api"

export type AppNotification = {
  _id: string
  message: string
  read: boolean
  createdAt: string
  // not sent by the backend yet, used automatically once they are
  title?: string
  type?: string
  meta?: Record<string, unknown>
}

type NotificationsResponse = {
  success: boolean
  total: number
  unreadCount: number
  data: AppNotification[]
}

export const getMyNotifications = async (): Promise<NotificationsResponse> => {
  const { data } = await api.get("/notification")
  return data
}
