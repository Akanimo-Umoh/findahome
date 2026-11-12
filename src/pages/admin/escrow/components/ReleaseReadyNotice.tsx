import { Landmark } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = { count: number; active: boolean; onToggle: () => void }

export function ReleaseReadyNotice({ count, active, onToggle }: Props) {
  if (count === 0 && !active) return null

  return (
    <div
      role="status"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
          <Landmark size={17} aria-hidden />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-text-primary">
            {count} {count === 1 ? "escrow is" : "escrows are"} ready to release
          </p>
          <p className="text-[12.5px] text-text-secondary">
            The deal is complete and the funds are still held.
          </p>
        </div>
      </div>
      <Button variant="outline" onClick={onToggle}>
        {active ? "Show all" : "Show them"}
      </Button>
    </div>
  )
}
