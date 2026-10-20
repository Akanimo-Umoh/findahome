import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { escrowService } from "@/services/admin/escrow.service"
import { buildEscrowRows } from "./buildEscrowRows"

export const ESCROW_QUERY_KEY = ["admin", "escrow"] as const

const pick = <T>(r: PromiseSettledResult<T[]>): T[] =>
  r.status === "fulfilled" ? r.value : []

export function errorMessage(e: unknown) {
  if (axios.isAxiosError(e)) {
    return (
      (e.response?.data as { message?: string } | undefined)?.message ??
      e.message
    )
  }
  return "Something went wrong"
}

export function useEscrowData() {
  return useQuery({
    queryKey: ESCROW_QUERY_KEY,
    staleTime: 0,
    refetchOnMount: "always",
    queryFn: async () => {
      const [escrows, purchases, inspections, disputes] =
        await Promise.allSettled([
          escrowService.list(),
          escrowService.purchases(),
          escrowService.inspections(),
          escrowService.disputes(),
        ])
      if (escrows.status === "rejected") throw escrows.reason

      return {
        rows: buildEscrowRows({
          escrows: escrows.value,
          purchases: pick(purchases),
          inspections: pick(inspections),
          disputes: pick(disputes),
        }),
        partial: [purchases, inspections, disputes].some(
          (r) => r.status === "rejected"
        ),
        disputes: disputes.status === "fulfilled" ? disputes.value : undefined,
        inspections:
          inspections.status === "fulfilled" ? inspections.value : undefined,
      }
    },
  })
}

export function useSetEscrowStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (v: {
      id: string
      status: "on_hold" | "released"
      approving?: boolean
    }) => escrowService.setStatus(v.id, v.status),
    onSuccess: (_d, v) => {
      toast.success(
        v.status === "released"
          ? "Funds released to the agent"
          : v.approving
            ? "Payment approved and held in escrow"
            : "Escrow moved back to hold"
      )
      qc.invalidateQueries({ queryKey: ESCROW_QUERY_KEY })
    },
    onError: (e) => toast.error(errorMessage(e)),
  })
}
