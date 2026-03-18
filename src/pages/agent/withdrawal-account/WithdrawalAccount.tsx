import { useNavigate } from "react-router-dom";
import goBack from "@/assets/images/icon-back.svg";
import accountIcon from "@/assets/agentImages/icon-white-bank-account.svg";
import shieldIcon from "@/assets/agentImages/icon-shield.svg";
import withdrawIcon from "@/assets/agentImages/icon-blue-withdraw.svg";
import addIcon from "@/assets/agentImages/icon-add-property.svg";

export default function WithdrawalAccount() {
  const navigate = useNavigate();

  return (
    <div className="font-ssPro text-text-primary px-6 mb-10">
      {/* header */}
      <div className="flex items-center justify-center relative">
        <button onClick={() => navigate(-1)} className="absolute left-0">
          <img src={goBack} alt="" className="w-6 h-6" />
        </button>

        <p className="text-[18px] font-raleway font-semibold tracking-[1px]">
          Withdrawal Account
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-6">
        <div className="rounded-3xl bg-bg-accent w-15 h-15 flex items-center justify-center shrink-0">
          <img src={withdrawIcon} alt="" />
        </div>

        <div className="mt-6 max-w-[247px] flex flex-col items-center justify-center gap-1">
          <p>Your withdrawal account</p>
          <p className="text-[12px] leading-4 text-text-secondary text-center">
            Funds released from escrow will be deposited into your default
            account.
          </p>
        </div>
      </div>

      {/* accounts */}
      <div className="mt-[36px] space-y-4">
        <div className="border border-bg-accent rounded-lg flex items-center gap-4 p-3">
          <div className="w-12.5 h-12.5 bg-button-bg flex items-center justify-center shrink-0 rounded-3xl">
            <img src={accountIcon} alt="" />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[18px] tracking-[1px]">Access Bank</p>
              <p className="rounded-2xl py-0.5 px-2 bg-button-bg text-[12px] leading-4 text-white w-fit">
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

        <div className="border border-bg-accent rounded-lg flex items-center gap-4 p-3">
          <div className="w-12.5 h-12.5 bg-button-bg flex items-center justify-center shrink-0 rounded-3xl">
            <img src={accountIcon} alt="" />
          </div>

          <div className="flex-1 flex flex-col gap-1">
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

      <div className="flex items-start w-67.5 mx-auto gap-2 p-2 bg-button-sec mt-4">
        <img src={shieldIcon} alt="" />
        <p className="text-[12px] leading-4 text-text-secondary">
          Your bank details are encrypted and stored securely. All payouts are
          processed through verified accounts only.
        </p>
      </div>

      {/* takes you to the add account page */}
      <button className="h-[45px] bg-button-bg w-full flex items-center justify-center text-white font-raleway font-semibold text-[14px] tracking-[1px] rounded-lg gap-2 mt-[47px]">
        <img src={addIcon} alt="" />
        <p>Add New Account</p>
      </button>
    </div>
  );
}
