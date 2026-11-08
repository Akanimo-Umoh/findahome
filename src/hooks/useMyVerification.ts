import { useQuery } from "@tanstack/react-query"
import { useAuthContext } from "@/context/AuthContext"
import { getMe } from "@/services/user.service"
import type { VerificationStatus } from "@/lib/agentVerification"

// /user/me is the only place an agent can read their own decision: the public
// agent endpoint doesn't carry it, and the stored session can be days old.
export function useMyVerification() {
  const { user, token } = useAuthContext()
  const query = useQuery({
    queryKey: ["agent", "verification", user?._id],
    // react-query v5 rejects `undefined`, so normalise to null
    queryFn: async () =>
      ((await getMe()).user.verificationStatus ??
        null) as VerificationStatus | null,
    enabled: !!token,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
  return { status: query.data ?? null, isLoading: query.isLoading }
}
