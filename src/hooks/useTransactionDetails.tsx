import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import {
  getInspectionDetails,
  type Inspection,
} from "@/services/inspection.service"
import { getPurchaseDetails, type Purchase } from "@/services/purchase.service"

export function useTransactionDetails(id: string) {
  const [searchParams] = useSearchParams()
  const recordType = (searchParams.get("type") ?? "inspection") as
    | "inspection"
    | "purchase"

  const { data, isLoading, isFetching, error } = useQuery<
    Inspection | Purchase
  >({
    queryKey: ["transactionDetails", id, recordType],
    queryFn: () =>
      recordType === "purchase"
        ? getPurchaseDetails(id)
        : getInspectionDetails(id),
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: "always",
  })

  return { transaction: data, recordType, isLoading, isFetching, error }
}
