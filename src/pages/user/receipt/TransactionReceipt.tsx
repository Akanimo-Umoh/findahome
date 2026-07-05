import { Link, useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-chat-naira.svg"
import gmailIcon from "@/assets/images/icon-gmail.svg"
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg"
import downloadIcon from "@/assets/images/icon-white-download.svg"
import whatsappIcon from "@/assets/images/icon-whatsapp.svg"
import PartiesInvolved from "./PartiesInvolved"
import Timeline from "./Timeline"
import { Button } from "@/components/ui/button"

export default function TransactionReceipt() {
  const navigate = useNavigate()

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
          <PartiesInvolved />
        </div>

        {/* transaction timeline */}
        <div className="mt-4">
          <Timeline />
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
            <Button variant="app-primary" size="full">
              <img src={downloadIcon} alt="" />
              <p>Download Receipt(PDF)</p>
            </Button>

            <Button variant="app-secondary" size="full">
              <img src={homeIcon} alt="" />
              <p>Go to Dashboard</p>
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
