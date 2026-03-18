import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import disputesIcon from "@/assets/agentImages/icon-disputes.svg";
import blackNairaIcon from "@/assets/agentImages/icon-black-naira.svg";
import Activities from "./Activities";

export default function EscrowWallet() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Escrow Wallet
        </p>
      </div>

      {/* available balance */}
      <div className="bg-[#F8B400] p-3 rounded-2xl space-y-4 mt-[25px]">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-[14px]">Available Balance</p>
            <div className="flex items-center">
              <img src={blackNairaIcon} alt="" />
              <p className="font-raleway font-semibold text-[18px] tracking-[1px]">
                500,000
              </p>
            </div>
            <p className="text-[12px] leading-4">
              Funds are available for withdrawal
            </p>
          </div>

          <p className="text-[14px] text-button-bg">See Wallet Balance</p>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="h-[45px] rounded-lg bg-bg-tertiary flex items-center justify-center w-full gap-2">
            <img src={disputesIcon} alt="" />
            <p className="text-[14px] font-raleway font-semibold tracking-[1px] text-button-bg">
              See Disputes
            </p>
          </button>
        </div>
      </div>

      {/* Recent Activities/Notifications */}
      <section className="mt-8.5">
        <Activities />
      </section>
    </div>
  );
}
