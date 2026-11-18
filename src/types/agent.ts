import type { VerificationStatus } from "@/lib/agentVerification"

export type Agent = {
  _id: string
  name: string
  profilePicture: string[] | string | null
  isVerified?: boolean // email confirmation only
  verificationStatus?: VerificationStatus
  about: string | null
  yearsOfExperience: number
  serviceArea: string[]
  languages: string[]
  businessName: string | null
  officeAddress: string | null
  // pending backend (item 3): fall back to 0 until they arrive
  rating?: number
  reviewCount?: number
  activeListings?: number
}
