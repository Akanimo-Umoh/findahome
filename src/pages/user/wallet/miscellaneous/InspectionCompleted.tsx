import { useNavigate } from "react-router-dom"
import propertyImg from "@/assets/images/property.jpg"
// import greyNaira from "@/assets/images/icon-chat-naira.svg";
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/images/icon-naira.svg"
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg"
// import privacyIcon from "@/assets/images/icon-escrow-privacy.svg";

export default function EscrowTransactionsDetails() {
  const navigate = useNavigate()

  const details = [
    {
      title: "Escrow ID:",
      summary: "FH-2458",
    },
    {
      title: "Total Amount Held:",
      summary: "5000",
    },
    {
      title: "Transaction Type:",
      summary: "Inspection fee",
    },
    {
      title: "Payment source:",
      summary: "Wallet Balance",
    },
    {
      title: "Date Funded",
      summary: "Oct 15, 2025",
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
          Escrow Transaction Details
        </p>
      </div>

      <main className="mt-6">
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="flex w-full flex-col justify-center gap-1">
            <p className="line-clamp-1 font-raleway text-[12px] font-semibold tracking-[1px]">
              4 Bed-room Apartment, Lekki phase 1
            </p>
            {/* <div className="text-[12px] leading-4 text-text-secondary flex items-center justify-between">
            <p className="">FH-PAY-2472-001</p>
            <p className="flex items-center">
              <img src={greyNaira} alt="" />
              <span>3M/yr</span>
            </p>
          </div> */}
            <p className="text-[12px] leading-4 text-text-secondary">
              Listed by Maryann Kikomu{" "}
              <span className="text-button-bg">(Verified)</span>
            </p>
            <p className="w-fit rounded-2xl border border-[#4F95FF] bg-white px-2 py-1 text-[12px] leading-4">
              Inspection Completed
            </p>
          </div>
        </div>

        {/* escrow summary */}
        <div className="mt-4">
          <div>
            <p>Escrow Summary</p>

            <div className="flex flex-col gap-3 rounded-xl border border-bg-accent bg-bg-accent p-2">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-[12px] leading-4">{detail.title}</p>

                  <p
                    className={`text-[12px] font-semibold ${detail.title === "Total Amount Held:" ? "flex items-center font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg" : ""}`}
                  >
                    {detail.title === "Total Amount Held:" ? (
                      <>
                        <img src={blueNaira} alt="" className="h-4 w-4" />
                        <span>{detail.summary}</span>
                      </>
                    ) : (
                      <>{detail.summary}</>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* transaction in progress */}
          <div className="mt-4">
            <p>Transaction in progress</p>

            <div className="mt-2">
              {/* progress bar */}
              <div>progress bar</div>

              {/* transaction status */}
              <div className="mt-3 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Payment initiated</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Funds held in Escrow
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Scheduled
                  </p>
                </div>

                {/* if it is not completed */}
                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Completed
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Funds released</p>
                </div>
              </div>
            </div>
          </div>

          {/* confirm inspection is completed */}
          <div className="mt-4">
            <div className="space-y-3">
              <button className="button-style flex h-11.25 w-full items-center justify-center rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
                Purchase property
              </button>

              <button className="flex h-11.25 w-full items-center justify-center rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
                View Property Details
              </button>
            </div>

            <p className="mt-3 mb-10 flex items-center justify-center text-[12px] leading-4 text-text-secondary">
              Having issues with agent?&nbsp;
              <span className="text-button-bg">Open a dispute</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
