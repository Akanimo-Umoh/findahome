import checkIcon from "@/assets/agentImages/icon-filled-checkbox.svg"
import viewsIcon from "@/assets/agentImages/icon-views.svg"
import leadsIcon from "@/assets/agentImages/icon-leads.svg"
import salesIcon from "@/assets/agentImages/icon-sales.svg"

type Option = {
  id: number
  title: string
  description: string
  icon: string
  bg: string
}

const options: Option[] = [
  {
    id: 1,
    title: "More Views",
    description: "Maximize visibility for your listing",
    icon: viewsIcon,
    bg: "bg-[#F8B40033]",
  },
  {
    id: 2,
    title: "Get Leads",
    description: "Encourage potential buyers to contact",
    icon: leadsIcon,
    bg: "bg-[#274AD033]",
  },
  {
    id: 3,
    title: "Quick Sales",
    description: "Connect to instant buyers.",
    icon: salesIcon,
    bg: "bg-[#149D1833]",
  },
]

type Step2Props = {
  selectedObjective: number | null
  onSelect: (id: number) => void
}

export default function Step2({ selectedObjective, onSelect }: Step2Props) {
  return (
    <div>
      <p className="">Step 2: Choose Ad Objective</p>

      <div className="-mx-6 mt-2 scrollbar-hide flex items-center gap-5 overflow-x-auto px-6 md:mx-0 md:px-0">
        {options.map((option) => {
          const isSelected = selectedObjective === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="flex min-w-35.5 cursor-pointer flex-col justify-center gap-4 rounded-lg border border-bg-accent px-2 py-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-7.5 w-7.5 items-center justify-center rounded-2xl ${option.bg}`}
                >
                  <img src={option.icon} alt="" />
                </div>

                {isSelected && <img src={checkIcon} alt="" />}
              </div>

              <div className="space-y-1 text-left">
                <p className="text-[14px] text-[#10B981]">{option.title}</p>

                <p className="text-[12px] leading-4">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
