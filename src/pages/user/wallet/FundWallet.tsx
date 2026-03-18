import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import blueNaira from "@/assets/images/icon-naira.svg";
import walletIcon from "@/assets/images/icon-pay-inspection-fee.svg";
import blackNaira from "@/assets/images/icon-black-naira.svg";
import iconTransfer from "@/assets/images/icon-wallet-via-bank-transfer.svg";

export default function FundWallet() {
  const navigate = useNavigate();

  const nairaAmount = [
    {
      value: "5000",
    },
    {
      value: "10,000",
    },
    {
      value: "15,000",
    },
    {
      value: "20,000",
    },
  ];

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Fund Wallet
        </p>
      </div>

      {/* current balance */}
      <section className="mt-7.5">
        <div className="flex flex-col justify-center gap-2 border border-bg-accent rounded-xl px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Current balance</p>
              <p className="text-[18px] tracking-[1px] font-raleway font-semibold text-button-bg flex items-center">
                <img src={blueNaira} alt="" />
                <span>12,000</span>
              </p>
              <p className="text-[12px] leading-4">Wallet ID: WAL-0LA4K</p>
            </div>

            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-accent">
              <img src={walletIcon} alt="" />
            </div>
          </div>

          <p className="text-[12px] leading-4 text-text-secondary">
            Funds are securely stored and can only be used for verified property
            transactions.
          </p>
        </div>

        {/* amount */}
        <div className="mt-4">
          <label htmlFor="amount" className="text-[14px]">
            Enter Amount
          </label>
          <div className="flex items-center justify-center relative mt-2">
            <img src={blackNaira} alt="" className="absolute left-0 w-6 h-6" />
            <input
              type="text"
              name=""
              id="amount"
              className="outline-none border-b w-full pl-7 pr-6"
            />
          </div>
        </div>

        {/* amounts */}
        <div className="mt-6 flex justify-between items-center">
          {nairaAmount.map((amount, index) => (
            <div key={index} className="flex items-center">
              <img src={blueNaira} alt="" className="w-4 h-4" />
              <span className="text-[14px] tracking-[1px] font-raleway font-semibold text-button-bg">
                {amount.value}
              </span>
            </div>
          ))}
        </div>

        {/* payment method */}
        <div className="mt-6 space-y-4">
          <p>Select a payment method</p>

          <div className="flex flex-col gap-4">
            <label
              htmlFor="payViaCard"
              className="px-2 py-3 bg-bg-accent border border-button-bg rounded-xl flex gap-4 items-center"
            >
              <input
                type="radio"
                name="paymentMethod"
                id="payViaCard"
                className="w-5 h-5"
              />

              <div className="flex items-center gap-2">
                <img src={walletIcon} alt="" className="w-6 h-6" />
                <span className="text-text-secondary">Pay with Card</span>
              </div>
            </label>

            <label
              htmlFor="payViaTransfer"
              className="px-2 py-3 bg-bg-accent border border-button-bg rounded-xl flex gap-4 items-center"
            >
              <input
                type="radio"
                name="paymentMethod"
                id="payViaTransfer"
                className="w-5 h-5"
              />

              <div className="flex items-center gap-2">
                <img src={iconTransfer} alt="" className="w-6 h-6" />
                <span className="text-text-secondary">
                  Pay with via bank transfer
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 items-center justify-center mb-10">
          <button className="font-raleway font-semibold text-white text-[14px] tracking-[1px] h-[45px] rounded-lg button-style w-full flex items-center justify-center">
            Proceed to pay N5000
          </button>

          <p className="text-[12px] leading-4 text-text-secondary">
            By proceeding, you agree to FindaHome's escrow policy
          </p>
        </div>
      </section>
    </div>
  );
}
