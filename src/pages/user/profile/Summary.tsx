import walletIcon from "@/assets/images/icon-green-wallet.svg"
import addIcon from "@/assets/images/icon-add-money.svg"
import nairaIcon from "@/assets/images/icon-profile-naira.svg"
import savedIcon from "@/assets/images/icon-heart.svg"
import rightArrowIcon from "@/assets/images/icon-nav-rightArrow.svg"
import chatIcon from "@/assets/images/icon-blue-chat.svg"
import { Link } from "react-router-dom"
import { useSavedCount } from "@/hooks/useSavedCount"

export default function Summary() {
  const { savedCount, isLoading } = useSavedCount()

  return (
    <div className="flex items-center justify-between gap-3">
      {/* wallet balance */}
      <Link
        to="/wallet"
        className="agent-card flex w-full flex-col gap-4 rounded-lg p-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#10B98133]">
            <img src={walletIcon} alt="" />
          </div>
          <img src={addIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <img src={nairaIcon} alt="" />
            <p className="text-[14px] text-[#10B981]">3,060,000</p>
          </div>
          <p className="text-[12px] leading-4">Wallet Balance</p>
        </div>
      </Link>

      {/* saved proeprties */}
      <Link
        to="/saved-properties"
        className="agent-card flex w-full flex-col gap-4 rounded-lg p-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#FF6B6B33]">
            <img src={savedIcon} alt="" className="h-4 w-4" />
          </div>
          <img src={rightArrowIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <p className="text-[14px] text-[#10B981]">
              {isLoading ? "--" : savedCount}
            </p>
          </div>
          <p className="text-[12px] leading-4">Saved</p>
        </div>
      </Link>

      {/* active chats */}
      <Link
        to="/chats"
        className="agent-card flex w-full flex-col gap-4 rounded-lg p-2"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-[#274AD033]">
            <img src={chatIcon} alt="" />
          </div>
          <img src={rightArrowIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <p className="text-[14px] text-[#10B981]">3</p>
          </div>
          <p className="text-[12px] leading-4">Active Chats</p>
        </div>
      </Link>
    </div>
  )
}
