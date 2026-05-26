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
// import AddAccountSuccessful from "./AddAccountSuccessful";

export default function AddAccount() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 font-ssPro text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
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
      <div className="mt-[36px] rounded-lg border border-bg-accent p-3">
        <form action="">
          <div className="flex flex-col gap-2">
            <label htmlFor="bank_name">Bank Name</label>

            <Select>
              <SelectTrigger className="addBank">
                <SelectValue placeholder="Select Bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label htmlFor="account_number">Account Number</label>

            <input
              type="text"
              id="account_number"
              className="addBank outline-none"
              placeholder="Enter 10-digit account Number"
            />
          </div>

          <div className="mt-8">
            <button className="button-style h-[45px] w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
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
      <p className="mx-auto mt-3 text-center text-[12px] leading-4 underline">
        Manage Account Details
      </p>

      {/* this is the success component */}
      {/* <AddAccountSuccessful /> */}
    </div>
  )
}
