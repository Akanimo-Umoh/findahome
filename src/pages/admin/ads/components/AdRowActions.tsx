import {
  CalendarPlus,
  ClipboardCheck,
  EllipsisVertical,
  Eye,
  Pause,
  Play,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminAd } from "@/types/adminAd"
import { adCode, adState } from "../adMeta"

export type AdRowMode = "pause" | "resume" | "remove"

type AdRowActionsProps = {
  ad: AdminAd
  onDetails: (ad: AdminAd) => void
  onReview: (ad: AdminAd) => void
  onAct: (ad: AdminAd, mode: AdRowMode) => void
}

const item = "cursor-pointer gap-2.5 rounded-lg px-2.5 py-2 text-[14px]"

export default function AdRowActions({
  ad,
  onDetails,
  onReview,
  onAct,
}: AdRowActionsProps) {
  const state = adState(ad)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Actions for ${adCode(ad)}`}
          className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-text-secondary outline-none hover:bg-slate-100 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-button-bg/40 data-[state=open]:bg-slate-100"
        >
          <EllipsisVertical size={17} aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
        <DropdownMenuItem className={item} onSelect={() => onDetails(ad)}>
          <Eye aria-hidden />
          View Details
        </DropdownMenuItem>
        {state === "pending_review" && (
          <DropdownMenuItem className={item} onSelect={() => onReview(ad)}>
            <ClipboardCheck aria-hidden />
            Review Ad
          </DropdownMenuItem>
        )}
        {state === "active" && (
          <DropdownMenuItem
            className={item}
            onSelect={() => onAct(ad, "pause")}
          >
            <Pause aria-hidden />
            Pause Ad
          </DropdownMenuItem>
        )}
        {state === "paused" && (
          <DropdownMenuItem
            className={item}
            onSelect={() => onAct(ad, "resume")}
          >
            <Play aria-hidden />
            Resume Ad
          </DropdownMenuItem>
        )}
        {(state === "active" || state === "paused") && (
          // admins can't change an ad's duration on the backend yet
          <DropdownMenuItem className={item} disabled>
            <CalendarPlus aria-hidden />
            Extend Duration
            <span className="ml-auto text-[10px] uppercase">Soon</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className={`${item} text-red-600 focus:bg-red-50 focus:text-red-600 [&_svg]:text-red-600!`}
          onSelect={() => onAct(ad, "remove")}
        >
          <Trash2 aria-hidden />
          Remove Ad
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
