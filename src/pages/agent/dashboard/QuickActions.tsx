import addIcon from "@/assets/agentImages/icon-add-property.svg";
import createAdIcon from "@/assets/agentImages/icon-create-ad.svg";
import transactionsIcon from "@/assets/agentImages/icon-transactions.svg";
import messageIcon from "@/assets/agentImages/icon-messages.svg";

export default function QuickActions() {
  return (
    <div className="mx-6">
      <p>Quick Actions</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-col gap-2 p-1 items-center justify-center">
          <div className="bg-success p-2 rounded-lg w-10 h-10">
            <img src={addIcon} alt="" />
          </div>

          <p className="text-[12px] leading-4">Add Property</p>
        </div>

        <div className="flex flex-col gap-2 p-1 items-center justify-center">
          <div className="bg-warning p-2 rounded-lg w-10 h-10">
            <img src={createAdIcon} alt="" />
          </div>

          <p className="text-[12px] leading-4">Create Ad</p>
        </div>

        <div className="flex flex-col gap-2 p-1 items-center justify-center">
          <div className="bg-button-bg p-2 rounded-lg w-10 h-10">
            <img src={transactionsIcon} alt="" />
          </div>

          <p className="text-[12px] leading-4">Transactions</p>
        </div>

        <div className="flex flex-col gap-2 p-1 items-center justify-center">
          <div className="bg-error p-2 rounded-lg w-10 h-10">
            <img src={messageIcon} alt="" />
          </div>

          <p className="text-[12px] leading-4">Messages</p>
        </div>
      </div>
    </div>
  );
}
