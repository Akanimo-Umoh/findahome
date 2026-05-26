import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import disputesIcon from "@/assets/agentImages/icon-disputes.svg"
import blackNairaIcon from "@/assets/agentImages/icon-black-naira.svg"
import Activities from "./Activities"

export default function EscrowWallet() {
  const navigate = useNavigate()

  return (
    <div className="px-6 font-ssPro text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Escrow Wallet
        </p>
      </div>

      {/* available balance */}
      <div className="mt-[25px] space-y-4 rounded-2xl bg-[#F8B400] p-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-[14px]">Available Balance</p>
            <div className="flex items-center">
              <img src={blackNairaIcon} alt="" />
              <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
                500,000
              </p>
            </div>
            <p className="text-[12px] leading-4">
              Funds are available for withdrawal
            </p>
          </div>

          <p className="text-[14px] text-button-bg">See Wallet Balance</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button className="flex h-[45px] w-full items-center justify-center gap-2 rounded-lg bg-bg-tertiary">
            <img src={disputesIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
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
  )
}
