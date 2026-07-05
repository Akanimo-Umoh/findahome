import { Link, useNavigate } from "react-router-dom"
import propertyImg from "@/assets/images/property.jpg"
import blackNaira from "@/assets/images/icon-black-naira.svg"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/images/icon-naira.svg"
import confirmedIcon from "@/assets/images/icon-transaction-confirmed.svg"
import infoIcon from "@/assets/images/icon-grey-info.svg"
import privacyIcon from "@/assets/images/icon-escrow-privacy.svg"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function Phase5() {
  const navigate = useNavigate()

  const steps = [
    "Payment initiated",
    "Funds held in Escrow",
    "Inspection Scheduled",
    "Inspection Completed",
    "Funds released",
  ]

  const completedSteps = steps.length
  const progressValue = (completedSteps / steps.length) * 100

  return (
    <div className="px-6 text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Transaction Details
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

            <p className="text-[12px] leading-4 text-text-secondary">
              Listed by Maryann Kikomu{" "}
              <span className="text-button-bg">(Verified)</span>
            </p>
            <p className="w-fit rounded-2xl bg-success px-2 py-1 text-[12px] leading-4 text-bg-tertiary">
              Inspection Completed
            </p>
          </div>
        </div>

        {/* escrow summary */}
        <div className="mt-6">
          <div>
            <p>Transaction Summary</p>

            <div className="mt-2 flex flex-col gap-3 rounded-xl border border-bg-accent bg-bg-accent p-2">
              {/* escrow id */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4">Escrow ID:</p>

                <p className="text-[12px] font-semibold">FH-2458</p>
              </div>

              {/* property amount */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4">Property Amount</p>

                <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
                  <img src={blueNaira} alt="" className="h-4 w-4" />
                  <span className="text-button-bg">5000</span>
                </p>
              </div>

              {/* transaction type */}
              <div className="flex items-center justify-between">
                <p className="flex items-center text-[12px] leading-4">
                  <span>Transaction type</span>
                  <img src={infoIcon} alt="" />
                </p>

                <p className="font-raleway text-[14px] font-semibold tracking-[1px]">
                  Inspection fee
                </p>
              </div>

              {/* date */}
              <div className="flex items-center justify-between">
                <p className="text-[12px] leading-4">Date:</p>

                <p className="text-[12px] font-semibold">Oct 15, 2025</p>
              </div>

              {/* total fee */}
              <div className="flex items-center justify-between">
                <p className="font-raleway text-[14px] leading-4 font-semibold tracking-[1px]">
                  Total Fee
                </p>

                <p className="flex items-center font-raleway text-[14px] font-semibold tracking-[1px]">
                  <img src={blackNaira} alt="" className="h-4 w-4" />
                  <span>5000</span>
                </p>
              </div>
            </div>
          </div>

          {/* transaction in progress */}
          <div className="mt-4">
            <p>Transaction in progress</p>

            <div className="mt-2">
              {/* progress bar */}
              <Progress
                value={progressValue}
                className="h-2 w-full bg-bg-accent [&>div]:bg-button-bg"
              />

              {/* transaction status */}
              <div className="mt-3 flex flex-col justify-center gap-2">
                {steps.map((step) => (
                  <div key={step} className="flex items-center gap-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-button-bg">
                      <img src={confirmedIcon} alt="" />
                    </div>
                    <p className="text-[12px] font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button variant="app-primary" size="full" asChild>
              <Link to="/property-payment">Secure Property</Link>
            </Button>

            <div className="mx-auto mt-3 mb-10 flex max-w-81.25 items-center justify-center gap-1 bg-bg-accent px-2 py-1">
              <img src={privacyIcon} alt="" className="h-4 w-4" />
              <p className="text-[12px] leading-4 text-text-secondary">
                Funds are securely held by FindaHome until inspection is
                confirmed by both parties
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
