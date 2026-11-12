import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import apartmentImg from "@/assets/images/img-apartment.png"
import checkIcon from "@/assets/agentImages/icon-check.svg"
import downloadIcon from "@/assets/agentImages/icon-download-receipt.svg"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import PaymentSummary from "./PaymentSummary"
import Timeline from "./Timeline"

export default function PropertyTransactionDetails() {
  const navigate = useNavigate()

  return (
    // transaction details for inspection
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Transaction Details
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1 rounded-lg border border-bg-accent bg-[#149D1833] px-3 py-2">
        <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
          <img src={checkIcon} alt="" />
        </div>
        <div className="">
          <p className="text-[14px]">Payment Released</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            The buyer confirmed the handover. Escrow funds have been released to
            your wallet.
          </p>
        </div>
      </div>

      <section className="mt-6">
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={apartmentImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src={blueNairaIcon} alt="" className="h-4 w-4" />
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    3,000,000
                  </p>
                </div>
                <p className="line-clamp-1 flex-1 text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="w-fit rounded-2xl bg-[#149D18] px-2 py-1 text-[12px] leading-4 text-white">
                Completed
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Ref ID: FH-TRX-002834
              </p>
              <p className="text-[12px] leading-4 text-text-secondary">
                Last updated: 2hrs ago
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Timeline />
        </div>

        <div className="mt-6">
          <PaymentSummary />
        </div>

        <div className="mt-6">
          <div className="mt-8 space-y-3">
            <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white hover:bg-button-hover">
              View Wallet
            </button>

            <button className="h-[45px] w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
              Go to Dashboard
            </button>
          </div>
        </div>

        <div className="mx-auto mt-3 flex w-fit items-center justify-center gap-1">
          <img src={downloadIcon} alt="" />
          <p className="text-[12px] leading-4 text-button-bg">
            Download Receipt
          </p>
        </div>
      </section>
    </div>
  )
}
