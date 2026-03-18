import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import propertyImg from "@/assets/images/property.jpg";
import nairaIcon from "@/assets/images/icon-naira.svg";
import warningIcon from "@/assets/images/icon-warning.svg";
import UploadFile from "./UploadFile";

export default function OpenDispute() {
  const navigate = useNavigate();

  return (
    <div className="text-text-primary mb-10 px-6">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Open Dispute
        </p>
      </div>

      <main className="mt-6">
        {/* property details */}
        <div className="flex items-center rounded-xl border border-bg-accent p-2 gap-3">
          <img
            src={propertyImg}
            alt=""
            className="w-15 h-15 object-cover rounded-lg"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="font-raleway font-semibold text-[12px] tracking-[1px] line-clamp-2">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-1">
                <div className="flex items-center w-fit">
                  <img src={nairaIcon} alt="" className="w-4 h-4" />
                  <p className="text-button-bg font-raleway font-semibold tracking-[1px] text-[14px]">
                    3,000,000
                  </p>
                </div>
                <p className="text-[12px] leading-4 text-text-secondary flex-1">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="text-[12px] leading-4 text-text-secondary space-y-1">
              <p className="text-bg-tertiary bg-[#F39C12] rounded-2xl py-1 px-2 w-fit">
                In Escrow
              </p>
              <p className="">Ref ID: FH-TRX-002834</p>
              <p className="">Last updated: 2hrs ago</p>
            </div>
          </div>
        </div>

        {/* notice */}
        <div className="mt-8 flex items-center gap-2">
          <div className="w-7.5 h-7.5 bg-[#D0272733] rounded-lg flex items-center justify-center shrink-0">
            <img src={warningIcon} alt="" />
          </div>
          <p className="text-[12px] leading-4">
            Only open a dispute if you cannot resolve the issue directly with
            the buyer
          </p>
        </div>

        {/* dispute form */}
        <form action="" className="mt-6">
          <div className="flex flex-col justify-center gap-2">
            <label htmlFor="issue" className="text-[14px] w-fit">
              Issue Category
            </label>

            <input
              type="text"
              id="issue"
              placeholder="Select Category"
              className="w-full bg-button-disabled h-10 px-2 rounded-lg border border-button-disabled"
            />
          </div>

          {/* description */}
          <div className="flex flex-col justify-center gap-2 mt-4">
            <label htmlFor="description" className="text-[14px] w-fit">
              Description
            </label>

            <div className="bg-button-disabled py-5.5 px-2.5 rounded-lg h-[133px]">
              <textarea
                name="description"
                id="description"
                rows={4}
                placeholder="Provide detailed information about the issue."
                className="w-full text-[14px] outline-none"
              />
            </div>
          </div>

          {/* upload image */}
          <div className="mt-4">
            <UploadFile />
          </div>

          {/* submit button */}
          <div className="space-y-2 mt-8">
            <button className="rounded-lg button-style w-full h-[45px] text-white disabled:text-text-primary font-raleway font-semibold text-[14px] tracking-[1px] disabled:border disabled:border-text-secondary">
              Submit Dispute
            </button>

            <p className="text-[12px] leading-4 text-text-secondary text-center">
              Our team will review your dispute and respond within 2-3 business
              days.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
