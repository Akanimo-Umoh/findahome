import type { ReactNode } from "react"

type FieldProps = {
  id: string
  label: string
  hint?: string
  children: ReactNode
}

export const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[14px] text-text-primary outline-none placeholder:text-text-secondary focus:border-button-bg focus:ring-2 focus:ring-button-bg/20 disabled:bg-slate-50 disabled:text-text-secondary"

export default function Field({ id, label, hint, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-text-primary"
      >
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-[12.5px] text-text-secondary">{hint}</p>}
    </div>
  )
}
