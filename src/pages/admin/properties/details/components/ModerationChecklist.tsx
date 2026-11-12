import { useState } from "react"
import AdminSection from "@/components/admin/ui/AdminSection"

const ITEMS = [
  "Images are appropriate and match description",
  "Description is accurate and complete",
  "Contact information is valid",
  "Ownership documents verified",
]

// A reviewer's aid. It isn't saved anywhere yet (see the backend list).
export default function ModerationChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() =>
    ITEMS.map(() => false)
  )
  const done = checked.filter(Boolean).length

  return (
    <AdminSection title="Moderation Checklist">
      <ul className="space-y-3">
        {ITEMS.map((label, i) => (
          <li key={label}>
            <label className="flex cursor-pointer items-start gap-3 text-[14px] text-text-primary">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() =>
                  setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)))
                }
                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-button-bg"
              />
              {label}
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[12.5px] text-text-secondary">
        {done} of {ITEMS.length} checked. Not saved.
      </p>
    </AdminSection>
  )
}
