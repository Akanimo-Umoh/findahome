import loadingImg from "@/assets/images/img-awaiting-agents-confirmation.png";

export default function HandoverConfirmationOverlay() {
  return (
    <div className="fixed inset-0 z-50 modal-enter font-ssPro text-text-primary">
      {/* modal */}
      <div className="bg-black/40 h-full flex items-center justify-center px-6">
        <div className="bg-white py-[43px] px-[27px] rounded-xl max-w-[340px] w-full flex flex-col items-center justify-center gap-6 h-[400px]">
          <img src={loadingImg} alt="" className="animate-spin" />
          <p className="font-raleway font-semibold text-[18px] tracking-[1px] text-center">
            Waiting for Agent to confirm
          </p>
        </div>
      </div>
    </div>
  );
}
