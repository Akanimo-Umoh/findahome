import { useMyVerification } from "@/hooks/useMyVerification"
import { VERIFICATION_VIEW } from "@/lib/agentVerification"
import { cn } from "@/lib/utils"

export default function VerificationBanner() {
  const { status, isLoading } = useMyVerification()
  if (isLoading || !status || status === "approved" || status === "none") {
    return null
  }
  const view = VERIFICATION_VIEW[status]

  return (
    <div
      role="status"
      className={cn(
        "mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5 text-[12px] leading-4 md:text-[14px] md:leading-5",
        view.pill
      )}
    >
      <view.Icon size={16} className="mt-0.5 shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">{view.label}</p>
        <p>{view.hint}</p>
      </div>
    </div>
  )
}
