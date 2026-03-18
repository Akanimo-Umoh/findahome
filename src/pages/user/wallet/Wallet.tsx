import { Link, useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import iconInfo from "@/assets/images/icon-wallet-info.svg";
import iconNotification from "@/assets/images/icon-wallet-notification.svg";
import iconFund from "@/assets/images/icon-wallet-fund.svg";
import iconNaira from "@/assets/images/icon-wallet-naira.svg";
import ActiveTransactions from "./ActiveTransactions";
import RecentTransactions from "./RecentTransactions";

export default function Wallet() {
  const navigate = useNavigate();

  // const activeTransactions = [
  //   {
  //     img: propertyImg,
  //     title: "4 Bed-room Apartment, Lekki phase 1",
  //     refNum: "FH-PAY-2472-001",
  //     value: "3M/yr",
  //   },
  // ];

  return (
    <div className="font-ssPro text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          My Wallet
        </p>

        <div className="flex items-center justify-center gap-4 absolute right-0">
          <button>
            <img src={iconInfo} alt="info" />
          </button>
          <button>
            <img src={iconNotification} alt="notifications" />
          </button>
        </div>
      </div>

      {/* balance section */}
      <section className="mt-9.5 rounded-lg p-2 flex flex-col gap-4 bg-button-bg">
        <div className="text-bg-tertiary flex flex-col gap-1">
          <p className="">Available Balance</p>
          <p className="flex items-center font-raleway font-semibold text-[18px] tracking-[1px]">
            <img src={iconNaira} alt="" />
            <span>18,000</span>
          </p>
          <p className="text-[12px] leading-4">Funds securely held in Escrow</p>
        </div>

        <div className="flex flex-col gap-3 justify-center items-center">
          <Link
            to="/fund-wallet"
            className="flex items-center justify-center rounded-lg bg-button-disabled h-[45px] w-full cursor-pointer gap-2"
          >
            <img src={iconFund} alt="" />
            <p className="text-button-bg font-raleway font-semibold tracking-[1px] text-[14px]">
              Fund Wallet
            </p>
          </Link>

          <p className="text-[14px] text-bg-tertiary underline cursor-pointer">
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
  );
}
