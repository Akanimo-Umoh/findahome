import successImg from "@/assets/images/img-pay-inspection-fee.png";

export default function AddAccountSuccessful() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center px-6">
        <div className="bg-white py-[43px] px-[27px] rounded-xl max-w-[340px] w-full flex flex-col items-center justify-center">
          <div>
            <img src={successImg} alt="" className="mx-auto" />
          </div>

          <div className="flex flex-col gap-6 mt-2 w-[258px]">
            <div className="flex flex-col gap-4 items-center justify-center">
              <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center">
                Bank Details Saved!
              </p>
              <p className="text-[14px] text-text-secondary text-center">
                Your bank details has been successfully saved.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style w-full h-11.25 rounded-lg text-white">
                View Wallet
              </button>

              <button className="font-raleway font-semibold text-[14px] tracking-[1px] w-full h-11.25 rounded-lg border border-text-secondary">
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
