import type { User } from "@/context/AuthContext"

export const ONBOARDING_PATHS: Record<"agent" | "user", string[]> = {
  agent: ["/agent/onboarding", "/agent/onboarding/success"],
  user: ["/onboarding", "/onboarding/success"],
}

export const ONBOARDING_ENTRY = {
  agent: "/agent/onboarding",
  user: "/onboarding",
} as const

export const DASHBOARD = {
  agent: "/agent/dashboard",
  user: "/",
  admin: "/admin/dashboard",
} as const

/** Returns where the user must be sent to onboard, or null if no redirect is needed. */
export function onboardingRedirect(user: User, pathname: string) {
  if (user.role !== "agent" && user.role !== "user") return null
  if (user.isOnboarding) return null
  return ONBOARDING_PATHS[user.role].includes(pathname)
    ? null
    : ONBOARDING_ENTRY[user.role]
}
