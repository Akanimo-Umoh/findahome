import type { AdminProperty } from "@/types/adminProperty"
import type { AdminUser } from "@/types/adminUser"

export type ReviewState = "incomplete" | "pending" | "verified" | "rejected"

export const REVIEW_LABEL: Record<ReviewState, string> = {
  incomplete: "Not onboarded",
  pending: "Awaiting review",
  verified: "Verified",
  rejected: "Rejected",
}

// `isVerified` on the user is the e-mail code check, so the review state comes
// from isOnboarding (details submitted) + verificationStatus (admin decision).
export function reviewState(agent: AdminUser): ReviewState {
  if (!agent.isOnboarding) return "incomplete"
  if (agent.verificationStatus === "verified") return "verified"
  if (agent.verificationStatus === "rejected") return "rejected"
  return "pending"
}

// Exactly the two files the onboarding form uploads (Step 3).
export type AgentDocument = {
  key: "governmentId" | "licenseDoc"
  label: string
  hint: string
  url?: string
}

export const agentDocuments = (agent: AdminUser): AgentDocument[] => [
  {
    key: "governmentId",
    label: "Government ID",
    hint: "Required at onboarding",
    url: agent.governmentId?.[0],
  },
  {
    key: "licenseDoc",
    label: "Proof of agency or business registration",
    hint: "Optional at onboarding",
    url: agent.licenseDoc?.[0],
  },
]

export type ListingCount = { total: number; active: number }

// User.totalListings is never updated by the backend, so count from the listings.
export function countListings(list: AdminProperty[]) {
  const map = new Map<string, ListingCount>()
  for (const p of list) {
    const id = p.owner?._id
    if (!id) continue
    const entry = map.get(id) ?? { total: 0, active: 0 }
    entry.total += 1
    if (p.status === "approved") entry.active += 1
    map.set(id, entry)
  }
  return map
}
