import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg";
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg";
import creditIcon from "@/assets/agentImages/icon-white-credit-card.svg";

export default function WithdrawFunds() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Withdraw Funds
        </p>
      </div>

      <p className="text-[12px] leading-4 text-center mt-0.5">Step 1 of 2</p>

      <div className="flex flex-col gap-1 rounded-lg border border-bg-accent py-3 px-2 mt-[17px]">
        <p>Available Balance</p>
        <div className="flex items-center">
          <img src={blueNaira} alt="" />
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-button-bg">
            3,000,000
          </p>
        </div>
        <p className="text-[12px] leading-4 text-text-secondary">
          You can only withdraw from your available balance
        </p>
      </div>

      <div className="mt-6.5">
        <div>
          <div>
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-[14px]">
                Enter Amount
              </label>

              <div className="relative flex items-center justify-center">
                <img src={greyNaira} alt="" className="absolute left-2" />

                <input
                  type="text"
                  className="h-[45px] mt-0.5  rounded-lg border-2 border-bg-accent bg-button-sec w-full outline-none pr-2 pl-7 text-[14px]"
                  placeholder="0.00"
                />
              </div>
            </div>
            <p className="text-[12px] leading-4 text-text-secondary mt-1">
              Minimum withdrawal amount: N1,000
            </p>
          </div>

          <div className="mt-4">
            <p className="text-[14px]">Withdraw to</p>

            <div className="flex items-center justify-between gap-4 mt-2 py-3 px-2 rounded-lg border border-bg-accent">
              <div className="flex items-center gap-4">
                <div className="w-7.5 h-7.5 bg-button-bg rounded-full flex items-center justify-center shrink-0">
                  <img src={creditIcon} alt="" />
                </div>

                <div className="space-y-0.5">
                  <p className="text-[14px] line-clamp-1">Access Bank</p>
                  <p className="text-[12px] leading-4 text-text-secondary line-clamp-1">
                    ****4810
                  </p>
                </div>
              </div>

              {/* takes you to the select account */}
              <p className="text-[12px] leading-4 text-button-bg">Change</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {/* takes you to the add account page */}
          <button className="h-[45px] bg-button-bg w-full flex items-center justify-center text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg">
            Continue
          </button>

          <p className="text-[12px] leading-4 text-text-secondary mt-2 text-center">
            Withdrawal may take a few minutes to reflect.
          </p>
        </div>
      </div>
    </div>
  );
}
