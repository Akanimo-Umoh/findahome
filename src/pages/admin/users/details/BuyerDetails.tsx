import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { useEscrowData } from "@/pages/admin/escrow/useEscrow"
import { buyerSummary, disputeUserId } from "../buyerMeta"
import { useAdminUsers } from "../useAdminUsers"
import BuyerHeader from "./components/BuyerHeader"
import BuyerStats from "./components/BuyerStats"
import DisputesOverview from "./components/DisputesOverview"
import RiskBehavior from "./components/RiskBehavior"
import TransactionHistory from "./components/TransactionHistory"

const BackLink = () => (
  <Link
    to="/admin/users"
    className="inline-flex items-center gap-2 rounded text-[14px] font-semibold text-text-primary outline-none hover:text-button-bg focus-visible:ring-2 focus-visible:ring-button-bg/40"
  >
    <ArrowLeft size={16} aria-hidden />
    Back to Buyers
  </Link>
)

export default function BuyerDetails() {
  const { userId } = useParams<{ userId: string }>()
  const users = useAdminUsers()
  const escrow = useEscrowData()

  const buyer = users.data?.find((u) => u._id === userId && u.role === "user")

  // the escrow query already loads transactions, disputes and inspections
  const rows = useMemo(
    () =>
      escrow.data
        ? escrow.data.rows.filter((r) => r.buyer.id === userId)
        : undefined,
    [escrow.data, userId]
  )
  const disputes = useMemo(
    () => escrow.data?.disputes?.filter((d) => disputeUserId(d) === userId),
    [escrow.data, userId]
  )
  const inspections = useMemo(
    () => escrow.data?.inspections?.filter((i) => i.user?._id === userId),
    [escrow.data, userId]
  )
  const summary = useMemo(
    () => buyerSummary({ rows, disputes, inspections }),
    [rows, disputes, inspections]
  )

  if (users.isLoading) {
    return (
      <div className="space-y-5">
        <BackLink />
        <Skeleton className="h-44 w-full" />
        <div className="grid gap-4 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (users.isError || !buyer) {
    return (
      <div className="space-y-5">
        <BackLink />
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
          <h3 className="font-raleway text-[16px] font-bold text-text-primary">
            {users.isError
              ? "The buyer didn’t load"
              : "We couldn’t find this buyer"}
          </h3>
          {users.isError && (
            <Button
              variant="app-primary"
              className="mt-4"
              onClick={() => users.refetch()}
              disabled={users.isFetching}
            >
              Try again
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <BackLink />

      <BuyerHeader buyer={buyer} />
      <BuyerStats summary={summary} loading={escrow.isLoading} />

      <DisputesOverview disputes={disputes} loading={escrow.isLoading} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionHistory
            buyerName={buyer.name}
            rows={rows}
            loading={escrow.isLoading}
          />
        </div>
        <RiskBehavior summary={summary} />
      </div>
    </div>
  )
}
