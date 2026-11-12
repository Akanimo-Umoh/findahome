import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-naira.svg"
import warningIcon from "@/assets/images/icon-warning.svg"
import UploadFile from "./UploadFile"

export default function OpenDispute() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Open Dispute
        </p>
      </div>

      <main className="mt-6">
        {/* property details */}
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 rounded-lg object-cover"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>
              <div className="flex items-center gap-1">
                <div className="flex w-fit items-center">
                  <img src={nairaIcon} alt="" className="h-4 w-4" />
                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg">
                    3,000,000
                  </p>
                </div>
                <p className="flex-1 text-[12px] leading-4 text-text-secondary">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1 text-[12px] leading-4 text-text-secondary">
              <p className="w-fit rounded-2xl bg-[#F39C12] px-2 py-1 text-bg-tertiary">
                In Escrow
              </p>
              <p className="">Ref ID: FH-TRX-002834</p>
              <p className="">Last updated: 2hrs ago</p>
            </div>
          </div>
        </div>

        {/* notice */}
        <div className="mt-8 flex items-center gap-2">
          <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg bg-[#D0272733]">
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
            <label htmlFor="issue" className="w-fit text-[14px]">
              Issue Category
            </label>

            <input
              type="text"
              id="issue"
              placeholder="Select Category"
              className="h-10 w-full rounded-lg border border-button-disabled bg-button-disabled px-2"
            />
          </div>

          {/* description */}
          <div className="mt-4 flex flex-col justify-center gap-2">
            <label htmlFor="description" className="w-fit text-[14px]">
              Description
            </label>

            <div className="h-[133px] rounded-lg bg-button-disabled px-2.5 py-5.5">
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
          <div className="mt-8 space-y-2">
            <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white disabled:border disabled:border-text-secondary disabled:text-text-primary">
              Submit Dispute
            </button>

            <p className="text-center text-[12px] leading-4 text-text-secondary">
              Our team will review your dispute and respond within 2-3 business
              days.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
