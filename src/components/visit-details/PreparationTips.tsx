import idIcon from "@/assets/images/icon-inspection-visit-id.svg"
import listsIcon from "@/assets/images/icon-inspection-visit-list.svg"
import pictureIcon from "@/assets/images/icon-inspection-visit-camera.svg"
import timeIcon from "@/assets/images/icon-inspection-visit-time.svg"

const DEFAULT_TIPS = [
  { icon: idIcon, tip: "Bring a valid ID for verification" },
  { icon: listsIcon, tip: "Prepare a list of questions about the property" },
  { icon: pictureIcon, tip: "Take photos and notes during the visit" },
  { icon: timeIcon, tip: "Arrive 5-10 minutes early" },
]

interface Tip {
  icon: string
  tip: string
}

interface PreparationTipsProps {
  tips?: Tip[]
}

export default function PreparationTips({
  tips = DEFAULT_TIPS,
}: PreparationTipsProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-bg-accent p-2">
      <p className="md:text-[18px]">Preparation Tips</p>
      <div className="flex flex-col justify-center gap-2">
        {tips.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-accent md:h-10 md:w-10">
              <img src={item.icon} alt="" className="md:h-6 md:w-6" />
            </div>
            <p className="text-[12px] leading-4 md:text-[14px]">{item.tip}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
