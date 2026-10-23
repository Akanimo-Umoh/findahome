import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/services/user.service"

export type MeUser = {
  _id: string
  email: string
  name?: string
  phoneNumber?: string | null
  address?: string | null
  isGoogleUser?: boolean
  createdAt?: string
}

export const meKey = ["admin", "me"] as const

// The signed-in admin's own record: the auth context only keeps a few fields.
export function useMe() {
  return useQuery({
    queryKey: meKey,
    queryFn: async (): Promise<MeUser> => (await getMe()).user,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
}
