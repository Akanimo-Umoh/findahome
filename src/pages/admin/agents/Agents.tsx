import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SearchX, TriangleAlert } from "lucide-react"
import AdminPagination from "@/components/admin/ui/AdminPagination"
import { Button } from "@/components/ui/button"
import { propertiesKey } from "@/pages/admin/properties/shared/useModeration"
import { useAdminUsers } from "@/pages/admin/users/useAdminUsers"
import { getAdminProperties } from "@/services/admin/properties.service"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"
import { countListings, reviewState } from "./agentMeta"
import AgentStats from "./components/AgentStats"
import AgentTable from "./components/AgentTable"
import AgentToolbar from "./components/AgentToolbar"
import VerificationQueue from "./components/VerificationQueue"
import { PAGE_SIZE, countStates, selectAgents } from "./filterAgents"
import VerificationDialog from "./shared/VerificationDialog"
import { useVerifyAgent } from "./shared/useVerifyAgent"
import { useAgentFilters } from "./useAgentFilters"

const QUEUE_SIZE = 5

export default function Agents() {
  const { filters, update, clear, hasActive, resetKey } = useAgentFilters()
  const [decision, setDecision] = useState<{
    agent: AdminUser
    action: VerificationDecision
  } | null>(null)

  const users = useAdminUsers()
  // User.totalListings is never updated by the backend, so count from listings
  const properties = useQuery({
    queryKey: propertiesKey,
    queryFn: getAdminProperties,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
  })

  const agents = useMemo(
    () => (users.data ?? []).filter((u) => u.role === "agent"),
    [users.data]
  )
  const listings = useMemo(
    () => countListings(properties.data ?? []),
    [properties.data]
  )
  const totals = useMemo(() => countStates(agents), [agents])
  const queue = useMemo(
    () =>
      agents
        .filter((a) => reviewState(a) === "pending")
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    [agents]
  )
  const { tabCounts, filtered, pageCount, page, rows } = useMemo(
    () => selectAgents(agents, filters),
    [agents, filters]
  )

  const verify = useVerifyAgent()
  const confirm = (reason?: string) => {
    if (!decision) return
    verify.mutate(
      { id: decision.agent._id, status: decision.action, reason },
      { onSuccess: () => setDecision(null) }
    )
  }

  const loading = users.isLoading
  const empty = !loading && !users.isError && filtered.length === 0

  return (
    <div className="space-y-5">
      <AgentStats
        counts={totals}
        active={filters.status}
        loading={loading}
        onSelect={(status) => update({ status })}
      />

      <VerificationQueue
        agents={queue.slice(0, QUEUE_SIZE)}
        total={queue.length}
        loading={loading}
      />

      <section className="rounded-xl border border-slate-200 bg-white">
        <header className="px-5 pt-4 pb-3">
          <h2 className="font-raleway text-[15px] leading-5 font-bold text-text-primary">
            All Agents
          </h2>
          <p className="text-[13px] text-text-secondary">
            Agents and landlords who list on FindaHome
          </p>
        </header>

        <AgentToolbar
          filters={filters}
          counts={tabCounts}
          resetKey={resetKey}
          hasActive={hasActive}
          onChange={update}
          onClear={clear}
        />

        {users.isError ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <TriangleAlert size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              The agents didn&rsquo;t load
            </h3>
            <p className="mt-1 text-[14px] text-text-secondary">
              Check your connection and try again.
            </p>
            <Button
              variant="app-primary"
              className="mt-4"
              onClick={() => users.refetch()}
              disabled={users.isFetching}
            >
              Try again
            </Button>
          </div>
        ) : empty ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <SearchX size={22} aria-hidden />
            </span>
            <h3 className="mt-4 font-raleway text-[16px] font-bold text-text-primary">
              {agents.length === 0
                ? "No agents yet"
                : "No agents match these filters"}
            </h3>
            {hasActive && (
              <button
                type="button"
                onClick={clear}
                className="mt-2 cursor-pointer text-[14px] font-semibold text-button-bg underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <AgentTable
            rows={rows}
            loading={loading}
            listings={listings}
            listingsLoading={properties.isLoading}
            onDecide={(agent, action) => setDecision({ agent, action })}
          />
        )}

        <AdminPagination
          page={page}
          pageCount={pageCount}
          total={filtered.length}
          pageSize={PAGE_SIZE}
          noun="agents"
          onPageChange={(next) => {
            update({ page: next })
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </section>

      {decision && (
        <VerificationDialog
          action={decision.action}
          agentName={decision.agent.name}
          pending={verify.isPending}
          onConfirm={confirm}
          onClose={() => setDecision(null)}
        />
      )}
    </div>
  )
}
