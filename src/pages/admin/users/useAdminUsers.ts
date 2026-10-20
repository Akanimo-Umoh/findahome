import { useQuery } from "@tanstack/react-query"
import { getAdminUsers } from "@/services/admin/users.service"

export const usersKey = ["admin", "users"] as const

// Shared by the Agents and Buyers screens.
export function useAdminUsers() {
  return useQuery({
    queryKey: usersKey,
    queryFn: getAdminUsers,
    // decisions are made here and on the profile pages, so never show a stale list
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
}
