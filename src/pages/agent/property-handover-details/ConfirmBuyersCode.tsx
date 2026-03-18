import { useRef, useState } from "react";

export default function ConfirmBuyersCode() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(value: string, index: number) {
    // handle paste
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, 6).split("");
      const newCode = [...code];
      digits.forEach((d, i) => {
        if (index + i < 6) newCode[index + i] = d;
      });
      setCode(newCode);
      const nextIndex = Math.min(index + digits.length, 5);
      inputs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d?$/.test(value)) return; // only digits
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  const isComplete = code.every((digit) => digit !== "");

  return (
    <div className="">
      <p>Buyer Confirmation</p>

      <div className="mt-2 rounded-lg border border-bg-accent py-2 px-3 space-y-2">
        <div className="space-y-1">
          <p className="text-[14px]">Enter Buyer's Handover Code</p>
          <p className="text-[12px] leading-4 text-text-secondary">
            Ask the buyer for the code shown on their end
          </p>
        </div>

        {/* six digit input */}
        <div className="flex gap-1 justify-between">
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
              className="w-10 h-12 border border-bg-accent rounded-lg font-raleway font-semibold text-[14px] tracking-[1px] text-center sm:w-12 focus:outline-none focus:border-button-bg"
            />
          ))}
        </div>
      </div>

      <button
        className={`font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg h-[45px] w-full mt-8 ${isComplete ? "text-white bg-button-bg hover:bg-button-hover" : "border border-text-secondary bg-button-disabled"}`}
      >
        Mark handover completed
      </button>
    </div>
  );
}
