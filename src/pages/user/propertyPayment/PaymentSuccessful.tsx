import successImg from "@/assets/images/img-pay-inspection-fee.png";

export default function PaymentSuccessful() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary h-screen">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center">
        <div className="text-text-primary py-10 flex flex-col items-center justify-center bg-white rounded-t-[24px] w-full absolute bottom-0">
          <img src={successImg} alt="" />

          <div className="flex flex-col items-center justify-center gap-2 mt-4 w-[317px]">
            <p className="font-raleway font-medium tracking-[1px] text-[24px] text-center">
              Your agent has received your handover request
            </p>
            <p className="text-[12px] leading-4 text-text-secondary text-center">
              You will receive a notification for handover schedule
            </p>
          </div>

          {/* buttons */}
          <button className="font-raleway font-semibold text-[14px] tracking-[1px] button-style h-11.25 rounded-lg text-white w-[343px] mt-6.5">
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
