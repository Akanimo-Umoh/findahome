import { Link, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import iconInfo from "@/assets/images/icon-wallet-info.svg"
import iconNotification from "@/assets/images/icon-wallet-notification.svg"
import iconFund from "@/assets/images/icon-wallet-fund.svg"
import iconNaira from "@/assets/images/icon-wallet-naira.svg"
import ActiveTransactions from "./ActiveTransactions"
import RecentTransactions from "./RecentTransactions"

export default function Wallet() {
  const navigate = useNavigate()

  // const activeTransactions = [
  //   {
  //     img: propertyImg,
  //     title: "4 Bed-room Apartment, Lekki phase 1",
  //     refNum: "FH-PAY-2472-001",
  //     value: "3M/yr",
  //   },
  // ];

  return (
    <div className="px-6 font-ssPro text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          My Wallet
        </p>

        <div className="absolute right-0 flex items-center justify-center gap-4">
          <button>
            <img src={iconInfo} alt="info" />
          </button>
          <button>
            <img src={iconNotification} alt="notifications" />
          </button>
        </div>
      </div>

      {/* balance section */}
      <section className="mt-9.5 flex flex-col gap-4 rounded-lg bg-button-bg p-2">
        <div className="flex flex-col gap-1 text-bg-tertiary">
          <p className="">Available Balance</p>
          <p className="flex items-center font-raleway text-[18px] font-semibold tracking-[1px]">
            <img src={iconNaira} alt="" />
            <span>18,000</span>
          </p>
          <p className="text-[12px] leading-4">Funds securely held in Escrow</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <Link
            to="/fund-wallet"
            className="flex h-[45px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-button-disabled"
          >
            <img src={iconFund} alt="" />
            <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
              Fund Wallet
            </p>
          </Link>

          <p className="cursor-pointer text-[14px] text-bg-tertiary underline">
            See Disputes
          </p>
        </div>
      </section>

      {/* active escrow transactions */}
      <section className="mt-10">
        <ActiveTransactions />
      </section>

      {/* recent transactions */}
      <section className="mt-8 mb-10">
        <RecentTransactions />
      </section>
    </div>
  )
}
