import successImg from "@/assets/images/img-pay-inspection-fee.png"
import blackNaira from "@/assets/agentImages/icon-black-naira.svg"

export default function WithdrawalSuccessful() {
  return (
    <div className="modal-enter fixed inset-0 z-50 h-screen font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40">
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[24px] bg-white py-10 text-text-primary">
          <img src={successImg} alt="" />

          <div className="mt-2 flex w-64.5 flex-col items-center justify-center gap-2">
            <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
              Withdrawal Successful!
            </p>
            <p className="text-center text-[14px] text-text-secondary">
              Your funds have been transferred to your bank account.
            </p>
          </div>

          {/* withdrawal details */}
          <div className="mt-6 w-85.5 rounded-lg border border-bg-accent p-2">
            <div className="flex flex-col border-b border-text-secondary">
              <p className="text-[14px] text-text-secondary">
                Amount Withdrawn
              </p>
              <div className="mt-1 flex items-center">
                <img src={blackNaira} alt="" />
                <p>3,000,000</p>
              </div>
            </div>

            <div className="mt-4 space-y-4">
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
          <div className="mt-8.5 flex w-85.5 flex-col items-center justify-center gap-3">
            <button className="button-style h-11.25 w-full rounded-lg font-raleway text-[14px] font-semibold tracking-[1px] text-white">
              View Wallet
            </button>

            <button className="h-11.25 w-full rounded-lg border border-text-secondary bg-button-disabled font-raleway text-[14px] font-semibold tracking-[1px]">
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
