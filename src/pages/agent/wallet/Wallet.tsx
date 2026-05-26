import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import withdrawIcon from "@/assets/agentImages/icon-withdraw.svg"
import whiteNairaIcon from "@/assets/agentImages/icon-white-naira.svg"
import Activities from "./Activities"
// import NoWalletActivity from "./NoWalletActivity";

export default function Wallet() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 font-ssPro text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          My Wallet
        </p>
      </div>

      {/* available balance */}
      <div className="mt-[25px] space-y-4 rounded-2xl bg-button-bg p-3">
        <div className="flex justify-between">
          <div className="space-y-2">
            <p className="text-[14px] text-bg-accent">Available Balance</p>
            <div className="flex items-center">
              <img src={whiteNairaIcon} alt="" />
              <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-bg-tertiary">
                3,000,000
              </p>
            </div>
            <p className="text-[12px] leading-4 text-bg-accent">
              Funds are available for withdrawal
            </p>
          </div>

          <p className="text-[14px] text-[#F8B400]">See Escrow Wallet</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <button className="flex h-[45px] w-full items-center justify-center gap-2 rounded-lg bg-bg-tertiary">
            <img src={withdrawIcon} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              Withdraw Funds
            </p>
          </button>

          <p className="cursor-pointer text-[14px] text-bg-tertiary underline">
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
  )
}
