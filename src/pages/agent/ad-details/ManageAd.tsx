import pauseIcon from "@/assets/agentImages/icon-pause-ad.svg";
import editIcon from "@/assets/agentImages/icon-edit-ad.svg";

export default function ManageAd() {
  return (
    <div>
      <p>Manage Ad</p>

      <div className="mt-2 grid grid-cols-3 gap-5">
        <div className="flex flex-col items-center justify-center gap-1 py-3 bg-button-sec manage-ad">
          <div className="w-6 h-6 bg-[#F8B400] rounded-lg flex items-center justify-center">
            <img src={pauseIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Pause Ad
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 py-3 bg-button-sec manage-ad">
          <div className="w-6 h-6 bg-[#149D18] rounded-lg flex items-center justify-center">
            <img src={editIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Edit Budget
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 py-3 bg-button-sec manage-ad">
          <div className="w-6 h-6 bg-[#4F95FF] rounded-lg flex items-center justify-center">
            <img src={pauseIcon} alt="" />
          </div>

          <p className="text-[12px] font-semibold text-text-secondary">
            Extend
          </p>
        </div>
      </div>
    </div>
  );
}
