import infoIcon from "@/assets/agentImages/icon-filled-info.svg"
import { useRef, useState } from "react"

type ConfirmBuyersCodeProps = {
  onConfirm: () => void
}

export default function ConfirmBuyersCode({
  onConfirm,
}: ConfirmBuyersCodeProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  function handleChange(value: string, index: number) {
    // handle paste
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("")
      const newCode = [...code]
      digits.forEach((d, i) => {
        if (index + i < 6) newCode[index + i] = d
      })
      setCode(newCode)
      const nextIndex = Math.min(index + digits.length, 5)
      inputs.current[nextIndex]?.focus()
      return
    }

    if (!/^\d?$/.test(value)) return // only digits
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 5) inputs.current[index + 1]?.focus()
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const isComplete = code.every((digit) => digit !== "")

  return (
    <div className="">
      <p>Buyer Confirmation</p>

      <div className="mt-2 space-y-2 rounded-lg border border-bg-accent px-3 py-2">
        <div className="space-y-1">
          <p className="text-[14px]">Enter Buyer's Inspection Code</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Ask the buyer for the code shown on their app
          </p>
        </div>

        {/* six digit input */}
        <div className="flex justify-between gap-1">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => void (inputs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-12 w-10 rounded-lg border border-bg-accent text-center font-raleway text-[14px] font-semibold tracking-[1px] focus:border-button-bg focus:outline-none sm:w-12"
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => {
            if (isComplete) onConfirm()
          }}
          disabled={!isComplete}
          className={`h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] ${isComplete ? "bg-button-bg text-white hover:bg-button-hover" : "border border-text-secondary bg-button-disabled"}`}
        >
          Mark Inspection completed
        </button>

        <div className="mt-10 flex items-center gap-1 rounded-lg bg-bg-accent px-2 py-1">
          <img src={infoIcon} alt="" className="shrink-0" />

          <div className="space-y-1 text-[12px] leading-4">
            <p>Why do we need both confirmations?</p>
            <p className="text-text-secondary">
              This prevents disputes and ensures both parties agree the
              inspection happened.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
