import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PERIOD_LABEL, type Period } from "../reportMeta"

type ReportHeaderBarProps = {
  period: Period
  canExport: boolean
  onPeriod: (period: Period) => void
  onExportCsv: () => void
}

const selectTrigger =
  "h-9 w-auto min-w-34 gap-2 bg-white text-[13px] font-semibold"

export default function ReportHeaderBar({
  period,
  canExport,
  onPeriod,
  onExportCsv,
}: ReportHeaderBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Select value={period} onValueChange={(v) => onPeriod(v as Period)}>
        <SelectTrigger aria-label="Period" className={selectTrigger}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(PERIOD_LABEL) as Period[]).map((p) => (
            <SelectItem key={p} value={p}>
              {PERIOD_LABEL[p]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onExportCsv} disabled={!canExport}>
          <Download size={15} aria-hidden />
          Export CSV
        </Button>
        {/* needs a PDF generator; not built yet */}
        <Button variant="outline" disabled title="Coming soon">
          <FileText size={15} aria-hidden />
          Export PDF
        </Button>
      </div>
    </div>
  )
}
