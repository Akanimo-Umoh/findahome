// What the admin User screens read from GET /user/users. Fields marked "not on the backend yet" are optional on purpose: the UI works without them and lights up when the backend adds them.
//
// Note: the backend's `isVerified` is the e-mail code check, NOT an admin decision on an agent, so it is deliberately not typed here.

export type UserRole = "user" | "agent" | "admin"
export type VerificationDecision = "approved" | "rejected"

export type AdminUser = {
  _id: string
  name: string
  email: string
  role: UserRole
  phoneNumber?: string | null
  profilePicture?: string[]
  address?: string | null
  rating?: number
  isVerified?: boolean // e-mail code check above isOnboarding
  isOnboarding?: boolean
  lastActive?: string
  verificationStatus?: "none" | "pending" | VerificationDecision
  isFlagged?: boolean
  isSuspended?: boolean
  isBanned?: boolean
  createdAt: string

  // agent onboarding answers
  about?: string | null
  yearsOfExperience?: number
  serviceArea?: string[]
  languages?: string[]
  businessName?: string | null
  licenseNumber?: string | null
  officeAddress?: string | null
  socialLinkOrWebsite?: string | null
  governmentId?: string[]
  licenseDoc?: string[]

  verificationNote?: string
}
