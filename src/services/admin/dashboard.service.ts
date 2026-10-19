import api from "@/services/api"
import type {
  AdminActivityRecord,
  AdminAdRecord,
  AdminDisputeRecord,
  AdminListingRecord,
  AdminUserRecord,
} from "@/types/admin"

// Raw list fetchers the admin dashboard aggregates over. None of these endpoints paginate or return stats yet, so the dashboard derives its numbers on the client (see pages/admin/dashboard/buildOverview.ts). When the backend ships a single overview endpoint, replace these with one call.

export const getAdminUsers = async (): Promise<AdminUserRecord[]> => {
  const { data } = await api.get("/user/users")
  return data.data ?? []
}

export const getAdminListings = async (): Promise<AdminListingRecord[]> => {
  const { data } = await api.get("/property")
  return data.properties ?? []
}

export const getAdminDisputes = async (): Promise<AdminDisputeRecord[]> => {
  const { data } = await api.get("/dispute/admin/all")
  return data.disputes ?? []
}

export const getAdminAds = async (): Promise<AdminAdRecord[]> => {
  const { data } = await api.get("/ads")
  return data.data ?? []
}

// transactions + escrows merged, newest first
export const getAdminActivities = async (): Promise<AdminActivityRecord[]> => {
  const { data } = await api.get("/transaction/all-transactions-activities")
  return data.activities ?? []
}
