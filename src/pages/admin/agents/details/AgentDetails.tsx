import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import MetricValue from "@/components/admin/ui/MetricValue"
import { Button } from "@/components/ui/button"
import Skeleton from "@/components/ui/Skeleton"
import { useEscrowData } from "@/pages/admin/escrow/useEscrow"
import { propertiesKey } from "@/pages/admin/properties/shared/useModeration"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"
import { getAdminProperties } from "@/services/admin/properties.service"
import type { VerificationDecision } from "@/types/adminUser"
import { reviewState } from "../agentMeta"
import VerificationDialog from "../shared/VerificationDialog"
import { useVerifyAgent } from "../shared/useVerifyAgent"
import BusinessDetails from "./components/BusinessDetails"
import DocumentsPanel from "./components/DocumentsPanel"
import ListingOverview from "./components/ListingOverview"
import ProfileHeader from "./components/ProfileHeader"
import TransactionPerformance from "./components/TransactionPerformance"
import VerificationPanel from "./components/VerificationPanel"

const BackLink = () => (
  <Link
    to="/admin/agents"
    className="inline-flex items-center gap-2 rounded text-[14px] font-semibold text-text-primary outline-none hover:text-button-bg focus-visible:ring-2 focus-visible:ring-button-bg/40"
  >
    <ArrowLeft size={16} aria-hidden />
    Back to Agents
  </Link>
)

const Tile = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-center">
    <p className="text-[12.5px] text-text-secondary">{label}</p>
    {children}
  </div>
)

const tileValue =
  "block font-raleway text-[24px] leading-9 font-bold text-text-primary"

export default function AgentDetails() {
  const { agentId } = useParams<{ agentId: string }>()
  const users = useAdminUsers()
  const properties = useQuery({
    queryKey: propertiesKey,
    queryFn: getAdminProperties,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })
  const escrow = useEscrowData()
  const verify = useVerifyAgent()
  const [action, setAction] = useState<VerificationDecision | null>(null)

  const agent = users.data?.find((u) => u._id === agentId && u.role === "agent")
  const listings = useMemo(
    () => properties.data?.filter((p) => p.owner?._id === agentId),
    [properties.data, agentId]
  )
  const transactions = useMemo(
    () => escrow.data?.rows.filter((r) => r.agent.id === agentId),
    [escrow.data, agentId]
  )

  if (users.isLoading) {
    return (
      <div className="space-y-5">
        <BackLink />
        <Skeleton className="h-44 w-full" />
        <div className="grid gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    )
  }

  if (users.isError || !agent) {
    return (
      <div className="space-y-5">
        <BackLink />
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-16 text-center">
          <h3 className="font-raleway text-[16px] font-bold text-text-primary">
            {users.isError
              ? "The agent didn’t load"
              : "We couldn’t find this agent"}
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

  const state = reviewState(agent)
  const confirm = (reason?: string) => {
    if (!action) return
    verify.mutate(
      { id: agent._id, status: action, reason },
      { onSuccess: () => setAction(null) }
    )
  }

  return (
    <div className="space-y-5">
      <BackLink />

      <ProfileHeader agent={agent} state={state} />

      <section
        aria-label="Agent totals"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        <Tile label="Total Listings">
          <MetricValue
            value={listings?.length ?? null}
            loading={properties.isLoading}
            skeletonClassName="mx-auto mt-1 h-8 w-10"
            className={`${tileValue} text-button-bg`}
          />
        </Tile>
        <Tile label="Active Listings">
          <MetricValue
            value={
              listings
                ? listings.filter((p) => p.status === "approved").length
                : null
            }
            loading={properties.isLoading}
            skeletonClassName="mx-auto mt-1 h-8 w-10"
            className={`${tileValue} text-emerald-700`}
          />
        </Tile>
        <Tile label="Transactions">
          <MetricValue
            value={transactions?.length ?? null}
            loading={escrow.isLoading}
            skeletonClassName="mx-auto mt-1 h-8 w-10"
            className={tileValue}
          />
        </Tile>
        <Tile label="Avg. Rating">
          <MetricValue
            value={agent.rating && agent.rating > 0 ? agent.rating : null}
            format={(n) => n.toFixed(1)}
            className={tileValue}
          />
        </Tile>
      </section>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <DocumentsPanel agent={agent} />
          <BusinessDetails agent={agent} />
          <ListingOverview
            agentName={agent.name}
            listings={listings}
            loading={properties.isLoading}
          />
        </div>

        <div className="space-y-5">
          <VerificationPanel agent={agent} state={state} onDecide={setAction} />
          <TransactionPerformance
            rows={transactions}
            loading={escrow.isLoading}
          />
        </div>
      </div>

      {action && (
        <VerificationDialog
          action={action}
          agentName={agent.name}
          pending={verify.isPending}
          onConfirm={confirm}
          onClose={() => setAction(null)}
        />
      )}
    </div>
  )
}
