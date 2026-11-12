import loadingImg from "@/assets/images/img-awaiting-agents-confirmation.png"

export default function HandoverConfirmationOverlay() {
  return (
    <div className="modal-enter fixed inset-0 z-50 font-ssPro text-text-primary">
      {/* modal */}
      <div className="flex h-full items-center justify-center bg-black/40 px-6">
        <div className="flex h-[400px] w-full max-w-[340px] flex-col items-center justify-center gap-6 rounded-xl bg-white px-[27px] py-[43px]">
          <img src={loadingImg} alt="" className="animate-spin" />
          <p className="text-center font-raleway text-[18px] font-semibold tracking-[1px]">
            Waiting for Agent to confirm
          </p>
        </div>
      </div>
    </div>
  )
}
