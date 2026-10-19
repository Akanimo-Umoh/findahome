import api from "@/services/api"
import type {
  AdminAgentProfile,
  AdminNote,
  AdminProperty,
} from "@/types/adminProperty"

export const getAdminProperties = async (): Promise<AdminProperty[]> => {
  const { data } = await api.get("/property")
  return data.properties ?? []
}

export const getAdminProperty = async (id: string): Promise<AdminProperty> => {
  const { data } = await api.get(`/property/${id}`)
  return data.property
}

export const getAgentProfile = async (
  id: string
): Promise<AdminAgentProfile> => {
  const { data } = await api.get(`/user/agents/${id}`)
  return data.data
}

export const getAgentProperties = async (
  id: string
): Promise<AdminProperty[]> => {
  const { data } = await api.get(`/property/agent/${id}`)
  return data.properties ?? []
}

export const setPropertyStatus = async (
  id: string,
  status: "approved" | "rejected"
) => {
  const { data } = await api.put(`/property/status/${id}`, { status })
  const saved: AdminProperty | undefined = data.data ?? data.property
  // PUT /property/status/:id is currently wired to updateProperty on the
  // backend, which ignores `status` but still answers 200. Don't report a
  // success that didn't happen.
  if (saved?.status && saved.status !== status) {
    throw new Error(
      "The server accepted the request but didn't change the status."
    )
  }
  return saved
}

// ---- not on the backend yet (see the backend list) ----

export const flagProperty = async (
  id: string,
  flagged: boolean,
  reason?: string
) => {
  const { data } = await api.patch(`/property/${id}/flag`, { flagged, reason })
  return data.property as AdminProperty | undefined
}

export const addAdminNote = async (id: string, note: string) => {
  const { data } = await api.post(`/property/${id}/notes`, { note })
  return data.note as AdminNote
}
