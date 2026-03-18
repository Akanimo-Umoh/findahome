import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import propertyImg from "@/assets/images/property.jpg";
import nairaIcon from "@/assets/images/icon-chat-naira.svg";
import gmailIcon from "@/assets/images/icon-gmail.svg";
import homeIcon from "@/assets/images/icon-escrow-dashboard.svg";
import downloadIcon from "@/assets/images/icon-white-download.svg";
import whatsappIcon from "@/assets/images/icon-whatsapp.svg";
import PartiesInvolved from "./PartiesInvolved";
import Timeline from "./Timeline";

export default function TransactionReceipt() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Transaction Receipt
        </p>
      </div>

      <main className="mt-6">
        {/* property */}
        <div className="flex items-center gap-2">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 rounded-lg object-cover"
          />

          <div>
            <p className="font-raleway font-semibold text-[14px] tracking-[1px]">
              Luxury 4 Bed-room Apartment
            </p>

            <div className="text-[12px] leading-4 text-text-secondary flex items-center">
              <p className="">Lekki Phase 1, Lagos.</p>
              <p className="flex items-center">
                <img src={nairaIcon} alt="" className="w-4 h-4" />
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

          <div className="rounded-lg border border-bg-accent py-4 px-2 flex items-center justify-center gap-6">
            <div className="flex items-center border border-bg-accent rounded-xl p-2 gap-0.5 w-[85px]">
              <img src={gmailIcon} alt="" />
              <p className="text-[12px] leading-4">Email</p>
            </div>

            <div className="flex items-center border border-bg-accent rounded-xl p-2 gap-0.5 w-[85px]">
              <img src={whatsappIcon} alt="" />
              <p className="text-[12px] leading-4">Whatsapp</p>
            </div>
          </div>
        </div>

        {/* links */}
        <div className="mt-8 space-y-3 mb-10">
          <div className="flex flex-col items-center justify-center gap-3">
            <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-[45px] rounded-lg text-white flex items-center justify-center gap-2">
              <img src={downloadIcon} alt="" />
              <p>Download Receipt(PDF)</p>
            </button>

            <button className="font-raleway font-semibold text-[14px] tracking-[1px] bg-button-disabled border border-text-secondary h-[45px] w-full rounded-lg flex items-center justify-center gap-2">
              <img src={homeIcon} alt="" />
              <p>Go to Dashboard</p>
            </button>
          </div>

          <p className="text-[12px] leading-4 text-text-secondary text-center">
            Having issues with agent?&nbsp;
            <span className="text-button-bg">Open a dispute</span>
          </p>
        </div>
      </main>
    </div>
  );
}
