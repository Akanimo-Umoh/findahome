import walletIcon from "@/assets/images/icon-green-wallet.svg";
import addIcon from "@/assets/images/icon-add-money.svg";
import nairaIcon from "@/assets/images/icon-profile-naira.svg";
import savedIcon from "@/assets/images/icon-heart.svg";
import rightArrowIcon from "@/assets/images/icon-nav-rightArrow.svg";
import chatIcon from "@/assets/images/icon-blue-chat.svg";
import { Link } from "react-router-dom";

export default function Summary() {
  return (
    <div className="flex items-center justify-between gap-3">
      {/* wallet balance */}
      <Link to="/wallet" className="agent-card flex flex-col gap-4 p-2 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center bg-[#10B98133]">
            <img src={walletIcon} alt="" />
          </div>
          <img src={addIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <img src={nairaIcon} alt="" />
            <p className="text-[#10B981] text-[14px]">3,060,000</p>
          </div>
          <p className="text-[12px] leading-4">Wallet Balance</p>
        </div>
      </Link>

      {/* saved proeprties */}
      <div className="agent-card flex flex-col gap-4 p-2 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center bg-[#FF6B6B33]">
            <img src={savedIcon} alt="" className="w-4 h-4" />
          </div>
          <img src={rightArrowIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <p className="text-[#10B981] text-[14px]">10</p>
          </div>
          <p className="text-[12px] leading-4">Saved</p>
        </div>
      </div>

      {/* active chats */}
      <div className="agent-card flex flex-col gap-4 p-2 rounded-lg w-full">
        <div className="flex items-center justify-between">
          <div className="w-7.5 h-7.5 rounded-lg flex items-center justify-center bg-[#274AD033]">
            <img src={chatIcon} alt="" />
          </div>
          <img src={rightArrowIcon} alt="" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <p className="text-[#10B981] text-[14px]">3</p>
          </div>
          <p className="text-[12px] leading-4">Active Chats</p>
        </div>
      </div>
    </div>
  );
}
