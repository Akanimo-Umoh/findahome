import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import blueNaira from "@/assets/agentImages/icon-blue-naira.svg"
import greyNaira from "@/assets/agentImages/icon-grey-naira.svg"
import { toast } from "sonner"
import { fundWallet } from "@/services/wallet.service"
import { Button } from "@/components/ui/button"

const MIN_DEPOSIT = 1000

export default function FundWallet() {
  const navigate = useNavigate()
  const [amountInput, setAmountInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // page was restored from bfcache (e.g. user hit back/cancel from Paystack)
        setIsSubmitting(false)
      }
    }
    window.addEventListener("pageshow", handlePageShow)
    return () => window.removeEventListener("pageshow", handlePageShow)
  }, [])

  const amount = Number(amountInput) || 0

  const handleContinue = async () => {
    if (amount < MIN_DEPOSIT) {
      toast.error(`Minimum deposit amount is ₦${MIN_DEPOSIT.toLocaleString()}`)
      return
    }

    setIsSubmitting(true)
    try {
      const { authorizationUrl, reference } = await fundWallet(amount)
      // keep the reference around so the return page can verify it
      sessionStorage.setItem("pending-wallet-funding-reference", reference)
      window.location.href = authorizationUrl
    } catch (err) {
      toast.error("Couldn't start wallet funding. Please try again.")
      console.error("fundWallet error:", err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>
        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Fund Wallet
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-1 rounded-lg border border-bg-accent px-2 py-3">
        <p>Available Balance</p>
        <div className="flex items-center">
          <img src={blueNaira} alt="" />
          {/* TODO: static — replace with real balance once endpoint exists */}
          <p className="font-raleway text-[18px] font-semibold tracking-[1px] text-button-bg">
            3,000,000
          </p>
        </div>
        <p className="text-[12px] leading-4 text-text-secondary">
          Add funds to your wallet to pay for ads and other services
        </p>
      </div>

      <div className="mt-6.5">
        <div className="flex flex-col">
          <label htmlFor="amount" className="text-[14px]">
            Enter Amount
          </label>

          <div className="relative flex items-center justify-center">
            <img src={greyNaira} alt="" className="absolute left-2" />
            <input
              type="text"
              id="amount"
              value={amountInput}
              onChange={(e) =>
                setAmountInput(e.target.value.replace(/\D/g, ""))
              }
              className="mt-0.5 h-[45px] w-full rounded-lg border-2 border-bg-accent bg-button-sec pr-2 pl-7 text-[14px] outline-none"
              placeholder="0.00"
              inputMode="numeric"
            />
          </div>
        </div>

        <p className="mt-1 text-[12px] leading-4 text-text-secondary">
          Minimum deposit amount: ₦{MIN_DEPOSIT.toLocaleString()}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[5000, 10000, 50000].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmountInput(String(preset))}
              className="rounded-lg border border-bg-accent py-2 text-[13px] font-semibold text-text-secondary transition-colors hover:border-button-bg hover:text-button-bg"
            >
              ₦{preset.toLocaleString()}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Button
            variant="app-primary"
            size="full"
            onClick={handleContinue}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Redirecting..." : "Proceed to Payment"}
          </Button>
          <p className="mt-2 text-center text-[12px] leading-4 text-text-secondary">
            You'll be redirected to Paystack to complete payment.
          </p>
        </div>
      </div>
    </div>
  )
}
