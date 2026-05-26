import { useNavigate } from "react-router-dom"
import goBack from "@/assets/images/icon-back.svg"
import accountIcon from "@/assets/agentImages/icon-white-bank-account.svg"
import shieldIcon from "@/assets/agentImages/icon-shield.svg"
import withdrawIcon from "@/assets/agentImages/icon-blue-withdraw.svg"
import addIcon from "@/assets/agentImages/icon-add-property.svg"

export default function WithdrawalAccount() {
  const navigate = useNavigate()

  return (
    <div className="mb-10 px-6 font-ssPro text-text-primary">
      {/* header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="h-6 w-6" />
        </button>

        <p className="font-raleway text-[18px] font-semibold tracking-[1px]">
          Withdrawal Account
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-3xl bg-bg-accent">
          <img src={withdrawIcon} alt="" />
        </div>

        <div className="mt-6 flex max-w-[247px] flex-col items-center justify-center gap-1">
          <p>Your withdrawal account</p>
          <p className="text-center text-[12px] leading-4 text-text-secondary">
            Funds released from escrow will be deposited into your default
            account.
          </p>
        </div>
      </div>

      {/* accounts */}
      <div className="mt-[36px] space-y-4">
        <div className="flex items-center gap-4 rounded-lg border border-bg-accent p-3">
          <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-3xl bg-button-bg">
            <img src={accountIcon} alt="" />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[18px] tracking-[1px]">Access Bank</p>
              <p className="w-fit rounded-2xl bg-button-bg px-2 py-0.5 text-[12px] leading-4 text-white">
                Default
              </p>
            </div>
            {/* account number */}
            <p className="text-[12px] leading-4 text-text-secondary">
              0123456789
            </p>
            {/* account name */}
            <p className="text-[12px] leading-4 text-text-secondary">
              Adetokunbo Samuel James
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-lg border border-bg-accent p-3">
          <div className="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-3xl bg-button-bg">
            <img src={accountIcon} alt="" />
          </div>

          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[18px] tracking-[1px]">GT Bank</p>
            </div>
            {/* account number */}
            <p className="text-[12px] leading-4 text-text-secondary">
              0987654321
            </p>
            {/* account name */}
            <p className="text-[12px] leading-4 text-text-secondary">
              Adetokunbo Samuel James
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex w-67.5 items-start gap-2 bg-button-sec p-2">
        <img src={shieldIcon} alt="" />
        <p className="text-[12px] leading-4 text-text-secondary">
          Your bank details are encrypted and stored securely. All payouts are
          processed through verified accounts only.
        </p>
      </div>

      {/* takes you to the add account page */}
      <button className="mt-[47px] flex h-[45px] w-full items-center justify-center gap-2 rounded-lg bg-button-bg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
        <img src={addIcon} alt="" />
        <p>Add New Account</p>
      </button>
    </div>
  )
}
