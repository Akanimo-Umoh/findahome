import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg";
import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg";
import Activities from "./Activities";
// import NoWalletActivity from "./NoWalletActivity";

export default function Wallet() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Wallet
        </p>
      </div>

      {/* available balance */}
      <div className="bg-button-bg p-3 rounded-2xl space-y-4 mt-[25px]">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-[14px] text-bg-accent">Available Balance</p>
            <div className="flex items-center">
              <img src={whiteNairaIcon} alt="" />
              <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-bg-tertiary">
                3,000,000
              </p>
            </div>
            <p className="text-[12px] leading-4 text-bg-accent">
              Funds are available for withdrawal
            </p>
          </div>

          <p className="text-[14px] text-[#F8B400]">See Escrow Wallet</p>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="h-[45px] rounded-lg bg-bg-tertiary flex items-center justify-center w-full gap-2">
            <img src={withdrawIcon} alt="" />
            <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg">
              Withdraw Funds
            </p>
          </button>

          <p className="text-[14px] text-bg-tertiary underline cursor-pointer">
            Add/manage bank account
          </p>
        </div>
      </div>

      {/* Recent Activities/Notifications */}
      <section className="mt-8.5">
        <Activities />
      </section>

      {/* no wallet activity */}
      {/* <section className="mt-1">
        <NoWalletActivity />
      </section> */}
    </div>
  );
}
