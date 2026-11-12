import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/images/icon-naira.svg"
import walletIcon from "@/assets/images/icon-pay-inspection-fee.svg"
import blackNaira from "@/assets/images/icon-black-naira.svg"
import iconTransfer from "@/assets/images/icon-wallet-via-bank-transfer.svg"

export default function FundWallet() {
  const navigate = useNavigate()

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
  ]

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Fund Wallet
        </p>
      </div>

      {/* current balance */}
      <section className="mt-7.5">
        <div className="flex flex-col justify-center gap-2 rounded-xl border border-bg-accent px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Current balance</p>
              <p className="flex items-center font-raleway text-[18px] font-semibold tracking-[1px] text-button-bg">
                <img src={blueNaira} alt="" />
                <span>12,000</span>
              </p>
              <p className="text-[12px] leading-4">Wallet ID: WAL-0LA4K</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-accent">
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
          <div className="relative mt-2 flex items-center justify-center">
            <img src={blackNaira} alt="" className="absolute left-0 h-6 w-6" />
            <input
              type="text"
              name=""
              id="amount"
              className="w-full border-b pr-6 pl-7 outline-none"
            />
          </div>
        </div>

        {/* amounts */}
        <div className="mt-6 flex items-center justify-between">
          {nairaAmount.map((amount, index) => (
            <div key={index} className="flex items-center">
              <img src={blueNaira} alt="" className="h-4 w-4" />
              <span className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
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
              className="flex items-center gap-4 rounded-xl border border-button-bg bg-bg-accent px-2 py-3"
            >
              <input
                type="radio"
                name="paymentMethod"
                id="payViaCard"
                className="h-5 w-5"
              />

              <div className="flex items-center gap-2">
                <img src={walletIcon} alt="" className="h-6 w-6" />
                <span className="text-text-secondary">Pay with Card</span>
              </div>
            </label>

            <label
              htmlFor="payViaTransfer"
              className="flex items-center gap-4 rounded-xl border border-button-bg bg-bg-accent px-2 py-3"
            >
              <input
                type="radio"
                name="paymentMethod"
                id="payViaTransfer"
                className="h-5 w-5"
              />

              <div className="flex items-center gap-2">
                <img src={iconTransfer} alt="" className="h-6 w-6" />
                <span className="text-text-secondary">
                  Pay with via bank transfer
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 mb-10 flex flex-col items-center justify-center gap-1">
          <button className="button-style flex h-[45px] w-full items-center justify-center rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
            Proceed to pay N5000
          </button>

          <p className="text-[12px] leading-4 text-text-secondary">
            By proceeding, you agree to FindaHome's escrow policy
          </p>
        </div>
      </section>
    </div>
  )
}
