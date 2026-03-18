import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import accountIcon from "@/assets/agentImages/icon-add-account.svg";
import shieldIcon from "@/assets/agentImages/icon-shield.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import AddAccountSuccessful from "./AddAccountSuccessful";

export default function AddAccount() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Add Account
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-6">
        <div className="rounded-3xl bg-bg-accent w-15 h-15 flex items-center justify-center shrink-0">
          <img src={accountIcon} alt="" />
        </div>

        <div className="space-y-1 mt-6 max-w-[247px] flex flex-col items-center justify-center">
          <p>Add a withdrawal account</p>
          <p className="text-[12px] leading-4 text-text-secondary text-center">
            Your earnings will be sent to this account once escrow releases your
            funds.
          </p>
        </div>
      </div>

      {/* form */}
      <div className="rounded-lg p-3 border border-bg-accent mt-[36px]">
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

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="account_number">Account Number</label>

            <input
              type="text"
              id="account_number"
              className="addBank outline-none"
              placeholder="Enter 10-digit account Number"
            />
          </div>

          <div className="mt-8">
            <button className="button-style text-[14px] tracking-[1px] font-raleway font-semibold text-white w-full h-[45px] rounded-lg">
              Save Bank Details
            </button>

            <div className="flex items-start w-67.5 mx-auto gap-2 p-2 bg-button-sec mt-4">
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
      <p className="underline text-[12px] leading-4 mx-auto mt-3 text-center">
        Manage Account Details
      </p>

      {/* this is the success component */}
      {/* <AddAccountSuccessful /> */}
    </div>
  );
}
