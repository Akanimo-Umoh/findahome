import { Link } from "react-router-dom"
import addIcon from "@/assets/agentImages/icon-add-property.svg"
import createAdIcon from "@/assets/agentImages/icon-create-ad.svg"
import transactionsIcon from "@/assets/agentImages/icon-transactions.svg"
import messageIcon from "@/assets/agentImages/icon-messages.svg"

type Action = {
  icon: string
  label: string
  bg: string
  link: string
}

const actions: Action[] = [
  {
    icon: addIcon,
    label: "Add Property",
    bg: "bg-[#16A34A]",
    link: "/agent/add-property",
  },
  {
    icon: createAdIcon,
    label: "Create Ad",
    bg: "bg-[#D97706]",
    link: "/agent/create-ad",
  },
  {
    icon: transactionsIcon,
    label: "Transactions",
    bg: "bg-button-bg",
    link: "/agent/transactions",
  },
  {
    icon: messageIcon,
    label: "Messages",
    bg: "bg-[#DC2626]",
    link: "/messages",
  },
]

export default function QuickActions() {
  return (
    <div className="mt-6 md:mt-8">
      <p className="">Quick Actions</p>

      {/*
        mobile  → 2 columns (2×2 grid of cards)
        md/tablet → 4 columns (single row)
        lg/desktop → 4 columns (single row, larger icon)
      */}
      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-3.5 md:grid-cols-4 md:gap-3.5 lg:mt-3.5 lg:gap-3.5">
        {actions.map((action) => (
          <Link
            to={action.link}
            key={action.link}
            className="flex flex-col items-center gap-2 rounded-xl border border-[#E7E5E2] bg-white px-3 py-4 transition-all hover:bg-[#FAFAF9] hover:shadow-sm active:scale-95 md:gap-2.5 md:rounded-[14px] md:py-[18px] lg:gap-2.5 lg:py-[18px]"
          >
            {/* icon */}
            <div
              className={`${action.bg} flex h-10 w-10 items-center justify-center rounded-xl md:h-[38px] md:w-[38px] md:rounded-[12px] lg:h-[42px] lg:w-[42px] lg:rounded-[13px]`}
            >
              <img
                src={action.icon}
                alt={action.label}
                className="h-5 w-5 md:h-[18px] md:w-[18px] lg:h-5 lg:w-5"
              />
            </div>

            {/* label */}
            <p className="text-center text-[12px] leading-4 font-semibold text-text-secondary md:text-[12px] lg:text-[12px]">
              {action.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
