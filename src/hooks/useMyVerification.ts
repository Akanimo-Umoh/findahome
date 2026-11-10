import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import { getMe } from "@/services/user.service"
import type { VerificationStatus } from "@/lib/agentVerification"

// The parts of /user/me the agent screens read.
export type MyAccount = {
  verificationStatus?: VerificationStatus
  verificationNote?: string
  about?: string | null
  yearsOfExperience?: number
  serviceArea?: string[]
  languages?: string[]
  businessName?: string | null
  phoneNumber?: string | null
  licenseNumber?: string | null
  officeAddress?: string | null
  socialLinkOrWebsite?: string | null
  governmentId?: string[]
  licenseDoc?: string[]
}

export const myVerificationKey = ["agent", "verification"] as const

// /user/me is the only place an agent can read their own decision: the public
// agent endpoint doesn't carry it, and the stored session can be days old.
export function useMyVerification() {
  const { user, token } = useAuthContext()
  const query = useQuery({
    queryKey: [...myVerificationKey, user?._id],
    queryFn: async () => (await getMe()).user as MyAccount,
    enabled: !!token,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
  const me = query.data ?? null
  return {
    me,
    status: me?.verificationStatus ?? null,
    note: me?.verificationNote ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    refetch: query.refetch,
  }
}
