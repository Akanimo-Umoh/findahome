import propertyImg from "@/assets/images/property.jpg"
import nairaIcon from "@/assets/images/icon-naira.svg"
import warningIcon from "@/assets/images/icon-warning.svg"
import UploadFile from "@/components/open-dispute/UploadFile"
import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function OpenDispute() {
  return (
    <div className="mb-10 px-6 md:px-8 md:pt-6">
      {/* header */}
      <PageHeader title="Open Dispute" responsive />

      <main className="mt-6">
        {/* property details */}
        <div className="flex items-center gap-3 rounded-xl border border-bg-accent p-2">
          <img
            src={propertyImg}
            alt=""
            className="h-15 w-15 shrink-0 rounded-lg object-cover md:h-25 md:w-25"
          />

          <div className="space-y-2">
            <div className="space-y-1">
              <p className="line-clamp-2 font-raleway text-[12px] font-semibold tracking-[1px] md:text-[14px]">
                3 Bed-room Apartment, Lekki phase 1
              </p>

              <div className="flex items-center gap-1">
                <div className="flex w-fit items-center">
                  <img src={nairaIcon} alt="" className="h-4 w-4" />

                  <p className="font-raleway text-[14px] font-semibold tracking-[1px] text-button-bg md:text-[16px]">
                    3,000,000
                  </p>
                </div>

                <p className="flex-1 text-[12px] text-text-secondary md:text-[14px]">
                  Buyer: Victoria Ntekim
                </p>
              </div>
            </div>

            <div className="space-y-1 text-[12px] leading-4 text-text-secondary md:text-[14px] md:leading-5.25">
              {/* note, there should be a tenary operation here just in case no payment has been made or the person just wants to make a dispute without and have not used the platform for any transaction yet */}
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

          <p className="text-[12px] leading-4 md:text-[14px]">
            Only open a dispute if you cannot resolve the issue directly with
            the agent
          </p>
        </div>

        {/* dispute form */}
        <form action="" className="mt-6">
          <div className="flex flex-col justify-center gap-2">
            <label className="w-fit text-[14px] md:text-[16px]">
              Issue Category
            </label>

            <Select>
              <SelectTrigger className="select-issue w-full cursor-pointer rounded-lg border border-button-disabled bg-button-disabled px-2">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="inspection">Inspection</SelectItem>
                <SelectItem value="handover">Handover</SelectItem>
                <SelectItem value="property_condition">
                  Property Condition
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* description */}
          <div className="mt-4 flex flex-col justify-center gap-2">
            <label
              htmlFor="description"
              className="w-fit text-[14px] md:text-[16px]"
            >
              Description
            </label>

            <div className="rounded-lg bg-button-disabled px-2 py-2">
              <textarea
                name="description"
                id="description"
                rows={4}
                placeholder="Provide detailed information about the issue."
                className="w-full bg-transparent text-[14px] outline-none"
              />
            </div>
          </div>

          {/* upload image */}
          <div className="mt-4">
            <UploadFile />
          </div>

          {/* submit button */}
          <div className="mt-8 space-y-2">
            <Button variant="app-primary" size="full">
              Submit Dispute
            </Button>

            <p className="text-center text-[12px] leading-4 text-text-secondary lg:text-[14px] lg:leading-5.25">
              Our team will review your dispute and respond within 2-3 business
              days.
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
