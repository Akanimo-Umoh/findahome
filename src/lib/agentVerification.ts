import {
  Clock,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  type LucideIcon,
} from "lucide-react"

export type VerificationStatus = "none" | "pending" | "approved" | "rejected"

export const VERIFICATION_VIEW: Record<
  VerificationStatus,
  { label: string; Icon: LucideIcon; text: string; pill: string; hint: string }
> = {
  none: {
    label: "Not submitted",
    Icon: ShieldAlert,
    text: "text-slate-600",
    pill: "bg-slate-100 text-slate-600",
    hint: "Finish onboarding so we can verify your account.",
  },
  pending: {
    label: "Awaiting review",
    Icon: Clock,
    text: "text-amber-700",
    pill: "bg-amber-50 text-amber-700",
    hint: "We're reviewing your documents. Your Verified badge appears once approved.",
  },
  approved: {
    label: "Verified",
    Icon: ShieldCheck,
    text: "text-emerald-700",
    pill: "bg-emerald-50 text-emerald-700",
    hint: "Your account is verified.",
  },
  rejected: {
    label: "Not approved",
    Icon: ShieldX,
    text: "text-red-700",
    pill: "bg-red-50 text-red-700",
    hint: "We couldn't verify your documents. Resubmit to try again.",
  },
}
