import pauseIcon from "@/assets/agentImages/icon-pause-ad.svg"
import editIcon from "@/assets/agentImages/icon-edit-ad.svg"

export default function ManageAd() {
  return (
    <div>
      <p>Manage Ad</p>

      <div className="mt-2 grid grid-cols-3 gap-5">
        <div className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F8B400]">
            <img src={pauseIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Pause Ad
          </p>
        </div>

        <div className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#149D18]">
            <img src={editIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Edit Budget
          </p>
        </div>

        <div className="manage-ad flex flex-col items-center justify-center gap-1 bg-button-sec py-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#4F95FF]">
            <img src={pauseIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Extend
          </p>
        </div>
      </div>
    </div>
  )
}
