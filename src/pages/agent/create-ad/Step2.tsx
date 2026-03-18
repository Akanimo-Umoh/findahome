import checkIcon from "@/assets/agentImages/icon-filled-checkbox.svg";
import viewsIcon from "@/assets/agentImages/icon-views.svg";
import leadsIcon from "@/assets/agentImages/icon-leads.svg";
import salesIcon from "@/assets/agentImages/icon-sales.svg";

type Option = {
  id: number;
  title: string;
  description: string;
  icon: string;
  bg: string;
};

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
];

export default function Step2() {
  return (
    <div>
      <p className="mx-6">Step 2: Choose Ad Objective</p>

      <div className="flex items-center px-6 gap-5 overflow-x-auto scrollbar-hide mt-2">
        {options.map((option) => (
          <div
            key={option.id}
            className="rounded-lg border border-bg-accent py-4 px-2 flex flex-col justify-center gap-4 min-w-35.5"
          >
            <div className="flex items-center justify-between">
              <div
                className={`w-7.5 h-7.5 flex items-center justify-center rounded-2xl ${option.bg}`}
              >
                <img src={option.icon} alt="" />
              </div>

              <img src={checkIcon} alt="" />
            </div>

            <div className="space-y-1">
              <p className="text-[#10B981] text-[14px]">{option.title}</p>

              <p className="text-[12px] leading-4">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
