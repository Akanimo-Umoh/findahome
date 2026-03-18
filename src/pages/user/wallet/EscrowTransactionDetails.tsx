import { useNavigate } from "react-router-dom";
import propertyImg from "@/assets/images/property.jpg";
// import greyNaira from "@/assets/images/icon-chat-naira.svg";
import goBack from "@/assets/images/icon-back.svg";
import blueNaira from "@/assets/images/icon-naira.svg";
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg";
import privacyIcon from "@/assets/images/icon-escrow-privacy.svg";

export default function EscrowTransactionsDetails() {
  const navigate = useNavigate();

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
  ];

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Escrow Transaction Details
        </p>
      </div>

      <main className="mt-6">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-bg-accent">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 object-cover rounded-lg"
          />

          <div className="flex flex-col justify-center gap-1 w-full">
            <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-1">
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
            <p className="text-[12px] leading-4 bg-[#F39C12] py-1 px-2 rounded-2xl w-fit">
              Inspection Pending
            </p>
            {/* payment secured would show if the user made payment into the escrow system */}
            {/* <p className="text-[12px] leading-4 bg-[#149D18] py-1 px-2 rounded-2xl w-fit">
              Payment Secured
            </p> */}
          </div>
        </div>

        {/* escrow summary */}
        <div className="mt-4">
          <div>
            <p>Escrow Summary</p>

            <div className="rounded-xl p-2 flex flex-col gap-3 bg-bg-accent border border-bg-accent">
              {details.map((detail, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-[12px] leading-4">{detail.title}</p>

                  <p
                    className={`text-[12px] font-semibold ${detail.title === "Total Amount Held:" ? "flex items-center text-[14px] font-raleway tracking-[1px] font-semibold text-button-bg" : ""}`}
                  >
                    {detail.title === "Total Amount Held:" ? (
                      <>
                        <img src={blueNaira} alt="" className="w-4 h-4" />
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
              <div className="flex flex-col justify-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">Payment initiated</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Funds held in Escrow
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-button-bg flex items-center justify-center">
                    <img src={confirmedIcon} alt="" />
                  </div>
                  <p className="text-[12px] font-semibold">
                    Inspection Scheduled
                  </p>
                </div>

                {/* if it is not completed */}
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Inspection Completed
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-bg-accent flex items-center justify-center">
                    {/* <img src={confirmedIcon} alt="" /> */}
                  </div>
                  <p className="text-[12px] font-semibold text-text-secondary">
                    Funds released
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* confirm inspection is completed */}
          <div className="mt-4">
            <div className="space-y-3">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] text-white h-11.25 rounded-lg button-style w-full flex items-center justify-center">
                Confirm Inspection Completed
              </button>

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] h-11.25 rounded-lg w-full flex items-center justify-center border border-text-secondary bg-button-disabled">
                View chat with Agent
              </button>
            </div>

            <div className="flex items-center justify-center gap-1 mt-3">
              <img src={privacyIcon} alt="" />
              <p className="text-[12px] leading-4 text-text-secondary">
                Funds are securely held by FindaHome until inspection is
                confirmed by both parties
              </p>
            </div>

            <p className="text-[12px] leading-4 text-text-secondary mt-3 flex items-center justify-center mb-10">
              Having issues with agent?&nbsp;
              <span className="text-button-bg">Open a dispute</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
