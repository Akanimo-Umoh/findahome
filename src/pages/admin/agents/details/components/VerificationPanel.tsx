import { Check, Minus, X } from "lucide-react"
import AdminSection from "@/components/admin/ui/AdminSection"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatDate } from "@/pages/admin/properties/shared/propertyMeta"
import type { AdminUser, VerificationDecision } from "@/types/adminUser"
import type { ReviewState } from "../../agentMeta"

type VerificationPanelProps = {
  agent: AdminUser
  state: ReviewState
  onDecide: (action: VerificationDecision) => void
}

export default function VerificationPanel({
  agent,
  state,
  onDecide,
}: VerificationPanelProps) {
  // what onboarding requires: Government ID, business name, phone, office address. The business registration upload is optional.
  const checks = [
    {
      label: "Government ID uploaded",
      ok: !!agent.governmentId?.length,
      required: true,
    },
    { label: "Phone number", ok: !!agent.phoneNumber, required: true },
    {
      label: "Business name and office address",
      ok: !!(agent.businessName && agent.officeAddress),
      required: true,
    },
    {
      label: "Business registration uploaded",
      ok: !!agent.licenseDoc?.length,
      required: false,
    },
  ]
  const ready = checks.every((c) => !c.required || c.ok)
  const locked = state === "incomplete"

  const summary: Record<ReviewState, string> = {
    incomplete: "This agent hasn't finished onboarding yet.",
    pending: ready
      ? "All required details are in. Ready for a decision."
      : "Some required details are missing. Review before deciding.",
    verified: agent.verifiedAt
      ? `Verified on ${formatDate(agent.verifiedAt)}.`
      : "This agent is verified.",
    rejected: "This verification was rejected.",
  }

  return (
    <AdminSection title="Verification Review">
      <ul className="space-y-2.5">
        {checks.map((c) => (
          <li key={c.label} className="flex items-center gap-2.5 text-[14px]">
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full",
                c.ok && "bg-emerald-100 text-emerald-700",
                !c.ok && c.required && "bg-red-100 text-red-700",
                !c.ok && !c.required && "bg-slate-100 text-slate-400"
              )}
            >
              {c.ok ? (
                <Check size={12} aria-hidden />
              ) : c.required ? (
                <X size={12} aria-hidden />
              ) : (
                <Minus size={12} aria-hidden />
              )}
            </span>
            <span className="text-text-primary">{c.label}</span>
            {!c.required && !c.ok && (
              <span className="ml-auto text-[12px] text-text-secondary">
                Optional
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-slate-100 pt-3 text-[13.5px] text-text-secondary">
        {summary[state]}
      </p>

      {state === "rejected" && agent.verificationNote && (
        <p className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-[13.5px] text-red-700">
          {agent.verificationNote}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          disabled={locked || state === "verified"}
          onClick={() => onDecide("verified")}
        >
          Verify agent
        </Button>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-600"
          disabled={locked || state === "rejected"}
          onClick={() => onDecide("rejected")}
        >
          Reject
        </Button>
      </div>
    </AdminSection>
  )
}
