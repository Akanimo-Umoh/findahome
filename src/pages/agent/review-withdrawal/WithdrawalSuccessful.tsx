import successImg from "@/assets/images/img-pay-inspection-fee.png";
import blackNaira from "@/assets/agentImages/icon-black-naira.svg";

export default function WithdrawalSuccessful() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary h-screen">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center">
        <div className="text-text-primary py-10 flex flex-col items-center justify-center bg-white rounded-t-[24px] w-full absolute bottom-0">
          <img src={successImg} alt="" />

          <div className="flex flex-col items-center justify-center gap-2 mt-2 w-64.5">
            <p className="font-raleway font-semibold tracking-[1px] text-[18px] text-center">
              Withdrawal Successful!
            </p>
            <p className="text-[14px] text-text-secondary text-center">
              Your funds have been transferred to your bank account.
            </p>
          </div>

          {/* withdrawal details */}
          <div className="mt-6 border border-bg-accent rounded-lg p-2 w-85.5">
            <div className="border-b border-text-secondary flex flex-col">
              <p className="text-[14px] text-text-secondary">
                Amount Withdrawn
              </p>
              <div className="flex items-center mt-1">
                <img src={blackNaira} alt="" />
                <p>3,000,000</p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              {/* bank account */}
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Bank Account</p>

                <p>Access Bank ****4810</p>
              </div>

              {/* account name */}
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Account Name</p>

                <p>Samuel James</p>
              </div>

              {/* date and time */}
              <div className="flex items-center justify-between text-[12px] text-text-secondary">
                <p className="leading-4">Date & time</p>

                <p>12 Nov, 3:45 PM</p>
              </div>
            </div>
          </div>

          {/* buttons */}
          <div className="w-85.5 mt-8.5 flex flex-col items-center justify-center gap-3">
            <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style h-11.25 rounded-lg text-white w-full">
              View Wallet
            </button>

            <button className="font-raleway font-semibold text-[14px] tracking-[1px] h-11.25 rounded-lg bg-button-disabled border border-text-secondary w-full">
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
