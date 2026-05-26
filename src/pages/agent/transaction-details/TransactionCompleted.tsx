import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import apartmentImg from "@/assets/images/img-apartment.png"
import blueNairaIcon from "@/assets/agentImages/icon-blue-naira.svg"
import PaymentSummary from "./PaymentSummary"
import Timeline from "./Timeline"
import checkIcon from "@/assets/agentImages/icon-check.svg"
import downloadIcon from "@/assets/agentImages/icon-download-receipt.svg"

export default function TransactionCompleted() {
  const navigate = useNavigate()

  return (
    // transaction details for inspection completed, this is when all every thing has been checked
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

      <div className="mt-6 flex flex-col items-center justify-center gap-1 rounded-lg border border-bg-accent bg-[#149D1833] px-3 py-4">
        <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#149D18]">
          <img src={checkIcon} alt="" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-[14px]">Inspection Schedule Confirmed.</p>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            The buyer confirmed the inspection. Escrow funds have been released
            to your wallet.
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

        {/* payment summary */}
        <div className="mt-6">
          <PaymentSummary />
        </div>

        <div className="mt-6">
          <Timeline stage="completed" />
        </div>

        <div>
          <div>
            <button className="button-style mt-8 h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              View Wallet
            </button>

            <button className="mt-3 h-[45px] w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
              Go to Dashboard
            </button>
          </div>

          <div className="mx-auto mt-2 flex w-fit items-center justify-center gap-1">
            <img src={downloadIcon} alt="" />
            <p className="text-[12px] leading-4 text-button-bg">
              Download Receipt
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
