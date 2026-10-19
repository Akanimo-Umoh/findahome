import AdminSection from "@/components/admin/ui/AdminSection"
import { cn } from "@/lib/utils"
import type { AdminProperty, PropertyStatus } from "@/types/adminProperty"
import { STATUS_LABEL_LONG, formatDateTime } from "../../shared/propertyMeta"

type Step = {
  key: string
  label: string
  at?: string
  status?: PropertyStatus
  current?: boolean
}

const DOT: Record<PropertyStatus, string> = {
  approved: "bg-emerald-500",
  pending: "bg-amber-500",
  rejected: "bg-red-500",
}
const TEXT: Record<PropertyStatus, string> = {
  approved: "text-emerald-700",
  pending: "text-amber-700",
  rejected: "text-red-700",
}

// Uses the server's history when it has one; until then, builds what the
// listing's own dates can honestly say (created, then its current state).
function stepsFor(p: AdminProperty): Step[] {
  if (p.statusHistory?.length) {
    return p.statusHistory.map((e, i, all) => ({
      key: `${e.status}-${e.at}`,
      label: STATUS_LABEL_LONG[e.status] ?? e.status,
      at: e.at,
      status: e.status,
      current: i === all.length - 1,
    }))
  }
  return [
    { key: "created", label: "Created", at: p.createdAt },
    {
      key: "state",
      label: STATUS_LABEL_LONG[p.status],
      at: p.status === "pending" ? undefined : p.updatedAt,
      status: p.status,
      current: true,
    },
  ]
}

export default function StatusTimeline({
  property,
}: {
  property: AdminProperty
}) {
  const steps = stepsFor(property)

  return (
    <AdminSection title="Status History">
      <ol>
        {steps.map((step, i) => (
          <li key={step.key} className="relative flex gap-3 pb-5 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute top-4 bottom-0 left-1.75 w-px bg-slate-200"
              />
            )}
            <span
              aria-hidden
              className={cn(
                "relative mt-0.5 size-4 shrink-0 rounded-full ring-4 ring-white",
                step.status ? DOT[step.status] : "bg-slate-300"
              )}
            />
            <div>
              <p
                className={cn(
                  "text-[14px] font-semibold",
                  step.current && step.status
                    ? TEXT[step.status]
                    : "text-text-primary"
                )}
              >
                {step.label}
              </p>
              {step.at && (
                <p className="text-[12.5px] text-text-secondary">
                  {formatDateTime(step.at)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </AdminSection>
  )
}
