import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";
import timeIcon from "@/assets/agentImages/icon-time.svg";
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg";
import blackNaira from "@/assets/agentImages/icon-black-naira.svg";
import cancelIcon from "@/assets/agentImages/icon-red-cancel.svg";
// import BottomSuccess from "./BottomSuccess";

export default function ReviewWithdrawal() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Review Withdrawal
        </p>
      </div>

      <p className="text-[12px] leading-4 text-center mt-0.5">Step 2 of 2</p>

      {/* withdrawal info */}
      <div className="mt-7.5 rounded-lg border border-bg-accent">
        <div className="flex items-center justify-between gap-1 border-b border-bg-accent py-3 px-2">
          <p className="text-[14px] text-text-secondary">Amount to withdraw</p>
          <div className="flex items-center justify-center">
            <img src={blueNaira} alt="" className="w-4 h-4" />
            <p className="text-button-bg">3,000,000</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 py-3 px-2 border-b border-bg-accent">
          <p className="text-[14px] text-text-secondary">Withdrawal Fee</p>
          <div className="flex items-center justify-center">N.00 (Free)</div>
        </div>

        <div className="flex items-center justify-between gap-1 py-3 px-2">
          <p className="text-[14px] text-text-secondary">
            Total amount received
          </p>
          <div className="flex items-center justify-center">
            <img src={blackNaira} alt="" />
            <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
              3,000,000
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-[15px] mt-2 py-1 px-2 rounded-lg border border-bg-accent">
          <div className="w-7.5 h-7.5 bg-button-bg rounded-full flex items-center justify-center shrink-0">
            <img src={creditIcon} alt="" />
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="flex items-center justify-between w-full">
              <div className="space-y-0.5 flex items-center justify-center gap-1">
                <p className="text-[14px] line-clamp-1">Access Bank</p>
                <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                  ****4810
                </p>
              </div>
              {/* takes you to the select account */}
              <p className="text-[12px] leading-4 text-button-bg">Change</p>
            </div>

            {/* account name */}
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4 text-text-secondary">
                Account Name:
              </p>

              <p className="text-[12px]">Samuel James</p>
            </div>

            {/* account type */}
            <div className="flex items-center justify-between">
              <p className="text-[12px] leading-4 text-text-secondary">
                Account Type:
              </p>

              <p className="text-[12px]">Savings</p>
            </div>
          </div>
        </div>

        <div className="flex items-start w-67.5 mx-auto gap-2 p-2 bg-button-sec mt-4">
          <img src={timeIcon} alt="" />
          <p className="text-[12px] leading-4 text-text-secondary">
            Withdrawals are processed instantly and usually reflects in few
            minutes time.
          </p>
        </div>
      </div>

      <div className="mt-8">
        {/* takes you to the add account page */}
        <button className="h-[45px] bg-button-bg w-full flex items-center justify-center text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg">
          Continue
        </button>

        <button className="h-[45px] flex items-center gap-2 mx-auto px-2 mt-2">
          <img src={cancelIcon} alt="" />
          <p className="text-[14px] text-button-bg tracking-[1px] text-center">
            Cancel
          </p>
        </button>
      </div>

      {/* <BottomSuccess /> */}
    </div>
  );
}
