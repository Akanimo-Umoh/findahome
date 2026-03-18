import editIcon from "@/assets/images/icon-blue-edit.svg";

export default function PersonalInformation() {
  return (
    <div>
      <p className="text-black">Personal Information</p>

      <div className="mt-4 rounded-lg p-3 space-y-4 border border-bg-accent">
        <div>
          <p className="text-text-secondary">Full Name:</p>
          <div className="flex items-center justify-between">
            <p>Victoria Ntekim</p>
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Email Address:</p>
          <div className="flex items-center justify-between">
            <p>etimvictoria62@gmail.com</p>
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Phone Number:</p>
          <div className="flex items-center justify-between">
            <p>08138233944</p>
            <img src={editIcon} alt="" />
          </div>
        </div>

        <div>
          <p className="text-text-secondary">Location:</p>
          <div className="flex items-center justify-between">
            <p>Lagos, Nigeria</p>
            <img src={editIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
