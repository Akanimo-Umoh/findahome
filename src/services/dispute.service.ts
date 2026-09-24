import api from "@/services/api"

export type DisputeCategory =
  | "refund_request"
  | "property_mismatch"
  | "agent_misconduct"
  | "payment_issue"
  | "other"

export type DisputeStatus =
  | "opened"
  | "under_review"
  | "resolved"
  | "closed"
  | "escalated"

export type DisputeMessage = {
  _id: string
  dispute: string
  sender: string | { _id: string; name?: string; email: string; role?: string }
  text?: string
  attachments: string[]
  type: "text" | "image" | "file"
  readBy: string[]
  createdAt: string
  updatedAt: string
}

export type Dispute = {
  _id: string
  referenceId: string
  property:
    | string
    | {
        _id: string
        title: string
        images?: string[]
        price?: number
        location?: string
      }
  user: string | { _id: string; name?: string; email: string; phone?: string }
  agent: string | { _id: string; name?: string; email: string; phone?: string }
  admin?: string | { _id: string; name?: string; email: string }
  purchase?:
    | string
    | { _id: string; reference?: string; [key: string]: unknown }
  inspection?:
    | string
    | { _id: string; reference?: string; [key: string]: unknown }
  category: DisputeCategory
  description: string
  disputeFiles: string[]
  resolutionNotes?: string
  status: DisputeStatus
  openedAt: string
  reviewedAt?: string
  resolvedAt?: string
  closedAt?: string
  createdAt: string
  updatedAt: string
}

export async function createDispute(payload: {
  propertyId: string
  agentId?: string
  purchaseId?: string
  inspectionId?: string
  category: DisputeCategory
  description: string
  files?: File[]
}) {
  const formData = new FormData()
  formData.append("propertyId", payload.propertyId)
  if (payload.agentId) formData.append("agentId", payload.agentId)
  if (payload.purchaseId) formData.append("purchaseId", payload.purchaseId)
  if (payload.inspectionId)
    formData.append("inspectionId", payload.inspectionId)
  formData.append("category", payload.category)
  formData.append("description", payload.description)
  payload.files?.forEach((file) => formData.append("images", file))

  const res = await api.post("/dispute", formData, {
    headers: { "Content-Type": undefined },
  })
  return res.data as { success: boolean; message: string; dispute: Dispute }
}

export async function getMyDisputes() {
  const res = await api.get("/dispute/my-disputes")
  return res.data as { success: boolean; count: number; disputes: Dispute[] }
}

export async function getAgentDisputes() {
  const res = await api.get("/dispute/agent-disputes")
  return res.data as { success: boolean; count: number; disputes: Dispute[] }
}

export async function getDisputeDetails(disputeId: string) {
  const res = await api.get(`/dispute/${disputeId}`)
  return res.data as {
    success: boolean
    dispute: Dispute
    messages: DisputeMessage[]
  }
}
