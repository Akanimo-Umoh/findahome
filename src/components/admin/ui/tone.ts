// One place for the semantic colours used across admin screens. Class names are spelled out in full so Tailwind can see them.

export type Tone = "neutral" | "info" | "success" | "warning" | "danger"

export const toneText: Record<Tone, string> = {
  neutral: "text-text-primary",
  info: "text-button-bg",
  success: "text-emerald-700",
  warning: "text-amber-700",
  danger: "text-red-600",
}

export const toneDot: Record<Tone, string> = {
  neutral: "bg-slate-300",
  info: "bg-button-bg",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-error",
}

// soft icon chips and count pills
export const toneSoft: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  info: "bg-bg-accent text-button-bg",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-600",
}
