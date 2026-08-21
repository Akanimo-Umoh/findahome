import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import accountIcon from "@/assets/agentImages/icon-add-account.svg"
import shieldIcon from "@/assets/agentImages/icon-shield.svg"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NIGERIAN_BANKS } from "@/data/nigerianBanks"
import AddAccountSuccessful from "./AddAccountSuccessful"
import { useState } from "react"

export default function AddAccount() {
  const navigate = useNavigate()
  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)

  const isValid = !!bankName && accountNumber.trim().length === 10

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    // TODO: replace with a real mutation (POST /bank-accounts) once endpoint exists
    setIsSuccessOpen(true)
  }

  return (
    <div className="mb-10 md:pt-6 lg:pt-8">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 cursor-pointer"
        >
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Add Account
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-3xl bg-bg-accent">
          <img src={accountIcon} alt="" />
        </div>

        <div className="mt-6 flex max-w-[247px] flex-col items-center justify-center space-y-1">
          <p>Add a withdrawal account</p>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Your earnings will be sent to this account once escrow releases your
            funds.
          </p>
        </div>
      </div>

      {/* form */}
      <div className="mx-auto max-w-125">
        <div className="mt-[36px] rounded-lg border border-bg-accent p-3">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="bank_name">Bank Name</label>

              <Select value={bankName} onValueChange={setBankName}>
                <SelectTrigger className="addBank">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_BANKS.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="account_number">Account Number</label>

              <input
                type="text"
                id="account_number"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                className="addBank outline-none"
                placeholder="Enter 10-digit account Number"
                inputMode="numeric"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={!isValid}
                className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white disabled:opacity-50"
              >
                Save Bank Details
              </button>

              <div className="mx-auto mt-4 flex w-67.5 items-start gap-2 bg-button-sec p-2">
                <img src={shieldIcon} alt="" />
                <p className="text-[12px] leading-4 text-text-secondary">
                  Ensure this account belongs to you. For security, payouts may
                  only be sent to verified accounts
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* this goes to the manage account page */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => navigate("/agent/manage-account")}
            className="mt-3 cursor-pointer text-center text-[12px] leading-4 underline"
          >
            Manage Account Details
          </button>
        </div>
      </div>

      {/* this is the success component */}
      <AddAccountSuccessful
        open={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
      />
    </div>
  )
}
