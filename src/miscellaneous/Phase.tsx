import { Link, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import gmailIcon from "@/assets/images/icon-gmail.svg"
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg"
import downloadIcon from "@/assets/images/icon-white-download.svg"
import whatsappIcon from "@/assets/images/icon-whatsapp.svg"
import checkIcon from "@/assets/images/icon-transaction-confirmed.svg"
import { Button } from "@/components/ui/button"

export default function Phase11() {
  const navigate = useNavigate()
  // TODO: this comes from the actual transaction record once the endpoint exists
  const transactionStatus: "pending" | "funds_released" = "funds_released"
  const canDownloadReceipt = transactionStatus === "funds_released"

  const users = [
    {
      title: "Buyer's Name:",
      text: "Victoria Ntekim",
    },
    {
      title: "Buyer's Contact:",
      text: "08167288115",
    },
    {
      title: "Agent's Name:",
      text: "Maryann Kikomu",
    },
    {
      title: "Date & Time:",
      text: "20th Oct, 2025 at 10 AM",
    },
    {
      title: "Transaction ID:",
      text: "TXN-89234567",
    },
  ]

  const transactionDetails = [
    {
      title: "Property Reference",
      text: "Ref: FH - 2862",
    },
    {
      title: "Total Amount Paid",
      text: "3,060,000",
    },

    {
      title: "Payment Method",
      text: "Card Payment",
    },
    {
      title: "Transaction Status",
      text:
        transactionStatus === "funds_released" ? "Funds Released" : "Pending",
    },
  ]

  const timelines = [
    {
      title: "Payment Made",
      date: "20th Oct, 2025",
    },
    {
      title: "Handover Scheduled",
      date: "22nd Oct, 2025",
    },
    {
      title: "Handover Completed",
      date: "28th Oct, 2025",
    },
    {
      title: "Funds Released",
      date: "30th Oct, 2025",
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
          Transaction Receipt
        </p>
      </div>

      <main className="mt-6">
        {/* property */}
        <div className="flex items-center gap-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div>
            <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
              Luxury 4 Bed-room Apartment
            </p>

            <div className="flex items-center text-[12px] leading-4 text-text-secondary">
              <p className="">Lekki Phase 1, Lagos.</p>
              <p className="flex items-center">
                <img src={nairaIcon} alt="" className="h-4 w-4" />
                <span>3M/yr</span>
              </p>
            </div>

            <p className="text-[12px] leading-4 text-text-secondary">
              Ref: FH - 2862
            </p>
          </div>
        </div>

        {/* parties details */}
        <div className="mt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-warm-section p-2">
              {users.map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-[12px] leading-4 text-text-primary">
                    {user.title}
                  </p>

                  <p className="text-[12px] leading-4 text-text-secondary">
                    {user.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-2 rounded-xl bg-bg-accent p-2">
              {transactionDetails.map((detail, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-[12px] leading-4 text-text-primary">
                    {detail.title}
                  </p>

                  {detail.title === "Total Amount Paid" ? (
                    <p className="flex items-center text-[12px] leading-4 text-text-secondary">
                      <img src={nairaIcon} alt="" />
                      <span>{detail.text}</span>
                    </p>
                  ) : (
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {detail.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* transaction timeline */}
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <p>Transaction timeline</p>

            <div className="flex flex-col gap-2">
              {timelines.map((timeline, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-button-bg">
                    <img src={checkIcon} alt="" className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-[14px]">{timeline.title}</p>
                    <p className="text-[12px] leading-4 text-text-secondary">
                      {timeline.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* share receipt */}
        <div className="mt-4 space-y-2">
          <p>Share Receipt</p>

          <div className="flex items-center justify-center gap-6 rounded-lg border border-bg-accent px-2 py-4">
            <div className="flex w-[85px] items-center gap-0.5 rounded-xl border border-bg-accent p-2">
              <img src={gmailIcon} alt="" />
              <p className="text-[12px] leading-4">Email</p>
            </div>

            <div className="flex w-[85px] items-center gap-0.5 rounded-xl border border-bg-accent p-2">
              <img src={whatsappIcon} alt="" />
              <p className="text-[12px] leading-4">Whatsapp</p>
            </div>
          </div>
        </div>

        {/* links */}
        <div className="mt-8 mb-10 space-y-3">
          <div className="flex flex-col items-center justify-center gap-3">
            <Button
              variant="app-primary"
              size="full"
              disabled={!canDownloadReceipt}
            >
              <img src={downloadIcon} alt="" />
              <p>Download Receipt(PDF)</p>
            </Button>

            <Button variant="app-secondary" size="full">
              <img src={homeIcon} alt="" />
              <p>Go to Homepage</p>
            </Button>
          </div>

          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Having issues with agent?&nbsp;
            <Link to="/dispute" className="text-button-bg">
              Open a dispute
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
