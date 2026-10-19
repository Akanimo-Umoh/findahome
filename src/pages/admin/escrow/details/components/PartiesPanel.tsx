import { Link } from "react-router-dom"
import type { EscrowRow, Party } from "../../types"
import { Panel } from "./Panel"

function PartyCard({ role, party }: { role: string; party: Party }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
      <p className="text-xs tracking-wide text-slate-400 uppercase">{role}</p>
      <p className="mt-1 font-medium text-slate-900">{party.name}</p>
      <p className="truncate text-sm text-slate-500">
        {party.email || "No email"}
      </p>
      <p className="text-sm text-slate-500 tabular-nums">
        {party.phone || "No phone number"}
      </p>
    </div>
  )
}

export function PartiesPanel({ row }: { row: EscrowRow }) {
  return (
    <Panel title="People and property">
      <div className="grid gap-3 sm:grid-cols-2">
        <PartyCard role="Buyer (paid)" party={row.buyer} />
        <PartyCard role="Agent (receives funds)" party={row.agent} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 p-3">
        <div className="min-w-0">
          <p className="text-xs tracking-wide text-slate-400 uppercase">
            Property
          </p>
          <p className="truncate font-medium text-slate-900">
            {row.propertyTitle}
          </p>
          {row.propertyAddress && (
            <p className="truncate text-sm text-slate-500">
              {row.propertyAddress}
            </p>
          )}
        </div>
        {row.propertyId && (
          <Link
            to={`/admin/properties/${row.propertyId}`}
            className="text-sm font-medium text-[#274ad0] hover:underline"
          >
            View listing
          </Link>
        )}
      </div>
    </Panel>
  )
}
