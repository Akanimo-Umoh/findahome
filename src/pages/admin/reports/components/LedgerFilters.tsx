import { useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KIND_LABEL, STATUS_LABEL } from "../../finance/financeMeta"
import type { LedgerKind, LedgerStatus } from "../../finance/types"
import type { Filters, RoleFilter } from "../reportMeta"

type LedgerFiltersProps = {
  filters: Filters
  resetKey: number
  hasActive: boolean
  onChange: (patch: Partial<Filters>) => void
  onClear: () => void
}

const selectTrigger =
  "h-9 w-auto min-w-34 gap-2 bg-white text-[13px] font-semibold"

export default function LedgerFilters({
  filters,
  resetKey,
  hasActive,
  onChange,
  onClear,
}: LedgerFiltersProps) {
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  // wait for a pause in typing before filtering
  const onSearch = (value: string) => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => onChange({ q: value.trim() }), 250)
  }

  return (
    <div className="space-y-3 border-b border-slate-100 px-5 pb-4">
      <div className="relative">
        <Search
          size={16}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary"
        />
        <input
          key={resetKey}
          type="search"
          defaultValue={filters.q}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by code, property or person"
          aria-label="Search transactions"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-[14px] text-text-primary outline-none placeholder:text-text-secondary focus:border-button-bg focus:ring-2 focus:ring-button-bg/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.role}
          onValueChange={(v) => onChange({ role: v as RoleFilter })}
        >
          <SelectTrigger aria-label="Person" className={selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All people</SelectItem>
            <SelectItem value="user">Buyers</SelectItem>
            <SelectItem value="agent">Agents</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.kind}
          onValueChange={(v) => onChange({ kind: v as LedgerKind | "all" })}
        >
          <SelectTrigger aria-label="Type" className={selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {(Object.keys(KIND_LABEL) as LedgerKind[]).map((k) => (
              <SelectItem key={k} value={k}>
                {KIND_LABEL[k]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(v) => onChange({ status: v as LedgerStatus | "all" })}
        >
          <SelectTrigger aria-label="Status" className={selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {(Object.keys(STATUS_LABEL) as LedgerStatus[]).map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_LABEL[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActive && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-semibold text-button-bg outline-none hover:bg-bg-accent focus-visible:ring-2 focus-visible:ring-button-bg/40"
          >
            <X size={14} aria-hidden />
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
